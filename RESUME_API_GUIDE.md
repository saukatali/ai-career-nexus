# Resume Parser API Integration

## API Endpoint

**POST** `/resume/parse-json`

Parses structured resume data in JSON format and returns analysis.

## Request Format

```json
{
  "name": "Your Name",
  "title": "Job Title",
  "contact": {
    "phone": "+1234567890",
    "location": "City, Country",
    "email": "your.email@example.com"
  },
  "about_me": "Brief description about yourself",
  "education": [
    {
      "year": "2020 - 2024",
      "degree": "Bachelor of Science",
      "institution": "University Name",
      "details": "Details about your education"
    }
  ],
  "experience": [
    {
      "duration": "Jan 2023 - Present",
      "role": "Job Title",
      "company": "Company Name",
      "details": "Description of your work"
    }
  ],
  "skills": {
    "programming_languages": ["Python", "JavaScript"],
    "web_technologies": ["React", "Node.js"],
    "tools_and_technologies": ["Git", "Docker"],
    "soft_skills": ["Communication", "Teamwork"]
  }
}
```

## Response Format

```json
{
  "success": true,
  "message": "Resume parsed successfully",
  "data": {
    // Your original resume data
  },
  "analysis": {
    "overall_score": 87,
    "total_skills": 18,
    "experience_count": 1,
    "education_count": 2,
    "profile_completeness": 95
  }
}
```

## How to Use

### 1. Using the Frontend (Recommended)

1. Navigate to Resume Analyzer page at `http://localhost:5174/resume-analyzer`
2. Click or drag & drop your JSON resume file
3. The file will be automatically parsed and analyzed
4. View your parsed data and analysis results

### 2. Using cURL

```bash
curl -X POST http://localhost:8000/resume/parse-json \
  -H "Content-Type: application/json" \
  -d @sample-resume.json
```

### 3. Using Python

```python
import requests
import json

# Load your resume data
with open('sample-resume.json', 'r') as f:
    resume_data = json.load(f)

# Send to API
response = requests.post(
    'http://localhost:8000/resume/parse-json',
    json=resume_data
)

result = response.json()
print(f"Overall Score: {result['analysis']['overall_score']}")
```

### 4. Using JavaScript/Fetch

```javascript
const resumeData = {
  name: "Your Name",
  title: "Job Title",
  // ... rest of your data
};

fetch('http://localhost:8000/resume/parse-json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(resumeData)
})
.then(response => response.json())
.then(data => console.log(data));
```

## Running the Backend

Make sure your backend is running before using the API:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## Sample File

A sample resume JSON file (`sample-resume.json`) is included in the root directory for testing.

## Features

- ✅ Structured JSON parsing
- ✅ Automatic score calculation
- ✅ Skills counting
- ✅ Profile completeness analysis
- ✅ Beautiful UI display of parsed data
- ✅ Real-time parsing and analysis
- ✅ Error handling
- ✅ Support for multiple file formats (JSON, PDF, DOCX)

## Error Handling

If you encounter errors:

1. **"Invalid JSON format"** - Make sure your JSON is valid
2. **"Failed to parse resume"** - Check if backend is running
3. **CORS Error** - Backend CORS is already configured for localhost

## Next Steps

- Upload your own resume in JSON format
- View the structured data display
- Get AI-powered analysis and scoring
- Download improved version (coming soon)
