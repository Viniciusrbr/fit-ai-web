"use client";

import { CircleQuestionMark } from "lucide-react";
import { useChatUrlState } from "@/app/_lib/chat-url-state";
import { Button } from "@/components/ui/button";

type ExerciseHelpButtonProps = {
  exerciseName: string;
};

export function ExerciseHelpButton({ exerciseName }: ExerciseHelpButtonProps) {
  const [, setChatState] = useChatUrlState();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={`Perguntar ao Coach AI como executar ${exerciseName}`}
      onClick={() =>
        setChatState({
          chat_open: true,
          chat_initial_message: `Como executar o exercício ${exerciseName} corretamente?`,
        })
      }
      className="-mr-2 size-10 text-muted-foreground hover:text-brand"
    >
      <CircleQuestionMark className="size-5" aria-hidden />
    </Button>
  );
}
