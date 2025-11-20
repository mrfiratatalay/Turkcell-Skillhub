# SkillHub API Dokümantasyonu

## 📚 Genel Bakış

SkillHub API, gençler için dijital beceri gelişim platformunun backend servisidir. Bu API, kullanıcı yönetimi, eğitim içerikleri, quiz sistemi, rozet kazanımı ve liderlik tablosu özelliklerini REST API üzerinden sağlar.

## 🚀 Hızlı Başlangıç

### Backend'i Başlatma

```bash
cd backend
mvn spring-boot:run
```

Backend başarıyla ayağa kalktığında şu mesajı göreceksiniz:
```
Tomcat started on port 8080 (http) with context path '/api'
Started SkillHubApplication in X seconds
```

### Swagger UI'ya Erişim

Backend çalıştıktan sonra Swagger UI'ya şu adresten erişebilirsiniz:

🔗 **http://localhost:8080/api/swagger-ui.html**

API JSON dokümantasyonu:
🔗 **http://localhost:8080/api/api-docs**

## 📍 API Endpoint'leri

### Base URL
```
http://localhost:8080/api
```

---

## 1️⃣ Eğitim Kategorileri

### Tüm Kategorileri Listele
```http
GET /categories
```

**Yanıt Örneği:**
```json
[
  {
    "categoryId": "C1",
    "name": "Yapay Zeka ve Makine Öğrenmesi",
    "description": "Yapay zeka temellerinden derin öğrenmeye kadar..."
  }
]
```

### Kategori Detayı
```http
GET /categories/{categoryId}
```

**Parametreler:**
- `categoryId` (path) - Kategori ID'si (örn: C1, C2)

---

## 2️⃣ Eğitim Dersleri

### Dersleri Listele
```http
GET /lessons?categoryId={categoryId}
```

**Query Parametreleri:**
- `categoryId` (opsiyonel) - Kategori ID'si ile filtreleme

**Yanıt Örneği:**
```json
[
  {
    "lessonId": "L1",
    "categoryId": "C1",
    "title": "Yapay Zekaya Giriş",
    "description": "Yapay zeka nedir, temel kavramlar...",
    "durationMin": 30,
    "difficulty": "BEGINNER",
    "videoUrl": "https://youtube.com/watch?v=xyz"
  }
]
```

### Ders Detayı
```http
GET /lessons/{lessonId}
```

**Parametreler:**
- `lessonId` (path) - Ders ID'si (örn: L1, L2)

---

## 3️⃣ Quiz Sistemi

### Derse Ait Quiz Sorularını Getir
```http
GET /quiz/lesson/{lessonId}
```

**Parametreler:**
- `lessonId` (path) - Ders ID'si (örn: L1, L2)

**Yanıt Örneği:**
```json
[
  {
    "questionId": "Q1",
    "lessonId": "L1",
    "questionText": "Yapay zeka nedir?",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "correctAnswer": "A"
  }
]
```

### Quiz Cevaplarını Gönder
```http
POST /quiz/submit
```

**İstek Gövdesi:**
```json
{
  "userId": "U1",
  "lessonId": "L1",
  "answers": [
    {
      "questionId": "Q1",
      "selectedAnswer": "A"
    },
    {
      "questionId": "Q2",
      "selectedAnswer": "B"
    }
  ]
}
```

**Yanıt Örneği:**
```json
{
  "score": 85,
  "correctCount": 2,
  "wrongCount": 1,
  "totalQuestions": 3,
  "passed": true,
  "earnedBadges": [
    {
      "badgeId": "B1",
      "name": "Motivasyon Rozeti",
      "awardedAt": "2025-11-20T22:35:00"
    }
  ]
}
```

**Otomatik Rozet Kuralları:**
- 🏆 **Motivasyon Rozeti**: 3+ ders tamamlandığında
- 🌟 **Uzman Rozeti**: 10+ quizde %80+ başarı sağlandığında

---

## 4️⃣ Kullanıcı Yönetimi

### Kullanıcı İlerlemesini Getir
```http
GET /users/{userId}/progress
```

**Parametreler:**
- `userId` (path) - Kullanıcı ID'si (örn: U1, U2)

**Yanıt Örneği:**
```json
{
  "userId": "U1",
  "name": "Ahmet Yılmaz",
  "totalPoints": 450,
  "completedLessons": 5,
  "totalLessons": 10,
  "completionRate": 50.0,
  "successRate": 85.5,
  "skillLevel": "INTERMEDIATE",
  "badges": [
    {
      "badgeId": "B1",
      "name": "Motivasyon Rozeti",
      "awardedAt": "2025-11-20T10:00:00"
    }
  ],
  "badgeCount": 1
}
```

---

