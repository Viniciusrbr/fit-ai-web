import { Button } from "@/components/ui/button";

type HomeSectionHeaderProps = {
  title: string;
  actionLabel: string;
};

export function HomeSectionHeader({
  title,
  actionLabel,
}: HomeSectionHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="font-heading text-lg leading-[1.4] font-semibold text-foreground">
        {title}
      </h2>
      <Button
        variant="link"
        className="h-auto p-0 text-xs font-normal text-brand hover:text-brand"
      >
        {actionLabel}
      </Button>
    </div>
  );
}
