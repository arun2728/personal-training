"use client";

import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { IMPORTANT_POINTERS } from "@/data/sheetData";
import { BookmarkCheck, Shield, Sparkles } from "lucide-react";

export default function ImportantPointersPage() {
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
                Sheet 10: Golden Rules
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Important Pointers
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              Aanchal&apos;s 10 non-negotiable principles for nutrition &amp; training
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <BookmarkCheck className="h-5 w-5" />
          </div>
        </div>

        {/* Pointers Grid */}
        <div className="space-y-3">
          {IMPORTANT_POINTERS.map((pointer) => (
            <div
              key={pointer.number}
              className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] hover:border-[#333333] transition-all space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-white text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {pointer.number}
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {pointer.title}
                </h3>
              </div>

              <p className="text-xs text-[#d1d5db] font-sans leading-relaxed pl-8">
                {pointer.body}
              </p>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
