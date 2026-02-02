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
        {(data.personalInfo?.city || data.personalInfo?.state || data.personalInfo?.country) && (
          <span>| {[data.personalInfo.city, data.personalInfo.state, data.personalInfo.country].filter(Boolean).join(', ')}</span>
        )}
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

    {data.projects && data.projects.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ color: color, borderColor: '#e5e7eb' }}>Projects</h3>
        <div className="space-y-4">
          {data.projects.map((proj, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-md">{proj.title}</h4>
              </div>
              {proj.technologies && <div className="text-sm font-semibold text-gray-700 mb-1">Tech Stack: {proj.technologies}</div>}
              <p className="text-sm text-gray-600 whitespace-pre-line">{proj.description}</p>
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

    {(data.certificates || data.achievements || data.hobbies) && (
       <div className="grid grid-cols-2 gap-4">
          {data.certificates && data.certificates.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ color: color, borderColor: '#e5e7eb' }}>Certificates</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {data.certificates.map((cert, index) => <li key={index}>{cert}</li>)}
              </ul>
            </div>
          )}
          {data.achievements && data.achievements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ color: color, borderColor: '#e5e7eb' }}>Achievements</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {data.achievements.map((ach, index) => <li key={index}>{ach}</li>)}
              </ul>
            </div>
          )}
          {data.hobbies && data.hobbies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ color: color, borderColor: '#e5e7eb' }}>Hobbies</h3>
              <div className="text-sm text-gray-700">{data.hobbies.join(', ')}</div>
            </div>
          )}
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
        {(data.personalInfo?.city || data.personalInfo?.state || data.personalInfo?.country) && (
          <p className="text-xs mt-2 opacity-80">{[data.personalInfo.city, data.personalInfo.state, data.personalInfo.country].filter(Boolean).join(', ')}</p>
        )}
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
        <div className="mb-8">
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

      {data.hobbies && data.hobbies.length > 0 && (
        <div className="mb-8">
           <h3 className="text-xs font-bold uppercase tracking-wider mb-4 opacity-80 border-b border-white/20 pb-1">Hobbies</h3>
           <div className="text-sm opacity-90">{data.hobbies.join(', ')}</div>
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

      {data.projects && data.projects.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold uppercase tracking-wide mb-6 text-gray-400">Projects</h3>
          <div className="space-y-6">
            {data.projects.map((proj, index) => (
              <div key={index} className="relative pl-4 border-l-2 border-gray-100">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                <h4 className="font-bold text-lg text-gray-800">{proj.title}</h4>
                {proj.technologies && <div className="text-xs font-semibold text-gray-500 mb-1">Tech: {proj.technologies}</div>}
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(data.certificates || data.achievements) && (
        <div className="mt-8 grid grid-cols-2 gap-4">
           {data.certificates && data.certificates.length > 0 && (
             <div>
               <h3 className="text-lg font-bold uppercase tracking-wide mb-3 text-gray-400">Certificates</h3>
               <ul className="list-disc list-inside text-sm text-gray-600">
                 {data.certificates.map((cert, index) => <li key={index}>{cert}</li>)}
               </ul>
             </div>
           )}
           {data.achievements && data.achievements.length > 0 && (
             <div>
               <h3 className="text-lg font-bold uppercase tracking-wide mb-3 text-gray-400">Achievements</h3>
               <ul className="list-disc list-inside text-sm text-gray-600">
                 {data.achievements.map((ach, index) => <li key={index}>{ach}</li>)}
               </ul>
             </div>
           )}
        </div>
      )}
    </div>
  </div>
);

const ProfessionalTemplate = ({ data, color }) => (
  <div className="font-sans p-8 bg-white h-full text-gray-800">
    <div className="flex justify-between items-center border-b-2 pb-6 mb-6" style={{ borderColor: color }}>
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-1" style={{ color: color }}>{data.personalInfo?.fullName}</h1>
        <p className="text-xl font-medium text-gray-600">{data.personalInfo?.role}</p>
      </div>
      <div className="text-right text-sm space-y-1 text-gray-500">
        {data.personalInfo?.email && <div>{data.personalInfo.email}</div>}
        {data.personalInfo?.phone && <div>{data.personalInfo.phone}</div>}
        {data.personalInfo?.linkedin && <div>{data.personalInfo.linkedin}</div>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-8 bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: color }}>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
    )}

    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        {data.experience && data.experience.length > 0 && (
          <div>
            <h3 className="text-xl font-bold uppercase mb-4 flex items-center gap-2" style={{ color: color }}>
              <span className="w-8 h-1 bg-current"></span> Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-gray-100">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-lg">{exp.role}</h4>
                    <span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600">{exp.duration}</span>
                  </div>
                  <div className="text-md font-semibold text-gray-600 mb-2">{exp.company}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {data.skills && data.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-bold uppercase mb-4" style={{ color: color }}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 rounded text-sm font-medium border" style={{ borderColor: color, color: color, backgroundColor: 'white' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div>
            <h3 className="text-lg font-bold uppercase mb-4" style={{ color: color }}>Education</h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <div className="font-bold text-gray-800">{edu.degree}</div>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                  <div className="text-xs text-gray-500 mt-1 font-medium">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(data.certificates || data.achievements || data.hobbies) && (
          <div className="space-y-8">
            {data.certificates && data.certificates.length > 0 && (
              <div>
                <h3 className="text-lg font-bold uppercase mb-4" style={{ color: color }}>Certificates</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {data.certificates.map((cert, index) => <li key={index}>{cert}</li>)}
                </ul>
              </div>
            )}
            {data.achievements && data.achievements.length > 0 && (
              <div>
                <h3 className="text-lg font-bold uppercase mb-4" style={{ color: color }}>Achievements</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {data.achievements.map((ach, index) => <li key={index}>{ach}</li>)}
                </ul>
              </div>
            )}
            {data.hobbies && data.hobbies.length > 0 && (
              <div>
                <h3 className="text-lg font-bold uppercase mb-4" style={{ color: color }}>Hobbies</h3>
                <div className="text-sm text-gray-600">{data.hobbies.join(', ')}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

const CreativeTemplate = ({ data, color }) => (
  <div className="font-sans h-full bg-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-48 transform -skew-y-3 origin-top-left z-0" style={{ backgroundColor: color }}></div>
    
    <div className="relative z-10 p-8 pt-12">
      <div className="flex justify-between items-end mb-16 text-white">
        <div>
          <h1 className="text-5xl font-black mb-2 tracking-tighter">{data.personalInfo?.fullName}</h1>
          <p className="text-xl opacity-90 font-light tracking-widest uppercase">{data.personalInfo?.role}</p>
        </div>
        <div className="text-right text-sm opacity-90 space-y-1 font-medium">
          {data.personalInfo?.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo?.phone && <div>{data.personalInfo.phone}</div>}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 space-y-8">
           <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
             <h3 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: color }}>Skills</h3>
             <div className="flex flex-wrap gap-2">
               {data.skills && data.skills.map((skill, index) => (
                 <span key={index} className="text-xs font-bold px-2 py-1 bg-white border border-gray-200 rounded-md text-gray-600 shadow-sm">{skill}</span>
               ))}
             </div>
           </div>

           <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
             <h3 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: color }}>Education</h3>
             <div className="space-y-4">
               {data.education && data.education.map((edu, index) => (
                 <div key={index}>
                   <div className="font-bold text-gray-800">{edu.degree}</div>
                   <div className="text-sm text-gray-500">{edu.school}</div>
                   <div className="text-xs text-gray-400 mt-1">{edu.year}</div>
                 </div>
               ))}
             </div>
           </div>
        </div>

        <div className="col-span-8 space-y-8">
          {data.summary && (
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: color }}>About Me</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-light">{data.summary}</p>
            </div>
          )}

          {data.experience && data.experience.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: color }}>Experience</h3>
              <div className="space-y-8">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: color }}></div>
                    <div className="mb-2">
                      <h4 className="font-bold text-xl text-gray-800">{exp.role}</h4>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="font-semibold text-gray-500">{exp.company}</span>
                        <span className="text-gray-400 bg-gray-50 px-2 py-1 rounded">{exp.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.projects && data.projects.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: color }}>Projects</h3>
              <div className="space-y-8">
                {data.projects.map((proj, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: color }}></div>
                    <div className="mb-2">
                      <h4 className="font-bold text-xl text-gray-800">{proj.title}</h4>
                      {proj.technologies && <div className="text-sm font-semibold text-gray-500 mt-1">Tech Stack: {proj.technologies}</div>}
                    </div>
                    <p className="text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const ExecutiveTemplate = ({ data, color }) => (
  <div className="font-serif h-full bg-white flex flex-col">
    <div className="bg-slate-900 text-white p-12 text-center">
       <h1 className="text-4xl font-bold uppercase tracking-widest mb-4">{data.personalInfo?.fullName}</h1>
       <p className="text-lg text-slate-300 font-light tracking-widest uppercase border-t border-slate-700 pt-4 inline-block px-8">{data.personalInfo?.role}</p>
    </div>
    
    <div className="flex-grow p-12 bg-gray-50">
       <div className="max-w-4xl mx-auto bg-white shadow-xl p-12 -mt-24 relative z-10">
          <div className="flex justify-center gap-6 text-sm text-slate-500 mb-12 border-b border-gray-100 pb-8">
             {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
             {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
             {data.personalInfo?.linkedin && <span>{data.personalInfo.linkedin}</span>}
          </div>

          {data.summary && (
            <div className="mb-12 text-center">
               <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">Executive Summary</h3>
               <p className="text-lg text-slate-700 italic leading-relaxed">"{data.summary}"</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div>
                <h3 className="text-sm font-bold uppercase text-slate-900 mb-6 tracking-widest border-b-2 border-slate-900 pb-2">Experience</h3>
                <div className="space-y-8">
                   {data.experience && data.experience.map((exp, index) => (
                     <div key={index}>
                        <h4 className="font-bold text-lg text-slate-800">{exp.role}</h4>
                        <div className="text-sm text-slate-500 mb-2">{exp.company} | {exp.duration}</div>
                        <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="space-y-12">
                {data.skills && data.skills.length > 0 && (
                   <div>
                      <h3 className="text-sm font-bold uppercase text-slate-900 mb-6 tracking-widest border-b-2 border-slate-900 pb-2">Core Competencies</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                         {data.skills.map((skill, index) => (
                            <span key={index} className="text-sm text-slate-700 font-medium">• {skill}</span>
                         ))}
                      </div>
                   </div>
                )}

                {data.education && data.education.length > 0 && (
                   <div>
                      <h3 className="text-sm font-bold uppercase text-slate-900 mb-6 tracking-widest border-b-2 border-slate-900 pb-2">Education</h3>
                      <div className="space-y-4">
                         {data.education.map((edu, index) => (
                           <div key={index}>
                              <div className="font-bold text-slate-800">{edu.degree}</div>
                              <div className="text-sm text-slate-600">{edu.school}</div>
                              <div className="text-xs text-slate-400 mt-1">{edu.year}</div>
                           </div>
                         ))}
                      </div>
                   </div>
                )}

                {(data.certificates || data.achievements || data.hobbies) && (
                   <div className="space-y-12">
                      {data.certificates && data.certificates.length > 0 && (
                         <div>
                            <h3 className="text-sm font-bold uppercase text-slate-900 mb-6 tracking-widest border-b-2 border-slate-900 pb-2">Certificates</h3>
                            <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
                               {data.certificates.map((cert, index) => <li key={index}>{cert}</li>)}
                            </ul>
                         </div>
                      )}
                      {data.achievements && data.achievements.length > 0 && (
                         <div>
                            <h3 className="text-sm font-bold uppercase text-slate-900 mb-6 tracking-widest border-b-2 border-slate-900 pb-2">Achievements</h3>
                            <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
                               {data.achievements.map((ach, index) => <li key={index}>{ach}</li>)}
                            </ul>
                         </div>
                      )}
                      {data.hobbies && data.hobbies.length > 0 && (
                         <div>
                            <h3 className="text-sm font-bold uppercase text-slate-900 mb-6 tracking-widest border-b-2 border-slate-900 pb-2">Hobbies</h3>
                            <div className="text-sm text-slate-600">{data.hobbies.join(', ')}</div>
                         </div>
                      )}
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  </div>
);

const MinimalistTemplate = ({ data, color }) => (
  <div className="font-mono p-12 bg-white h-full text-gray-800 max-w-4xl mx-auto">
     <header className="mb-16">
        <h1 className="text-2xl font-bold mb-2 lowercase">{data.personalInfo?.fullName}.</h1>
        <p className="text-gray-500 mb-6">{data.personalInfo?.role}</p>
        <div className="text-xs text-gray-400 flex flex-col gap-1">
           {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
           {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
        </div>
     </header>

     <main className="grid grid-cols-12 gap-12">
        <div className="col-span-4 space-y-12">
           {data.skills && data.skills.length > 0 && (
              <section>
                 <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Skills</h2>
                 <ul className="space-y-2 text-sm">
                    {data.skills.map((skill, index) => (
                       <li key={index}>{skill}</li>
                    ))}
                 </ul>
              </section>
           )}

           {data.education && data.education.length > 0 && (
              <section>
                 <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Education</h2>
                 <div className="space-y-6">
                    {data.education.map((edu, index) => (
                       <div key={index}>
                          <div className="font-bold text-sm">{edu.degree}</div>
                          <div className="text-xs text-gray-500 mt-1">{edu.school}</div>
                          <div className="text-xs text-gray-400 mt-1">{edu.year}</div>
                       </div>
                    ))}
                 </div>
              </section>
           )}

           {(data.certificates || data.achievements || data.hobbies) && (
             <div className="space-y-12">
               {data.certificates && data.certificates.length > 0 && (
                 <section>
                   <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Certificates</h2>
                   <ul className="space-y-2 text-sm text-gray-600">
                     {data.certificates.map((cert, index) => <li key={index}>{cert}</li>)}
                   </ul>
                 </section>
               )}
               {data.achievements && data.achievements.length > 0 && (
                 <section>
                   <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Achievements</h2>
                   <ul className="space-y-2 text-sm text-gray-600">
                     {data.achievements.map((ach, index) => <li key={index}>{ach}</li>)}
                   </ul>
                 </section>
               )}
               {data.hobbies && data.hobbies.length > 0 && (
                 <section>
                   <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Hobbies</h2>
                   <div className="text-sm text-gray-600">{data.hobbies.join(', ')}</div>
                 </section>
               )}
             </div>
           )}
        </div>

        <div className="col-span-8 space-y-12">
           {data.summary && (
              <section>
                 <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">About</h2>
                 <p className="text-sm leading-relaxed text-gray-600">{data.summary}</p>
              </section>
           )}

           {data.experience && data.experience.length > 0 && (
              <section>
                 <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Experience</h2>
                 <div className="space-y-8">
                    {data.experience.map((exp, index) => (
                       <div key={index}>
                          <div className="flex justify-between items-baseline mb-2">
                             <h3 className="font-bold text-sm">{exp.role}</h3>
                             <span className="text-xs text-gray-400">{exp.duration}</span>
                          </div>
                          <div className="text-xs text-gray-500 mb-3">{exp.company}</div>
                          <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                       </div>
                    ))}
                 </div>
              </section>
           )}
        </div>
     </main>
  </div>
);

const TechTemplate = ({ data, color }) => (
  <div className="font-mono p-8 bg-slate-900 text-slate-300 h-full">
    <div className="border-b border-slate-700 pb-6 mb-8 flex justify-between items-end">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter">
          <span className="mr-2" style={{ color: color }}>&gt;</span>
          {data.personalInfo?.fullName}
        </h1>
        <p className="text-xl text-slate-400">{data.personalInfo?.role}</p>
      </div>
      <div className="text-right text-xs space-y-1 text-slate-500">
        {data.personalInfo?.email && <div>{data.personalInfo.email}</div>}
        {data.personalInfo?.phone && <div>{data.personalInfo.phone}</div>}
        {data.personalInfo?.linkedin && <div>{data.personalInfo.linkedin}</div>}
        {(data.personalInfo?.city || data.personalInfo?.state || data.personalInfo?.country) && (
             <div>{[data.personalInfo.city, data.personalInfo.state, data.personalInfo.country].filter(Boolean).join(', ')}</div>
        )}
      </div>
    </div>

    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8 space-y-8">
         {data.summary && (
            <div className="bg-slate-800/50 p-6 rounded border border-slate-700">
               <h3 className="text-sm font-bold mb-2 uppercase tracking-widest" style={{ color: color }}>// Summary</h3>
               <p className="text-sm leading-relaxed text-slate-300">{data.summary}</p>
            </div>
         )}

         {data.experience && data.experience.length > 0 && (
            <div>
               <h3 className="text-sm font-bold mb-6 uppercase tracking-widest" style={{ color: color }}>// Experience</h3>
               <div className="space-y-8 border-l border-slate-800 pl-6 ml-2">
                  {data.experience.map((exp, index) => (
                     <div key={index} className="relative">
                        <div className="absolute -left-[29px] top-1.5 w-3 h-3 bg-slate-900 border-2 rounded-full" style={{ borderColor: color }}></div>
                        <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                        <div className="flex justify-between text-xs text-slate-500 mb-2 font-bold">
                           <span style={{ color: color }}>{exp.company}</span>
                           <span>{exp.duration}</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{exp.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {data.projects && data.projects.length > 0 && (
            <div>
               <h3 className="text-sm font-bold mb-6 uppercase tracking-widest" style={{ color: color }}>// Projects</h3>
               <div className="grid grid-cols-1 gap-4">
                  {data.projects.map((proj, index) => (
                     <div key={index} className="bg-slate-800/30 p-4 rounded border border-slate-700/50">
                        <h4 className="font-bold text-white mb-1">{proj.title}</h4>
                        {proj.technologies && <div className="text-xs mb-2 font-mono" style={{ color: color }}>[{proj.technologies}]</div>}
                        <p className="text-xs text-slate-400">{proj.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>

      <div className="col-span-4 space-y-8">
         {data.skills && data.skills.length > 0 && (
            <div>
               <h3 className="text-sm font-bold mb-4 uppercase tracking-widest" style={{ color: color }}>// Skills</h3>
               <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                     <span key={index} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                        {skill}
                     </span>
                  ))}
               </div>
            </div>
         )}

         {data.education && data.education.length > 0 && (
            <div>
               <h3 className="text-sm font-bold mb-4 uppercase tracking-widest" style={{ color: color }}>// Education</h3>
               <div className="space-y-4">
                  {data.education.map((edu, index) => (
                     <div key={index}>
                        <div className="font-bold text-white text-sm">{edu.degree}</div>
                        <div className="text-xs text-slate-500">{edu.school}</div>
                        <div className="text-xs text-slate-600 font-mono mt-0.5">{edu.year}</div>
                     </div>
                  ))}
               </div>
            </div>
         )}
         
         {(data.certificates || data.achievements || data.hobbies) && (
            <div className="space-y-8">
               {data.certificates && data.certificates.length > 0 && (
                  <div>
                     <h3 className="text-sm font-bold mb-4 uppercase tracking-widest" style={{ color: color }}>// Certificates</h3>
                     <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
                        {data.certificates.map((cert, index) => <li key={index}><span className="-ml-1">{cert}</span></li>)}
                     </ul>
                  </div>
               )}
               {data.achievements && data.achievements.length > 0 && (
                  <div>
                     <h3 className="text-sm font-bold mb-4 uppercase tracking-widest" style={{ color: color }}>// Achievements</h3>
                     <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
                        {data.achievements.map((ach, index) => <li key={index}><span className="-ml-1">{ach}</span></li>)}
                     </ul>
                  </div>
               )}
               {data.hobbies && data.hobbies.length > 0 && (
                  <div>
                     <h3 className="text-sm font-bold mb-4 uppercase tracking-widest" style={{ color: color }}>// Hobbies</h3>
                     <div className="text-xs text-slate-400">{data.hobbies.join(', ')}</div>
                  </div>
               )}
            </div>
         )}
      </div>
    </div>
  </div>
);

const ElegantTemplate = ({ data, color }) => (
  <div className="font-serif p-12 bg-[#fdfbf7] h-full text-gray-800">
    <div className="text-center mb-12">
      <h1 className="text-5xl font-normal mb-4 tracking-wide text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>{data.personalInfo?.fullName}</h1>
      <p className="text-lg text-gray-500 uppercase tracking-widest text-xs mb-6">{data.personalInfo?.role}</p>
      
      <div className="flex justify-center gap-4 text-sm text-gray-500 italic border-t border-b border-gray-200 py-3 mx-12">
        {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo?.phone && <span>• {data.personalInfo.phone}</span>}
        {data.personalInfo?.linkedin && <span>• {data.personalInfo.linkedin}</span>}
        {(data.personalInfo?.city || data.personalInfo?.state || data.personalInfo?.country) && (
           <span>• {[data.personalInfo.city, data.personalInfo.state, data.personalInfo.country].filter(Boolean).join(', ')}</span>
        )}
      </div>
    </div>

    {data.summary && (
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <p className="text-gray-600 leading-relaxed italic">{data.summary}</p>
      </div>
    )}

    <div className="grid grid-cols-1 gap-10 max-w-3xl mx-auto">
      {data.experience && data.experience.length > 0 && (
        <section>
          <h3 className="text-center text-sm font-bold uppercase tracking-widest mb-8 border-b border-gray-300 pb-2" style={{ color: color }}>Professional Experience</h3>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-xl font-medium text-gray-800">{exp.role}</h4>
                  <span className="text-sm text-gray-500 italic">{exp.duration}</span>
                </div>
                <div className="text-md text-gray-600 font-medium mb-2">{exp.company}</div>
                <p className="text-gray-600 leading-relaxed text-sm text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
         <section>
            <h3 className="text-center text-sm font-bold uppercase tracking-widest mb-8 border-b border-gray-300 pb-2" style={{ color: color }}>Key Projects</h3>
            <div className="space-y-6">
               {data.projects.map((proj, index) => (
                  <div key={index}>
                     <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-lg font-medium text-gray-800">{proj.title}</h4>
                     </div>
                     {proj.technologies && <div className="text-sm text-gray-500 italic mb-2">{proj.technologies}</div>}
                     <p className="text-gray-600 leading-relaxed text-sm">{proj.description}</p>
                  </div>
               ))}
            </div>
         </section>
      )}

      <div className="grid grid-cols-2 gap-12">
         {data.education && data.education.length > 0 && (
            <section>
               <h3 className="text-center text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2" style={{ color: color }}>Education</h3>
               <div className="space-y-4 text-center">
                  {data.education.map((edu, index) => (
                     <div key={index}>
                        <div className="font-bold text-gray-800">{edu.degree}</div>
                        <div className="text-sm text-gray-600 italic">{edu.school}</div>
                        <div className="text-xs text-gray-400 mt-1">{edu.year}</div>
                     </div>
                  ))}
               </div>
            </section>
         )}

         {data.skills && data.skills.length > 0 && (
            <section>
               <h3 className="text-center text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2" style={{ color: color }}>Expertise</h3>
               <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                  {data.skills.map((skill, index) => (
                     <span key={index} className="text-sm text-gray-600">{skill}</span>
                  ))}
               </div>
            </section>
         )}
      </div>
      
      {(data.certificates || data.achievements || data.hobbies) && (
         <section className="text-center">
             <h3 className="text-center text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2" style={{ color: color }}>Additional</h3>
             <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
               {data.certificates && (
                  <div>
                     <h4 className="font-bold mb-2 text-xs uppercase">Certificates</h4>
                     <ul className="space-y-1">{data.certificates.map((c,i)=><li key={i}>{c}</li>)}</ul>
                  </div>
               )}
               {data.achievements && (
                  <div>
                     <h4 className="font-bold mb-2 text-xs uppercase">Achievements</h4>
                     <ul className="space-y-1">{data.achievements.map((a,i)=><li key={i}>{a}</li>)}</ul>
                  </div>
               )}
               {data.hobbies && (
                  <div>
                     <h4 className="font-bold mb-2 text-xs uppercase">Hobbies</h4>
                     <div>{data.hobbies.join(', ')}</div>
                  </div>
               )}
             </div>
         </section>
      )}
    </div>
  </div>
);

const CompactTemplate = ({ data, color }) => (
  <div className="font-sans p-6 bg-white h-full text-gray-800 text-sm">
    <header className="border-b-4 pb-4 mb-4 flex justify-between" style={{ borderColor: color }}>
       <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">{data.personalInfo?.fullName}</h1>
          <p className="text-lg font-bold" style={{ color: color }}>{data.personalInfo?.role}</p>
       </div>
       <div className="text-right text-xs font-medium text-gray-600 space-y-1">
          {data.personalInfo?.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo?.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo?.linkedin && <div>{data.personalInfo.linkedin}</div>}
          {(data.personalInfo?.city || data.personalInfo?.state || data.personalInfo?.country) && (
             <div>{[data.personalInfo.city, data.personalInfo.state, data.personalInfo.country].filter(Boolean).join(', ')}</div>
          )}
       </div>
    </header>

    <div className="grid grid-cols-3 gap-4">
       <div className="col-span-1 space-y-6">
          {data.skills && data.skills.length > 0 && (
             <section>
                <h3 className="font-black uppercase text-xs mb-2 border-b border-gray-200" style={{ color: color }}>Skills</h3>
                <div className="flex flex-col gap-1">
                   {data.skills.map((skill, index) => (
                      <span key={index} className="font-bold text-gray-700">{skill}</span>
                   ))}
                </div>
             </section>
          )}

          {data.education && data.education.length > 0 && (
             <section>
                <h3 className="font-black uppercase text-xs mb-2 border-b border-gray-200" style={{ color: color }}>Education</h3>
                <div className="space-y-3">
                   {data.education.map((edu, index) => (
                      <div key={index}>
                         <div className="font-bold">{edu.degree}</div>
                         <div className="text-xs text-gray-500">{edu.school}</div>
                         <div className="text-xs text-gray-400">{edu.year}</div>
                      </div>
                   ))}
                </div>
             </section>
          )}

          {(data.certificates || data.achievements || data.hobbies) && (
             <div className="space-y-6">
               {data.certificates && data.certificates.length > 0 && (
                 <section>
                    <h3 className="font-black uppercase text-xs mb-2 border-b border-gray-200" style={{ color: color }}>Certificates</h3>
                    <ul className="list-disc list-inside text-xs text-gray-600">
                       {data.certificates.map((c,i) => <li key={i} className="truncate">{c}</li>)}
                    </ul>
                 </section>
               )}
               {data.achievements && data.achievements.length > 0 && (
                 <section>
                    <h3 className="font-black uppercase text-xs mb-2 border-b border-gray-200" style={{ color: color }}>Achievements</h3>
                    <ul className="list-disc list-inside text-xs text-gray-600">
                       {data.achievements.map((a,i) => <li key={i} className="truncate">{a}</li>)}
                    </ul>
                 </section>
               )}
               {data.hobbies && data.hobbies.length > 0 && (
                 <section>
                    <h3 className="font-black uppercase text-xs mb-2 border-b border-gray-200" style={{ color: color }}>Hobbies</h3>
                    <div className="text-xs text-gray-600">{data.hobbies.join(', ')}</div>
                 </section>
               )}
             </div>
          )}
       </div>

       <div className="col-span-2 space-y-5">
          {data.summary && (
             <section>
                <h3 className="font-black uppercase text-xs mb-2 border-b border-gray-200" style={{ color: color }}>Summary</h3>
                <p className="text-gray-700 leading-snug">{data.summary}</p>
             </section>
          )}

          {data.experience && data.experience.length > 0 && (
             <section>
                <h3 className="font-black uppercase text-xs mb-2 border-b border-gray-200" style={{ color: color }}>Experience</h3>
                <div className="space-y-4">
                   {data.experience.map((exp, index) => (
                      <div key={index}>
                         <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-gray-900">{exp.role}</h4>
                            <span className="text-xs text-gray-500 font-mono">{exp.duration}</span>
                         </div>
                         <div className="text-xs font-bold uppercase mb-1" style={{ color: color }}>{exp.company}</div>
                         <p className="text-gray-600 text-xs leading-relaxed">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>
          )}

          {data.projects && data.projects.length > 0 && (
             <section>
                <h3 className="font-black uppercase text-xs mb-2 border-b border-gray-200" style={{ color: color }}>Projects</h3>
                <div className="space-y-4">
                   {data.projects.map((proj, index) => (
                      <div key={index}>
                         <h4 className="font-bold text-gray-900">{proj.title}</h4>
                         {proj.technologies && <div className="text-xs text-gray-500 mb-1 italic">{proj.technologies}</div>}
                         <p className="text-gray-600 text-xs leading-relaxed">{proj.description}</p>
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
      case 'professional': return <ProfessionalTemplate data={data} color={color} />;
      case 'creative': return <CreativeTemplate data={data} color={color} />;
      case 'executive': return <ExecutiveTemplate data={data} color={color} />;
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
