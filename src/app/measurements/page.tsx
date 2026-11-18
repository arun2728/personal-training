"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { INITIAL_MEASUREMENTS } from "@/data/sheetData";
import { MeasurementEntry } from "@/types/workout";
import {
  Ruler,
  TrendingDown,
  TrendingUp,
  Save,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function MeasurementsPage() {
  const [entries, setEntries] = useState<MeasurementEntry[]>(INITIAL_MEASUREMENTS);
  const [isSavedToast, setIsSavedToast] = useState(false);

  // Form states for adding new check-in entry
  const [formWeek, setFormWeek] = useState("Week 5");
  const [formDate, setFormDate] = useState("");
  const [formWeight, setFormWeight] = useState("84.3");
  const [formShoulder, setFormShoulder] = useState("19.0");
  const [formChest, setFormChest] = useState("39.0");
  const [formWaist, setFormWaist] = useState("34.5");
  const [formHips, setFormHips] = useState("41.8");
  const [formThigh, setFormThigh] = useState("22.0");
  const [formNotes, setFormNotes] = useState("");

  useEffect(() => {
    setFormDate(new Date().toISOString().split("T")[0]);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pt_measurements_entries");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEntries(parsed);
          }
        } catch {
          // Keep defaults
        }
      }
    }
  }, []);

  const handleSaveMeasurement = () => {
    const weightNum = parseFloat(formWeight) || 0;
    const newEntry: MeasurementEntry = {
      id: `meas-${Date.now()}`,
      date: formDate,
      weekLabel: formWeek,
      weightKg: weightNum,
      shoulderInches: parseFloat(formShoulder) || undefined,
      chestInches: parseFloat(formChest) || undefined,
      waistInches: parseFloat(formWaist) || undefined,
      hipsInches: parseFloat(formHips) || undefined,
      thighInches: parseFloat(formThigh) || undefined,
      notes: formNotes || "Recorded via app",
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("pt_measurements_entries", JSON.stringify(updated));
    }

    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  // Transformation metrics: Week 0 vs latest
  const baseline = entries[entries.length - 1] || entries[0];
  const latest = entries[0];

  const weightDelta = Math.round((latest.weightKg - baseline.weightKg) * 10) / 10;
  const waistDelta =
    latest.waistInches && baseline.waistInches
      ? Math.round((latest.waistInches - baseline.waistInches) * 10) / 10
      : 0;
  const shoulderDelta =
    latest.shoulderInches && baseline.shoulderInches
      ? Math.round((latest.shoulderInches - baseline.shoulderInches) * 10) / 10
      : 0;
  const thighDelta =
    latest.thighInches && baseline.thighInches
      ? Math.round((latest.thighInches - baseline.thighInches) * 10) / 10
      : 0;

  return (
    <div className="min-h-screen bg-black text-[#ededed] flex flex-col pb-28 selection:bg-white selection:text-black">
      <Navbar />
      <SheetTabsNav />

      <main className="max-w-2xl mx-auto w-full px-4 pt-5 space-y-4">
        {/* Title Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#141414] text-[#888888] border border-[#262626]">
                Sheet 3: Body Composition
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Body Measurements
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              Weekly tape measurements &amp; body weight progression
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <Ruler className="h-5 w-5" />
          </div>
        </div>

        {/* Milestone Transformation Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0c140e] to-[#0a0a0a] border border-[#1b3823] space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Program Transformation Summary</span>
            </span>
            <span className="text-[10px] font-mono text-[#888888]">
              {baseline.weekLabel} → {latest.weekLabel}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="bg-black/60 border border-[#1f2e22] rounded-xl p-2.5 text-center">
              <div className="text-[9px] font-mono text-[#888888] uppercase">Weight</div>
              <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-0.5 flex items-center justify-center gap-0.5">
                <TrendingDown className="h-3 w-3" />
                <span>{weightDelta} kg</span>
              </div>
              <div className="text-[9px] font-mono text-[#666666]">{latest.weightKg} kg now</div>
            </div>

            <div className="bg-black/60 border border-[#1f2e22] rounded-xl p-2.5 text-center">
              <div className="text-[9px] font-mono text-[#888888] uppercase">Waist</div>
              <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-0.5 flex items-center justify-center gap-0.5">
                <TrendingDown className="h-3 w-3" />
                <span>{waistDelta}&quot;</span>
              </div>
              <div className="text-[9px] font-mono text-[#666666]">{latest.waistInches}&quot; now</div>
            </div>

            <div className="bg-black/60 border border-[#1f2e22] rounded-xl p-2.5 text-center">
              <div className="text-[9px] font-mono text-[#888888] uppercase">Shoulders</div>
              <div className="text-sm sm:text-base font-bold font-mono text-sky-400 mt-0.5 flex items-center justify-center gap-0.5">
                <TrendingUp className="h-3 w-3" />
                <span>+{shoulderDelta}&quot;</span>
              </div>
              <div className="text-[9px] font-mono text-[#666666]">{latest.shoulderInches}&quot; now</div>
            </div>

            <div className="bg-black/60 border border-[#1f2e22] rounded-xl p-2.5 text-center">
              <div className="text-[9px] font-mono text-[#888888] uppercase">Thighs</div>
              <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-0.5 flex items-center justify-center gap-0.5">
                <TrendingDown className="h-3 w-3" />
                <span>{thighDelta}&quot;</span>
              </div>
              <div className="text-[9px] font-mono text-[#666666]">{latest.thighInches}&quot; now</div>
            </div>
          </div>
        </div>

        {/* New Measurement Log Form */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-[#1f1f1f]">
            <span className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
              Log Weekly Measurements
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formWeek}
                onChange={(e) => setFormWeek(e.target.value)}
                className="w-20 px-2 py-0.5 bg-black border border-[#262626] rounded text-xs font-mono text-white text-center"
                placeholder="Week 5"
              />
              <div className="flex items-center gap-1 bg-black border border-[#262626] rounded px-2 py-0.5 text-xs font-mono text-[#888888]">
                <Calendar className="h-3 w-3 text-[#666666]" />
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={formWeight}
                onChange={(e) => setFormWeight(e.target.value)}
                className="w-full p-2 bg-black border border-[#262626] rounded-xl text-xs font-mono text-white text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                Shoulder (in)
              </label>
              <input
                type="number"
                step="0.1"
                value={formShoulder}
                onChange={(e) => setFormShoulder(e.target.value)}
                className="w-full p-2 bg-black border border-[#262626] rounded-xl text-xs font-mono text-white text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                Chest (in)
              </label>
              <input
                type="number"
                step="0.1"
                value={formChest}
                onChange={(e) => setFormChest(e.target.value)}
                className="w-full p-2 bg-black border border-[#262626] rounded-xl text-xs font-mono text-white text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                Waist (in)
              </label>
              <input
                type="number"
                step="0.1"
                value={formWaist}
                onChange={(e) => setFormWaist(e.target.value)}
                className="w-full p-2 bg-black border border-[#262626] rounded-xl text-xs font-mono text-white text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                Hips (in)
              </label>
              <input
                type="number"
                step="0.1"
                value={formHips}
                onChange={(e) => setFormHips(e.target.value)}
                className="w-full p-2 bg-black border border-[#262626] rounded-xl text-xs font-mono text-white text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                Thigh (in)
              </label>
              <input
                type="number"
                step="0.1"
                value={formThigh}
                onChange={(e) => setFormThigh(e.target.value)}
                className="w-full p-2 bg-black border border-[#262626] rounded-xl text-xs font-mono text-white text-center font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
              Check-in Notes for Aanchal
            </label>
            <input
              type="text"
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              placeholder="e.g. Lost face fat, feeling lighter, increased stamina"
              className="w-full px-3 py-2 bg-black border border-[#262626] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-white font-mono"
            />
          </div>

          <button
            onClick={handleSaveMeasurement}
            className="w-full py-3 rounded-xl bg-white hover:bg-[#eaeaea] text-black font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Measurement Entry</span>
          </button>

          {isSavedToast && (
            <div className="p-2.5 rounded-lg bg-[#0e1710] border border-[#1d3823] text-emerald-400 text-xs font-mono text-center flex items-center justify-center gap-1.5 animate-in fade-in duration-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Measurements saved successfully!</span>
            </div>
          )}
        </div>

        {/* Historical Measurements Table */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
              Historical Check-In Log
            </h3>
            <span className="text-[10px] font-mono text-[#666666]">
              {entries.length} weeks logged
            </span>
          </div>

          <div className="space-y-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-3 rounded-xl bg-black border border-[#1f1f1f] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold font-mono text-white">
                      {entry.weekLabel}
                    </span>
                    <span className="text-[10px] font-mono text-[#666666]">
                      • {entry.date}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {entry.weightKg} kg
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 text-center pt-1 border-t border-[#141414]">
                  <div className="bg-[#0f0f0f] rounded-lg p-1 border border-[#1a1a1a]">
                    <div className="text-[9px] font-mono text-[#666666]">Shoulder</div>
                    <div className="text-xs font-mono font-semibold text-white">
                      {entry.shoulderInches || "-"}″
                    </div>
                  </div>
                  <div className="bg-[#0f0f0f] rounded-lg p-1 border border-[#1a1a1a]">
                    <div className="text-[9px] font-mono text-[#666666]">Chest</div>
                    <div className="text-xs font-mono font-semibold text-white">
                      {entry.chestInches || "-"}″
                    </div>
                  </div>
                  <div className="bg-[#0f0f0f] rounded-lg p-1 border border-[#1a1a1a]">
                    <div className="text-[9px] font-mono text-[#666666]">Waist</div>
                    <div className="text-xs font-mono font-semibold text-white">
                      {entry.waistInches || "-"}″
                    </div>
                  </div>
                  <div className="bg-[#0f0f0f] rounded-lg p-1 border border-[#1a1a1a]">
                    <div className="text-[9px] font-mono text-[#666666]">Hips</div>
                    <div className="text-xs font-mono font-semibold text-white">
                      {entry.hipsInches || "-"}″
                    </div>
                  </div>
                  <div className="bg-[#0f0f0f] rounded-lg p-1 border border-[#1a1a1a]">
                    <div className="text-[9px] font-mono text-[#666666]">Thigh</div>
                    <div className="text-xs font-mono font-semibold text-white">
                      {entry.thighInches || "-"}″
                    </div>
                  </div>
                </div>

                {entry.notes && (
                  <p className="text-[11px] text-[#999999] font-sans italic pt-1">
                    &ldquo;{entry.notes}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
