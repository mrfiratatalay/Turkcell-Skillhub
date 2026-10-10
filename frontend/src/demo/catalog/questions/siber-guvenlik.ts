// Siber Güvenlik quiz questions; options keep the backend seed ids.
import type { DemoQuestion } from '../types';

export const SIBER_GUVENLIK_QUESTIONS: readonly DemoQuestion[] = [
  {
    "id": 101, "lessonId": 10, "position": 1,
    "prompt": "CIA üçlüsündeki \"I\" harfi neyi ifade eder?",
    "explanation": "CIA: Confidentiality (gizlilik), Integrity (bütünlük), Availability (erişilebilirlik).",
    "options": [
      { "id": 1011, "position": 1, "label": "Kimlik (Identity)", "isCorrect": false },
      { "id": 1012, "position": 2, "label": "Altyapı (Infrastructure)", "isCorrect": false },
      { "id": 1013, "position": 3, "label": "Bütünlük (Integrity)", "isCorrect": true },
      { "id": 1014, "position": 4, "label": "İzolasyon (Isolation)", "isCorrect": false }
    ],
    "correctOptionId": 1013
  },
  {
    "id": 102, "lessonId": 10, "position": 2,
    "prompt": "Kullanıcıyı sahte bir giriş sayfasına yönlendirip bilgilerini çalmayı amaçlayan saldırı hangisidir?",
    "explanation": "Phishing, güvenilir bir kurum gibi görünerek kullanıcıyı kandırmayı hedefler.",
    "options": [
      { "id": 1021, "position": 1, "label": "Oltalama (Phishing)", "isCorrect": true },
      { "id": 1022, "position": 2, "label": "DDoS", "isCorrect": false },
      { "id": 1023, "position": 3, "label": "SQL enjeksiyonu", "isCorrect": false },
      { "id": 1024, "position": 4, "label": "Kaba kuvvet (Brute force)", "isCorrect": false }
    ],
    "correctOptionId": 1021
  },
  {
    "id": 103, "lessonId": 10, "position": 3,
    "prompt": "Kimlik doğrulama (authentication) neyi kontrol eder?",
    "explanation": "Authentication kim olduğunu, authorization ise neye erişebileceğini belirler.",
    "options": [
      { "id": 1031, "position": 1, "label": "Kullanıcının neye erişebileceğini", "isCorrect": false },
      { "id": 1032, "position": 2, "label": "Sistemin ne kadar hızlı olduğunu", "isCorrect": false },
      { "id": 1033, "position": 3, "label": "Verinin şifrelenip şifrelenmediğini", "isCorrect": false },
      { "id": 1034, "position": 4, "label": "Kullanıcının kim olduğunu", "isCorrect": true }
    ],
    "correctOptionId": 1034
  },
  {
    "id": 104, "lessonId": 10, "position": 4,
    "prompt": "Parolan çalınsa bile hesabını korumaya yardım eden yöntem hangisidir?",
    "explanation": "MFA, paroladan başka bir doğrulama faktörü (telefon, güvenlik anahtarı vb.) ister.",
    "options": [
      { "id": 1041, "position": 1, "label": "Parolayı not defterine yazmak", "isCorrect": false },
      { "id": 1042, "position": 2, "label": "Çok faktörlü doğrulama (MFA)", "isCorrect": true },
      { "id": 1043, "position": 3, "label": "Aynı parolayı her yerde kullanmak", "isCorrect": false },
      { "id": 1044, "position": 4, "label": "Parolayı kısaltmak", "isCorrect": false }
    ],
    "correctOptionId": 1042
  },
  {
    "id": 111, "lessonId": 11, "position": 1,
    "prompt": "HTTPS varsayılan olarak hangi portu kullanır?",
    "explanation": "HTTPS 443, HTTP ise 80 numaralı portu kullanır.",
    "options": [
      { "id": 1111, "position": 1, "label": "21", "isCorrect": false },
      { "id": 1112, "position": 2, "label": "80", "isCorrect": false },
      { "id": 1113, "position": 3, "label": "3306", "isCorrect": false },
      { "id": 1114, "position": 4, "label": "443", "isCorrect": true }
    ],
    "correctOptionId": 1114
  },
  {
    "id": 112, "lessonId": 11, "position": 2,
    "prompt": "Güvenlik duvarı için en güvenli varsayılan kural yaklaşımı hangisidir?",
    "explanation": "Default deny yaklaşımında yalnızca açıkça izin verilen trafik geçer.",
    "options": [
      { "id": 1121, "position": 1, "label": "Her şeyi engelle, yalnızca gerekenlere izin ver", "isCorrect": true },
      { "id": 1122, "position": 2, "label": "Her şeye izin ver, şüphelileri engelle", "isCorrect": false },
      { "id": 1123, "position": 3, "label": "Sadece gece saatlerinde engelle", "isCorrect": false },
      { "id": 1124, "position": 4, "label": "Hiç kural kullanma", "isCorrect": false }
    ],
    "correctOptionId": 1121
  },
  {
    "id": 113, "lessonId": 11, "position": 3,
    "prompt": "HTTPS'in HTTP'ye göre temel avantajı nedir?",
    "explanation": "HTTPS iletişimi TLS ile şifreleyerek dinleme ve değiştirme saldırılarını önler.",
    "options": [
      { "id": 1131, "position": 1, "label": "Daha hızlı olması", "isCorrect": false },
      { "id": 1132, "position": 2, "label": "Daha az port kullanması", "isCorrect": false },
      { "id": 1133, "position": 3, "label": "Trafiği TLS ile şifrelemesi", "isCorrect": true },
      { "id": 1134, "position": 4, "label": "Çerez kullanmaması", "isCorrect": false }
    ],
    "correctOptionId": 1133
  },
  {
    "id": 114, "lessonId": 11, "position": 4,
    "prompt": "Halka açık Wi-Fi'da trafiği şifreli bir tünelden geçiren araç hangisidir?",
    "explanation": "VPN, cihazınla VPN sunucusu arasında şifreli bir tünel kurar.",
    "options": [
      { "id": 1141, "position": 1, "label": "DNS", "isCorrect": false },
      { "id": 1142, "position": 2, "label": "VPN", "isCorrect": true },
      { "id": 1143, "position": 3, "label": "DHCP", "isCorrect": false },
      { "id": 1144, "position": 4, "label": "FTP", "isCorrect": false }
    ],
    "correctOptionId": 1142
  },
  {
    "id": 121, "lessonId": 12, "position": 1,
    "prompt": "SQL enjeksiyonunu önlemenin en etkili yolu hangisidir?",
    "explanation": "Parametreli sorgularda girdi her zaman veri olarak işlenir, asla SQL kodu olarak çalıştırılmaz.",
    "options": [
      { "id": 1211, "position": 1, "label": "Girdiyi büyük harfe çevirmek", "isCorrect": false },
      { "id": 1212, "position": 2, "label": "Parametreli sorgular kullanmak", "isCorrect": true },
      { "id": 1213, "position": 3, "label": "Sorguları uzun yazmak", "isCorrect": false },
      { "id": 1214, "position": 4, "label": "Veritabanını yeniden başlatmak", "isCorrect": false }
    ],
    "correctOptionId": 1212
  },
  {
    "id": 122, "lessonId": 12, "position": 2,
    "prompt": "Sayfaya zararlı JavaScript enjekte edilmesine dayanan saldırı hangisidir?",
    "explanation": "Cross-Site Scripting (XSS), kullanıcının tarayıcısında saldırganın betiğini çalıştırır.",
    "options": [
      { "id": 1221, "position": 1, "label": "CSRF", "isCorrect": false },
      { "id": 1222, "position": 2, "label": "DDoS", "isCorrect": false },
      { "id": 1223, "position": 3, "label": "XSS", "isCorrect": true },
      { "id": 1224, "position": 4, "label": "MITM", "isCorrect": false }
    ],
    "correctOptionId": 1223
  },
  {
    "id": 123, "lessonId": 12, "position": 3,
    "prompt": "Kullanıcının, isteğindeki kimliği değiştirerek başkasının verisine erişebildiği açık hangisidir?",
    "explanation": "IDOR bir bozuk erişim kontrolü örneğidir; sunucu nesneye erişim yetkisini kontrol etmez.",
    "options": [
      { "id": 1231, "position": 1, "label": "IDOR", "isCorrect": true },
      { "id": 1232, "position": 2, "label": "Zayıf parola", "isCorrect": false },
      { "id": 1233, "position": 3, "label": "Açık port", "isCorrect": false },
      { "id": 1234, "position": 4, "label": "Eski tarayıcı", "isCorrect": false }
    ],
    "correctOptionId": 1231
  },
  {
    "id": 124, "lessonId": 12, "position": 4, "prompt": "OWASP Top 10 nedir?",
    "explanation": "OWASP Top 10, web güvenliğindeki en kritik riskleri düzenli olarak güncelleyen referans listedir.",
    "options": [
      { "id": 1241, "position": 1, "label": "En popüler 10 programlama dili", "isCorrect": false },
      { "id": 1242, "position": 2, "label": "10 adımlık kurulum rehberi", "isCorrect": false },
      { "id": 1243, "position": 3, "label": "Bir antivirüs yazılımı", "isCorrect": false },
      {
        "id": 1244, "position": 4,
        "label": "Web uygulamalarındaki en kritik güvenlik risklerinin listesi",
        "isCorrect": true
      }
    ],
    "correctOptionId": 1244
  },
  {
    "id": 131, "lessonId": 13, "position": 1,
    "prompt": "Etik hackerlığı yasa dışı saldırıdan ayıran en temel unsur nedir?",
    "explanation": "Etik hackerlık her zaman sistem sahibinin yazılı izniyle ve belirlenmiş kapsam içinde yapılır.",
    "options": [
      { "id": 1311, "position": 1, "label": "Kullanılan araçlar", "isCorrect": false },
      { "id": 1312, "position": 2, "label": "Saldırının gece yapılması", "isCorrect": false },
      { "id": 1313, "position": 3, "label": "Yazılı izin ve tanımlı kapsam", "isCorrect": true },
      { "id": 1314, "position": 4, "label": "Hedefin büyüklüğü", "isCorrect": false }
    ],
    "correctOptionId": 1313
  },
  {
    "id": 132, "lessonId": 13, "position": 2,
    "prompt": "Sızma testinin ilk aşaması genellikle hangisidir?",
    "explanation": "Test, hedef hakkında bilgi toplanan keşif (reconnaissance) aşamasıyla başlar.",
    "options": [
      { "id": 1321, "position": 1, "label": "Keşif (Reconnaissance)", "isCorrect": true },
      { "id": 1322, "position": 2, "label": "Raporlama", "isCorrect": false },
      { "id": 1323, "position": 3, "label": "Erişimi sürdürme", "isCorrect": false },
      { "id": 1324, "position": 4, "label": "Yama yapma", "isCorrect": false }
    ],
    "correctOptionId": 1321
  },
  {
    "id": 133, "lessonId": 13, "position": 3,
    "prompt": "Ağdaki açık portları ve servisleri taramak için yaygın kullanılan araç hangisidir?",
    "explanation": "Nmap; ağdaki cihazları, açık portları ve çalışan servisleri keşfetmek için kullanılan bir tarama aracıdır.",
    "options": [
      { "id": 1331, "position": 1, "label": "Photoshop", "isCorrect": false },
      { "id": 1332, "position": 2, "label": "Excel", "isCorrect": false },
      { "id": 1333, "position": 3, "label": "Docker", "isCorrect": false },
      { "id": 1334, "position": 4, "label": "Nmap", "isCorrect": true }
    ],
    "correctOptionId": 1334
  },
  {
    "id": 134, "lessonId": 13, "position": 4,
    "prompt": "Sızma testi raporunda bulgular neye göre önceliklendirilir?",
    "explanation": "Bulgular etki ve olasılığa göre risk seviyesiyle önceliklendirilir; kritik açıklar önce kapatılır.",
    "options": [
      { "id": 1341, "position": 1, "label": "Bulunma sırasına", "isCorrect": false },
      { "id": 1342, "position": 2, "label": "Risk seviyesine", "isCorrect": true },
      { "id": 1343, "position": 3, "label": "Alfabetik sıraya", "isCorrect": false },
      { "id": 1344, "position": 4, "label": "Test eden kişiye", "isCorrect": false }
    ],
    "correctOptionId": 1342
  }
];
