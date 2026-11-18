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
}

export interface ExerciseTemplate {
  id: string;
  name: string;
  targetSets: number;
  targetReps: string;
  targetWeightKg?: number;
  notes?: string;
  category: "Chest" | "Back" | "Legs" | "Shoulders" | "Arms" | "Core" | "Full Body";
}

export interface WorkoutDayTemplate {
  dayNumber: number; // 1 to 5
  title: string;
  focus: string;
  exercises: ExerciseTemplate[];
}

export interface SetLog {
  id: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  completed: boolean;
  videoUrl?: string;
  videoFileName?: string;
  videoBlob?: Blob; // client-side session temporary preview
  rpe?: number; // 1 - 10
  notes?: string;
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
  coachFeedback?: CoachFeedback; // Overall feedback from Aanchal covering all sets
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
