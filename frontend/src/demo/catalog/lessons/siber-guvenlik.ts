// Siber Güvenlik lessons (Kalkan constellation).
import type { DemoLessonDetails } from '../types';

export const SIBER_GUVENLIK_LESSONS: readonly DemoLessonDetails[] = [
  {
    "id": 10, "slug": "siber-guvenligin-temelleri", "categoryId": 3, "title": "Siber Güvenliğin Temelleri",
    "summary": "Gizlilik, bütünlük ve erişilebilirlik üçlüsüyle güvenliğin temel kavramlarını ve yaygın tehditleri tanı.",
    "objectives": [
      "CIA üçlüsünü (gizlilik, bütünlük, erişilebilirlik) açıklamak",
      "Oltalama (phishing) saldırılarını tanımak",
      "Güçlü parola ve çok faktörlü doğrulamanın önemini kavramak",
      "Kimlik doğrulama ile yetkilendirmeyi ayırt etmek"
    ],
    "paragraphs": [
      "Bilgi güvenliğinin üç temel hedefi CIA üçlüsü olarak bilinir: Gizlilik (Confidentiality) bilgiye yalnızca yetkililerin erişmesi, bütünlük (Integrity) bilginin izinsiz değiştirilmemesi, erişilebilirlik (Availability) ise sistemin ihtiyaç anında çalışır olmasıdır.",
      "Saldırıların büyük kısmı teknolojiden çok insanı hedefler. Oltalama (phishing) e-postaları seni sahte bir sayfaya yönlendirip parolanı çalmaya çalışır. Gönderen adresini ve bağlantıyı tıklamadan önce kontrol etmek ilk savunma hattındır.",
      "Kimlik doğrulama (authentication) senin kim olduğunu, yetkilendirme (authorization) ise neye erişebileceğini belirler. Güçlü ve benzersiz parolalar ile çok faktörlü doğrulama (MFA), çalınan bir parolanın tek başına yetmemesini sağlar."
    ],
    "videoId": "U_P23SqJaDc", "difficulty": "BEGINNER", "durationMin": 30, "xpReward": 100, "starX": 130,
    "starY": 470, "sortOrder": 1, "categorySlug": "siber-guvenlik", "prerequisiteIds": [], "prerequisiteSlugs": [],
    "x": 130, "y": 470
  },
  {
    "id": 11, "slug": "ag-guvenligi", "categoryId": 3, "title": "Ağ Güvenliği ve Firewall",
    "summary": "Portlar, protokoller ve güvenlik duvarlarıyla ağ trafiğini kontrol etmeyi; şifreli iletişimin önemini öğren.",
    "objectives": [
      "Port ve protokol kavramlarını açıklamak",
      "Güvenlik duvarının trafiği nasıl filtrelediğini anlamak",
      "HTTP ile HTTPS arasındaki farkı kavramak",
      "VPN'in hangi durumlarda koruma sağladığını bilmek"
    ],
    "paragraphs": [
      "Ağdaki her hizmet bir port üzerinden konuşur: Web siteleri genellikle 443 (HTTPS), SSH bağlantıları 22 numaralı portu kullanır. Gereksiz açık bırakılan her port saldırgan için potansiyel bir kapıdır.",
      "Güvenlik duvarı (firewall), ağ trafiğini önceden tanımlanmış kurallara göre süzer: İzin verilenler geçer, gerisi engellenir. En iyi yaklaşım varsayılan olarak her şeyi kapatıp yalnızca gerekenleri açmaktır (default deny).",
      "HTTPS, HTTP trafiğini TLS ile şifreler; böylece aynı ağdaki biri gönderdiğin verileri okuyamaz ya da değiştiremez. Halka açık Wi-Fi ağlarında VPN, tüm trafiğini şifreli bir tünelden geçirerek ek bir koruma katmanı sağlar."
    ],
    "videoId": "qiQR5rTSshw", "difficulty": "INTERMEDIATE", "durationMin": 40, "xpReward": 150, "starX": 250,
    "starY": 390, "sortOrder": 2, "categorySlug": "siber-guvenlik", "prerequisiteIds": [10],
    "prerequisiteSlugs": ["siber-guvenligin-temelleri"],
    "x": 250, "y": 390
  },
  {
    "id": 12, "slug": "owasp-top-10", "categoryId": 3, "title": "Web Güvenliği: OWASP Top 10",
    "summary": "Web uygulamalarındaki en kritik açıkları; enjeksiyon, XSS ve erişim kontrolü hatalarını tanı ve önle.",
    "objectives": [
      "OWASP Top 10 listesinin amacını açıklamak",
      "SQL enjeksiyonunu parametreli sorgularla önlemek",
      "XSS saldırılarını ve çıktı kodlamayı anlamak",
      "Bozuk erişim kontrolünün (IDOR) riskini fark etmek"
    ],
    "paragraphs": [
      "OWASP Top 10, web uygulamalarındaki en kritik güvenlik risklerini listeleyen, sektörün referans kabul ettiği bir rehberdir. Listenin başında bozuk erişim kontrolü yer alır: Kullanıcının yetkisi olmayan verilere ulaşabilmesi.",
      "SQL enjeksiyonunda saldırgan, kullanıcı girdisi içine SQL kodu gizler. Çözüm basittir: Girdiyi asla sorguya metin olarak eklemeyip parametreli sorgular kullanmak. XSS'te ise saldırgan sayfaya zararlı JavaScript yerleştirir; çıktıyı her zaman kodlamak (encoding) bunu engeller.",
      "IDOR, bir isteğin başka bir kullanıcının kimliğini taşıyarak onun adına işlem yapabilmesidir. Bu projenin ilk sürümünde de bu açık vardı: Quiz sonucu, istek gövdesindeki kullanıcı kimliğiyle kaydediliyordu. Yeni sürümde kimlik yalnızca doğrulanmış token'dan okunuyor."
    ],
    "videoId": "rWHvp7rUka8", "difficulty": "INTERMEDIATE", "durationMin": 45, "xpReward": 150, "starX": 260,
    "starY": 540, "sortOrder": 3, "categorySlug": "siber-guvenlik", "prerequisiteIds": [10],
    "prerequisiteSlugs": ["siber-guvenligin-temelleri"],
    "x": 260, "y": 540
  },
  {
    "id": 13, "slug": "etik-hackerlik", "categoryId": 3, "title": "Etik Hackerlık ve Sızma Testi",
    "summary": "Yetki dahilinde, planlı ve raporlu bir sızma testiyle sistemleri saldırganlardan önce test et.",
    "objectives": [
      "Etik hackerlığın yasal ve etik sınırlarını bilmek",
      "Sızma testinin aşamalarını sıralamak",
      "Keşif ve tarama araçlarının rolünü anlamak",
      "Bulguları önceliklendirip raporlamak"
    ],
    "paragraphs": [
      "Etik hacker, sistemleri yazılı izin dahilinde ve tanımlı kapsamla test eden güvenlik uzmanıdır. İzinsiz yapılan her test, niyet ne olursa olsun yasa dışıdır; bu yüzden her sızma testi bir yetki belgesiyle başlar.",
      "Tipik bir sızma testi beş aşamadan oluşur: Keşif (hedef hakkında bilgi toplama), tarama (açık port ve servisleri bulma; Nmap gibi araçlarla), erişim kazanma, erişimi sürdürme ve raporlama.",
      "Testin asıl değeri rapordadır: Her bulgu risk seviyesine göre önceliklendirilir; nasıl tekrar üretileceği ve nasıl düzeltileceği açıkça yazılır. İyi bir etik hacker yalnızca açığı bulmaz, ekibin onu kapatmasına da yardım eder."
    ],
    "videoId": "2_lswM1S264", "difficulty": "ADVANCED", "durationMin": 50, "xpReward": 200, "starX": 390,
    "starY": 460, "sortOrder": 4, "categorySlug": "siber-guvenlik", "prerequisiteIds": [11, 12],
    "prerequisiteSlugs": ["ag-guvenligi", "owasp-top-10"],
    "x": 390, "y": 460
  }
];
