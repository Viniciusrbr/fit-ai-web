import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getWorkoutPlan } from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { redirectIfNotOnboarded } from "@/app/_lib/require-onboarding";
import { WEEK_DAY_ORDER } from "@/app/_lib/week-days";
import { BottomNavigation } from "@/components/home/bottom-navigation";
import { WorkoutDayCard } from "@/components/home/workout-day-card";
import { Sidebar } from "@/components/layout/sidebar";
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
    <div className="flex min-h-dvh bg-background">
      <Sidebar activeItem="calendar" />

      <main className="relative mx-auto flex w-full max-w-md flex-col pb-28 lg:mx-0 lg:max-w-none lg:flex-1 lg:gap-7 lg:p-12 lg:pb-12">
        <WorkoutPlanBanner planName={workoutPlan.name} />

        <section className="p-5 lg:columns-2 lg:gap-6 lg:p-0">
          {workoutDays.map((workoutDay) => (
            <div
              key={workoutDay.id}
              className="mb-3 break-inside-avoid lg:mb-5"
            >
              {workoutDay.isRest ? (
                <RestDayCard weekDay={workoutDay.weekDay} />
              ) : (
                <WorkoutDayCard
                  name={workoutDay.name}
                  weekDay={workoutDay.weekDay}
                  estimatedDurationInSeconds={
                    workoutDay.estimatedDurationInSeconds
                  }
                  exercisesCount={workoutDay.exercisesCount}
                  coverImageUrl={workoutDay.coverImageUrl}
                  href={`/workout-plans/${workoutPlan.id}/days/${workoutDay.id}`}
                />
              )}
            </div>
          ))}
        </section>

        <BottomNavigation activeItem="calendar" />
      </main>
    </div>
  );
}
