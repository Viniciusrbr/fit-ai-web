import { Sparkles } from "lucide-react";

export function ChatEmptyState() {
  return (
    <div className="flex flex-1 flex-col justify-end gap-3 px-5 pt-5">
      <span className="flex size-10 items-center justify-center rounded-full bg-brand/8 text-brand">
        <Sparkles className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-1.5">
        <p className="font-heading text-xl leading-[1.1] font-semibold tracking-tight text-foreground">
          Como posso ajudar no seu treino?
        </p>
        <p className="max-w-[42ch] text-sm leading-[1.4] text-muted-foreground">
          Monte um plano, tire dúvidas de execução ou ajuste a carga da semana.
        </p>
      </div>
    </div>
  );
}
