"use client";

import { useChatUrlState } from "@/app/_lib/chat-url-state";
import { ChatOverlay } from "@/components/chat/chat-overlay";

export function ChatWidget() {
  const [{ chat_open }] = useChatUrlState();

  if (!chat_open) {
    return null;
  }

  return <ChatOverlay />;
}
