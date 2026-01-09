# AI Resume Builder & Resume Analyzer

This is a complete AI-powered Resume Builder and Analyzer web application.

## Features

### 1. Resume Builder
- Enter personal details, education, skills, experience, and job role.
- AI generates a professional, ATS-friendly resume.
- Download the generated resume as a PDF.

### 2. Resume Analyzer
- Upload an existing resume (PDF/Text).
- (Optional) Paste a job description.
- AI analyzes the resume for ATS compatibility.
- Provides a score, strengths, weaknesses, missing skills, and improvement suggestions.

## Project Structure

```
/
├── frontend/           # React Frontend
├── backend/            # Node.js/Express Backend
├── ai-prompts/         # AI Prompts for generation/analysis
└── README.md           # This file
```

## Prerequisites

- **Node.js**: You must have Node.js installed on your machine. [Download Here](https://nodejs.org/)

## Setup Instructions

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  (Optional) Configure OpenAI API Key:
    - Open `.env` file.
    - Add your API Key: `OPENAI_API_KEY=sk-...`
    - *Note: If no key is provided, the system uses a mock AI service for demonstration.*
4.  Start the server:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:5000`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will open in your browser (usually at `http://localhost:5173`).

## Usage

1.  **Build Resume**: Go to the "Builder" page, fill in the form, and click "Generate Resume".
2.  **Analyze Resume**: Go to the "Analyzer" page, upload a file, and click "Analyze Resume".

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, SQLite (Sequelize)
- **AI**: OpenAI API (or Mock Service)
- **Tools**: PDFKit, Multer
