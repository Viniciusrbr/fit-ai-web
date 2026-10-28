import { Flame } from "lucide-react";

type StreakCounterProps = {
  value: number;
};

export function StreakCounter({ value }: StreakCounterProps) {
  return (
    <div
      role="img"
      aria-label={`Sequência de ${value} ${value === 1 ? "dia" : "dias"}`}
      className="flex items-center gap-2 rounded-xl bg-streak px-5 py-2"
    >
      <Flame
        className="size-5 fill-streak-foreground text-streak-foreground"
        aria-hidden
      />
      <span className="text-base font-semibold text-foreground tabular-nums">
        {value}
      </span>
    </div>
  );
}
