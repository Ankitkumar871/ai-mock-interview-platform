import type { Feedback, InterviewRecord } from "@/types/interview";

export const roleQuestionBank: Record<string, string[]> = {
  "Full Stack Developer": [
    "Tell me about yourself and the full stack role you are preparing for.",
    "Explain a project where you connected frontend, backend, and database layers.",
    "How would you design authentication for a web application?",
    "How do you debug a production issue across client and server?"
  ],
  "Frontend Developer": [
    "Tell me about yourself and your frontend development experience.",
    "How do you make a page responsive, accessible, and fast?",
    "Explain a React component you built and how you managed state.",
    "How would you improve a slow user interface?"
  ],
  "Backend Developer": [
    "Tell me about yourself and your backend development experience.",
    "How would you design APIs for a mock interview platform?",
    "Explain authentication, authorization, and session storage.",
    "How do you structure database tables for interview history?"
  ],
  "HR Interview": [
    "Tell me about yourself and your career goals.",
    "Describe a time you handled pressure during a deadline.",
    "How would you handle disagreement with a teammate?",
    "Why should this company hire you?"
  ]
};

export const defaultHistory: InterviewRecord[] = [
  {
    id: "sample-1",
    role: "Frontend Developer",
    date: "Jun 8, 2026",
    score: 86,
    status: "Strong",
    resumeName: "sample-resume.pdf"
  },
  {
    id: "sample-2",
    role: "HR Interview",
    date: "Jun 5, 2026",
    score: 78,
    status: "Good",
    resumeName: "sample-resume.pdf"
  },
  {
    id: "sample-3",
    role: "Backend Developer",
    date: "Jun 1, 2026",
    score: 71,
    status: "Practice",
    resumeName: "sample-resume.pdf"
  }
];

export function scoreAnswer(answer: string): Feedback {
  const text = answer.trim().toLowerCase();
  const words = text.split(/\s+/).filter(Boolean).length;
  const hasExample = /\b(project|example|built|created|implemented|developed)\b/.test(text);
  const hasImpact = /\b(result|improved|reduced|increased|score|users|performance|accuracy)\b/.test(text);
  const hasStructure = /\b(first|then|because|therefore|finally|challenge|action)\b/.test(text);

  if (words === 0) {
    return {
      score: 0,
      label: "Waiting",
      note: "Answer the question to generate practice feedback.",
      tone: "neutral",
      tips: ["Use 45-90 words", "Add a real project example", "End with a result"]
    };
  }

  const score = Math.min(
    96,
    35 + Math.min(words, 90) * 0.55 + (hasExample ? 14 : 0) + (hasImpact ? 12 : 0) + (hasStructure ? 8 : 0)
  );
  const roundedScore = Math.round(score);

  return {
    score: roundedScore,
    label: roundedScore >= 85 ? "Interview ready" : roundedScore >= 70 ? "Good start" : "Needs detail",
    note:
      roundedScore >= 85
        ? "Strong answer. You used enough detail and showed interview-ready clarity."
        : roundedScore >= 70
          ? "Good base. Add measurable impact to make the answer more convincing."
          : "Add a specific example, your action, and the final result.",
    tone: roundedScore >= 85 ? "excellent" : roundedScore >= 70 ? "positive" : "warning",
    tips: [
      hasExample ? "Example detected" : "Mention one project",
      hasImpact ? "Impact detected" : "Add measurable result",
      hasStructure ? "Structure detected" : "Use first, then, result"
    ]
  };
}
