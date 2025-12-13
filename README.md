# AI Career Nexus - AI-Powered Career Platform 🚀

## 🌟 Overview

AI Career Nexus is a comprehensive career development platform powered by **Google Gemini AI**. It provides intelligent resume analysis, personalized career coaching, skill gap analytics, and AI-driven job matching to accelerate your career growth.

### ✨ AI-Powered Features

- 🤖 **AI Career Coach** - Real-time conversations with Gemini for interview prep and career advice
- 📊 **Skill Gap Analytics** - AI-powered learning roadmaps and personalized recommendations
- 🎯 **Smart Job Matching** - Intelligent job recommendations based on your skills
- 📄 **Resume Analyzer** - AI-driven resume analysis with improvement suggestions
- ✍️ **AI Cover Letter Generator** - Personalized cover letters for job applications
- 💬 **Interactive Chat** - Natural conversations with context-aware AI

---

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- **Python 3.8+** (for backend)
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))
- Git (optional)

---

## 🚀 Quick Start

### 1. Clone Repository (Optional)

```powershell
git clone <repository-url>
cd HACKTHON1
```

### 2. Configure Environment Variables

#### Frontend Setup (.env)

Create `frontend/.env`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-2.0-flash-exp
```

#### Backend Setup (.env)

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=sqlite:///./ai_career_nexus_production.db
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200
CORS_ORIGINS=http://localhost:5173,http://localhost:5175
```

### 3. Frontend Setup

#### Install Dependencies

```powershell
cd frontend
npm install
```

#### Start Development Server

```powershell
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Backend Setup

#### Install Python Dependencies

```powershell
cd backend
pip install -r requirements.txt
```

#### Start Backend Server

```powershell
python -m uvicorn main:app --reload --port 8000
```

Or use the startup script:

```powershell
.\start-backend.ps1
```

Backend API: `http://localhost:8000`  
API Docs: `http://localhost:8000/docs`

### 5. Access the Application

1. Open browser to `http://localhost:5173`
2. Sign up for a new account
3. Explore AI-powered features!

📖 **See [AI_FEATURES_USER_GUIDE.md](AI_FEATURES_USER_GUIDE.md) for detailed feature documentation**

---

## 🎨 AI-Powered Features

### 1. 🤖 AI Career Coach
**Location:** Dashboard → AI Coach

**Features:**
- Real-time conversation with Gemini AI
- Multiple interview modes:
  - Behavioral Interview (STAR method)
  - Technical Interview (coding & system design)
  - Mock Interview (full simulation)
  - Career Chat (general guidance)
- Intelligent feedback with scoring
- Conversation history maintained
- Context-aware responses

**How to Use:**
1. Select interview mode
2. Type your question or response
3. Get instant AI feedback
4. Review performance scores

---

### 2. 📊 Skill Gap Analytics
**Location:** Dashboard → Skill Gap & Analytics

**Features:**
- AI-powered skill gap analysis
- Personalized learning roadmap
- Top 5 priority skills with timelines
- Recommended learning resources
- Career impact assessment
- Industry insights and trends

**How to Use:**
1. Auto-analysis on page load
2. Click "AI Analysis" for fresh insights
3. Review personalized recommendations
4. Follow the learning roadmap

---

### 3. 🎯 Smart Job Matching
**Location:** Dashboard → Skill-to-Job Matching

**Features:**
- AI-powered job recommendations
- Match percentage calculations
- Key strengths for each role
- Skills development suggestions
- Industry insights & salary data
- **AI Cover Letter Generator** 🎉

**How to Use:**
1. Enter desired role and location
2. Add your skills
3. Click "Find Matching Jobs"
4. Review AI career insights
5. Apply with AI-generated cover letter

---

### 4. 📄 Resume Analyzer
**Location:** Dashboard → Resume Analyzer

**Features:**
- AI-driven resume analysis
- 6-metric scoring system
- Personalized strengths & improvements
- Missing keywords detection
- ATS compatibility check
- Generate improved resume with AI

**How to Use:**
1. Upload PDF/DOCX resume
2. Get instant AI analysis
3. Review detailed scores
4. Download improved resume

---

### 5. 🔐 Authentication System

**Features:**
- User registration & login
- JWT token authentication (30-day expiration)
- Bcrypt password hashing
- SQLite database
- Beautiful sign-in/sign-up UI

**Quick Start:**
1. Click "Sign Up" on landing page
2. Create account
3. Login and access all features

---

## 📁 Project Structure

