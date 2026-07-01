import dayjs from "dayjs";
import { CircleCheck, CirclePercent, Hourglass } from "lucide-react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getStats } from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { BottomNavigation } from "@/components/home/bottom-navigation";
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
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-28">
      <header className="flex h-14 items-center px-5">
        <p className="font-anton text-[22px] leading-[1.15] text-foreground uppercase">
          Fit.ai
        </p>
      </header>

      <div className="px-5">
        <StatsStreakBanner streak={stats.workoutStreak} />
      </div>

      <section className="flex flex-col gap-3 p-5">
        <h2 className="font-heading text-lg leading-[1.4] font-semibold text-foreground">
          Consistência
        </h2>

        <ConsistencyHeatmap
          referenceDate={to}
          consistencyByDay={stats.consistencyByDay}
        />

        <div className="flex gap-3">
          <StatCard
            icon={CircleCheck}
            value={String(stats.completedWorkoutsCount)}
            label="Treinos Feitos"
            className="flex-1"
          />
          <StatCard
            icon={CirclePercent}
            value={`${Math.round(stats.conclusionRate * 100)}%`}
            label="Taxa de conclusão"
            className="flex-1"
          />
        </div>

        <StatCard
          icon={Hourglass}
          value={formatTotalTime(stats.totalTimeInSeconds)}
          label="Tempo Total"
        />
      </section>

      <BottomNavigation activeItem="stats" />
    </main>
  );
}
