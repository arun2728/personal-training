"use client";

import { WorkoutDayTemplate } from "@/types/workout";

interface WorkoutDaySelectorProps {
  days: WorkoutDayTemplate[];
  selectedDay: number;
  onSelectDay: (dayNumber: number) => void;
}

export function WorkoutDaySelector({
  days,
  selectedDay,
  onSelectDay,
}: WorkoutDaySelectorProps) {
  return (
    <div className="w-full overflow-x-auto pb-1 no-scrollbar">
      <div className="flex items-center gap-2 min-w-max">
        {days.map((d) => {
          const isSelected = d.dayNumber === selectedDay;
          return (
            <button
              key={d.dayNumber}
              type="button"
              onClick={() => onSelectDay(d.dayNumber)}
              className={`px-4 py-2.5 rounded-2xl text-left transition-all cursor-pointer flex flex-col ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-[1.02]"
                  : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider font-mono">
                Day {d.dayNumber}
              </span>
              <span className="text-xs font-semibold truncate max-w-[110px]">
                {d.title.replace(/^Day \d+:\s*/, "")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
