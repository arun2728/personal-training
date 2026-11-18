export type FeedbackStatus =
  | "approved"
  | "needs-adjustment"
  | "increase-weight"
  | "decrease-weight"
  | "pending";

export interface CoachFeedback {
  comment: string;
  status?: FeedbackStatus;
  updatedAt?: string;
  date?: string;
}

export interface HistoricalFeedback {
  date: string; // e.g. "Week 2" or "2026-11-11"
  comment: string;
  status?: FeedbackStatus;
  lastWeightKg?: number;
  lastReps?: number;
}

export type ExerciseCategory =
  | "Lower Body"
  | "Upper Body"
  | "Back"
  | "Chest"
  | "Shoulders"
  | "Arms"
  | "Core"
  | "Full Body"
  | "Rehab";

export interface SupersetSubExercise {
  name: string;
  targetWeightKg?: number;
  targetReps: string;
  notes?: string;
}

export interface ExerciseTemplate {
  id: string;
  name: string;
  targetSets: number; // Total sets (warmup + working)
  warmupSets?: number; // How many of targetSets are warmup
  workingSets?: number; // How many are working sets
  targetReps: string;
  targetWeightKg?: number;
  targetWeightNote?: string; // e.g. "12.5 - 15 kg each" or "40 kg till 15 reps"
  notes?: string;
  category: ExerciseCategory;
  isSuperset?: boolean;
  supersetExercises?: SupersetSubExercise[];
}

export interface WorkoutDayTemplate {
  dayNumber: number; // 1 to 5
  title: string;
  focus: string;
  exercises: ExerciseTemplate[];
}

export type SetType = "warmup" | "working";

export interface SetLog {
  id: string;
  setNumber: number;
  setType?: SetType;
  weightKg: number;
  reps: number;
  completed: boolean;
  videoUrl?: string;
  videoFileName?: string;
  videoBlob?: Blob; // client-side session temporary preview
  compressedVideoUrl?: string;
  isCompressing?: boolean;
  compressionRatio?: number; // e.g. 0.25 (75% reduction)
  rpe?: number; // 1 - 10
  notes?: string;
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
  coachFeedback?: CoachFeedback; // Current session feedback from Aanchal
}

export interface WorkoutSession {
  id: string;
  date: string; // YYYY-MM-DD
  dayNumber: number;
  dayTitle: string;
  startTime?: string;
  endTime?: string;
  exercises: ExerciseLog[];
  overallNotes?: string;
  syncedToSheets?: boolean;
}

// -------------------------------------------------------------
// Sheet 2: Step Tracker Types
// -------------------------------------------------------------
export interface StepEntry {
  id: string;
  date: string; // "25th Oct 2026" or "2026-10-25"
  steps: number;
  goal: number; // default 10,000
  goalMet: boolean;
  notes?: string; // Activity type / notes e.g. "Went to gym via walking"
}

// -------------------------------------------------------------
// Sheet 3: Body Measurements Types
// -------------------------------------------------------------
export interface MeasurementEntry {
  id: string;
  date: string; // "14th Oct 2026"
  weekLabel: string; // "Week 0", "Week 1", etc.
  weightKg: number;
  shoulderInches?: number;
  chestInches?: number;
  waistInches?: number;
  hipsInches?: number;
  thighInches?: number;
  notes?: string;
}

// -------------------------------------------------------------
// Sheet 4: Weekly Update Check-In Types
// -------------------------------------------------------------
export interface WeeklyUpdateEntry {
  id: string;
  weekNumber: number; // 1, 2, 3, etc.
  date: string;
  dietScore: number; // 1-10
  workoutAccuracy: number; // 1-10
  avgWorkoutDuration: string; // e.g. "1 hour 30 min"
  cardioScore: number; // 1-10 or sessions count
  avgDailySteps: string; // e.g. "9.6k"
  avgWaterIntake: string; // e.g. "approx 3 liters"
  stressScore: number; // 1-10
  sleepQuality: number; // 1-10
  positiveOutcome: string;
  issuesFaced: string;
  energyLevels: string; // "Very good", etc.
  strengthTrend: string; // "Increasing", "Same", "Decreasing"
  gave100Percent: boolean;
  notes?: string;
}

// -------------------------------------------------------------
// Sheet Tab Keys
// -------------------------------------------------------------
export type SheetTabId =
  | "workout"
  | "steps"
  | "measurements"
  | "weekly-update"
  | "nutrition"
  | "supplements"
  | "cardio"
  | "rehab"
  | "stress"
  | "pointers"
  | "foods"
  | "profile";

