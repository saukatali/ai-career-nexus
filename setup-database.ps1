# Database Setup and Migration Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AI Career Nexus - Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is installed
try {
    $dockerVersion = docker --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Docker not found"
    }
    Write-Host "[OK] Docker is installed: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Docker is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Docker Desktop from:" -ForegroundColor Yellow
    Write-Host "https://www.docker.com/products/docker-desktop/" -ForegroundColor Cyan
    Write-Host ""
    $response = Read-Host "Open Docker download page? (Y/N)"
    if ($response -eq "Y" -or $response -eq "y") {
        Start-Process "https://www.docker.com/products/docker-desktop/"
    }
    exit 1
}

Write-Host ""
Write-Host "Step 1: Stopping any existing database containers..." -ForegroundColor Yellow
docker-compose down -v 2>$null

Write-Host "Step 2: Starting PostgreSQL database container..." -ForegroundColor Yellow
docker-compose up -d

Write-Host "Step 3: Waiting for database to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Check if database is ready
$retries = 0
$maxRetries = 30
while ($retries -lt $maxRetries) {
    $dbReady = docker exec ai_career_nexus_db pg_isready -U ai_career_user -d ai_career_nexus_db 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Database is ready!" -ForegroundColor Green
        break
    }
    $retries++
    Write-Host "  Waiting... ($retries/$maxRetries)" -ForegroundColor Gray
    Start-Sleep -Seconds 2
}

if ($retries -ge $maxRetries) {
    Write-Host "[ERROR] Database failed to start!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 4: Creating initial database migration..." -ForegroundColor Yellow
cd backend
D:/HACKTHON1/.venv/Scripts/python.exe -m alembic revision --autogenerate -m "Initial migration - users table"

Write-Host ""
Write-Host "Step 5: Applying migrations to database..." -ForegroundColor Yellow
D:/HACKTHON1/.venv/Scripts/python.exe -m alembic upgrade head

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Database Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Database Credentials:" -ForegroundColor Yellow
Write-Host "  Host:     localhost" -ForegroundColor White
Write-Host "  Port:     5432" -ForegroundColor White
Write-Host "  Database: ai_career_nexus_db" -ForegroundColor White
Write-Host "  User:     ai_career_user" -ForegroundColor White
Write-Host "  Password: SecurePass2024!" -ForegroundColor White
Write-Host ""
Write-Host "Connection String:" -ForegroundColor Yellow
Write-Host "  postgresql://ai_career_user:SecurePass2024!@localhost:5432/ai_career_nexus_db" -ForegroundColor Cyan
Write-Host ""
Write-Host "To verify tables were created:" -ForegroundColor Yellow
Write-Host '  docker exec -it ai_career_nexus_db psql -U ai_career_user -d ai_career_nexus_db -c "\dt"' -ForegroundColor Gray
Write-Host ""
