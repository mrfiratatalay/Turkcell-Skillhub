# Çözdüğüm problemler

Bu sayfada projedeki en öğretici problemleri kısa hikâyeler olarak topladım. Her birinde önce problemi, sonra
çözümü ve neden o çözümü seçtiğimi anlatıyorum. Ayrıntılar ilgili dokümanlarda ve kodda.

## 1. Aynı quiz'i çözerek sonsuz XP kasmak

**Problem.** Hackathon sürümünde her quiz gönderimi yeniden puan veriyordu. Bir öğrenci aynı kolay quiz'i yüz
kez çözüp sıralamanın tepesine çıkabilirdi.

**Çözüm.** XP'yi "yapılan iş" için değil "gösterilen gelişme" için veriyorum. Yeni skorun karşılığından,
önceki en iyi skorun karşılığını çıkarıyorum; sonuç negatifse sıfır. Bir dersten alınabilecek XP, dersin
değerini asla geçemiyor.

**Neden böyle.** Tekrar çözmeyi yasaklamak öğrenmeyi cezalandırırdı. Bu kural tekrarı serbest bırakıyor ama
ödülü yalnızca gelişmeye bağlıyor. Kod: [`XpPolicy`](../backend/src/main/java/com/skillhub/progress/domain/XpPolicy.java).

## 2. Çift tıklama ve eşzamanlı gönderim

**Problem.** Kullanıcı "Gönder"e iki kez hızlıca bastığında iki istek aynı anda gelir. İkisi de önceki en iyi
skoru %50 okur, ikisi de "%50'den %100'e çıktın" der ve aynı gelişme iki kez ödenir.

**Çözüm.** Denemenin ilk adımı öğrencinin `users` satırını kilitlemek: `SELECT ... FOR UPDATE`. İkinci istek,
birincinin transaction'ı bitene kadar bekliyor. Devam ettiğinde birincinin commit ettiği skoru ve XP'yi
görüyor; ödenecek bir gelişme kalmadığı için sıfır XP alıyor.

**Neden böyle.** Kilidi ders yerine öğrenciye koydum, çünkü XP, seri ve rozet hesapları öğrencinin bütün
verisine bakıyor. Bedeli, aynı öğrencinin denemelerinin sırayla işlenmesi; tek bir öğrencinin aynı anda iki
quiz göndermesinin anlamlı bir kullanım olmadığını düşündüm. Farklı öğrenciler birbirini hiç beklemiyor.
Kod: [`QuizService`](../backend/src/main/java/com/skillhub/quiz/application/QuizService.java),
[`JdbcQuizRepository.lockLearner`](../backend/src/main/java/com/skillhub/quiz/infrastructure/JdbcQuizRepository.java).

## 3. Kendi kendini çağıran `@Transactional`

**Problem.** Web isteği `submit()` metoduna geliyor, `submit()` de zamanı ekleyip aynı sınıftaki
`submitAt()`'i çağırıyor. Yalnızca `submitAt()` işaretli olsaydı, web isteklerinde transaction hiç açılmazdı.
Spring transaction'ı sınıfın etrafındaki bir proxy ile yönetiyor; aynı sınıfın içinden yapılan çağrı proxy'ye
hiç uğramıyor. Kilit, XP ve rozet yazmaları ayrı ayrı commit edilir, satır kilidi de anında bırakılırdı.

**Çözüm.** Giriş noktası olan `submit()` metodunu da `@Transactional` ile işaretledim ve nedenini metodun
üstüne yorum olarak yazdım. `submitAt()`'in kendi işareti de duruyor, çünkü demo verisi üreticisi onu başka
bir sınıftan, yani proxy üzerinden çağırıyor.

**Neden böyle.** Bu, Spring'in en bilinen tuzaklarından biri ve hata vermeden yanlış çalıştığı için tehlikeli.
Kod incelemesinde gözden kaçması kolay olduğu için yorumu bilerek açık yazdım: aynı sınıf içinden çağrılan
transaction'lı bir metodun giriş noktası da işaretlenmeli.

