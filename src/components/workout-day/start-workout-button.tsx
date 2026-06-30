"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { startWorkoutSessionAction } from "@/app/workout-plans/[workoutPlanId]/days/[workoutDayId]/_lib/actions";
import { Button } from "@/components/ui/button";

type StartWorkoutButtonProps = {
  workoutPlanId: string;
  workoutDayId: string;
};

export function StartWorkoutButton({
  workoutPlanId,
  workoutDayId,
}: StartWorkoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const { error } = await startWorkoutSessionAction(
        workoutPlanId,
        workoutDayId,
      );

      if (error) {
        toast.error(error);
      }
    });
  };

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className="h-auto rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand/90"
    >
      Iniciar Treino
    </Button>
  );
}
