# Start AI Career Nexus Project

Write-Host "Starting AI Career Nexus..." -ForegroundColor Cyan

# Start Backend
Write-Host "`nStarting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\HACKTHON1\backend; D:/HACKTHON1/.venv/Scripts/python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\HACKTHON1\frontend; npm run dev"

Write-Host "`n✅ Project started!" -ForegroundColor Green
Write-Host "Backend: http://localhost:8000" -ForegroundColor White
Write-Host "Backend API Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