## 4. Aynı e-postayla iki eşzamanlı kayıt

**Problem.** Kayıt akışı önce "bu e-posta var mı?" diye bakıyor, yoksa ekliyor. Aynı e-postayla iki istek aynı
anda gelirse ikisi de "yok" cevabını alıp eklemeye çalışabilir.

**Çözüm.** Asıl garanti veritabanında: `lower(email)` üzerinde unique index. İkinci ekleme bu index'e
çarpınca `DuplicateKeyException` fırlıyor; servis bunu yakalayıp aynı anlaşılır `409` cevabına çeviriyor ve
hatayı e-posta alanına bağlıyor.

**Neden böyle.** Uygulamadaki kontrol kullanıcıya iyi bir mesaj vermek için, veritabanındaki kısıt doğruluk
için. Yarış durumunda kullanıcı bir `500` değil, formda "Bu e-posta adresiyle zaten bir hesap var." görüyor.
Kod: [`AuthService.register`](../backend/src/main/java/com/skillhub/identity/application/AuthService.java).

## 5. Giriş süresinden e-posta keşfi

**Problem.** E-posta yoksa giriş hemen reddedilir, varsa yavaş bir BCrypt karşılaştırması yapılır. Cevap
süresindeki fark, hangi e-postaların kayıtlı olduğunu ele verir.

**Çözüm.** Uygulama açılırken bir tuzak hash üretiliyor. E-posta bulunamasa da şifre bu hash'le
karşılaştırılıyor; iki durumda da aynı iş, aynı süre ve aynı mesaj. Ayrıntı: [Güvenlik](06-guvenlik.md).

## 6. Başkasının verisine erişim (IDOR)

**Problem.** `/users/42/attempts` gibi bir uç, kimliği değiştirerek başkasının verisine bakmaya davetiye
çıkarır. Her uçta "bu kişi bu veriye bakabilir mi?" kontrolü yazmak da unutulmaya açık.

**Çözüm.** Kimliği dışarıdan almayı tamamen bıraktım. Controller'lar kullanıcı kimliğini yalnızca doğrulanmış
token'dan, `@CurrentUser` ile alıyor; API'deki her kişisel uç "ben" üzerinden çalışıyor (`/me`,
`/me/attempts`). Kontrol unutulamıyor, çünkü kontrol edilecek bir parametre yok.

## 7. Uydurma liderlik tablosu

**Problem.** Hackathon'da backend isimleri `null` döndürüyordu, frontend de boşluğu rastgele isimlerle
dolduruyordu. Ekranda görünen sıralama hiçbir gerçeği yansıtmıyordu.

