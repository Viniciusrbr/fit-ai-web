import dayjs from "dayjs";
import { headers } from "next/headers";
import { authClient } from "@/app/_lib/auth-client";
import { BottomNavigation } from "@/components/home/bottom-navigation";
import { ConsistencyCard } from "@/components/home/consistency-card";
import { HomeBanner } from "@/components/home/home-banner";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import { WorkoutDayCard } from "@/components/home/workout-day-card";
import { getHomeData } from "./_lib/api/fetch-generated";

export default async function Home() {
  const today = dayjs().format("YYYY-MM-DD");

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const homeResponse = await getHomeData(today);
  const homeData = homeResponse.status === 200 ? homeResponse.data : null;
  const todayWorkoutDay = homeData?.todayWorkoutDay ?? null;

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-28">
      <HomeBanner userName={session.data?.user.name} />

      <section className="flex flex-col gap-3 px-5 pt-5">
        <HomeSectionHeader title="Consistência" actionLabel="Ver histórico" />
        <ConsistencyCard
          referenceDate={today}
          consistencyByDay={homeData?.consistencyByDay ?? {}}
          streak={homeData?.workoutStreak ?? 0}
        />
      </section>

      <section className="flex flex-col gap-3 p-5">
        <HomeSectionHeader title="Treino de Hoje" actionLabel="Ver treinos" />
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
          />
        ) : (
          <div className="flex h-50 items-center justify-center rounded-xl border border-border px-6 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhum treino para hoje. Aproveite o descanso! 💪
            </p>
          </div>
        )}
      </section>

      <BottomNavigation />
    </main>
  );
}
