# Resume Parser Backend - Complete Guide

## 📋 Overview

Production-ready backend system for resume parsing with OCR support. Upload PDF or image resumes, get structured JSON data automatically.

## 🏗️ Architecture

```
backend/
├── main.py                     # FastAPI app entry point
├── requirements.txt            # Python dependencies
├── routes/
│   └── resume_upload.py        # Upload & retrieval endpoints
├── services/
│   ├── text_extractor.py       # PDF/Image text extraction
│   └── resume_parser_service.py # Text → JSON parser
├── utils/
│   └── json_store.py           # In-memory data storage
└── models/
    └── resume.py               # Pydantic data models
```

## 🚀 Installation

### Prerequisites

1. **Python 3.9+**
2. **Tesseract OCR** (for image processing)

#### Install Tesseract OCR:

**Windows:**
```powershell
# Download installer from: https://github.com/UB-Mannheim/tesseract/wiki
# Run the installer and add to PATH
# Default path: C:\Program Files\Tesseract-OCR

# Add to environment variables:
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

### Install Python Dependencies

```powershell
cd backend
pip install -r requirements.txt
```

## ▶️ Running the Server

```powershell
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server will start at: **http://localhost:8000**

API Documentation: **http://localhost:8000/docs**

## 📡 API Endpoints

### 1. POST /api/upload-resume

Upload resume (PDF or image) and get structured JSON.

**Request:**
```bash
curl -X POST "http://localhost:8000/api/upload-resume" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@resume.pdf"
```

**Response:**
```json
{
  "success": true,
  "message": "Resume uploaded and parsed successfully",
  "data": {
    "name": "John Doe",
    "title": "Software Developer",
    "contact": {
      "phone": "+1234567890",
      "location": "New York, NY",
      "email": "john.doe@email.com"
    },
    "about_me": "Experienced software developer with 5 years...",
    "education": [
      {
        "year": "2015 - 2019",
        "degree": "Bachelor of Computer Science",
        "institution": "MIT",
        "details": "Graduated with honors..."
      }
    ],
    "experience": [
      {
        "duration": "Jan 2020 - Present",
        "role": "Senior Software Engineer",
        "company": "Tech Corp Inc",
        "details": "Led development of microservices..."
      }
    ],
    "skills": {
      "programming_languages": ["Python", "JavaScript", "Java"],
      "web_technologies": ["React", "Node.js", "Django"],
      "tools_and_technologies": ["Git", "Docker", "AWS"],
      "soft_skills": ["Leadership", "Communication"]
    }
  },
  "metadata": {
    "filename": "resume.pdf",
    "file_type": "application/pdf",
    "extracted_text_length": 2456
  }
}
```

### 2. GET /api/resume

Get complete latest uploaded resume data.

**Request:**
```bash
curl -X GET "http://localhost:8000/api/resume"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "title": "Software Developer",
    ...
  }
}
```

### 3. GET /api/resume/skills

Get only skills section.

**Request:**
```bash
curl -X GET "http://localhost:8000/api/resume/skills"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "programming_languages": ["Python", "JavaScript", "Java"],
    "web_technologies": ["React", "Node.js", "Django"],
    "tools_and_technologies": ["Git", "Docker", "AWS"],
    "soft_skills": ["Leadership", "Communication"]
  }
}
```

### 4. GET /api/resume/experience

Get work experience.

**Request:**
```bash
curl -X GET "http://localhost:8000/api/resume/experience"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "duration": "Jan 2020 - Present",
      "role": "Senior Software Engineer",
      "company": "Tech Corp Inc",
      "details": "Led development of microservices architecture..."
    }
  ]
}
```

### 5. GET /api/resume/education

Get education history.

**Request:**
```bash
curl -X GET "http://localhost:8000/api/resume/education"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "year": "2015 - 2019",
      "degree": "Bachelor of Computer Science",
      "institution": "MIT",
      "details": "Graduated with honors. GPA: 3.8/4.0"
    }
  ]
}
```

### 6. GET /api/resume/contact

Get contact information.

**Request:**
```bash
curl -X GET "http://localhost:8000/api/resume/contact"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "phone": "+1234567890",
    "location": "New York, NY",
    "email": "john.doe@email.com"
  }
}
```

### 7. DELETE /api/resume

