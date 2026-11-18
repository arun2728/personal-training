"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dumbbell,
  Footprints,
  Ruler,
  ClipboardCheck,
  Grid,
  X,
  ChevronRight,
} from "lucide-react";
import { APP_SHEETS } from "./SheetTabsNav";

export function BottomNav() {
  const pathname = usePathname();
  const [showAllSheets, setShowAllSheets] = useState(false);

  const mainTabs = [
    { name: "Workout", href: "/", icon: Dumbbell },
    { name: "Steps", href: "/steps", icon: Footprints },
    { name: "Measure", href: "/measurements", icon: Ruler },
    { name: "Check-in", href: "/weekly-update", icon: ClipboardCheck },
  ];

  return (
    <>
      {/* Pinned Bottom Nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-[#222222] px-2 py-1.5 pb-safe">
        <div className="flex items-center justify-around">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-white font-medium"
                    : "text-[#666666] hover:text-[#999999]"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-[#666666]"}`} />
                <span className="text-[10px] font-mono tracking-tight">{tab.name}</span>
              </Link>
            );
          })}

          {/* More Sheets Button */}
          <button
            type="button"
            onClick={() => setShowAllSheets(true)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors cursor-pointer ${
              showAllSheets ? "text-white font-medium" : "text-[#666666] hover:text-[#999999]"
            }`}
          >
            <Grid className="h-4 w-4 text-[#666666]" />
            <span className="text-[10px] font-mono tracking-tight">Sheets</span>
          </button>
        </div>
      </nav>

      {/* Sheet Drawer Modal for Mobile */}
      {showAllSheets && (
        <div className="sm:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end">
          <div className="bg-[#0a0a0a] border-t border-[#2a2a2a] rounded-t-3xl max-h-[85vh] overflow-y-auto p-4 pb-8 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1f1f1f]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
                  Spreadsheet Tabs (12 Sheets)
                </h3>
              </div>
              <button
                onClick={() => setShowAllSheets(false)}
                className="p-1 rounded-lg text-[#888888] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1.5 pt-1">
              {APP_SHEETS.map((sheet, index) => {
                const Icon = sheet.icon;
                const isActive =
                  sheet.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(sheet.href);

                return (
                  <Link
                    key={sheet.id}
                    href={sheet.href}
                    onClick={() => setShowAllSheets(false)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      isActive
                        ? "bg-white text-black font-semibold border-white"
                        : "bg-[#111111] text-[#ededed] border-[#222222] hover:border-[#333333]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isActive
                            ? "bg-black text-white"
                            : "bg-[#1a1a1a] text-[#888888]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-medium block">
                          {sheet.name}
                        </span>
                        <span
                          className={`text-[10px] font-mono ${
                            isActive ? "text-black/60" : "text-[#666666]"
                          }`}
                        >
                          Sheet {index + 1}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 ${
                        isActive ? "text-black" : "text-[#555555]"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
