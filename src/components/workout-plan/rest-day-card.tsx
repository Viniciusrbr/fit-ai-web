import { BatteryCharging } from "lucide-react";
import type { WeekDay } from "@/app/_lib/week-days";
import { WeekDayBadge } from "@/components/workout-day/week-day-badge";

type RestDayCardProps = {
  weekDay: WeekDay;
};

export function RestDayCard({ weekDay }: RestDayCardProps) {
  return (
    <div className="flex h-27.5 w-full flex-col justify-between rounded-xl bg-muted p-5">
      <WeekDayBadge weekDay={weekDay} tone="muted" />
      <div className="flex items-center gap-2 text-foreground">
        <BatteryCharging className="size-5" aria-hidden />
        <p className="font-heading text-2xl leading-[1.05] font-semibold tracking-tight">
          Descanso
        </p>
      </div>
    </div>
  );
}
