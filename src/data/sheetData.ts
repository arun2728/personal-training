import {
  StepEntry,
  MeasurementEntry,
  WeeklyUpdateEntry,
} from "@/types/workout";

// -------------------------------------------------------------
// Sheet 1: Step Tracker Seed Data (from Excel)
// -------------------------------------------------------------
export const INITIAL_STEP_ENTRIES: StepEntry[] = [
  { id: "s-1", date: "2026-10-25", steps: 5031, goal: 10000, goalMet: false, notes: "Went to gym via walking" },
  { id: "s-2", date: "2026-10-26", steps: 522, goal: 10000, goalMet: false, notes: "Had a lot of office work" },
  { id: "s-3", date: "2026-10-27", steps: 9073, goal: 10000, goalMet: false, notes: "Went to gym via walking & errands" },
  { id: "s-4", date: "2026-10-28", steps: 178, goal: 10000, goalMet: false, notes: "Rest day" },
  { id: "s-5", date: "2026-10-29", steps: 7095, goal: 10000, goalMet: false, notes: "Evening walk" },
  { id: "s-6", date: "2026-10-30", steps: 4013, goal: 10000, goalMet: false, notes: "Regular routine" },
  { id: "s-7", date: "2026-10-31", steps: 6535, goal: 10000, goalMet: false, notes: "Gym + walking" },
  { id: "s-8", date: "2026-11-01", steps: 8088, goal: 10000, goalMet: false, notes: "Increased activity" },
  { id: "s-9", date: "2026-11-02", steps: 2723, goal: 10000, goalMet: false, notes: "Desk work" },
  { id: "s-10", date: "2026-11-03", steps: 5290, goal: 10000, goalMet: false, notes: "Gym commute" },
  { id: "s-11", date: "2026-11-04", steps: 7302, goal: 10000, goalMet: false, notes: "Post-workout LISS walk" },
  { id: "s-12", date: "2026-11-05", steps: 6002, goal: 10000, goalMet: false, notes: "Active day" },
  { id: "s-13", date: "2026-11-08", steps: 10250, goal: 10000, goalMet: true, notes: "Hit 10k goal! 🎯" },
  { id: "s-14", date: "2026-11-09", steps: 10100, goal: 10000, goalMet: true, notes: "10k milestone reached!" },
  { id: "s-15", date: "2026-11-10", steps: 10450, goal: 10000, goalMet: true, notes: "Consistent 10k step habit" },
  { id: "s-16", date: "2026-11-11", steps: 10050, goal: 10000, goalMet: true, notes: "5 days straight 10k!" },
];

// -------------------------------------------------------------
// Sheet 2: Body Measurements Seed Data (from Excel)
// -------------------------------------------------------------
export const INITIAL_MEASUREMENTS: MeasurementEntry[] = [
  {
    id: "m-0",
    date: "14th Oct 2026",
    weekLabel: "Week 0 (Baseline)",
    weightKg: 87.6,
    shoulderInches: 17.5,
    chestInches: 38.0,
    waistInches: 37.0,
    hipsInches: 43.0,
    thighInches: 25.0,
    notes: "Program initiation baseline with Aanchal",
  },
  {
    id: "m-1",
    date: "26th Oct 2026",
    weekLabel: "Week 1",
    weightKg: 86.9,
    shoulderInches: 18.5,
    chestInches: 38.0,
    waistInches: 36.0,
    hipsInches: 42.9,
    thighInches: 25.0,
    notes: "-0.7 kg down, waist down 1 inch",
  },
  {
    id: "m-2",
    date: "2nd Nov 2026",
    weekLabel: "Week 2",
    weightKg: 86.0,
    shoulderInches: 19.0,
    chestInches: 39.0,
    waistInches: 35.0,
    hipsInches: 42.0,
    thighInches: 24.0,
    notes: "-1.6 kg down total, shoulders expanding +1.5 in",
  },
  {
    id: "m-3",
    date: "9th Nov 2026",
    weekLabel: "Week 3",
    weightKg: 85.2,
    shoulderInches: 19.0,
    chestInches: 39.0,
    waistInches: 35.0,
    hipsInches: 41.9,
    thighInches: 23.8,
    notes: "-2.4 kg down, thighs tightening",
  },
  {
    id: "m-4",
    date: "16th Nov 2026",
    weekLabel: "Week 4 (Current)",
    weightKg: 84.7,
    shoulderInches: 19.0,
    chestInches: 39.0,
    waistInches: 34.9,
    hipsInches: 42.0,
    thighInches: 22.0,
    notes: "Total -2.9 kg down! Lost face fat, increased stamina",
  },
];

