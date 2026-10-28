import { Dumbbell, Timer } from "lucide-react";

type WorkoutDayMetaProps = {
  estimatedDurationInSeconds: number;
  exercisesCount: number;
};

export function WorkoutDayMeta({
  estimatedDurationInSeconds,
  exercisesCount,
}: WorkoutDayMetaProps) {
  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);
  const exercisesLabel = `${exercisesCount} ${
    exercisesCount === 1 ? "exercício" : "exercícios"
  }`;

  return (
    <div className="flex gap-3 text-xs text-background/75 tabular-nums">
      <span className="flex items-center gap-1">
        <Timer className="size-3.5" aria-hidden />
        {durationInMinutes} min
      </span>
      <span className="flex items-center gap-1">
        <Dumbbell className="size-3.5" aria-hidden />
        {exercisesLabel}
      </span>
    </div>
  );
}
