# Python Installation Guide for AI Career Nexus

## Problem
The backend requires Python, but it's not currently installed on your system.

## Quick Fix - Install Python

### Step 1: Download Python
1. Go to https://www.python.org/downloads/
2. Click **"Download Python 3.12.x"** (or latest version)
3. Run the installer

### Step 2: During Installation
**⚠️ CRITICAL: Check this box during installation:**
```
☑️ Add Python 3.12 to PATH
```

Without this, Python won't work in PowerShell!

### Step 3: Complete Installation
1. Click "Install Now"
2. Wait for installation to complete
3. Click "Close"

### Step 4: Verify Installation
Open a **NEW** PowerShell window and run:
```powershell
python --version
```

You should see:
```
Python 3.12.x
```

### Step 5: Install Backend Dependencies
```powershell
cd d:\HACKTHON\backend
pip install -r requirements.txt
```

This installs:
- FastAPI (web framework)
- SQLAlchemy (database)
- Bcrypt (password hashing)
- JWT (authentication tokens)
- And 20+ other packages

### Step 6: Start the Backend
```powershell
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Or use the automated script:
```powershell
cd d:\HACKTHON
.\start-backend.ps1
```

## Expected Output
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## Troubleshooting

### "Python not found" after installation
- Close ALL PowerShell windows
- Open a NEW PowerShell window
- If still not working, restart your computer

### "Add to PATH" option was missed
Uninstall Python and reinstall, making sure to check the PATH checkbox.

Or manually add to PATH:
1. Search "Environment Variables" in Windows
2. Click "Environment Variables"
3. Under "System variables", find "Path"
4. Click "Edit"
5. Click "New"
6. Add: `C:\Users\YOUR_USERNAME\AppData\Local\Programs\Python\Python312`
7. Add: `C:\Users\YOUR_USERNAME\AppData\Local\Programs\Python\Python312\Scripts`
8. Click OK on all dialogs
9. Restart PowerShell

### pip not working
```powershell
python -m pip --version
```

### Port 8000 already in use
```powershell
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual number)
taskkill /PID 12345 /F
```

## Quick Test After Installation

1. **Test Python:**
   ```powershell
   python -c "print('Python works!')"
   ```

2. **Test pip:**
   ```powershell
   pip --version
   ```

3. **Install one package:**
   ```powershell
   pip install fastapi
   ```

4. **Test import:**
   ```powershell
   python -c "import fastapi; print('FastAPI installed!')"
   ```

## Alternative: Use Anaconda (Recommended for Data Science)

If you prefer Anaconda:

1. Download from https://www.anaconda.com/download
2. Install Anaconda
3. Open "Anaconda Prompt" (not regular PowerShell)
4. Run:
   ```bash
   cd d:\HACKTHON\backend
   pip install -r requirements.txt
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## What Gets Installed

The `requirements.txt` contains:

### Core Backend
- **fastapi** - Web framework for building APIs
- **uvicorn** - ASGI server to run FastAPI
- **pydantic** - Data validation

### Authentication (New!)
- **SQLAlchemy** - Database ORM
- **passlib** - Password hashing with bcrypt
- **python-jose** - JWT token creation

### AI/ML
- **openai** - GPT integration
- **anthropic** - Claude integration
- **transformers** - Hugging Face models
- **torch** - PyTorch for ML
- **scikit-learn** - ML algorithms
- **spacy** - NLP

### Resume Processing
- **PyPDF2** - PDF parsing
- **python-docx** - Word document processing
- **pdfplumber** - Advanced PDF extraction
- **pytesseract** - OCR for images
- **Pillow** - Image processing

### Data & Utilities
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **httpx** - Async HTTP client
- **requests** - HTTP library
- **python-dotenv** - Environment variables

**Total Size:** ~2-3 GB (includes PyTorch)

**Installation Time:** 5-10 minutes (depending on internet speed)

## After Installation

Once Python is installed and dependencies are ready:

### Start Both Servers

**Terminal 1 - Backend:**
```powershell
cd d:\HACKTHON\backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```powershell
cd d:\HACKTHON
npm run dev
```

### Access the Application
- **Frontend:** http://localhost:5175
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

### Test Authentication
1. Go to http://localhost:5175
2. Click "Sign Up"
3. Create account:
   - Username: testuser
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click "Create Account"
5. You'll be logged in! 🎉

The user data is stored in `d:\HACKTHON\backend\career_nexus.db`

## Need Help?

**Check Installation Status:**
```powershell
python --version        # Should show Python 3.x.x
pip --version          # Should show pip version
pip list               # Shows all installed packages
```

**Reinstall Everything:**
```powershell
pip uninstall -r requirements.txt -y
pip install -r requirements.txt
```

**Update pip:**
```powershell
python -m pip install --upgrade pip
```
