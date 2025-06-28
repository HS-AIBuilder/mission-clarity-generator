import React from 'react';
import './ResultDisplay.css';

interface Result {
  mission: string;
  tagline: string;
}

interface ResultDisplayProps {
  result: Result | null;
  loading: boolean;
  error: string | null;
  onCopy: () => void;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  loading,
  error,
  onCopy,
  onReset
}) => {
  if (loading) {
    return (
      <div className="result result--loading">
        <div className="spinner" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result result--error" role="alert">
        <p className="error-message">{error}</p>
        <button 
          onClick={onReset}
          className="button button--secondary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="result">
      <div className="result-content">
        <div className="result-section">
          <h2>Mission Statement</h2>
          <p>{result.mission}</p>
        </div>

        <div className="result-section">
          <h2>Tagline</h2>
          <p>{result.tagline}</p>
        </div>
      </div>

      <div className="result-actions">
        <button 
          onClick={onCopy}
          className="button button--primary"
        >
          Copy
        </button>
        <button 
          onClick={onReset}
          className="button button--secondary"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}; 