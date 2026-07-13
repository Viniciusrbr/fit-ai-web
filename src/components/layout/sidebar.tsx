import dayjs from "dayjs";
import { Calendar, ChartNoAxesColumn, House, UserRound } from "lucide-react";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { SidebarCoachButton } from "./sidebar-coach-button";
import { SidebarNavItem } from "./sidebar-nav-item";

type SidebarProps = {
  activeItem?: "home" | "calendar" | "stats" | "profile";
};

export async function Sidebar({ activeItem = "home" }: SidebarProps) {
  const today = dayjs().format("YYYY-MM-DD");

  const homeResponse = await getHomeData(today);
  const todayWorkoutDay =
    homeResponse.status === 200 ? homeResponse.data.todayWorkoutDay : undefined;

  const calendarHref =
    todayWorkoutDay && !todayWorkoutDay.isRest
      ? `/workout-plans/${todayWorkoutDay.workoutPlanId}/days/${todayWorkoutDay.id}`
      : "/";

  return (
    <aside className="sticky top-0 hidden h-dvh w-65 shrink-0 flex-col gap-2 border-r border-border bg-background px-5 py-8 lg:flex">
      <p className="font-anton text-[26px] text-foreground">FIT.AI</p>
      <div className="h-6" />
      <SidebarNavItem
        icon={<House className="size-6" />}
        label="Início"
        href="/"
        isActive={activeItem === "home"}
      />
      <SidebarNavItem
        icon={<Calendar className="size-6" />}
        label="Agenda"
        href={calendarHref}
        isActive={activeItem === "calendar"}
      />
      <SidebarCoachButton />
      <SidebarNavItem
        icon={<ChartNoAxesColumn className="size-6" />}
        label="Estatísticas"
        href="/stats"
        isActive={activeItem === "stats"}
      />
      <SidebarNavItem
        icon={<UserRound className="size-6" />}
        label="Perfil"
        href="/profile"
        isActive={activeItem === "profile"}
      />
    </aside>
  );
}
