// Yazılım Geliştirme quiz questions; options keep the backend seed ids.
import type { DemoQuestion } from '../types';

export const YAZILIM_QUESTIONS: readonly DemoQuestion[] = [
  {
    "id": 11, "lessonId": 1, "position": 1,
    "prompt": "Python'da bir fonksiyon tanımlamak için hangi anahtar kelime kullanılır?",
    "explanation": "Python'da fonksiyonlar def anahtar kelimesiyle tanımlanır: def selamla(): ...",
    "options": [
      { "id": 111, "position": 1, "label": "function", "isCorrect": false },
      { "id": 112, "position": 2, "label": "def", "isCorrect": true },
      { "id": 113, "position": 3, "label": "func", "isCorrect": false },
      { "id": 114, "position": 4, "label": "define", "isCorrect": false }
    ],
    "correctOptionId": 112
  },
  {
    "id": 12, "lessonId": 1, "position": 2,
    "prompt": "print(2 ** 3) ifadesinin çıktısı nedir?",
    "explanation": "** üs alma operatörüdür; 2'nin 3. kuvveti 8'dir.",
    "options": [
      { "id": 121, "position": 1, "label": "6", "isCorrect": false },
      { "id": 122, "position": 2, "label": "9", "isCorrect": false },
      { "id": 123, "position": 3, "label": "8", "isCorrect": true },
      { "id": 124, "position": 4, "label": "16", "isCorrect": false }
    ],
    "correctOptionId": 123
  },
  {
    "id": 13, "lessonId": 1, "position": 3,
    "prompt": "Aşağıdakilerden hangisi Python'da bir liste oluşturur?",
    "explanation": "Köşeli parantez liste oluşturur; normal parantez demet (tuple), süslü parantez küme (set) oluşturur.",
    "options": [
      { "id": 131, "position": 1, "label": "[1, 2, 3]", "isCorrect": true },
      { "id": 132, "position": 2, "label": "(1, 2, 3)", "isCorrect": false },
      { "id": 133, "position": 3, "label": "{1, 2, 3}", "isCorrect": false },
      { "id": 134, "position": 4, "label": "<1, 2, 3>", "isCorrect": false }
    ],
    "correctOptionId": 131
  },
  {
    "id": 14, "lessonId": 1, "position": 4,
    "prompt": "for i in range(3): print(i) kodu hangi değerleri yazdırır?",
    "explanation": "range(3) 0'dan başlar ve 3'e kadar (3 hariç) sayar: 0, 1, 2.",
    "options": [
      { "id": 141, "position": 1, "label": "1 2 3", "isCorrect": false },
      { "id": 142, "position": 2, "label": "0 1 2 3", "isCorrect": false },
      { "id": 143, "position": 3, "label": "3 2 1", "isCorrect": false },
      { "id": 144, "position": 4, "label": "0 1 2", "isCorrect": true }
    ],
    "correctOptionId": 144
  },
  {
    "id": 21, "lessonId": 2, "position": 1,
    "prompt": "Son giren elemanın ilk çıktığı (LIFO) veri yapısı hangisidir?",
    "explanation": "Yığın LIFO çalışır; tarayıcıdaki geri tuşu ve geri al işlemleri yığın mantığına dayanır.",
    "options": [
      { "id": 211, "position": 1, "label": "Yığın (Stack)", "isCorrect": true },
      { "id": 212, "position": 2, "label": "Kuyruk (Queue)", "isCorrect": false },
      { "id": 213, "position": 3, "label": "Hash tablosu", "isCorrect": false },
      { "id": 214, "position": 4, "label": "Bağlı liste", "isCorrect": false }
    ],
    "correctOptionId": 211
  },
  {
    "id": 22, "lessonId": 2, "position": 2,
    "prompt": "Sıralı bir dizide ikili aramanın zaman karmaşıklığı nedir?",
    "explanation": "İkili arama her adımda arama alanını yarıya indirdiği için O(log n) sürede çalışır.",
    "options": [
      { "id": 221, "position": 1, "label": "O(n)", "isCorrect": false },
      { "id": 222, "position": 2, "label": "O(n²)", "isCorrect": false },
      { "id": 223, "position": 3, "label": "O(1)", "isCorrect": false },
      { "id": 224, "position": 4, "label": "O(log n)", "isCorrect": true }
    ],
    "correctOptionId": 224
  },
  {
    "id": 23, "lessonId": 2, "position": 3,
    "prompt": "Anahtar-değer çiftlerine ortalama O(1) erişim sağlayan yapı hangisidir?",
    "explanation": "Hash tablosu anahtarı bir hash fonksiyonuyla doğrudan bir konuma eşler; ortalama erişim O(1)'dir.",
    "options": [
      { "id": 231, "position": 1, "label": "Yığın", "isCorrect": false },
      { "id": 232, "position": 2, "label": "Hash tablosu", "isCorrect": true },
      { "id": 233, "position": 3, "label": "Sıralı dizi", "isCorrect": false },
      { "id": 234, "position": 4, "label": "Ağaç", "isCorrect": false }
    ],
    "correctOptionId": 232
  },
  {
    "id": 24, "lessonId": 2, "position": 4,
    "prompt": "İç içe iki döngüyle n elemanlı listenin tüm ikililerini karşılaştıran algoritmanın karmaşıklığı nedir?",
    "explanation": "Her eleman için tüm elemanları dolaşmak n × n işlem demektir: O(n²).",
    "options": [
      { "id": 241, "position": 1, "label": "O(n)", "isCorrect": false },
      { "id": 242, "position": 2, "label": "O(log n)", "isCorrect": false },
      { "id": 243, "position": 3, "label": "O(n²)", "isCorrect": true },
      { "id": 244, "position": 4, "label": "O(2ⁿ)", "isCorrect": false }
    ],
    "correctOptionId": 243
  },
  {
    "id": 31, "lessonId": 3, "position": 1,
    "prompt": "Hazırlanan değişiklikleri depo geçmişine kaydeden Git komutu hangisidir?",
    "explanation": "git commit değişiklikleri açıklamasıyla geçmişe kaydeder; git push ise uzak depoya gönderir.",
    "options": [
      { "id": 311, "position": 1, "label": "git push", "isCorrect": false },
      { "id": 312, "position": 2, "label": "git commit", "isCorrect": true },
      { "id": 313, "position": 3, "label": "git clone", "isCorrect": false },
      { "id": 314, "position": 4, "label": "git fetch", "isCorrect": false }
    ],
    "correctOptionId": 312
  },
  {
    "id": 32, "lessonId": 3, "position": 2,
    "prompt": "Ana koddan bağımsız olarak yeni bir özellik geliştirmek için ne kullanılır?",
    "explanation": "Branch, ana koddan ayrılan bağımsız bir geliştirme hattıdır.",
    "options": [
      { "id": 321, "position": 1, "label": "Tag", "isCorrect": false },
      { "id": 322, "position": 2, "label": "Stash", "isCorrect": false },
      { "id": 323, "position": 3, "label": "Remote", "isCorrect": false },
      { "id": 324, "position": 4, "label": "Branch", "isCorrect": true }
    ],
    "correctOptionId": 324
  },
  {
    "id": 33, "lessonId": 3, "position": 3,
    "prompt": "İki kişi aynı satırı farklı şekilde değiştirip merge ettiğinde ne olur?",
    "explanation": "Git hangi değişikliğin doğru olduğunu bilemez; çakışmayı bildirir ve çözümü geliştiriciye bırakır.",
    "options": [
      { "id": 331, "position": 1, "label": "Merge çakışması (conflict) oluşur", "isCorrect": true },
      { "id": 332, "position": 2, "label": "Git son değişikliği otomatik seçer", "isCorrect": false },
      { "id": 333, "position": 3, "label": "Dosya silinir", "isCorrect": false },
      { "id": 334, "position": 4, "label": "Commit geçmişi sıfırlanır", "isCorrect": false }
    ],
    "correctOptionId": 331
  },
  {
    "id": 34, "lessonId": 3, "position": 4,
    "prompt": "Pull request'in temel amacı nedir?",
    "explanation": "PR, değişikliklerin ekip tarafından incelenip onaylandıktan sonra ana koda birleştirilmesini sağlar.",
    "options": [
      { "id": 341, "position": 1, "label": "Kodu sunucuya yüklemek", "isCorrect": false },
      { "id": 342, "position": 2, "label": "Depoyu yedeklemek", "isCorrect": false },
      {
        "id": 343, "position": 3,
        "label": "Değişiklikleri incelemeye açıp tartışarak birleştirmek",
        "isCorrect": true
      },
      { "id": 344, "position": 4, "label": "Branch'i silmek", "isCorrect": false }
    ],
    "correctOptionId": 343
  },
  {
    "id": 41, "lessonId": 4, "position": 1,
    "prompt": "Yeni bir kaynak oluşturmak için en uygun HTTP metodu hangisidir?",
    "explanation": "POST yeni bir kaynak oluşturur; başarılı olursa genellikle 201 Created döner.",
    "options": [
      { "id": 411, "position": 1, "label": "GET", "isCorrect": false },
      { "id": 412, "position": 2, "label": "DELETE", "isCorrect": false },
      { "id": 413, "position": 3, "label": "POST", "isCorrect": true },
      { "id": 414, "position": 4, "label": "HEAD", "isCorrect": false }
    ],
    "correctOptionId": 413
  },
  {
    "id": 42, "lessonId": 4, "position": 2,
    "prompt": "Kimlik doğrulaması yapılmamış bir istek için hangi durum kodu döndürülmelidir?",
    "explanation": "401 kimliğin doğrulanmadığını, 403 ise kimlik bilinse de yetkinin olmadığını anlatır.",
    "options": [
      { "id": 421, "position": 1, "label": "403 Forbidden", "isCorrect": false },
      { "id": 422, "position": 2, "label": "401 Unauthorized", "isCorrect": true },
      { "id": 423, "position": 3, "label": "404 Not Found", "isCorrect": false },
      { "id": 424, "position": 4, "label": "500 Internal Server Error", "isCorrect": false }
    ],
    "correctOptionId": 422
  },
  {
    "id": 43, "lessonId": 4, "position": 3,
    "prompt": "Aşağıdaki URL'lerden hangisi REST prensiplerine en uygundur?",
    "explanation": "REST'te URL kaynağı adlandırır; işlemi HTTP metodu belirler: GET /lessons.",
    "options": [
      { "id": 431, "position": 1, "label": "/lessons", "isCorrect": true },
      { "id": 432, "position": 2, "label": "/getAllLessons", "isCorrect": false },
      { "id": 433, "position": 3, "label": "/lessons/list/get", "isCorrect": false },
      { "id": 434, "position": 4, "label": "/doLessons", "isCorrect": false }
    ],
    "correctOptionId": 431
  },
  {
    "id": 44, "lessonId": 4, "position": 4,
    "prompt": "Aynı isteği birden çok kez göndermek sonucu değiştirmiyorsa bu işlem nasıl adlandırılır?",
    "explanation": "İdempotent işlemler tekrarlansa da aynı sonucu üretir; PUT ve DELETE buna örnektir.",
    "options": [
      { "id": 441, "position": 1, "label": "Asenkron", "isCorrect": false },
      { "id": 442, "position": 2, "label": "Durumsuz", "isCorrect": false },
      { "id": 443, "position": 3, "label": "Önbellekli", "isCorrect": false },
      { "id": 444, "position": 4, "label": "İdempotent", "isCorrect": true }
    ],
    "correctOptionId": 444
  },
  {
    "id": 51, "lessonId": 5, "position": 1,
    "prompt": "Bir sınıfın değişmek için yalnızca tek bir nedeni olması gerektiğini söyleyen prensip hangisidir?",
    "explanation": "Single Responsibility Prensibi, her sınıfın tek bir sorumluluğu olmasını önerir.",
    "options": [
      { "id": 511, "position": 1, "label": "Open/Closed", "isCorrect": false },
      { "id": 512, "position": 2, "label": "Liskov Substitution", "isCorrect": false },
      { "id": 513, "position": 3, "label": "Single Responsibility", "isCorrect": true },
      { "id": 514, "position": 4, "label": "Interface Segregation", "isCorrect": false }
    ],
    "correctOptionId": 513
  },
  {
    "id": 52, "lessonId": 5, "position": 2,
    "prompt": "Yeni davranış eklerken mevcut kodu değiştirmek yerine genişletmeyi öneren prensip hangisidir?",
    "explanation": "Open/Closed: Yazılım genişlemeye açık, değişikliğe kapalı olmalıdır.",
    "options": [
      { "id": 521, "position": 1, "label": "Open/Closed", "isCorrect": true },
      { "id": 522, "position": 2, "label": "Dependency Inversion", "isCorrect": false },
      { "id": 523, "position": 3, "label": "Single Responsibility", "isCorrect": false },
      { "id": 524, "position": 4, "label": "DRY", "isCorrect": false }
    ],
    "correctOptionId": 521
  },
  {
    "id": 53, "lessonId": 5, "position": 3,
    "prompt": "Üst seviye modüllerin detaylara değil soyutlamalara bağımlı olmasını söyleyen prensip hangisidir?",
    "explanation": "Dependency Inversion, modüllerin arayüzler gibi soyutlamalar üzerinden konuşmasını önerir.",
    "options": [
      { "id": 531, "position": 1, "label": "Liskov Substitution", "isCorrect": false },
      { "id": 532, "position": 2, "label": "Interface Segregation", "isCorrect": false },
      { "id": 533, "position": 3, "label": "KISS", "isCorrect": false },
      { "id": 534, "position": 4, "label": "Dependency Inversion", "isCorrect": true }
    ],
    "correctOptionId": 534
  },
  {
    "id": 54, "lessonId": 5, "position": 4,
    "prompt": "Aşağıdakilerden hangisi temiz kod pratiği değildir?",
    "explanation": "Kodu kopyalamak bakımı zorlaştırır; DRY prensibi tekrarı ortak bir yere taşımayı önerir.",
    "options": [
      { "id": 541, "position": 1, "label": "Anlamlı değişken isimleri kullanmak", "isCorrect": false },
      { "id": 542, "position": 2, "label": "Aynı mantığı birçok yere kopyalamak", "isCorrect": true },
      { "id": 543, "position": 3, "label": "Fonksiyonları kısa ve odaklı tutmak", "isCorrect": false },
      { "id": 544, "position": 4, "label": "Tek iş yapan sınıflar yazmak", "isCorrect": false }
    ],
    "correctOptionId": 542
  }
];
