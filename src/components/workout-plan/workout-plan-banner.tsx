import { Goal } from "lucide-react";
import Image from "next/image";

type WorkoutPlanBannerProps = {
  planName: string;
};

export function WorkoutPlanBanner({ planName }: WorkoutPlanBannerProps) {
  return (
    <header className="relative flex h-74 flex-col justify-between overflow-hidden rounded-b-4xl px-5 pt-5 pb-10">
      <Image
        src="/workout-plan-banner.png"
        alt=""
        fill
        priority
        sizes="448px"
        className="object-cover object-top"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(238.09deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />
      <p className="relative font-anton text-[22px] leading-[1.15] text-background uppercase">
        Fit.ai
      </p>
      <div className="relative flex flex-col gap-3">
        <div className="flex w-fit items-center gap-1 rounded-full bg-brand px-2.5 py-1.25">
          <Goal className="size-4 text-brand-foreground" />
          <span className="text-xs font-semibold text-brand-foreground uppercase">
            {planName}
          </span>
        </div>
        <p className="font-heading text-2xl leading-[1.05] font-semibold text-background">
          Plano de Treino
        </p>
      </div>
    </header>
  );
}
