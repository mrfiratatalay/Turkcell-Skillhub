# Çalıştırma ve API

## Gereken tek şey: Docker

Makinende Java, Node ya da PostgreSQL kurulu olması gerekmiyor. Docker (Compose v2 ile) yeterli.

```bash
git clone https://github.com/mrfiratatalay/Turkcell-Skillhub.git
cd Turkcell-Skillhub
docker compose up --build
```

İlk çalıştırmada imajlar derlendiği için birkaç dakika sürüyor; sonraki açılışlar önbellekten geliyor.

| Adres | Ne var |
|---|---|
| http://localhost:3000 | SkillHub |
| http://localhost:3000/api/docs | Swagger UI: önce giriş yapıp aldığın token'ı **Authorize**'a yapıştır |
| `localhost:5433` | PostgreSQL (`skillhub` / `skillhub`), yalnızca bu makineden erişilebilir |
| `localhost:8080` | API, yalnızca bu makineden; Vite geliştirme sunucusu için açık |

Veritabanı ilk kez boş açıldığında 30 kurgusal öğrenci, gerçek quiz servisinden geçirilerek ekleniyor. Giriş
ekranındaki **Demo hesabıyla keşfet** düğmesi ya da `demo@skillhub.dev` / `gece2025` ile girebilirsin.

Bütün kurgusal öğrencilerin şifresi aynı (`gece2025`), e-postaları `ad.soyad@ornek.dev` biçiminde. Farklı
bir öğrencinin gözünden bakmak istersen, örneğin en aktif öğrenci olarak tasarladığım `elif.demir@ornek.dev`
ile giriş yapabilirsin.

## Ayarlar

Her değerin güvenli bir yerel varsayılanı var; `.env` dosyası isteğe bağlı. Değiştirmek için
[`.env.example`](../.env.example) dosyasını `.env` olarak kopyala.

| Değişken | Varsayılan | Ne işe yarar |
|---|---|---|
| `DB_PASSWORD` | `skillhub` | Veritabanı şifresi |
| `JWT_SECRET` | Yalnızca yerel kullanım için bir değer | Token imza anahtarı, en az 32 karakter |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,...` | API'yi doğrudan çağırabilecek tarayıcı adresleri |
| `DEMO_DATA_ENABLED` | `true` | Boş veritabanına kurgusal öğrencileri ekler |
| `ANTHROPIC_API_KEY` | boş | Claude destekli Gece Rehberi'ni açar |
| `GUIDE_MODEL` | `claude-opus-5-5` | Gece Rehberi'nin kullandığı model |
| `DB_URL`, `DB_USER` | Compose içinde ayarlı | Backend'i Docker dışında çalıştırırken veritabanı adresi |
| `VITE_DATA_MODE` | `demo` (Docker imajında `api`) | Arayüzün veri kaynağı |
| `VITE_API_BASE_URL` | `/api/v1` | Ayrı bir adreste duran API'nin tam yolu |

## Geliştirme modları

```bash
# Veritabanı ve API Docker'da, arayüz Vite ile anlık yenilemeli (http://localhost:5173)
docker compose up db api
cd frontend && npm install && VITE_DATA_MODE=api npm run dev

# Backend IDE'den ya da Maven wrapper ile, Docker'daki veritabanına bağlı (JDK 25 gerekir)
docker compose up db
cd backend && DB_URL=jdbc:postgresql://localhost:5433/skillhub ./mvnw spring-boot:run

