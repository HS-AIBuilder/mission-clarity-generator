import React, { useState } from 'react';
import { Form } from './components/Form';
import { ResultDisplay } from './components/ResultDisplay';
import { generateMissionClarity } from './utils/generateMissionClarity';
import './App.css';

// Types for our form data and result
interface FormData {
  missionFocus: string;
  audience: string;
  vision: string;
  values: string;
}

interface Result {
  mission: string;
  tagline: string;
}

function App() {
  // State management
  const [formData, setFormData] = useState<FormData>({
    missionFocus: '',
    audience: '',
    vision: '',
    values: ''
  });
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => !value.trim())
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError(`Please fill in all fields: ${emptyFields.join(', ')}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const generatedResult = await generateMissionClarity(formData);
      setResult(generatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      missionFocus: '',
      audience: '',
      vision: '',
      values: ''
    });
    setResult(null);
    setError(null);
  };

  // Handle copying result to clipboard
  const handleCopy = async () => {
    if (!result) return;

    try {
      const text = `Mission: ${result.mission}\nTagline: ${result.tagline}`;
      await navigator.clipboard.writeText(text);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <div className="app">
      <div className="demo-banner">
        🚀 <strong>DEMO VERSION</strong> - This app generates sample mission statements for demonstration purposes
      </div>
      <header className="app-header">
        <h1>Mission Clarity Generator</h1>
      </header>
      
      <main className="app-main">
        {/* Form Component */}
        <Form
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {/* Result Display Component */}
        {(result || loading || error) && (
          <ResultDisplay
            result={result}
            loading={loading}
            error={error}
            onCopy={handleCopy}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App; 