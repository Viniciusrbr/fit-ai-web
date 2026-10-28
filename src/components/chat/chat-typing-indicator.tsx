import { cn } from "@/lib/utils";

const DOT_DELAY_CLASS_NAMES = [
  "[animation-delay:0ms]",
  "[animation-delay:150ms]",
  "[animation-delay:300ms]",
];

export function ChatTypingIndicator() {
  return (
    <div className="pt-5 pl-5">
      <output className="inline-flex items-center gap-1 rounded-xl bg-secondary px-3.5 py-3.5">
        <span className="sr-only">Coach AI está digitando</span>
        {DOT_DELAY_CLASS_NAMES.map((delayClassName) => (
          <span
            key={delayClassName}
            aria-hidden
            className={cn(
              "size-1.5 rounded-full bg-muted-foreground motion-safe:animate-bounce",
              delayClassName,
            )}
          />
        ))}
      </output>
    </div>
  );
}
