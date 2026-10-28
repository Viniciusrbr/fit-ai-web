import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BottomNavigationItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
};

export function BottomNavigationItem({
  icon: Icon,
  label,
  href,
  isActive,
}: BottomNavigationItemProps) {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={cn(
        "relative size-12 rounded-2xl",
        isActive
          ? "text-foreground after:absolute after:bottom-1 after:size-1 after:rounded-full after:bg-brand"
          : "text-muted-foreground",
      )}
    >
      <Link
        href={href}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon className="size-6" aria-hidden />
      </Link>
    </Button>
  );
}
