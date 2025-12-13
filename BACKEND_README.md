# 🎯 Resume Parser Backend - Complete System

A production-ready FastAPI backend that extracts text from PDF/image resumes, converts it to structured JSON, and provides dynamic REST APIs for data retrieval.

## ✨ Features

- 📄 **PDF Text Extraction** - Extract text from PDF resumes using pdfplumber
- 🖼️ **OCR Support** - Extract text from image resumes (JPG, PNG, etc.) using Tesseract
- 🧠 **Intelligent Parsing** - Convert raw text into structured JSON with AI-powered regex patterns
- 🔗 **Dynamic REST APIs** - Multiple endpoints to retrieve full or partial resume data
- 💾 **In-Memory Storage** - Fast data access (can be extended to database)
- 📚 **Auto-Generated Docs** - Interactive API documentation at /docs
- 🌐 **CORS Enabled** - Ready for frontend integration
- ✅ **Production Ready** - Clean architecture, error handling, validation

## 🏗️ System Architecture

```
backend/
├── main.py                          # FastAPI app & routing
├── requirements.txt                 # Python dependencies
│
├── routes/
│   └── resume_upload.py            # File upload & data retrieval endpoints
│
├── services/
│   ├── text_extractor.py           # PDF/Image → Text extraction
│   └── resume_parser_service.py    # Text → Structured JSON parsing
│
├── utils/
│   └── json_store.py               # In-memory data storage
│
└── models/
    └── resume.py                    # Pydantic data models
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload-resume` | Upload PDF/image and get structured JSON |
| GET | `/api/resume` | Get complete resume data |
| GET | `/api/resume/skills` | Get skills section only |
| GET | `/api/resume/experience` | Get experience section only |
| GET | `/api/resume/education` | Get education section only |
| GET | `/api/resume/contact` | Get contact information only |
| DELETE | `/api/resume` | Clear stored resume data |

## 🚀 Quick Start

### Option 1: Automated Installation (Windows)

```powershell
# Double-click or run:
install_backend.bat
```

### Option 2: Manual Installation

#### Step 1: Install Tesseract OCR

**Windows:**
```powershell
# Download: https://github.com/UB-Mannheim/tesseract/wiki
# Install to: C:\Program Files\Tesseract-OCR
# Add to PATH:
setx PATH "%PATH%;C:\Program Files\Tesseract-OCR"
```

**Mac:**
```bash
brew install tesseract
```

**Linux:**
```bash
sudo apt-get install tesseract-ocr
```

#### Step 2: Install Dependencies

```powershell
cd backend
pip install -r requirements.txt
```

#### Step 3: Start Server

```powershell
# Using batch file:
run_backend.bat

# Or manually:
python -m uvicorn main:app --reload
```

✅ **Server running at:** http://localhost:8000  
📚 **API Docs:** http://localhost:8000/docs

## 🧪 Testing

### Test 1: Run Test Suite

```powershell
cd backend
python test_api.py
```

### Test 2: Manual API Test

```bash
# Upload resume
curl -X POST "http://localhost:8000/api/upload-resume" \
  -F "file=@your-resume.pdf"

# Get resume data
curl http://localhost:8000/api/resume

# Get skills only
curl http://localhost:8000/api/resume/skills
```

### Test 3: Interactive Docs

Visit: http://localhost:8000/docs

## 📊 JSON Output Format

```json
{
  "name": "John Doe",
  "title": "Software Developer",
  "contact": {
    "phone": "+1234567890",
    "location": "New York, NY",
    "email": "john.doe@email.com"
  },
  "about_me": "Experienced developer with 5 years...",
  "education": [
    {
      "year": "2015 - 2019",
      "degree": "Bachelor of Computer Science",
      "institution": "MIT",
      "details": "Graduated with honors"
    }
  ],
  "experience": [
    {
      "duration": "Jan 2020 - Present",
      "role": "Senior Software Engineer",
      "company": "Tech Corp",
      "details": "Led development of microservices..."
    }
  ],
  "skills": {
    "programming_languages": ["Python", "JavaScript", "Java"],
    "web_technologies": ["React", "Node.js", "Django"],
    "tools_and_technologies": ["Git", "Docker", "AWS"],
    "soft_skills": ["Leadership", "Communication"]
  }
}
```

