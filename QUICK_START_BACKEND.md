# Quick Start - Resume Parser Backend

## 🚀 Quick Installation (Windows)

### Step 1: Install Tesseract OCR

1. Download: https://github.com/UB-Mannheim/tesseract/wiki
2. Run installer (choose default options)
3. Add to PATH:
   ```powershell
   setx PATH "%PATH%;C:\Program Files\Tesseract-OCR"
   ```
4. Restart terminal

### Step 2: Install Python Dependencies

```powershell
cd D:\HACKTHON\backend
pip install -r requirements.txt
```

### Step 3: Start Server

```powershell
python -m uvicorn main:app --reload
```

✅ Server running at: http://localhost:8000

## 📡 Quick Test

### Test 1: Upload JSON Resume (No OCR needed)

```powershell
# Use the existing parse-json endpoint
curl -X POST "http://localhost:8000/resume/parse-json" ^
  -H "Content-Type: application/json" ^
  -d @../sample-resume.json
```

### Test 2: Check API Docs

Open in browser: http://localhost:8000/docs

### Test 3: Test Upload (with real PDF)

1. Go to http://localhost:8000/docs
2. Find POST /api/upload-resume
3. Click "Try it out"
4. Upload a PDF resume
5. Execute

## 🎯 Available Endpoints

```
POST   /api/upload-resume      Upload PDF/image resume
GET    /api/resume             Get complete resume data
GET    /api/resume/skills      Get skills only
GET    /api/resume/experience  Get experience only
GET    /api/resume/education   Get education only
GET    /api/resume/contact     Get contact only
DELETE /api/resume             Clear stored data
```

## ⚡ Quick Frontend Integration

```javascript
// Upload file from input
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('http://localhost:8000/api/upload-resume', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  console.log(result.data); // Resume JSON
};
```

## 🔥 Production Ready Features

✅ PDF text extraction (pdfplumber)  
✅ Image OCR (pytesseract)  
✅ Intelligent resume parsing  
✅ Structured JSON output  
✅ Dynamic REST APIs  
✅ Clean architecture  
✅ Error handling  
✅ CORS enabled  
✅ Auto-generated docs  

## 📝 Notes

- First time setup needs Tesseract installation
- Data stored in memory (resets on restart)
- Supports PDF, JPG, PNG, BMP, TIFF
- Production-ready code structure

Need help? Check BACKEND_SETUP_GUIDE.md for detailed docs!
