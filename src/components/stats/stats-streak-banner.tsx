import { Flame } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type StatsStreakBannerProps = {
  streak: number;
};

export function StatsStreakBanner({ streak }: StatsStreakBannerProps) {
  const hasStreak = streak > 0;
  const daysLabel = `${streak} ${streak === 1 ? "dia" : "dias"}`;

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-xl px-5 py-10">
      <Image
        src={
          hasStreak ? "/streak-banner-active.png" : "/streak-banner-empty.png"
        }
        alt=""
        fill
        priority
        sizes="448px"
        className="object-cover"
      />
      <div className="relative flex flex-col items-center gap-3">
        <div className="flex items-center justify-center rounded-full border border-background/15 bg-background/15 p-3 backdrop-blur-xs">
          <Flame
            className={cn(
              "size-8",
              hasStreak
                ? "fill-streak-foreground text-streak-foreground"
                : "fill-background text-background",
            )}
          />
        </div>
        <div className="flex flex-col items-center gap-1 text-background">
          <p className="text-center font-heading text-5xl leading-[0.95] font-semibold">
            {daysLabel}
          </p>
          <p className="text-base leading-[1.15] text-background/60">
            Sequência Atual
          </p>
        </div>
      </div>
    </div>
  );
}
