export const siteConfig = {
  name: "FIT.AI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fit-ai.viniciusrbr.dev",
  title: "FIT.AI — Treinos personalizados com inteligência artificial",
  shortDescription: "O app que vai transformar a forma como você treina.",
  description:
    "Monte seu plano de treino com inteligência artificial, acompanhe sua consistência e evolua a cada semana. Grátis e feito para quem treina na academia.",
  locale: "pt_BR",
  themeColor: "#2b54ff",
} as const;

export const publicRoutes = ["/auth"] as const;

export const privateRouteRobots = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
} as const;
