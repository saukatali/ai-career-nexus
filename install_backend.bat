@echo off
echo ========================================
echo Resume Parser Backend - Installation
echo ========================================
echo.

echo [1/3] Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python not found! Please install Python 3.9+
    pause
    exit /b 1
)
echo ✓ Python installed
echo.

echo [2/3] Installing Python dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo [3/3] Installation complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Install Tesseract OCR (for image support):
echo    Download from: https://github.com/UB-Mannheim/tesseract/wiki
echo.
echo 2. Start the server:
echo    run_backend.bat
echo.
echo 3. Test the API:
echo    http://localhost:8000/docs
echo.
pause