// -------------------------------------------------------------
// Sheet 3: Weekly Update Check-In Seed Data (from Excel)
// -------------------------------------------------------------
export const INITIAL_WEEKLY_UPDATES: WeeklyUpdateEntry[] = [
  {
    id: "wu-1",
    weekNumber: 1,
    date: "Week 1",
    dietScore: 10,
    workoutAccuracy: 10,
    avgWorkoutDuration: "1 hour 30 min",
    cardioScore: 7,
    avgDailySteps: "4.0k",
    avgWaterIntake: "approx 2.5 liters",
    stressScore: 7,
    sleepQuality: 8,
    positiveOutcome: "Felt very good, lost face fats and feeling much more active",
    issuesFaced: "None",
    energyLevels: "Very good",
    strengthTrend: "Increasing",
    gave100Percent: true,
  },
  {
    id: "wu-2",
    weekNumber: 2,
    date: "Week 2",
    dietScore: 9,
    workoutAccuracy: 10,
    avgWorkoutDuration: "1 hour 30 min",
    cardioScore: 8,
    avgDailySteps: "6.2k",
    avgWaterIntake: "approx 3.0 liters",
    stressScore: 8,
    sleepQuality: 9,
    positiveOutcome: "Was able to systematically increase my daily steps and hit gym with energy",
    issuesFaced: "None",
    energyLevels: "Very good",
    strengthTrend: "Increasing",
    gave100Percent: true,
  },
  {
    id: "wu-3",
    weekNumber: 3,
    date: "Week 3",
    dietScore: 9,
    workoutAccuracy: 10,
    avgWorkoutDuration: "1 hour 30 min",
    cardioScore: 9,
    avgDailySteps: "9.6k",
    avgWaterIntake: "approx 3.0 liters",
    stressScore: 9,
    sleepQuality: 9,
    positiveOutcome: "Increased my daily steps to 10k per day and was able to do it for 5 days straight!",
    issuesFaced: "None",
    energyLevels: "Very good",
    strengthTrend: "Increasing",
    gave100Percent: true,
  },
];

// -------------------------------------------------------------
// Sheet 4: Nutrition Plan Data (from Excel)
// -------------------------------------------------------------
export const NUTRITION_TARGETS = {
  calories: "1850 - 1900 kcal",
  protein: "125 - 135 g",
  carbohydrates: "200+ g",
  fats: "40 - 45 g",
};

export interface MealOption {
  mealName: string;
  items: string[];
  protein: number;
  carbs: number;
  fats: number;
  timing?: string;
}

