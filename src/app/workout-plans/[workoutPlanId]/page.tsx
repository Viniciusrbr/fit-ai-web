import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getWorkoutPlan } from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { redirectIfNotOnboarded } from "@/app/_lib/require-onboarding";
import { WEEK_DAY_ORDER } from "@/app/_lib/week-days";
import { BottomNavigation } from "@/components/home/bottom-navigation";
import { WorkoutDayCard } from "@/components/home/workout-day-card";
import { RestDayCard } from "@/components/workout-plan/rest-day-card";
import { WorkoutPlanBanner } from "@/components/workout-plan/workout-plan-banner";

type WorkoutPlanPageProps = {
  params: Promise<{ workoutPlanId: string }>;
};

export default async function WorkoutPlanPage({
  params,
}: WorkoutPlanPageProps) {
  const { workoutPlanId } = await params;

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect("/auth");
  }

  await redirectIfNotOnboarded();

  const response = await getWorkoutPlan(workoutPlanId);

  if (response.status === 401) {
    redirect("/auth");
  }

  if (response.status !== 200) {
    notFound();
  }

  const workoutPlan = response.data;
  const workoutDays = [...workoutPlan.workoutDays].sort(
    (a, b) => WEEK_DAY_ORDER[a.weekDay] - WEEK_DAY_ORDER[b.weekDay],
  );

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-28">
      <WorkoutPlanBanner planName={workoutPlan.name} />

      <section className="flex flex-col gap-3 p-5">
        {workoutDays.map((workoutDay) =>
          workoutDay.isRest ? (
            <RestDayCard key={workoutDay.id} weekDay={workoutDay.weekDay} />
          ) : (
            <WorkoutDayCard
              key={workoutDay.id}
              name={workoutDay.name}
              weekDay={workoutDay.weekDay}
              estimatedDurationInSeconds={workoutDay.estimatedDurationInSeconds}
              exercisesCount={workoutDay.exercisesCount}
              coverImageUrl={workoutDay.coverImageUrl}
              href={`/workout-plans/${workoutPlan.id}/days/${workoutDay.id}`}
            />
          ),
        )}
      </section>

      <BottomNavigation activeItem="calendar" />
    </main>
  );
}
