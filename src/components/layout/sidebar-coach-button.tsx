"use client";

import { Sparkles } from "lucide-react";
import { useChatUrlState } from "@/app/_lib/chat-url-state";
import { Button } from "@/components/ui/button";
import { sidebarNavItemClassName } from "./sidebar-nav-item";

export function SidebarCoachButton() {
  const [, setChatState] = useChatUrlState();

  return (
    <Button
      type="button"
      variant="ghost"
      className={sidebarNavItemClassName()}
      onClick={() =>
        setChatState({ chat_open: true, chat_initial_message: null })
      }
    >
      <Sparkles className="size-6" />
      Coach AI
    </Button>
  );
}
