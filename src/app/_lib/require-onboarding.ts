import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { getHomeData, getUserTrainData } from "@/app/_lib/api/fetch-generated";

export async function redirectIfNotOnboarded() {
  const [trainDataResponse, homeResponse] = await Promise.all([
    getUserTrainData(),
    getHomeData(dayjs().format("YYYY-MM-DD")),
  ]);

  const trainData =
    trainDataResponse.status === 200 ? trainDataResponse.data : null;
  const activeWorkoutPlanId =
    homeResponse.status === 200 ? homeResponse.data.activeWorkoutPlanId : null;

  if (!trainData || !activeWorkoutPlanId) {
    redirect("/onboarding");
  }
}
