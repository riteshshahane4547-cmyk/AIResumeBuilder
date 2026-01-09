import React, { useState } from 'react';
import ResumeAnalyzerComponent from '../components/ResumeAnalyzer';
import ScoreCard from '../components/ScoreCard';
import { analyzeResume } from '../services/api';

function Analyzer() {
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (formData) => {
    setIsLoading(true);
    try {
      const result = await analyzeResume(formData);
      setAnalysisResult(result.analysis);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Resume Analyzer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ResumeAnalyzerComponent onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>
        <div>
          <ScoreCard analysis={analysisResult} />
        </div>
      </div>
    </div>
  );
}

export default Analyzer;
