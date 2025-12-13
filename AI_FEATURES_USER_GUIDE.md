# AI Features - User Guide 🚀

## How to Use the Dynamic AI Features

---

## 🤖 AI Coach

**Location:** Dashboard → AI Coach

### What It Does:
Have real conversations with an AI career coach powered by Gemini. Get help with interview preparation, career advice, and skill development.

### How to Use:

1. **Select Interview Mode:**
   - **Behavioral Interview** - Practice STAR method responses
   - **Technical Interview** - Coding challenges and system design
   - **Mock Interview** - Full interview simulation
   - **Career Chat** - General career guidance

2. **Chat with AI:**
   - Type your question or response in the input field
   - Press Enter or click Send
   - AI will respond with personalized, intelligent feedback
   - Conversation history is maintained for context

3. **Get Feedback:**
   - In interview modes, you may receive feedback scores:
     - Tone (communication style)
     - Clarity (how clear your answer was)
     - Confidence (delivery strength)
     - Structure (organization of response)

### Example Prompts:
- "Tell me about a time you faced a challenging project"
- "How would you design a URL shortening service?"
- "What salary should I expect as a senior developer in San Francisco?"
- "How do I improve my system design skills?"

---

## 📊 Skill Gap Analytics

**Location:** Dashboard → Skill Gap & Analytics

### What It Does:
Get AI-powered analysis of your skill gaps with personalized learning roadmaps.

### How to Use:

1. **Auto-Analysis:**
   - Page automatically analyzes your skills on load
   - Shows current skills vs. target role requirements

2. **Manual Analysis:**
   - Click "AI Analysis" button in the header
   - Waits for Gemini to generate insights
   - Results appear in the AI-Powered Insights section

3. **Review Insights:**
   - **Top 5 Priority Skills** - What to learn next
   - **Learning Timelines** - How long each skill takes
   - **Recommended Resources** - Where to learn
   - **Career Impact** - Why each skill matters
   - **Personalized Roadmap** - Step-by-step plan

### What You'll See:
- Radar chart of current vs. desired skills
- Missing skills heatmap with importance ratings
- Weekly growth tracking
- Recommended courses
- Learning roadmap timeline

---

## 🎯 Skill Matcher (Job Matching)

**Location:** Dashboard → Skill-to-Job Matching

### What It Does:
Match your skills to jobs and get AI-powered career recommendations.

### How to Use:

1. **Set Your Preferences:**
   - **Desired Role:** e.g., "Senior Full Stack Developer"
   - **Location:** e.g., "San Francisco" or "Remote" (optional)

2. **Add Your Skills:**
   - Type skill name and press Enter or click +
   - Use AI suggestions below the input
   - Browse trending skills from the API
   - Remove skills by clicking X on the chip

3. **Find Matching Jobs:**
   - Click "Find Matching Jobs" button
   - AI generates insights about your career opportunities
   - Backend fetches real job matches from database

4. **Review AI Insights:**
   - **Top 3 Recommended Roles** with match percentages
   - **Key Strengths** for each role
   - **Skills to Develop** for better matches
   - **Industry Insights** and salary expectations
   - **Career Growth Opportunities**

5. **Apply to Jobs:**
   - Click "Apply Now" on any job card
   - Fill in your details:
     - Full Name
     - Email
     - Phone
     - Upload Resume/CV
     - Cover Letter

6. **Generate AI Cover Letter:** 🎉
   - In the application form, click "Generate with AI"
   - AI creates a personalized cover letter based on:
     - Your skills
     - Job requirements
     - Company information
   - Edit the generated text as needed
   - Submit application

### What You'll See:
- AI career insights panel (if analysis ran)
- Job cards with:
  - Match percentage (color-coded)
  - Company and location
  - Salary range
  - Required skills (highlighted if you have them)
  - Missing skills (what you need to learn)
  - Number of applicants

---

## 📄 Resume Analyzer

**Location:** Dashboard → Resume Analyzer

### What It Does:
Upload your resume and get AI-powered analysis with improvement suggestions.

### How to Use:

1. **Upload Resume:**
   - Drag & drop PDF/DOCX file
   - Or click to browse
   - File uploads automatically

2. **Wait for Analysis:**
   - Gemini AI analyzes your resume
   - Extracts skills, experience, education
   - Calculates scores across 6 metrics

3. **Review Analysis:**
   - **Overall Score** - Radial progress chart
   - **Detailed Scores:**
     - Content Quality
     - Keyword Optimization
     - Formatting
     - ATS Compatibility
     - Impact & Achievements
     - Overall Effectiveness
   - **AI Insights:**
     - Strengths (what you did well)
     - Improvements (what to fix)
   - **Keywords:**
     - Missing keywords to add
     - Suggested skills to include

4. **Generate Better Resume:**
   - Click "Generate Better Resume with AI"
   - AI creates an improved version
   - Downloads as markdown file
   - Use it as a template or direct replacement

---

## 🎨 Common UI Elements

### Loading States:
- Spinner animation when AI is processing
- "Analyzing...", "Generating...", etc. text
- Button disabled during loading

### AI Indicators:
- ⚡ Sparkles icon = AI-powered feature
- Neon green borders = AI sections
- Glass morphism design = Premium features

### Error Handling:
- If AI fails, you'll see a friendly error message
- Most features have fallback behavior
- Try again if you see an error

---

## 💡 Tips for Best Results

### AI Coach:
- Be specific in your questions
- Provide context when needed
- Use different modes for different practice types
- Review feedback scores to improve

### Skill Gap:
- Keep your skills list up to date
- Update target role as you grow
- Review recommendations regularly
- Track your progress weekly

### Skill Matcher:
- Add all relevant skills (10-15 recommended)
- Be specific with desired role
- Use AI cover letter generator for better applications
- Customize AI-generated cover letter before submitting

### Resume Analyzer:
- Use recent resume version
- Upload clean PDF/DOCX format
- Review all AI suggestions carefully
- Edit generated resume to add personal touch

---

## ⚙️ Technical Notes

### API Key:
- All features use the same Gemini API key
- Located in `.env` files
- Model: `gemini-2.0-flash-exp`

### Rate Limits:
- Gemini API has rate limits
- If you hit limits, wait a few minutes
- Don't spam the AI features

### Privacy:
- Your data is sent to Google Gemini API
- Backend processes some data locally
- Resume content is not stored permanently

---

## 🐛 Troubleshooting

### "AI is not responding"
- Check your internet connection
- Verify API key is valid
- Try refreshing the page

### "Failed to generate"
- Click the button again
- Check console for errors (F12)
- Ensure you have all required fields filled

### "Loading forever"
- Refresh the page
- Check backend is running (port 8000)
- Check frontend is running (port 5173)

### Backend not starting:
```powershell
# From d:\HACKTHON1\backend
python -m uvicorn main:app --reload --port 8000
```

### Frontend not starting:
```powershell
# From d:\HACKTHON1\frontend
npm run dev
```

---

## 📞 Support

If you encounter issues:
1. Check the console (F12) for errors
2. Review `PROBLEMS_AND_FIXES.md` for common solutions
3. Check `AI_INTEGRATION_COMPLETE.md` for implementation details
4. Review `GEMINI_API_USAGE.md` for API documentation

---

*Last Updated: 2025-12-24*
*Version: 2.0 - Full AI Integration*
