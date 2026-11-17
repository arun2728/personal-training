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
      className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
        isAllCompleted
          ? "bg-slate-900/40 border-emerald-500/30"
          : "bg-slate-900/80 border-slate-800 shadow-lg shadow-black/20"
      }`}
    >
      {/* Exercise Card Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex-1 pr-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
              {template.category}
            </span>
            {isAllCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                Done
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {template.name}
          </h3>

          <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              Target: <strong className="text-slate-200">{template.targetSets} sets</strong> ×{" "}
              <strong className="text-slate-200">{template.targetReps} reps</strong>
            </span>
            {template.targetWeightKg !== undefined && template.targetWeightKg > 0 && (
              <span>
                Target Wt:{" "}
                <strong className="text-indigo-300">{template.targetWeightKg} kg</strong>
              </span>
            )}
          </div>
        </div>

        {/* Status Counter & Chevron */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-mono font-semibold text-slate-300">
              <span className={completedSetsCount > 0 ? "text-emerald-400 font-bold" : ""}>
                {completedSetsCount}
              </span>
              /{totalSets}
            </div>
            <div className="text-[9px] uppercase tracking-wider text-slate-500">
              Sets
            </div>
          </div>

          <div className="p-1 rounded-xl bg-slate-800/80 text-slate-400">
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
        <div className="px-4 pb-5 pt-1 space-y-3 border-t border-slate-800/60">
          {/* Coach Notes / Form Cues */}
          {template.notes && (
            <div className="p-3 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2">
              <Info className="h-4 w-4 shrink-0 text-indigo-400 mt-0.5" />
              <span>
                <strong className="text-indigo-200">Aanchal&apos;s Form Cue: </strong>
                {template.notes}
              </span>
            </div>
          )}

          {/* Sets List */}
          <div className="space-y-2.5">
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
            className="w-full py-2.5 rounded-2xl border border-dashed border-slate-700 hover:border-indigo-500 hover:bg-indigo-950/20 text-slate-400 hover:text-indigo-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Extra Set</span>
          </button>
        </div>
      )}
    </div>
  );
}
