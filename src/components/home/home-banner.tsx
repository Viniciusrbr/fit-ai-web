import Image from "next/image";

type HomeBannerProps = {
  userName?: string;
};

export function HomeBanner({ userName }: HomeBannerProps) {
  const firstName = userName?.trim().split(" ")[0];

  return (
    <header className="relative flex h-74 flex-col justify-between overflow-hidden rounded-b-4xl px-5 pt-5 pb-10">
      <Image
        src="/home-banner.jpg"
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
            "linear-gradient(242.47deg, rgba(0, 0, 0, 0) 34.457%, rgba(0, 0, 0, 1) 100%)",
        }}
      />
      <p className="relative font-anton text-[22px] leading-[1.15] text-background uppercase">
        Fit.ai
      </p>
      <div className="relative flex w-full items-end justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="font-heading text-2xl leading-[1.05] font-semibold text-background">
            Olá{firstName ? `, ${firstName}` : ""}
          </p>
          <p className="text-sm leading-[1.15] text-background/70">
            Bora treinar hoje?
          </p>
        </div>
        <div className="flex items-center justify-center rounded-full bg-brand px-4 py-2">
          <span className="text-sm font-semibold text-brand-foreground">
            Bora!
          </span>
        </div>
      </div>
    </header>
  );
}
