"use client";

import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  Download,
  FileText,
  Gauge,
  GraduationCap,
  LineChart,
  LockKeyhole,
  MessageSquareText,
  Mic2,
  ShieldCheck,
  Star,
  Upload,
  Users
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { defaultState, loadState, saveState } from "@/lib/storage";
import { isSupabaseConfigured } from "@/lib/supabase";
import { roleQuestionBank, scoreAnswer } from "@/lib/interview";
import type { InterviewRecord } from "@/types/interview";

const focusAreas = ["Communication", "Technical depth", "Confidence", "Problem solving"];

export default function Home() {
  const [candidateName, setCandidateName] = useState(defaultState.candidateName);
  const [email, setEmail] = useState(defaultState.email);
  const [targetRole, setTargetRole] = useState(defaultState.targetRole);
  const [resumeName, setResumeName] = useState(defaultState.resumeName);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [history, setHistory] = useState<InterviewRecord[]>(defaultState.history);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const interviewQuestions = roleQuestionBank[targetRole];
  const feedback = useMemo(() => scoreAnswer(answer), [answer]);
  const averageScore = Math.round(
    history.reduce((total, item) => total + item.score, 0) / Math.max(history.length, 1)
  );
  const readiness = Math.max(averageScore, feedback.score);
  const strongSessions = history.filter((item) => item.score >= 85).length;

  useEffect(() => {
    const saved = loadState();
    setCandidateName(saved.candidateName);
    setEmail(saved.email);
    setTargetRole(saved.targetRole);
    setResumeName(saved.resumeName);
    setHistory(saved.history);
    setIsSignedIn(true);
  }, []);

  useEffect(() => {
    saveState({ candidateName, email, targetRole, resumeName, history });
  }, [candidateName, email, targetRole, resumeName, history]);

  function nextQuestion() {
    const updatedAnswers = [...answers];
    updatedAnswers[activeQuestion] = answer;
    const nextIndex = (activeQuestion + 1) % interviewQuestions.length;

    setAnswers(updatedAnswers);
    setActiveQuestion(nextIndex);
    setAnswer(updatedAnswers[nextIndex] || "");
  }

  function finishInterview() {
    const finalAnswers = [...answers];
    finalAnswers[activeQuestion] = answer;

    const answeredScores = finalAnswers
      .filter((value) => value?.trim())
      .map((value) => scoreAnswer(value).score);
    const score = Math.round(
      answeredScores.reduce((total, item) => total + item, 0) / Math.max(answeredScores.length, 1)
    );

    const record: InterviewRecord = {
      id: crypto.randomUUID(),
      role: targetRole,
      date: new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(new Date()),
      score,
      status: score >= 85 ? "Strong" : score >= 70 ? "Good" : "Practice",
      resumeName
    };

    setHistory((current) => [record, ...current].slice(0, 10));
    setAnswers([]);
    setAnswer("");
    setActiveQuestion(0);
  }

  function downloadReport() {
    const latest = history[0];
    const report = [
      "PrepWise AI Interview Report",
      `Candidate: ${candidateName}`,
      `Email: ${email}`,
      `Target role: ${targetRole}`,
      `Resume: ${resumeName}`,
      `Latest score: ${latest?.score ?? feedback.score}%`,
      `Recommendation: ${feedback.note}`
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prepwise-interview-report.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="appShell" id="top">
      <Navbar />

      <section className="heroSection productHero" aria-labelledby="hero-title">
        <div className="heroCopy">
          <div className="statusRail" aria-label="Platform status">
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              {isSupabaseConfigured ? "Supabase connected" : "Local-first mode"}
            </span>
            <span>
              <Database size={16} aria-hidden="true" />
              Backend ready
            </span>
          </div>

          <h1 id="hero-title">PrepWise AI Interview Workspace</h1>
          <p className="heroText">
            A complete mock interview workspace for candidates, mentors, and placement
            teams: resume intake, adaptive questioning, answer scoring, history, and
            analytics in one professional dashboard.
          </p>

          <div className="profileStrip enterpriseProfile" aria-label="Candidate profile">
            <input
              value={candidateName}
              onChange={(event) => setCandidateName(event.target.value)}
              aria-label="Candidate name"
              placeholder="Candidate name"
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-label="Candidate email"
              placeholder="candidate@email.com"
            />
            <select
              value={targetRole}
              onChange={(event) => {
                setTargetRole(event.target.value);
                setActiveQuestion(0);
                setAnswer("");
                setAnswers([]);
              }}
              aria-label="Target role"
            >
              {Object.keys(roleQuestionBank).map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="heroActions">
            <a className="primaryButton" href="#interview">
              <Mic2 size={18} aria-hidden="true" />
              Launch Interview
            </a>
            <button className="secondaryButton" type="button" onClick={() => setIsSignedIn(true)}>
              <LockKeyhole size={18} aria-hidden="true" />
              {isSignedIn ? "Demo Session Active" : "Start Demo Session"}
            </button>
          </div>
        </div>

        <div className="interviewPreview commandPanel" aria-label="Interview readiness summary">
          <div className="previewHeader">
            <div>
              <p>Candidate readiness</p>
              <strong>{readiness}%</strong>
            </div>
            <Brain size={34} aria-hidden="true" />
          </div>
          <div className="scoreRing" aria-hidden="true">
            <span>AI</span>
          </div>
          <div className="miniStats">
            <span>{history.length} sessions</span>
            <span>{resumeName === "No resume selected" ? "0 resumes" : "1 resume"}</span>
            <span>{targetRole}</span>
          </div>
        </div>
      </section>

      <section className="dashboardGrid" id="dashboard" aria-label="Dashboard summary">
        <MetricCard icon={Users} label="Active candidate" value={isSignedIn ? "1" : "0"} detail={candidateName} />
        <MetricCard icon={MessageSquareText} label="Interviews" value={`${history.length}`} detail="Saved attempts" />
        <MetricCard icon={Star} label="Average score" value={`${averageScore}%`} detail="Across sessions" />
        <MetricCard icon={Gauge} label="Readiness" value={`${readiness}%`} detail="Live interview signal" />
      </section>

      <section className="workspaceGrid">
        <article className="panel" id="resume">
          <div className="sectionTitle">
            <Upload size={22} aria-hidden="true" />
            <div>
              <h2>Resume Intake</h2>
              <p>Capture the resume file used for question personalization.</p>
            </div>
          </div>

          <label className="uploadBox">
            <FileText size={34} aria-hidden="true" />
            <span>{resumeName}</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setResumeName(file ? file.name : "No resume selected");
              }}
            />
          </label>

          <div className="focusList">
            {focusAreas.map((area) => (
              <span key={area}>
                <CheckCircle2 size={15} aria-hidden="true" />
                {area}
              </span>
            ))}
          </div>
        </article>

        <article className="panel interviewPanel" id="interview">
          <div className="sectionTitle">
            <Mic2 size={22} aria-hidden="true" />
            <div>
              <h2>AI Interview Room</h2>
              <p>Run a structured question round and save the final attempt.</p>
            </div>
          </div>

          <div className="questionBox">
            <span>Question {activeQuestion + 1} of {interviewQuestions.length}</span>
            <h3>{interviewQuestions[activeQuestion]}</h3>
          </div>

          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Type the candidate answer here..."
            aria-label="Interview answer"
          />

          <div className="interviewActions">
            <button className="secondaryButton" type="button" onClick={() => setAnswer("")}>
              Clear
            </button>
            <button className="primaryButton" type="button" onClick={nextQuestion}>
              Next Question
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button className="primaryButton tealButton" type="button" onClick={finishInterview}>
              Save Interview
              <CheckCircle2 size={18} aria-hidden="true" />
            </button>
          </div>
        </article>

        <article className={`panel feedbackPanel ${feedback.tone}`}>
          <div className="sectionTitle">
            <LineChart size={22} aria-hidden="true" />
            <div>
              <h2>AI Feedback</h2>
              <p>Scoring model evaluates depth, structure, and impact.</p>
            </div>
          </div>

          <div className="feedbackScore">
            <strong>{feedback.score}%</strong>
            <span>{feedback.label}</span>
          </div>
          <p className="feedbackNote">{feedback.note}</p>
          <div className="tipList">
            {feedback.tips.map((tip) => (
              <span key={tip}>{tip}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="insightGrid">
        <article className="panel compactPanel">
          <div className="sectionTitle">
            <BadgeCheck size={22} aria-hidden="true" />
            <div>
              <h2>Workflow Status</h2>
              <p>Current implementation readiness.</p>
            </div>
          </div>
          <div className="statusList">
            <StatusItem label="Login/signup" state={isSupabaseConfigured ? "Backend ready" : "Demo ready"} />
            <StatusItem label="Resume upload" state="Local capture" />
            <StatusItem label="AI feedback" state="Rule engine" />
            <StatusItem label="History" state="Browser storage" />
          </div>
        </article>

        <article className="panel compactPanel">
          <div className="sectionTitle">
            <BarChart3 size={22} aria-hidden="true" />
            <div>
              <h2>Placement Team View</h2>
              <p>Enterprise metrics for admin review.</p>
            </div>
          </div>
          <div className="adminTiles">
            <span><strong>{strongSessions}</strong> strong sessions</span>
            <span><strong>{Math.max(history.length - strongSessions, 0)}</strong> needs practice</span>
            <span><strong>{averageScore}%</strong> cohort average</span>
          </div>
        </article>
      </section>

      <section className="twoColumn">
        <article className="panel" id="history">
          <div className="sectionTitle">
            <BriefcaseBusiness size={22} aria-hidden="true" />
            <div>
              <h2>Interview History</h2>
              <p>Saved attempts and progress over time.</p>
            </div>
          </div>

          <div className="historyList">
            {history.map((item) => (
              <div className="historyItem" key={item.id}>
                <div>
                  <strong>{item.role}</strong>
                  <span>{item.date} - {item.resumeName}</span>
                </div>
                <div className="historyScore">
                  <strong>{item.score}%</strong>
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel" id="admin">
          <div className="sectionTitle">
            <GraduationCap size={22} aria-hidden="true" />
            <div>
              <h2>Admin Analytics</h2>
              <p>Category-wise score distribution for mentor review.</p>
            </div>
          </div>

          <div className="analyticsBars" aria-label="Admin analytics chart">
            <ChartBar label="Technical" value={Math.min(94, averageScore + 5)} />
            <ChartBar label="HR" value={Math.max(52, averageScore - 7)} />
            <ChartBar label="Aptitude" value={Math.max(50, averageScore - 12)} />
            <ChartBar label="Communication" value={Math.min(96, averageScore + 8)} />
          </div>
          <button className="secondaryButton reportButton" type="button" onClick={downloadReport}>
            <Download size={18} aria-hidden="true" />
            Download Report
          </button>
        </article>
      </section>
    </main>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail
}: {
  icon: typeof Users;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="metricCard">
      <Icon size={22} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

function StatusItem({ label, state }: { label: string; state: string }) {
  return (
    <div className="statusItem">
      <span>{label}</span>
      <strong>{state}</strong>
    </div>
  );
}

function ChartBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="chartRow">
      <span>{label}</span>
      <div className="barTrack">
        <div className="barFill" style={{ width: `${value}%` }} />
      </div>
      <strong>{value}%</strong>
    </div>
  );
}
