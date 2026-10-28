import { Calendar } from "lucide-react";
import { WEEK_DAY_PT_LABEL, type WeekDay } from "@/app/_lib/week-days";
import { cn } from "@/lib/utils";

type WeekDayBadgeProps = {
  weekDay: WeekDay;
  tone?: "overlay" | "muted";
};

export function WeekDayBadge({ weekDay, tone = "overlay" }: WeekDayBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1.25 text-xs font-semibold tracking-wide uppercase",
        tone === "overlay"
          ? "bg-background/15 text-background backdrop-blur-xs"
          : "bg-foreground/8 text-foreground",
      )}
    >
      <Calendar className="size-3.5" aria-hidden />
      {WEEK_DAY_PT_LABEL[weekDay]}
    </span>
  );
}
