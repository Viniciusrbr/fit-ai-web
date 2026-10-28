import Image from "next/image";
import type { ReactNode } from "react";
import type { WeekDay } from "@/app/_lib/week-days";
import { WeekDayBadge } from "@/components/workout-day/week-day-badge";
import { WorkoutDayMeta } from "@/components/workout-day/workout-day-meta";

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
  return (
    <section className="relative flex h-50 flex-col justify-between overflow-hidden rounded-xl bg-foreground p-5 lg:h-70 lg:p-7">
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 448px"
          className="object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-foreground/70 to-transparent to-65%" />
      <div className="relative">
        <WeekDayBadge weekDay={weekDay} />
      </div>
      <div className="relative flex items-end justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <h1 className="font-heading text-2xl leading-[1.05] font-semibold tracking-tight text-background lg:text-4xl">
            {name}
          </h1>
          <WorkoutDayMeta
            estimatedDurationInSeconds={estimatedDurationInSeconds}
            exercisesCount={exercisesCount}
          />
        </div>
        {action}
      </div>
    </section>
  );
}
