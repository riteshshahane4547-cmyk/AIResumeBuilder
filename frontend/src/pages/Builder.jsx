import React, { useState } from 'react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import { generateResume, downloadResume } from '../services/api';

function Builder() {
  const [resumeContent, setResumeContent] = useState('');
  const [template, setTemplate] = useState('classic');
  const [selectedColor, setSelectedColor] = useState('#2563eb'); // Default Blue
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' or 'design'

  const handleGenerate = async (data) => {
    setIsLoading(true);
    setActiveTab('preview'); // Switch to preview on generate
    try {
      const result = await generateResume(data);
      setResumeContent(result.content);
    } catch (error) {
      console.error("Error generating resume:", error);
      alert("Failed to generate resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (resumeContent) {
      downloadResume(resumeContent, template, selectedColor);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Resume Builder</h1>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-blue-600">Step 1:</span> Enter Details &rarr; <span className="font-medium text-blue-600">Step 2:</span> Generate &rarr; <span className="font-medium text-blue-600">Step 3:</span> Customize & Download
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center justify-between border-b pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800">Your Details</h2>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">Auto-Save Enabled</span>
             </div>
             <ResumeForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
        </div>

        {/* Right Column: Preview & Design Tabs */}
        <div className="lg:col-span-7 sticky top-24 h-[calc(100vh-8rem)] flex flex-col">
           {/* Tabs */}
           <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200 mb-4 inline-flex w-full">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`flex-1 py-2.5 px-4 rounded-md text-sm font-semibold transition-all ${activeTab === 'preview' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  Live Preview
                </span>
              </button>
              <button 
                onClick={() => setActiveTab('design')}
                className={`flex-1 py-2.5 px-4 rounded-md text-sm font-semibold transition-all ${activeTab === 'design' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                  Templates & Design
                </span>
              </button>
           </div>

           {/* Content Area - Scrollable */}
           <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {activeTab === 'preview' ? (
                <ResumePreview 
                  content={resumeContent} 
                  onChange={setResumeContent} 
                  onDownload={handleDownload} 
                  template={template}
                  color={selectedColor}
                />
              ) : (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-full">
                   <h2 className="text-xl font-bold mb-2 text-gray-800">Select Template</h2>
                   <p className="text-gray-500 mb-6 text-sm">Choose a design that fits your industry and personality.</p>
                   <TemplateSelector 
                     selectedTemplate={template} 
                     onSelect={setTemplate} 
                     selectedColor={selectedColor}
                     onColorSelect={setSelectedColor}
                   />
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}

export default Builder;