export const NUTRITION_MEALS: MealOption[] = [
  {
    mealName: "Wake Up Routine",
    items: ["400 ml room temperature water immediately upon waking"],
    protein: 0,
    carbs: 0,
    fats: 0,
    timing: "Right after waking up",
  },
  {
    mealName: "Breakfast (Option 1 - Eggs)",
    items: [
      "Eggs: 3 whole",
      "Whole wheat bread: 2 slices (approx 36g each)",
      "Whey protein: 0.5 scoop",
      "Ghee: 5 g",
    ],
    protein: 38,
    carbs: 29,
    fats: 22,
    timing: "Morning post-walk/prep",
  },
  {
    mealName: "Breakfast (Option 2 - Oats Bowl)",
    items: [
      "Rolled oats: 50 g",
      "Skimmed milk: 200 g",
      "Whey protein: 30 g (1 full scoop)",
      "Mixed nuts: 5 g (without peanuts) or Almonds: 10 g",
      "Chia seeds: 5 g",
      "Berries of choice (fresh/frozen): 100 g or 1 whole citrus fruit",
    ],
    protein: 41,
    carbs: 47,
    fats: 11,
    timing: "Morning alternative",
  },
  {
    mealName: "Lunch",
    items: [
      "Protein: Low-fat paneer (65g) OR Soya chunks raw (30g) OR Chicken breast raw (120g - skip skyr)",
      "Carbs: White rice raw (45g) OR Whole wheat flour (47g / ~2 rotis)",
      "Dairy: Skyr or Slim curd (150g)",
      "Salad: Mixed vegetables (150g) or Cucumber + beetroot + carrot",
      "Cooking: Oil (5g)",
    ],
    protein: 39,
    carbs: 66,
    fats: 8,
    timing: "Midday (1:00 PM - 2:00 PM)",
  },
  {
    mealName: "Pre-Workout Fuel",
    items: [
      "Rice cakes: 3 cakes",
      "Dark chocolate (70%+ cacao): 5 g",
      "Pure honey: 10 g",
    ],
    protein: 3,
    carbs: 31,
    fats: 3,
    timing: "45-60 mins prior to training",
  },
  {
    mealName: "Dinner",
    items: [
      "Protein: Chicken breast raw (130g) OR Low-fat paneer (70g) + 120g skyr",
      "Dal: Any dal (cooked 140g)",
      "Carbs: White rice raw (55g) OR Whole wheat pasta raw (57g) OR Whole wheat flour (55-60g)",
      "Vegetables: Sauteed mixed vegetables (100-150g) OR Cucumber + beetroot + tomato salad",
      "Cooking: Oil (5g)",
    ],
    protein: 43,
    carbs: 59,
    fats: 12,
    timing: "8:00 PM - 9:00 PM",
  },
  {
    mealName: "Anytime Snack",
    items: [
      "Fresh Guava: 100 g",
      "Whey protein: 0.5 scoop",
    ],
    protein: 14,
    carbs: 10,
    fats: 1,
    timing: "When hungry between meals",
  },
];

export const NUTRITION_NOTES = [
  "On rest days, reduce the carbohydrates by half.",
  "Do not drink coffee, black tea, green tea, or consume high-calcium dairy within 90 minutes of having lentils/iron meals.",
  "Sweeteners allowed: Stevia (Sugar Free Natura), Sucralose, Aspartame (Equal/Sugar Free Gold) within moderation.",
  "Stay consistently hydrated with 3-3.5L of water throughout the day.",
];

// -------------------------------------------------------------
// Sheet 5: Supplementations (from Excel)
// -------------------------------------------------------------
export interface SupplementItem {
  name: string;
  quantity: string;
  time: string;
  category: string;
  notes?: string;
}

export const SUPPLEMENTS_LIST: SupplementItem[] = [
  {
    name: "Mecofol Plus",
    quantity: "1000 - 1200 mcg",
    time: "With Breakfast",
    category: "Vitamins / B-Complex",
    notes: "Pharmacy grade methylcobalamin for nervous system & cellular energy.",
  },
  {
    name: "Omega 3 (EPA/DHA)",
    quantity: "1500 - 2000 mg active EPA/DHA",
    time: "1 with Breakfast, 1 before bed",
    category: "Essential Fatty Acids",
    notes: "Supports joint recovery, cardiovascular health & systemic inflammation.",
  },
  {
    name: "Magnesium Bisglycinate",
    quantity: "600 - 700 mg",
    time: "30-45 mins before bed",
    category: "Minerals / Recovery",
    notes: "High bioavailability. Relaxes muscles and enhances deep REM sleep.",
  },
  {
    name: "Vitamin D3 + K2 (MK7)",
    quantity: "60,000 IU (Weekly/Regular)",
    time: "With the fattiest meal of the day",
    category: "Vitamins",
    notes: "Pharmacy brand. Take with fats (lunch or dinner) for optimal absorption.",
  },
  {
    name: "Creatine Monohydrate",
    quantity: "5 g daily",
    time: "In post-workout meal / shake",
    category: "Strength & Power",
    notes: "Crucial for ATP resynthesis, cellular hydration and strength output.",
  },
];

