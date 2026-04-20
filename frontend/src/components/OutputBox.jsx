function OutputBox({ text }) {
  return (
    <div className="output-box">
      <h4>Extracted Text</h4>
      <pre>{text || "No text yet"}</pre>
    </div>
  );
}

export default OutputBox;