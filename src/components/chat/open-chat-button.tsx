"use client";

import { Sparkles } from "lucide-react";
import { useChatUrlState } from "@/app/_lib/chat-url-state";
import { Button } from "@/components/ui/button";

export function OpenChatButton() {
  const [, setChatState] = useChatUrlState();

  return (
    <Button
      type="button"
      size="icon"
      aria-label="Assistente de IA"
      onClick={() =>
        setChatState({ chat_open: true, chat_initial_message: null })
      }
      className="size-14 rounded-full bg-brand hover:bg-brand/90"
    >
      <Sparkles className="size-6 text-brand-foreground" />
    </Button>
  );
}
