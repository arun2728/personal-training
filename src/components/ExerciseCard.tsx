"use client";

import { useState } from "react";
import {
  ExerciseTemplate,
  ExerciseLog,
  SetLog,
  CoachFeedback,
  HistoricalFeedback,
} from "@/types/workout";
import { SetRow } from "./SetRow";
import { CoachFeedbackSection } from "./CoachFeedbackSection";
import { PreviousFeedbackBanner } from "./PreviousFeedbackBanner";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Info,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Layers,
  Flame,
} from "lucide-react";

interface ExerciseCardProps {
  template: ExerciseTemplate;
  exerciseLog: ExerciseLog;
  previousFeedback?: HistoricalFeedback | null;
  onUpdateExerciseLog: (updated: ExerciseLog) => void;
}

export function ExerciseCard({
  template,
  exerciseLog,
  previousFeedback,
  onUpdateExerciseLog,
}: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const warmupSetsCount = template.warmupSets || 0;
  const completedSetsCount = exerciseLog.sets.filter((s) => s.completed).length;
  const totalSets = exerciseLog.sets.length;
  const isAllCompleted = totalSets > 0 && completedSetsCount === totalSets;

  const handleUpdateSet = (index: number, updatedSet: SetLog) => {
    const updatedSets = [...exerciseLog.sets];
    updatedSets[index] = updatedSet;
    onUpdateExerciseLog({ ...exerciseLog, sets: updatedSets });
  };

  const handleDeleteSet = (index: number) => {
    const updatedSets = exerciseLog.sets.filter((_, i) => i !== index);
    onUpdateExerciseLog({ ...exerciseLog, sets: updatedSets });
  };

  const handleAddSet = () => {
    const lastSet = exerciseLog.sets[exerciseLog.sets.length - 1];
    const newSet: SetLog = {
      id: `${exerciseLog.exerciseId}-set-${Date.now()}`,
      setNumber: exerciseLog.sets.length + 1,
      setType: "working",
      weightKg: lastSet ? lastSet.weightKg : template.targetWeightKg || 0,
      reps: lastSet ? lastSet.reps : parseInt(template.targetReps) || 10,
      completed: false,
    };
    onUpdateExerciseLog({ ...exerciseLog, sets: [...exerciseLog.sets, newSet] });
  };

  const handleSaveFeedback = (feedback: CoachFeedback | undefined) => {
    onUpdateExerciseLog({
      ...exerciseLog,
      coachFeedback: feedback,
    });
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-150 overflow-hidden ${
        isAllCompleted
          ? "bg-[#080d09] border-[#1d3823]"
          : template.isSuperset
          ? "bg-[#0a0a0c] border-[#252033] hover:border-[#38314e] shadow-sm"
          : "bg-[#0a0a0a] border-[#222222] hover:border-[#333333] shadow-sm"
      }`}
    >
      {/* Exercise Card Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex-1 pr-3">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#141414] text-[#888888] border border-[#262626]">
              {template.category}
            </span>

            {template.isSuperset && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1e1533] text-purple-300 border border-[#3b2b63]">
                <Layers className="h-3 w-3" />
                Superset
              </span>
            )}

            {warmupSetsCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Flame className="h-2.5 w-2.5" />
                {warmupSetsCount} Warmup Set{warmupSetsCount > 1 ? "s" : ""}
              </span>
            )}

            {isAllCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                Done
              </span>
            )}

            {exerciseLog.coachFeedback?.comment && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0d1710] text-emerald-400 border border-[#1b3823]">
                <MessageSquare className="h-2.5 w-2.5" />
                Coach Review
              </span>
            )}

            {previousFeedback && !exerciseLog.coachFeedback?.comment && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0d141f] text-sky-400 border border-[#1b2b3d]">
                <Sparkles className="h-2.5 w-2.5" />
                Prior Cue
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold text-white tracking-tight">
            {template.name}
          </h3>

          {/* Superset breakdown pills */}
          {template.isSuperset && template.supersetExercises && (
            <div className="mt-2 flex flex-col gap-1">
              {template.supersetExercises.map((sub, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa] bg-[#12101a] px-2.5 py-1 rounded-lg border border-[#252033]"
                >
                  <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-white font-medium truncate">{sub.name}</span>
                  <span className="text-[#666666] ml-auto">
                    {sub.targetWeightKg ? `${sub.targetWeightKg}kg • ` : ""}
                    {sub.targetReps}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="text-xs text-[#888888] mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
            <span>
              Target: <strong className="text-white font-normal">{template.targetSets} sets</strong> ×{" "}
              <strong className="text-white font-normal">{template.targetReps} reps</strong>
            </span>
            {template.targetWeightNote ? (
              <span>
                Target Load: <strong className="text-white font-normal">{template.targetWeightNote}</strong>
              </span>
            ) : template.targetWeightKg !== undefined && template.targetWeightKg > 0 ? (
              <span>
                Target Wt: <strong className="text-white font-normal">{template.targetWeightKg} kg</strong>
              </span>
            ) : null}
          </div>
        </div>

        {/* Status Counter & Chevron */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-mono font-semibold text-[#888888]">
              <span className={completedSetsCount > 0 ? "text-emerald-400 font-bold" : ""}>
                {completedSetsCount}
              </span>
              /{totalSets}
            </div>
            <div className="text-[9px] uppercase tracking-wider text-[#555555] font-mono">
              Sets
            </div>
          </div>

          <div className="p-1 rounded-lg bg-[#141414] border border-[#222222] text-[#888888]">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content: Previous Week Feedback, Form Cues, Set Rows, Today's Feedback */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 space-y-3 border-t border-[#1a1a1a]">
          {/* Prior Week's Feedback Callout */}
          {previousFeedback && (
            <PreviousFeedbackBanner
              previousFeedback={previousFeedback}
              exerciseName={template.name}
            />
          )}

          {/* Coach Form Cues */}
          {template.notes && (
            <div className="p-3 rounded-xl bg-[#0f0f0f] border border-[#222222] text-xs text-[#a1a1aa] flex items-start gap-2">
              <Info className="h-3.5 w-3.5 shrink-0 text-white mt-0.5" />
              <span>
                <strong className="text-white font-medium">Aanchal&apos;s Instruction: </strong>
                {template.notes}
              </span>
            </div>
          )}

          {/* Sets List with Warmup vs Working Sets distinction */}
          <div className="space-y-2">
            {exerciseLog.sets.map((setLog, index) => {
              const isWarmup = index < warmupSetsCount;
              const workingSetNum = isWarmup ? undefined : index - warmupSetsCount + 1;

              return (
                <SetRow
                  key={setLog.id}
                  setLog={setLog}
                  setIndex={index}
                  isWarmup={isWarmup}
                  workingSetNumber={workingSetNum}
                  onUpdate={(updated) => handleUpdateSet(index, updated)}
                  onDelete={() => handleDeleteSet(index)}
                />
              );
            })}
          </div>

          {/* Add Set Button */}
          <button
            type="button"
            onClick={handleAddSet}
            className="w-full py-2.5 rounded-xl border border-dashed border-[#2a2a2a] hover:border-[#444444] text-[#888888] hover:text-white bg-black text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="h-3 w-3" />
            <span>Add Extra Set</span>
          </button>

          {/* Today's Feedback Section for Aanchal */}
          <CoachFeedbackSection
            exerciseName={template.name}
            feedback={exerciseLog.coachFeedback}
            onSaveFeedback={handleSaveFeedback}
          />
        </div>
      )}
    </div>
  );
}