// -------------------------------------------------------------
// Sheet 6: Cardio Guidelines (from Excel)
// -------------------------------------------------------------
export const CARDIO_GUIDELINES = {
  title: "LISS Cardio Guidelines for Arun",
  intensity: "RPE 2–4 out of 10. Perceived exertion should be very light to moderate. You should comfortably hold a full conversation throughout the session (Zone 2 for optimal fat burning and aerobic base building).",
  duration: "30 - 35 minutes per session",
  frequency: "3 - 4 sessions per week (either post-workout or on dedicated rest days)",
  weeklyTotal: "120 - 150 dedicated minutes per week",
  modalities: [
    { name: "Incline Treadmill Walk", description: "3-4 mph at 8-12% incline. Low impact, zero joint shear, high glute recruitment." },
    { name: "Stationary Bike / Cycling", description: "Smooth continuous pedaling on flat resistance. Great for active recovery." },
    { name: "Elliptical Trainer", description: "Low impact gliding motion that saves the knees while maintaining steady Zone 2 heart rate." },
    { name: "Swimming", description: "Full body aerobic conditioning if you have access and enjoy it." },
  ],
  keyPointers: [
    "Recovery comes first: If overly fatigued, reduce duration or intensity.",
    "Consistency over intensity: Steady LISS builds aerobic base without generating fatigue debt.",
    "Hydration: Drink water before, during, and after each cardio bout.",
  ],
};

// -------------------------------------------------------------
// Sheet 7: Upper Body Rehab (from Excel)
// -------------------------------------------------------------
export interface RehabExercise {
  name: string;
  sets: number;
  reps: string;
  focus: string;
  instructions: string;
}

export const REHAB_ROUTINE: RehabExercise[] = [
  {
    name: "Cat - Cow Stretch",
    sets: 3,
    reps: "10 reps",
    focus: "Thoracic spine mobility & pelvic articulation",
    instructions: "On all fours, inhale as you arch back (cow), exhale as you round spine up to ceiling (cat). Move vertebra by vertebra.",
  },
  {
    name: "Band Pull-Aparts",
    sets: 2,
    reps: "15 - 20 reps",
    focus: "Scapular retractors, rear delts & posture",
    instructions: "Hold light resistance band at shoulder height with straight arms. Pull outward until band touches chest, squeezing shoulder blades together.",
  },
  {
    name: "Isometric External Rotation Against Wall",
    sets: 3,
    reps: "30 seconds hold",
    focus: "Infraspinatus & teres minor (rotator cuff)",
    instructions: "Stand side-on against a wall. Tuck elbow 90° against ribs, gently press the back of your wrist outward into the wall without shifting body.",
  },
  {
    name: "Wall Slides",
    sets: 2,
    reps: "10 reps",
    focus: "Serratus anterior & upward scapular rotation",
    instructions: "Back, head, elbows, and wrists against wall. Slide arms upward into a 'Y' without arching lower back, then slowly slide back down.",
  },
];

