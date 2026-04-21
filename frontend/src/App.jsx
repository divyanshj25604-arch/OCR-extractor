import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <header>
        <h1>Extracto</h1>
      </header>
      <div className="action-bar">
        <div className="upload-section">
          <input
            type='file'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files[0]
              // console.log(file)
              setImage(file)
              setPreview(URL.createObjectURL(file))
            }}
          />


        </div>

        <button onClick={async () => {
          if (!image) {
            alert('Please select an image first')
            return
          }
          setLoading(true)
          const formData = new FormData()
          formData.append('file', image)
          let response = await fetch("http://127.0.0.1:8000/extract", {
            method: "POST",
            body: formData
          })

          const data = await response.json()
          setText(data.extracted_text)
          setLoading(false)
        }}>
          {loading ? 'Processing...' : 'Extract Text'}
        </button>
      </div>
      <div className="left">
        <div className="preview">
          {preview && <img src={preview} alt='preview' className='preview' />}
        </div>
      </div>
      <div className="right">
        <div className="extracted-text">
          <h2>Extracted Text:</h2>
          <pre>{text}</pre>
        </div>
      </div>
    </div>
  )
}

export default App
