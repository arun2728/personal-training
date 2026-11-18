"use client";

import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import {
  NUTRITION_TARGETS,
  NUTRITION_MEALS,
  NUTRITION_NOTES,
} from "@/data/sheetData";
import {
  Salad,
  Flame,
  Clock,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function NutritionPage() {
  return (
    <div className="min-h-screen bg-black text-[#ededed] flex flex-col pb-28 selection:bg-white selection:text-black">
      <Navbar />
      <SheetTabsNav />

      <main className="max-w-2xl mx-auto w-full px-4 pt-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#141414] text-[#888888] border border-[#262626]">
                Sheet 5: Fuel &amp; Diet Plan
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Nutrition Plan
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              Personalized macro targets &amp; meal structure by Coach Aanchal
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <Salad className="h-5 w-5" />
          </div>
        </div>

        {/* Macro Distribution Cards */}
        <div className="grid grid-cols-4 gap-2">
          <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-center">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[#666666]">
              Calories
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-white mt-1">
              1850 - 1900
            </div>
            <div className="text-[9px] font-mono text-[#888888]">kcal / day</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-center">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[#666666]">
              Protein
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-1">
              125 - 135
            </div>
            <div className="text-[9px] font-mono text-[#888888]">grams daily</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-center">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[#666666]">
              Carbs
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-sky-400 mt-1">
              200+
            </div>
            <div className="text-[9px] font-mono text-[#888888]">grams fuel</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-center">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[#666666]">
              Fats
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-amber-400 mt-1">
              40 - 45
            </div>
            <div className="text-[9px] font-mono text-[#888888]">grams healthy</div>
          </div>
        </div>

        {/* Critical Dietary Rules Callout */}
        <div className="p-3.5 rounded-xl bg-[#0d140f] border border-[#1b3823] space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-mono font-semibold text-emerald-300 uppercase tracking-wider">
              Aanchal&apos;s Core Nutrition Rules
            </span>
          </div>
          <ul className="text-xs text-[#d1d5db] font-sans space-y-1.5 pl-5 list-disc">
            {NUTRITION_NOTES.map((note, idx) => (
              <li key={idx} className="leading-relaxed">
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Structured Meals Breakdown */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#888888] px-1">
            Prescribed Daily Meal Schedule
          </h2>

          {NUTRITION_MEALS.map((meal, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] hover:border-[#333333] transition-all space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#1a1a1a]">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {meal.mealName}
                  </h3>
                  {meal.timing && (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-[#666666] mt-0.5">
                      <Clock className="h-3 w-3" />
                      <span>{meal.timing}</span>
                    </div>
                  )}
                </div>

                {(meal.protein > 0 || meal.carbs > 0 || meal.fats > 0) && (
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      P: {meal.protein}g
                    </span>
                    <span className="text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                      C: {meal.carbs}g
                    </span>
                    <span className="text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      F: {meal.fats}g
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                {meal.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-start gap-2 text-xs text-[#ededed] font-sans"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/80 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
