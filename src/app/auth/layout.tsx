import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Entrar na FIT.AI",
  description: siteConfig.description,
  alternates: {
    canonical: "/auth",
  },
  openGraph: {
    url: `${siteConfig.url}/auth`,
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData />
      {children}
    </>
  );
}
