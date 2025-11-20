# ============================================
# SkillHub Hızlı Kontrol Scripti
# ============================================

Write-Host "=== SkillHub Sistem Kontrolu ===" -ForegroundColor Green

# PostgreSQL password
$env:PGPASSWORD = "firat"

# 1. PostgreSQL Servis Kontrolü
Write-Host "`n[1/5] PostgreSQL Servis Kontrolu..." -ForegroundColor Cyan
$pgService = Get-Service -Name "*postgre*" -ErrorAction SilentlyContinue
if ($pgService) {
    if ($pgService.Status -eq "Running") {
        Write-Host "[OK] PostgreSQL Servisi: Calisiyor" -ForegroundColor Green
    } else {
        Write-Host "[UYARI] PostgreSQL Servisi: Durmus" -ForegroundColor Yellow
        Write-Host "[INFO] Baslatmak icin: services.msc'den PostgreSQL servisini baslat" -ForegroundColor White
    }
} else {
    Write-Host "[UYARI] PostgreSQL Servisi bulunamadi" -ForegroundColor Yellow
}

# 2. PostgreSQL Port Kontrolü
Write-Host "`n[2/5] PostgreSQL Port Kontrolu (5432)..." -ForegroundColor Cyan
$pgPort = netstat -ano | findstr :5432
if ($pgPort) {
    Write-Host "[OK] PostgreSQL Port 5432'de dinliyor" -ForegroundColor Green
} else {
    Write-Host "[HATA] PostgreSQL Port 5432'de dinlemiyor!" -ForegroundColor Red
}

# 3. psql Yolu Bulma
Write-Host "`n[3/5] psql Yolu Bulunuyor..." -ForegroundColor Cyan
$psqlPath = $null

# PATH'te ara
try {
    $wherePsql = where.exe psql 2>$null
    if ($wherePsql) {
        $psqlPath = $wherePsql[0]
        Write-Host "[OK] psql PATH'te bulundu: $psqlPath" -ForegroundColor Green
    }
} catch { }

# Standart yerlerde ara
if (-not $psqlPath) {
    $paths = @(
        "C:\Program Files\PostgreSQL\18\bin\psql.exe",
        "C:\Program Files\PostgreSQL\17\bin\psql.exe",
        "C:\Program Files\PostgreSQL\16\bin\psql.exe",
        "C:\Program Files\PostgreSQL\15\bin\psql.exe",
        "C:\PostgreSQL\18\bin\psql.exe"
    )
    
    foreach ($path in $paths) {
        if (Test-Path $path) {
            $psqlPath = $path
            $psqlDir = Split-Path $path
            Write-Host "[OK] psql bulundu: $path" -ForegroundColor Green
            Write-Host "[INFO] PATH'e eklemek icin:" -ForegroundColor Yellow
            Write-Host "       `$env:PATH += ';$psqlDir'" -ForegroundColor White
            break
        }
    }
}

if (-not $psqlPath) {
    Write-Host "[UYARI] psql bulunamadi!" -ForegroundColor Yellow
    Write-Host "[INFO] PostgreSQL yolu bulunarak PATH'e eklenebilir" -ForegroundColor Yellow
}

# 4. Database Kontrolü
Write-Host "`n[4/5] Database 'skillhub' Kontrolu..." -ForegroundColor Cyan
if ($psqlPath) {
    try {
        $dbList = & $psqlPath -U postgres -t -c "SELECT datname FROM pg_database;" 2>$null
        if ($dbList -match "skillhub") {
            Write-Host "[OK] Database 'skillhub' mevcut!" -ForegroundColor Green
        } else {
            Write-Host "[UYARI] Database 'skillhub' bulunamadi!" -ForegroundColor Yellow
            Write-Host "[COZUM] .\setup-database.ps1 calistir" -ForegroundColor White
        }
        
        # Tüm database'leri göster
        Write-Host "[INFO] Mevcut database'ler:" -ForegroundColor Cyan
        $dbList.Split("`n") | Where-Object { $_.Trim() } | ForEach-Object {
            Write-Host "       - $($_.Trim())" -ForegroundColor White
        }
    } catch {
        Write-Host "[HATA] Database'e baglanılamadı!" -ForegroundColor Red
        Write-Host "[INFO] Kullanici: postgres, Sifre: firat" -ForegroundColor Yellow
    }
} else {
    Write-Host "[ATLANDI] psql bulunamadigi icin database kontrolu yapilamadi" -ForegroundColor Yellow
}

# 5. JAR Dosyası Kontrolü
Write-Host "`n[5/5] Backend JAR Kontrolu..." -ForegroundColor Cyan
$jarPath = ".\target\skillhub-backend-1.0.0.jar"
if (Test-Path $jarPath) {
    $jarSize = (Get-Item $jarPath).Length / 1MB
    Write-Host "[OK] JAR dosyasi mevcut: $([math]::Round($jarSize, 2)) MB" -ForegroundColor Green
} else {
    Write-Host "[UYARI] JAR dosyasi bulunamadi!" -ForegroundColor Yellow
    Write-Host "[INFO] target klasoru mevcut, JAR onceden compile edilmis" -ForegroundColor Yellow
}

# Özet
Write-Host "`n=== OZET ===" -ForegroundColor Green
Write-Host "[HAZIRLIK]" -ForegroundColor Cyan
Write-Host "  1. PostgreSQL servisini baslat (eger durmusa)" -ForegroundColor White
Write-Host "  2. .\setup-database.ps1 calistir (eger database yoksa)" -ForegroundColor White
Write-Host "`n[BASLAT]" -ForegroundColor Cyan
Write-Host "  .\BASIT-BASLAT.ps1" -ForegroundColor White
Write-Host ""

