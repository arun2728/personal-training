"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { SUPPLEMENTS_LIST } from "@/data/sheetData";
import {
  Pill,
  Clock,
  CheckCircle2,
  Check,
  ShieldCheck,
  Info,
} from "lucide-react";

export default function SupplementsPage() {
  const [takenStatus, setTakenStatus] = useState<Record<string, boolean>>({});
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayDate(today);

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`pt_supplements_taken_${today}`);
      if (stored) {
        try {
          setTakenStatus(JSON.parse(stored));
        } catch {
          // Keep defaults
        }
      }
    }
  }, []);

  const toggleSupplement = (name: string) => {
    const updated = {
      ...takenStatus,
      [name]: !takenStatus[name],
    };
    setTakenStatus(updated);
    if (typeof window !== "undefined" && todayDate) {
      localStorage.setItem(
        `pt_supplements_taken_${todayDate}`,
        JSON.stringify(updated)
      );
    }
  };

  const takenCount = Object.values(takenStatus).filter(Boolean).length;
  const totalCount = SUPPLEMENTS_LIST.length;

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
                Sheet 6: Recovery &amp; Health
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Supplementations
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              Prescribed daily protocol, dosages &amp; intake timing
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <Pill className="h-5 w-5" />
          </div>
        </div>

        {/* Daily Compliance Tracker Card */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
              Today&apos;s Protocol
            </span>
            <p className="text-[11px] font-mono text-[#888888] mt-0.5">
              {takenCount} of {totalCount} supplements taken today
            </p>
          </div>

          <div className="text-right">
            <div className="text-base font-bold font-mono text-emerald-400">
              {takenCount === totalCount ? "100% Done" : `${Math.round((takenCount / totalCount) * 100)}%`}
            </div>
          </div>
        </div>

        {/* Supplements List */}
        <div className="space-y-3">
          {SUPPLEMENTS_LIST.map((item, idx) => {
            const isTaken = !!takenStatus[item.name];

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isTaken
                    ? "bg-[#0b140e] border-[#1d3823]"
                    : "bg-[#0a0a0a] border-[#222222] hover:border-[#333333]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#141414] text-[#888888] border border-[#262626]">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-sky-400 mt-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Timing: {item.time}</span>
                    </div>

                    {item.notes && (
                      <p className="text-xs text-[#a1a1aa] font-sans pt-1 leading-relaxed">
                        {item.notes}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSupplement(item.name)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isTaken
                        ? "bg-emerald-500 text-black shadow-sm"
                        : "bg-[#141414] border border-[#262626] text-[#666666] hover:text-white"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Note */}
        <div className="p-3.5 rounded-xl bg-[#0a0a0a] border border-[#1f1f1f] text-xs text-[#888888] flex items-start gap-2.5">
          <Info className="h-4 w-4 text-[#666666] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Take Vitamin D3 with your fattiest meal for fat-soluble bioavailability. Keep Creatine intake consistent at 5g every single day (even on rest days) with adequate water intake.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
