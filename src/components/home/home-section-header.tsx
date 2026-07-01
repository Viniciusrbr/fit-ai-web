import Link from "next/link";
import { Button } from "@/components/ui/button";

type HomeSectionHeaderProps = {
  title: string;
  actionLabel: string;
  actionHref?: string;
};

export function HomeSectionHeader({
  title,
  actionLabel,
  actionHref,
}: HomeSectionHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="font-heading text-lg leading-[1.4] font-semibold text-foreground">
        {title}
      </h2>
      <Button
        asChild={Boolean(actionHref)}
        variant="link"
        className="h-auto p-0 text-xs font-normal text-brand hover:text-brand"
      >
        {actionHref ? (
          <Link href={actionHref}>{actionLabel}</Link>
        ) : (
          actionLabel
        )}
      </Button>
    </div>
  );
}
