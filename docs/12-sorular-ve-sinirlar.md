# Sorular ve sınırlar

Projeyi anlattığımda en sık gelen teknik soruları ve kısa cevaplarımı burada topladım. Sonunda projenin bugünkü
sınırlarını ve yol haritamı açıkça yazdım; bir sistemi anlatmanın dürüst yolu, neyin eksik olduğunu da
söylemek.

## Sık sorulan sorular

### Neden mikroservis değil de modüler monolit?

Bir quiz denemesi dört tabloya kadar yazıyor ve bunların hepsi ya olmalı ya hiç olmamalı. Tek veritabanında
bu, tek bir transaction. Mikroservislerde aynı garanti için saga ya da dağıtık transaction gerekirdi; tek
kişilik bir ekip ve bu ölçek için gereksiz bir karmaşıklık. Ama modül sınırlarını baştan çizdim. Bir gün ilk
ayıracağım parça Gece Rehberi olurdu, çünkü dış bir servise bağlı ve farklı ölçekleniyor.
Ayrıntı: [Mimari](03-mimari.md).

### Neden JPA/Hibernate yerine JdbcClient?

Sorgularımın çoğu raporlama: window fonksiyonları, özyinelemeli CTE, gruplamalar. Bunları SQL olarak açık
yazmak daha okunur ve daha öngörülebilir. Domain modelim değişmez `record`'lardan oluşuyor; entity yaşam
döngüsüne, lazy loading'e ihtiyacım yok. Bedeli, satır eşlemelerini elle yazmak.

### XP'yi neden `users` tablosunda bir sütunda tutmadın?

Çünkü kopyalanmış bir sayı er ya da geç gerçeğinden ayrışır. XP'yi yalnızca eklenen bir defterde tutuyorum;
toplam, seviye ve sıralama hep buradan türetiliyor. Her XP'nin kaynağı belli, profil grafiği bedava geliyor.
Bedeli, her okumada bir toplama; ölçek büyürse ne yapacağımı aşağıda yazdım. Ayrıntı: [Veritabanı](04-veritabani.md).

### Aynı öğrenciden aynı anda iki gönderim gelirse ne olur?

