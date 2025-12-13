@echo off
echo ========================================
echo   AI Career Nexus - Starting Backend
echo ========================================
echo.

cd backend

echo Checking for virtual environment...
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing/Updating dependencies...
pip install -q -r requirements.txt

echo.
echo Starting FastAPI server...
echo Backend will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
python main.py
