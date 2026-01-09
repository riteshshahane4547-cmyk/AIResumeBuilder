import React from 'react';

function ScoreCard({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Analysis Result</h2>
      <div className="prose max-w-none whitespace-pre-wrap text-sm text-gray-800">
        {analysis}
      </div>
    </div>
  );
}

export default ScoreCard;
