# AI Career Nexus - Backend Setup Script
# This script installs Python dependencies and starts the backend server

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  AI Career Nexus - Backend Setup  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Python from: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "During installation, make sure to CHECK 'Add Python to PATH'" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host ""

# Navigate to backend directory
Write-Host "Navigating to backend directory..." -ForegroundColor Yellow
Set-Location -Path "d:\HACKTHON\backend"
Write-Host "✓ Current directory: $PWD" -ForegroundColor Green
Write-Host ""

# Check if requirements.txt exists
if (Test-Path "requirements.txt") {
    Write-Host "✓ Found requirements.txt" -ForegroundColor Green
} else {
    Write-Host "✗ requirements.txt not found!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""

# Install dependencies
Write-Host "Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
Write-Host "Installing: FastAPI, SQLAlchemy, JWT, Bcrypt, and more..." -ForegroundColor Cyan
Write-Host ""

try {
    python -m pip install --upgrade pip
    python -m pip install -r requirements.txt
    Write-Host ""
    Write-Host "✓ All dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Starting Backend Server...        " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API: http://localhost:8000" -ForegroundColor Green
Write-Host "API Docs: http://localhost:8000/docs" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5175" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the backend server
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
