import React, { useMemo } from 'react';

// --- Template Components ---

const ClassicTemplate = ({ data, color }) => (
  <div className="font-serif p-8 bg-white h-full text-gray-900">
    <div className="border-b-2 pb-4 mb-6" style={{ borderColor: color }}>
      <h1 className="text-3xl font-bold uppercase tracking-wide text-center mb-2">{data.personalInfo?.fullName}</h1>
      <div className="text-center text-sm text-gray-600 space-x-3">
        {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo?.phone && <span>| {data.personalInfo.phone}</span>}
        {data.personalInfo?.linkedin && <span>| {data.personalInfo.linkedin}</span>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ color: color, borderColor: '#e5e7eb' }}>Professional Summary</h3>
        <p className="text-sm leading-relaxed">{data.summary}</p>
      </div>
    )}

    {data.skills && data.skills.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ color: color, borderColor: '#e5e7eb' }}>Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">{skill}</span>
          ))}
        </div>
      </div>
    )}

    {data.experience && data.experience.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ color: color, borderColor: '#e5e7eb' }}>Experience</h3>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-md">{exp.role}</h4>
                <span className="text-sm text-gray-500 italic">{exp.duration}</span>
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-1">{exp.company}</div>
              <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.education && data.education.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ color: color, borderColor: '#e5e7eb' }}>Education</h3>
        <div className="space-y-3">
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-md">{edu.degree}</h4>
                <span className="text-sm text-gray-500 italic">{edu.year}</span>
              </div>
              <div className="text-sm text-gray-700">{edu.school}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const ModernTemplate = ({ data, color }) => (
  <div className="font-sans flex h-full bg-white">
    {/* Sidebar */}
    <div className="w-1/3 text-white p-6 flex flex-col" style={{ backgroundColor: color }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-tight mb-2">{data.personalInfo?.fullName}</h1>
        <p className="text-blue-100 font-medium">{data.personalInfo?.role}</p>
      </div>

      <div className="mb-8 text-sm space-y-2 opacity-90">
        {data.personalInfo?.email && <div className="flex items-center gap-2"><span>✉</span> {data.personalInfo.email}</div>}
        {data.personalInfo?.phone && <div className="flex items-center gap-2"><span>📞</span> {data.personalInfo.phone}</div>}
        {data.personalInfo?.linkedin && <div className="flex items-center gap-2"><span>🔗</span> {data.personalInfo.linkedin}</div>}
      </div>

      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-4 opacity-80 border-b border-white/20 pb-1">Skills</h3>
          <ul className="space-y-2 text-sm">
            {data.skills.map((skill, index) => (
              <li key={index}>• {skill}</li>
            ))}
          </ul>
        </div>
      )}
      
      {data.education && data.education.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-4 opacity-80 border-b border-white/20 pb-1">Education</h3>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="font-bold text-sm">{edu.degree}</div>
                <div className="text-xs opacity-90">{edu.school}</div>
                <div className="text-xs opacity-75 mt-1">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Main Content */}
    <div className="w-2/3 p-8 text-gray-800">
      {data.summary && (
        <div className="mb-8">
          <h3 className="text-lg font-bold uppercase tracking-wide mb-3 text-gray-400">Profile</h3>
          <p className="text-sm leading-relaxed text-gray-600">{data.summary}</p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wide mb-6 text-gray-400">Experience</h3>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-4 border-l-2 border-gray-100">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                <h4 className="font-bold text-lg text-gray-800">{exp.role}</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold" style={{ color: color }}>{exp.company}</span>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">{exp.duration}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const MinimalistTemplate = ({ data, color }) => (
  <div className="font-sans p-8 bg-white h-full text-gray-800 max-w-[21cm] mx-auto">
    <header className="border-b-2 pb-6 mb-8" style={{ borderColor: color }}>
      <h1 className="text-4xl font-light mb-2 tracking-tight">{data.personalInfo?.fullName}</h1>
      <p className="text-xl text-gray-500 mb-4 font-light">{data.personalInfo?.role}</p>
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo?.linkedin && <span>{data.personalInfo.linkedin}</span>}
      </div>
    </header>

    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8">
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400">Profile</h2>
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400">Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-bold text-gray-800">{exp.role}</h3>
                    <span className="text-sm text-gray-500">{exp.duration}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2 font-medium">{exp.company}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="col-span-4 space-y-8">
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400">Skills</h2>
            <div className="flex flex-col gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="text-sm text-gray-600 border-b border-gray-100 pb-1">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="font-bold text-sm text-gray-800">{edu.degree}</div>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                  <div className="text-xs text-gray-400 mt-1">{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
);


function ResumePreview({ content, onDownload, onChange, template, color }) {
  const data = useMemo(() => {
    if (!content) return null;
    if (typeof content === 'object') return content;
    try {
      return JSON.parse(content);
    } catch (e) {
      return null; // Failed to parse JSON, treat as raw text or null
    }
  }, [content]);

  const isRawText = content && !data;

  const renderTemplate = () => {
    if (!data) return null;
    switch (template) {
      case 'modern': return <ModernTemplate data={data} color={color} />;
      case 'minimalist': return <MinimalistTemplate data={data} color={color} />;
      case 'classic': 
      default: return <ClassicTemplate data={data} color={color} />;
    }
  };

  return (
    <div className="bg-white p-0 rounded-lg shadow-lg mt-6 h-full flex flex-col min-h-[800px] border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Live Preview</h2>
        {content && (
          <div className="flex items-center gap-3">
             <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {isRawText ? 'Raw Text Mode' : 'Template Active'}
            </span>
            <button 
              onClick={onDownload} 
              className="bg-blue-600 text-white py-1.5 px-4 rounded-md text-sm hover:bg-blue-700 transition shadow-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download PDF
            </button>
          </div>
        )}
      </div>

      <div className="flex-grow bg-gray-100 p-8 overflow-y-auto custom-scrollbar flex justify-center">
        {!content ? (
          <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full border-2 border-dashed border-gray-300 rounded-lg bg-white/50 p-12">
            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p className="text-lg font-medium text-gray-500">Your resume will appear here</p>
            <p className="text-sm mt-2 text-gray-400">Fill in your details and click "Generate Resume"</p>
          </div>
        ) : isRawText ? (
           <textarea 
            className="w-full h-full p-8 bg-white shadow-sm rounded text-gray-800 font-mono text-sm resize-none focus:outline-none"
            value={content}
            onChange={(e) => onChange(e.target.value)}
          ></textarea>
        ) : (
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl origin-top transform scale-95 origin-top-center">
            {renderTemplate()}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