**Çözüm.** Sıralamayı hiçbir yerde saklamıyorum; her okumada XP defterinden SQL ile hesaplıyorum. Tek sorgu
`RANK() OVER (...)` ile genel sırayı, `RANK() OVER (PARTITION BY city_id ...)` ile şehir içi sırayı veriyor.
Şehir haritası sorgusu `cities` tablosundan `LEFT JOIN` ile başladığı için öğrencisi olmayan iller de haritada
yer alıyor. Ayrıntı: [Veritabanı](04-veritabani.md#sıralama-sorgusu).

## 8. Yapay zekânın uydurması

**Problem.** Bir dil modeli var olmayan bir dersi önerebilir, öğrencinin zaten bitirdiği bir şeyi "çok
yakınsın" diye sunabilir ya da hiç cevap vermeyebilir.

**Çözüm.** Modele yalnızca gerçek ilerlemeyi gösteriyorum, cevabı bir JSON şemasıyla istiyorum ve her öneriyi
öğrencinin gerçekten açabileceği derslerle karşılaştırıyorum. Geçerli öneri kalmazsa, model reddederse ya da
hata olursa deterministik kural motoru cevap veriyor. Ayrıntı: [Gece Rehberi](07-gece-rehberi.md).

## 9. Bayat öneriler

**Problem.** Rehber önerileri 10 dakika önbellekte tutuluyor. Öğrenci bir quiz'i geçtikten sonra rehber hâlâ
"bu dersi bitir" diyorsa, ürün aptal görünür.

**Çözüm.** Quiz servisi bir `AttemptCompleted` olayı yayınlıyor; rehber servisi bunu
`@TransactionalEventListener` ile, transaction commit edildikten **sonra** dinleyip o öğrencinin önbelleğini
siliyor. Quiz modülü rehberin varlığından haberdar değil.

**Neden commit'ten sonra.** Silme transaction içinde yapılsaydı, araya giren bir rehber isteği henüz commit
edilmemiş eski veriyle önbelleği yeniden doldurabilirdi.

## 10. Hem gerçekçi hem tekrarlanabilir demo verisi

**Problem.** Bir öğrenme platformunu boş bir veritabanıyla göstermek anlamsız. Ama elle `INSERT` edilen
XP'ler, seriler ve rozetler kurallarla çelişebilir. Hackathon sürümünde ise örnek veriler her açılışta yeniden
yüklenip gerçek ilerlemenin üstüne yazılıyordu.

**Çözüm.** 30 kurgusal öğrencinin her birine bir kişilik verdim: ne kadar bildiği, kaç gün çalıştığı,
serisinin bugüne uzanıp uzanmadığı, gece kuşu olup olmadığı. [`LearningSimulator`](../backend/src/main/java/com/skillhub/demo/LearningSimulator.java)
bu kişilikleri son dört haftaya yayıp her denemeyi **gerçek** `QuizService.submitAt` üzerinden, geçmiş bir
zaman damgasıyla oynatıyor. XP, seri, rozet ve sıralama canlı trafikle aynı koddan çıkıyor.

- Veri yalnızca **boş** bir veritabanına ve tek bir transaction'da ekleniyor; ya hepsi ya hiçbiri.
- Rastgelelik sabit bir tohumla (`20251120`, Code Night'ın tarihi) üretiliyor; her kurulum aynı sonucu veriyor.
- 30 öğrenci için şifre bir kez hash'leniyor; 30 ayrı BCrypt hesaplaması açılışı gereksiz yere yavaşlatırdı.

## 11. Türkçe harfler: sıralama, arama ve e-posta

**Problem.** Türkçe, yazılımın en sevdiği tuzaklardan biri. Varsayılan sıralama "Çanakkale"yi listenin yanlış
yerine koyabiliyor; büyük "I" harfi Türkçe kurallarla küçültülünce noktasız "ı" oluyor.

**Çözüm.** İki ayrı kural uyguladım:

- **Türkçe metinde Türkçe kurallar.** 81 il Java'da `tr-TR` `Collator` ile sıralanıyor (Ç, C'den; İ, I'dan
  sonra). Ders aramasında metin `tr-TR` ile küçültülüyor; "İŞ MODELİ" araması "İş Modeli Kanvası" dersini buluyor.
- **Teknik metinde dilden bağımsız kurallar.** E-posta `Locale.ROOT` ile küçültülüyor; `ILKAY@ORNEK.DEV`
  `ılkay@...` olmuyor.

## 12. Para harcamadan her zaman açık bir canlı demo

**Problem.** Backend'i ve veritabanını sürekli açık tutmak para istiyor; ücretsiz katmanlar sunucuyu uyutuyor
ya da veriyi siliyor. İK uzmanının tıkladığı bağlantı çalışmıyorsa projenin geri kalanının bir önemi yok.

**Çözüm.** Arayüze ikinci bir veri katmanı yazdım: gerçek API ile aynı sözleşmeyi tarayıcıda karşılayan bir
demo adaptörü. Vercel'deki canlı demo bu modda, sıfır maliyetle ve her zaman açık. Mod derleme anında seçildiği
için Docker'daki gerçek sürümün paketinde demo kodu hiç yer almıyor. Ayrıntı: [Yayın stratejisi](09-yayin-stratejisi.md).
