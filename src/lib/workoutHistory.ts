import { HistoricalFeedback, CoachFeedback, SetLog } from "@/types/workout";

// Realistic initial previous-week feedback from Aanchal for the 5-day split
export const DEFAULT_PREVIOUS_FEEDBACK: Record<string, HistoricalFeedback> = {
  // Day 1: Chest & Triceps
  "d1-ex1": {
    date: "7 days ago",
    comment:
      "Great control on sets 1-3. On the final set, slow down the descent. Ready to bump weight to 22.5kg today!",
    status: "increase-weight",
    lastWeightKg: 20,
    lastReps: 10,
  },
  "d1-ex2": {
    date: "7 days ago",
    comment:
      "Elbows flared slightly on rep 7. Keep your lats engaged and touch the same spot on your lower chest every rep.",
    status: "needs-adjustment",
    lastWeightKg: 50,
    lastReps: 8,
  },
  "d1-ex3": {
    date: "7 days ago",
    comment:
      "Squeeze at the peak was excellent. Keep 12.5kg and focus on the deep stretch at the bottom.",
    status: "approved",
    lastWeightKg: 12.5,
    lastReps: 15,
  },
  "d1-ex4": {
    date: "7 days ago",
    comment:
      "Lock your elbows strictly at your sides. Avoid rocking your shoulders forward on the lockout.",
    status: "needs-adjustment",
    lastWeightKg: 20,
    lastReps: 12,
  },
  "d1-ex5": {
    date: "7 days ago",
    comment:
      "Full range of motion achieved. Triceps were completely isolated. You can try 18kg today if feeling fresh.",
    status: "increase-weight",
    lastWeightKg: 16,
    lastReps: 10,
  },

  // Day 2: Back & Biceps
  "d2-ex1": {
    date: "6 days ago",
    comment:
      "Drive your elbows straight down toward your hip pockets. Form was very clean, let's aim for 47.5kg.",
    status: "increase-weight",
    lastWeightKg: 45,
    lastReps: 10,
  },
  "d2-ex2": {
    date: "6 days ago",
    comment:
      "Maintain the 45-degree hip hinge throughout. Avoid using momentum on the last 2 reps.",
    status: "needs-adjustment",
    lastWeightKg: 40,
    lastReps: 8,
  },
  "d2-ex3": {
    date: "6 days ago",
    comment:
      "Pause for 1 second at the contraction felt much better. Thickness in upper back is improving.",
    status: "approved",
    lastWeightKg: 40,
    lastReps: 12,
  },
  "d2-ex4": {
    date: "6 days ago",
    comment:
      "Keep wrists supinated throughout the concentric. Don't let your shoulders roll forward.",
    status: "approved",
    lastWeightKg: 10,
    lastReps: 12,
  },
  "d2-ex5": {
    date: "6 days ago",
    comment:
      "Brachialis engagement was visible. Controlled tempo was spot on. Ready for 15kg.",
    status: "increase-weight",
    lastWeightKg: 12.5,
    lastReps: 10,
  },

  // Day 3: Legs & Core
  "d3-ex1": {
    date: "5 days ago",
    comment:
      "Depth was consistently at parallel. Make sure to brace your core tight before descending.",
    status: "approved",
    lastWeightKg: 60,
    lastReps: 8,
  },
  "d3-ex2": {
    date: "5 days ago",
    comment:
      "Push hips back further and keep the bar shaved to your shins to maximize hamstring tension.",
    status: "needs-adjustment",
    lastWeightKg: 50,
    lastReps: 10,
  },
  "d3-ex3": {
    date: "5 days ago",
    comment:
      "Do not lock out your knees at the top. Keep continuous tension on the quads.",
    status: "needs-adjustment",
    lastWeightKg: 100,
    lastReps: 12,
  },
  "d3-ex4": {
    date: "5 days ago",
    comment:
      "Stride length was consistent. Good knee stability on both sides.",
    status: "approved",
    lastWeightKg: 12.5,
    lastReps: 12,
  },
  "d3-ex5": {
    date: "5 days ago",
    comment:
      "Eliminate swing between reps. Pause at the bottom before initiating the next tuck.",
    status: "approved",
    lastWeightKg: 0,
    lastReps: 15,
  },

  // Day 4: Shoulders & Abs
  "d4-ex1": {
    date: "4 days ago",
    comment:
      "Pressing path was straight and locked out overhead smoothly. Move up to 20kg dumbbells today.",
    status: "increase-weight",
    lastWeightKg: 18,
    lastReps: 10,
  },
  "d4-ex2": {
    date: "4 days ago",
    comment:
      "Lead with the elbows and tilt pinkies slightly upward. Do not shrug your traps up.",
    status: "needs-adjustment",
    lastWeightKg: 8,
    lastReps: 15,
  },
  "d4-ex3": {
    date: "4 days ago",
    comment:
      "Great external rotation at the finish. Rear delts were properly activated.",
    status: "approved",
    lastWeightKg: 20,
    lastReps: 15,
  },
  "d4-ex4": {
    date: "4 days ago",
    comment:
      "2-second hold at the top was maintained on all sets. Traps were burning!",
    status: "approved",
    lastWeightKg: 24,
    lastReps: 14,
  },
  "d4-ex5": {
    date: "4 days ago",
    comment:
      "Ribs stayed locked down. Excellent core stability during the full 60 seconds.",
    status: "approved",
    lastWeightKg: 0,
    lastReps: 60,
  },

  // Day 5: Full Body & Weak Points
  "d5-ex1": {
    date: "3 days ago",
    comment:
      "Hip hinge and leg drive were synchronized. Keep the bar path vertical. Ready for 75kg.",
    status: "increase-weight",
    lastWeightKg: 70,
    lastReps: 5,
  },
  "d5-ex2": {
    date: "3 days ago",
    comment:
      "Full chest lockout on every repetition. Form looked crisp.",
    status: "approved",
    lastWeightKg: 0,
    lastReps: 12,
  },
  "d5-ex3": {
    date: "3 days ago",
    comment:
      "Front knee tracked properly over the mid-foot. Deep hip stretch achieved.",
    status: "approved",
    lastWeightKg: 10,
    lastReps: 10,
  },
  "d5-ex4": {
    date: "3 days ago",
    comment:
      "Keep elbows planted firmly on the pad. Don't lift off the bench to assist.",
    status: "needs-adjustment",
    lastWeightKg: 15,
    lastReps: 10,
  },
  "d5-ex5": {
    date: "3 days ago",
    comment:
      "Controlled overhead extension. Great mind-muscle connection with long head.",
    status: "approved",
    lastWeightKg: 15,
    lastReps: 12,
  },
};

