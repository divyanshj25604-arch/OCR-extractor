import UploadBox from "./UploadBox"

const ActionBar = ({
  fileName,
  preview,
  loading,
  hasImage,
  onFileChange,
  onExtract,
  onClear,
}) => {
  return (
    <div className="action-bar">
      <UploadBox
        fileName={fileName}
        preview={preview}
        onFileChange={onFileChange}
      />

      <div className="action-buttons">
        <button className="secondary-btn" onClick={onClear} disabled={!hasImage && !preview}>
          Clear
        </button>
        <button className="primary-btn" onClick={onExtract} disabled={loading || !hasImage}>
          {loading ? "Processing..." : "Extract Text"}
        </button>
      </div>
    </div>
  )
}

export default ActionBar
