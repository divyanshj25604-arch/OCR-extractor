import "./css/app.css"
import ActionBar from "./components/ActionBar"
import PreviewPanel from "./components/PreviewPanel"
import Sidebar from "./components/Sidebar"
import TextPanel from "./components/Textpanel"
import { useOCRWorkspace } from "./hooks/useOCRWorkspace"

const App = () => {
  const workspace = useOCRWorkspace()

  return (
    <div className="app-shell">
      <Sidebar
        fileName={workspace.image?.name}
        hasText={workspace.hasText}
        wordCount={workspace.wordCount}
        onExtract={workspace.runExtraction}
        onClear={workspace.clearWorkspace}
        loading={workspace.loading}
        hasImage={workspace.hasImage}
      />

      <main className="workspace">
        <header className="head">
          <div>
            <h1>Extracto</h1>
            <p>Upload an image, extract text, and export the result.</p>
          </div>
        </header>

        <ActionBar
          fileName={workspace.image?.name}
          preview={workspace.preview}
          loading={workspace.loading}
          hasImage={workspace.hasImage}
          onFileChange={workspace.selectFile}
          onExtract={workspace.runExtraction}
          onClear={workspace.clearWorkspace}
        />

        <div className="panel">
          <PreviewPanel preview={workspace.preview} />
          <TextPanel
            text={workspace.text}
            error={workspace.error}
            copied={workspace.copied}
            onCopy={workspace.copyText}
            onExport={workspace.exportText}
          />
        </div>
      </main>
    </div>
  )
}

export default App
