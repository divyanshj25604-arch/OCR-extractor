function Preview({ preview }) {
  if (!preview) return null;

  return (
    <div className="preview-box">
      <img src={preview} alt="preview" />
    </div>
  );
}

export default Preview;