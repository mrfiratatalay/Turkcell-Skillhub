// Girişimcilik quiz questions; options keep the backend seed ids.
import type { DemoQuestion } from '../types';

export const GIRISIMCILIK_QUESTIONS: readonly DemoQuestion[] = [
  {
    "id": 141, "lessonId": 14, "position": 1,
    "prompt": "Başarılı bir girişim fikri genellikle neyle başlar?",
    "explanation": "Kalıcı girişimler, çözmeye değer gerçek bir problemle başlar.",
    "options": [
      { "id": 1411, "position": 1, "label": "Bir logo tasarımıyla", "isCorrect": false },
      { "id": 1412, "position": 2, "label": "Gerçek bir problemle", "isCorrect": true },
      { "id": 1413, "position": 3, "label": "Büyük bir yatırımla", "isCorrect": false },
      { "id": 1414, "position": 4, "label": "Bir ofis kiralamakla", "isCorrect": false }
    ],
    "correctOptionId": 1412
  },
  {
    "id": 142, "lessonId": 14, "position": 2,
    "prompt": "Fikri doğrulamanın en ucuz ve hızlı yolu hangisidir?",
    "explanation": "Müşteri görüşmeleri, kod yazmadan önce problemin gerçek olup olmadığını gösterir.",
    "options": [
      { "id": 1421, "position": 1, "label": "Ürünü tamamen geliştirmek", "isCorrect": false },
      { "id": 1422, "position": 2, "label": "Reklam bütçesi ayırmak", "isCorrect": false },
      { "id": 1423, "position": 3, "label": "Patent başvurusu yapmak", "isCorrect": false },
      { "id": 1424, "position": 4, "label": "Potansiyel müşterilerle görüşmek", "isCorrect": true }
    ],
    "correctOptionId": 1424
  },
  {
    "id": 143, "lessonId": 14, "position": 3, "prompt": "Değer önerisi neyi anlatır?",
    "explanation": "Değer önerisi; hedef müşteriyi, problemi ve çözümü net bir cümlede birleştirir.",
    "options": [
      { "id": 1431, "position": 1, "label": "Ürünün kime, hangi problemi nasıl çözdüğünü", "isCorrect": true },
      { "id": 1432, "position": 2, "label": "Şirketin kuruluş tarihini", "isCorrect": false },
      { "id": 1433, "position": 3, "label": "Çalışan sayısını", "isCorrect": false },
      { "id": 1434, "position": 4, "label": "Rakiplerin listesini", "isCorrect": false }
    ],
    "correctOptionId": 1431
  },
  {
    "id": 144, "lessonId": 14, "position": 4,
    "prompt": "Müşteri görüşmelerinde en değerli bilgi genellikle hangisidir?",
    "explanation": "İnsanların geçmişteki davranışları, gelecekle ilgili iyi niyetli tahminlerinden daha güvenilirdir.",
    "options": [
      { "id": 1441, "position": 1, "label": "Fikrini beğenip beğenmedikleri", "isCorrect": false },
      { "id": 1442, "position": 2, "label": "Ürüne ne isim vereceğin", "isCorrect": false },
      { "id": 1443, "position": 3, "label": "Problemi bugün nasıl çözdükleri ve ne yaptıkları", "isCorrect": true },
      { "id": 1444, "position": 4, "label": "Hangi rengi sevdikleri", "isCorrect": false }
    ],
    "correctOptionId": 1443
  },
  {
    "id": 151, "lessonId": 15, "position": 1,
    "prompt": "Lean Startup'taki temel döngü hangisidir?",
    "explanation": "Kur-Ölç-Öğren döngüsü, hızlı deneylerle doğrulanmış öğrenmeyi hedefler.",
    "options": [
      { "id": 1511, "position": 1, "label": "Planla-Bekle-Gör", "isCorrect": false },
      { "id": 1512, "position": 2, "label": "Tasarla-Sat-Büyü", "isCorrect": false },
      { "id": 1513, "position": 3, "label": "Kur-Ölç-Öğren", "isCorrect": true },
      { "id": 1514, "position": 4, "label": "Kodla-Test et-Unut", "isCorrect": false }
    ],
    "correctOptionId": 1513
  },
  {
    "id": 152, "lessonId": 15, "position": 2, "prompt": "MVP'nin temel amacı nedir?",
    "explanation": "MVP, öğrenmeyi en hızlı sağlayacak en küçük üründür.",
    "options": [
      { "id": 1521, "position": 1, "label": "En kritik varsayımı en az çabayla test etmek", "isCorrect": true },
      { "id": 1522, "position": 2, "label": "Tüm özellikleri içeren ürünü çıkarmak", "isCorrect": false },
      { "id": 1523, "position": 3, "label": "Yatırımcılar için reklam yapmak", "isCorrect": false },
      { "id": 1524, "position": 4, "label": "Rakipleri kopyalamak", "isCorrect": false }
    ],
    "correctOptionId": 1521
  },
  {
    "id": 153, "lessonId": 15, "position": 3,
    "prompt": "Aşağıdakilerden hangisi eyleme dönük (actionable) bir metriktir?",
    "explanation": "Tekrar kullanım oranı, ürünün gerçek değer üretip üretmediğini gösterir ve karar almaya yardım eder.",
    "options": [
      { "id": 1531, "position": 1, "label": "Toplam sayfa görüntülenmesi", "isCorrect": false },
      { "id": 1532, "position": 2, "label": "Sosyal medya beğeni sayısı", "isCorrect": false },
      { "id": 1533, "position": 3, "label": "Toplam kayıtlı kullanıcı", "isCorrect": false },
      { "id": 1534, "position": 4, "label": "Haftalık tekrar kullanım oranı", "isCorrect": true }
    ],
    "correctOptionId": 1534
  },
  {
    "id": 154, "lessonId": 15, "position": 4,
    "prompt": "Veriler temel varsayımını çürüttüğünde stratejiyi değiştirmeye ne denir?",
    "explanation": "Pivot, öğrendiklerine göre ürünün yönünü değiştirmektir.",
    "options": [
      { "id": 1541, "position": 1, "label": "Exit", "isCorrect": false },
      { "id": 1542, "position": 2, "label": "Pivot", "isCorrect": true },
      { "id": 1543, "position": 3, "label": "Scale", "isCorrect": false },
      { "id": 1544, "position": 4, "label": "Burn", "isCorrect": false }
    ],
    "correctOptionId": 1542
  },
  {
    "id": 161, "lessonId": 16, "position": 1,
    "prompt": "İş Modeli Kanvası kaç yapı taşından oluşur?",
    "explanation": "Kanvas dokuz yapı taşından oluşur.",
    "options": [
      { "id": 1611, "position": 1, "label": "5", "isCorrect": false },
      { "id": 1612, "position": 2, "label": "7", "isCorrect": false },
      { "id": 1613, "position": 3, "label": "12", "isCorrect": false },
      { "id": 1614, "position": 4, "label": "9", "isCorrect": true }
    ],
    "correctOptionId": 1614
  },
  {
    "id": 162, "lessonId": 16, "position": 2,
    "prompt": "Kanvasın merkezinde hangi yapı taşı yer alır?",
    "explanation": "Değer önerisi kanvasın merkezindedir ve müşteri segmentleriyle uyumlu olmalıdır.",
    "options": [
      { "id": 1621, "position": 1, "label": "Maliyet yapısı", "isCorrect": false },
      { "id": 1622, "position": 2, "label": "Değer önerisi", "isCorrect": true },
      { "id": 1623, "position": 3, "label": "Kilit ortaklıklar", "isCorrect": false },
      { "id": 1624, "position": 4, "label": "Kanallar", "isCorrect": false }
    ],
    "correctOptionId": 1622
  },
  {
    "id": 163, "lessonId": 16, "position": 3,
    "prompt": "Temel özelliklerin ücretsiz, gelişmiş özelliklerin ücretli olduğu gelir modeli hangisidir?",
    "explanation": "Freemium modelinde ürünün temel hâli ücretsizdir; gelir, ücretli premium özelliklerden gelir.",
    "options": [
      { "id": 1631, "position": 1, "label": "Freemium", "isCorrect": true },
      { "id": 1632, "position": 2, "label": "Franchise", "isCorrect": false },
      { "id": 1633, "position": 3, "label": "Komisyon", "isCorrect": false },
      { "id": 1634, "position": 4, "label": "Kiralama", "isCorrect": false }
    ],
    "correctOptionId": 1631
  },
  {
    "id": 164, "lessonId": 16, "position": 4,
    "prompt": "İş Modeli Kanvası için hangisi doğrudur?",
    "explanation": "Kanvas, öğrendikçe güncellenen yaşayan bir çalışma aracıdır.",
    "options": [
      { "id": 1641, "position": 1, "label": "Bir kez doldurulur ve değişmez", "isCorrect": false },
      { "id": 1642, "position": 2, "label": "Sadece yatırımcılar içindir", "isCorrect": false },
      {
        "id": 1643, "position": 3,
        "label": "Deneyler ve geri bildirimlerle sürekli güncellenir",
        "isCorrect": true
      },
      { "id": 1644, "position": 4, "label": "Yalnızca büyük şirketler kullanır", "isCorrect": false }
    ],
    "correctOptionId": 1643
  },
  {
    "id": 171, "lessonId": 17, "position": 1,
    "prompt": "Etkili bir pitch genellikle neyle başlamalıdır?",
    "explanation": "Dinleyici önce problemin önemini anlamalı; çözüm ancak o zaman anlam kazanır.",
    "options": [
      { "id": 1711, "position": 1, "label": "Ekibin özgeçmişiyle", "isCorrect": false },
      { "id": 1712, "position": 2, "label": "Finansal tablolarla", "isCorrect": false },
      { "id": 1713, "position": 3, "label": "Problemin net ve çarpıcı anlatımıyla", "isCorrect": true },
      { "id": 1714, "position": 4, "label": "Teşekkür konuşmasıyla", "isCorrect": false }
    ],
    "correctOptionId": 1713
  },
  {
    "id": 172, "lessonId": 17, "position": 2,
    "prompt": "Çözümün çalıştığını en ikna edici şekilde ne gösterir?",
    "explanation": "Canlı demo, ürünün gerçekten çalıştığını somut olarak kanıtlar.",
    "options": [
      { "id": 1721, "position": 1, "label": "Canlı demo", "isCorrect": true },
      { "id": 1722, "position": 2, "label": "Uzun bir metin", "isCorrect": false },
      { "id": 1723, "position": 3, "label": "Logo animasyonu", "isCorrect": false },
      { "id": 1724, "position": 4, "label": "Kalabalık bir slayt", "isCorrect": false }
    ],
    "correctOptionId": 1721
  },
  {
    "id": 173, "lessonId": 17, "position": 3,
    "prompt": "Bir pitch'teki \"talep\" (ask) bölümü neyi ifade eder?",
    "explanation": "Talep bölümünde, sunumun sonunda dinleyiciden somut olarak ne istediğini söylersin.",
    "options": [
      { "id": 1731, "position": 1, "label": "Jüriye sorulan soruları", "isCorrect": false },
      { "id": 1732, "position": 2, "label": "Rakiplerin listesini", "isCorrect": false },
      { "id": 1733, "position": 3, "label": "Ürünün fiyatını", "isCorrect": false },
      { "id": 1734, "position": 4, "label": "Dinleyiciden somut olarak ne istediğini", "isCorrect": true }
    ],
    "correctOptionId": 1734
  },
  {
    "id": 174, "lessonId": 17, "position": 4,
    "prompt": "Pitch öncesi hazırlıkta hangisi en çok fayda sağlar?",
    "explanation": "Prova ve soru hazırlığı, kısa sürede net ve özgüvenli bir sunum yapmanı sağlar.",
    "options": [
      { "id": 1741, "position": 1, "label": "Sunumu ezberden okumak", "isCorrect": false },
      { "id": 1742, "position": 2, "label": "Prova yapmak ve olası sorulara cevap hazırlamak", "isCorrect": true },
      { "id": 1743, "position": 3, "label": "Slayt sayısını artırmak", "isCorrect": false },
      { "id": 1744, "position": 4, "label": "Teknik detayları çoğaltmak", "isCorrect": false }
    ],
    "correctOptionId": 1742
  }
];
