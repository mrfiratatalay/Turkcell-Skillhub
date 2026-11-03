# Güvenlik

Hackathon sürümünde kullanıcılar tarayıcıda tutuluyordu ve bir API anahtarı repoya commit'lenmişti. v2'de
güvenliği sonradan eklenen bir katman olarak değil, tasarımın bir parçası olarak ele aldım. Bu dokümanda neyi
nasıl koruduğumu ve henüz neyin eksik olduğunu anlatıyorum.

## Kimlik doğrulama: stateless JWT

Kayıt ve giriş uçları bir JWT döndürüyor. Token HS256 ile imzalanıyor, 12 saat geçerli ve içinde yalnızca
gerekenler var: yayıncı (`skillhub`), kullanıcı kimliği (`sub`), oluşturulma ve bitiş zamanı, bir de görünen
ad. Sonraki her istekte token `Authorization: Bearer` başlığıyla geliyor; Spring Security'nin OAuth2 Resource
Server desteği imzayı ve süreyi doğruluyor.

Sunucuda oturum tutulmuyor (`STATELESS`). Bunun faydası, API'nin herhangi bir kopyasının herhangi bir isteği
ek bir oturum deposuna sormadan doğrulayabilmesi.

**Neden HS256, neden RS256 değil?** Token'ı üreten ve doğrulayan aynı servis. Simetrik bir anahtar bu durumda
yeterli ve basit. Token'ı başka bir servisin de doğrulaması gerekseydi (ama imzalayamaması gerekseydi) RS256
ve JWKS'e geçerdim.

İmza anahtarı `JWT_SECRET` ortam değişkeninden geliyor. Anahtar 32 bayttan kısaysa uygulama hiç açılmıyor
([`JwtProperties`](../backend/src/main/java/com/skillhub/shared/security/JwtProperties.java)). Zayıf bir
anahtarla sessizce çalışmaktansa açılışta yüksek sesle hata vermesini tercih ettim.

## Şifreler

- Şifreler Spring Security'nin `DelegatingPasswordEncoder`'ı ile **BCrypt** olarak saklanıyor. Hash'in başında
  algoritmanın adı (`{bcrypt}`) yazıyor; ileride algoritmayı değiştirirsem eski hash'ler çalışmaya devam eder.
- Şifre uzunluğu 8 ile 72 arasında. Üst sınır keyfî değil: BCrypt yalnızca ilk 72 baytı kullanıyor, daha
  uzununu kabul etmek fazlasını sessizce yok saymak olurdu.
- Hash'leme bir port arkasında ([`PasswordHasher`](../backend/src/main/java/com/skillhub/identity/application/PasswordHasher.java)).
  Kayıt ve giriş akışı BCrypt'i bilmiyor.

## Giriş, hangi e-postaların kayıtlı olduğunu sızdırmıyor

Saf bir giriş kodu şöyle çalışır: e-posta yoksa hemen "hatalı" der, varsa şifreyi BCrypt ile karşılaştırır.
BCrypt kasıtlı olarak yavaş olduğu için iki cevap arasında ölçülebilir bir süre farkı oluşur. Saldırgan bu
farktan hangi e-postaların sistemde kayıtlı olduğunu çıkarabilir.

[`AuthService`](../backend/src/main/java/com/skillhub/identity/application/AuthService.java) bunu kapatıyor:
uygulama açılırken bir "tuzak" hash üretiyor. E-posta bulunamasa bile şifre bu tuzak hash'le karşılaştırılıyor.
İki durumda da aynı iş yapılıyor, aynı süre geçiyor ve aynı mesaj dönüyor: "E-posta veya şifre hatalı."

```java
Optional<User> user = users.findByEmail(normalizeEmail(email));
// Always run a hash comparison so response time does not reveal which emails exist.
boolean valid = passwords.matches(password, user.map(User::passwordHash).orElse(timingDecoyHash));
```

Türkçeye özgü küçük bir ayrıntı: e-postayı küçük harfe çevirirken `Locale.ROOT` kullanıyorum. Türkçe yerel
ayarda büyük "I" harfi noktasız "ı" olur; `ILKAY@ORNEK.DEV` yanlış bir adrese dönüşmesin.

## Yetkilendirme: kimlik yalnızca token'dan gelir

Hiçbir uç, kullanıcı kimliğini istek gövdesinden ya da adresten almıyor. Controller'lar kimliği
[`@CurrentUser`](../backend/src/main/java/com/skillhub/shared/web/CurrentUser.java) ile doğrulanmış token'dan
alıyor:

```java
@GetMapping
MeResponse me(@CurrentUser UUID userId) { ... }
```

