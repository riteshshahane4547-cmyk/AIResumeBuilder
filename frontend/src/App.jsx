import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Analyzer from './pages/Analyzer';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/analyzer" element={<Analyzer />} />
        </Routes>
      </div>
      <footer className="bg-white border-t mt-12 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 AI Resume Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
