import dayjs from "dayjs";
import { Calendar, ChartNoAxesColumn, House, UserRound } from "lucide-react";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { BottomNavigationItem } from "./bottom-navigation-item";

type BottomNavigationProps = {
  activeItem?: "home" | "calendar" | "stats" | "profile";
};

export async function BottomNavigation({
  activeItem = "home",
}: BottomNavigationProps) {
  const today = dayjs().format("YYYY-MM-DD");

  const homeResponse = await getHomeData(today);
  const todayWorkoutDay =
    homeResponse.status === 200 ? homeResponse.data.todayWorkoutDay : undefined;

  const calendarHref =
    todayWorkoutDay && !todayWorkoutDay.isRest
      ? `/workout-plans/${todayWorkoutDay.workoutPlanId}/days/${todayWorkoutDay.id}`
      : "/";

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-md items-center justify-center gap-6 rounded-t-4xl border-t border-border bg-background/90 px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
    >
      <BottomNavigationItem
        icon={House}
        label="Início"
        href="/"
        isActive={activeItem === "home"}
      />
      <BottomNavigationItem
        icon={Calendar}
        label="Agenda"
        href={calendarHref}
        isActive={activeItem === "calendar"}
      />
      <OpenChatButton />
      <BottomNavigationItem
        icon={ChartNoAxesColumn}
        label="Estatísticas"
        href="/stats"
        isActive={activeItem === "stats"}
      />
      <BottomNavigationItem
        icon={UserRound}
        label="Perfil"
        href="/profile"
        isActive={activeItem === "profile"}
      />
    </nav>
  );
}
