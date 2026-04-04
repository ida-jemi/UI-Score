import { useState, useRef, useCallback } from "react";

const CATEGORIES = [
  { id: "dashboard", label: "Dashboard", icon: "⬛" },
  { id: "ecommerce", label: "E-commerce", icon: "🛍" },
  { id: "landing",   label: "Landing",    icon: "🚀" },
  { id: "mobile",    label: "Mobile",     icon: "📱" },
];

export default function UploadForm({ onAnalyze }) {
  const [file, setFile]         = useState(null);
  const [preview, setPreview]   = useState(null);
  const [dragging, setDragging] = useState(false);
  const [category, setCategory] = useState(null);
  const [shake, setShake]       = useState("");   // "file" | "cat" | ""
  const inputRef = useRef();

  const processFile = (f) => {
    if (!f || !["image/png", "image/jpeg"].includes(f.type)) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    processFile(e.dataTransfer.files[0]);
  }, []);

  // Button is ALWAYS clickable — shows which step is missing instead
  const handleSubmit = () => {
    if (!file) { triggerShake("file"); return; }
    if (!category) { triggerShake("cat"); return; }
    onAnalyze(preview, category);
  };

  const triggerShake = (which) => {
    setShake(which);
    setTimeout(() => setShake(""), 600);
  };

  return (
    <div className="upload-card">
      <div className="upload-card-header">
        <h1 className="upload-title">Analyze Your UI</h1>
        <p className="upload-subtitle">Drop a screenshot and get instant design feedback</p>
      </div>

      {/* ── Drop zone ── */}
      <div
        className={`drop-zone${dragging ? " dragging" : ""}${preview ? " has-preview" : ""}${shake === "file" ? " shake" : ""}`}
        onClick={() => inputRef.current.click()}
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          style={{ display: "none" }}
          onChange={(e) => processFile(e.target.files[0])}
        />

        {preview ? (
          <div className="preview-wrapper">
            <img src={preview} alt="Preview" className="preview-img" />
            <div className="preview-overlay"><span>Click to change</span></div>
          </div>
        ) : (
          <div className="drop-content">
            <div className={`drop-icon${shake === "file" ? " icon-warn" : ""}`}>
              {shake === "file" ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              )}
            </div>
            <p className="drop-title">{shake === "file" ? "Please upload a screenshot first!" : "Drop your screenshot here"}</p>
            <p className="drop-hint">PNG or JPG · Click to browse</p>
          </div>
        )}
      </div>

      {/* ── File name chip ── */}
      {file && (
        <div className="file-meta">
          <span className="file-icon">◉</span>
          <span className="file-name">{file.name}</span>
          <button
            className="file-remove"
            onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
          >✕</button>
        </div>
      )}

      {/* ── Category selector ── */}
      <div className={`category-section${shake === "cat" ? " shake" : ""}`}>
        <p className="category-label">
          {shake === "cat"
            ? <span style={{ color: "var(--accent-warn)" }}>⚠ Pick a category to continue</span>
            : <>UI Category {!category && <span className="category-hint">— pick one</span>}</>
          }
        </p>
        <div className="category-grid">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`cat-pill${category === c.id ? " active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-text">{c.label}</span>
              {category === c.id && <span className="cat-check">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ── Analyze button — ALWAYS enabled, validation inside handleSubmit ── */}
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "14px 24px",
          background: "linear-gradient(135deg, #6c63ff, #8b84ff)",
          border: "none",
          borderRadius: "16px",
          color: "#ffffff",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          fontWeight: "600",
          letterSpacing: "0.2px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          boxShadow: "0 4px 20px rgba(108,99,255,0.4)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(108,99,255,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(108,99,255,0.4)"; }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span style={{ color: "#ffffff", fontSize: "15px", fontWeight: "600" }}>Analyze UI</span>
      </button>

      <style>{`
        .upload-card {
          width: 100%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 36px;
          backdrop-filter: blur(12px);
          box-shadow: var(--shadow-card), var(--shadow-glow);
          animation: fadeUp 0.6s ease both;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .upload-card-header { text-align: center; }
        .upload-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .upload-subtitle { color: var(--text-secondary); font-size: 14px; font-weight: 300; }

        /* Drop zone */
        .drop-zone {
          border: 1.5px dashed var(--border-bright);
          border-radius: var(--radius-md);
          min-height: 180px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          overflow: hidden;
          position: relative;
          background: rgba(255,255,255,0.02);
        }
        .drop-zone:hover, .drop-zone.dragging {
          border-color: var(--accent-primary);
          background: rgba(108,99,255,0.05);
          box-shadow: 0 0 24px rgba(108,99,255,0.12);
        }
        .drop-zone.has-preview { min-height: 220px; }
        .drop-content {
          display: flex; flex-direction: column;
          align-items: center; gap: 10px; padding: 32px;
        }
        .drop-icon {
          width: 52px; height: 52px;
          background: rgba(108,99,255,0.1);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent-primary);
          margin-bottom: 4px;
          transition: all 0.2s;
        }
        .drop-icon.icon-warn {
          background: rgba(255,107,107,0.12);
          color: var(--accent-warn);
        }
        .drop-title { color: var(--text-primary); font-size: 15px; font-weight: 500; }
        .drop-hint  { color: var(--text-muted); font-size: 13px; }

        /* Preview */
        .preview-wrapper { width: 100%; position: relative; min-height: 220px; }
        .preview-img {
          width: 100%; height: 220px;
          object-fit: cover; display: block;
          border-radius: calc(var(--radius-md) - 2px);
        }
        .preview-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          border-radius: calc(var(--radius-md) - 2px);
          color: #fff; font-size: 14px;
          transition: opacity 0.2s;
        }
        .drop-zone:hover .preview-overlay { opacity: 1; }

        /* File chip */
        .file-meta {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          background: rgba(108,99,255,0.07);
          border: 1px solid rgba(108,99,255,0.18);
          border-radius: var(--radius-sm);
          font-size: 13px; color: var(--text-secondary);
        }
        .file-icon { color: var(--accent-primary); font-size: 11px; }
        .file-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .file-remove {
          background: none; border: none; cursor: pointer;
          color: var(--text-muted); font-size: 12px;
          padding: 2px 6px; border-radius: 4px;
          transition: color 0.2s;
        }
        .file-remove:hover { color: var(--accent-warn); }

        /* Category */
        .category-section { display: flex; flex-direction: column; gap: 10px; }
        .category-label { font-size: 13px; font-weight: 500; color: var(--text-secondary); }
        .category-hint  { color: var(--text-muted); font-weight: 300; font-size: 12px; }
        .category-grid  { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
        .cat-pill {
          position: relative;
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          padding: 14px 8px;
          background: rgba(255,255,255,0.03);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--text-secondary);
          font-family: var(--font-body);
        }
        .cat-pill:hover {
          border-color: var(--accent-primary);
          background: rgba(108,99,255,0.06);
          color: var(--text-primary);
          transform: translateY(-2px);
        }
        .cat-pill.active {
          border-color: var(--accent-primary);
          background: rgba(108,99,255,0.14);
          color: var(--accent-primary);
          box-shadow: 0 0 16px rgba(108,99,255,0.2);
        }
        .cat-icon  { font-size: 20px; line-height: 1; }
        .cat-text  { font-size: 11px; font-weight: 500; letter-spacing: 0.3px; }
        .cat-check {
          position: absolute; top: 6px; right: 8px;
          font-size: 10px; color: var(--accent-secondary); font-weight: 700;
        }

        /* Analyze button — always clickable */
        .analyze-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, var(--accent-primary), #8b84ff);
          border: none;
          border-radius: var(--radius-md);
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.2px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(108,99,255,0.4);
        }
        .analyze-btn:hover  { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(108,99,255,0.5); }
        .analyze-btn:active { transform: translateY(0); }

        /* Shake animation for missing input */
        .shake {
          animation: shake 0.5s ease;
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}