## 5️⃣ Liderlik Tablosu

### Liderlik Tablosunu Getir
```http
GET /leaderboard?city={city}
```

**Query Parametreleri:**
- `city` (opsiyonel) - Şehir filtresi (örn: İstanbul, Ankara)

**Yanıt Örneği:**
```json
[
  {
    "userId": "U1",
    "rank": 1,
    "name": "Ahmet Yılmaz",
    "totalPoints": 850,
    "city": "İstanbul"
  },
  {
    "userId": "U2",
    "rank": 2,
    "name": "Ayşe Demir",
    "totalPoints": 720,
    "city": "Ankara"
  }
]
```

---

## 🎯 İş Kuralları

### Puan Sistemi
- Her quiz tamamlandığında kullanıcı puanı artırılır
- Puan = (Doğru Cevap Sayısı / Toplam Soru Sayısı) × 100
- Başarılı kabul: %60 ve üzeri

### Rozet Sistemi

#### Motivasyon Rozeti 🏆
- **Koşul**: En az 3 ders tamamlama
- **Otomatik**: Quiz submit edildiğinde kontrol edilir
- **Tekil**: Kullanıcı başına bir kez verilir

#### Uzman Rozeti 🌟
- **Koşul**: En az 10 quizde %80+ başarı
- **Otomatik**: Quiz submit edildiğinde kontrol edilir
- **Tekil**: Kullanıcı başına bir kez verilir

### Seviye Sistemi
- **BEGINNER**: 0-299 puan
- **INTERMEDIATE**: 300-599 puan
- **ADVANCED**: 600+ puan

---

## 🔧 Teknik Detaylar

### Teknoloji Stack
- **Framework**: Spring Boot 3.5.8
- **Database**: PostgreSQL 18
- **ORM**: Hibernate/JPA
- **API Doc**: Swagger/OpenAPI 3.0
- **Build**: Maven

### Veritabanı
- **Port**: 5432
- **Database**: skillhub
- **Username**: postgres
- **Seed Data**: CSV dosyalarından otomatik yüklenir

### CORS Ayarları
- Frontend portları: 5173, 3000
- Tüm HTTP metodları: GET, POST, PUT, DELETE, OPTIONS
- Credentials: Destekleniyor

---

## 📊 HTTP Durum Kodları

| Kod | Açıklama |
|-----|----------|
| 200 | Başarılı istek |
| 201 | Kaynak oluşturuldu |
| 400 | Geçersiz istek |
| 404 | Kaynak bulunamadı |
| 500 | Sunucu hatası |

---

## 🧪 Test Örnekleri

### cURL ile Test

```bash
# Kategorileri listele
curl http://localhost:8080/api/categories

# Ders detayını getir
curl http://localhost:8080/api/lessons/L1

# Quiz sorularını getir
curl http://localhost:8080/api/quiz/lesson/L1

# Kullanıcı ilerlemesini getir
curl http://localhost:8080/api/users/U1/progress

# Liderlik tablosu (İstanbul)
curl http://localhost:8080/api/leaderboard?city=İstanbul

# Quiz cevaplarını gönder
curl -X POST http://localhost:8080/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "U1",
    "lessonId": "L1",
    "answers": [
      {"questionId": "Q1", "selectedAnswer": "A"},
      {"questionId": "Q2", "selectedAnswer": "B"}
    ]
  }'
```

### PowerShell ile Test

```powershell
# Kategorileri listele
Invoke-WebRequest -Uri "http://localhost:8080/api/categories" -UseBasicParsing

# Quiz cevaplarını gönder
$body = @{
    userId = "U1"
    lessonId = "L1"
    answers = @(
        @{ questionId = "Q1"; selectedAnswer = "A" },
        @{ questionId = "Q2"; selectedAnswer = "B" }
    )
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/api/quiz/submit" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

---

## 🎓 Demo Verileri

Sistem başladığında aşağıdaki demo verileri otomatik yüklenir:

- **4 Kategori**: Yapay Zeka, Web Geliştirme, Mobil Uygulama, Veri Bilimi
- **4 Ders**: Her kategoriden örnek dersler
- **3 Kullanıcı**: Test için hazır kullanıcılar (U1, U2, U3)
- **3 Quiz Sorusu**: Örnek sorular
- **3 Quiz Sonucu**: Geçmiş quiz kayıtları
- **3 Rozet**: Örnek rozet kayıtları
- **3 Liderlik Kaydı**: Sıralı kullanıcı verileri

---

## 📞 Destek

Sorularınız için:
- **Email**: skillhub@turkcell.com.tr
- **Swagger UI**: http://localhost:8080/api/swagger-ui.html

---

**SkillHub API v1.0.0** - Turkcell Code Night 2025

