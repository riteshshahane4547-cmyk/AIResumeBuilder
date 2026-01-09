import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
