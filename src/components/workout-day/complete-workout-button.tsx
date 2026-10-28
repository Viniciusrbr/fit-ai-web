"use client";

import { CircleCheck } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { completeWorkoutSessionAction } from "@/app/workout-plans/[workoutPlanId]/days/[workoutDayId]/_lib/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CompleteWorkoutButtonProps = {
  workoutPlanId: string;
  workoutDayId: string;
  workoutSessionId: string;
  className?: string;
};

export function CompleteWorkoutButton({
  workoutPlanId,
  workoutDayId,
  workoutSessionId,
  className,
}: CompleteWorkoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const { error } = await completeWorkoutSessionAction(
        workoutPlanId,
        workoutDayId,
        workoutSessionId,
      );

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Treino concluído. Mais um dia na sequência.");
    });
  };

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className={cn(
        "h-auto w-full gap-2 rounded-full py-3.5 text-sm font-semibold shadow-lg shadow-brand/25",
        className,
      )}
    >
      <CircleCheck className="size-4" aria-hidden />
      {isPending ? "Salvando..." : "Marcar como concluído"}
    </Button>
  );
}
