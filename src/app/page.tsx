"use client";

import { useState, useEffect } from "react";
import { DEFAULT_WORKOUT_ROUTINE } from "@/data/defaultWorkouts";
import {
  WorkoutDayTemplate,
  WorkoutSession,
  ExerciseLog,
  SetLog,
} from "@/types/workout";
import { Navbar } from "@/components/Navbar";
import { WorkoutDaySelector } from "@/components/WorkoutDaySelector";
import { ExerciseCard } from "@/components/ExerciseCard";
import { RestTimer } from "@/components/RestTimer";
import { WorkoutSummaryModal } from "@/components/WorkoutSummaryModal";
import { CheckCircle, Dumbbell, Sparkles } from "lucide-react";

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
        sets: Array.from({ length: ex.targetSets }).map((_, idx) => ({
          id: `${ex.id}-set-${idx + 1}`,
          setNumber: idx + 1,
          weightKg: ex.targetWeightKg || 0,
          reps: parseInt(ex.targetReps) || 10,
          completed: false,
        })),
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
      // Exclude video blobs before saving to JSON storage
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
          sets: Array.from({ length: ex.targetSets }).map((_, idx) => ({
            id: `${ex.id}-set-${idx + 1}`,
            setNumber: idx + 1,
            weightKg: ex.targetWeightKg || 0,
            reps: parseInt(ex.targetReps) || 10,
            completed: false,
          })),
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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <Dumbbell className="h-8 w-8 animate-spin text-indigo-500" />
          <p className="text-sm font-medium">Loading Arun&apos;s Workout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-24 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        workoutDate={workoutDate}
        onDateChange={setWorkoutDate}
        onFinishWorkout={() => setShowSummaryModal(true)}
        completedSetsCount={completedSetsCount}
      />

      <main className="max-w-2xl mx-auto w-full px-4 pt-5 space-y-5">
        {/* Day Selector */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Workout Split
            </h2>
            <span className="text-[11px] text-indigo-400 font-medium">
              5-Day Plan
            </span>
          </div>
          <WorkoutDaySelector
            days={DEFAULT_WORKOUT_ROUTINE}
            selectedDay={selectedDayNumber}
            onSelectDay={(dayNum) => setSelectedDayNumber(dayNum)}
          />
        </div>

        {/* Day Overview Banner */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-slate-900 border border-indigo-900/40 shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {currentDayTemplate.title}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1.5">
                {currentDayTemplate.focus}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentDayTemplate.exercises.length} exercises prescribed by Aanchal
              </p>
            </div>

            {/* Overall Progress Ring / Counter */}
            <div className="text-right shrink-0 bg-slate-950/60 border border-slate-800/80 rounded-2xl px-3 py-2">
              <div className="text-xs font-mono font-bold text-emerald-400">
                {completedSetsCount}/{totalSetsCount}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-slate-500">
                Sets Done
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Cards */}
        <div className="space-y-4">
          {currentDayTemplate.exercises.map((template, index) => {
            const exerciseLog =
              activeSession.exercises[index] || {
                exerciseId: template.id,
                exerciseName: template.name,
                sets: [],
              };

            return (
              <ExerciseCard
                key={template.id}
                template={template}
                exerciseLog={exerciseLog}
                onUpdateExerciseLog={(updated) =>
                  handleUpdateExerciseLog(index, updated)
                }
              />
            );
          })}
        </div>

        {/* Bottom Finish Button */}
        <div className="pt-4">
          <button
            onClick={() => setShowSummaryModal(true)}
            className="w-full py-4 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <CheckCircle className="h-5 w-5" />
            <span>Finish Workout &amp; Send to Aanchal</span>
          </button>
        </div>
      </main>

      {/* Floating Rest Stopwatch */}
      <RestTimer />

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
