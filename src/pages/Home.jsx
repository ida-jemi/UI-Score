import { useState, useEffect } from "react";
import UploadForm from "../components/UploadForm";
import ScoreCard from "../components/ScoreCard";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Toggle class on <body> — this beats any specificity fight with :root
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleAnalyze = async (imageData, category) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData, category }),
      });
      const data = await response.json();
      setResult(data);
    } catch {
      // Mock result for demo
      setResult({
        score: 82,
        issues: ["Overlapping elements", "Inconsistent spacing"],
        suggestions: ["Increase padding between sections", "Use consistent button styles"],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setResult(null); setLoading(false); };

  return (
    <div className="home-wrapper">
      <header className="home-header">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">UI<span className="logo-accent">Score</span></span>
        </div>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
          <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>

        <p className="home-tagline">Detect issues. Improve design. Instantly.</p>
      </header>

      <main className="home-main">
        {loading ? (
          <LoadingScreen />
        ) : result ? (
          <ScoreCard result={result} onReset={handleReset} />
        ) : (
          <UploadForm onAnalyze={handleAnalyze} />
        )}
      </main>

      <footer className="home-footer">
        <span>Powered by AI · Built for designers</span>
      </footer>

      <style>{`
        .home-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 24px;
        }
        .home-header {
          width: 100%;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 0 16px;
          gap: 12px;
          animation: fadeSlideDown 0.7s ease both;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .logo-icon {
          font-size: 26px;
          color: var(--accent-primary);
          filter: drop-shadow(0 0 10px var(--accent-primary));
        }
        .logo-text {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: var(--text-primary);
        }
        .logo-accent { color: var(--accent-primary); }

        .theme-toggle {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-bright);
          border-radius: 999px;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.22s ease;
          backdrop-filter: blur(8px);
        }
        .theme-toggle:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: rgba(108, 99, 255, 0.07);
        }

        .home-tagline {
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.3px;
        }
        .home-main {
          flex: 1;
          width: 100%;
          max-width: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 0;
        }
        .home-footer {
          padding: 24px;
          color: var(--text-muted);
          font-size: 13px;
          letter-spacing: 0.3px;
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}