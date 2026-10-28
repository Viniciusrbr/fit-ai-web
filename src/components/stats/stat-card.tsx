import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
};

export function StatCard({
  icon: Icon,
  value,
  label,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-5 rounded-xl bg-brand/8 p-5",
        className,
      )}
    >
      <div className="flex items-center justify-center rounded-full bg-brand/8 p-2.25">
        <Icon className="size-4 text-brand" aria-hidden />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="font-heading text-2xl leading-[1.15] font-semibold tracking-tight text-foreground tabular-nums">
          {value}
        </p>
        <p className="text-center text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
