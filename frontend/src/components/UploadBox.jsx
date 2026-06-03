const UploadBox = ({ fileName, preview, onFileChange }) => {
  return (
    <label className="upload-box">
      <input
        className="file-input"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />

      <span className="upload-title">
        {fileName || "Choose an image"}
      </span>
      <span className="upload-meta">
        {preview ? "Ready for OCR" : "PNG, JPG, JPEG, or WEBP"}
      </span>
    </label>
  )
}

export default UploadBox
