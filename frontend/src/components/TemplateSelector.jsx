import React from 'react';

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional & Professional',
    color: 'bg-white border-gray-200',
    tags: ['Recommended', 'ATS Friendly']
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean & Bold',
    color: 'bg-white border-blue-200',
    tags: ['Popular']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate & Sleek',
    color: 'bg-teal-50 border-teal-200',
    tags: ['Recommended']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique & Standout',
    color: 'bg-pink-50 border-pink-200',
    tags: ['Design']
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Bold Header & Serious',
    color: 'bg-slate-800 text-white border-slate-700',
    tags: ['Senior']
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple & Effective',
    color: 'bg-gray-50 border-gray-200',
    tags: ['Entry Level']
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Modern & Skill Focused',
    color: 'bg-gray-900 text-white',
    tags: ['Developer']
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated & Classy',
    color: 'bg-amber-50 border-amber-200',
    tags: ['Executive']
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Dense & One-Page',
    color: 'bg-white border-gray-300',
    tags: ['Efficient']
  }
];

const colors = [
  { name: 'Blue', value: '#2563eb', class: 'bg-blue-600' },
  { name: 'Teal', value: '#0f766e', class: 'bg-teal-700' },
  { name: 'Pink', value: '#db2777', class: 'bg-pink-600' },
  { name: 'Purple', value: '#7c3aed', class: 'bg-purple-600' },
  { name: 'Slate', value: '#1e293b', class: 'bg-slate-800' },
  { name: 'Red', value: '#dc2626', class: 'bg-red-600' },
  { name: 'Green', value: '#16a34a', class: 'bg-green-600' },
  { name: 'Black', value: '#000000', class: 'bg-black' },
];

function TemplateSelector({ selectedTemplate, onSelect, selectedColor, onColorSelect }) {
  return (
    <div className="mt-8 space-y-6">
      
      {/* Filters (Visual Only) */}
      <div className="flex flex-wrap gap-3 items-center border-b pb-4">
         <span className="font-semibold text-gray-700">Filter by:</span>
         <select className="border rounded px-2 py-1 text-sm bg-white"><option>All Categories</option><option>Professional</option><option>Creative</option></select>
         <select className="border rounded px-2 py-1 text-sm bg-white"><option>Colors</option></select>
         <div className="flex-1"></div>
         <span className="text-sm text-gray-500">{templates.length} templates</span>
      </div>

      {/* Color Picker */}
      <div className="bg-gray-50 p-4 rounded-lg border">
         <h4 className="text-sm font-bold text-gray-700 mb-2">Accent Color</h4>
         <div className="flex flex-wrap gap-2">
           {colors.map((c) => (
             <button
               key={c.name}
               onClick={() => onColorSelect(c.value)}
               className={`w-8 h-8 rounded-full ${c.class} transition-transform hover:scale-110 ${selectedColor === c.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}`}
               title={c.name}
             />
           ))}
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <div 
            key={t.id}
            className={`group relative border-2 rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer ${selectedTemplate === t.id ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-blue-300'}`}
            onClick={() => onSelect(t.id)}
          >
            {/* Template Preview Area */}
            <div className={`h-48 p-4 ${t.color === 'bg-slate-800 text-white border-slate-700' ? 'bg-slate-800' : 'bg-white'} relative`}>
               {/* Badge */}
               {t.tags.includes('Recommended') && (
                 <span className="absolute top-2 right-2 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full z-10">
                   Recommended
                 </span>
               )}

               {/* Mock Resume UI */}
               <div className={`w-full h-full shadow-sm border rounded flex flex-col p-2 overflow-hidden bg-white opacity-90 transition-opacity group-hover:opacity-100`}>
                  {/* Header */}
                  <div className={`w-full h-8 mb-2 rounded flex items-center px-2 ${t.id === 'executive' ? 'bg-slate-800' : ''}`}>
                     <div className={`h-2 w-1/3 rounded ${t.id === 'executive' ? 'bg-gray-400' : 'bg-gray-800'}`} style={{ backgroundColor: t.id !== 'executive' ? selectedColor : undefined }}></div>
                  </div>
                  {/* Body */}
                  <div className="space-y-2">
                     <div className="w-full h-1 bg-gray-200 rounded"></div>
                     <div className="w-5/6 h-1 bg-gray-200 rounded"></div>
                     <div className="w-full h-1 bg-gray-200 rounded mt-2"></div>
                     <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="h-10 bg-gray-100 rounded col-span-1"></div>
                        <div className="h-10 bg-gray-50 rounded col-span-2 space-y-1 p-1">
                           <div className="w-full h-1 bg-gray-200 rounded"></div>
                           <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer / Details */}
            <div className="p-4 bg-white border-t">
              <div className="flex justify-between items-start">
                 <div>
                   <h3 className="font-bold text-gray-800">{t.name}</h3>
                   <p className="text-xs text-gray-500">{t.description}</p>
                 </div>
                 {/* Selection Indicator */}
                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedTemplate === t.id ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                    {selectedTemplate === t.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                 </div>
              </div>
              
              {/* Hover Button */}
              <button className="mt-3 w-full bg-blue-600 text-white text-sm py-2 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                 Choose Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;
