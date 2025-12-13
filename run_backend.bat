@echo off
echo ========================================
echo Starting Resume Parser Backend Server
echo ========================================
echo.

cd backend

echo Server starting at http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
