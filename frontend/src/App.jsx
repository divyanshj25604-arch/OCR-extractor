import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Preview from "./components/Preview";
import OutputBox from "./components/OutputBox";
import { extractText } from "./services/api";
import "./styles/App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setText("");

    try {
      const data = await extractText(file);

      if (!data.extracted_text?.trim()) {
        setText("No readable text detected");
      } else {
        setText(data.extracted_text);
      }
    } catch (err) {
      console.error(err);
      setText("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">OCR App</h2>

      <div className="upload-box">
        <FileUpload
          onFileSelect={handleFileSelect}
          onUpload={handleUpload}
          loading={loading}
        />
      </div>

      <div className="row">
        <Preview preview={preview} />
        <OutputBox text={text} />
      </div>
    </div>
  );
}

export default App;