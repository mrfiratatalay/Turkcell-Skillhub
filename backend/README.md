````markdown
# SkillHub Backend – Spring Boot + PostgreSQL (AI Agent README)

> Rolün: Bu dosyayı okuyan **yapay zeka ajanı**, Turkcell “SkillHub – Gençler İçin Dijital Beceri Gelişim Platformu” case’i için
> **sıfırdan**, **yalnızca istenen özellikleri** içeren, temiz bir **Java Spring Boot + PostgreSQL backend** kuracak
> ve var olan kodu bu mimariye refactor edecek.

---

## 0. ROLÜN VE SINIRLARIN

- Sen, **Spring Boot 3 + PostgreSQL** konusunda deneyimli bir **senior backend engineer**’sın.
- Amacın:
  - Case PDF’inde verilen akışa %100 uyumlu,
  - **gereksiz hiçbir özellik içermeyen** (özellikle auth/notification/chat vb. yok),
  - okunabilir, basit ve çalışır bir backend kurmak.
- Ürettiğin kod:
  - Fırat’ın lokal ortamında PostgreSQL ile ayağa kalkacak,
  - Sonradan yazılacak React frontend tarafından REST API üzerinden kullanılacak.

**Yapmayacakların (çok önemli):**

- Kullanıcı kaydı/girişi için JWT / OAuth / şifre / e-posta doğrulama gibi **auth sistemi ekleme**.
- Mikroservis, Kafka, Redis, message queue, file upload vs. gibi **ileriye dönük ama gereksiz** karmaşık yapılar ekleme.
- Domain dışında özellik: chat, yorum, bildirim, subscription vb. **yazma**.
- Frontend (Thymeleaf, JSP, React vs.) kodu üretme.

Odak sadece:

> Eğitim → Quiz → Puan → Rozet → Liderlik tablosu  
> akışlarını **doğru çalışan bir backend + veri modeli** ile sağlamak.

---

## 1. CASE ÖZETİ (İŞ İHTİYACI)

PDF’deki gereksinimlerin kısa özeti:

1. **Kullanıcı & Profil Yönetimi**
   - Her kullanıcı sisteme kayıtlı.
   - Alanlar: `user_id, name, city, university, skill_level (beginner / intermediate / advanced)`
   - Profilde gösterilecek:
     - Toplam rozet sayısı
     - Tamamlama oranı
     - Genel başarı yüzdesi
     - Toplam puan (CSV’de `total_points` alanı var)

2. **Eğitim & İçerik Modülü**
   - Eğitimler kategori bazlı: Yazılım, Yapay Zeka, Siber Güvenlik, Girişimcilik.
   - Her kategori birden fazla dersi (lesson) içeriyor.
   - Her ders için:
     - Video bağlantısı (bu case’de backend sadece metinsel alanı tutabilir),
     - Açıklama,
     - Zorluk seviyesi,
     - Süre (dakika).

3. **Quiz & Değerlendirme**
   - Her dersin sonunda quiz var.
   - Quiz soruları CSV ile seed ediliyor:
     `question_id, lesson_id, question_text, correct_answer, options`
   - Kullanıcı cevap gönderdiğinde:
     - Sistem doğru/yanlış sayıyor.
     - Quiz skoru ve puanı hesaplıyor.
     - Kullanıcının toplam puanını güncelliyor.

4. **Rozet & Seviye Sistemi**
   - Örnek rozet kuralları (PDF):
     - 3 dersi tamamlayan → **“Motivasyon Rozeti”**
     - 10 quizden %80+ başarı → **“Uzman Rozeti”**
   - Rozetler kullanıcı profilinde sayısal olarak da gösteriliyor.

5. **İlerleme & Sıralama**
   - Kullanıcıların toplam puanına göre haftalık liderlik tablosu.
   - Şehir veya üniversite bazlı filtreleme.
   - “En Aktif Kullanıcılar” dashboard’da gösterilecek (temelde leaderboard verisi).

