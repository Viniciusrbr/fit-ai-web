"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Sparkles, X } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";
import { useChatUrlState } from "@/app/_lib/chat-url-state";
import { Button } from "@/components/ui/button";

const SUGGESTED_MESSAGES = ["Monte meu plano de treino"];

const getMessageText = (parts: { type: string; text?: string }[]) =>
  parts.map((part) => (part.type === "text" ? (part.text ?? "") : "")).join("");

export function ChatOverlay() {
  const [{ chat_initial_message }, setChatState] = useChatUrlState();
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/ai" }),
  });
  const [input, setInput] = useState("");
  const initialSentRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isBusy = status === "submitted" || status === "streaming";

  const closeChat = () =>
    setChatState({ chat_open: false, chat_initial_message: null });

  useEffect(() => {
    if (!chat_initial_message || initialSentRef.current) {
      return;
    }

    initialSentRef.current = true;
    sendMessage({ text: chat_initial_message });
    setChatState({ chat_initial_message: null });
  }, [chat_initial_message, sendMessage, setChatState]);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setChatState({ chat_open: false, chat_initial_message: null });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setChatState]);

  const submitMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) {
      return;
    }

    sendMessage({ text: trimmed });
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage(input);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
      <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-md flex-col px-4 pt-40 pb-4">
        <div className="pointer-events-auto flex min-h-0 flex-1 flex-col overflow-hidden rounded-4xl bg-background">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full border border-brand/8 bg-brand/8 p-3">
                <Sparkles className="size-4.5 text-brand" />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-heading text-base leading-[1.05] font-semibold text-foreground">
                  Coach AI
                </p>
                <div className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-online" />
                  <span className="text-xs leading-[1.15] text-brand">
                    Online
                  </span>
                </div>
              </div>
            </div>
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
          </div>

          <div
            ref={scrollRef}
            className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-5"
          >
            {messages.map((message) => {
              const text = getMessageText(message.parts);

              if (message.role === "user") {
                return (
                  <div
                    key={message.id}
                    className="flex justify-end pt-5 pr-5 pl-15"
                  >
                    <div className="rounded-xl bg-brand p-3 text-sm leading-[1.4] text-brand-foreground">
                      {text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={message.id} className="pt-5 pr-15 pl-5">
                  <div className="rounded-xl bg-secondary p-3 text-sm leading-[1.4] text-foreground">
                    <Streamdown>{text}</Streamdown>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            {messages.length === 0 ? (
              <div className="flex gap-2.5 overflow-x-auto px-5">
                {SUGGESTED_MESSAGES.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="ghost"
                    onClick={() => submitMessage(suggestion)}
                    className="h-auto shrink-0 rounded-full bg-brand-muted px-4 py-2 text-sm font-normal text-foreground hover:bg-brand-muted/80"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border p-5"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Digite sua mensagem"
                className="min-w-0 flex-1 rounded-full bg-secondary px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Enviar mensagem"
                disabled={isBusy || !input.trim()}
                className="size-10.5 shrink-0 rounded-full bg-brand hover:bg-brand/90"
              >
                <ArrowUp className="size-5 text-brand-foreground" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
