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
      <h2 className="font-heading text-lg leading-[1.4] font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {actionHref ? (
        <Button
          asChild
          variant="link"
          className="h-auto p-0 text-xs font-medium"
        >
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}
