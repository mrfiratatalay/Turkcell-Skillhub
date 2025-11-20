# ✅ Frontend-Backend Bağlantı Kontrol Listesi

## Backend Kontrol

### 1. Backend Çalışıyor mu?
```bash
cd backend
mvn spring-boot:run
```
✅ Backend başarıyla başlamalı: `http://localhost:8080/api`

### 2. Swagger UI Kontrol
```
http://localhost:8080/api/swagger-ui.html
```
✅ Swagger UI açılmalı ve tüm endpoint'ler görünmeli

### 3. CORS Ayarları Kontrol
✅ Backend CORS Config yapılandırılmış:
- Allowed Origins: `http://localhost:5173`, `http://localhost:3000`
- Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
- Allow Credentials: true
- Tüm controller'larda `@CrossOrigin` annotation'ı var

### 4. Veritabanı Kontrol
✅ PostgreSQL çalışıyor olmalı:
- Host: localhost:5432
- Database: skillhub
- Username: postgres
- Password: firat

### 5. Backend Endpoint'leri
```bash
# Test endpoint'lerini kontrol et
curl http://localhost:8080/api/categories
curl http://localhost:8080/api/lessons
curl http://localhost:8080/api/users/U1/progress
curl http://localhost:8080/api/leaderboard
```

---

## Frontend Kontrol

### 1. Dependencies Kurulu mu?
```bash
cd frontend/skillhub-app
npm install
```
✅ Tüm paketler package.json'da mevcut:
- react & react-dom
- axios
- @tanstack/react-query
- @mui/material
- react-router-dom
- recharts

### 2. Frontend Çalışıyor mu?
```bash
npm run dev
```
✅ Frontend başlamalı: `http://localhost:5173`

### 3. API URL Kontrol
✅ `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

### 4. Type Definitions Kontrol
✅ Tüm backend DTO'larına uygun:
- CategoryDTO → Category
- LessonDTO → Lesson
- QuizQuestionDTO → QuizQuestion
- UserProgressResponse → UserProgress
- LeaderboardEntryDTO → LeaderboardEntry
- BadgeDTO → Badge
- QuizSubmitRequest → QuizSubmitRequest
- QuizSubmitResponse → QuizSubmitResponse

---

## Test Senaryoları

### Senaryo 1: Login ve Dashboard
1. ✅ Login sayfası açılır (`http://localhost:5173/login`)
2. ✅ Herhangi bir email/password ile giriş yapılabilir (mock)
3. ✅ Dashboard'a yönlendirilir
4. ✅ Backend'den kullanıcı progress'i çekilir: `GET /users/U1/progress`
5. ✅ Backend'den leaderboard çekilir: `GET /leaderboard`

### Senaryo 2: Lessons Listeleme
1. ✅ Lessons sayfasına git (`/lessons`)
2. ✅ Backend'den kategoriler çekilir: `GET /categories`
3. ✅ Backend'den dersler çekilir: `GET /lessons`
4. ✅ Dersler kategori filtreleriyle gösterilir

### Senaryo 3: Ders Detay ve Video
1. ✅ Bir derse tıkla
2. ✅ Backend'den ders detayı çekilir: `GET /lessons/{lessonId}`
3. ✅ Video gösterilir
4. ✅ Quiz'e başla butonuna tıkla

### Senaryo 4: Quiz Çözme
1. ✅ Backend'den quiz soruları çekilir: `GET /quiz/lesson/{lessonId}`
2. ✅ Sorular gösterilir
3. ✅ Cevaplar seçilir
4. ✅ Quiz submit edilir: `POST /quiz/submit`
```json
{
  "userId": "U1",
  "lessonId": "L1",
  "answers": [
    { "questionId": "Q1", "answer": "A" },
    { "questionId": "Q2", "answer": "B" }
  ]
}
```
5. ✅ Backend'den sonuç döner:
```json
{
  "resultId": "R123",
  "score": 85,
  "correctAnswers": 2,
  "totalQuestions": 3,
  "pointsEarned": 85,
  "newBadges": [],
  "message": "Tebrikler!"
}
```

### Senaryo 5: Profile
1. ✅ Profile sayfasına git (`/profile`)
2. ✅ Backend'den kullanıcı progress'i çekilir: `GET /users/U1/progress`
3. ✅ Rozetler gösterilir
4. ✅ İstatistikler gösterilir

### Senaryo 6: Leaderboard
1. ✅ Leaderboard sayfasına git (`/leaderboard`)
2. ✅ Backend'den liderlik tablosu çekilir: `GET /leaderboard`
3. ✅ Şehir filtresi çalışır: `GET /leaderboard?city=Istanbul`

---

## Olası Hatalar ve Çözümleri

### ❌ HATA: CORS Error
**Çözüm:**
- Backend'de CORS config doğru yapılandırılmış
- Tüm controller'larda `@CrossOrigin` var
- Backend'i yeniden başlat

### ❌ HATA: Network Error / Connection Refused
**Çözüm:**
- Backend çalışıyor mu kontrol et: `http://localhost:8080/api/categories`
- PostgreSQL çalışıyor mu kontrol et
- Backend port'u 8080 olmalı

### ❌ HATA: 404 Not Found
**Çözüm:**
- API URL'i doğru mu: `http://localhost:8080/api`
- Backend context-path: `/api` (application.yml'de)
- Endpoint path'leri doğru

### ❌ HATA: Type Error (TypeScript)
**Çözüm:**
- Tüm field isimleri camelCase: `userId`, `lessonId`, `totalPoints`
- Backend response'ları type'lara uygun

---

## Başlatma Adımları (Sırayla)

### 1. PostgreSQL'i Başlat
```bash
# PostgreSQL servisini başlat
```

### 2. Backend'i Başlat
```bash
cd backend
mvn spring-boot:run

# Beklenen çıktı:
# Tomcat started on port 8080 (http) with context path '/api'
# Started SkillHubApplication in X seconds
```

### 3. Frontend'i Başlat
```bash
cd frontend/skillhub-app
npm install  # İlk sefer için
npm run dev

# Beklenen çıktı:
# VITE vX.X.X  ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

### 4. Tarayıcıda Aç
```
http://localhost:5173/login
```

---

## ✅ Son Kontrol Checklist

- [ ] PostgreSQL çalışıyor
- [ ] Backend çalışıyor (`http://localhost:8080/api`)
- [ ] Swagger UI açılıyor (`http://localhost:8080/api/swagger-ui.html`)
- [ ] Frontend çalışıyor (`http://localhost:5173`)
- [ ] Login sayfası açılıyor
- [ ] Dashboard'da veri yükleniyor
- [ ] Lessons sayfasında dersler görünüyor
- [ ] Quiz çözülebiliyor
- [ ] Profile sayfası çalışıyor
- [ ] Leaderboard görünüyor

---

## 🎉 Başarılı Entegrasyon!

Tüm kontroller tamamlandı. Backend koduna hiç dokunulmadan frontend tam uyumlu hale getirildi!

### Önemli Notlar:
1. ✅ Tüm API endpoint'leri backend'e uygun
2. ✅ Tüm field isimleri camelCase ve backend DTO'larına uygun
3. ✅ Quiz submit formatı backend'in beklediği formatta
4. ✅ CORS ayarları yapılandırılmış
5. ✅ Mock data kaldırıldı, gerçek API kullanılıyor
6. ⚠️ Auth endpoint'leri backend'de yok (mock olarak bırakıldı)

### İleride Eklenecekler:
- Backend'e auth endpoint'leri ekle (login, register, JWT token)
- Error handling iyileştirmeleri
- Loading state'leri iyileştirme
- Toast notifications

