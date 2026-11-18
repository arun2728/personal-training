"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { INITIAL_WEEKLY_UPDATES } from "@/data/sheetData";
import { WeeklyUpdateEntry } from "@/types/workout";
import {
  ClipboardCheck,
  CheckCircle2,
  Share2,
  Save,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function WeeklyUpdatePage() {
  const [history, setHistory] = useState<WeeklyUpdateEntry[]>(INITIAL_WEEKLY_UPDATES);
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [expandedWeekId, setExpandedWeekId] = useState<string>("wu-3");

  // Form states for current check-in (defaults to Week 4)
  const [weekNumber, setWeekNumber] = useState(4);
  const [dietScore, setDietScore] = useState(9);
  const [workoutAccuracy, setWorkoutAccuracy] = useState(10);
  const [workoutDuration, setWorkoutDuration] = useState("1 hour 30 min");
  const [cardioScore, setCardioScore] = useState(9);
  const [avgSteps, setAvgSteps] = useState("10k");
  const [waterIntake, setWaterIntake] = useState("approx 3.5 liters");
  const [stressScore, setStressScore] = useState(8);
  const [sleepQuality, setSleepQuality] = useState(9);
  const [positiveOutcome, setPositiveOutcome] = useState("Hit 10k steps 5 days in a row, lost face fats, weights moving up nicely!");
  const [issuesFaced, setIssuesFaced] = useState("No major issues, felt strong on Smith squats.");
  const [energyLevels, setEnergyLevels] = useState("Very good");
  const [strengthTrend, setStrengthTrend] = useState("Increasing");
  const [gave100Percent, setGave100Percent] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pt_weekly_update_history");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setHistory(parsed);
          }
        } catch {
          // Keep defaults
        }
      }
    }
  }, []);

  const handleSaveCheckIn = () => {
    const newEntry: WeeklyUpdateEntry = {
      id: `wu-${weekNumber}-${Date.now()}`,
      weekNumber,
      date: `Week ${weekNumber}`,
      dietScore,
      workoutAccuracy,
      avgWorkoutDuration: workoutDuration,
      cardioScore,
      avgDailySteps: avgSteps,
      avgWaterIntake: waterIntake,
      stressScore,
      sleepQuality,
      positiveOutcome,
      issuesFaced,
      energyLevels,
      strengthTrend,
      gave100Percent,
    };

    const existingIndex = history.findIndex((h) => h.weekNumber === weekNumber);
    let updated: WeeklyUpdateEntry[];
    if (existingIndex >= 0) {
      updated = [...history];
      updated[existingIndex] = newEntry;
    } else {
      updated = [newEntry, ...history];
    }

    setHistory(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("pt_weekly_update_history", JSON.stringify(updated));
    }

    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  const generateWhatsAppCheckIn = () => {
    return `📋 *WEEK ${weekNumber} CHECK-IN SUMMARY for Aanchal*\nTrainee: Arun\n\n1. Diet Accuracy: ${dietScore}/10\n2. Workout Accuracy: ${workoutAccuracy}/10\n3. Avg Workout Duration: ${workoutDuration}\n4. Cardio Score: ${cardioScore}/10\n5. Avg Daily Steps: ${avgSteps}\n6. Water Intake: ${waterIntake}\n7. Stress Score: ${stressScore}/10\n8. Sleep Quality: ${sleepQuality}/10\n9. Positive Outcome: ${positiveOutcome}\n10. Issues Faced: ${issuesFaced}\n11. Energy Levels: ${energyLevels}\n12. Strength Trend: ${strengthTrend}\n13. Gave 100%: ${gave100Percent ? "YES ✅" : "NO"}\n\nReady for week review! 💪`;
  };

  const handleCopyWhatsApp = async () => {
    try {
      await navigator.clipboard.writeText(generateWhatsAppCheckIn());
      setCopiedWhatsapp(true);
      setTimeout(() => setCopiedWhatsapp(false), 2500);
    } catch {
      // Fallback
    }
  };

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
                Sheet 4: Coach Check-In
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Weekly Update
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              14-Question weekly assessment for Coach Aanchal
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <ClipboardCheck className="h-5 w-5" />
          </div>
        </div>

        {/* Check-In Form */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
                Submit Check-In:
              </span>
              <select
                value={weekNumber}
                onChange={(e) => setWeekNumber(parseInt(e.target.value, 10))}
                className="bg-black border border-[#333333] text-white rounded-lg px-2 py-1 text-xs font-mono focus:outline-none"
              >
                <option value={1}>Week 1</option>
                <option value={2}>Week 2</option>
                <option value={3}>Week 3</option>
                <option value={4}>Week 4 (Current)</option>
                <option value={5}>Week 5</option>
                <option value={6}>Week 6</option>
                <option value={7}>Week 7</option>
                <option value={8}>Week 8</option>
              </select>
            </div>

            <button
              onClick={handleCopyWhatsApp}
              className="px-2.5 py-1 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#2e2e2e] text-xs font-mono text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedWhatsapp ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3 w-3 text-white" />
                  <span>WhatsApp</span>
                </>
              )}
            </button>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Diet Score */}
            <div className="p-3 rounded-xl bg-black border border-[#1f1f1f]">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#888888]">1. Diet Accuracy</span>
                <span className="text-white font-bold">{dietScore}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={dietScore}
                onChange={(e) => setDietScore(parseInt(e.target.value, 10))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* 2. Workout Accuracy */}
            <div className="p-3 rounded-xl bg-black border border-[#1f1f1f]">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#888888]">2. Workout Accuracy</span>
                <span className="text-white font-bold">{workoutAccuracy}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={workoutAccuracy}
                onChange={(e) => setWorkoutAccuracy(parseInt(e.target.value, 10))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* 3. Cardio Score */}
            <div className="p-3 rounded-xl bg-black border border-[#1f1f1f]">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#888888]">4. Cardio Adherence</span>
                <span className="text-white font-bold">{cardioScore}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={cardioScore}
                onChange={(e) => setCardioScore(parseInt(e.target.value, 10))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* 4. Sleep Quality */}
            <div className="p-3 rounded-xl bg-black border border-[#1f1f1f]">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#888888]">8. Sleep Quality</span>
                <span className="text-white font-bold">{sleepQuality}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(parseInt(e.target.value, 10))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* 5. Stress Score */}
            <div className="p-3 rounded-xl bg-black border border-[#1f1f1f]">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#888888]">7. Stress Level (Low to High)</span>
                <span className="text-white font-bold">{stressScore}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={stressScore}
                onChange={(e) => setStressScore(parseInt(e.target.value, 10))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* 6. Strength Trend */}
            <div className="p-3 rounded-xl bg-black border border-[#1f1f1f]">
              <div className="text-xs font-mono text-[#888888] mb-1.5">
                12. Strength Progression
              </div>
              <div className="grid grid-cols-3 gap-1">
                {(["Increasing", "Same", "Decreasing"] as const).map((trend) => (
                  <button
                    key={trend}
                    type="button"
                    onClick={() => setStrengthTrend(trend)}
                    className={`py-1 text-[11px] font-mono rounded-lg transition-colors cursor-pointer ${
                      strengthTrend === trend
                        ? "bg-white text-black font-semibold"
                        : "bg-[#141414] text-[#888888] hover:text-white"
                    }`}
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics Inputs */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                3. Workout Duration
              </label>
              <input
                type="text"
                value={workoutDuration}
                onChange={(e) => setWorkoutDuration(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-black border border-[#262626] rounded-xl text-xs font-mono text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                5. Avg Daily Steps
              </label>
              <input
                type="text"
                value={avgSteps}
                onChange={(e) => setAvgSteps(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-black border border-[#262626] rounded-xl text-xs font-mono text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                6. Water Intake
              </label>
              <input
                type="text"
                value={waterIntake}
                onChange={(e) => setWaterIntake(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-black border border-[#262626] rounded-xl text-xs font-mono text-white"
              />
            </div>
          </div>

          {/* Energy & 100% effort */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                11. Energy Levels
              </label>
              <input
                type="text"
                value={energyLevels}
                onChange={(e) => setEnergyLevels(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-black border border-[#262626] rounded-xl text-xs font-mono text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
                13. Did You Give 100%?
              </label>
              <button
                type="button"
                onClick={() => setGave100Percent(!gave100Percent)}
                className={`w-full py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer border ${
                  gave100Percent
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    : "bg-[#141414] text-[#888888] border-[#222222]"
                }`}
              >
                {gave100Percent ? "Yes, 100% Committed ✅" : "No"}
              </button>
            </div>
          </div>

          {/* Positive Outcome & Issues */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
              9. Positive Outcome This Week
            </label>
            <textarea
              rows={2}
              value={positiveOutcome}
              onChange={(e) => setPositiveOutcome(e.target.value)}
              className="w-full p-2.5 bg-black border border-[#262626] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-white font-mono leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
              10. Any Major Issues or Pain Faced?
            </label>
            <textarea
              rows={2}
              value={issuesFaced}
              onChange={(e) => setIssuesFaced(e.target.value)}
              className="w-full p-2.5 bg-black border border-[#262626] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-white font-mono leading-relaxed"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveCheckIn}
            className="w-full py-3 rounded-xl bg-white hover:bg-[#eaeaea] text-black font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Week {weekNumber} Check-In</span>
          </button>

          {isSavedToast && (
            <div className="p-2.5 rounded-lg bg-[#0e1710] border border-[#1d3823] text-emerald-400 text-xs font-mono text-center flex items-center justify-center gap-1.5 animate-in fade-in duration-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Weekly check-in saved successfully!</span>
            </div>
          )}
        </div>

        {/* Previous Weekly Updates History */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
              Previous Weekly Check-Ins
            </h3>
            <span className="text-[10px] font-mono text-[#666666]">
              {history.length} check-ins on record
            </span>
          </div>

          <div className="space-y-2">
            {history.map((item) => {
              const isExpanded = expandedWeekId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-xl bg-black border border-[#1f1f1f] overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedWeekId(isExpanded ? "" : item.id)}
                    className="p-3 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold font-mono text-white">
                        {item.date}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Diet: {item.dietScore}/10 • Workout: {item.workoutAccuracy}/10
                      </span>
                    </div>

                    <div className="text-[#888888]">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-3 pt-0 border-t border-[#1a1a1a] text-xs font-mono space-y-2 mt-2">
                      <div className="grid grid-cols-2 gap-2 text-[#888888]">
                        <div>Avg Steps: <span className="text-white">{item.avgDailySteps}</span></div>
                        <div>Duration: <span className="text-white">{item.avgWorkoutDuration}</span></div>
                        <div>Sleep: <span className="text-white">{item.sleepQuality}/10</span></div>
                        <div>Strength: <span className="text-white">{item.strengthTrend}</span></div>
                      </div>

                      <div className="pt-2 border-t border-[#141414]">
                        <span className="text-[10px] text-[#666666] uppercase block">
                          Positive Outcome:
                        </span>
                        <p className="text-[#d1d5db] font-sans mt-0.5 italic">
                          &ldquo;{item.positiveOutcome}&rdquo;
                        </p>
                      </div>

                      {item.issuesFaced && (
                        <div>
                          <span className="text-[10px] text-[#666666] uppercase block">
                            Issues:
                          </span>
                          <p className="text-[#a1a1aa] font-sans mt-0.5">
                            {item.issuesFaced}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
