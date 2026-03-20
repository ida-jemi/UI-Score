export default function LoadingScreen() {
  return (
    <div className="loading-wrapper">
      <div className="loading-card">
        <div className="spinner-ring">
          <div className="ring r1" />
          <div className="ring r2" />
          <div className="ring r3" />
          <div className="core">◈</div>
        </div>
        <h2 className="loading-title">Analyzing your UI</h2>
        <p className="loading-sub">Running design heuristics...</p>
        <div className="loading-steps">
          {["Detecting layout issues", "Checking spacing", "Scoring accessibility", "Generating suggestions"].map((step, i) => (
            <div key={i} className="step-item" style={{ animationDelay: `${i * 0.4}s` }}>
              <span className="step-dot" />
              <span className="step-label">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .loading-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeUp 0.5s ease both;
        }
        .loading-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 48px 40px;
          text-align: center;
          width: 100%;
          backdrop-filter: blur(12px);
          box-shadow: var(--shadow-card);
        }
        .spinner-ring {
          position: relative;
          width: 80px; height: 80px;
          margin: 0 auto 28px;
          display: flex; align-items: center; justify-content: center;
        }
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
        }
        .r1 {
          width: 80px; height: 80px;
          border-top-color: var(--accent-primary);
          animation: spin 1.2s linear infinite;
        }
        .r2 {
          width: 60px; height: 60px;
          border-right-color: var(--accent-secondary);
          animation: spin 0.9s linear infinite reverse;
        }
        .r3 {
          width: 40px; height: 40px;
          border-bottom-color: rgba(108,99,255,0.4);
          animation: spin 1.5s linear infinite;
        }
        .core {
          font-size: 16px;
          color: var(--accent-primary);
          filter: drop-shadow(0 0 6px var(--accent-primary));
          animation: pulse 2s ease infinite;
        }
        .loading-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .loading-sub {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 28px;
        }
        .loading-steps {
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          animation: stepReveal 0.5s ease forwards;
        }
        .step-dot {
          width: 6px; height: 6px;
          background: var(--accent-secondary);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-secondary);
          flex-shrink: 0;
        }
        .step-label {
          font-size: 13px;
          color: var(--text-secondary);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes stepReveal {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}