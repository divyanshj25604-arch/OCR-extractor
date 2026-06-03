import { useState } from "react"
import { extractText } from "../utils/api"

export function useOCR() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const extract = async (image) => {
    if (!image) {
      setError("Please select an image first")
      return
    }

    try {
      setLoading(true)
      setError("")

      const data = await extractText(image)

      if (data.extracted_text) {
        setText(data.extracted_text)
      } else {
        setText("")
        setError(data.error || "No text was found in this image")
      }
    } catch (err) {
      console.error(err)
      setText("")
      setError("Something went wrong while extracting text")
    } finally {
      setLoading(false)
    }
  }

  const clearText = () => {
    setText("")
    setError("")
  }

  return {
    text,
    loading,
    error,
    extract,
    clearText,
  }
}
