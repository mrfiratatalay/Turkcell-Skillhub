# ============================================
# SkillHub Backend - Basit Başlatma Scripti
# ============================================

Write-Host "=== SkillHub Backend Baslatiliyor ===" -ForegroundColor Green

# Set PostgreSQL password
$env:PGPASSWORD = "firat"

# PostgreSQL kontrolü
Write-Host "`n[1/4] PostgreSQL kontrol ediliyor..." -ForegroundColor Cyan
$pgPort = netstat -ano | findstr :5432
if (-not $pgPort) {
    Write-Host "[HATA] PostgreSQL calisimiyor!" -ForegroundColor Red
    Write-Host "[COZUM] PostgreSQL servisini baslat veya services.msc'den PostgreSQL servisini baslat" -ForegroundColor Yellow
    exit 1
}
Write-Host "[OK] PostgreSQL calisiyor (Port 5432)" -ForegroundColor Green

# Find psql
Write-Host "`n[2/4] PostgreSQL psql araniyor..." -ForegroundColor Cyan
$psqlPath = $null

# Try where.exe first
try {
    $wherePsql = where.exe psql 2>$null
    if ($wherePsql) {
        $psqlPath = $wherePsql[0]
        Write-Host "[OK] psql bulundu: $psqlPath" -ForegroundColor Green
    }
} catch { }

# Try common paths
if (-not $psqlPath) {
    $altPaths = @(
        "C:\Program Files\PostgreSQL\18\bin\psql.exe",
        "C:\Program Files\PostgreSQL\17\bin\psql.exe",
        "C:\Program Files\PostgreSQL\16\bin\psql.exe",
        "C:\Program Files\PostgreSQL\15\bin\psql.exe",
        "C:\Program Files\PostgreSQL\14\bin\psql.exe"
    )
    
    foreach ($path in $altPaths) {
        if (Test-Path $path) {
            $psqlPath = $path
            Write-Host "[OK] psql bulundu: $psqlPath" -ForegroundColor Green
            break
        }
    }
}

# Database kontrolü
Write-Host "`n[3/4] Database 'skillhub' kontrol ediliyor..." -ForegroundColor Cyan
if ($psqlPath) {
    try {
        $dbCheck = & $psqlPath -U postgres -t -c "SELECT 1 FROM pg_database WHERE datname = 'skillhub';" 2>$null
        if ($dbCheck -match "1") {
            Write-Host "[OK] Database 'skillhub' mevcut!" -ForegroundColor Green
        } else {
            Write-Host "[UYARI] Database 'skillhub' bulunamadi!" -ForegroundColor Yellow
            Write-Host "[COZUM] .\setup-database.ps1 calistir" -ForegroundColor Yellow
            $response = Read-Host "Devam etmek istiyor musun? (E/H)"
            if ($response -ne "E" -and $response -ne "e") {
                exit 1
            }
        }
    } catch {
        Write-Host "[UYARI] Database kontrolu yapilamadi (devam ediliyor)" -ForegroundColor Yellow
    }
} else {
    Write-Host "[UYARI] psql bulunamadi, database kontrolu atlanıyor" -ForegroundColor Yellow
}

# Backend başlat
Write-Host "`n[4/4] Backend baslatiliyor..." -ForegroundColor Cyan
Write-Host "[INFO] API: http://localhost:8080/api" -ForegroundColor Cyan
Write-Host "[INFO] Swagger: http://localhost:8080/api/swagger-ui.html" -ForegroundColor Cyan
Write-Host ""

# JAR dosyasını çalıştır
$jarPath = ".\target\skillhub-backend-1.0.0.jar"

if (Test-Path $jarPath) {
    Write-Host "[OK] JAR dosyasi bulundu" -ForegroundColor Green
    Write-Host "[INFO] Backend baslatiliyor... Lutfen bekleyin..." -ForegroundColor Yellow
    Write-Host ""
    
    java -jar $jarPath
} else {
    Write-Host "[HATA] JAR dosyasi bulunamadi!" -ForegroundColor Red
    Write-Host "[COZUM] Once mvn clean package calistir" -ForegroundColor Yellow
    exit 1
}

