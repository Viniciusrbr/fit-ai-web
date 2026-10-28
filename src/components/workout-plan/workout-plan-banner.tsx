import { Goal } from "lucide-react";
import Image from "next/image";

type WorkoutPlanBannerProps = {
  planName: string;
};

export function WorkoutPlanBanner({ planName }: WorkoutPlanBannerProps) {
  return (
    <header className="relative flex h-74 flex-col justify-between overflow-hidden rounded-b-4xl px-5 pt-5 pb-10 lg:h-55 lg:rounded-4xl lg:px-8 lg:pt-7 lg:pb-8">
      <Image
        src="/workout-plan-banner.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 100vw, 448px"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-linear-238 from-transparent to-foreground/80" />
      <p className="relative font-anton text-[22px] leading-[1.15] text-background uppercase lg:hidden">
        Fit.ai
      </p>
      <div className="relative flex flex-col gap-3 lg:mt-auto">
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-brand px-2.5 py-1.25 text-xs font-semibold tracking-wide text-brand-foreground uppercase">
          <Goal className="size-4" aria-hidden />
          {planName}
        </span>
        <h1 className="font-heading text-2xl leading-[1.05] font-semibold tracking-tight text-background lg:text-4xl">
          Plano de treino
        </h1>
      </div>
    </header>
  );
}
