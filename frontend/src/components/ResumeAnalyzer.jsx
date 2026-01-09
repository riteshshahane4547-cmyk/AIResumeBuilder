import React, { useState } from 'react';

function ResumeAnalyzer({ onAnalyze, isLoading }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);
    
    onAnalyze(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Resume (PDF/Text)</label>
        <input 
          type="file" 
          accept=".pdf,.txt,.doc,.docx" 
          onChange={(e) => setFile(e.target.files[0])} 
          required 
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Job Description (Optional)</label>
        <textarea 
          value={jobDescription} 
          onChange={(e) => setJobDescription(e.target.value)} 
          rows="4" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          placeholder="Paste job description here to check compatibility..."
        ></textarea>
      </div>
      <button type="submit" disabled={isLoading || !file} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
    </form>
  );
}

export default ResumeAnalyzer;
