import {
  Calendar,
  ChartNoAxesColumn,
  House,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-md items-center justify-center gap-6 rounded-t-4xl border border-border bg-background px-6 py-4">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="size-12"
        aria-label="Início"
      >
        <Link href="/">
          <House className="size-6 text-foreground" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-12"
        aria-label="Agenda"
      >
        <Calendar className="size-6 text-muted-foreground" />
      </Button>
      <Button
        size="icon"
        className="size-14 rounded-full bg-brand hover:bg-brand/90"
        aria-label="Assistente de IA"
      >
        <Sparkles className="size-6 text-brand-foreground" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-12"
        aria-label="Estatísticas"
      >
        <ChartNoAxesColumn className="size-6 text-muted-foreground" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-12"
        aria-label="Perfil"
      >
        <UserRound className="size-6 text-muted-foreground" />
      </Button>
    </nav>
  );
}