// -------------------------------------------------------------
// Sheet 8: Stress Management (from Excel)
// -------------------------------------------------------------
export const STRESS_PROTOCOLS = [
  {
    title: "1. Right After Waking Up — Diaphragmatic Breathing",
    duration: "2 minutes (8–10 slow breaths)",
    timing: "Immediately upon waking, lying down or sitting up",
    steps: [
      "Place one hand on your chest, one hand on your belly.",
      "Inhale slowly through your nose so that ONLY your belly rises (chest stays quiet).",
      "Exhale gently through your mouth.",
      "Complete 8–10 rhythmic, unhurried breaths to set parasympathetic tone.",
    ],
  },
  {
    title: "2. Midday (When Stressed) — Box Breathing",
    duration: "1–2 minutes (4–6 rounds)",
    timing: "During work stress, pre-meeting, or afternoon slump",
    steps: [
      "Inhale through nose for 4 seconds",
      "Hold full lungs for 4 seconds",
      "Exhale slowly for 4 seconds",
      "Hold empty lungs for 4 seconds",
      "Repeat 4 to 6 cycles to rapidly reset the autonomic nervous system.",
    ],
  },
  {
    title: "3. Before Bed — Diaphragmatic Down-Regulation",
    duration: "5 minutes",
    timing: "Lying in bed in a dark room before sleep",
    steps: [
      "Lie flat on back with legs slightly bent or elevated on a pillow.",
      "Slow 4-second nasal inhale filling deep abdomen.",
      "Prolonged 6-8 second gentle exhale through pursed lips.",
      "Allows heart rate to drop and facilitates immediate transition into deep sleep.",
    ],
  },
];

// -------------------------------------------------------------
// Sheet 9: Important Pointers (from Excel)
// -------------------------------------------------------------
export const IMPORTANT_POINTERS = [
  {
    number: 1,
    title: "Consistency Over 100% Intensity",
    body: "No need to go 100% on Day 1 and crash by Day 3. Give 70–80% every day and remain consistent. If you feel overwhelmed, inform Aanchal immediately.",
  },
  {
    number: 2,
    title: "Prioritise Protein at Every Meal",
    body: "Aim for a solid protein source 3–5 times a day. This is what actually repairs and builds muscle tissue. Training hard without enough protein is just unnecessary stress.",
  },
  {
    number: 3,
    title: "Train to Progress, Not Just to Sweat",
    body: "Lift with deliberate intent. Track your weights, reps, and sets. Muscle hypertrophy comes from progressive overload, not random exhausting workouts.",
  },
  {
    number: 4,
    title: "Don't Skip Carbs",
    body: "Carbohydrates fuel your training intensity and drive recovery. If your gym performance or strength feels flat, carbs are usually the missing piece.",
  },
  {
    number: 5,
    title: "Rest is Part of the Program",
    body: "Muscle grows when you recover away from the gym. Sleep well (7-8+ hrs), take rest days seriously, and stop treating chronic fatigue like a badge of honour.",
  },
  {
    number: 6,
    title: "Be Patient and Consistent",
    body: "Scale weight, muscle definition, and body measurements move slowly week over week. Consistency over 12 weeks beats perfection for 3 days.",
  },
  {
    number: 7,
    title: "Digest What You Eat",
    body: "If you feel bloated, nauseous, or are forcing meals down, we will adjust food choices and timing. Growth should feel sustainable and energetic, not miserable.",
  },
  {
    number: 8,
    title: "Form First, Weight Later",
    body: "Biomechanical technique matters far more than heavy load. Never sacrifice form to ego-lift. Don't rush weight progression before mastering control.",
  },
  {
    number: 9,
    title: "Full Range of Motion",
    body: "Go as low or high as your joint anatomy allows without pain. Quality muscle stretch and contraction always beat half-reps.",
  },
  {
    number: 10,
    title: "Listen to Your Body",
    body: "Deep muscle burn and fatigue are normal; sharp joint or tendon pain is not. Always communicate discomfort immediately.",
  },
];

// -------------------------------------------------------------
// Sheet 10: Fruits and Veggies Nutrition Table (from Excel)
// -------------------------------------------------------------
export interface FoodItem {
  name: string;
  caloriesPer100g: number;
  protein: number;
  carbs: number;
  fat: number;
  category: "Vegetable" | "Fruit";
}

