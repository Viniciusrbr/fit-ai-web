import Image from "next/image";
import Link from "next/link";
import type { WeekDay } from "@/app/_lib/week-days";
import { WeekDayBadge } from "@/components/workout-day/week-day-badge";
import { WorkoutDayMeta } from "@/components/workout-day/workout-day-meta";
import { cn } from "@/lib/utils";

type WorkoutDayCardProps = {
  name: string;
  weekDay: WeekDay;
  estimatedDurationInSeconds: number;
  exercisesCount: number;
  coverImageUrl?: string;
  href: string;
  className?: string;
};

export function WorkoutDayCard({
  name,
  weekDay,
  estimatedDurationInSeconds,
  exercisesCount,
  coverImageUrl,
  href,
  className,
}: WorkoutDayCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-50 flex-col justify-between overflow-hidden rounded-xl bg-foreground p-5 outline-none transition-transform duration-200 focus-visible:ring-3 focus-visible:ring-ring/50 motion-safe:active:scale-[0.99]",
        className,
      )}
    >
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 448px"
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-foreground/70 to-transparent to-65%" />
      <div className="relative">
        <WeekDayBadge weekDay={weekDay} />
      </div>
      <div className="relative flex flex-col gap-2">
        <p className="font-heading text-2xl leading-[1.05] font-semibold tracking-tight text-background">
          {name}
        </p>
        <WorkoutDayMeta
          estimatedDurationInSeconds={estimatedDurationInSeconds}
          exercisesCount={exercisesCount}
        />
      </div>
    </Link>
  );
}
