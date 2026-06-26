"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [isPending, session, router]);

  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });

    if (error) {
      toast.error(
        "Não foi possível fazer login com o Google. Tente novamente.",
      );
    }
  };

  return (
    <div className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-foreground">
      <Image
        src="/login-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />

      <div className="relative z-10 flex justify-center pt-12">
        <Image
          src="/fit-ai-logo.svg"
          alt="FIT.AI"
          width={85}
          height={38}
          priority
        />
      </div>

      <div className="flex-1" />

      <div className="relative z-10 flex w-full flex-col items-center gap-15 rounded-t-[20px] bg-brand px-5 pt-12 pb-10">
        <div className="flex w-full flex-col items-center gap-6">
          <h1 className="w-full text-center font-heading text-[32px] font-semibold leading-[1.05] text-brand-foreground">
            O app que vai transformar a forma como você treina.
          </h1>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="h-9.5 gap-2 rounded-full bg-background px-6 text-sm font-semibold text-foreground hover:bg-background/90"
          >
            <Image src="/google.svg" alt="" width={16} height={16} />
            Fazer login com Google
          </Button>
        </div>

        <p className="text-center text-xs leading-[1.4] text-brand-foreground/70">
          ©2026 Copyright FIT.AI. Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
