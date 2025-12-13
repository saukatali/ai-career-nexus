# Restart Backend Server
Write-Host "Restarting Backend Server..." -ForegroundColor Cyan

# Kill existing Python processes running uvicorn
Get-Process | Where-Object {$_.ProcessName -eq "python" -and $_.CommandLine -like "*uvicorn*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment
Start-Sleep -Seconds 2

# Change to backend directory
Set-Location D:\HACKTHON1\backend

# Start server in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'AI Career Nexus Backend Server' -ForegroundColor Cyan; Write-Host 'http://localhost:8000' -ForegroundColor Green; Write-Host ''; D:/HACKTHON1/.venv/Scripts/python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

Write-Host "Backend server restarted!" -ForegroundColor Green
Write-Host "Server: http://localhost:8000" -ForegroundColor White
Write-Host "API Docs: http://localhost:8000/docs" -ForegroundColor White