## 🎨 Frontend Integration

### React Example

```javascript
const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('http://localhost:8000/api/upload-resume', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  console.log(result.data); // Structured resume JSON
};

const getResumeSkills = async () => {
  const response = await fetch('http://localhost:8000/api/resume/skills');
  const data = await response.json();
  return data.data; // Skills object
};
```

### Update Existing Frontend

Your ResumeAnalyzer page already has upload functionality. Just update the endpoint:

```javascript
// In ResumeAnalyzer.jsx
const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('http://localhost:8000/api/upload-resume', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  setResumeData(result.data);
  setShowResults(true);
};
```

## 🔧 Dependencies

```
fastapi==0.109.0          # Web framework
uvicorn==0.27.0           # ASGI server
pydantic==2.5.3           # Data validation
python-multipart==0.0.6   # File upload support
pdfplumber==0.10.3        # PDF text extraction
pytesseract==0.3.10       # OCR for images
Pillow==10.1.0            # Image processing
```

## 📁 Supported File Formats

- ✅ PDF (`.pdf`)
- ✅ JPEG (`.jpg`, `.jpeg`)
- ✅ PNG (`.png`)
- ✅ BMP (`.bmp`)
- ✅ TIFF (`.tiff`)

## 🛠️ How It Works

1. **File Upload** → User uploads resume (PDF/image)
2. **Text Extraction** →
   - PDF: `pdfplumber` extracts text
   - Image: `pytesseract` performs OCR
3. **Parsing** → Regex patterns extract:
   - Name (first prominent text)
   - Title (job designation patterns)
   - Contact (email/phone/location regex)
   - Education (section-based extraction)
   - Experience (timeline-based extraction)
   - Skills (keyword matching)
4. **Storage** → Saved in memory (JSONStore singleton)
5. **Retrieval** → Available via REST APIs

## 🚨 Troubleshooting

### "Tesseract not found"
- Install Tesseract OCR
- Add to system PATH
- Restart terminal

### "Module not found"
```powershell
pip install -r requirements.txt
```

### "Port already in use"
```powershell
# Use different port:
uvicorn main:app --reload --port 8001
```

### "Could not extract text"
- Ensure file is not corrupted
- Try higher quality image
- Check if PDF is text-based (not scanned image)

## 📈 Production Deployment

### Docker Deployment

```dockerfile
FROM python:3.9-slim

RUN apt-get update && apt-get install -y tesseract-ocr

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t resume-parser .
docker run -p 8000:8000 resume-parser
```

### Environment Variables

Create `.env` file:

```env
TESSERACT_CMD=/usr/bin/tesseract
HOST=0.0.0.0
PORT=8000
```

## 🎯 Next Steps

- [ ] Add database persistence (PostgreSQL/MongoDB)
- [ ] Implement user authentication (JWT)
- [ ] Add file size limits and validation
- [ ] Implement rate limiting
- [ ] Add Redis caching
- [ ] Support for DOCX files
- [ ] AI-powered skill matching
- [ ] Resume scoring algorithm

## 📚 Documentation

- **Full Guide:** [BACKEND_SETUP_GUIDE.md](BACKEND_SETUP_GUIDE.md)
- **Quick Start:** [QUICK_START_BACKEND.md](QUICK_START_BACKEND.md)
- **API Docs:** http://localhost:8000/docs (when server running)

## 🤝 Integration with Frontend

This backend is designed to work seamlessly with your AI Career Nexus frontend. Simply:

1. Start backend: `run_backend.bat`
2. Start frontend: `npm run dev`
3. Upload resume via ResumeAnalyzer page
4. Data automatically parsed and displayed

## ✅ Status

✅ PDF extraction working  
✅ Image OCR ready  
✅ Intelligent parsing implemented  
✅ All endpoints functional  
✅ Error handling complete  
✅ CORS configured  
✅ Production-ready architecture  
✅ Documentation complete  

## 📞 Support

For detailed information, check:
- Interactive API docs: http://localhost:8000/docs
- Test script: `python backend/test_api.py`
- Logs: Check terminal output

---

**Ready to use!** 🚀 Start the server and begin uploading resumes!
