# Extracto OCR App

Extracto is a full-stack OCR workspace for uploading document images, extracting text, copying the result, and exporting it as a PDF. The project is split into a React/Vite frontend and a FastAPI backend powered by Tesseract OCR.

## Features

- Image upload with live preview
- OCR text extraction through a FastAPI endpoint
- Copy extracted text to clipboard
- Export extracted text as a PDF
- Responsive app shell with sidebar navigation
- Clean light theme with white panels, soft gray backgrounds, and blue primary actions
- Frontend cache-busting dev setup for reliable local development

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- jsPDF

### Backend

- FastAPI
- Uvicorn
- Pillow
- pytesseract
- Tesseract OCR

## Project Structure

```text
ocr-app/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── venv/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── css/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

Install these before running the project:

- Node.js and npm
- Python 3
- Tesseract OCR

On macOS, Tesseract can be installed with:

```bash
brew install tesseract
```

## Run the Backend

From the backend folder:

```bash
cd /Users/djha/Desktop/ocr-app/backend
./venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
```

Health check:

```text
http://127.0.0.1:8000/health
```

Expected response:

```json
{"status":"healthy"}
```

## Run the Frontend

From the frontend folder:

```bash
cd /Users/djha/Desktop/ocr-app/frontend
npm install
npm run dev
```

Vite will show the local app URL in the terminal. The frontend expects the backend to be running at:

```text
http://127.0.0.1:8000
```

## Environment Configuration

The frontend API base URL can be customized with:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

If this value is not set, the app defaults to `http://127.0.0.1:8000`.

## API Endpoints

### `GET /`

Returns a welcome message.

### `GET /health`

Returns backend health status.

### `POST /extract`

Accepts an uploaded image and returns extracted text.

Request:

```text
multipart/form-data
file: image file
```

Response:

```json
{
  "extracted_text": "Recognized text from the image"
}
```

### `GET /debug`

Returns the installed Tesseract version.

## Development Commands

Frontend:

```bash
npm run dev
npm run build
npm run lint
```

Backend:

```bash
./venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
```

## Troubleshooting

### Frontend Shows Old Code

The frontend dev script uses Vite with forced dependency optimization:

```bash
npm run dev
```

If Chrome still shows old files, try:

- Hard refresh: `Cmd + Shift + R`
- Open DevTools, right-click refresh, choose `Empty Cache and Hard Reload`
- Stop old Vite servers running on other ports

### Backend Does Not Start

Check that port `8000` is free and that dependencies are installed in the backend virtual environment.

### OCR Returns Empty Text

Make sure:

- The image is readable and not too blurry
- Tesseract is installed
- The backend `/debug` endpoint returns a valid Tesseract version

## Planned Future Updates

- OCR history view for recently processed documents
- Multiple file upload and batch extraction
- Editable extracted text before export
- Export options for `.txt`, `.docx`, and searchable PDF
- Drag-and-drop upload support
- Better image preprocessing for low-quality scans
- Language selection for multilingual OCR
- Authentication and saved document workspaces
- Cloud deployment for both frontend and backend
- Automated tests for frontend components and backend endpoints

## Current Status

The app currently supports the core OCR workflow:

1. Upload an image.
2. Preview the image.
3. Extract text using the backend.
4. Copy or export the extracted result.

The frontend and backend are developed as separate services, which makes the project easier to maintain and deploy independently.

## License

This project is currently private/internal. Add a license before public distribution.
