export default function Suggestions({ suggestions }) {
  if (!suggestions?.length) return null;

  return (
    <div className="suggestions-card">
      <div className="section-header">
        <div className="section-icon success">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3 className="section-title">Suggestions</h3>
        <span className="section-badge success">{suggestions.length}</span>
      </div>

      <div className="items-list">
        {suggestions.map((s, i) => (
          <div key={i} className="suggestion-item" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="item-number">{String(i + 1).padStart(2, "0")}</div>
            <span className="item-text">{s}</span>
          </div>
        ))}
      </div>

      <style>{`
        .suggestions-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px;
          backdrop-filter: blur(8px);
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .section-icon {
          width: 28px; height: 28px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .section-icon.success {
          background: rgba(0,212,170,0.1);
          color: var(--accent-secondary);
          border: 1px solid rgba(0,212,170,0.2);
        }
        .section-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          flex: 1;
        }
        .section-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 20px;
        }
        .section-badge.success {
          background: rgba(0,212,170,0.1);
          color: var(--accent-secondary);
          border: 1px solid rgba(0,212,170,0.2);
        }
        .items-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: rgba(0,212,170,0.03);
          border: 1px solid rgba(0,212,170,0.1);
          border-radius: var(--radius-sm);
          opacity: 0;
          animation: slideIn 0.4s ease forwards;
          transition: background 0.2s;
        }
        .suggestion-item:hover {
          background: rgba(0,212,170,0.07);
        }
        .item-number {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-secondary);
          opacity: 0.7;
          flex-shrink: 0;
          letter-spacing: 0.5px;
        }
        .item-text {
          font-size: 13.5px;
          color: var(--text-secondary);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}