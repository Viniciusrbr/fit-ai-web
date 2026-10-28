import Link from "next/link";
import type { ReactNode } from "react";

type StatusScreenProps = {
  eyebrow: string;
  title: string;
  description: string;
  action: ReactNode;
};

export function StatusScreen({
  eyebrow,
  title,
  description,
  action,
}: StatusScreenProps) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pt-5 pb-12 lg:max-w-xl">
      <Link
        href="/"
        className="w-fit rounded-md font-anton text-[22px] leading-[1.15] text-foreground uppercase outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        Fit.ai
      </Link>
      <div className="flex flex-1 flex-col justify-center gap-6">
        <p className="font-anton text-8xl leading-none text-brand tabular-nums">
          {eyebrow}
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl leading-[1.05] font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="max-w-[44ch] text-base leading-[1.5] text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">{action}</div>
      </div>
    </main>
  );
}
