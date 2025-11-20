# Turkcell SkillHub – Gençler İçin Dijital Beceri Gelişim Platformu

## Amaç

Ekipler, Turkcell’in sosyal sorumluluk yaklaşımını destekleyen, genç kullanıcıların dijital becerilerini ölçüp geliştirmesine olanak tanıyan bir platform geliştirir. Sistem, kullanıcıların eğitim videoları izleyip quiz çözdüğü, rozet kazandığı ve istatistiksel olarak beceri gelişimlerini izleyebildiği bir ortam sunar.

---

## Temel Özellikler

### 1. Kullanıcı ve Profil Yönetimi

- Her kullanıcı sisteme kayıt olur.
- Kullanıcı bilgileri:

  - `user_id`
  - `name`
  - `city`
  - `university`
  - `skill_level` (`beginner` / `intermediate` / `advanced`)

- Kullanıcı profilinde:

  - Toplam rozet sayısı
  - Tamamlama oranı
  - Genel başarı yüzdesi
    görüntülenir.

---

### 2. Eğitim ve İçerik Modülü

- Eğitimler kategori bazlıdır:

  - Yazılım
  - Yapay Zeka
  - Siber Güvenlik
  - Girişimcilik

- Her eğitim birden fazla dersi içerir.
- Dersler aşağıdaki bilgilere sahiptir:

  - Video bağlantısı
  - Açıklama
  - Zorluk seviyesi

---

### 3. Quiz ve Değerlendirme

- Her dersin sonunda bir quiz bulunur.
- Quiz soruları CSV üzerinden yüklenir, format:

```csv
question_id,lesson_id,question_text,correct_answer,options
```

- Kullanıcı cevaplarını gönderir → sistem doğru/yanlış istatistiklerini hesaplar.
- Quiz sonucuna göre kullanıcıya puan eklenir.

---

### 4. Rozet ve Seviye Sistemi

- Kullanıcılar belirli kriterleri karşıladığında rozet kazanır:

  - 3 dersi tamamlayan → **“Motivasyon Rozeti”**
  - 10 quizden %80 başarı → **“Uzman Rozeti”**

- Kazanılan rozetler kullanıcı profiline yansır.

---

### 5. İlerleme ve Sıralama

- Kullanıcıların toplam puanına göre **haftalık liderlik tablosu** oluşturulur.
- **Şehir** veya **üniversite** bazında filtreleme yapılabilir.
- “**En Aktif Kullanıcılar**” bölümü dashboard’da listelenir.

---

## Veri Modeli (CSV Tohumları)

Aşağıdaki CSV dosyaları sistem için başlangıç (seed) verilerini temsil eder.

### `users.csv`

Kullanıcı temel bilgileri ve skor alanları:

```csv
user_id,name,city,university,skill_level,total_points,badge_count
```

---

### `categories.csv`

Eğitim kategorileri:

```csv
category_id,name,description
```

---

### `lessons.csv`

Her kategorideki dersler:

```csv
lesson_id,category_id,title,duration_min,difficulty
```

---

### `quizzes.csv`

Derslere bağlı quiz soruları:

```csv
question_id,lesson_id,question_text,correct_answer,options
```

---

### `quiz_results.csv`

Kullanıcıların quiz sonuç kayıtları:

```csv
result_id,user_id,lesson_id,score,completed_at
```

---

### `badges.csv`

Kullanıcıların kazandığı rozetler:

```csv
badge_id,user_id,name,awarded_at
```

---

### `leaderboard.csv`

Liderlik tablosu verisi:

```csv
user_id,rank,total_points,city
```

---

## API Önerisi

Platformın backend tarafında kullanılabilecek örnek endpoint’ler:

- `GET /users/{id}/progress`
  → İlgili kullanıcının istatistikleri ve ilerleme bilgileri.

- `GET /leaderboard`
  → Genel veya şehir bazlı sıralama bilgisi.

- `POST /quiz/submit`
  → Kullanıcının quiz cevaplarının gönderilmesi, cevap kontrolü ve puan hesaplama.

- `POST /badges`
  → Yeni rozet kaydı oluşturma.

---

## UI/UX Beklentileri

- **Dashboard** ana görünümü:

  - **Sol panel**: Aktif dersler listesi
  - **Orta panel**:

    - Quiz sonuçları
    - İlerleme barı (tamamlama oranı vb.)

  - **Sağ panel**:

    - Kullanıcının kazandığı rozetler
    - Liderlik tablosu / sıralama bilgisi

- Arayüz:

  - Mobil uyumlu (responsive)
  - Sade
  - Renkli ve motive edici bir tasarıma sahip olmalıdır.

---

## Puanlama (100)

Proje değerlendirme kriterleri:

| Kriter         | Puan | Açıklama                                                 |
| -------------- | ---- | -------------------------------------------------------- |
| Çalışabilirlik | 30   | Eğitim, quiz, puan ve rozet akışlarının doğru çalışması  |
| Veri Modeli    | 20   | CSV yapısının anlamlılığı ve ilişkilendirmenin doğruluğu |
| UI/UX          | 20   | Anlaşılır, motive edici ekran tasarımları                |
| Oyunlaştırma   | 20   | Puan, rozet ve sıralama sisteminin işlevselliği          |
| Bonus          | 10   | Yapay zekâ destekli kişisel öneri (opsiyonel)            |