İlk adım öğrencinin satırını `FOR UPDATE` ile kilitlemek. İkinci istek bekliyor, sonra birincinin commit ettiği
skoru görüyor ve aynı gelişme için ikinci kez XP alamıyor. Farklı öğrenciler birbirini beklemiyor.
Ayrıntı: [Çözdüğüm problemler](11-cozdugum-problemler.md#2-çift-tıklama-ve-eşzamanlı-gönderim).

### Neden JWT? Token'ı `localStorage`'da tutmak güvenli mi?

JWT, sunucuda oturum tutmadan her isteği doğrulamamı sağlıyor. Token'ı üreten ve doğrulayan aynı servis
olduğu için HS256 yeterli. `localStorage` bir XSS açığında token'ın çalınmasına izin verir; bunu biliyorum.
Kodda ham HTML basan bir yer yok ve React çıktıyı kaçışlıyor, ama daha sıkı bir sistemde token'ı `httpOnly`
bir çereze taşır, CSRF korumasını açar ve kısa ömürlü access token ile refresh token kullanırdım.
Ayrıntı: [Güvenlik](06-guvenlik.md).

### Sonuç ekranı doğru cevapları gösteriyor. İkinci denemede kopya çekmek kolay olmuyor mu?

Oluyor ve bu bilinçli. SkillHub bir sınav sistemi değil, bir öğrenme platformu; yanlışının nedenini görmek
işin özü. XP politikası da ikinci denemenin getirisini, kalan farkla sınırlıyor. Sınav ciddiyetinde bir
kullanım için soru havuzu, şıkların karıştırılması ve cevapları ancak geçtikten sonra gösterme eklerdim.

### Yapay zekâ çökerse ya da yanlış bir şey söylerse?

Öğrenci bunu fark etmez. Claude'un her önerisi, öğrencinin gerçekten açabileceği derslerle karşılaştırılıyor.
Geçersiz öneri, ret, zaman aşımı ya da anahtar yokluğunda deterministik kural motoru cevap veriyor.
Ayrıntı: [Gece Rehberi](07-gece-rehberi.md).

### Sistem 100.000 kullanıcıya çıksa neyi değiştirirdin?

Önce ölçerdim; bugün metrik toplamıyorum, ilk iş bu olurdu. Sonra büyük ihtimalle şunları yapardım:

- **Sıralama:** Her istekte bütün defteri toplamak pahalılaşır. Sıralamayı dakikada bir yenilenen bir
  materialized view'a ya da zamanlanmış bir işin güncellediği bir özet tabloya taşırdım. Sıralamanın birkaç
  saniye geriden gelmesi bu ürün için kabul edilebilir.
- **Paylaşılan durum:** Rehber önbelleğini ve hız sınırlarını Redis'e taşırdım; böylece API'yi yatayda
  çoğaltabilirim.
- **Deneme başına sorgular:** Bir deneme sırasında öğrencinin istatistikleri birkaç kez okunuyor. Bunları tek
  bir okumada toplamak kolay bir kazanç.
- **Okuma yükü:** Okuma ağırlıklı uçları bir read replica'ya yönlendirmek.

### Test yazdın mı?

Bu sürümde otomatik test yok. Önceliği uçtan uca çalışan, doğru modellenmiş bir sisteme verdim; bunun bir
borç olduğunu biliyorum ve yol haritamın ilk maddesi bu. Mimarinin bana burada bir avantajı var: oyun kuralları
saf Java olduğu için `XpPolicy`, `QuizGrader`, `NightClock`, `Streak`, `LessonStatusPolicy` ve rozet kuralları
Spring açmadan, milisaniyeler içinde test edilebilir. Eşzamanlı gönderim gibi senaryolar için de gerçek
PostgreSQL ile çalışan entegrasyon testleri yazardım.

### Demo modu ile backend'in tutarlılığını nasıl sağlıyorsun?

Demo adaptörü, ekranların API'den beklediği TypeScript tiplerini döndürüyor; tip değişip demo güncellenmezse
proje derlenmiyor. İçerik, migration'lardaki kataloğun birebir kopyası. Kuralların iki dilde yaşaması bir risk;
bir sonraki adım tipleri OpenAPI dokümanından otomatik üretmek. Ayrıntı: [Yayın stratejisi](09-yayin-stratejisi.md).

### Neden yönetici paneli yok?

İçerik, kodla aynı şekilde sürümlenen migration'larla geliyor: her değişiklik gözden geçirilebiliyor ve
geri alınabiliyor. Bu boyutta bir katalog için bu yeterli. Panel geldiğinde SkillHub'a ikinci rolü (editör)
de o getirir.

### Neden adresler ve arayüz Türkçe, kod İngilizce?

Ürün Türkiye'deki gençler için; arayüz, adresler ve hata mesajları onların dilinde. Kod ise yazılım dünyasının
ortak dilinde; herhangi bir geliştirici sınıf ve metot adlarını okuyup anlayabilmeli.

### Bu projeden en çok ne öğrendin?

Çalışan kod ile doğru kod arasındaki farkı. Hackathon sürümü demoda kusursuz çalışıyordu ama gösterdiği
veriler yalan söyleyebiliyordu: uydurma isimler, kasılabilen XP, kendisiyle çelişen bir asistan. v2'deki en
büyük değişim tek bir ilke: ekrandaki her sayı tek bir doğruluk kaynağından türetiliyor ve her kural hem
uygulamada hem veritabanında korunuyor.

## Bilinen sınırlar

| Sınır | Neden kabul ettim | Ne zaman değişir |
|---|---|---|
| Otomatik test yok | Önce uçtan uca doğru çalışan sistem | Yol haritasının ilk maddesi |
| CI/CD hattı yok | Tek kişilik geliştirme, elle derleme | Testlerle birlikte |
| Metrik ve izleme yok, yalnızca sağlık ucu | Bu ölçekte günlükler yetiyor | Gerçek trafikten önce |
| Önbellek ve hız sınırı bellekte | Tek API kopyası çalışıyor | Yatay ölçeklemede Redis |
| Sıralama her okumada hesaplanıyor | Doğruluk ve sadelik; bu ölçekte hızlı | Ölçüm gerektirdiğinde özet tablo |
| Refresh token, token iptali ve giriş deneme sınırı yok | Portfolyo kapsamı | Gerçek kullanıcıdan önce |
| Yönetici paneli yok | İçerik migration'larla yönetiliyor | İçerik ekibi olduğunda |
| Kurallar demo için TypeScript'te de var | Sıfır maliyetli canlı demo | OpenAPI'den üretilen tiplerle azalır |
| Ön koşul döngüleri yalnızca içerik incelemesiyle engelleniyor | İçerik gözden geçirilen migration'larla geliyor | Açılışta grafik doğrulaması |
| Yalnızca Türkçe | Hedef kitle Türkiye | Gerek duyulursa i18n |

## Yol haritası

1. **Testler.** Saf domain kuralları için birim testleri, gerçek PostgreSQL ile çalışan entegrasyon testleri
   (eşzamanlı gönderimde tek ödeme), hata sözleşmesi ve güvenlik için web katmanı testleri.
2. **CI.** Her push'ta backend ve frontend derlemesi, testler ve Docker imajlarının üretimi.
3. **Sözleşme.** Frontend tiplerini OpenAPI dokümanından otomatik üretmek.
4. **Güvenlik.** Refresh token, `httpOnly` çerez, girişte deneme sınırı, Content-Security-Policy.
5. **İçerik paneli.** Editör rolüyle ders ve soru yönetimi.
6. **Gözlemlenebilirlik.** Micrometer ile metrikler, yapılandırılmış günlükler.
7. **Kalıcı yayın.** Bütçe elverdiğinde backend'i ve veritabanını yayına almak; arayüz tek bir ortam
   değişkeniyle gerçek API'ye geçebiliyor.