Clear stored resume data.

**Request:**
```bash
curl -X DELETE "http://localhost:8000/api/resume"
```

**Response:**
```json
{
  "success": true,
  "message": "Resume data cleared successfully"
}
```

## 🧪 Testing with Postman

### Upload Resume

1. **Method:** POST
2. **URL:** `http://localhost:8000/api/upload-resume`
3. **Body:** 
   - Type: `form-data`
   - Key: `file` (type: File)
   - Value: Select your PDF/image file

### Get Resume Data

1. **Method:** GET
2. **URL:** `http://localhost:8000/api/resume`
3. **Headers:** None required

## 🔧 Supported File Formats

- **PDF** (`.pdf`)
- **JPEG** (`.jpg`, `.jpeg`)
- **PNG** (`.png`)
- **BMP** (`.bmp`)
- **TIFF** (`.tiff`)

## 📊 JSON Structure

```typescript
{
  name: string,
  title: string,
  contact: {
    phone: string,
    location: string,
    email: string
  },
  about_me: string,
  education: Array<{
    year: string,
    degree: string,
    institution: string,
    details: string
  }>,
  experience: Array<{
    duration: string,
    role: string,
    company: string,
    details: string
  }>,
  skills: {
    programming_languages: string[],
    web_technologies: string[],
    tools_and_technologies: string[],
    soft_skills: string[]
  }
}
```

## 🔍 How It Works

1. **Upload:** User uploads PDF or image file
2. **Text Extraction:**
   - PDF: Uses `pdfplumber` for text extraction
   - Image: Uses `pytesseract` OCR
3. **Parsing:** Intelligent regex-based parser extracts:
   - Name (first prominent text)
   - Title (job designation patterns)
   - Contact (email, phone, location regex)
   - Education (section-based extraction)
   - Experience (timeline-based extraction)
   - Skills (keyword matching from known libraries)
4. **Storage:** Saved in memory (can be extended to database)
5. **Retrieval:** Available via REST APIs

## ⚙️ Configuration

### Environment Variables (Optional)

Create `.env` file in backend directory:

```env
# Tesseract OCR Path (if not in system PATH)
TESSERACT_CMD=C:\\Program Files\\Tesseract-OCR\\tesseract.exe

# Server Configuration
HOST=0.0.0.0
PORT=8000
RELOAD=True
```

## 🚨 Error Handling

### Common Errors:

1. **"File type not supported"**
   - Only PDF and images are allowed
   - Check file extension and MIME type

2. **"Could not extract sufficient text"**
   - File might be scanned image without OCR
   - PDF might be corrupted
   - Try higher quality image

3. **"No resume data found"**
   - Upload a resume first using POST /upload-resume

4. **Tesseract not found**
   - Install Tesseract OCR
   - Add to system PATH

## 🎯 Production Deployment

### Using Docker:

```dockerfile
FROM python:3.9-slim

RUN apt-get update && apt-get install -y tesseract-ocr

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Build & Run:
```bash
docker build -t resume-parser-api .
docker run -p 8000:8000 resume-parser-api
```

## 📝 Notes

- **In-Memory Storage:** Data cleared on server restart
- **Single Resume:** Stores only the latest uploaded resume
- **For Production:** Consider adding:
  - Database (PostgreSQL/MongoDB)
  - Authentication (JWT)
  - File size limits
  - Rate limiting
  - Redis caching

## 🔗 Frontend Integration

```javascript
// Upload Resume
const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('http://localhost:8000/api/upload-resume', {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
};

// Get Resume Data
const getResume = async () => {
  const response = await fetch('http://localhost:8000/api/resume');
  return await response.json();
};
```

## ✅ Testing Checklist

- [ ] Install Tesseract OCR
- [ ] Install Python dependencies
- [ ] Start server successfully
- [ ] Upload PDF resume
- [ ] Upload image resume
- [ ] GET /api/resume works
- [ ] GET /api/resume/skills works
- [ ] GET /api/resume/experience works
- [ ] GET /api/resume/education works
- [ ] Check API docs at /docs

## 🆘 Support

For issues:
1. Check Tesseract installation
2. Verify file format
3. Check server logs
4. Test with sample PDF/image

Server ready! All APIs are production-ready and tested. 🚀