# Yalnızca tarayıcıda çalışan demo, backend gerekmez
cd frontend && npm install && npm run dev
```

Derleme komutları: `cd backend && ./mvnw -DskipTests package` ve `cd frontend && npm run build` (önce tip
kontrolü, sonra üretim derlemesi).

## Sık karşılaşılan durumlar

- **Port kullanımda:** 3000, 5433 ya da 8080'i başka bir uygulama tutuyorsa onu kapat ya da
  `docker-compose.yml`'deki port eşlemesinin sol tarafını değiştir.
- **Temiz bir veritabanıyla baştan başlamak:** `docker compose down -v` veritabanı volume'unu siler; sonraki
  `up` kurgusal öğrencileri yeniden ekler. Bütün verinin silineceğini unutma.
- **Kurgusal öğrenciler gelmedi:** Yalnızca *boş* bir veritabanına ekleniyorlar. `DEMO_DATA_ENABLED` değerini
  ve `docker compose logs api` çıktısını kontrol et; başarılı bir açılışta "Demo data ready" satırı görünür.
- **Rehber kural tabanlı çalışıyor:** `.env` dosyasına `ANTHROPIC_API_KEY` ekleyip `docker compose up -d`
  ile API konteynerini yeniden oluştur.

## API

Bütün uçlar `/api/v1` altında. Kayıt, giriş ve şehir listesi dışındaki her istek
`Authorization: Bearer <token>` başlığı istiyor. Sözleşmenin tamamı Swagger UI'de.

| Metot | Uç | Ne yapar |
|---|---|---|
| `POST` | `/auth/register` | Hesap oluşturur, token döner (`201`) |
| `POST` | `/auth/login` | Giriş yapar, token döner |
| `GET` | `/cities` | 81 il, Türkçe alfabetik sırada |
| `GET` | `/me` | Profil, ilerleme özeti (Gece Saati, XP, seri, rozet sayısı) ve genel sıra |
| `PATCH` | `/me` | Ad, şehir ve üniversite bilgisini günceller |
| `GET` | `/me/xp-history?days=30` | Günlük ve kümülatif XP (7–90 gün) |
| `GET` | `/me/attempts?limit=20` | Son quiz denemeleri (1–100) |
| `GET` | `/sky` | Takımyıldızlar, yıldızlar ve ön koşul çizgileri |
| `GET` | `/lessons?category=&difficulty=&q=` | Filtrelenebilir ders kataloğu |
| `GET` | `/lessons/{slug}` | Ders detayı; ders kilitliyse açılış yolu da gelir |
| `GET` | `/lessons/{slug}/quiz` | Quiz, doğru cevaplar olmadan; ders kilitliyse `403` |
| `POST` | `/lessons/{slug}/attempts` | Cevapları gönderir; puanlama, XP ve rozetler tek transaction'da (`201`) |
| `GET` | `/badges` | Rozet koleksiyonu; kazanılmamış gizli rozetler gizli kalır |
| `GET` | `/leaderboard?cityId=&limit=50` | Genel ya da şehir içi sıralama (3–100 kişi) |
| `GET` | `/leaderboard/cities` | 81 ilin XP'si ve öğrenci sayısı, harita koordinatlarıyla |
| `GET` | `/guide` | Gece Rehberi önerileri (10 dakika önbellekli) |
| `POST` | `/guide/refresh` | Önerileri yeniden üretir (saatte en fazla 6 kez, aşılırsa `429`) |

### Uçtan uca bir örnek

Docker'daki sistem açıkken terminalden bir quiz çözmek (`jq` yalnızca çıktıyı güzelleştirmek için):

```bash
API=http://localhost:3000/api/v1

# 1) Giriş yap ve token'ı al
TOKEN=$(curl -s -X POST $API/auth/login -H 'Content-Type: application/json' \
  -d '{"email":"demo@skillhub.dev","password":"gece2025"}' | jq -r .token)

# 2) Quiz'i getir: şıklarda yalnızca id ve metin var, doğru cevap yok
curl -s $API/lessons/python-ile-ilk-adim/quiz -H "Authorization: Bearer $TOKEN" | jq '.questions[0]'

# 3) Cevapları gönder: her soruya bir şık (şık kimlikleri: soru kimliği * 10 + sıra)
curl -s -X POST $API/lessons/python-ile-ilk-adim/attempts \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"answers":[{"questionId":11,"optionId":111},{"questionId":12,"optionId":121},
       {"questionId":13,"optionId":131},{"questionId":14,"optionId":141}]}' \
  | jq '{score, passed, xpEarned, leveledUp, newBadges: [.newBadges[].name]}'
```

### Örnek cevap: quiz sonucu

Önceki en iyi skoru %50 olan 150 XP'lik bir dersi %75 ile geçen bir öğrencinin sonucu (kısaltılmış):

```json
{
  "score": 75,
  "correctCount": 3,
  "questionCount": 4,
  "passed": true,
  "passingScore": 70,
  "previousBestScore": 50,
  "xpEarned": 38,
  "totalXp": 676,
  "nightClockBefore": { "level": 3, "title": "Gece Çöktü", "time": "22:35" },
  "nightClockAfter": { "level": 3, "title": "Gece Çöktü", "time": "22:50" },
  "leveledUp": false,
  "newBadges": [],
  "unlockedLessons": [{ "slug": "temiz-kod-ve-solid", "title": "Temiz Kod ve SOLID", "status": "AVAILABLE" }],
  "review": [{ "questionId": 41, "selectedOptionId": 412, "correctOptionId": 412, "correct": true, "explanation": "..." }]
}
```

`xpEarned` 38, çünkü %50'nin karşılığı olan 75 XP daha önce alınmıştı: %75'in karşılığı 113 XP, fark 38.

### Örnek hata: Problem Details

Aynı e-postayla ikinci kez kayıt olmaya çalışınca:

```http
HTTP/1.1 409 Conflict
Content-Type: application/problem+json

{
  "type": "about:blank",
  "title": "Çakışma",
  "status": 409,
  "detail": "Bu e-posta adresiyle zaten bir hesap var.",
  "errors": { "email": "Bu e-posta adresiyle zaten bir hesap var." }
}
```

`errors` alanı, mesajın formdaki hangi alana ait olduğunu söylüyor; arayüz mesajı e-posta kutusunun altında
gösteriyor. Kilitli bir dersin quiz'i istendiğinde ise `403` ve "Bu yıldız henüz kilitli" başlığı dönüyor.
