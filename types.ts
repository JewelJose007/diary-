
export type MoodType = 'Calm' | 'Tired' | 'Heavy' | 'Light' | 'Anxious' | 'Okay' | 'Content';

export type DiaryView = 'home' | 'write' | 'permission' | 'reflect' | 'reset' | 'closing' | 'opening' | 'journal' | 'auth';

export interface User {
  name: string;
  email: string;
  photo?: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  type: 'daily' | 'weekly' | 'motivation' | 'permission' | 'reflection' | 'mood';
  content?: string;
  mood?: MoodType;
  gratitude?: string[];
  prompt?: string;
  reflectionResponse?: string;
  weeklyResponses?: string[];
  carryingForward?: string;
}

export interface ReflectionPrompt {
  id: string;
  text: string;
}

export interface DailyPrompt {
  line: string;
  prompt: string;
}

export interface WeeklyReset {
  quote: string;
  questions: string[];
}
