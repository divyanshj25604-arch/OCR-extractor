/**
 * Main Application Component
 * Orchestrates the OCR extraction workflow
 * Manages state and coordinates between child components
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import SuccessAlert from './components/SuccessAlert';
import Footer from './components/Footer';
import { extractTextFromImage, checkApiHealth } from './utils/api.js';
import { LOADING_MESSAGES, SUCCESS_MESSAGES } from './utils/constants.js';
import './App.css';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [apiHealthy, setApiHealthy] = useState(true);

  /**
   * Checks API health on component mount
   */
  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkApiHealth();
      setApiHealthy(isHealthy);
    };

    checkHealth();
  }, []);

  /**
   * Handles file selection from uploader component
   * @param {File|null} file - Selected file or null if invalid
   * @param {string|null} error - Error message if validation failed
   */
  const handleFileSelect = (file, error) => {
    if (error) {
      setErrorMessage(error);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setErrorMessage('');
  };

  /**
   * Handles text extraction process
   * Calls API and manages loading state
   */
  const handleExtractText = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a file first');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const result = await extractTextFromImage(selectedFile);

    setIsLoading(false);

    if (result.success) {
      setExtractedText(result.data);
      setSuccessMessage(SUCCESS_MESSAGES.TEXT_EXTRACTED);
    } else {
      setErrorMessage(result.error);
      setExtractedText('');
    }
  };

  /**
   * Dismisses error message
   */
  const handleDismissError = () => {
    setErrorMessage('');
  };

  /**
   * Dismisses success message
   */
  const handleDismissSuccess = () => {
    setSuccessMessage('');
  };

  /**
   * Resets form to initial state
   */
  const handleReset = () => {
    setSelectedFile(null);
    setExtractedText('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="app">
      <Header />

      <main className="app__main" role="main">
        <div className="app__container">
          {!apiHealthy && (
            <ErrorAlert
              message="Backend server is not responding. Please make sure the API is running."
              onDismiss={handleDismissError}
            />
          )}

          <ErrorAlert
            message={errorMessage}
            onDismiss={handleDismissError}
          />

          <SuccessAlert
            message={successMessage}
            onDismiss={handleDismissSuccess}
          />

          <ImageUploader
            onUpload={handleFileSelect}
            isLoading={isLoading}
          />

          {selectedFile && !extractedText && !isLoading && (
            <button
              className="app__extract-button"
              onClick={handleExtractText}
              disabled={isLoading}
              type="button"
              aria-label="Extract text from selected image"
            >
              Extract Text
            </button>
          )}

          {isLoading && (
            <LoadingSpinner message={LOADING_MESSAGES.EXTRACTING} />
          )}

          {extractedText && (
            <>
              <ResultDisplay text={extractedText} />
              <button
                className="app__reset-button"
                onClick={handleReset}
                type="button"
                aria-label="Reset and start over"
              >
                Extract Another Image
              </button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