```
d:\HACKTHON1/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx      # Hero landing page
│   │   │   ├── Login.jsx            # 🔐 Authentication
│   │   │   ├── Dashboard.jsx        # Main dashboard
│   │   │   ├── SkillMatcher.jsx     # 🎯 AI Job matching
│   │   │   ├── ResumeAnalyzer.jsx   # 📄 AI Resume analysis
│   │   │   ├── AICoach.jsx          # 🤖 AI Career coach
│   │   │   └── SkillGap.jsx         # 📊 AI Skill analytics
│   │   ├── services/
│   │   │   └── geminiService.js     # ✨ Gemini API service
│   │   ├── hooks/
│   │   │   └── useGemini.js         # ✨ React hook for AI
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                          # ✨ Gemini API key
│   └── package.json
├── backend/
│   ├── main.py                       # FastAPI app
│   ├── database.py                   # SQLAlchemy models
│   ├── requirements.txt              # Python dependencies
│   ├── models/
│   │   ├── auth.py                   # Auth schemas
│   │   ├── user.py                   # User model
│   │   ├── resume.py                 # Resume model
│   │   └── career.py                 # Career model
│   ├── routes/
│   │   ├── auth.py                   # Auth endpoints
│   │   ├── resume_analyzer.py        # ✨ AI Resume endpoints
│   │   ├── skill_matcher.py          # Job matching
│   │   ├── dashboard.py              # Dashboard API
│   │   └── ai_coach.py               # AI chat
│   ├── utils/
│   │   └── jwt_handler.py            # JWT utilities
│   └── .env                           # ✨ API keys & config
├── AI_INTEGRATION_COMPLETE.md         # ✨ AI integration docs
├── AI_FEATURES_USER_GUIDE.md          # ✨ User guide
├── GEMINI_API_USAGE.md                 # ✨ API documentation
└── README.md
```

---
- Auto-suggestion chips
- Color-coded job match results
- Match percentage indicators (95%, 92%, etc.)
- Salary prediction bars
- Real-time job filtering

### 4. Resume Analyzer
- Drag-and-drop upload with glassmorphism
- AI scanning animation
- Resume score radial gauge (87/100)
- Detailed insights panel:
  - Strengths (4+ items)
  - Improvements (5+ items)
  - Missing keywords (8+ items)
- Category breakdowns (5 metrics)
- "Generate Better Resume" CTA

### 5. AI Career Chatbot & Interview Coach
- 4 interview modes:
  - Behavioral Interview
  - Technical Interview
  - Mock Interview
  - Career Chat
- Voice input capability (mic button)
- Real-time feedback indicators:
  - Tone analysis
  - Clarity score
  - Confidence level
  - Response structure
- AI behavior analysis on responses
- Session statistics

### 6. Skill Gap & Analytics
- Radar chart of skill strengths (6 skills)
- Weekly growth area chart
- Missing skills heatmap (8 skills):
  - Importance percentage
  - Difficulty level (Easy/Medium/Hard)
  - Time estimation
  - Category tags
- AI-recommended courses (3 courses):
  - Provider, duration, rating
  - Skills covered
  - Progress tracking
- Personalized roadmap timeline:
  - 5 learning milestones
  - Status tracking
  - Due dates

## 🎨 Design System

### Color Palette
- **Neon Blue**: #00D9FF
- **Neon Purple**: #B026FF
- **Neon Pink**: #FF006B
- **Neon Green**: #00FFB9
- **Neon Yellow**: #FFD600
- **Dark Backgrounds**: #0A0A0F → #2E2E40

### Animations
- Float: 6s infinite
- Pulse Slow: 4s infinite
- Glow: 3s infinite
- Shimmer: 2s infinite

### Components
- Glassmorphism cards
- Neon gradient buttons
- Floating UI elements
- 3D depth effects
- Micro-animations on hover

## � Documentation

### Core Documentation
- **[README.md](README.md)** - This file, main project overview
- **[AI_INTEGRATION_COMPLETE.md](AI_INTEGRATION_COMPLETE.md)** - Complete AI integration summary
- **[AI_FEATURES_USER_GUIDE.md](AI_FEATURES_USER_GUIDE.md)** - User guide for all AI features
- **[GEMINI_API_USAGE.md](frontend/GEMINI_API_USAGE.md)** - Gemini API technical documentation

