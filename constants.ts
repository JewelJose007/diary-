
import { ReflectionPrompt, MoodType, WeeklyReset } from './types';

export const OPENING_NOTE = {
  title: "A space for you.",
  text: "This isn't a project. There are no expectations here, no daily quotas to fill, and no right way to feel. If you want to write, the space is yours. If you want to leave it blank, that's allowed too. This diary exists for you, exactly as you are—on the good days, the bad ones, and the quiet ones in between."
};

export const CLOSING_NOTE = {
  title: "Presence over progress.",
  text: "There is no finish line. Growth is just the act of being honest with yourself, day by day. I'm here, and I'm proud of the way you carry yourself through the world. Whenever you need a place to land, this space will be waiting."
};

export const PERMISSION_LINES = [
  "It's okay to not be okay.",
  "It's okay to feel nothing.",
  "It's okay to rest.",
  "It's okay if today was unproductive.",
  "You are allowed to move at your own pace.",
  "Silence is a valid response to a long day."
];

export const REFLECTION_PROMPTS: ReflectionPrompt[] = [
  { id: '1', text: "What felt heavy lately?" },
  { id: '2', text: "What's something I'm learning about myself?" },
  { id: '3', text: "What do I need less of right now?" },
  { id: '4', text: "What helped me get through this week?" },
  { id: '5', text: "What is one truth about my strength that I often overlook?" }
];

export const MOODS: { label: MoodType; color: string }[] = [
  { label: 'Calm', color: 'bg-zinc-200' },
  { label: 'Light', color: 'bg-stone-100' },
  { label: 'Content', color: 'bg-zinc-300' },
  { label: 'Okay', color: 'bg-stone-200' },
  { label: 'Tired', color: 'bg-zinc-100' },
  { label: 'Anxious', color: 'bg-stone-300' },
  { label: 'Heavy', color: 'bg-zinc-400' }
];

export const DIARY_TITLES = ["Today", "Thoughts", "Untitled", "Just writing"];

/**
 * Configuration for the weekly reset check-ins.
 */
export const WEEKLY_RESETS: WeeklyReset[] = [
  {
    quote: "Softness is not weakness. It takes courage to remain open in a world that can be hard.",
    questions: [
      "What was a moment of quiet pride for me this week?",
      "Where did I find ease when things felt difficult?",
      "What is one intention I want to carry into next week?"
    ]
  }
];
