import dayjs from "dayjs";
import type { GetHomeData200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";
import { ConsistencyDay } from "./consistency-day";
import { StreakCounter } from "./streak-counter";

const WEEK_DAY_LETTERS = ["S", "T", "Q", "Q", "S", "S", "D"];

type ConsistencyCardProps = {
  referenceDate: string;
  consistencyByDay: GetHomeData200ConsistencyByDay;
  streak: number;
};

export function ConsistencyCard({
  referenceDate,
  consistencyByDay,
  streak,
}: ConsistencyCardProps) {
  const reference = dayjs(referenceDate);
  const monday = reference.subtract((reference.day() + 6) % 7, "day");

  const days = WEEK_DAY_LETTERS.map((label, index) => {
    const date = monday.add(index, "day");
    const consistency = consistencyByDay[date.format("YYYY-MM-DD")];

    return {
      key: date.format("YYYY-MM-DD"),
      label,
      completed: consistency?.workoutDayCompleted ?? false,
      started: consistency?.workoutDayStarted ?? false,
      isToday: date.isSame(reference, "day"),
    };
  });

  return (
    <div className="flex w-full items-stretch gap-3">
      <div className="flex flex-1 items-center justify-between rounded-xl border border-border p-5">
        {days.map((day) => (
          <ConsistencyDay
            key={day.key}
            label={day.label}
            completed={day.completed}
            started={day.started}
            isToday={day.isToday}
          />
        ))}
      </div>
      <StreakCounter value={streak} />
    </div>
  );
}
