import dayjs from "dayjs";
import { headers } from "next/headers";
import { authClient } from "@/app/_lib/auth-client";
import { BottomNavigation } from "@/components/home/bottom-navigation";
import { ConsistencyCard } from "@/components/home/consistency-card";
import { HomeBanner } from "@/components/home/home-banner";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import { WorkoutDayCard } from "@/components/home/workout-day-card";
import { Sidebar } from "@/components/layout/sidebar";
import { getHomeData } from "./_lib/api/fetch-generated";
import { redirectIfNotOnboarded } from "./_lib/require-onboarding";

export default async function Home() {
  const today = dayjs().format("YYYY-MM-DD");

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  await redirectIfNotOnboarded();

  const homeResponse = await getHomeData(today);
  const homeData = homeResponse.status === 200 ? homeResponse.data : null;
  const todayWorkoutDay = homeData?.todayWorkoutDay ?? null;

  return (
    <div className="flex min-h-dvh bg-background">
      <Sidebar activeItem="home" />

      <main className="relative mx-auto flex w-full max-w-md flex-col pb-28 lg:mx-0 lg:max-w-none lg:flex-1 lg:gap-7 lg:px-12 lg:py-10 lg:pb-10">
        <HomeBanner userName={session.data?.user.name} />

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-7">
          <section className="flex flex-col gap-3 px-5 pt-5 lg:flex-1 lg:px-0 lg:pt-0">
            <HomeSectionHeader
              title="Consistência"
              actionLabel="Ver histórico"
            />
            <ConsistencyCard
              referenceDate={today}
              consistencyByDay={homeData?.consistencyByDay ?? {}}
              streak={homeData?.workoutStreak ?? 0}
            />
          </section>

          <section className="flex flex-col gap-3 p-5 lg:flex-1 lg:p-0">
            <HomeSectionHeader
              title="Treino de Hoje"
              actionLabel="Ver treinos"
              actionHref={
                homeData?.activeWorkoutPlanId
                  ? `/workout-plans/${homeData.activeWorkoutPlanId}`
                  : undefined
              }
            />
            {todayWorkoutDay && !todayWorkoutDay.isRest ? (
              <WorkoutDayCard
                name={todayWorkoutDay.name}
                weekDay={todayWorkoutDay.weekDay}
                estimatedDurationInSeconds={
                  todayWorkoutDay.estimatedDurationInSeconds
                }
                exercisesCount={todayWorkoutDay.exercisesCount}
                coverImageUrl={todayWorkoutDay.coverImageUrl}
                href={`/workout-plans/${todayWorkoutDay.workoutPlanId}/days/${todayWorkoutDay.id}`}
                className="lg:h-60"
              />
            ) : (
              <div className="flex h-50 items-center justify-center rounded-xl border border-border px-6 text-center lg:h-60">
                <p className="text-sm text-muted-foreground">
                  Nenhum treino para hoje. Aproveite o descanso! 💪
                </p>
              </div>
            )}
          </section>
        </div>

        <BottomNavigation />
      </main>
    </div>
  );
}
