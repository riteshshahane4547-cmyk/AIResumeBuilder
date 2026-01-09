import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Build Your <span className="text-blue-600">Dream Resume</span> <br/> with AI Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Create professional, ATS-friendly resumes in minutes using our advanced AI builder. 
          Choose from beautiful templates and get instant feedback.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/builder" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Build Resume Now
          </Link>
          <Link to="/analyzer" className="bg-white text-blue-600 border-2 border-blue-100 px-8 py-4 rounded-lg font-bold text-lg hover:border-blue-300 hover:bg-blue-50 transition">
            Analyze Existing Resume
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 font-bold text-xl">1</div>
            <h3 className="text-xl font-bold mb-2">AI Generation</h3>
            <p className="text-gray-600">Instantly generate professional content tailored to your job role.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600 font-bold text-xl">2</div>
            <h3 className="text-xl font-bold mb-2">Smart Templates</h3>
            <p className="text-gray-600">Choose from modern, classic, and creative designs that stand out.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600 font-bold text-xl">3</div>
             <h3 className="text-xl font-bold mb-2">ATS Analysis</h3>
             <p className="text-gray-600">Get a score and improvement tips to beat the Applicant Tracking Systems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
