import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';
const API_URL = `${API_BASE_URL}/api`;

export const generateResume = async (data) => {
  const response = await axios.post(`${API_URL}/builder/generate`, data);
  return response.data;
};

export const downloadResume = async (content, template = 'classic', color = null) => {
  const response = await axios.post(`${API_URL}/builder/download`, { content, template, color }, {
    responseType: 'blob'
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `resume-${template}.pdf`);
  document.body.appendChild(link);
  link.click();
};

export const getHistory = async () => {
  const response = await axios.get(`${API_URL}/builder/history`);
  return response.data;
};

export const analyzeResume = async (formData) => {
  const response = await axios.post(`${API_URL}/analyzer/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const chatWithAI = async (message, context) => {
  const response = await axios.post(`${API_URL}/builder/chat`, { message, context });
  return response.data;
};

export const uploadChatDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${API_URL}/builder/upload-context`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
