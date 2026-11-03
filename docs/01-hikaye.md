# Hikâye: bir gece, bir birincilik ve baştan yazılan bir sistem

## Code Night gecesi

20 Kasım 2025, saat 17:00. Turkcell Academy'nin *Geleceği Yazanlar* programındaki Code Night'ın Trabzon
durağı Turkcell Trabzon Plaza'da başladı. Kural basitti: beş vakadan birini seç ve sabah 07:00'ye kadar
çalışan bir ürün çıkar. Etkinliğin sloganı geceyi iyi özetliyordu: "Gerçek kodcu gece çalışır."

İki kişilik bir takımdık: takım kaptanı bendim, takım arkadaşım **Ayşe Mandıralı**'ydı. SkillHub vakasını
seçtik: gençlerin ders izleyip quiz çözdüğü, rozet kazandığı ve gelişimini takip ettiği oyunlaştırılmış bir
öğrenme platformu. İlk commit 20:13'te, son commit 06:27'de atıldı. Sabah sonuçlar açıklandığında
**birinciydik**.

## O gece neyi kazandırdı, neyi borç bıraktı

Bir hackathon projesi fikriyle ve demosuyla kazanır. Jüri o gece bir ürün fikri, akıcı bir demo ve ekibin
hızını gördü. Ama kodun kendisi üretime hazır değildi; bunu biz de biliyorduk.

Projeyi portfolyom için yeniden açtığımda o geceki sürümü bir kod incelemesi yapar gibi baştan sona
kurcaladım. Bulduklarım:

- **Giriş gerçek değildi.** Kullanıcılar tarayıcının `localStorage`'ında duruyordu, demo şifreler giriş
  ekranında yazıyordu.
- **Liderlik tablosu isim uyduruyordu.** Backend isimleri `null` döndürüyordu, frontend boşluğu rastgele
  isimlerle dolduruyordu.
- **XP sonsuza kadar kasılabiliyordu.** Her quiz gönderimi yeniden puan veriyordu. Aynı quiz'i tekrar tekrar
  çözen biri sıralamanın tepesine çıkabilirdi.
- **Demo verisi gerçek veriyi eziyordu.** Uygulama her açılışta örnek verileri yeniden yüklüyor, gerçek
  ilerlemenin üstüne yazıyordu.
- **API anahtarı repodaydı.** Gemini anahtarı commit'lenmişti. Google onu sızdırılmış diye kapattı, yapay
  zekâ asistanı da yedek önerilere düştü.
- **Mobil görünüm bozuktu.** Ders sayfaları 390 px genişliğindeki bir telefon ekranından taşıyordu.

O gecenin ekran görüntülerini, kusurların tam listesiyle birlikte [`eski/`](../eski/) klasöründe hatıra
olarak sakladım. O geceki koda dönmek isteyen `git checkout b2ebdb0` ile oraya gidebilir.

## Neden yamamak yerine baştan yazdım

İlk iş eski kodu çalışır hâle getirdim: Java sürümünü güncelledim, eksik bir paketi ekledim. Sonra
sorunların tek tek hatalar olmadığını gördüm; sorun temeldeydi. Gerçek bir kimlik doğrulama yoktu, veri
modeli puanı bir sayaçta kopyalıyordu, iş kuralları arayüzün içine dağılmıştı. Bunları yamamak, yanlış bir
temelin üstüne kat çıkmak olacaktı.

Bu yüzden ürün fikrini ve adını koruyup veritabanını, backend'i ve arayüzü sıfırdan yazdım. Eski kod repodan
kaldırıldı ama git geçmişinde duruyor; ekran görüntüleri de `eski/` klasöründe.

## Kendime koyduğum kurallar

v2'ye başlamadan önce kendime birkaç kural koydum. Bu dokümanlardaki kararların çoğu bu kurallardan çıkıyor.

