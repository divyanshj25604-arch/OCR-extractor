import { useEffect, useMemo, useState } from "react"
import jsPDF from "jspdf"
import { useOCR } from "./useOCR"

export function useOCRWorkspace() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [copied, setCopied] = useState(false)
  const { text, loading, error, extract, clearText } = useOCR()

  const wordCount = useMemo(() => {
    return text.trim() ? text.trim().split(/\s+/).length : 0
  }, [text])

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const selectFile = (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    if (preview) {
      URL.revokeObjectURL(preview)
    }

    setImage(file)
    setPreview(URL.createObjectURL(file))
    setCopied(false)
    clearText()
  }

  const clearWorkspace = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }

    setImage(null)
    setPreview(null)
    setCopied(false)
    clearText()
  }

  const runExtraction = () => extract(image)

  const copyText = async () => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      console.error("Copy failed", e)
    }
  }

  const exportText = () => {
    if (!text) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 10
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2)

    doc.text(lines, margin, 10)
    doc.save("extracted-text.pdf")
  }

  return {
    image,
    preview,
    text,
    error,
    copied,
    loading,
    wordCount,
    hasImage: Boolean(image),
    hasText: Boolean(text),
    selectFile,
    clearWorkspace,
    runExtraction,
    copyText,
    exportText,
  }
}
