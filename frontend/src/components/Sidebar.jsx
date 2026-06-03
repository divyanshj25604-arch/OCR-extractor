const Sidebar = ({ fileName, hasText, wordCount, onExtract, onClear, loading, hasImage }) => {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">E</div>
        <div>
          <h1>Extracto</h1>
          <p>OCR workspace</p>
        </div>
      </div>

      <nav className="side-nav" aria-label="Workspace">
        <button className="side-nav-item active" type="button">Scan</button>
        <button className="side-nav-item" type="button">History</button>
        <button className="side-nav-item" type="button">Exports</button>
      </nav>

      <div className="side-panel">
        <span className="side-label">Current File</span>
        <strong>{fileName || "No file selected"}</strong>
      </div>

      <div className="side-stats">
        <div>
          <span className="side-label">Words</span>
          <strong>{wordCount}</strong>
        </div>
        <div>
          <span className="side-label">Status</span>
          <strong>{hasText ? "Extracted" : "Ready"}</strong>
        </div>
      </div>

      <div className="sidebar-actions">
        <button className="primary-btn" onClick={onExtract} disabled={loading || !hasImage}>
          {loading ? "Processing..." : "Run OCR"}
        </button>
        <button className="secondary-btn" onClick={onClear} disabled={!hasImage && !hasText}>
          Reset
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
