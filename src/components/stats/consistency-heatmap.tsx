import dayjs from "dayjs";
import type { GetStats200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";

const PT_MONTHS_SHORT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

type HeatmapGroup = {
  key: string;
  label: string;
  weeks: dayjs.Dayjs[][];
};

type ConsistencyHeatmapProps = {
  referenceDate: string;
  consistencyByDay: GetStats200ConsistencyByDay;
};

const getMonday = (date: dayjs.Dayjs) =>
  date.subtract((date.day() + 6) % 7, "day");

export function ConsistencyHeatmap({
  referenceDate,
  consistencyByDay,
}: ConsistencyHeatmapProps) {
  const reference = dayjs(referenceDate);
  const firstMonth = reference.startOf("month").subtract(2, "month");
  const lastWeekMonday = getMonday(reference.endOf("month"));

  const groups: HeatmapGroup[] = [];
  let weekMonday = getMonday(firstMonth);

  while (!weekMonday.isAfter(lastWeekMonday, "day")) {
    const anchor = weekMonday.isBefore(firstMonth)
      ? firstMonth
      : weekMonday.startOf("month");
    const key = anchor.format("YYYY-MM");

    let group = groups.at(-1);
    if (!group || group.key !== key) {
      group = { key, label: PT_MONTHS_SHORT[anchor.month()], weeks: [] };
      groups.push(group);
    }

    group.weeks.push(
      Array.from({ length: 7 }, (_, index) => weekMonday.add(index, "day")),
    );
    weekMonday = weekMonday.add(1, "week");
  }

  return (
    <div className="flex w-full gap-1 overflow-clip rounded-xl border border-border p-5">
      {groups.map((group, groupIndex) => (
        <div
          key={group.key}
          className={cn(
            "flex flex-col justify-center gap-1.5",
            groupIndex === groups.length - 1 && "flex-1",
          )}
        >
          <span className="text-xs text-muted-foreground">{group.label}</span>
          <div className="flex gap-1">
            {group.weeks.map((week) => (
              <div
                key={week[0].format("YYYY-MM-DD")}
                className="flex flex-col gap-1"
              >
                {week.map((day) => {
                  const consistency =
                    consistencyByDay[day.format("YYYY-MM-DD")];
                  const completed = consistency?.workoutDayCompleted ?? false;
                  const started = consistency?.workoutDayStarted ?? false;

                  return (
                    <div
                      key={day.format("YYYY-MM-DD")}
                      className={cn(
                        "size-5 rounded-md",
                        completed && "bg-brand",
                        !completed && started && "bg-brand-muted",
                        !completed && !started && "border border-border",
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
