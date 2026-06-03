const PreviewPanel = ({ preview }) => {
  return (
    <section className="preview" aria-label="Image preview">
      {preview ? (
        <img src={preview} alt="Selected document preview" className="preview-img" />
      ) : (
        <div className="empty-state">Image preview</div>
      )}
    </section>
  )
}

export default PreviewPanel
