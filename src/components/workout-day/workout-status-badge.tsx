import { Activity, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type WorkoutStatusBadgeProps = {
  status: "completed" | "in-progress";
};

export function WorkoutStatusBadge({ status }: WorkoutStatusBadgeProps) {
  const isCompleted = status === "completed";
  const Icon = isCompleted ? CircleCheck : Activity;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold backdrop-blur-xs",
        isCompleted
          ? "bg-background text-foreground"
          : "bg-background/15 text-background",
      )}
    >
      <Icon
        className={cn("size-4", isCompleted && "text-online")}
        aria-hidden
      />
      {isCompleted ? "Concluído" : "Em andamento"}
    </span>
  );
}
