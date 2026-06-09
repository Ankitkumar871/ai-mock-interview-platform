export type InterviewRecord = {
  id: string;
  role: string;
  date: string;
  score: number;
  status: "Strong" | "Good" | "Practice";
  resumeName: string;
};

export type SavedState = {
  candidateName: string;
  email: string;
  targetRole: string;
  resumeName: string;
  history: InterviewRecord[];
};

export type Feedback = {
  score: number;
  label: string;
  note: string;
  tone: "neutral" | "warning" | "positive" | "excellent";
  tips: string[];
};