export const FRUITS_AND_VEGGIES_DATA: FoodItem[] = [
  { name: "Cucumber", caloriesPer100g: 15, protein: 0.65, carbs: 3.63, fat: 0.11, category: "Vegetable" },
  { name: "Celery", caloriesPer100g: 16, protein: 0.69, carbs: 3.0, fat: 0.17, category: "Vegetable" },
  { name: "Radish", caloriesPer100g: 16, protein: 0.68, carbs: 3.4, fat: 0.1, category: "Vegetable" },
  { name: "Lettuce (Romaine)", caloriesPer100g: 17, protein: 1.23, carbs: 3.29, fat: 0.3, category: "Vegetable" },
  { name: "Zucchini / Squash", caloriesPer100g: 17, protein: 1.21, carbs: 3.11, fat: 0.32, category: "Vegetable" },
  { name: "Swiss Chard", caloriesPer100g: 19, protein: 1.8, carbs: 3.74, fat: 0.2, category: "Vegetable" },
  { name: "Asparagus", caloriesPer100g: 20, protein: 2.2, carbs: 3.9, fat: 0.12, category: "Vegetable" },
  { name: "Mushrooms (White)", caloriesPer100g: 22, protein: 3.09, carbs: 3.26, fat: 0.34, category: "Vegetable" },
  { name: "Spinach", caloriesPer100g: 23, protein: 2.86, carbs: 3.63, fat: 0.39, category: "Vegetable" },
  { name: "Cauliflower", caloriesPer100g: 25, protein: 1.92, carbs: 4.97, fat: 0.28, category: "Vegetable" },
  { name: "Bell Pepper (Capsicum)", caloriesPer100g: 25, protein: 1.0, carbs: 6.0, fat: 0.2, category: "Vegetable" },
  { name: "Broccoli", caloriesPer100g: 34, protein: 2.82, carbs: 6.64, fat: 0.37, category: "Vegetable" },
  { name: "Tomato", caloriesPer100g: 18, protein: 0.88, carbs: 3.89, fat: 0.2, category: "Vegetable" },
  { name: "Carrot", caloriesPer100g: 41, protein: 0.93, carbs: 9.58, fat: 0.24, category: "Vegetable" },
  { name: "Beetroot", caloriesPer100g: 43, protein: 1.61, carbs: 9.56, fat: 0.17, category: "Vegetable" },
  { name: "Guava", caloriesPer100g: 68, protein: 2.55, carbs: 14.32, fat: 0.95, category: "Fruit" },
  { name: "Strawberries", caloriesPer100g: 32, protein: 0.67, carbs: 7.68, fat: 0.3, category: "Fruit" },
  { name: "Blueberries", caloriesPer100g: 57, protein: 0.74, carbs: 14.49, fat: 0.33, category: "Fruit" },
  { name: "Watermelon", caloriesPer100g: 30, protein: 0.61, carbs: 7.55, fat: 0.15, category: "Fruit" },
  { name: "Orange / Citrus", caloriesPer100g: 47, protein: 0.94, carbs: 11.75, fat: 0.12, category: "Fruit" },
  { name: "Apple", caloriesPer100g: 52, protein: 0.26, carbs: 13.81, fat: 0.17, category: "Fruit" },
  { name: "Papaya", caloriesPer100g: 43, protein: 0.47, carbs: 10.82, fat: 0.26, category: "Fruit" },
];

// -------------------------------------------------------------
// Sheet 11: Trainee Details / Profile (from Excel)
// -------------------------------------------------------------
export const TRAINEE_PROFILE = {
  name: "Arun",
  coach: "Aanchal",
  age: 24,
  country: "India",
  startingWeightKg: 87.6, // Oct 14th 2026
  currentWeightKg: 84.7,  // Nov 16th 2026 (-2.9 kg)
  foodPreference: "Non-vegetarian",
  foodAllergies: "None",
  medications: "None",
  medicalConditions: "None",
  goal: "Lower body fat percentage, increased muscle mass, increased lower body proportions",
  startDate: "14th October 2026",
  status: "Active (Week 4+)",
};
