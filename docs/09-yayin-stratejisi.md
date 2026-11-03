# Yayın stratejisi: sunucu masrafı olmadan canlı bir demo

## Problem

Bir portfolyo projesinin en güçlü hâli, tek bir bağlantıyla açılıp denenebilen hâli. Ama SkillHub gerçek bir
full-stack uygulama: bir Java API'si ve bir PostgreSQL veritabanı istiyor. Bunları sürekli açık tutmak bir
sunucu ya da bulut hizmeti için düzenli ödeme demek. Ücretsiz katmanlar ise sunucuyu uykuya alıyor,
veritabanını da bir süre sonra siliyor. İK uzmanının tıkladığı bağlantının bir dakika boyunca uyanmayı
beklemesi ya da boş bir hata sayfası göstermesi, hiç bağlantı vermemekten daha kötü.

Yeni mezun biri olarak bu masrafı sürekli taşımak istemedim. Hedefim, sıfır maliyetle her zaman açık duran
bir demo ve gerçek sistemi görmek isteyen mühendisler için eksiksiz bir yoldu.

## Çözüm: iki kanal

| Kim için | Ne | Nasıl |
|---|---|---|
| İK uzmanları ve ürünü merak eden herkes | [Canlı demo](https://skillhub-turkcell.vercel.app) | Tarayıcıda çalışır; kurulum, hesap ya da sunucu gerektirmez |
| Yazılımcılar ve teknik mülakatçılar | Kaynak kod ve gerçek sistem | `docker compose up --build` ile PostgreSQL, API ve arayüz tek komutta ayağa kalkar |

İki kanal da **aynı arayüz kodunu** kullanıyor. Fark yalnızca verinin nereden geldiğinde.

## Demo modu nasıl çalışıyor?

Arayüz, veri kaynağını derleme anında tek bir değişkenle seçiyor: `VITE_DATA_MODE`. Vercel derlemesinde bu
değer `demo` (varsayılan), Docker derlemesinde `api`. Demo modunda istekler ağa hiç çıkmıyor;
[`frontend/src/demo/`](../frontend/src/demo/) altındaki adaptör onları tarayıcıda karşılıyor.

- **Aynı sözleşme.** [`handler.ts`](../frontend/src/demo/handler.ts) gerçek API'nin adreslerini, metotlarını,
  durum kodlarını ve hata biçimini taklit ediyor. Bir form alanına ait hata, demoda da o alanın altında çıkıyor.
- **Aynı tipler.** Demo fonksiyonları, ekranların API'den beklediği TypeScript tiplerini döndürüyor (`Me`,
  `Sky`, `AttemptResult`...). API tipleri değişip demo güncellenmezse proje derlenmiyor; sözleşmedeki bir
  kayma derleme anında yakalanıyor.
- **Aynı içerik.** Demo kataloğu, backend migration'larındaki (V2–V7) 17 dersin, 68 sorunun, 81 ilin ve
  12 rozetin birebir kopyası.
- **Aynı kurallar.** XP yalnızca gelişme için veriliyor, Gece Saati aynı eşiklerle ilerliyor, seriler İstanbul
  saatine göre hesaplanıyor, rozetler aynı koşullarla kazanılıyor.

### Veri tarayıcıda, ama özenle

- Demo verisi `localStorage`'da sürümlü bir yapı olarak duruyor. Okunurken her kayıt doğrulanıyor: bilinmeyen
  bir ders, aralık dışı bir skor ya da bozuk bir tarih varsa o kayıt atılıyor. Tarayıcıda saklanan veriye de
  güvenmiyorum.
- Demoda yeni profil oluşturan biri bir şifre giriyor. Bu bir demo olsa da şifreyi düz metin saklamadım:
  WebCrypto ile PBKDF2-SHA256, 120.000 tur ve rastgele tuzla hash'leniyor.
- Demo oturum token'ı `demo:` önekiyle başlıyor ve ayrı bir depolama anahtarında duruyor; gerçek API'ye
  gönderilemiyor.
