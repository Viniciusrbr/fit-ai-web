"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useChatUrlState } from "@/app/_lib/chat-url-state";
import { Chat } from "@/components/chat/chat";
import { Button } from "@/components/ui/button";

export function ChatOverlay() {
  const [{ chat_initial_message }, setChatState] = useChatUrlState();

  const closeChat = () =>
    setChatState({ chat_open: false, chat_initial_message: null });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setChatState({ chat_open: false, chat_initial_message: null });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setChatState]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
      <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-md flex-col px-4 pt-40 pb-4">
        <div className="pointer-events-auto flex min-h-0 flex-1 flex-col overflow-hidden rounded-4xl bg-background">
          <Chat
            initialMessage={chat_initial_message || undefined}
            onInitialMessageSent={() =>
              setChatState({ chat_initial_message: null })
            }
            headerAction={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Fechar chat"
                onClick={closeChat}
                className="-mr-2 size-9"
              >
                <X className="size-6 text-foreground" />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