/**
 * Retrieves the most relevant previous feedback for an exercise.
 * First checks localStorage for user-saved past sessions prior to currentDate.
 * Falls back to default previous week feedback.
 */
export function getPreviousFeedbackForExercise(
  exerciseId: string,
  currentDate?: string
): HistoricalFeedback | null {
  if (typeof window === "undefined") {
    return DEFAULT_PREVIOUS_FEEDBACK[exerciseId] || null;
  }

  try {
    const historyKey = `pt_exercise_feedback_history_${exerciseId}`;
    const raw = localStorage.getItem(historyKey);
    if (raw) {
      const records: HistoricalFeedback[] = JSON.parse(raw);
      if (Array.isArray(records) && records.length > 0) {
        // Find most recent record before currentDate
        const filtered = currentDate
          ? records.filter((r) => r.date < currentDate)
          : records;
        if (filtered.length > 0) {
          return filtered[filtered.length - 1];
        }
      }
    }
  } catch {
    // Fall back to default
  }

  return DEFAULT_PREVIOUS_FEEDBACK[exerciseId] || null;
}

/**
 * Persists an exercise's feedback into the long-term history store so it becomes
 * available in subsequent weeks.
 */
export function recordExerciseFeedback(
  exerciseId: string,
  date: string,
  feedback: CoachFeedback,
  sets?: SetLog[]
) {
  if (typeof window === "undefined" || !feedback.comment) return;

  try {
    const historyKey = `pt_exercise_feedback_history_${exerciseId}`;
    const raw = localStorage.getItem(historyKey);
    const records: HistoricalFeedback[] = raw ? JSON.parse(raw) : [];

    // Find best set weight/reps
    let bestWeight = 0;
    let bestReps = 0;
    if (sets) {
      sets.forEach((s) => {
        if (s.completed && s.weightKg >= bestWeight) {
          bestWeight = s.weightKg;
          bestReps = s.reps;
        }
      });
    }

    const newRecord: HistoricalFeedback = {
      date,
      comment: feedback.comment,
      status: feedback.status,
      lastWeightKg: bestWeight > 0 ? bestWeight : undefined,
      lastReps: bestReps > 0 ? bestReps : undefined,
    };

    // Update or append for this date
    const existingIndex = records.findIndex((r) => r.date === date);
    if (existingIndex >= 0) {
      records[existingIndex] = newRecord;
    } else {
      records.push(newRecord);
    }

    // Sort chronologically
    records.sort((a, b) => a.date.localeCompare(b.date));
    localStorage.setItem(historyKey, JSON.stringify(records));
  } catch {
    // Storage quota or error
  }
}
