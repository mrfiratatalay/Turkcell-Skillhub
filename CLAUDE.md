# SkillHub çalışma kuralları

Bu dosya bu depoda çalışan herkes (insan ya da yapay zekâ asistanı) için bağlayıcıdır. Proje, Turkcell Code Night
2025 Trabzon birincisi SkillHub'ın portfolyo ve mülakat için baştan yazılmış ikinci sürümüdür.

## Değişmez kurallar

1. **Hiçbir dosya 300 satırı geçmez.** Kod, yapılandırma, doküman, hepsi. İşi bitirmeden dokunduğun dosyaları
   `wc -l` ile kontrol et; büyüyen dosyayı sorumluluklarına göre böl.
2. **SOLID ve Clean Architecture, iki tarafta da.** Backend modülleri `domain` / `application` /
   `infrastructure` / `web` katmanlarına ayrılır. `domain` saf Java'dır; dış dünya (`JdbcClient`, JWT, Claude)
   yalnızca `infrastructure` içindeki port adaptörlerinde yaşar. Frontend'de her ekran `features/<ad>/` altında
   kendi API kancalarıyla durur; ortak parçalar `shared/` altındadır.
3. **Tek komut:** `docker compose up --build` bütün sistemi (PostgreSQL, API, nginx + arayüz) sorunsuz
   ayağa kaldırmalıdır. Yeni bir servis ya da değişken bu akışı bozamaz; `.env.example` güncel tutulur.
4. **Sahte veri yok.** Backend her zaman gerçek veritabanına bağlıdır. Demo öğrencileri yalnızca boş veritabanına,
   gerçek `QuizService` üzerinden üretilir. Frontend'in `demo` modu yalnızca backend'siz portfolyo yayını
   içindir ve API ile aynı sözleşmeyi uygular.
5. **`eski/` klasörüne dokunulmaz.** Hackathon sürümünün hatırasıdır.
6. **Her karar anlatılabilir olmalı.** Veri modeli ve API kararlarının gerekçesi kodda kısa bir yorumla ya da
   README'de durur; mülakatta savunulabilir olmayan kestirme yazılmaz.

## Backend

- Java 25, Spring Boot 4, PostgreSQL 17, Flyway. Şema değişikliği yalnızca yeni bir `V<n>__*.sql` migration'ıdır;
  yayınlanmış migration düzenlenmez.
- SQL `JdbcClient` ile açık yazılır. XP yalnızca `xp_events` defterine eklenir; toplam ve sıralamalar türetilir.
- Kullanıcı kimliği yalnızca `@CurrentUser` ile token'dan alınır, istek gövdesinden asla.
- İş hataları `DomainException` alt türleridir; web katmanı bunları RFC 9457 Problem Details'e çevirir.
  Bir form alanına ait hata `fieldErrors` ile o alana bağlanır.
- Birden fazla tabloya yazan kullanım senaryosu tek `@Transactional` sınırındadır. Aynı sınıf içinden yapılan
  çağrıda Spring proxy'si devreye girmez; giriş noktası olan metot da işaretlenmelidir.

## Frontend ve tasarım ("Sakin Gece")

- React 19, MUI 9, TanStack Query. Bileşenlerde sabit renk yazılmaz; renkler `app/theme/tokens.ts`'ten gelir.
- İki renk şeması vardır: koyu **Gece** (varsayılan) ve açık **Şafak**. Değerler `app/theme/schemes.ts`'te,
  bileşenler yalnızca CSS değişkeni olan token'ları kullanır.
  - Token'lar CSS değişkenidir: SVG niteliklerinde (`fill=`, `stroke=`) kullanma, `style` ile ver; hex şeffaflık
    eki yapma, `color-mix` kullan.
  - Altın (`gold`) yalnızca dolgudur; altın ya da neon yazı ve ikon için `accent.gold` / `accent.neon`,
    altın zemin üstündeki yazı için `onGold` kullan.
  - Code Night laciverti yalnızca gece "pencerelerinde" (gökyüzü haritası, şehir haritası, giriş görseli) kullanılır;
    pencere içindeki yazılar iki şemada da `onNight` renklerindedir.
  - Parıltı bir ödüldür: varsayılan kartlarda glow yoktur; kazanılmış ya da seçili öğe ince bir kenarlık alır.
- Arayüz metinleri Türkçedir; kod, isimler ve yorumlar İngilizcedir.
- Görsel üretimi gerekirse Codex kullanılır; talimat ve çıktılar `tasarim/` altında saklanır.

## Komutlar

```bash
docker compose up --build                 # tüm sistem: http://localhost:3000
cd backend && ./mvnw -DskipTests package  # backend derleme
cd frontend && npm run build              # tip kontrolü + üretim derlemesi
```

## Commit

Conventional Commits, tek satır: `feat(web): ...`, `fix(api): ...`, `refactor(web): ...`, `docs: ...`.
