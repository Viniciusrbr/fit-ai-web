import { notFound, redirect } from "next/navigation";
import { getWorkoutDay } from "@/app/_lib/api/fetch-generated";
import { BottomNavigation } from "@/components/home/bottom-navigation";
import { Button } from "@/components/ui/button";
import { CompleteWorkoutButton } from "@/components/workout-day/complete-workout-button";
import { StartWorkoutButton } from "@/components/workout-day/start-workout-button";
import { WorkoutDayHero } from "@/components/workout-day/workout-day-hero";
import { WorkoutDayTopbar } from "@/components/workout-day/workout-day-topbar";
import { WorkoutExerciseCard } from "@/components/workout-day/workout-exercise-card";

type WorkoutDayPageProps = {
  params: Promise<{ workoutPlanId: string; workoutDayId: string }>;
};

export default async function WorkoutDayPage({ params }: WorkoutDayPageProps) {
  const { workoutPlanId, workoutDayId } = await params;

  const response = await getWorkoutDay(workoutPlanId, workoutDayId);

  if (response.status === 401) {
    redirect("/auth");
  }

  if (response.status !== 200) {
    notFound();
  }

  const workoutDay = response.data;
  const exercises = [...workoutDay.exercises].sort((a, b) => a.order - b.order);

  const completedSession = workoutDay.sessions.find(
    (session) => session.completedAt,
  );
  const inProgressSession = workoutDay.sessions.find(
    (session) => session.startedAt && !session.completedAt,
  );

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-28">
      <div className="flex flex-col gap-5 p-5">
        <WorkoutDayTopbar title="Treino de Hoje" />

        <WorkoutDayHero
          name={workoutDay.name}
          weekDay={workoutDay.weekDay}
          estimatedDurationInSeconds={workoutDay.estimatedDurationInSeconds}
          exercisesCount={exercises.length}
          coverImageUrl={workoutDay.coverImageUrl}
          action={
            completedSession ? (
              <Button
                type="button"
                variant="ghost"
                className="h-auto rounded-full px-4 py-2 text-sm font-semibold text-background hover:bg-background/10 hover:text-background"
              >
                Concluído!
              </Button>
            ) : inProgressSession ? null : (
              <StartWorkoutButton
                workoutPlanId={workoutPlanId}
                workoutDayId={workoutDayId}
              />
            )
          }
        />

        <div className="flex flex-col gap-3">
          {exercises.map((exercise) => (
            <WorkoutExerciseCard
              key={exercise.id}
              name={exercise.name}
              sets={exercise.sets}
              reps={exercise.reps}
              restTimeInSeconds={exercise.restTimeInSeconds}
            />
          ))}
        </div>

        {inProgressSession && !completedSession ? (
          <CompleteWorkoutButton
            workoutPlanId={workoutPlanId}
            workoutDayId={workoutDayId}
            workoutSessionId={inProgressSession.id}
          />
        ) : null}
      </div>

      <BottomNavigation activeItem="calendar" />
    </main>
  );
}
