export default function IssuesList({ issues }) {
  if (!issues?.length) return null;

  return (
    <div className="issues-card">
      <div className="section-header">
        <div className="section-icon warn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <h3 className="section-title">Issues Found</h3>
        <span className="section-badge warn">{issues.length}</span>
      </div>

      <div className="items-list">
        {issues.map((issue, i) => (
          <div key={i} className="issue-item" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="item-indicator warn" />
            <span className="item-text">{issue}</span>
          </div>
        ))}
      </div>

      <style>{`
        .issues-card {
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
        .section-icon.warn {
          background: rgba(255, 107, 107, 0.12);
          color: var(--accent-warn);
          border: 1px solid rgba(255,107,107,0.2);
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
        .section-badge.warn {
          background: rgba(255,107,107,0.12);
          color: var(--accent-warn);
          border: 1px solid rgba(255,107,107,0.2);
        }
        .items-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .issue-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: rgba(255,107,107,0.04);
          border: 1px solid rgba(255,107,107,0.1);
          border-radius: var(--radius-sm);
          opacity: 0;
          animation: slideIn 0.4s ease forwards;
        }
        .item-indicator {
          width: 4px; height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .item-indicator.warn {
          background: var(--accent-warn);
          box-shadow: 0 0 6px var(--accent-warn);
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