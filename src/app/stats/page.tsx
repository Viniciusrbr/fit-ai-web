import dayjs from "dayjs";
import { CircleCheck, CirclePercent, Hourglass } from "lucide-react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getStats } from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { redirectIfNotOnboarded } from "@/app/_lib/require-onboarding";
import { BottomNavigation } from "@/components/home/bottom-navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { ConsistencyHeatmap } from "@/components/stats/consistency-heatmap";
import { StatCard } from "@/components/stats/stat-card";
import { StatsStreakBanner } from "@/components/stats/stats-streak-banner";

const formatTotalTime = (totalTimeInSeconds: number) => {
  const totalMinutes = Math.round(totalTimeInSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}h${String(minutes).padStart(2, "0")}m`;
};

export default async function StatsPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect("/auth");
  }

  await redirectIfNotOnboarded();

  const today = dayjs();
  const from = today.startOf("month").subtract(2, "month").format("YYYY-MM-DD");
  const to = today.format("YYYY-MM-DD");

  const response = await getStats({ from, to });

  if (response.status === 401) {
    redirect("/auth");
  }

  if (response.status !== 200) {
    notFound();
  }

  const stats = response.data;

  return (
    <div className="flex min-h-dvh bg-background">
      <Sidebar activeItem="stats" />

      <main className="relative mx-auto flex w-full max-w-md flex-col pb-28 lg:mx-0 lg:max-w-none lg:flex-1 lg:gap-6 lg:p-12 lg:pb-12">
        <header className="flex h-14 items-center px-5 lg:hidden">
          <p className="font-anton text-[22px] leading-[1.15] text-foreground uppercase">
            Fit.ai
          </p>
        </header>

        <h1 className="hidden px-5 text-3xl font-semibold text-foreground lg:block lg:px-0">
          Evolução
        </h1>

        <div className="px-5 lg:px-0">
          <StatsStreakBanner streak={stats.workoutStreak} />
        </div>

        <section className="flex flex-col gap-3 p-5 lg:gap-6 lg:p-0">
          <h2 className="font-heading text-lg leading-[1.4] font-semibold text-foreground">
            Consistência
          </h2>

          <div className="lg:rounded-xl lg:border lg:border-border lg:p-6">
            <ConsistencyHeatmap
              referenceDate={to}
              consistencyByDay={stats.consistencyByDay}
            />
          </div>

          <div className="flex flex-wrap gap-3 lg:flex-nowrap lg:gap-4">
            <StatCard
              icon={CircleCheck}
              value={String(stats.completedWorkoutsCount)}
              label="Treinos Feitos"
              className="flex-[1_1_calc(50%-0.375rem)] lg:flex-1"
            />
            <StatCard
              icon={CirclePercent}
              value={`${Math.round(stats.conclusionRate * 100)}%`}
              label="Taxa de conclusão"
              className="flex-[1_1_calc(50%-0.375rem)] lg:flex-1"
            />
            <StatCard
              icon={Hourglass}
              value={formatTotalTime(stats.totalTimeInSeconds)}
              label="Tempo Total"
              className="flex-[1_1_100%] lg:flex-1"
            />
          </div>
        </section>

        <BottomNavigation activeItem="stats" />
      </main>
    </div>
  );
}
