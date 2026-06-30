"use server";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import {
  startWorkoutSession,
  updateWorkoutSession,
} from "@/app/_lib/api/fetch-generated";

type ActionResult = { error?: string };

const getWorkoutDayPath = (workoutPlanId: string, workoutDayId: string) =>
  `/workout-plans/${workoutPlanId}/days/${workoutDayId}`;

export async function startWorkoutSessionAction(
  workoutPlanId: string,
  workoutDayId: string,
): Promise<ActionResult> {
  const response = await startWorkoutSession(workoutPlanId, workoutDayId);

  if (response.status !== 201) {
    return { error: "Não foi possível iniciar o treino. Tente novamente." };
  }

  revalidatePath(getWorkoutDayPath(workoutPlanId, workoutDayId));
  return {};
}

export async function completeWorkoutSessionAction(
  workoutPlanId: string,
  workoutDayId: string,
  workoutSessionId: string,
): Promise<ActionResult> {
  const response = await updateWorkoutSession(
    workoutPlanId,
    workoutDayId,
    workoutSessionId,
    { completedAt: dayjs().toISOString() },
  );

  if (response.status !== 200) {
    return {
      error: "Não foi possível concluir o treino. Tente novamente.",
    };
  }

  revalidatePath(getWorkoutDayPath(workoutPlanId, workoutDayId));
  return {};
}
