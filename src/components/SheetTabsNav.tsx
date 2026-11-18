"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dumbbell,
  Footprints,
  Ruler,
  ClipboardCheck,
  Salad,
  Pill,
  HeartPulse,
  Activity,
  Wind,
  BookmarkCheck,
  Apple,
  User,
} from "lucide-react";

export interface SheetTab {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

export const APP_SHEETS: SheetTab[] = [
  { id: "workout", name: "Training Plan", href: "/", icon: Dumbbell },
  { id: "steps", name: "Step Tracker", href: "/steps", icon: Footprints },
  { id: "measurements", name: "Measurements", href: "/measurements", icon: Ruler },
  { id: "weekly-update", name: "Weekly Update", href: "/weekly-update", icon: ClipboardCheck },
  { id: "nutrition", name: "Nutrition", href: "/nutrition", icon: Salad },
  { id: "supplements", name: "Supplements", href: "/supplements", icon: Pill },
  { id: "cardio", name: "Cardio", href: "/cardio", icon: HeartPulse },
  { id: "rehab", name: "Upper Body Rehab", href: "/rehab", icon: Activity },
  { id: "stress", name: "Stress Management", href: "/stress", icon: Wind },
  { id: "pointers", name: "Important Pointers", href: "/pointers", icon: BookmarkCheck },
  { id: "foods", name: "Fruits & Veggies", href: "/foods", icon: Apple },
  { id: "profile", name: "Profile Details", href: "/profile", icon: User },
];

export function SheetTabsNav() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-[#050505] border-b border-[#1f1f1f] sticky top-[57px] z-20 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-3">
        <div className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar scroll-smooth">
          {APP_SHEETS.map((sheet) => {
            const Icon = sheet.icon;
            const isActive =
              sheet.href === "/"
                ? pathname === "/"
                : pathname.startsWith(sheet.href);

            return (
              <Link
                key={sheet.id}
                href={sheet.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 select-none ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-[#888888] hover:text-[#ededed] hover:bg-[#121212]"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-black" : "text-[#777777]"}`} />
                <span className="whitespace-nowrap">{sheet.name}</span>
                {sheet.tag && (
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                      isActive
                        ? "bg-black/10 text-black"
                        : "bg-[#1f1f1f] text-[#888888]"
                    }`}
                  >
                    {sheet.tag}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
