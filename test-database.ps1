# Quick Database Test Script
Write-Host "Testing Database Connection..." -ForegroundColor Cyan
Write-Host ""

# Test database connection
docker exec ai_career_nexus_db psql -U ai_career_user -d ai_career_nexus_db -c "SELECT version();"

Write-Host ""
Write-Host "Database Tables:" -ForegroundColor Yellow
docker exec ai_career_nexus_db psql -U ai_career_user -d ai_career_nexus_db -c "\dt"

Write-Host ""
Write-Host "Users Table Structure:" -ForegroundColor Yellow
docker exec ai_career_nexus_db psql -U ai_career_user -d ai_career_nexus_db -c "\d users"

Write-Host ""
Write-Host "Current Users:" -ForegroundColor Yellow
docker exec ai_career_nexus_db psql -U ai_career_user -d ai_career_nexus_db -c "SELECT id, username, email, created_at FROM users;"