- Tarayıcı depolamayı engelliyorsa demo yine çalışıyor; veri yalnızca o sekmenin belleğinde kalıyor.
- Profil sayfasındaki **Demoyu sıfırla** her şeyi başlangıç hâline döndürüyor.

### Bilinçli farklar

| Konu | Demo | Gerçek sistem |
|---|---|---|
| Ders kilitleri | Bütün dersler açık; ön koşul çizgileri önerilen sıra olarak görünüyor | Ön koşulu bitmeyen ders kilitli, sunucu `403` döndürüyor |
| Gece Rehberi | Kural tabanlı | API anahtarı varsa Claude, yoksa kural tabanlı |
| Diğer öğrenciler | 29 sabit kurgusal profil ve bu tarayıcıda açılan profiller | 30 kurgusal öğrenci, geçmişleri gerçek quiz servisinden geçirilerek üretilmiş |

Kilitleri demoda açmamın nedeni basit: bir ziyaretçinin ileri seviye bir dersi görmek için önce dört dersi
geçmesini beklemek istemedim. Kilit kuralının kendisini [Oyun kuralları](05-oyun-kurallari.md)'nda ve
kodunda gösterebiliyorum.

### Bedeli

İş kuralları iki yerde var: Java'da ve demo için TypeScript'te. İkisinin zamanla ayrışma riski var. Bugün
bunu ortak tiplerle, demo formüllerini tek dosyada toplamakla ve kataloğu migration'lardan türetmekle
sınırlıyorum. Bir sonraki adım, API tiplerini OpenAPI dokümanından otomatik üretmek; böylece sözleşme uçtan
uca makine tarafından kontrol edilir.

## Vercel ayarları

| Ayar | Değer |
|---|---|
| Root Directory | `frontend` |
| Framework | Vite |
| Build | `npm run build` (önce tip kontrolü, sonra derleme) |
| Output | `dist` |
| `VITE_DATA_MODE` | Tanımsız ya da `demo` |

[`vercel.json`](../frontend/vercel.json) içindeki yeniden yazma kuralı, `/api`, `/assets` ve uzantılı dosyalar
dışındaki her adresi `index.html`'e yönlendiriyor. Böylece `/dersler/python-ile-ilk-adim` gibi bir bağlantı
doğrudan açılabiliyor ve sayfa yenilenince 404 vermiyor.

## Docker'daki tam sistem

- Arayüz imajı `VITE_DATA_MODE=api` ile derleniyor. Demo kodu bu pakette hiç yer almıyor.
- nginx tek sayfalık uygulamayı sunuyor ve `/api`, `/swagger-ui`, `/v3/api-docs` isteklerini API
  konteynerine aktarıyor. Tarayıcı açısından her şey aynı adreste: tek açık port, CORS yok.
- nginx, `Host` ve `X-Forwarded-*` başlıklarını API'ye iletiyor; Spring de bunlara güveniyor
  (`forward-headers-strategy: framework`). Bu olmasaydı Swagger UI'nin yönlendirmeleri konteynerin iç
  adresine giderdi; böylece `localhost:3000` üzerinde kalıyor.
- Veritabanı ilk kez boş açıldığında 30 kurgusal öğrenci, gerçek `QuizService` üzerinden ekleniyor
  (`DEMO_DATA_ENABLED`).

## İleride gerçek API'ye geçiş

Backend'i bir gün kalıcı olarak yayınlarsam arayüzde değişen tek şey ortam değişkenleri:

```dotenv
VITE_DATA_MODE=api
VITE_API_BASE_URL=https://api.example.com/api/v1
```

Backend tarafında `CORS_ALLOWED_ORIGINS` arayüzün tam adresine, `DB_URL`, `DB_USER`, `DB_PASSWORD` ve
`JWT_SECRET` gerçek değerlere ayarlanır; istenirse `ANTHROPIC_API_KEY` eklenir. `VITE_` değişkenleri derleme
anında okunduğu için değişiklikten sonra yeniden dağıtım gerekir. Hiçbir sır `VITE_` değişkenine konmaz,
çünkü bu değerler herkese açık JavaScript paketine gömülür.
