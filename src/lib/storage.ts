import { defaultHistory } from "@/lib/interview";
import type { SavedState } from "@/types/interview";

const STORAGE_KEY = "prepwise-ai-demo-state";

export const defaultState: SavedState = {
  candidateName: "Student Candidate",
  email: "student@example.com",
  targetRole: "Full Stack Developer",
  resumeName: "No resume selected",
  history: defaultHistory
};

export function loadState(): SavedState {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultState;

  try {
    const parsed = JSON.parse(saved) as Partial<SavedState>;
    return {
      candidateName: parsed.candidateName || defaultState.candidateName,
      email: parsed.email || defaultState.email,
      targetRole: parsed.targetRole || defaultState.targetRole,
      resumeName: parsed.resumeName || defaultState.resumeName,
      history: parsed.history?.length ? parsed.history : defaultState.history
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return defaultState;
  }
}

export function saveState(state: SavedState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
