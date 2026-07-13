import dayjs from "dayjs";
import { Calendar, ChartNoAxesColumn, House, UserRound } from "lucide-react";
import Link from "next/link";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-md items-center justify-center gap-6 rounded-t-4xl border border-border bg-background px-6 py-4 lg:hidden">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="size-12"
        aria-label="Início"
      >
        <Link href="/">
          <House
            className={cn(
              "size-6",
              activeItem === "home"
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          />
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="size-12"
        aria-label="Agenda"
      >
        <Link href={calendarHref}>
          <Calendar
            className={cn(
              "size-6",
              activeItem === "calendar"
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          />
        </Link>
      </Button>
      <OpenChatButton />
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="size-12"
        aria-label="Estatísticas"
      >
        <Link href="/stats">
          <ChartNoAxesColumn
            className={cn(
              "size-6",
              activeItem === "stats"
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          />
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="size-12"
        aria-label="Perfil"
      >
        <Link href="/profile">
          <UserRound
            className={cn(
              "size-6",
              activeItem === "profile"
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          />
        </Link>
      </Button>
    </nav>
  );
}
