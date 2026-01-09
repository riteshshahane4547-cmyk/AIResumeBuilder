import React, { useState, useEffect } from 'react';

function ResumeForm({ onSubmit, isLoading }) {
  const [isFresher, setIsFresher] = useState(false);
  
  // Basic Info
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    email: '',
    jobRole: '',
    phone: '',
    linkedin: ''
  });

  // Dynamic Lists
  const [educationList, setEducationList] = useState([
    { degree: '', school: '', year: '' }
  ]);
  
  const [experienceList, setExperienceList] = useState([
    { role: '', company: '', duration: '', description: '' }
  ]);

  const [skills, setSkills] = useState('');

  // Handlers for Basic Info
  const handleBasicChange = (e) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  // Handlers for Education
  const addEducation = () => {
    setEducationList([...educationList, { degree: '', school: '', year: '' }]);
  };
  
  const removeEducation = (index) => {
    const list = [...educationList];
    list.splice(index, 1);
    setEducationList(list);
  };

  const handleEducationChange = (index, field, value) => {
    const list = [...educationList];
    list[index][field] = value;
    setEducationList(list);
  };

  // Handlers for Experience
  const addExperience = () => {
    setExperienceList([...experienceList, { role: '', company: '', duration: '', description: '' }]);
  };

  const removeExperience = (index) => {
    const list = [...experienceList];
    list.splice(index, 1);
    setExperienceList(list);
  };

  const handleExperienceChange = (index, field, value) => {
    const list = [...experienceList];
    list[index][field] = value;
    setExperienceList(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format data for the AI/Backend
    // We convert the structured lists into the string format the backend expects
    
    let educationString = educationList
      .filter(ed => ed.degree || ed.school)
      .map(ed => `${ed.degree} at ${ed.school} (${ed.year})`)
      .join('\n');

    let experienceString = isFresher 
      ? "Fresher - No professional experience yet." 
      : experienceList
          .filter(exp => exp.role || exp.company)
          .map(exp => `${exp.role} at ${exp.company} (${exp.duration})\n${exp.description}`)
          .join('\n\n');

    // If Fresher, maybe we want to emphasize projects instead? 
    // For now, we'll keep it simple as requested.

    const finalData = {
      name: basicInfo.name,
      email: basicInfo.email,
      jobRole: basicInfo.jobRole,
      skills: skills,
      education: educationString,
      experience: experienceString
    };

    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Experience Level Toggle */}
      <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div>
          <h3 className="font-semibold text-blue-900">Experience Level</h3>
          <p className="text-sm text-blue-700">Are you a student or recent graduate?</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={isFresher} 
            onChange={(e) => setIsFresher(e.target.checked)} 
            className="sr-only peer" 
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-700">{isFresher ? 'Fresher / Student' : 'Experienced'}</span>
        </label>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="name" value={basicInfo.name} onChange={handleBasicChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Job Role</label>
            <input type="text" name="jobRole" value={basicInfo.jobRole} onChange={handleBasicChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" placeholder="e.g. Software Engineer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={basicInfo.email} onChange={handleBasicChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
            <input type="tel" name="phone" value={basicInfo.phone} onChange={handleBasicChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
        </div>
      </div>

      {/* Education - Dynamic */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
           <h3 className="text-lg font-bold text-gray-800">Education</h3>
           <button type="button" onClick={addEducation} className="text-sm text-blue-600 hover:text-blue-800 font-medium">+ Add Education</button>
        </div>
        
        {educationList.map((edu, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border relative group">
            {educationList.length > 1 && (
              <button type="button" onClick={() => removeEducation(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input 
                placeholder="Degree (e.g. B.Tech)" 
                value={edu.degree} 
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm" 
              />
              <input 
                placeholder="University / School" 
                value={edu.school} 
                onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm" 
              />
              <input 
                placeholder="Year (e.g. 2020-2024)" 
                value={edu.year} 
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm" 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Experience - Dynamic (Hidden if Fresher) */}
      {!isFresher && (
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-bold text-gray-800">Work Experience</h3>
            <button type="button" onClick={addExperience} className="text-sm text-blue-600 hover:text-blue-800 font-medium">+ Add Experience</button>
          </div>
          
          {experienceList.map((exp, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border relative group">
              {experienceList.length > 1 && (
                <button type="button" onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              )}
              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    placeholder="Job Title" 
                    value={exp.role} 
                    onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm" 
                  />
                  <input 
                    placeholder="Company Name" 
                    value={exp.company} 
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm" 
                  />
                </div>
                <input 
                  placeholder="Duration (e.g. Jan 2022 - Present)" 
                  value={exp.duration} 
                  onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm" 
                />
                <textarea 
                  placeholder="Description of responsibilities..." 
                  value={exp.description} 
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  rows="2"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm" 
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Skills</h3>
        <textarea 
          name="skills" 
          value={skills} 
          onChange={(e) => setSkills(e.target.value)} 
          rows="3" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" 
          placeholder="e.g. JavaScript, React, Node.js, Team Leadership, Public Speaking"
        ></textarea>
      </div>

      <div className="pt-4">
        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 font-bold shadow-lg transform transition active:scale-95 flex justify-center items-center">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Resume...
            </>
          ) : 'Generate Resume'}
        </button>
      </div>
    </form>
  );
}

export default ResumeForm;