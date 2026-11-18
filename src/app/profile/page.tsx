"use client";

import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { TRAINEE_PROFILE } from "@/data/sheetData";
import {
  User,
  Target,
  Weight,
  Flame,
  ShieldCheck,
  Calendar,
  Cloud,
} from "lucide-react";

export default function ProfilePage() {
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
                Sheet 12: Trainee Profile
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Program Details
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              Personal profile &amp; training goals with Coach Aanchal
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
        </div>

        {/* Profile Card */}
        <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-[#222222] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-black font-bold font-mono text-lg flex items-center justify-center">
                A
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">
                  {TRAINEE_PROFILE.name}
                </h2>
                <p className="text-xs font-mono text-[#888888]">
                  Personal Training with {TRAINEE_PROFILE.coach}
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {TRAINEE_PROFILE.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-black border border-[#1f1f1f]">
              <span className="text-[10px] text-[#666666] uppercase block">Age</span>
              <span className="text-white font-semibold">{TRAINEE_PROFILE.age} Years</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black border border-[#1f1f1f]">
              <span className="text-[10px] text-[#666666] uppercase block">Country</span>
              <span className="text-white font-semibold">{TRAINEE_PROFILE.country}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black border border-[#1f1f1f]">
              <span className="text-[10px] text-[#666666] uppercase block">Start Date</span>
              <span className="text-white font-semibold">{TRAINEE_PROFILE.startDate}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black border border-[#1f1f1f]">
              <span className="text-[10px] text-[#666666] uppercase block">Starting Wt</span>
              <span className="text-white font-semibold">{TRAINEE_PROFILE.startingWeightKg} kg</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black border border-[#1f1f1f]">
              <span className="text-[10px] text-[#666666] uppercase block">Current Wt</span>
              <span className="text-emerald-400 font-semibold">{TRAINEE_PROFILE.currentWeightKg} kg (-2.9 kg)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black border border-[#1f1f1f]">
              <span className="text-[10px] text-[#666666] uppercase block">Diet</span>
              <span className="text-white font-semibold">{TRAINEE_PROFILE.foodPreference}</span>
            </div>
          </div>

          {/* Goal Statement */}
          <div className="p-3.5 rounded-xl bg-black border border-[#1f1f1f] space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#888888]">
              <Target className="h-3.5 w-3.5 text-emerald-400" />
              <span className="uppercase">Primary Goal</span>
            </div>
            <p className="text-xs text-white leading-relaxed font-sans font-medium">
              &ldquo;{TRAINEE_PROFILE.goal}&rdquo;
            </p>
          </div>
        </div>

        {/* Video Storage Configuration Guide */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] space-y-2.5">
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 text-sky-400" />
            <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Cloudflare R2 Video Storage Status
            </h3>
          </div>
          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Client-side video compression is enabled automatically: 50MB+ high-resolution camera recordings are reduced down to ~5-8MB before cloud upload. Set your Cloudflare R2 bucket environment variables in Vercel to activate permanent cloud video streaming.
          </p>
          <div className="p-2.5 rounded-xl bg-black border border-[#1f1f1f] font-mono text-[10px] text-[#888888] space-y-1">
            <div>• R2_ACCOUNT_ID</div>
            <div>• R2_ACCESS_KEY_ID</div>
            <div>• R2_SECRET_ACCESS_KEY</div>
            <div>• R2_BUCKET_NAME</div>
            <div>• R2_PUBLIC_DOMAIN</div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
