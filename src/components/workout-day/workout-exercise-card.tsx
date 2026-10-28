import { Timer } from "lucide-react";
import { ExerciseHelpButton } from "@/components/workout-day/exercise-help-button";

type WorkoutExerciseCardProps = {
  name: string;
  sets: number;
  reps: number;
  restTimeInSeconds: number;
};

const chipClassName =
  "flex items-center justify-center gap-1 rounded-full bg-muted px-2.5 py-1.25 text-xs font-semibold text-muted-foreground tabular-nums";

export function WorkoutExerciseCard({
  name,
  sets,
  reps,
  restTimeInSeconds,
}: WorkoutExerciseCardProps) {
  const setsLabel = `${sets} ${sets === 1 ? "série" : "séries"}`;

  return (
    <article className="flex w-full flex-col gap-3 rounded-xl border border-border p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-foreground">{name}</h2>
        <ExerciseHelpButton exerciseName={name} />
      </div>
      <div className="flex flex-wrap gap-1.5">
        <span className={chipClassName}>{setsLabel}</span>
        <span className={chipClassName}>{reps} reps</span>
        <span className={chipClassName}>
          <Timer className="size-3.5" aria-hidden />
          <span className="sr-only">Descanso de</span>
          {restTimeInSeconds}s
        </span>
      </div>
    </article>
  );
}
