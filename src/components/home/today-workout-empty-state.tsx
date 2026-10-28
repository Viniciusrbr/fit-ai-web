import { BatteryCharging, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type TodayWorkoutEmptyStateProps = {
  isRestDay: boolean;
};

const CREATE_PLAN_CHAT_HREF =
  "/?chat_open=true&chat_initial_message=Monte+meu+plano+de+treino";

export function TodayWorkoutEmptyState({
  isRestDay,
}: TodayWorkoutEmptyStateProps) {
  const Icon = isRestDay ? BatteryCharging : Sparkles;

  return (
    <div className="flex h-50 flex-col justify-between rounded-xl bg-muted p-5 lg:h-60">
      <span className="flex size-10 items-center justify-center rounded-full bg-background text-foreground">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-1.5">
        <p className="font-heading text-2xl leading-[1.05] font-semibold tracking-tight text-foreground">
          {isRestDay ? "Dia de descanso" : "Nenhum treino para hoje"}
        </p>
        <p className="max-w-[40ch] text-sm leading-[1.4] text-muted-foreground">
          {isRestDay
            ? "O músculo cresce na recuperação. Durma bem e volte amanhã."
            : "Peça ao Coach AI um plano montado para a sua rotina."}
        </p>
        {isRestDay ? null : (
          <Button
            asChild
            className="mt-2 h-auto w-fit rounded-full px-4 py-2 text-sm font-semibold"
          >
            <Link href={CREATE_PLAN_CHAT_HREF} scroll={false}>
              Montar meu plano
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
