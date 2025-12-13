# AI Career Nexus - Automated Setup and Run Script
# This script will guide you through Python installation and start both servers

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AI Career Nexus - Setup & Run" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is really installed
$pythonInstalled = $false
try {
    $pythonCmd = Get-Command python -ErrorAction Stop
    $pythonPath = $pythonCmd.Source
    
    if ($pythonPath -notlike "*WindowsApps*") {
        $version = python --version 2>&1
        if ($version -match "Python \d+\.\d+") {
            $pythonInstalled = $true
            Write-Host "[OK] Python is installed: $version" -ForegroundColor Green
        }
    }
} catch {}

if (-not $pythonInstalled) {
    Write-Host "[!] Python is NOT installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Python is required to run the backend server." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "INSTALLATION STEPS:" -ForegroundColor Cyan
    Write-Host "  1. A browser window will open to download Python" -ForegroundColor White
    Write-Host "  2. Click 'Download Python 3.12.x'" -ForegroundColor White
    Write-Host "  3. Run the installer" -ForegroundColor White
    Write-Host "  4. IMPORTANT: Check the box 'Add Python to PATH'" -ForegroundColor Yellow
    Write-Host "  5. Click 'Install Now'" -ForegroundColor White
    Write-Host "  6. After installation, close ALL PowerShell windows" -ForegroundColor White
    Write-Host "  7. Open a NEW PowerShell window" -ForegroundColor White
    Write-Host "  8. Run this script again" -ForegroundColor White
    Write-Host ""
    
    $response = Read-Host "Open Python download page now? (Y/N)"
    if ($response -eq "Y" -or $response -eq "y") {
        Start-Process "https://www.python.org/downloads/"
        Write-Host ""
        Write-Host "Browser opened! Follow the steps above." -ForegroundColor Green
        Write-Host "Run this script again after installing Python." -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "Alternative: See INSTALL_PYTHON.md for detailed instructions" -ForegroundColor Cyan
    pause
    exit
}

Write-Host ""

# Check if backend dependencies are installed
Write-Host "Checking backend dependencies..." -ForegroundColor Yellow
Set-Location "d:\HACKTHON\backend"

$depsInstalled = $false
try {
    $result = python -c "import fastapi; import sqlalchemy; print('OK')" 2>&1
    if ($result -like "*OK*") {
        $depsInstalled = $true
        Write-Host "[OK] Backend dependencies already installed" -ForegroundColor Green
    }
} catch {}

if (-not $depsInstalled) {
    Write-Host "[!] Installing backend dependencies..." -ForegroundColor Yellow
    Write-Host "This will take 5-10 minutes (downloading 2-3 GB)..." -ForegroundColor Cyan
    Write-Host ""
    
    try {
        python -m pip install --upgrade pip --quiet
        python -m pip install -r requirements.txt
        Write-Host "[OK] Dependencies installed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "[X] Failed to install dependencies" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
        pause
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Servers..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Set-Location "d:\HACKTHON\backend"

$backendJob = Start-Job -ScriptBlock {
    Set-Location "d:\HACKTHON\backend"
    python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
}

Start-Sleep -Seconds 3

# Check if backend started
$backendRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/docs" -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
    $backendRunning = $true
} catch {}

if ($backendRunning) {
    Write-Host "[OK] Backend running at http://localhost:8000" -ForegroundColor Green
} else {
    Write-Host "[!] Backend starting (may take a few seconds)..." -ForegroundColor Yellow
}

Write-Host ""

# Start Frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Set-Location "d:\HACKTHON\frontend"

$frontendJob = Start-Job -ScriptBlock {
    Set-Location "d:\HACKTHON\frontend"
    npm run dev
}

Start-Sleep -Seconds 3

Write-Host "[OK] Frontend running at http://localhost:5173" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ALL SYSTEMS RUNNING!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Application URLs:" -ForegroundColor Cyan
Write-Host "  Frontend:  http://localhost:5173" -ForegroundColor White
Write-Host "  Backend:   http://localhost:8000" -ForegroundColor White
Write-Host "  API Docs:  http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "Opening application in browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

# Keep script running and monitor jobs
try {
    while ($true) {
        Start-Sleep -Seconds 5
        
        # Check if jobs are still running
        if ($backendJob.State -ne "Running") {
            Write-Host "[X] Backend stopped unexpectedly!" -ForegroundColor Red
            $backendJob | Receive-Job
            break
        }
        
        if ($frontendJob.State -ne "Running") {
            Write-Host "[X] Frontend stopped unexpectedly!" -ForegroundColor Red
            $frontendJob | Receive-Job
            break
        }
    }
} finally {
    # Cleanup on exit
    Write-Host ""
    Write-Host "Stopping servers..." -ForegroundColor Yellow
    Stop-Job -Job $backendJob -ErrorAction SilentlyContinue
    Stop-Job -Job $frontendJob -ErrorAction SilentlyContinue
    Remove-Job -Job $backendJob -ErrorAction SilentlyContinue
    Remove-Job -Job $frontendJob -ErrorAction SilentlyContinue
    Write-Host "Servers stopped." -ForegroundColor Green
}