### Setup Guides
- **[SETUP_AUTH.md](SETUP_AUTH.md)** - Authentication system setup
- **[BACKEND_SETUP_GUIDE.md](BACKEND_SETUP_GUIDE.md)** - Backend installation guide
- **[QUICK_START_BACKEND.md](QUICK_START_BACKEND.md)** - Quick backend start

### Design & Technical
- **[DESIGN_DOCUMENTATION.md](DESIGN_DOCUMENTATION.md)** - UI/UX design system
- **[RESTRUCTURE_SUMMARY.md](RESTRUCTURE_SUMMARY.md)** - Project restructure notes
- **[PROBLEMS_AND_FIXES.md](PROBLEMS_AND_FIXES.md)** - Common issues & solutions

---

## 🔗 Navigation Flow

```
Landing Page (/)
    ↓
Login (/login) - 🔐 Sign in/Sign up
    ↓
Dashboard (/dashboard)
    ├── Skill Matcher (/skill-matcher) - 🎯 AI Job matching
    ├── Resume Analyzer (/resume-analyzer) - 📄 AI Resume analysis
    ├── AI Coach (/ai-coach) - 🤖 AI Career coach
    ├── Skill Gap (/skill-gap) - 📊 AI Skill analytics
    ├── Profile (/profile) - 👤 User profile
    └── Settings (/settings) - ⚙️ App settings
```

---

## 📊 Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite 5.4.21** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **React Router** - Navigation
- **Lucide React** - Icon library

### Backend
- **FastAPI 0.109.0** - Python web framework
- **SQLAlchemy** - ORM for database
- **SQLite** - Database
- **Uvicorn** - ASGI server
- **PyJWT** - JWT authentication
- **Bcrypt** - Password hashing
- **PyPDF2** - PDF processing
- **python-docx** - DOCX processing

### AI Integration
- **Google Gemini API** - AI language model
- **Model:** gemini-2.0-flash-exp
- **REST API** - Direct HTTP calls
- **Custom Service Layer** - geminiService.js
- **React Hooks** - useGemini.js

---

## 📊 Data & Analytics

### Sample Data Included
- 50K+ career paths
- 98% AI accuracy
- 1M+ users
- AI Career Score: 92/100
- 24 skills mastered
- 156 learning hours
- 4 job matches with 85-95% match rates

## 🎯 Key Interactions

### Hover Effects
- Scale 1.05 on buttons
- Glow enhancement
- Card lift (5-10px)
- Border color transitions

### Click Effects
- Scale 0.95 tap feedback
- Ripple on glass elements
- Loading spinners
- Success animations

### Animations
- Page transitions: fade + slide
- Stagger animations on lists
- Chart data animations (2s)
- Floating card effects

## 🛠️ Customization

### Modify Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      neon: {
        blue: '#00D9FF',
        // Add your colors
      }
    }
  }
}
```

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in sidebar

### Adjust Animations
Modify `tailwind.config.js` keyframes section

## 📱 Responsive Design

- **Desktop**: Full layout with sidebar
- **Tablet**: Adjusted grids, smaller sidebar
- **Mobile**: Single column, drawer navigation

## 🎨 Unique Design Features

1. **Neon Gradient Theme**: Futuristic AI aesthetic
2. **Glassmorphism**: Modern frosted glass effects
3. **3D Depth**: Layered shadows and elevations
4. **Micro-animations**: Smooth, professional interactions
5. **Floating Elements**: Dynamic, engaging UI
6. **AI Visual Language**: Sparkles, brain icons, scanning effects

## 📚 Dependencies

### Core
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.20.0

### UI & Animation
- framer-motion: ^10.16.0
- lucide-react: ^0.294.0

### Charts & Data
- recharts: ^2.10.0

### Utilities
- react-dropzone: ^14.2.3
- react-speech-recognition: ^3.10.0

### Development
- vite: ^5.0.8
- tailwindcss: ^3.3.6
- autoprefixer: ^10.4.16

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Change port in vite.config.js
server: { port: 3000 }
```

### Build Errors
```powershell
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Styling Issues
```powershell
# Rebuild Tailwind
npm run build
```

## 🚀 Deployment

### Netlify/Vercel
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Manual
1. Run `npm run build`
2. Upload `dist/` folder to hosting

## 📄 License

MIT License - Feel free to use for your projects!

## 🤝 Support

For issues or questions, refer to:
- Design Documentation: `DESIGN_DOCUMENTATION.md`
- Component examples in source files
- Tailwind CSS documentation
- Framer Motion documentation

---

**Version**: 1.0.0  
**Created**: December 12, 2025  
**Platform**: AI Career Nexus
