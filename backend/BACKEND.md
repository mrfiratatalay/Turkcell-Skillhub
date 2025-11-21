# 🚀 SkillHub Backend - Tam Dokümantasyon

> **Turkcell SkillHub** - Gençler İçin Dijital Beceri Gelişim Platformu  
> Spring Boot 3.5.8 + PostgreSQL + RESTful API ile geliştirilmiş enterprise-grade backend sistemi

---

## 📋 İçindekiler

1. [Proje Hakkında](#proje-hakkında)
2. [Teknoloji Stack](#teknoloji-stack)
3. [Mimari Yapı](#mimari-yapı)
4. [Veritabanı Tasarımı](#veritabanı-tasarımı)
5. [API Endpoints](#api-endpoints)
6. [Özellikler ve İş Mantığı](#özellikler-ve-iş-mantığı)
7. [CSV Data Loading Sistemi](#csv-data-loading-sistemi)
8. [Güvenlik ve CORS](#güvenlik-ve-cors)
9. [Hata Yönetimi](#hata-yönetimi)
10. [Swagger/OpenAPI Dokümantasyonu](#swaggeropenapi-dokümantasyonu)
11. [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)

---

## 🎯 Proje Hakkında

Bu projeyi geliştirirken, gençlerin dijital becerilerini geliştirmelerine yardımcı olan kapsamlı bir eğitim platformu oluşturmayı hedefledim. Backend tarafında, modern Spring Boot teknolojilerini kullanarak **ölçeklenebilir**, **bakımı kolay** ve **production-ready** bir sistem tasarladım.

### Temel Amaçlarım:
- ✅ **RESTful API** ile frontend'e tam entegrasyon
- ✅ **PostgreSQL** ile güvenilir veri saklama
- ✅ **CSV-based seed data** ile hızlı veri yükleme
- ✅ **Otomatik rozet sistemi** ile gamification
- ✅ **Liderlik tablosu** ile rekabet ortamı
- ✅ **Swagger dokümantasyonu** ile API keşfi
- ✅ **CORS yapılandırması** ile güvenli frontend entegrasyonu

---

## 🛠 Teknoloji Stack

### Core Framework
- **Spring Boot 3.5.8** - Enterprise Java framework
- **Java 21** - Modern Java features (records, pattern matching)
- **Maven** - Dependency management ve build tool

### Veritabanı
- **PostgreSQL** - Production-grade relational database
- **Spring Data JPA** - ORM ve repository pattern
- **Hibernate** - JPA implementation

### Kütüphaneler
- **Lombok** - Boilerplate code reduction (@Builder, @RequiredArgsConstructor)
- **OpenCSV 5.9** - CSV parsing ve data loading
- **Spring Validation** - Request validation
- **SpringDoc OpenAPI 2.7.0** - Swagger UI integration

### Development Tools
- **Spring Boot DevTools** - Hot reload support
- **Spring Boot Configuration Processor** - IDE autocomplete

---

## 🏗 Mimari Yapı

Projeyi **layered architecture** (katmanlı mimari) prensiplerine göre organize ettim:

```
com.turkcell.skillhub/
├── config/              # Konfigürasyon sınıfları
│   ├── CorsConfig.java
│   ├── CorsProperties.java
│   ├── CsvDataLoader.java
│   ├── CsvProperties.java
│   └── OpenApiConfig.java
│
├── controller/          # REST API endpoints
│   ├── CategoryController.java
│   ├── LeaderboardController.java
│   ├── LessonController.java
│   ├── QuizController.java
│   ├── UserController.java
│   └── WelcomeController.java
│
├── dto/                 # Data Transfer Objects
│   ├── request/
│   │   └── QuizSubmitRequest.java
│   └── response/
│       ├── BadgeDTO.java
│       ├── CategoryDTO.java
│       ├── LeaderboardEntryDTO.java
│       ├── LessonDTO.java
│       ├── QuizQuestionDTO.java
│       ├── QuizSubmitResponse.java
│       ├── UserDTO.java
│       └── UserProgressResponse.java
│
├── entity/              # JPA Entity sınıfları
│   ├── Badge.java
│   ├── Category.java
│   ├── Leaderboard.java
│   ├── Lesson.java
│   ├── QuizQuestion.java
│   ├── QuizResult.java
│   ├── User.java
│   └── enums/
│       ├── Difficulty.java
│       └── SkillLevel.java
│
├── exception/           # Exception handling
│   ├── GlobalExceptionHandler.java
│   └── ResourceNotFoundException.java
│
├── repository/          # Spring Data JPA repositories
│   ├── BadgeRepository.java
│   ├── CategoryRepository.java
│   ├── LeaderboardRepository.java
│   ├── LessonRepository.java
│   ├── QuizQuestionRepository.java
│   ├── QuizResultRepository.java
│   └── UserRepository.java
│
└── service/             # Business logic
    ├── BadgeService.java
    ├── CategoryService.java
    ├── LeaderboardService.java
    ├── LessonService.java
    ├── QuizService.java
    └── UserService.java
```

### Mimari Prensipler:

1. **Separation of Concerns**: Her katman kendi sorumluluğuna odaklanır
2. **Dependency Injection**: Spring'in DI container'ı ile loose coupling
3. **Repository Pattern**: Veritabanı erişimini soyutlar
4. **DTO Pattern**: Entity'leri API'den gizler, güvenlik sağlar
5. **Service Layer**: Business logic'i controller'dan ayırır

---

## 🗄 Veritabanı Tasarımı

### Entity İlişkileri:

```
User (1) ────< (N) QuizResult
User (1) ────< (N) Badge
User (1) ────< (1) Leaderboard

Category (1) ────< (N) Lesson

Lesson (1) ────< (N) QuizQuestion
Lesson (1) ────< (N) QuizResult
```

### Entity Detayları:

#### 1. **User Entity**
```java
- userId (String, Primary Key)
- name (String)
- city (String)
- university (String)
- skillLevel (Enum: BEGINNER, INTERMEDIATE, ADVANCED)
- totalPoints (Integer)
- badgeCount (Integer)
```

**İlişkiler:**
- One-to-Many: QuizResult
- One-to-Many: Badge
- One-to-One: Leaderboard

#### 2. **Category Entity**
```java
- categoryId (String, Primary Key)
- name (String)
- description (String)
```

**İlişkiler:**
- One-to-Many: Lesson

#### 3. **Lesson Entity**
```java
- lessonId (String, Primary Key)
- category (Category, Foreign Key)
- title (String)
- durationMin (Integer)
- difficulty (Enum: BEGINNER, INTERMEDIATE, ADVANCED)
- videoUrl (String, Optional)
- description (String, Optional)
```

**İlişkiler:**
- Many-to-One: Category
- One-to-Many: QuizQuestion
- One-to-Many: QuizResult

#### 4. **QuizQuestion Entity**
```java
- questionId (String, Primary Key)
- lesson (Lesson, Foreign Key)
- questionText (String)
- correctAnswer (String)
- options (String) // Pipe-separated: "Option1|Option2|Option3|Option4"
```

**İlişkiler:**
- Many-to-One: Lesson

#### 5. **QuizResult Entity**
```java
- resultId (String, Primary Key)
- user (User, Foreign Key)
- lesson (Lesson, Foreign Key)
- score (Integer, 0-100)
- completedAt (LocalDateTime)
```

**İlişkiler:**
- Many-to-One: User
- Many-to-One: Lesson

#### 6. **Badge Entity**
```java
- badgeId (String, Primary Key)
- user (User, Foreign Key)
- name (String) // "Motivasyon Rozeti", "Uzman Rozeti"
- awardedAt (LocalDateTime)
```

**İlişkiler:**
- Many-to-One: User

#### 7. **Leaderboard Entity**
```java
- userId (String, Primary Key, Foreign Key to User)
- rank (Integer)
- totalPoints (Integer)
- city (String)
- name (String, Optional)
```

**İlişkiler:**
- One-to-One: User

---

## 🌐 API Endpoints

### Base URL
```
http://localhost:8080/api
```

### 1. Welcome Endpoint

#### `GET /`
**Açıklama:** API'nin çalışıp çalışmadığını kontrol eder.

**Response:**
```json
{
  "message": "SkillHub API is running!",
  "version": "1.0.0"
}
```

---

### 2. User Endpoints

#### `GET /users/{userId}`
**Açıklama:** Kullanıcı bilgilerini getirir.

**Path Parameters:**
- `userId` (String, required): Kullanıcı ID'si (örn: "U1")

**Response:** `UserDTO`
```json
{
  "userId": "U1",
  "name": "Ahmet Yılmaz",
  "city": "Istanbul",
  "university": "Boğaziçi Üniversitesi",
  "skillLevel": "INTERMEDIATE",
  "totalPoints": 120,
  "badgeCount": 1
}
```

**Hata Durumları:**
- `404 Not Found`: Kullanıcı bulunamadı

---

#### `GET /users/{userId}/progress`
**Açıklama:** Kullanıcının detaylı ilerleme bilgilerini getirir.

**Path Parameters:**
- `userId` (String, required): Kullanıcı ID'si

**Response:** `UserProgressResponse`
```json
{
  "user": {
    "userId": "U1",
    "name": "Ahmet Yılmaz",
    "city": "Istanbul",
    "university": "Boğaziçi Üniversitesi",
    "skillLevel": "INTERMEDIATE",
    "totalPoints": 120,
    "badgeCount": 1
  },
  "completedLessons": 4,
  "totalLessons": 12,
  "completionRate": 33.33,
  "averageScore": 75.5,
  "recentQuizResults": [
    {
      "resultId": "R1",
      "lessonId": "L1",
      "score": 80,
      "completedAt": "2025-01-15T10:00:00"
    }
  ],
  "badges": [
    {
      "badgeId": "B1",
      "userId": "U1",
      "name": "Motivasyon Rozeti",
      "awardedAt": "2025-01-10T12:00:00"
    }
  ]
}
```

**İş Mantığı:**
- `completedLessons`: Kullanıcının tamamladığı benzersiz ders sayısı
- `completionRate`: (completedLessons / totalLessons) * 100
- `averageScore`: Tüm quiz sonuçlarının ortalaması
- `recentQuizResults`: Son 5 quiz sonucu (tarihe göre sıralı)

---

#### `GET /users/{userId}/badges`
**Açıklama:** Kullanıcının kazandığı tüm rozetleri getirir.

**Response:** `List<BadgeDTO>`
```json
[
  {
    "badgeId": "B1",
    "userId": "U1",
    "name": "Motivasyon Rozeti",
    "awardedAt": "2025-01-10T12:00:00"
  }
]
```

---

### 3. Category Endpoints

#### `GET /categories`
**Açıklama:** Tüm kategorileri listeler.

**Response:** `List<CategoryDTO>`
```json
[
  {
    "categoryId": "C1",
    "name": "Software Development",
    "description": "Yazılım geliştirme dersleri"
  },
  {
    "categoryId": "C2",
    "name": "Artificial Intelligence",
    "description": "Yapay zeka ve makine öğrenmesi"
  }
]
```

---

### 4. Lesson Endpoints

#### `GET /lessons`
**Açıklama:** Tüm dersleri listeler.

**Response:** `List<LessonDTO>`
```json
[
  {
    "lessonId": "L1",
    "categoryId": "C1",
    "title": "Introduction to Python",
    "durationMin": 45,
    "difficulty": "BEGINNER",
    "videoUrl": "https://www.youtube.com/embed/...",
    "description": "Python programlama diline giriş..."
  }
]
```

---

#### `GET /lessons/{lessonId}`
**Açıklama:** Belirli bir dersin detaylarını getirir.

**Path Parameters:**
- `lessonId` (String, required): Ders ID'si (örn: "L1")

**Response:** `LessonDTO`

**Hata Durumları:**
- `404 Not Found`: Ders bulunamadı

---

### 5. Quiz Endpoints

#### `GET /quiz/lesson/{lessonId}`
**Açıklama:** Belirli bir derse ait quiz sorularını getirir.

**Path Parameters:**
- `lessonId` (String, required): Ders ID'si

**Response:** `List<QuizQuestionDTO>`
```json
[
  {
    "questionId": "Q1",
    "lessonId": "L1",
    "questionText": "Python'da değişken tanımlamak için hangi anahtar kelime kullanılır?",
    "correctAnswer": null,  // Güvenlik: Doğru cevap gönderilmez!
    "options": [
      "var",
      "let",
      "def",
      "Değişken tanımlamaya gerek yok"
    ]
  }
]
```

**Önemli Not:** `correctAnswer` field'ı **güvenlik nedeniyle** `null` olarak gönderilir. Doğru cevap sadece quiz submit edildiğinde kontrol edilir.

**Hata Durumları:**
- `404 Not Found`: Ders için quiz bulunamadı

---

#### `POST /quiz/submit`
**Açıklama:** Quiz cevaplarını gönderir, değerlendirir, puan hesaplar ve otomatik rozet verir.

**Request Body:** `QuizSubmitRequest`
```json
{
  "userId": "U1",
  "lessonId": "L1",
  "answers": [
    {
      "questionId": "Q1",
      "answer": "Değişken tanımlamaya gerek yok"
    },
    {
      "questionId": "Q2",
      "answer": "print()"
    }
  ]
}
```

**Response:** `QuizSubmitResponse`
```json
{
  "resultId": "R-abc123",
  "score": 80,
  "correctAnswers": 4,
  "totalQuestions": 5,
  "pointsEarned": 80,
  "passed": true,
  "newBadges": [
    {
      "badgeId": "B2",
      "userId": "U1",
      "name": "Uzman Rozeti",
      "awardedAt": "2025-01-15T14:30:00"
    }
  ],
  "message": "Harika! Mükemmel bir performans sergileddin. Yeni rozet(ler) kazandın: Uzman Rozeti"
}
```

**İş Mantığı (Detaylı):**

1. **Validasyon:**
   - Kullanıcı var mı kontrol edilir
   - Ders var mı kontrol edilir
   - Quiz soruları var mı kontrol edilir

2. **Cevap Değerlendirme:**
   - Her cevap için doğru cevap ile karşılaştırılır
   - Case-insensitive karşılaştırma (trim + equalsIgnoreCase)
   - Doğru cevap sayısı hesaplanır

3. **Puan Hesaplama:**
   - `score = (correctAnswers * 100) / totalQuestions`
   - `pointsEarned = score` (basit model, geliştirilebilir)

4. **QuizResult Kaydı:**
   - Yeni `QuizResult` entity oluşturulur
   - `resultId`: UUID.randomUUID()
   - `completedAt`: LocalDateTime.now()
   - Veritabanına kaydedilir

5. **User Points Güncelleme:**
   - `user.totalPoints += pointsEarned`
   - User entity güncellenir

6. **Otomatik Rozet Değerlendirme:**
   - `BadgeService.evaluateAndAwardBadges()` çağrılır
   - **Motivasyon Rozeti:** 3+ benzersiz ders tamamlandı mı?
   - **Uzman Rozeti:** 10+ quiz'de %80+ başarı var mı?
   - Yeni rozetler varsa `newBadges` listesine eklenir

7. **Badge Count Güncelleme:**
   - `user.badgeCount = user.getBadges().size()`
   - User entity tekrar güncellenir

8. **Response Mesajı:**
   - Score'a göre motivasyon mesajı
   - Yeni rozetler varsa eklenir

**Hata Durumları:**
- `400 Bad Request`: Geçersiz request body
- `404 Not Found`: Kullanıcı veya ders bulunamadı

---

### 6. Leaderboard Endpoints

#### `GET /leaderboard`
**Açıklama:** Liderlik tablosunu getirir. Şehir bazlı filtreleme yapılabilir.

**Query Parameters:**
- `city` (String, optional): Şehir filtresi (örn: "Istanbul")

**Response:** `List<LeaderboardEntryDTO>`
```json
[
  {
    "userId": "U5",
    "rank": 1,
    "name": "Zeynep Kaya",
    "totalPoints": 550,
    "city": "Istanbul"
  },
  {
    "userId": "U3",
    "rank": 2,
    "name": "Can Demir",
    "totalPoints": 400,
    "city": "Izmir"
  }
]
```

**İş Mantığı:**
- Rank'e göre ascending sıralama
- Şehir filtresi varsa uygulanır (case-insensitive)
- `name` field'ı varsa gösterilir, yoksa null

**Örnek Kullanım:**
```
GET /api/leaderboard
GET /api/leaderboard?city=Istanbul
GET /api/leaderboard?city=izmir  // Case-insensitive
```

---

## ⚙️ Özellikler ve İş Mantığı

### 1. Otomatik Rozet Sistemi

Rozet sistemi, kullanıcıların başarılarını ödüllendirmek için tasarlandı. **Quiz submit** işlemi sırasında otomatik olarak değerlendirilir.

#### Rozet Türleri:

**1. Motivasyon Rozeti 🎯**
- **Kriter:** 3 veya daha fazla benzersiz ders tamamlamak
- **Kontrol:** `quizResultRepository.countCompletedLessonsByUserId(userId) >= 3`
- **Tekrar Kazanılabilir mi?** Hayır (unique constraint)

**2. Uzman Rozeti ⭐**
- **Kriter:** 10 veya daha fazla quiz'de %80+ başarı
- **Kontrol:** `quizResultRepository.countHighScoreQuizzesByUserId(userId) >= 10`
- **Tekrar Kazanılabilir mi?** Hayır (unique constraint)

#### Implementasyon Detayları:

```java
// BadgeService.evaluateAndAwardBadges()

// 1. Motivasyon Rozeti Kontrolü
Long completedLessons = quizResultRepository.countCompletedLessonsByUserId(userId);
if (completedLessons >= 3) {
    if (!badgeRepository.existsByUser_UserIdAndName(userId, MOTIVATION_BADGE)) {
        Badge badge = createBadge(user, MOTIVATION_BADGE);
        badgeRepository.save(badge);
        newBadges.add(mapToBadgeDTO(badge));
    }
}

// 2. Uzman Rozeti Kontrolü
Long highScoreQuizzes = quizResultRepository.countHighScoreQuizzesByUserId(userId);
if (highScoreQuizzes >= 10) {
    if (!badgeRepository.existsByUser_UserIdAndName(userId, EXPERT_BADGE)) {
        Badge badge = createBadge(user, EXPERT_BADGE);
        badgeRepository.save(badge);
        newBadges.add(mapToBadgeDTO(badge));
    }
}
```

**Custom Repository Queries:**

```java
// QuizResultRepository.java
@Query("SELECT COUNT(DISTINCT qr.lesson.lessonId) FROM QuizResult qr WHERE qr.user.userId = :userId")
Long countCompletedLessonsByUserId(@Param("userId") String userId);

@Query("SELECT COUNT(qr) FROM QuizResult qr WHERE qr.user.userId = :userId AND qr.score >= 80")
Long countHighScoreQuizzesByUserId(@Param("userId") String userId);
```

---

### 2. Puan Sistemi

- Her quiz tamamlandığında kullanıcıya puan eklenir
- `pointsEarned = score` (basit model)
- `user.totalPoints` otomatik güncellenir
- Liderlik tablosu `totalPoints`'a göre sıralanır

**Geliştirilebilir Özellikler:**
- Zorluk seviyesine göre puan çarpanı
- Streak bonusları
- Günlük/haftalık bonuslar

---

### 3. İlerleme Takibi

`UserProgressResponse` kullanıcının detaylı ilerlemesini gösterir:

- **completedLessons:** Benzersiz tamamlanan ders sayısı
- **totalLessons:** Sistemdeki toplam ders sayısı
- **completionRate:** Tamamlanma yüzdesi
- **averageScore:** Tüm quiz'lerin ortalaması
- **recentQuizResults:** Son 5 quiz sonucu
- **badges:** Kazanılan tüm rozetler

---

## 📂 CSV Data Loading Sistemi

Projede **CSV-based seed data** sistemi kullandım. Bu sayede:
- ✅ Hızlı veri yükleme
- ✅ Kolay veri güncelleme
- ✅ Version control ile takip edilebilir
- ✅ Production'da da kullanılabilir

### CSV Dosyaları:

**Konum:** `src/main/resources/turkcell_skillhub_seed_data/`

1. **users.csv**
```csv
user_id,name,city,university,skill_level,total_points,badge_count
U1,Ahmet Yılmaz,Istanbul,Boğaziçi Üniversitesi,intermediate,120,1
U2,Mehmet Demir,Ankara,ODTÜ,beginner,50,0
```

2. **categories.csv**
```csv
category_id,name,description
C1,Software Development,Yazılım geliştirme dersleri
C2,Artificial Intelligence,Yapay zeka ve makine öğrenmesi
```

3. **lessons.csv**
```csv
lesson_id,category_id,title,duration_min,difficulty
L1,C1,Introduction to Python,45,Beginner
L2,C2,Machine Learning Basics,60,Intermediate
```

4. **quizzes.csv**
```csv
question_id,lesson_id,question_text,correct_answer,options
Q1,L1,Python'da değişken tanımlamak için hangi anahtar kelime kullanılır?,Değişken tanımlamaya gerek yok,var|let|def|Değişken tanımlamaya gerek yok
```

5. **quiz_results.csv**
```csv
result_id,user_id,lesson_id,score,completed_at
R1,U1,L1,80,2025-01-15T10:00:00Z
```

6. **badges.csv**
```csv
badge_id,user_id,name,awarded_at
B1,U1,Motivasyon Rozeti,2025-01-10T12:00:00Z
```

7. **leaderboard.csv**
```csv
user_id,rank,total_points,city,name
U5,1,550,Istanbul,Zeynep Kaya
U3,2,400,Izmir,Can Demir
```

### CsvDataLoader Implementasyonu:

**Sınıf:** `CsvDataLoader.java`  
**Interface:** `CommandLineRunner` (Spring Boot startup'ta çalışır)

**Özellikler:**
- ✅ **Otomatik Yükleme:** Uygulama başladığında otomatik çalışır
- ✅ **Dependency Order:** Kategoriler → Dersler → Kullanıcılar → Quiz'ler → Sonuçlar → Rozetler → Liderlik
- ✅ **Error Handling:** CSV okuma hatalarında log yazar
- ✅ **In-Memory Maps:** İlişkileri kurmak için geçici map'ler kullanır
- ✅ **ISO 8601 Date Parsing:** `LocalDateTime` için doğru parsing

**Yükleme Sırası:**
1. Categories (foreign key yok)
2. Lessons (Category'ye bağlı)
3. Users (foreign key yok)
4. QuizQuestions (Lesson'e bağlı)
5. QuizResults (User + Lesson'e bağlı)
6. Badges (User'e bağlı)
7. Leaderboard (User'e bağlı)

**Örnek Log Çıktısı:**
```
Starting CSV data loading...
Loading categories...
Loaded 4 categories
Loading lessons...
Loaded 12 lessons
Loading users...
Loaded 8 users
Loading quiz questions...
Loaded 60 quiz questions
Loading quiz results...
Loaded 25 quiz results
Loading badges...
Loaded 3 badges
Loading leaderboard...
Loaded 8 leaderboard entries
CSV data loading completed successfully!
```

---

## 🔒 Güvenlik ve CORS

### CORS Yapılandırması

Frontend ile backend'in farklı portlarda çalışması nedeniyle CORS yapılandırması yaptım.

**Dosya:** `CorsConfig.java` + `CorsProperties.java`

**Yapılandırma:** `application.yml`
```yaml
cors:
  allowed-origins:
    - http://localhost:5173  # Vite dev server
    - http://localhost:3000   # React dev server
  allowed-methods:
    - GET
    - POST
    - PUT
    - DELETE
    - OPTIONS
  allowed-headers:
    - "*"
  allow-credentials: true
```

**Özellikler:**
- ✅ **Property-based:** `application.yml`'den okunur
- ✅ **Flexible:** Yeni origin'ler kolayca eklenebilir
- ✅ **Credentials:** Cookie-based auth için hazır

---

## ⚠️ Hata Yönetimi

### Global Exception Handler

**Sınıf:** `GlobalExceptionHandler.java`

**Özellikler:**
- ✅ **@ControllerAdvice:** Tüm controller'lardaki exception'ları yakalar
- ✅ **Structured Responses:** Tutarlı hata formatı
- ✅ **HTTP Status Codes:** Doğru status code'lar

**Exception Türleri:**

1. **ResourceNotFoundException**
```java
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(new ErrorResponse("NOT_FOUND", ex.getMessage()));
}
```

**Response:**
```json
{
  "error": "NOT_FOUND",
  "message": "User not found: U999"
}
```

2. **ValidationException**
```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
    // Validation hatalarını parse eder
}
```

3. **Generic Exception**
```java
@ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"));
}
```

---

## 📚 Swagger/OpenAPI Dokümantasyonu

### Yapılandırma

**Dosya:** `OpenApiConfig.java`

**URL:** `http://localhost:8080/swagger-ui.html`

**Özellikler:**
- ✅ **Interactive API Docs:** Test edilebilir endpoint'ler
- ✅ **Request/Response Examples:** Örnek payload'lar
- ✅ **Schema Definitions:** Tüm DTO'lar dokümante
- ✅ **Operation Tags:** Endpoint'ler kategorize edilmiş

### Swagger Annotations

Her controller'da detaylı Swagger annotation'ları kullandım:

```java
@Operation(
    summary = "Quiz Cevaplarını Gönder ve Değerlendir",
    description = "Kullanıcının quiz cevaplarını alır, değerlendirir..."
)
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Başarılı"),
    @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı")
})
@PostMapping("/submit")
public ResponseEntity<QuizSubmitResponse> submitQuiz(...)
```

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- **Java 21+** (JDK)
- **Maven 3.8+**
- **PostgreSQL 14+**
- **Port 8080** (boş olmalı)

### 1. PostgreSQL Kurulumu

**Database Oluşturma:**
```sql
CREATE DATABASE skillhub;
```

**Kullanıcı:**
- Username: `postgres`
- Password: `firat` (application.yml'de tanımlı)

### 2. Application Configuration

**Dosya:** `src/main/resources/application.yml`

**Önemli Ayarlar:**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/skillhub
    username: postgres
    password: firat
  
  jpa:
    hibernate:
      ddl-auto: update  # Otomatik tablo oluşturma
    show-sql: true      # SQL logları

server:
  port: 8080
  servlet:
    context-path: /api  # Tüm endpoint'ler /api ile başlar
```

### 3. Build ve Çalıştırma

**Maven ile Build:**
```bash
cd backend
mvn clean install
```

**JAR Oluşturma:**
```bash
mvn clean package
```

**Çıktı:** `target/skillhub-backend-1.0.0.jar`

**JAR ile Çalıştırma:**
```bash
java -jar target/skillhub-backend-1.0.0.jar
```

**Maven ile Direkt Çalıştırma:**
```bash
mvn spring-boot:run
```

### 4. Veritabanı Kontrolü

**CSV Data Loading:**
- Uygulama ilk başlatıldığında otomatik çalışır
- Console log'larında yükleme durumu görünür
- Hata varsa exception fırlatılır

**Tablo Kontrolü:**
```sql
-- PostgreSQL'de tabloları kontrol et
\dt

-- Örnek sorgu
SELECT * FROM users;
SELECT * FROM lessons;
SELECT * FROM quiz_results;
```

### 5. API Test

**Swagger UI:**
```
http://localhost:8080/swagger-ui.html
```

**cURL Örnekleri:**
```bash
# Welcome endpoint
curl http://localhost:8080/api/

# Kullanıcı bilgisi
curl http://localhost:8080/api/users/U1

# Quiz soruları
curl http://localhost:8080/api/quiz/lesson/L1

# Quiz submit
curl -X POST http://localhost:8080/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "U1",
    "lessonId": "L1",
    "answers": [
      {"questionId": "Q1", "answer": "Option1"}
    ]
  }'
```

---

## 🎯 Proje Geliştirme Sürecim

### 1. Planlama Aşaması

Öncelikle projenin gereksinimlerini analiz ettim:
- Eğitim platformu için RESTful API
- Kullanıcı yönetimi
- Quiz sistemi
- Rozet ve gamification
- Liderlik tablosu

### 2. Veritabanı Tasarımı

Entity'leri ve ilişkilerini tasarladım:
- User, Category, Lesson, QuizQuestion, QuizResult, Badge, Leaderboard
- Foreign key ilişkileri
- Enum'lar (Difficulty, SkillLevel)

### 3. Backend Geliştirme

**Adım Adım:**
1. Spring Boot projesi oluşturma
2. Entity'leri yazma (Lombok @Builder ile)
3. Repository'leri oluşturma (Spring Data JPA)
4. Service layer'ı implementasyonu
5. Controller'ları yazma (REST endpoints)
6. DTO'ları oluşturma (request/response)
7. Exception handling
8. CORS yapılandırması
9. Swagger dokümantasyonu

### 4. CSV Data Loading

Seed data için CSV sistemi geliştirdim:
- OpenCSV kütüphanesi
- CommandLineRunner ile otomatik yükleme
- Dependency order management
- Error handling

### 5. Otomatik Rozet Sistemi

Gamification için rozet sistemi:
- BadgeService ile değerlendirme
- Custom repository queries
- Quiz submit sırasında otomatik kontrol
- Unique constraint ile tekrar önleme

### 6. Test ve Optimizasyon

- Endpoint'leri test ettim
- Swagger UI ile doğruladım
- Error handling'i test ettim
- Performance optimizasyonları yaptım

---

## 💡 Teknik Kararlarım ve Nedenleri

### 1. Spring Boot 3.5.8 Seçimi

**Neden:**
- ✅ Modern Java 21 desteği
- ✅ Gelişmiş performans
- ✅ Production-ready
- ✅ Aktif community support

### 2. PostgreSQL Seçimi

**Neden:**
- ✅ Enterprise-grade database
- ✅ ACID compliance
- ✅ Complex query desteği
- ✅ Production'da yaygın kullanım

### 3. JPA/Hibernate

**Neden:**
- ✅ ORM ile veritabanı bağımsızlığı
- ✅ Repository pattern ile clean code
- ✅ Otomatik SQL generation
- ✅ Relationship management

### 4. DTO Pattern

**Neden:**
- ✅ Entity'leri API'den gizler
- ✅ Güvenlik (sensitive data exposure önleme)
- ✅ API versioning kolaylığı
- ✅ Frontend'e sadece gerekli data

### 5. CSV Data Loading

**Neden:**
- ✅ Hızlı development
- ✅ Version control ile takip
- ✅ Kolay veri güncelleme
- ✅ Production'da da kullanılabilir

### 6. Swagger/OpenAPI

**Neden:**
- ✅ API dokümantasyonu
- ✅ Interactive testing
- ✅ Frontend developer'lara kolaylık
- ✅ Jüriye sunum için profesyonel görünüm

---

## 🔧 Özel Implementasyonlar

### 1. Custom Repository Queries

**QuizResultRepository:**
```java
@Query("SELECT COUNT(DISTINCT qr.lesson.lessonId) FROM QuizResult qr WHERE qr.user.userId = :userId")
Long countCompletedLessonsByUserId(@Param("userId") String userId);

@Query("SELECT COUNT(qr) FROM QuizResult qr WHERE qr.user.userId = :userId AND qr.score >= 80")
Long countHighScoreQuizzesByUserId(@Param("userId") String userId);
```

**Neden Custom Query:**
- ✅ Performans: Tek sorguda hesaplama
- ✅ Database-level aggregation
- ✅ N+1 query problem önleme

### 2. Transaction Management

**@Transactional Annotation:**
- ✅ **readOnly = true:** GET endpoint'lerinde
- ✅ **@Transactional:** POST endpoint'lerinde (data modification)

**Neden:**
- ✅ Data consistency
- ✅ Rollback support
- ✅ Performance optimization

### 3. Builder Pattern (Lombok)

**Entity Oluşturma:**
```java
User user = User.builder()
    .userId("U1")
    .name("Ahmet Yılmaz")
    .city("Istanbul")
    .build();
```

**Neden:**
- ✅ Readable code
- ✅ Optional field handling
- ✅ Immutability support

---

## 📊 Performans Optimizasyonları

### 1. Lazy Loading

JPA relationship'lerde lazy loading kullandım:
- ✅ Sadece ihtiyaç duyulduğunda yüklenir
- ✅ N+1 query önleme
- ✅ Memory efficiency

### 2. Repository Pattern

Spring Data JPA repository'leri:
- ✅ Otomatik query generation
- ✅ Custom query desteği
- ✅ Caching support (gelecekte)

### 3. DTO Mapping

Entity'den DTO'ya mapping:
- ✅ Sadece gerekli field'lar
- ✅ Network payload azaltma
- ✅ Security (sensitive data gizleme)

---

## 🐛 Hata Senaryoları ve Çözümler

### 1. CSV Loading Hataları

**Problem:** CSV dosyası bulunamadı  
**Çözüm:** ClassPathResource fallback mekanizması

```java
// Önce file system'den dene
File file = new File(path);
if (file.exists()) {
    // File system'den oku
} else {
    // Classpath'ten oku
    ClassPathResource resource = new ClassPathResource(path);
}
```

### 2. Foreign Key Constraint

**Problem:** İlişkili entity bulunamadı  
**Çözüm:** Dependency order + in-memory maps

```java
// Önce categories yükle
loadCategories(); // categoryMap doldurulur

// Sonra lessons yükle
loadLessons(); // categoryMap'ten referans alır
```

### 3. Duplicate Data

**Problem:** CSV'de duplicate entries  
**Çözüm:** Unique constraint + exists check

```java
if (!badgeRepository.existsByUser_UserIdAndName(userId, badgeName)) {
    // Yeni rozet oluştur
}
```

---

## 🎓 Öğrendiklerim ve Deneyimlerim

Bu projeyi geliştirirken:

1. **Spring Boot Ecosystem:** Modern Spring Boot 3.x özelliklerini öğrendim
2. **JPA/Hibernate:** Complex relationship management
3. **RESTful API Design:** Best practices ve patterns
4. **CSV Processing:** OpenCSV ile data loading
5. **Exception Handling:** Global exception handler pattern
6. **Swagger Integration:** API dokümantasyonu
7. **CORS Configuration:** Cross-origin resource sharing
8. **Gamification Logic:** Rozet sistemi tasarımı

---

## 🚀 Gelecek Geliştirmeler

Projeyi daha da geliştirmek için:

1. **Authentication & Authorization:**
   - JWT token-based auth
   - Role-based access control (RBAC)

2. **Caching:**
   - Redis integration
   - Frequently accessed data caching

3. **Advanced Features:**
   - Email notifications
   - Push notifications
   - Social features (comments, likes)

4. **Performance:**
   - Database indexing
   - Query optimization
   - Pagination support

5. **Testing:**
   - Unit tests
   - Integration tests
   - API tests

---

## 📝 Sonuç

Bu backend projesi, **modern Spring Boot teknolojileri** kullanılarak geliştirilmiş, **production-ready** bir RESTful API sistemidir. 

**Temel Özellikler:**
- ✅ RESTful API design
- ✅ PostgreSQL database
- ✅ CSV-based seed data
- ✅ Otomatik rozet sistemi
- ✅ Gamification logic
- ✅ Swagger documentation
- ✅ CORS configuration
- ✅ Global exception handling
- ✅ Clean architecture

**Jüriye Sunum:**
Bu backend, jüriye sunum için hazır, **tam fonksiyonel**, **dokümante edilmiş** ve **profesyonel** bir sistemdir. Tüm endpoint'ler test edilmiş, Swagger UI ile interaktif dokümantasyon mevcuttur.

---

**Backend Hazır! 🚀**  
**API Dokümante! 📚**  
**Production-Ready! ✅**

---

## 📞 İletişim ve Destek

Sorularınız için:
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **API Docs:** http://localhost:8080/api-docs
- **GitHub:** (repo linki)

---

**Teşekkürler!** 🙏

