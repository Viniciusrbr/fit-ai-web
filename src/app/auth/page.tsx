"use client";

import dayjs from "dayjs";
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
    <div className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-foreground lg:flex-row">
      <div className="absolute inset-0 lg:relative lg:inset-auto lg:flex-1 lg:self-stretch">
        <Image
          src="/login-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="relative z-10 flex justify-center pt-12 lg:hidden">
        <Image
          src="/fit-ai-logo.svg"
          alt="FIT.AI"
          width={85}
          height={38}
          priority
        />
      </div>

      <div className="flex-1 lg:hidden" />

      <div className="relative z-10 flex w-full flex-col items-center gap-15 rounded-t-4xl bg-brand px-5 pt-12 pb-10 lg:w-xl lg:shrink-0 lg:justify-between lg:gap-0 lg:rounded-none lg:px-18 lg:pt-16 lg:pb-12">
        <div className="hidden lg:block">
          <Image src="/fit-ai-logo.svg" alt="FIT.AI" width={120} height={54} />
        </div>

        <div className="flex w-full flex-col items-center gap-6 lg:items-start lg:gap-10">
          <h1 className="w-full text-center font-heading text-[32px] font-semibold leading-[1.05] tracking-tight text-brand-foreground lg:text-left lg:text-5xl">
            O app que vai transformar a forma como você treina.
          </h1>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="h-11 gap-2.5 rounded-full bg-background px-7 text-sm font-semibold text-foreground shadow-lg shadow-foreground/15 hover:bg-background/90 focus-visible:ring-background/60 motion-safe:hover:-translate-y-px lg:self-start"
          >
            <Image src="/google.svg" alt="" width={18} height={18} />
            Entrar com Google
          </Button>
        </div>

        <p className="text-center text-xs leading-[1.4] text-brand-foreground/70 lg:text-[13px]">
          © {dayjs().year()} FIT.AI. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
