"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type WorkoutDayTopbarProps = {
  title: string;
};

export function WorkoutDayTopbar({ title }: WorkoutDayTopbarProps) {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between lg:w-auto lg:gap-3">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="-ml-2 size-9"
        aria-label="Voltar"
        onClick={() => router.back()}
      >
        <ChevronLeft className="size-6 text-foreground" />
      </Button>
      <p className="font-heading text-lg font-semibold text-foreground">
        {title}
      </p>
      <div className="size-9 shrink-0" />
    </div>
  );
}