API'de `/users/{id}` gibi bir uç yok; her şey "ben" üzerinden (`/me`, `/me/attempts`). Böylece başka birinin
verisine kimliğini değiştirerek erişme (IDOR) açığı tasarım gereği oluşamıyor. Sıralama ekranı diğer
öğrencilerin adını ve şehrini gösteriyor; e-posta adresleri hiçbir cevapta başka bir kullanıcıya dönmüyor.

## Hatalar bilgi sızdırmıyor

- Bütün hatalar RFC 9457 Problem Details biçiminde dönüyor; token'ı olmayan istekler de dahil
  ([`ProblemJsonEntryPoint`](../backend/src/main/java/com/skillhub/shared/security/ProblemJsonEntryPoint.java)).
- Beklenmeyen bir hata sunucu günlüğüne yazılıyor, istemciye yalnızca genel bir mesaj gidiyor. Stack trace
  dışarı çıkmıyor.
- Doğrulama hataları alan adıyla dönüyor; arayüz mesajı ilgili alanın altında gösteriyor.

## CORS, CSRF ve güvenlik başlıkları

- **CSRF kapalı, bilinçli olarak.** Token bir çerezde değil, `Authorization` başlığında taşınıyor. Tarayıcı bu
  başlığı başka bir sitenin isteğine kendiliğinden eklemiyor, yani CSRF saldırısının dayandığı mekanizma yok.
  Token'ı ileride `httpOnly` bir çereze taşırsam CSRF korumasını geri açmam gerekir.
- **CORS dar tutuldu.** İzinli origin'ler ortam değişkeninden geliyor, yalnızca `/api/**` için geçerli,
  yalnızca kullandığım metotlara (`GET`, `POST`, `PATCH`) ve başlıklara izin veriyor. Docker kurulumunda arayüz
  ve API aynı adresten sunulduğu için CORS'a zaten ihtiyaç yok.
- **nginx başlıkları:** `X-Content-Type-Options: nosniff`, tıklama hırsızlığına karşı `X-Frame-Options: DENY`
  ve `Referrer-Policy: strict-origin-when-cross-origin`.

## Sırlar

Hackathon gecesinden çıkardığım en net ders buydu. Bugün:

- Bütün sırlar ortam değişkeninden geliyor. `.env` git dışında; `.env.example` yalnızca güvenli yerel
  varsayılanları içeriyor.
- `ANTHROPIC_API_KEY` yalnızca backend'de. `VITE_` ile başlayan değişkenler derleme anında JavaScript
  paketine gömülüyor ve herkese açık oluyor; hiçbir sır oraya konmuyor.
- Varsayılan `JWT_SECRET` yalnızca yerel kullanım için; gerçek bir dağıtımda değiştirilmesi gerekiyor.

## Altyapı

- API konteyneri root olmayan bir kullanıcıyla, yalnızca JRE içeren bir imajda çalışıyor.
- Veritabanı portu yalnızca `127.0.0.1`'e açık; ağdaki başka bir makine erişemiyor. Dışarıya açık tek port,
  arayüzün `3000` portu.
- Actuator'dan yalnızca sağlık uç noktası dışarı açık.

## Kötüye kullanıma karşı

- **Gece Rehberi yenileme sınırı:** Bir öğrenci önerileri saatte en fazla 6 kez yeniden ürettirebiliyor
  (kayan pencere). Bu hem Claude maliyetini hem servisi koruyor; aşılırsa `429` dönüyor.
- **Çift gönderim:** Aynı öğrencinin eşzamanlı quiz gönderimleri satır kilidiyle sıraya giriyor; XP politikası
  da aynı gelişmenin iki kez ödenmesini engelliyor.

## Bilinen eksikler

Bunları bilerek bıraktım ve bir mülakatta sorulursa açıkça söylerim:

| Eksik | Riski | Sonraki adım |
|---|---|---|
| Refresh token ve iptal yok | Çıkış yalnızca istemcide; çalınan bir token 12 saat geçerli | Kısa ömürlü access token + dönen refresh token |
| Token `localStorage`'da | Bir XSS açığı token'ı çalabilir (kodda `dangerouslySetInnerHTML` yok, React çıktıyı kaçışlıyor) | `httpOnly` çerez + CSRF koruması |
| Girişte deneme sınırı yok | Kaba kuvvet denemeleri | IP ve e-posta başına hız sınırı |
| Content-Security-Policy başlığı yok | XSS'e karşı ek bir katman eksik | nginx'e sıkı bir CSP |
| Şifre sınırı karakter sayıyor | Türkçe karakterlerle 72 karakter 72 baytı geçebilir | Bayt bazlı doğrulama |
| Kayıt ucu e-postanın kayıtlı olduğunu söylüyor | Kayıtlı adresler bu uçtan öğrenilebilir | E-posta doğrulamalı kayıt akışı |
| Hız sınırı bellekte | Birden fazla API kopyasında sınır kopya başına işler | Redis tabanlı sınır |
