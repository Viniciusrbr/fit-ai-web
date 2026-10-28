"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Sparkles } from "lucide-react";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Streamdown } from "streamdown";
import { ChatEmptyState } from "@/components/chat/chat-empty-state";
import { ChatTypingIndicator } from "@/components/chat/chat-typing-indicator";
import { Button } from "@/components/ui/button";

const SUGGESTED_MESSAGES = [
  "Monte meu plano de treino",
  "Como fazer agachamento sem dor no joelho?",
  "Quanto descansar entre as séries?",
];

const getMessageText = (parts: { type: string; text?: string }[]) =>
  parts.map((part) => (part.type === "text" ? (part.text ?? "") : "")).join("");

type ChatProps = {
  headerAction?: ReactNode;
  initialMessage?: string;
  onInitialMessageSent?: () => void;
};

export function Chat({
  headerAction,
  initialMessage,
  onInitialMessageSent,
}: ChatProps) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/ai" }),
  });
  const [input, setInput] = useState("");
  const initialSentRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isBusy = status === "submitted" || status === "streaming";
  const isWaitingForReply = status === "submitted";

  useEffect(() => {
    if (!initialMessage || initialSentRef.current) {
      return;
    }

    initialSentRef.current = true;
    sendMessage({ text: initialMessage });
    onInitialMessageSent?.();
  }, [initialMessage, sendMessage, onInitialMessageSent]);

  useEffect(() => {
    if (messages.length === 0 && !isWaitingForReply) {
      return;
    }

    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, isWaitingForReply]);

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
    <div className="flex h-full min-h-0 flex-col">
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
              <span className="size-2 rounded-full bg-online" aria-hidden />
              <span className="text-xs leading-[1.15] text-muted-foreground">
                Online
              </span>
            </div>
          </div>
        </div>
        {headerAction}
      </div>

      <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-5"
      >
        {messages.length === 0 && !initialMessage ? <ChatEmptyState /> : null}
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
        {isWaitingForReply ? <ChatTypingIndicator /> : null}
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
                className="h-auto shrink-0 rounded-full bg-brand/8 px-4 py-2 text-sm font-normal text-foreground hover:bg-brand/15"
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
            aria-label="Mensagem para o Coach AI"
            className="min-w-0 flex-1 rounded-full bg-secondary px-4 py-3 text-base text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-sm"
          />
          <Button
            type="submit"
            size="icon"
            aria-label="Enviar mensagem"
            disabled={isBusy || !input.trim()}
            className="size-10.5 shrink-0 rounded-full"
          >
            <ArrowUp className="size-5" aria-hidden />
          </Button>
        </form>
      </div>
    </div>
  );
}
