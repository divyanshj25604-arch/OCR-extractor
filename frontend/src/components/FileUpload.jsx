function FileUpload({ onFileSelect, onUpload, loading }) {
  return (
    <>
      <input type="file" accept="image/*" onChange={onFileSelect} />
      <button onClick={onUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload"}
      </button>
    </>
  );
}

export default FileUpload;