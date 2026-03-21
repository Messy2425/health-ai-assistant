# AI Healthcare Assistant Prompt System

A modern, full-stack web application that provides educational health awareness guidance using AI. Built with React, Node.js, and MongoDB.

## 🚀 Features
- **Modern UI/UX**: Clean, responsive design with glassmorphism and subtle animations.
- **Secure Auth**: Custom JWT-based authentication and Google OAuth 2.0.
- **AI Health Assistant**: Specialized prompts for symptom analysis, diet, lifestyle, and more.
- **Inquiry History**: Securely stored records of all user interactions.
- **Educational Only**: Strict guardrails ensure no medical diagnosis is provided.

## 🛠 Tech Stack
- **Frontend**: React (Vite), Framer Motion, Lucide Icons, Vanilla CSS.
- **Backend**: Node.js, Express.js, Mongoose.
- **Database**: MongoDB (Local or Atlas).
- **AI Integration**: Google Gemini 1.5 Flash API.

## 📂 Project Structure
```text
ai-healthcare-assistant/
├── backend/
│   ├── config/ (DB Connection)
│   ├── controllers/ (Auth & AI Logic)
│   ├── middleware/ (JWT Protection)
│   ├── models/ (User & HealthRecord schemas)
│   ├── routes/ (API Endpoints)
│   └── server.js (Entry Point)
├── frontend/
│   ├── src/
│   │   ├── components/ (Navbar, UI elements)
│   │   ├── context/ (Auth State Management)
│   │   ├── pages/ (Login, Signup, Dashboard, etc.)
│   │   └── index.css (Global Design System)
└── package.json (Root Scripts)
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a URI from Atlas)

### 2. Backend Configuration
Create `backend/.env` (already initialized with placeholders):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai_healthcare_assistant
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_id
GEMINI_API_KEY=your_gemini_key
```

### 3. Frontend Configuration
Update `frontend/src/App.jsx` with your `GOOGLE_CLIENT_ID`.

### 4. Installation
From the root directory, run:
```bash
npm run install:all
```

### 5. Running the App
Start both frontend and backend concurrently:
```bash
npm run dev
```

## 🧠 AI Prompt Usage
The system uses a master prompt that forces the AI to categorize questions and provide structured, educational feedback ONLY. It explicitly includes warnings and doctor-consultation instructions.

## ⚠️ Disclaimer
This application is for educational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
