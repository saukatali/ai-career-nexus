# AI Career Nexus 🚀

Ultra-Premium AI-Powered Career Guidance Platform

## 🌟 Overview
AI Career Nexus is a cutting-edge career guidance platform that leverages artificial intelligence to provide personalized career insights, resume analysis, skill matching, and AI-powered coaching. Built with modern technologies and a stunning futuristic UI.

## ✨ Features

### 🎯 AI Career Dashboard
- Real-time career score calculation
- Progress tracking and analytics
- Skill distribution visualization
- Personalized AI recommendations

### 📊 Skill Matcher
- AI-powered job matching
- Skills gap analysis
- Market demand insights
- Salary range predictions

### 📝 AI Resume Analyzer
- ATS compatibility scoring
- Resume improvement suggestions
- Section-by-section analysis
- Professional templates

### 💬 AI Career Coach
- Interactive chat interface
- Interview preparation
- Career path guidance
- Personalized coaching

### 📈 Skill Gap Analysis
- Identify missing skills
- Curated learning paths
- Progress tracking
- Market trend analysis

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **AI/ML**: OpenAI, Transformers, spaCy
- **Data**: pandas, NumPy, scikit-learn
- **Resume Processing**: PyPDF2, python-docx, pdfplumber
- **Database**: SQLAlchemy + PostgreSQL

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **File Upload**: React Dropzone

## 📦 Project Structure

```
HACKTHON/
├── backend/                 # Python FastAPI backend
│   ├── api/                # AI service modules
│   │   ├── career_analyzer.py
│   │   ├── resume_parser.py
│   │   └── skill_matcher.py
│   ├── models/             # Pydantic data models
│   │   ├── user.py
│   │   ├── skill.py
│   │   ├── resume.py
│   │   └── career.py
│   ├── routes/             # API endpoints
│   │   ├── dashboard.py
│   │   ├── skill_matcher.py
│   │   ├── resume_analyzer.py
│   │   ├── ai_coach.py
│   │   └── skill_gap.py
│   ├── main.py            # FastAPI application
│   ├── requirements.txt
│   └── README.md
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── pages/        # React pages
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── SkillMatcher.jsx
│   │   │   ├── ResumeAnalyzer.jsx
│   │   │   ├── AICoach.jsx
│   │   │   └── SkillGap.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── DESIGN_DOCUMENTATION.md
└── README.md
```

## 🚀 Getting Started

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your API keys
```

5. **Run the backend server**
```bash
python main.py
```

Backend will be running at: **http://localhost:8000**  
API Documentation: **http://localhost:8000/docs**

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit if needed
```

4. **Run development server**
```bash
npm run dev
```

Frontend will be running at: **http://localhost:5173**

## 🎨 Design System

### Color Palette
- **Cyan**: #00D9FF (Primary)
- **Purple**: #B026FF (Secondary)
- **Pink**: #FF006B (Accent)
- **Green**: #00FF94 (Success)
- **Background**: #0a0a0f (Dark)

### UI Features
- Futuristic neon-glow theme
- Glassmorphism effects
- Smooth animations with Framer Motion
- Responsive grid layouts
- Premium gradient backgrounds

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Main Endpoints

#### Dashboard API
- `GET /api/dashboard/score` - Get AI career score
- `GET /api/dashboard/progress` - Get career progress
- `GET /api/dashboard/recommendations` - Get AI recommendations

#### Skill Matcher API
- `POST /api/skill-matcher/match` - Match skills with jobs
- `GET /api/skill-matcher/trending-skills` - Get trending skills

#### Resume Analyzer API
- `POST /api/resume-analyzer/upload` - Upload and analyze resume
- `POST /api/resume-analyzer/improve` - Get improvement suggestions

#### AI Coach API
- `POST /api/ai-coach/chat` - Chat with AI coach
- `GET /api/ai-coach/interview-questions` - Get interview questions

#### Skill Gap API
- `POST /api/skill-gap/analyze` - Analyze skill gaps
- `GET /api/skill-gap/learning-paths` - Get learning paths

## 🔧 Development

### Backend Development
```bash
cd backend
python main.py  # Runs with auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Runs with HMR (Hot Module Replacement)
```

## 📦 Building for Production

### Backend
```bash
cd backend
# Deploy using Docker, AWS, GCP, or Azure
```

### Frontend
```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

## 🚀 Deployment

### Backend Options
- AWS Elastic Beanstalk / ECS / Lambda
- Google Cloud Run / App Engine
- Azure App Service
- Heroku
- DigitalOcean App Platform

### Frontend Options
- Vercel (Recommended)
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting

## 📝 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_key
DATABASE_URL=postgresql://user:password@localhost/dbname
SECRET_KEY=your_secret_key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AI Career Nexus
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- React team for the framework
- Tailwind CSS for styling
- All open-source contributors

---

**Built with ❤️ for the Hackathon**
