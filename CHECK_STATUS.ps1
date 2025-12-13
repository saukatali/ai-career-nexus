# AI Career Nexus - System Status Checker
# This script checks if everything is properly set up

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  AI Career Nexus - System Status Check  " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Node.js
Write-Host "[1/5] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "  [OK] Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  [X] Node.js not found!" -ForegroundColor Red
    Write-Host "    Install from: https://nodejs.org/" -ForegroundColor Yellow
    $allGood = $false
}

Write-Host ""

# Check npm
Write-Host "[2/5] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>&1
    Write-Host "  [OK] npm: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  [X] npm not found!" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# Check Python
Write-Host "[3/5] Checking Python..." -ForegroundColor Yellow
try {
    $pythonCmd = Get-Command python -ErrorAction Stop
    $pythonPath = $pythonCmd.Source
    
    # Check if it's the Windows Store stub
    if ($pythonPath -like "*WindowsApps*") {
        Write-Host "  [X] Python not installed (Windows Store placeholder detected)" -ForegroundColor Red
        Write-Host "    Install from: https://www.python.org/downloads/" -ForegroundColor Yellow
        Write-Host "    IMPORTANT: Check 'Add Python to PATH' during installation!" -ForegroundColor Yellow
        $allGood = $false
    } else {
        $pythonVersion = python --version 2>&1
        Write-Host "  [OK] Python: $pythonVersion" -ForegroundColor Green
        Write-Host "    Path: $pythonPath" -ForegroundColor Gray
    }
} catch {
    Write-Host "  [X] Python not found!" -ForegroundColor Red
    Write-Host "    Install from: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "    IMPORTANT: Check 'Add Python to PATH' during installation!" -ForegroundColor Yellow
    $allGood = $false
}

Write-Host ""

# Check pip
Write-Host "[4/5] Checking pip..." -ForegroundColor Yellow
try {
    $pythonCmd = Get-Command python -ErrorAction Stop
    if ($pythonCmd.Source -notlike "*WindowsApps*") {
        $pipVersion = pip --version 2>&1
        Write-Host "  [OK] pip: $pipVersion" -ForegroundColor Green
    } else {
        Write-Host "  [X] pip not available (Python not installed)" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host "  [X] pip not found!" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# Check if frontend dependencies are installed
Write-Host "[5/5] Checking Frontend Dependencies..." -ForegroundColor Yellow
if (Test-Path "d:\HACKTHON\node_modules") {
    $packageCount = (Get-ChildItem "d:\HACKTHON\node_modules" -Directory).Count
    Write-Host "  [OK] Node modules installed ($packageCount packages)" -ForegroundColor Green
} else {
    Write-Host "  [X] Node modules not installed" -ForegroundColor Red
    Write-Host "    Run: npm install" -ForegroundColor Yellow
    $allGood = $false
}

Write-Host ""

# Check if backend dependencies are installed
Write-Host "[BONUS] Checking Backend Dependencies..." -ForegroundColor Yellow
try {
    $pythonCmd = Get-Command python -ErrorAction Stop
    if ($pythonCmd.Source -notlike "*WindowsApps*") {
        Set-Location "d:\HACKTHON\backend"
        $fastApiCheck = python -c "import fastapi; print('OK')" 2>&1
        if ($fastApiCheck -like "*OK*") {
            Write-Host "  [OK] Backend dependencies installed" -ForegroundColor Green
        } else {
            Write-Host "  [X] Backend dependencies not installed" -ForegroundColor Red
            Write-Host "    Run: pip install -r requirements.txt" -ForegroundColor Yellow
            $allGood = $false
        }
    } else {
        Write-Host "  [-] Skipped (Python not installed)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  [-] Skipped (Python not installed)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "  [OK] ALL SYSTEMS GO!" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Ready to run:" -ForegroundColor Green
    Write-Host "  Frontend: npm run dev" -ForegroundColor White
    Write-Host "  Backend:  .\start-backend.ps1" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "  [!] SETUP REQUIRED" -ForegroundColor Yellow
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Please fix the issues above before running the application." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quick Setup Guide:" -ForegroundColor Cyan
    Write-Host "  1. Install Python from: https://www.python.org/downloads/" -ForegroundColor White
    Write-Host "     (Check 'Add Python to PATH' during installation!)" -ForegroundColor Gray
    Write-Host "  2. Run: pip install -r backend\requirements.txt" -ForegroundColor White
    Write-Host "  3. Run: npm install (if needed)" -ForegroundColor White
    Write-Host ""
    Write-Host "See INSTALL_PYTHON.md for detailed instructions." -ForegroundColor Cyan
}

Write-Host ""
