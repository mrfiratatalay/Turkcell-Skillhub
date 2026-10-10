// Yazılım Geliştirme lessons (Kod Avcısı constellation).
import type { DemoLessonDetails } from '../types';

export const YAZILIM_LESSONS: readonly DemoLessonDetails[] = [
  {
    "id": 1, "slug": "python-ile-ilk-adim", "categoryId": 1, "title": "Python ile İlk Adım",
    "summary": "Değişkenler, veri tipleri, koşullar ve döngülerle ilk Python programlarını yaz.",
    "objectives": [
      "Değişken ve temel veri tiplerini kullanmak",
      "if/else ile karar yapıları kurmak",
      "for ve while döngüleriyle tekrar eden işleri otomatikleştirmek",
      "Fonksiyon tanımlayıp yeniden kullanmak"
    ],
    "paragraphs": [
      "Python, okunabilir sözdizimi sayesinde programlamaya başlamak için en sevilen dillerden biridir. Web geliştirmeden veri bilimine, otomasyondan yapay zekaya kadar pek çok alanda kullanılır.",
      "Bir değişken, bir değere verdiğin isimdir: yas = 21 dediğinde yas artık 21'i temsil eder. Python türleri kendisi çıkarır; int, float, str ve bool en sık kullanacağın temel tiplerdir.",
      "Karar yapıları (if, elif, else) programının farklı durumlara göre davranmasını sağlar. Döngüler (for, while) aynı işi tekrar tekrar yazmadan yapmanı sağlar. Tekrar eden mantığı def ile bir fonksiyona taşımak kodunu sade ve test edilebilir kılar."
    ],
    "videoId": "kqtD5dpn9C8", "difficulty": "BEGINNER", "durationMin": 30, "xpReward": 100, "starX": 120,
    "starY": 220, "sortOrder": 1, "categorySlug": "yazilim", "prerequisiteIds": [], "prerequisiteSlugs": [],
    "x": 120, "y": 220
  },
  {
    "id": 2, "slug": "veri-yapilari-ve-algoritmalar", "categoryId": 1, "title": "Veri Yapıları ve Algoritmalar",
    "summary": "Doğru veri yapısını seçmeyi ve algoritmaları Big-O ile karşılaştırmayı öğren.",
    "objectives": [
      "Dizi, yığın (stack), kuyruk (queue) ve hash tablosunu ayırt etmek",
      "Big-O gösterimiyle zaman karmaşıklığını yorumlamak",
      "İkili arama (binary search) mantığını kavramak",
      "Probleme uygun veri yapısını seçmek"
    ],
    "paragraphs": [
      "Veri yapısı, verini bellekte nasıl düzenlediğindir; algoritma ise o veri üzerinde izlediğin adımlardır. Doğru eşleşme, aynı problemi saniyeler yerine milisaniyelerde çözmeni sağlar.",
      "Yığın (stack) son giren ilk çıkar (LIFO) mantığıyla çalışır; geri al (undo) özelliği buna güzel bir örnektir. Kuyruk (queue) ilk giren ilk çıkar (FIFO) prensibiyle çalışır. Hash tablosu ise anahtardan değere ortalama O(1) erişim sağlar.",
      "Big-O gösterimi, girdi büyüdükçe algoritmanın nasıl ölçeklendiğini anlatır. Sıralı bir dizide ikili arama her adımda arama alanını yarıya indirir ve O(log n) sürede sonuca ulaşır; doğrusal arama ise O(n) sürer."
    ],
    "videoId": "8hly31xKli0", "difficulty": "INTERMEDIATE", "durationMin": 45, "xpReward": 150, "starX": 240,
    "starY": 130, "sortOrder": 2, "categorySlug": "yazilim", "prerequisiteIds": [1],
    "prerequisiteSlugs": ["python-ile-ilk-adim"],
    "x": 240, "y": 130
  },
  {
    "id": 3, "slug": "git-ile-takim-calismasi", "categoryId": 1, "title": "Git ile Takım Çalışması",
    "summary": "Commit, branch, merge ve pull request akışıyla ekibinle aynı kod üzerinde çakışmadan çalış.",
    "objectives": [
      "Commit ile değişiklikleri anlamlı adımlara bölmek",
      "Branch açıp özellik geliştirmek",
      "Merge sırasında çakışma (conflict) çözmek",
      "Pull request ile kod incelemesi yapmak"
    ],
    "paragraphs": [
      "Git, kodunun zaman makinesidir. Her commit projenin o anki fotoğrafını ve bir açıklamasını saklar; böylece neyin, ne zaman ve neden değiştiğini her zaman görebilirsin.",
      "Branch'ler ana koddan bağımsız çalışma alanlarıdır. Yeni bir özelliği kendi branch'inde geliştirir, bitince ana branch'e merge edersin. Aynı satırı iki kişi farklı değiştirdiyse Git bir çakışma bildirir ve hangisinin kalacağına sen karar verirsin.",
      "Takım çalışmasında pull request (PR) altın standarttır: Değişikliğini ekibe sunar, kod incelemesinden geçirir, sonra birleştirirsin. Code Night gibi yoğun bir gecede bile düzenli commit ve PR alışkanlığı ekibi hızlandırır."
    ],
    "videoId": "RGOj5yH7evk", "difficulty": "BEGINNER", "durationMin": 25, "xpReward": 100, "starX": 250,
    "starY": 290, "sortOrder": 3, "categorySlug": "yazilim", "prerequisiteIds": [1],
    "prerequisiteSlugs": ["python-ile-ilk-adim"],
    "x": 250, "y": 290
  },
  {
    "id": 4, "slug": "rest-api-tasarimi", "categoryId": 1, "title": "REST API Tasarımı",
    "summary": "Kaynak odaklı URL'ler, doğru HTTP metotları ve durum kodlarıyla tutarlı API'ler tasarla.",
    "objectives": [
      "Kaynakları isim odaklı URL'lerle modellemek",
      "GET, POST, PUT, PATCH ve DELETE'i doğru kullanmak",
      "Anlamlı HTTP durum kodları döndürmek",
      "Hata cevaplarını standart bir formatta vermek"
    ],
    "paragraphs": [
      "REST, istemci ile sunucunun HTTP üzerinden kaynaklar aracılığıyla konuştuğu bir mimari stildir. İyi bir API'de URL'ler fiil değil isim içerir: /lessons/42/attempts gibi.",
      "HTTP metotları niyeti anlatır: GET okur, POST yeni kaynak oluşturur, PUT tamamen değiştirir, PATCH kısmen günceller, DELETE siler. GET isteklerinin yan etkisiz, PUT ve DELETE'in ise idempotent olması beklenir.",
      "Durum kodları istemcinin ne olduğunu anlamasını sağlar: 200 başarılı, 201 oluşturuldu, 400 hatalı istek, 401 kimlik doğrulama gerekli, 403 yetkisiz, 404 bulunamadı, 409 çakışma. Hata gövdelerini RFC 9457 Problem Details gibi bir standartla vermek API'yi öngörülebilir kılar."
    ],
    "videoId": "GZvSYJDk-us", "difficulty": "INTERMEDIATE", "durationMin": 40, "xpReward": 150, "starX": 370,
    "starY": 210, "sortOrder": 4, "categorySlug": "yazilim", "prerequisiteIds": [2, 3],
    "prerequisiteSlugs": ["veri-yapilari-ve-algoritmalar", "git-ile-takim-calismasi"],
    "x": 370, "y": 210
  },
  {
    "id": 5, "slug": "temiz-kod-ve-solid", "categoryId": 1, "title": "Temiz Kod ve SOLID",
    "summary": "SOLID prensipleri ve temiz kod alışkanlıklarıyla büyüdükçe bozulmayan yazılımlar kur.",
    "objectives": [
      "Tek Sorumluluk Prensibi ile sınıfları sadeleştirmek",
      "Açık/Kapalı Prensibi ile genişletilebilir tasarım yapmak",
      "Bağımlılıkları tersine çevirerek modülleri ayırmak",
      "Anlamlı isimler ve küçük fonksiyonlarla okunabilir kod yazmak"
    ],
    "paragraphs": [
      "Temiz kod, başkasının (ve altı ay sonraki senin) kolayca okuyup değiştirebildiği koddur. Anlamlı isimler, kısa fonksiyonlar ve tek bir işi iyi yapan sınıflar bu yolun temelidir.",
      "SOLID beş prensipten oluşur: Single Responsibility (tek bir değişme nedeni), Open/Closed (değiştirmeden genişletmek), Liskov Substitution (alt tipler üst tipin yerine geçebilmeli), Interface Segregation (küçük, odaklı arayüzler) ve Dependency Inversion (soyutlamalara bağımlı olmak).",
      "Bu projede rozet kuralları Strategy deseniyle yazıldı: Yeni bir rozet eklemek için mevcut kodu değiştirmeden yeni bir kural sınıfı eklemek yeterli. İşte Open/Closed Prensibi'nin gerçek hayattaki karşılığı."
    ],
    "videoId": "pTB0EiLXUC8", "difficulty": "ADVANCED", "durationMin": 45, "xpReward": 200, "starX": 430,
    "starY": 95, "sortOrder": 5, "categorySlug": "yazilim", "prerequisiteIds": [4],
    "prerequisiteSlugs": ["rest-api-tasarimi"],
    "x": 430, "y": 95
  }
];
