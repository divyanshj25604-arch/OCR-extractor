import copyIcon from "../assets/copy-document.png"

const TextPanel = ({ text, error, copied, onCopy, onExport }) => {
  const hasText = Boolean(text)

  return (
    <section className="extracted-text">
      <div className="text-header">
        <h2>Extracted Text</h2>
        <span>{hasText ? `${text.length} characters` : "Waiting"}</span>
      </div>

      {error ? (
        <p className="error-text">{error}</p>
      ) : (
        <pre>{hasText ? text : "Your extracted text will appear here."}</pre>
      )}

      <div className="text-actions">
        <button className="copy-btn" onClick={onCopy} disabled={!hasText}>
          <img src={copyIcon} alt="" className="copy-icon" />
          {copied ? "Copied!" : "Copy"}
        </button>

        <button className="export" onClick={onExport} disabled={!hasText}>
          Export
        </button>
      </div>
    </section>
  )
}

export default TextPanel
