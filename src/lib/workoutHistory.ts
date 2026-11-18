import { HistoricalFeedback, CoachFeedback, SetLog } from "@/types/workout";

// Authentic prior feedback from Coach Aanchal matching Arun's actual exercises from the training spreadsheet
export const DEFAULT_PREVIOUS_FEEDBACK: Record<string, HistoricalFeedback> = {
  // Day 1: Lower Body A
  "d1-ex1": {
    date: "Prior Week",
    comment:
      "2 warmups at 10kg were smooth. On working sets, 12.5kg looked solid. Keep hips hinging back without bending lower spine. Target 12.5 - 15kg today!",
    status: "increase-weight",
    lastWeightKg: 12.5,
    lastReps: 10,
  },
  "d1-ex2": {
    date: "Prior Week",
    comment:
      "Control the eccentric descent on the last 2 reps. Good hip placement on pad. Let's aim for 30-35kg today.",
    status: "increase-weight",
    lastWeightKg: 30,
    lastReps: 12,
  },
  "d1-ex3": {
    date: "Prior Week",
    comment:
      "Lunges were clean with 10kg. Maintain upright torso and full 90-degree depth on every single step.",
    status: "approved",
    lastWeightKg: 10,
    lastReps: 12,
  },
  "d1-ex4": {
    date: "Prior Week",
    comment:
      "Set 2 and 3 at 40kg were done with good intensity. Keep 40kg and push until 15 clean reps before increasing.",
    status: "approved",
    lastWeightKg: 40,
    lastReps: 13,
  },
  "d1-ex5": {
    date: "Prior Week",
    comment:
      "Calf raises were 25kg and 4kg KB for tibialis. Remember do not skip the tibialis raises after calf raises!",
    status: "needs-adjustment",
    lastWeightKg: 25,
    lastReps: 15,
  },
  "d1-ex6": {
    date: "Prior Week",
    comment:
      "Form was much better this time! Keep curling ribcage downwards and avoid using arms to pull the cable.",
    status: "approved",
    lastWeightKg: 15,
    lastReps: 15,
  },

  // Day 2: Upper Body A
  "d2-ex1": {
    date: "Prior Week",
    comment:
      "All sets at 30kg completed cleanly. Keep chest glued against pad. Push for 30kg till 10 strict reps.",
    status: "approved",
    lastWeightKg: 30,
    lastReps: 12,
  },
  "d2-ex2": {
    date: "Prior Week",
    comment:
      "Solid pull to upper chest at 40kg. Target 40kg until 15 full reps with slow negative release.",
    status: "approved",
    lastWeightKg: 40,
    lastReps: 12,
  },
  "d2-ex3": {
    date: "Prior Week",
    comment:
      "Rear delt engagement was visible at 35kg. Lead with the elbows, avoid shrugging your traps up.",
    status: "approved",
    lastWeightKg: 35,
    lastReps: 12,
  },
  "d2-ex4": {
    date: "Prior Week",
    comment:
      "Use lighter controlled weight (15kg DBs). Focus on strict vertical pressing line without excessive lower back arch.",
    status: "needs-adjustment",
    lastWeightKg: 15,
    lastReps: 10,
  },
  "d2-ex5": {
    date: "Prior Week",
    comment:
      "Pec fly at 35kg was deep. Lateral raises with 5kg had great form. Ready to bump Pec fly to 40kg and DB to 6-7.5kg.",
    status: "increase-weight",
    lastWeightKg: 35,
    lastReps: 12,
  },
  "d2-ex6": {
    date: "Prior Week",
    comment:
      "Triceps locked at 35kg and hammer curls at 7.5kg felt strong. Keep wrists neutral on hammer curls.",
    status: "approved",
    lastWeightKg: 35,
    lastReps: 12,
  },
  "d2-ex7": {
    date: "Prior Week",
    comment:
      "Control the swing. Squeeze abs at the top to roll pelvis upwards toward ribs.",
    status: "approved",
    lastWeightKg: 0,
    lastReps: 12,
  },

  // Day 3: Lower Body B
  "d3-ex1": {
    date: "Prior Week",
    comment:
      "Smith machine squat form is improving. Target 10-12.5kg each side with deeper depth and tight core brace.",
    status: "increase-weight",
    lastWeightKg: 10,
    lastReps: 8,
  },
  "d3-ex2": {
    date: "Prior Week",
    comment:
      "All sets at 60kg each side were solid. Target 60-70kg each side today. Do not lock out knees at top.",
    status: "increase-weight",
    lastWeightKg: 60,
    lastReps: 9,
  },
  "d3-ex3": {
    date: "Prior Week",
    comment:
      "Adductor squeeze was steady at 40kg. Target 45kg today with a 1-sec squeeze at peak contraction.",
    status: "increase-weight",
    lastWeightKg: 40,
    lastReps: 10,
  },
  "d3-ex4": {
    date: "Prior Week",
    comment:
      "Bulgarian split squats with 7.5kg dumbbells. Balance was steady. You can try 7.5 - 10kg today if knees feel warm.",
    status: "approved",
    lastWeightKg: 7.5,
    lastReps: 12,
  },
  "d3-ex5": {
    date: "Prior Week",
    comment:
      "Hamstring and glute lockout was clean. Ready to hold a 10kg plate during hyperextensions today.",
    status: "increase-weight",
    lastWeightKg: 10,
    lastReps: 14,
  },

  // Day 4: Upper Body B
  "d4-ex1": {
    date: "Prior Week",
    comment:
      "Full chest to floor achieved on push ups. Try performing with a 10kg plate or strict slow eccentrics.",
    status: "increase-weight",
    lastWeightKg: 10,
    lastReps: 10,
  },
  "d4-ex2": {
    date: "Prior Week",
    comment:
      "Good decision lowering the weight when form felt off. Keep dumbbells at 12.5 - 15kg and master the pressing groove.",
    status: "needs-adjustment",
    lastWeightKg: 12.5,
    lastReps: 10,
  },
  "d4-ex3": {
    date: "Prior Week",
    comment:
      "Pec fly was 35kg. Nice deep horizontal stretch across the pecs. Keep 35kg today.",
    status: "approved",
    lastWeightKg: 35,
    lastReps: 12,
  },
  "d4-ex4": {
    date: "Prior Week",
    comment:
      "5kg each side on cable lateral raises is the sweet spot. Lead with elbows, don't jerk the stack.",
    status: "approved",
    lastWeightKg: 5,
    lastReps: 15,
  },
  "d4-ex5": {
    date: "Prior Week",
    comment:
      "Overhead cable extension + incline curls felt great! Continue with 15-20kg on cable and 7.5kg on DB curls.",
    status: "approved",
    lastWeightKg: 15,
    lastReps: 12,
  },
  "d4-ex6": {
    date: "Prior Week",
    comment:
      "Cable crunches at 10-15kg. Focus on pulling down with your abdominal muscles, not pulling down with arms.",
    status: "approved",
    lastWeightKg: 15,
    lastReps: 15,
  },

  // Day 5: Mix
  "d5-ex1": {
    date: "Prior Week",
    comment:
      "5 reps per set achieved. Focus on full dead hang stretch at bottom and driving chest up to bar.",
    status: "approved",
    lastWeightKg: 0,
    lastReps: 5,
  },
  "d5-ex2": {
    date: "Prior Week",
    comment:
      "Straight arm pulldown at 25-30kg felt good. When fatigue kicks in, lower slightly to maintain lat isolation.",
    status: "approved",
    lastWeightKg: 25,
    lastReps: 12,
  },
  "d5-ex3": {
    date: "Prior Week",
    comment:
      "Face pulls at 25kg. Keep elbows high and externally rotate at the top to hit the rear delts and rotator cuff.",
    status: "approved",
    lastWeightKg: 25,
    lastReps: 12,
  },
  "d5-ex4": {
    date: "Prior Week",
    comment:
      "Bayesian curls gave great bicep stretch. 10kg each arm was spot on. Maintain 2-second eccentric.",
    status: "approved",
    lastWeightKg: 10,
    lastReps: 10,
  },
  "d5-ex5": {
    date: "Prior Week",
    comment:
      "30-40 seconds held with good abdominal brace. Ready to try 10-15kg plate on back for 35-45 seconds.",
    status: "increase-weight",
    lastWeightKg: 10,
    lastReps: 40,
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

    const existingIndex = records.findIndex((r) => r.date === date);
    if (existingIndex >= 0) {
      records[existingIndex] = newRecord;
    } else {
      records.push(newRecord);
    }

    records.sort((a, b) => a.date.localeCompare(b.date));
    localStorage.setItem(historyKey, JSON.stringify(records));
  } catch {
    // Storage quota or error
  }
}
