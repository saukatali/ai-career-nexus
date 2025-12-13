# Start Backend Server
Write-Host "Starting AI Career Nexus Backend Server..." -ForegroundColor Cyan
Write-Host ""

# Change to backend directory
Set-Location D:\HACKTHON1\backend

# Start server
Write-Host "Server starting on http://localhost:8000" -ForegroundColor Green
Write-Host "API Documentation: http://localhost:8000/docs" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

D:/HACKTHON1/.venv/Scripts/python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
