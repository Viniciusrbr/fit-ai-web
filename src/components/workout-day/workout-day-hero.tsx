import { Calendar, Dumbbell, Timer } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { WEEK_DAY_PT_LABEL, type WeekDay } from "@/app/_lib/week-days";

type WorkoutDayHeroProps = {
  name: string;
  weekDay: WeekDay;
  estimatedDurationInSeconds: number;
  exercisesCount: number;
  coverImageUrl?: string;
  action?: ReactNode;
};

export function WorkoutDayHero({
  name,
  weekDay,
  estimatedDurationInSeconds,
  exercisesCount,
  coverImageUrl,
  action,
}: WorkoutDayHeroProps) {
  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);
  const exercisesLabel = `${exercisesCount} ${
    exercisesCount === 1 ? "exercício" : "exercícios"
  }`;

  return (
    <div className="relative flex h-50 flex-col justify-between overflow-hidden rounded-xl bg-foreground p-5 lg:h-70">
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt={name}
          fill
          sizes="(min-width: 1024px) 100vw, 448px"
          className="object-cover"
        />
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0) 60%)",
        }}
      />
      <div className="relative flex items-center">
        <div className="flex items-center gap-1 rounded-full bg-background/15 px-2.5 py-1.25 backdrop-blur-xs">
          <Calendar className="size-3.5 text-background" />
          <span className="text-xs font-semibold text-background uppercase">
            {WEEK_DAY_PT_LABEL[weekDay]}
          </span>
        </div>
      </div>
      <div className="relative flex items-end justify-between gap-2">
        <div className="flex flex-col gap-2">
          <p className="font-heading text-2xl leading-[1.05] font-semibold text-background">
            {name}
          </p>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <Timer className="size-3.5 text-background/70" />
              <span className="text-xs text-background/70">
                {durationInMinutes}min
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Dumbbell className="size-3.5 text-background/70" />
              <span className="text-xs text-background/70">
                {exercisesLabel}
              </span>
            </div>
          </div>
        </div>
        {action}
      </div>
    </div>
  );
}
