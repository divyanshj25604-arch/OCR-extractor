import React, { useState } from "react"
import "./css/app.css"
import copyIcon from "./assets/copy-document.png"
import jsPDF from "jspdf"

const App = () => {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      console.error("Copy failed", e)
    }
  }

  const handleExport = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 10

    const lines = doc.splitTextToSize(text, pageWidth - margin * 2)

    doc.text(lines, margin, 10)
    doc.save("extracted-text.pdf")
  }

  const handleExtract = async () => {
    if (!image) {
      alert("Please select an image first")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("file", image)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/extract`,
        {
          method: "POST",
          body: formData
        }
      )

      const data = await response.json()
      console.log("API:", data)

      if (data.extracted_text) {
        setText(data.extracted_text)
      } else {
        setText("Error: " + (data.error || "Unknown error"))
      }

    } catch (err) {
      console.error(err)
      setText("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <header className="head">
        <h1>Extracto</h1>
      </header>

      <div className="action-bar">
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0]
              setImage(file)
              setPreview(URL.createObjectURL(file))
            }}
          />
        </div>

        <button onClick={handleExtract}>
          {loading ? "Processing..." : "Extract Text"}
        </button>
      </div>

      <div className="panel">
        <div className="preview">
          {preview && (
            <img src={preview} alt="preview" className="preview-image" />
          )}
        </div>

        <div className="extracted-text">
          <h2>Extracted Text:</h2>
          <pre>{text}</pre>

          <div className="text-actions">
            <button
              className="copy-btn"
              onClick={handleCopy}
              disabled={!text}
            >
              <img src={copyIcon} alt="copy" className="copy-icon" />
              {copied ? "Copied!" : "Copy"}
            </button>

            <button className="export" onClick={handleExport}>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App