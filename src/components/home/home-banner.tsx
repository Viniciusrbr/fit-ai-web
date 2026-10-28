import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type HomeBannerProps = {
  userName?: string;
  todayWorkoutHref?: string;
};

export function HomeBanner({ userName, todayWorkoutHref }: HomeBannerProps) {
  const firstName = userName?.trim().split(" ")[0];

  return (
    <header className="relative flex h-74 flex-col justify-between overflow-hidden rounded-b-4xl px-5 pt-5 pb-10 lg:h-60 lg:rounded-4xl lg:px-8 lg:pt-7 lg:pb-8">
      <Image
        src="/home-banner.jpg"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 100vw, 448px"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-linear-242 from-transparent from-35% to-foreground" />
      <p className="relative font-anton text-[22px] leading-[1.15] text-background uppercase lg:hidden">
        Fit.ai
      </p>
      <div className="relative flex w-full items-end justify-between gap-4 lg:mt-auto">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-heading text-2xl leading-[1.05] font-semibold tracking-tight text-background lg:text-4xl">
            Olá{firstName ? `, ${firstName}` : ""}
          </h1>
          <p className="text-sm leading-[1.15] text-background/70 lg:text-base">
            {todayWorkoutHref
              ? "Bora treinar hoje?"
              : "Hoje é dia de recarregar."}
          </p>
        </div>
        {todayWorkoutHref ? (
          <Button
            asChild
            className="h-auto rounded-full px-5 py-2.5 text-sm font-semibold motion-safe:hover:-translate-y-px"
          >
            <Link href={todayWorkoutHref}>Bora!</Link>
          </Button>
        ) : null}
      </div>
    </header>
  );
}
