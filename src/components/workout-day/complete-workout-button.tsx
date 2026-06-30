"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { completeWorkoutSessionAction } from "@/app/workout-plans/[workoutPlanId]/days/[workoutDayId]/_lib/actions";
import { Button } from "@/components/ui/button";

type CompleteWorkoutButtonProps = {
  workoutPlanId: string;
  workoutDayId: string;
  workoutSessionId: string;
};

export function CompleteWorkoutButton({
  workoutPlanId,
  workoutDayId,
  workoutSessionId,
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

      toast.success("Treino concluído! 💪");
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isPending}
      onClick={handleClick}
      className="h-auto w-full rounded-full py-3 text-sm font-semibold text-foreground"
    >
      Marcar como concluído
    </Button>
  );
}
