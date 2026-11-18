"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { FRUITS_AND_VEGGIES_DATA, FoodItem } from "@/data/sheetData";
import { Apple, Search } from "lucide-react";

export default function FruitsAndVeggiesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Vegetable" | "Fruit">("All");

  const filteredFoods = FRUITS_AND_VEGGIES_DATA.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || item.category === filter;
    return matchesSearch && matchesFilter;
  });

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
                Sheet 11: Food Reference
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Fruits &amp; Veggies
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              Calorie and macronutrient database per 100g serving
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <Apple className="h-5 w-5" />
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="h-4 w-4 text-[#666666] absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cucumber, spinach, berries..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#0a0a0a] border border-[#262626] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-white font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {(["All", "Vegetable", "Fruit"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  filter === cat
                    ? "bg-white text-black font-semibold"
                    : "bg-[#111111] text-[#888888] hover:text-white border border-[#222222]"
                }`}
              >
                {cat === "All" ? "All Items" : `${cat}s`}
              </button>
            ))}
            <span className="text-[10px] font-mono text-[#666666] ml-auto">
              {filteredFoods.length} items
            </span>
          </div>
        </div>

        {/* Foods Grid / Table */}
        <div className="space-y-2">
          {filteredFoods.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] hover:border-[#333333] transition-colors flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#666666] block">
                  {item.category}
                </span>
                <span className="font-semibold text-white tracking-tight">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <div className="text-right">
                  <span className="text-white font-bold">{item.caloriesPer100g}</span>
                  <span className="text-[#666666] text-[9px] block">kcal/100g</span>
                </div>
                <div className="text-right text-emerald-400">
                  <span>{item.protein}g</span>
                  <span className="text-[#666666] text-[9px] block">prot</span>
                </div>
                <div className="text-right text-sky-400">
                  <span>{item.carbs}g</span>
                  <span className="text-[#666666] text-[9px] block">carb</span>
                </div>
                <div className="text-right text-amber-400">
                  <span>{item.fat}g</span>
                  <span className="text-[#666666] text-[9px] block">fat</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
