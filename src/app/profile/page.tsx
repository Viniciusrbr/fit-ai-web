import { BicepsFlexed, Ruler, User, WeightTilde } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserTrainData } from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { BottomNavigation } from "@/components/home/bottom-navigation";
import { LogoutButton } from "@/components/profile/logout-button";
import { StatCard } from "@/components/stats/stat-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formatWeight = (weightInGrams: number) => {
  const kilograms = weightInGrams / 1000;
  return Number.isInteger(kilograms) ? String(kilograms) : kilograms.toFixed(1);
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default async function ProfilePage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect("/auth");
  }

  const response = await getUserTrainData();

  if (response.status === 401) {
    redirect("/auth");
  }

  const trainData = response.status === 200 ? response.data : null;
  const user = session.data.user;
  const name = trainData?.userName ?? user.name;

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background pb-28">
      <header className="flex h-14 items-center px-5">
        <p className="font-anton text-[22px] leading-[1.15] text-foreground uppercase">
          Fit.ai
        </p>
      </header>

      <div className="flex flex-col items-center gap-5 p-5">
        <div className="flex w-full items-center gap-3">
          <Avatar className="size-13">
            {user.image ? <AvatarImage src={user.image} alt={name} /> : null}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <p className="font-heading text-lg leading-[1.05] font-semibold text-foreground">
              {name}
            </p>
            <p className="text-sm leading-[1.15] text-foreground/70">
              Plano Básico
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3">
          <StatCard
            icon={WeightTilde}
            value={trainData ? formatWeight(trainData.weightInGrams) : "–"}
            label="KG"
          />
          <StatCard
            icon={Ruler}
            value={trainData ? String(trainData.heightInCentimeters) : "–"}
            label="CM"
          />
          <StatCard
            icon={BicepsFlexed}
            value={trainData ? `${trainData.bodyFatPercentage}%` : "–"}
            label="GC"
          />
          <StatCard
            icon={User}
            value={trainData ? String(trainData.age) : "–"}
            label="ANOS"
          />
        </div>

        <LogoutButton />
      </div>

      <BottomNavigation activeItem="profile" />
    </main>
  );
}
