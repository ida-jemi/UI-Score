import { useState, useRef, useCallback } from "react";

export default function UploadForm({ onAnalyze }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const processFile = (f) => {
    if (!f || !["image/png", "image/jpeg"].includes(f.type)) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const handleSubmit = () => { if (preview) onAnalyze(preview); };

  return (
    <div className="upload-card">
      <div className="upload-card-header">
        <h1 className="upload-title">Analyze Your UI</h1>
        <p className="upload-subtitle">Drop a screenshot and get instant design feedback</p>
      </div>

      <div
        className={`drop-zone${dragging ? " dragging" : ""}${preview ? " has-preview" : ""}`}
        onClick={() => inputRef.current.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
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
            <div className="drop-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p className="drop-title">Drop your screenshot here</p>
            <p className="drop-hint">PNG or JPG · Click to browse</p>
          </div>
        )}
      </div>

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

      {/* ── THE FIX: inline styles guarantee text is always visible ── */}
      <button
        onClick={handleSubmit}
        disabled={!file}
        style={{
          width: "100%",
          padding: "14px 24px",
          background: file
            ? "linear-gradient(135deg, var(--accent-primary), #8b84ff)"
            : "rgba(108,99,255,0.15)",
          border: "none",
          borderRadius: "var(--radius-md)",
          color: file ? "#ffffff" : "var(--text-muted)",
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          fontWeight: "600",
          letterSpacing: "0.2px",
          cursor: file ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          transition: "all 0.25s ease",
          boxShadow: file ? "0 4px 20px rgba(108,99,255,0.4)" : "none",
          transform: "translateY(0)",
        }}
        onMouseEnter={(e) => { if (file) e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        Analyze UI
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
        .upload-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 300;
        }
        .drop-zone {
          border: 1.5px dashed var(--border-bright);
          border-radius: var(--radius-md);
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          overflow: hidden;
          position: relative;
          background: rgba(255,255,255,0.02);
        }
        .drop-zone:hover, .drop-zone.dragging {
          border-color: var(--accent-primary);
          background: rgba(108, 99, 255, 0.05);
          box-shadow: 0 0 24px rgba(108,99,255,0.12);
        }
        .drop-zone.has-preview { min-height: 220px; }
        .drop-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 32px;
        }
        .drop-icon {
          width: 52px; height: 52px;
          background: rgba(108,99,255,0.1);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent-primary);
          margin-bottom: 4px;
        }
        .drop-title {
          color: var(--text-primary);
          font-size: 15px;
          font-weight: 500;
        }
        .drop-hint {
          color: var(--text-muted);
          font-size: 13px;
        }
        .preview-wrapper {
          width: 100%; position: relative; min-height: 220px;
        }
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
        .file-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(108,99,255,0.07);
          border: 1px solid rgba(108,99,255,0.18);
          border-radius: var(--radius-sm);
          font-size: 13px;
          color: var(--text-secondary);
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}