6. **Veri Modeli – CSV ToHumları**
   - Verilen CSV’ler (field’ler böyle kabul edilecek):
     - `users.csv`  
       `user_id,name,city,university,skill_level,total_points,badge_count`
     - `categories.csv`  
       `category_id,name,description`
     - `lessons.csv`  
       `lesson_id,category_id,title,duration_min,difficulty`
     - `quizzes.csv`  
       `question_id,lesson_id,question_text,correct_answer,options`
     - `quiz_results.csv`  
       `result_id,user_id,lesson_id,score,completed_at`
     - `badges.csv`  
       `badge_id,user_id,name,awarded_at`
     - `leaderboard.csv`  
       `user_id,rank,total_points,city`

Çıkacak backend, bu veri modelini **anlamlı şekilde ilişkilendiren** bir PostgreSQL şeması ve Spring Data JPA ile yönetilen entity’ler içermeli.

---

## 2. TEKNOLOJİ YIĞINI

Projeyi aşağıdaki stack ile oluştur:

- **Dil:** Java 17+ (mümkünse 21)
- **Framework:** Spring Boot 3.x
- **Build Tool:** Maven
- **Bağımlılıklar:**
  - `spring-boot-starter-web`
  - `spring-boot-starter-data-jpa`
  - `postgresql` driver
  - `spring-boot-starter-validation` (DTO validation için)
  - `lombok`
- **Veritabanı:** PostgreSQL (lokalde çalışacak)
- **Config Dosyası:** `application.yml` kullanılacak.

---

## 3. POSTGRESQL ŞEMASI & JPA ENTITY’LERİ

Aşağıdaki entity’leri oluştur ve isimleri **English, küçük harf snake_case** tablo isimlerine map et.

### 3.1. User

Tablo: `users`

Alanlar:

