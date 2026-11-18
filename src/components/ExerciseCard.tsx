"use client";

import { useState } from "react";
import { ExerciseTemplate, ExerciseLog, SetLog } from "@/types/workout";
import { SetRow } from "./SetRow";
import { ChevronDown, ChevronUp, Plus, Info, CheckCircle2 } from "lucide-react";

interface ExerciseCardProps {
  template: ExerciseTemplate;
  exerciseLog: ExerciseLog;
  onUpdateExerciseLog: (updated: ExerciseLog) => void;
}

export function ExerciseCard({
  template,
  exerciseLog,
  onUpdateExerciseLog,
}: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

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
      weightKg: lastSet ? lastSet.weightKg : template.targetWeightKg || 0,
      reps: lastSet ? lastSet.reps : parseInt(template.targetReps) || 10,
      completed: false,
    };
    onUpdateExerciseLog({ ...exerciseLog, sets: [...exerciseLog.sets, newSet] });
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-150 overflow-hidden ${
        isAllCompleted
          ? "bg-[#080d09] border-[#1d3823]"
          : "bg-[#0a0a0a] border-[#222222] hover:border-[#333333] shadow-sm"
      }`}
    >
      {/* Exercise Card Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex-1 pr-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#141414] text-[#888888] border border-[#262626]">
              {template.category}
            </span>
            {isAllCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                Done
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold text-white tracking-tight">
            {template.name}
          </h3>

          <div className="text-xs text-[#888888] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
            <span>
              Target: <strong className="text-white font-normal">{template.targetSets} sets</strong> ×{" "}
              <strong className="text-white font-normal">{template.targetReps} reps</strong>
            </span>
            {template.targetWeightKg !== undefined && template.targetWeightKg > 0 && (
              <span>
                Target Wt:{" "}
                <strong className="text-white font-normal">{template.targetWeightKg} kg</strong>
              </span>
            )}
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

      {/* Expanded Content: Form Cues & Set Rows */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 space-y-3 border-t border-[#1a1a1a]">
          {/* Coach Notes / Form Cues */}
          {template.notes && (
            <div className="p-3 rounded-xl bg-[#0f0f0f] border border-[#222222] text-xs text-[#a1a1aa] flex items-start gap-2">
              <Info className="h-3.5 w-3.5 shrink-0 text-white mt-0.5" />
              <span>
                <strong className="text-white font-medium">Aanchal&apos;s Cue: </strong>
                {template.notes}
              </span>
            </div>
          )}

          {/* Sets List */}
          <div className="space-y-2">
            {exerciseLog.sets.map((setLog, index) => (
              <SetRow
                key={setLog.id}
                setLog={setLog}
                setIndex={index}
                onUpdate={(updated) => handleUpdateSet(index, updated)}
                onDelete={() => handleDeleteSet(index)}
              />
            ))}
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
        </div>
      )}
    </div>
  );
}
