import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onToggleAI }) {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              {/* Logo Icon */}
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-xl text-gray-800">Resume<span className="text-blue-600">AI</span></span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-600 text-sm font-medium">
                Home
              </Link>
              <Link to="/builder" className="text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-600 text-sm font-medium">
                Builder
              </Link>
              <Link to="/analyzer" className="text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-600 text-sm font-medium">
                Analyzer
              </Link>
            </div>
          </div>
          <div className="flex items-center">
             <button 
               onClick={onToggleAI}
               className="mr-4 text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
               AI Assistant
             </button>
             <Link to="/builder" className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
               Get Started
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