- `id` (PK, `BIGSERIAL` veya `UUID`; CSV’deki `user_id` bununla eşlenir)
- `name` – `VARCHAR`
- `city` – `VARCHAR`
- `university` – `VARCHAR`
- `skillLevel` – enum veya `VARCHAR` (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`)
- `totalPoints` – `INT` (default 0)
- `badgeCount` – `INT` (default 0)

İlişkiler:

- `@OneToMany(mappedBy = "user")` → `List<QuizResult>`
- `@OneToMany(mappedBy = "user")` → `List<Badge>`

### 3.2. Category

Tablo: `categories`

- `id` (PK; CSV `category_id`)
- `name`
- `description`
- `@OneToMany` → `List<Lesson>`

### 3.3. Lesson

Tablo: `lessons`

- `id` (PK; CSV `lesson_id`)
- `title`
- `durationMin` (`INT`; CSV `duration_min`)
- `difficulty` (`VARCHAR` ya da küçük enum)
- `@ManyToOne` Category (`category_id` FK)
- `@OneToMany` → `List<QuizQuestion>`
- `@OneToMany` → `List<QuizResult>`

### 3.4. QuizQuestion

Tablo: `quiz_questions`

- `id` (PK; CSV `question_id`)
- `questionText`
- `correctAnswer` – `VARCHAR`
- `options` – `TEXT`  
  - CSV’deki `options` alanı; DB’de:
    - ya JSON string olarak,
    - ya da `;` ile ayrılmış string olarak tutulabilir.
- `@ManyToOne` Lesson (`lesson_id` FK)

### 3.5. QuizResult

Tablo: `quiz_results`

- `id` (PK; CSV `result_id` – yoksa otomatik)
- `score` – `INT` (0–100)
- `completedAt` – `TIMESTAMP`
- `@ManyToOne` User (`user_id` FK)
- `@ManyToOne` Lesson (`lesson_id` FK)

### 3.6. Badge

Tablo: `badges`

- `id` (PK; CSV `badge_id`)
- `name` – `VARCHAR` (örn: “Motivasyon Rozeti”)
- `awardedAt` – `TIMESTAMP`
- `@ManyToOne` User (`user_id` FK)

### 3.7. Leaderboard (opsiyonel tablo)

Liderlik tablosu sebebiyle **ayrı bir tabloya mecbur değilsin**; veriyi runtime’da `users.totalPoints` üzerinden hesaplamak yeterli.  

CSV’deki `leaderboard.csv`:

- `user_id,rank,total_points,city`

Seed sırasında bu CSV’yi; kullanıcıların `totalPoints` değerini set etmek için referans olarak kullanabilirsin veya hiç kullanmayıp direkt `users.csv`’den okuyabilirsin. Önemli olan:

> **Liderlik endpoint’i** `users` tablosundan dinamik hesaplama yapsın.

---

## 4. SPRING PROJE MİMARİSİ

Aşağıdaki paket yapısını oluştur:

```text
src/main/java/com/skillhub
  ├── SkillHubApplication.java
  ├── controller
  │     ├── UserController
  │     ├── QuizController
  │     ├── LeaderboardController
  │     └── BadgeController
  ├── service
  │     ├── UserService
  │     ├── QuizService
  │     ├── LeaderboardService
  │     └── BadgeService
  ├── repository
  │     ├── UserRepository
  │     ├── CategoryRepository
  │     ├── LessonRepository
  │     ├── QuizQuestionRepository
  │     ├── QuizResultRepository
  │     └── BadgeRepository
  ├── model          # JPA entity'ler
  └── dto            # Request/response DTO'ları
        ├── UserProgressDto
        ├── QuizSubmitRequest
        ├── QuizSubmitResponse
        ├── LeaderboardEntryDto
        └── BadgeDto
````

**Kurallar:**

* Controller’lar **sadece DTO** ile konuşsun.
* Business logic **service katmanında** olsun.
* Repository’ler sadece DB erişimi yapsın.
* Var olan backend kodu varsa:

  * Bu yapıya refactor et,
  * Endpoint path’leri ve response’ları aşağıdaki kontrata uyacak şekilde düzelt.

---

## 5. CSV SEED MEKANİZMASI

### 5.1. CSV’lerin Konumu

Projede şu yapıyı oluştur:

```text
src/main/resources/csv/
  users.csv
  categories.csv
  lessons.csv
  quizzes.csv
  quiz_results.csv      # İstersen kullan
  badges.csv            # İstersen kullan
  leaderboard.csv       # İstersen kullan
```

Fırat ZIP’ten gelen bütün CSV’leri buraya koyacak.

### 5.2. Seed Çalışması

* `CsvDataLoader` adında bir `@Component` oluştur.
* `CommandLineRunner` veya `@EventListener(ApplicationReadyEvent.class)` kullanarak **uygulama ayağa kalktığında** seed işlemi yap.
* Seed mantığı:

  1. Önce tablolar boş mu kontrol et (örneğin `userRepository.count() == 0`).
  2. Boşsa, sırasıyla:

     * `categories.csv`
     * `lessons.csv`
     * `users.csv`
     * `quizzes.csv`
     * (Opsiyonel: `quiz_results.csv`, `badges.csv`)
  3. `ClassPathResource` + `BufferedReader` ile CSV satırlarını oku.
  4. Header satırını atla, her satırı `,` ile ayır ve ilgili entity’ye map et.
  5. `saveAll(...)` ile persist et.

Seed işlemi **idempotent** olmalı, yani uygulama yeniden başladığında duplicate data üretmemeli.

---

## 6. İŞ KURALLARI

### 6.1. Quiz Submit & Puan Hesaplama

Endpoint: `POST /api/quiz/submit`

Request DTO:

```json
{
  "userId": 1,
  "lessonId": 10,
  "answers": [
    { "questionId": 100, "selectedOption": "A" },
    { "questionId": 101, "selectedOption": "C" }
  ]
}
```

Servis akışı:

1. `userId` ve `lessonId`’yi DB’den doğrula. Yoksa `404`.

2. `answers` içindeki tüm `questionId`’ler:

   * İlgili lesson’a ait mi kontrol et; değilse `400`.

3. Her soru için:

   * DB’den `QuizQuestion` çek.
   * `selectedOption == correctAnswer` ise correct++.

4. Skor hesapla:

   ```text
   score = (correctCount / totalQuestions) * 100  (integer)
   ```

5. Yeni `QuizResult` kaydı oluştur:

   * `user`, `lesson`, `score`, `completedAt = now()`.

6. Kullanıcı puanı güncelle:

   * `user.totalPoints += score`
   * `user` kaydını kaydet.

7. Badge kontrolünü tetikle (aşağıda).

Response DTO:

```json
{
  "score": 85,
  "correctCount": 17,
  "wrongCount": 3,
  "totalPoints": 1320,
  "awardedBadges": [
    { "name": "Motivasyon Rozeti" },
    { "name": "Uzman Rozeti" }
  ]
}
```

### 6.2. Ders Tamamlama Mantığı

* Bir dersi kullanıcı için “tamamlanmış” saymak için:

  * Kullanıcının o `lessonId` için **en az bir QuizResult kaydı** olmalı.
  * (Opsiyonel) İstersen threshold: `score >= 60` olan sonuçları “tamamlandı” say.

User progress hesaplanırken:

* `completedLessonsCount` = kullanıcının `QuizResult` kayıtlarındaki **farklı** `lessonId` sayısı.
* `totalLessons` = DB’deki toplam lesson sayısı.
* `completionRate = completedLessonsCount / totalLessons`.

### 6.3. Rozet Kuralları

`BadgeService` içinde şu kuralları uygula. Her `quiz submit` sonrası çağrılacak.

1. **Motivasyon Rozeti**

   * Kullanıcının `completedLessonsCount >= 3` ise,
   * Kullanıcıda `name = "Motivasyon Rozeti"` badge’i yoksa:

     * Yeni `Badge` kaydı oluştur,
     * `awardedAt = now()`,
     * `user.badgeCount++`.

2. **Uzman Rozeti**

   * Kullanıcının toplam çözdüğü quiz sayısı ≥ 10
   * Bu quizlerin **ortalama skoru ≥ 80** ise,
   * Kullanıcıda `name = "Uzman Rozeti"` badge’i yoksa:

     * Yeni badge oluştur,
     * `user.badgeCount++`.

Badge verildiğinde, `QuizSubmitResponse` içinde `awardedBadges` listesi ile dön.

---

## 7. API TASARIMI

Base path: `/api`

### 7.1. GET `/api/users/{id}/progress`

**Amaç:** Kullanıcının profil ve istatistiklerini döndürmek.

Response DTO:

```json
{
  "userId": 1,
  "name": "Ahmet",
  "city": "Trabzon",
  "university": "RTEÜ",
  "skillLevel": "INTERMEDIATE",
  "totalPoints": 1320,
  "badgeCount": 2,
  "completionRate": 0.65,
  "averageScore": 82.3,
  "completedLessons": 7,
  "badges": [
    { "name": "Motivasyon Rozeti", "awardedAt": "2025-11-20T21:30:00" },
    { "name": "Uzman Rozeti", "awardedAt": "2025-11-20T23:00:00" }
  ]
}
```

Hesaplama:

* `averageScore` = kullanıcının tüm `QuizResult` skorlarının ortalaması (quiz yoksa 0).
* `completionRate` = `completedLessons / totalLessons`.

### 7.2. GET `/api/leaderboard`

**Amaç:** Genel ve filtrelenebilir liderlik tablosu.

Query parametreleri:

* `city` (opsiyonel)
* `university` (opsiyonel)
* `page`, `size` (opsiyonel pagination; default page=0, size=20)

Örnek çağrılar:

* `/api/leaderboard`
* `/api/leaderboard?city=Trabzon`
* `/api/leaderboard?university=RTEÜ`

Response DTO (liste):

```json
[
  {
    "rank": 1,
    "userId": 5,
    "name": "Zeynep",
    "city": "Trabzon",
    "university": "RTEÜ",
    "totalPoints": 2300
  },
  {
    "rank": 2,
    "userId": 1,
    "name": "Ahmet",
    "city": "Trabzon",
    "university": "RTEÜ",
    "totalPoints": 1320
  }
]
```

Hesaplama:

1. Filtre parametrelerine göre `User` listesi çek (city/university).
2. `totalPoints` desc sırala.
3. Response’ta index + 1 ile `rank` alanını doldur.

### 7.3. POST `/api/quiz/submit`

Yukarıda anlatılan `QuizSubmitRequest` / `QuizSubmitResponse` ile çalışır.

Hata durumları:

* `user` yoksa: `404 NOT_FOUND`.
* `lesson` yoksa: `404 NOT_FOUND`.
* Soru seti uyuşmuyorsa veya boşsa: `400 BAD_REQUEST`.

### 7.4. POST `/api/badges`

**Amaç:** Gerekirse demo veya manuel eklemek için basit badge ekleme.

Request:

```json
{
  "userId": 1,
  "name": "Special Badge"
}
```

Akış:

* User’ı bul.
* Yeni `Badge` oluştur (`awardedAt = now()`).
* `user.badgeCount++`.
* Kaydet ve eklenen badge’i DTO ile geri dön.

Bu endpoint, otomatize rozet akışından **bağımsız**; esas rozetleri `QuizService` otomatik dağıtır.

---

## 8. LOKAL ORTAM KURULUM ADIMLARI

README’nin sonunda mutlaka aşağıdaki adımları da yaz ve uygula:

1. **PostgreSQL veritabanı oluştur:**

   * DB adı: `skillhub`
   * User: `skillhub_user`
   * Password: `skillhub_pass`

2. **`application.yml` örneği:**

   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/skillhub
       username: skillhub_user
       password: skillhub_pass
     jpa:
       hibernate:
         ddl-auto: update   # geliştirme için
       properties:
         hibernate:
           show_sql: true
           format_sql: true

   server:
     port: 8080
   ```

3. **Projeyi çalıştır:**

   ```bash
   mvn spring-boot:run
   ```

4. **Hızlı testler için örnek istekler:**

   * `GET http://localhost:8080/api/users/1/progress`
   * `GET http://localhost:8080/api/leaderboard`
   * `POST http://localhost:8080/api/quiz/submit` (örnek body README’de)

Bu çağrılara anlamlı JSON dönüyorsa, backend case’in istediği şekilde ayaktadır.

---

## 9. VAR OLAN KODU REFACTOR ETME TALİMATI

Eğer projede daha önce yazılmış backend kodu varsa:

1. Mevcut entity, controller, service’leri analiz et.
2. Bu README’de tanımlanan:

   * paket yapısı,
   * entity alanları,
   * endpoint path’leri,
   * response/request DTO’ları
     ile uyuşmayıp ama işlevsel olan kodları **kademeli olarak** bu yapıya taşı.
3. Gereksiz sınıfları/endpoint’leri kaldır veya kullanımı kapat.
4. Her refactor adımından sonra:

   * `/api/users/{id}/progress`
   * `/api/leaderboard`
   * `/api/quiz/submit`
     çağrılarını test edip çalışırlığını koru.

---

## 10. ÖZET

* Sadece **eğitim, quiz, puan, rozet, sıralama** akışlarına odaklanan,
* Spring Boot + PostgreSQL tabanlı,
* CSV’lerden veri alan ve bu veriyi anlamlı şekilde ilişkilendiren,
* PDF’de verilen API önerilerine birebir uyan,
* Basit ama okunabilir, yarışma jürisinin rahat anlayacağı bir backend inşa et.

Bu README’yi, tüm ayrıntılarıyla hayata geçirmen bekleniyor.

```
::contentReference[oaicite:0]{index=0}
```
