"use client";

import Link from "next/link";
import { StatusScreen } from "@/components/layout/status-screen";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  unstable_retry: () => void;
};

export default function ErrorPage({ unstable_retry }: ErrorPageProps) {
  return (
    <StatusScreen
      eyebrow="Erro"
      title="Não conseguimos carregar seus dados"
      description="Verifique sua conexão e tente novamente. Se o problema continuar, volte daqui a alguns minutos."
      action={
        <>
          <Button
            type="button"
            onClick={() => unstable_retry()}
            className="h-auto rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Tentar novamente
          </Button>
          <Button asChild variant="link" className="h-auto p-0 text-sm">
            <Link href="/">Voltar ao início</Link>
          </Button>
        </>
      }
    />
  );
}