1. **Sahte veri yok.** Ekrandaki her sayı gerçek bir veritabanından ve gerçek kurallardan gelecek. Demo
   öğrencileri bile gerçek quiz servisinden geçirilerek üretilecek.
2. **Her karar anlatılabilir olacak.** "Bunu neden böyle yaptın?" sorusuna cevabım yoksa o kodu yazmayacağım.
3. **İki tarafta da temiz mimari.** Backend'de iş kuralları framework'ten bağımsız duracak. Frontend'de her
   ekran kendi klasöründe, kendi veri kancalarıyla yaşayacak.
4. **Elle yazılan hiçbir dosya 300 satırı geçmeyecek.** Kod, yapılandırma, doküman, hepsi. Büyüyen bir dosya
   sorumluluklarına göre bölünecek. Bu kural beni tek işi olan küçük sınıflar yazmaya zorladı.
5. **Tek komutla ayağa kalkacak.** `docker compose up --build` veritabanını, API'yi ve arayüzü kurup
   birbirine bağlayacak. Projeyi denemek isteyen kimse makinesine Java ya da Node kurmak zorunda kalmayacak.
6. **Önce tasarım.** Ekranlar netleşmeden veri modeli çizilmeyecek. Backend, arayüzün gerçekten ihtiyaç
   duyduğu veriye göre şekillenecek.
7. **Geçmişe dokunulmayacak.** `eski/` klasörü o gecenin hatırası olarak olduğu gibi kalacak.

## v2 neyi farklı yapıyor

| | Hackathon gecesi | v2 (bu repo) |
|---|---|---|
| **Giriş** | Kullanıcılar `localStorage`'da, demo şifreler ekranda | Stateless JWT, BCrypt, cevap süresinden e-posta sızdırmayan giriş |
| **Sıralama** | Backend `null` isim döndürüyor, frontend uyduruyordu | XP defterinden SQL window fonksiyonlarıyla hesaplanıyor |
| **XP** | Her gönderim yeniden puan veriyordu | Yalnızca en iyi skorunu geçtiğin kadar XP |
| **Demo verisi** | Her açılışta gerçek verinin üstüne yazılıyordu | Yalnızca boş veritabanına, bir kez, gerçek kurallarla |
| **Yapay zekâ** | Anahtar repodaydı, Google kapattı | Anahtar ortam değişkeninde, çıktı doğrulanıyor, kural tabanlı yedek var |
| **Mobil** | 390 px ekrandan taşıyordu | Alt gezinme çubuğu, önce telefona göre tasarlanmış ekranlar |
| **Teknoloji** | Spring Boot 3.5 · Java 21 · React 18 · MUI 7 | Spring Boot 4.1 · Java 25 · React 19 · MUI 9 |
| **Kurulum** | Elle, makine makine | `docker compose up --build` |

## Ürünün kendisi

SkillHub'da her ders gökyüzünde bir yıldız, her konu bir takımyıldız. Dört takımyıldız var: Yazılım
Geliştirme, Yapay Zeka, Siber Güvenlik ve Girişimcilik; toplam 17 ders ve 68 soru. Bir dersin quiz'ini %70 ve
üzeriyle geçtiğinde yıldızın yanar. Kazandığın XP ile **Gece Saati** 17:00'den sabah 07:00'ye doğru ilerler.
Bu saat, projenin doğduğu 14 saatlik geceye bir selam. Türkiye'nin gece haritasında şehrin, öğrencileri
öğrendikçe daha parlak yanar.

Ürünü teknik ayrıntıya girmeden gezmek için: [Demo turu](02-demo-turu.md).

## Ekip

SkillHub bir takım işi. Code Night'ı takım arkadaşım Ayşe Mandıralı ile birlikte kazandık; iki kişilik
takımımızın kaptanıydım. Projeyi geliştirmeye de birlikte devam ediyoruz. Bu dokümanlarda teknik kararları
kendi bakış açımdan anlatıyorum.
