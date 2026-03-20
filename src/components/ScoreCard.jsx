import { useEffect, useState } from "react";
import IssuesList from "./IssuesList";
import Suggestions from "./Suggestions";

function ScoreRing({ score }) {
  const [displayed, setDisplayed] = useState(0);
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const progress = (displayed / 100) * circ;

  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 2;
      if (start <= score) { setDisplayed(start); requestAnimationFrame(step); }
      else setDisplayed(score);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 300);
    return () => clearTimeout(t);
  }, [score]);

  const color = score >= 80 ? "var(--accent-secondary)" : score >= 60 ? "#f59e0b" : "var(--accent-warn)";
  const label = score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work";

  return (
    <div className="score-ring-wrapper">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <circle
          cx="65" cy="65" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ - progress}
          transform="rotate(-90 65 65)"
          style={{ transition: "stroke-dashoffset 0.05s linear", filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="score-center">
        <span className="score-number">{displayed}</span>
        <span className="score-label-tag" style={{ color }}>{label}</span>
      </div>
    </div>
  );
}

export default function ScoreCard({ result, onReset }) {
  const { score, issues = [], suggestions = [] } = result;

  return (
    <div className="scorecard">
      <div className="scorecard-top">
        <div className="score-section">
          <ScoreRing score={score} />
          <div className="score-meta">
            <h2 className="score-heading">UI Analysis Complete</h2>
            <p className="score-desc">Your interface scored <strong>{score}/100</strong> across layout, spacing, consistency, and accessibility.</p>
          </div>
        </div>

        <div className="stats-row">
          {[
            { label: "Issues Found", value: issues.length, color: "var(--accent-warn)" },
            { label: "Suggestions", value: suggestions.length, color: "var(--accent-secondary)" },
            { label: "Score", value: `${score}%`, color: "var(--accent-primary)" },
          ].map((s) => (
            <div className="stat-chip" key={s.label}>
              <span className="stat-value" style={{ color: s.color }}>{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="scorecard-body">
        <IssuesList issues={issues} />
        <Suggestions suggestions={suggestions} />
      </div>

      <button className="reset-btn" onClick={onReset}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
        Analyze Another UI
      </button>

      <style>{`
        .scorecard {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeUp 0.6s ease both;
        }
        .scorecard-top {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          backdrop-filter: blur(12px);
          box-shadow: var(--shadow-card), var(--shadow-glow);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .score-section {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .score-ring-wrapper {
          position: relative;
          flex-shrink: 0;
          width: 130px; height: 130px;
          display: flex; align-items: center; justify-content: center;
        }
        .score-center {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .score-number {
          font-family: var(--font-display);
          font-size: 30px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }
        .score-label-tag {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-top: 2px;
        }
        .score-meta { flex: 1; }
        .score-heading {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .score-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .score-desc strong { color: var(--text-primary); }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .stat-chip {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .stat-value {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
        }
        .stat-label {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
        .scorecard-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .reset-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px;
          background: transparent;
          border: 1.5px solid var(--border-bright);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }
        .reset-btn:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: rgba(108,99,255,0.05);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}