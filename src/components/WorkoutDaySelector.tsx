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
              className={`px-3.5 py-2 rounded-xl text-left transition-all cursor-pointer flex flex-col ${
                isSelected
                  ? "bg-white text-black shadow-sm"
                  : "bg-[#0a0a0a] hover:bg-[#111111] text-[#888888] hover:text-white border border-[#222222] hover:border-[#333333]"
              }`}
            >
              <span
                className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                  isSelected ? "text-black/70" : "text-[#666666]"
                }`}
              >
                Day {d.dayNumber}
              </span>
              <span className="text-xs font-medium truncate max-w-[120px]">
                {d.title.replace(/^Day \d+:\s*/, "")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
