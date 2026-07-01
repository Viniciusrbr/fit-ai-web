"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Não foi possível sair da conta. Tente novamente.");
        return;
      }

      router.replace("/auth");
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={isPending}
      onClick={handleLogout}
      className="h-auto gap-2 rounded-full px-4 py-2 text-base font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      Sair da conta
      <LogOut className="size-4" />
    </Button>
  );
}
