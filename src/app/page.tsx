"use client";

import { useState, useEffect } from "react";
import { DEFAULT_WORKOUT_ROUTINE } from "@/data/defaultWorkouts";
import {
  WorkoutDayTemplate,
  WorkoutSession,
  ExerciseLog,
} from "@/types/workout";
import {
  getPreviousFeedbackForExercise,
  recordExerciseFeedback,
} from "@/lib/workoutHistory";
import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { WorkoutDaySelector } from "@/components/WorkoutDaySelector";
import { ExerciseCard } from "@/components/ExerciseCard";
import { RestTimer } from "@/components/RestTimer";
import { WorkoutSummaryModal } from "@/components/WorkoutSummaryModal";
import { CheckCircle } from "lucide-react";

export default function WorkoutDashboard() {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [workoutDate, setWorkoutDate] = useState<string>("");

  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize date on mount
  useEffect(() => {
    if (!workoutDate) {
      setWorkoutDate(new Date().toISOString().split("T")[0]);
    }
  }, [workoutDate]);

  // Initialize or recover draft session for the selected day
  useEffect(() => {
    if (!workoutDate) return;

    const currentTemplate =
      DEFAULT_WORKOUT_ROUTINE.find((d) => d.dayNumber === selectedDayNumber) ||
      DEFAULT_WORKOUT_ROUTINE[0];

    const storageKey = `pt_workout_draft_day_${selectedDayNumber}_${workoutDate}`;
    const savedDraft = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;

    if (savedDraft) {
      try {
        const parsed: WorkoutSession = JSON.parse(savedDraft);
        setActiveSession(parsed);
        setIsLoaded(true);
        return;
      } catch {
        // Fall through to initial template creation
      }
    }

    // Create fresh initial session from template
    const initialSession: WorkoutSession = {
      id: `session-${selectedDayNumber}-${Date.now()}`,
      date: workoutDate,
      dayNumber: currentTemplate.dayNumber,
      dayTitle: currentTemplate.title,
      exercises: currentTemplate.exercises.map((ex) => ({
        exerciseId: ex.id,
        exerciseName: ex.name,
        sets: Array.from({ length: ex.targetSets }).map((_, idx) => {
          const isWarmup = idx < (ex.warmupSets || 0);
          return {
            id: `${ex.id}-set-${idx + 1}`,
            setNumber: idx + 1,
            setType: isWarmup ? "warmup" : "working",
            weightKg: isWarmup ? (ex.targetWeightKg ? Math.round(ex.targetWeightKg * 0.6) : 0) : (ex.targetWeightKg || 0),
            reps: parseInt(ex.targetReps) || 10,
            completed: false,
          };
        }),
      })),
    };

    setActiveSession(initialSession);
    setIsLoaded(true);
  }, [selectedDayNumber, workoutDate]);

  // Persist session draft to localStorage
  useEffect(() => {
    if (!isLoaded || !activeSession) return;
    const storageKey = `pt_workout_draft_day_${selectedDayNumber}_${workoutDate}`;
    try {
      const sanitizedSession = {
        ...activeSession,
        exercises: activeSession.exercises.map((ex) => ({
          ...ex,
          sets: ex.sets.map((s) => ({
            ...s,
            videoBlob: undefined,
          })),
        })),
      };
      localStorage.setItem(storageKey, JSON.stringify(sanitizedSession));
    } catch {
      // Storage quota or error
    }
  }, [activeSession, selectedDayNumber, workoutDate, isLoaded]);

  const currentDayTemplate: WorkoutDayTemplate =
    DEFAULT_WORKOUT_ROUTINE.find((d) => d.dayNumber === selectedDayNumber) ||
    DEFAULT_WORKOUT_ROUTINE[0];

  const handleUpdateExerciseLog = (
    exerciseIndex: number,
    updatedLog: ExerciseLog
  ) => {
    if (!activeSession) return;
    const updatedExercises = [...activeSession.exercises];
    updatedExercises[exerciseIndex] = updatedLog;

    // Automatically record to historical store if feedback is added/edited
    if (updatedLog.coachFeedback) {
      recordExerciseFeedback(
        updatedLog.exerciseId,
        workoutDate,
        updatedLog.coachFeedback,
        updatedLog.sets
      );
    }

    setActiveSession({
      ...activeSession,
      exercises: updatedExercises,
    });
  };

  const handleResetSession = () => {
    if (confirm("Reset today's logs back to initial targets?")) {
      const storageKey = `pt_workout_draft_day_${selectedDayNumber}_${workoutDate}`;
      localStorage.removeItem(storageKey);

      const freshSession: WorkoutSession = {
        id: `session-${selectedDayNumber}-${Date.now()}`,
        date: workoutDate,
        dayNumber: currentDayTemplate.dayNumber,
        dayTitle: currentDayTemplate.title,
        exercises: currentDayTemplate.exercises.map((ex) => ({
          exerciseId: ex.id,
          exerciseName: ex.name,
          sets: Array.from({ length: ex.targetSets }).map((_, idx) => {
            const isWarmup = idx < (ex.warmupSets || 0);
            return {
              id: `${ex.id}-set-${idx + 1}`,
              setNumber: idx + 1,
              setType: isWarmup ? "warmup" : "working",
              weightKg: isWarmup ? (ex.targetWeightKg ? Math.round(ex.targetWeightKg * 0.6) : 0) : (ex.targetWeightKg || 0),
              reps: parseInt(ex.targetReps) || 10,
              completed: false,
            };
          }),
        })),
      };
      setActiveSession(freshSession);
      setShowSummaryModal(false);
    }
  };

  const completedSetsCount =
    activeSession?.exercises.reduce(
      (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
      0
    ) || 0;

  const totalSetsCount =
    activeSession?.exercises.reduce((acc, ex) => acc + ex.sets.length, 0) || 0;

  if (!isLoaded || !activeSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-[#888888]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] flex items-center justify-center animate-pulse">
            <svg
              width="16"
              height="14"
              viewBox="0 0 76 65"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
          <p className="text-xs font-mono">Loading Workout Plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#ededed] flex flex-col pb-28 selection:bg-white selection:text-black">
      {/* Top Header Navbar */}
      <Navbar
        workoutDate={workoutDate}
        onDateChange={setWorkoutDate}
        onFinishWorkout={() => setShowSummaryModal(true)}
        completedSetsCount={completedSetsCount}
      />

      {/* Spreadsheet Tabs Selector (All 12 Sheets) */}
      <SheetTabsNav />

      <main className="max-w-2xl mx-auto w-full px-4 pt-5 space-y-4">
        {/* Day Selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">
              Select Routine
            </h2>
            <span className="text-[11px] font-mono text-[#888888]">
              5-Day Split by Aanchal
            </span>
          </div>
          <WorkoutDaySelector
            days={DEFAULT_WORKOUT_ROUTINE}
            selectedDay={selectedDayNumber}
            onSelectDay={(dayNum) => setSelectedDayNumber(dayNum)}
          />
        </div>

        {/* Day Overview Banner */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#141414] text-[#888888] border border-[#262626]">
                {currentDayTemplate.title}
              </span>
              <h3 className="text-base font-semibold text-white mt-1.5 tracking-tight">
                {currentDayTemplate.focus}
              </h3>
              <p className="text-xs text-[#888888] mt-0.5 font-mono">
                {currentDayTemplate.exercises.length} exercises prescribed by Aanchal
              </p>
            </div>

            {/* Overall Progress Counter */}
            <div className="text-right shrink-0 bg-black border border-[#222222] rounded-xl px-3 py-1.5">
              <div className="text-xs font-mono font-bold text-emerald-400">
                {completedSetsCount}/{totalSetsCount}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-[#555555] font-mono">
                Sets
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Cards with Previous Week's Feedback */}
        <div className="space-y-3">
          {currentDayTemplate.exercises.map((template, index) => {
            const exerciseLog =
              activeSession.exercises[index] || {
                exerciseId: template.id,
                exerciseName: template.name,
                sets: [],
              };

            const previousFeedback = getPreviousFeedbackForExercise(
              template.id,
              workoutDate
            );

            return (
              <ExerciseCard
                key={template.id}
                template={template}
                exerciseLog={exerciseLog}
                previousFeedback={previousFeedback}
                onUpdateExerciseLog={(updated) =>
                  handleUpdateExerciseLog(index, updated)
                }
              />
            );
          })}
        </div>

        {/* Bottom Finish Button */}
        <div className="pt-3">
          <button
            onClick={() => setShowSummaryModal(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-[#eaeaea] active:bg-[#d4d4d4] text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Finish Workout &amp; Send to Aanchal</span>
          </button>
        </div>
      </main>

      {/* Floating Rest Stopwatch */}
      <RestTimer />

      {/* Bottom Nav for Mobile */}
      <BottomNav />

      {/* Celebration & Sync Modal */}
      {showSummaryModal && (
        <WorkoutSummaryModal
          session={activeSession}
          onClose={() => setShowSummaryModal(false)}
          onResetSession={handleResetSession}
        />
      )}
    </div>
  );
}
