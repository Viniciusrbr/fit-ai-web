import { cn } from "@/lib/utils";

type ConsistencyDayProps = {
  label: string;
  completed: boolean;
  started: boolean;
  isToday: boolean;
};

export function ConsistencyDay({
  label,
  completed,
  started,
  isToday,
}: ConsistencyDayProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={cn(
          "size-5 rounded-md",
          completed && "bg-brand",
          !completed && started && "bg-brand-muted",
          !completed && !started && isToday && "border-[1.6px] border-brand",
          !completed && !started && !isToday && "border border-border",
        )}
      />
      <span className="text-xs leading-[1.4] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
