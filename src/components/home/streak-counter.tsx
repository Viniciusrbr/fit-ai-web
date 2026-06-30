import { Flame } from "lucide-react";

type StreakCounterProps = {
  value: number;
};

export function StreakCounter({ value }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-streak px-5 py-2">
      <Flame className="size-5 fill-streak-foreground text-streak-foreground" />
      <span className="text-base font-semibold text-foreground">{value}</span>
    </div>
  );
}
