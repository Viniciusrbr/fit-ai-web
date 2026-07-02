import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { Chat } from "@/components/chat/chat";
import { Button } from "@/components/ui/button";

export default async function OnboardingPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect("/auth");
  }

  return (
    <main className="mx-auto flex h-dvh w-full max-w-md flex-col bg-background">
      <Chat
        initialMessage="Quero começar a melhorar minha saúde"
        headerAction={
          <Button
            asChild
            variant="link"
            className="h-auto p-0 text-sm font-semibold text-brand hover:text-brand"
          >
            <Link href="/">Acessar FIT.AI</Link>
          </Button>
        }
      />
    </main>
  );
}
