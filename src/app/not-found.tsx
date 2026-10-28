import type { Metadata } from "next";
import Link from "next/link";
import { StatusScreen } from "@/components/layout/status-screen";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <StatusScreen
      eyebrow="404"
      title="Essa página saiu da academia"
      description="O link pode estar quebrado ou o treino foi removido do seu plano."
      action={
        <Button
          asChild
          className="h-auto rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          <Link href="/">Voltar ao início</Link>
        </Button>
      }
    />
  );
}
