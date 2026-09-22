import { WeeklyActivity } from "../../types/analytics";

interface WeeklyActivityChartProps {
  data: WeeklyActivity[];
}

export default function WeeklyActivityChart({ data }: WeeklyActivityChartProps) {
  const maxValue = Math.max(...data.map((d) => d.cardsStudied));

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-gray-900">Weekly Activity</h3>
      <div className="flex items-end justify-between gap-3" style={{ height: "160px" }}>
        {data.map((day) => {
          const heightPercent = (day.cardsStudied / maxValue) * 100;
          return (
            <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-indigo-500"
                  style={{ height: `${heightPercent}%` }}
                  title={`${day.cardsStudied} cards`}
                />
              </div>
              <span className="text-xs text-gray-400">{day.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}