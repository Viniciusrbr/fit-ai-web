import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function sidebarNavItemClassName(isActive?: boolean) {
  return cn(
    "h-auto w-full justify-start gap-3 rounded-[10px] px-3.5 py-3 text-[15px] font-medium",
    isActive
      ? "bg-brand/10 text-brand hover:bg-brand/10 hover:text-brand"
      : "text-foreground",
  );
}

type SidebarNavItemProps = {
  icon: ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
};

export function SidebarNavItem({
  icon,
  label,
  href,
  isActive,
}: SidebarNavItemProps) {
  return (
    <Button
      asChild
      variant="ghost"
      className={sidebarNavItemClassName(isActive)}
    >
      <Link href={href}>
        {icon}
        {label}
      </Link>
    </Button>
  );
}
