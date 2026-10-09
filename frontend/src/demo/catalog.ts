// Frontend-only demo catalog, sourced from backend migration V2 through V7.
// Keep lesson and quiz content aligned with the full-stack application's seed data.
import type { Difficulty } from '../shared/domain/types';

export interface DemoCity {
  readonly id: number;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
}

export interface DemoCategory {
  readonly id: number;
  readonly slug: string;
  readonly name: string;
  readonly constellation: string;
  readonly description: string;
  readonly icon: string;
  readonly sortOrder: number;
}

export interface DemoBadge {
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly hint: string;
  readonly icon: string;
  readonly tier: 'GOLD' | 'NEON';
  readonly secret: boolean;
  readonly sortOrder: number;
}

export interface DemoQuestionOption {
  readonly id: number;
  readonly position: number;
  readonly label: string;
  readonly isCorrect: boolean;
}

export interface DemoQuestion {
  readonly id: number;
  readonly lessonId: number;
  readonly position: number;
  readonly prompt: string;
  readonly explanation: string;
  readonly options: readonly DemoQuestionOption[];
  readonly correctOptionId: number;
}

export interface DemoLesson {
  readonly id: number;
  readonly slug: string;
  readonly categoryId: number;
  readonly categorySlug: string;
  readonly title: string;
  readonly summary: string;
  readonly objectives: readonly string[];
  readonly paragraphs: readonly string[];
  readonly videoId: string | null;
  readonly difficulty: Difficulty;
  readonly durationMin: number;
  readonly xpReward: number;
  readonly starX: number;
  readonly starY: number;
  readonly x: number;
  readonly y: number;
  readonly sortOrder: number;
  readonly prerequisiteIds: readonly number[];
  readonly prerequisiteSlugs: readonly string[];
  readonly questions: readonly DemoQuestion[];
}

export const DEMO_CITIES: readonly DemoCity[] = [
  {
    "id": 1,
    "name": "Adana",
    "latitude": 37.3683,
    "longitude": 35.7061
  },
  {
    "id": 2,
    "name": "Adıyaman",
    "latitude": 37.76,
    "longitude": 38.2786
  },
  {
    "id": 3,
    "name": "Afyonkarahisar",
    "latitude": 38.7567,
    "longitude": 30.5397
  },
  {
    "id": 4,
    "name": "Ağrı",
    "latitude": 39.7186,
    "longitude": 43.0522
  },
  {
    "id": 5,
    "name": "Amasya",
    "latitude": 40.6503,
    "longitude": 35.8328
  },
  {
    "id": 6,
    "name": "Ankara",
    "latitude": 39.9264,
    "longitude": 32.8561
  },
  {
    "id": 7,
    "name": "Antalya",
    "latitude": 37.1817,
    "longitude": 30.9333
  },
  {
    "id": 8,
    "name": "Artvin",
    "latitude": 41.1333,
    "longitude": 41.85
  },
  {
    "id": 9,
    "name": "Aydın",
    "latitude": 37.7283,
    "longitude": 27.9372
  },
  {
    "id": 10,
    "name": "Balıkesir",
    "latitude": 39.7408,
    "longitude": 27.8192
  },
  {
    "id": 11,
    "name": "Bilecik",
    "latitude": 40.0,
    "longitude": 30.1667
  },
  {
    "id": 12,
    "name": "Bingöl",
    "latitude": 39.0411,
    "longitude": 40.6758
  },
  {
    "id": 13,
    "name": "Bitlis",
    "latitude": 38.5258,
    "longitude": 42.3878
  },
  {
    "id": 14,
    "name": "Bolu",
    "latitude": 40.6792,
    "longitude": 31.5583
  },
  {
    "id": 15,
    "name": "Burdur",
    "latitude": 37.4239,
    "longitude": 30.0844
  },
  {
    "id": 16,
    "name": "Bursa",
    "latitude": 40.15,
    "longitude": 29.0208
  },
  {
    "id": 17,
    "name": "Çanakkale",
    "latitude": 40.1506,
    "longitude": 26.4111
  },
  {
    "id": 18,
    "name": "Çankırı",
    "latitude": 40.7356,
    "longitude": 33.3661
  },
  {
    "id": 19,
    "name": "Çorum",
    "latitude": 40.5522,
    "longitude": 34.9539
  },
  {
    "id": 20,
    "name": "Denizli",
    "latitude": 37.8402,
    "longitude": 29.0698
  },
  {
    "id": 21,
    "name": "Diyarbakır",
    "latitude": 38.1422,
    "longitude": 40.2711
  },
  {
    "id": 22,
    "name": "Edirne",
    "latitude": 41.12,
    "longitude": 26.5206
  },
  {
    "id": 23,
    "name": "Elazığ",
    "latitude": 38.6675,
    "longitude": 39.3597
  },
  {
    "id": 24,
    "name": "Erzincan",
    "latitude": 39.6783,
    "longitude": 39.33
  },
  {
    "id": 25,
    "name": "Erzurum",
    "latitude": 40.0631,
    "longitude": 41.5669
  },
  {
    "id": 26,
    "name": "Eskişehir",
    "latitude": 39.6825,
    "longitude": 31.0725
  },
  {
    "id": 27,
    "name": "Gaziantep",
    "latitude": 37.0833,
    "longitude": 37.3333
  },
  {
    "id": 28,
    "name": "Giresun",
    "latitude": 40.5797,
    "longitude": 38.5944
  },
  {
    "id": 29,
    "name": "Gümüşhane",
    "latitude": 40.3881,
    "longitude": 39.4186
  },
  {
    "id": 30,
    "name": "Hakkari",
    "latitude": 37.4661,
    "longitude": 44.0644
  },
  {
    "id": 31,
    "name": "Hatay",
    "latitude": 36.2,
    "longitude": 36.15
  },
  {
    "id": 32,
    "name": "Isparta",
    "latitude": 37.9567,
    "longitude": 30.9608
  },
  {
    "id": 33,
    "name": "Mersin",
    "latitude": 36.6786,
    "longitude": 33.8053
  },
  {
    "id": 34,
    "name": "İstanbul",
    "latitude": 41.0122,
    "longitude": 28.9761
  },
  {
    "id": 35,
    "name": "İzmir",
    "latitude": 38.4189,
    "longitude": 27.1297
  },
  {
    "id": 36,
    "name": "Kars",
    "latitude": 40.4547,
    "longitude": 43.0603
  },
  {
    "id": 37,
    "name": "Kastamonu",
    "latitude": 41.5194,
    "longitude": 33.6897
  },
  {
    "id": 38,
    "name": "Kayseri",
    "latitude": 38.737,
    "longitude": 35.4968
  },
  {
    "id": 39,
    "name": "Kırklareli",
    "latitude": 41.6811,
    "longitude": 27.4714
  },
  {
    "id": 40,
    "name": "Kırşehir",
    "latitude": 39.3239,
    "longitude": 34.1292
  },
  {
    "id": 41,
    "name": "Kocaeli",
    "latitude": 40.7644,
    "longitude": 29.945
  },
  {
    "id": 42,
    "name": "Konya",
    "latitude": 37.8725,
    "longitude": 32.4919
  },
  {
    "id": 43,
    "name": "Kütahya",
    "latitude": 39.3047,
    "longitude": 29.59
  },
  {
    "id": 44,
    "name": "Malatya",
    "latitude": 38.3481,
    "longitude": 38.3178
  },
  {
    "id": 45,
    "name": "Manisa",
    "latitude": 38.7494,
    "longitude": 28.1228
  },
  {
    "id": 46,
    "name": "Kahramanmaraş",
    "latitude": 37.8983,
    "longitude": 36.9711
  },
  {
    "id": 47,
    "name": "Mardin",
    "latitude": 37.3177,
    "longitude": 40.7153
  },
  {
    "id": 48,
    "name": "Muğla",
    "latitude": 37.0303,
    "longitude": 28.5064
  },
  {
    "id": 49,
    "name": "Muş",
    "latitude": 39.0006,
    "longitude": 41.8272
  },
  {
    "id": 50,
    "name": "Nevşehir",
    "latitude": 38.7817,
    "longitude": 34.6881
  },
  {
    "id": 51,
    "name": "Niğde",
    "latitude": 37.9158,
    "longitude": 34.6936
  },
  {
    "id": 52,
    "name": "Ordu",
    "latitude": 40.8114,
    "longitude": 37.5406
  },
  {
    "id": 53,
    "name": "Rize",
    "latitude": 40.9317,
    "longitude": 40.8478
  },
  {
    "id": 54,
    "name": "Sakarya",
    "latitude": 40.6972,
    "longitude": 30.4567
  },
  {
    "id": 55,
    "name": "Samsun",
    "latitude": 41.2044,
    "longitude": 36.0072
  },
  {
    "id": 56,
    "name": "Siirt",
    "latitude": 37.93,
    "longitude": 42.2703
  },
  {
    "id": 57,
    "name": "Sinop",
    "latitude": 41.6092,
    "longitude": 34.9019
  },
  {
    "id": 58,
    "name": "Sivas",
    "latitude": 39.7503,
    "longitude": 37.0161
  },
  {
    "id": 59,
    "name": "Tekirdağ",
    "latitude": 40.9778,
    "longitude": 27.5183
  },
  {
    "id": 60,
    "name": "Tokat",
    "latitude": 40.3528,
    "longitude": 36.5644
  },
  {
    "id": 61,
    "name": "Trabzon",
    "latitude": 40.7806,
    "longitude": 39.8122
  },
  {
    "id": 62,
    "name": "Tunceli",
    "latitude": 39.2147,
    "longitude": 39.4714
  },
  {
    "id": 63,
    "name": "Şanlıurfa",
    "latitude": 37.2542,
    "longitude": 39.0425
  },
  {
    "id": 64,
    "name": "Uşak",
    "latitude": 38.5239,
    "longitude": 29.3419
  },
  {
    "id": 65,
    "name": "Van",
    "latitude": 38.5011,
    "longitude": 43.3731
  },
  {
    "id": 66,
    "name": "Yozgat",
    "latitude": 39.6694,
    "longitude": 35.2692
  },
  {
    "id": 67,
    "name": "Zonguldak",
    "latitude": 41.3206,
    "longitude": 31.7336
  },
  {
    "id": 68,
    "name": "Aksaray",
    "latitude": 38.4308,
    "longitude": 33.8622
  },
  {
    "id": 69,
    "name": "Bayburt",
    "latitude": 40.2367,
    "longitude": 40.2236
  },
  {
    "id": 70,
    "name": "Karaman",
    "latitude": 37.0167,
    "longitude": 33.0833
  },
  {
    "id": 71,
    "name": "Kırıkkale",
    "latitude": 39.8697,
    "longitude": 33.7161
  },
  {
    "id": 72,
    "name": "Batman",
    "latitude": 38.0819,
    "longitude": 41.4072
  },
  {
    "id": 73,
    "name": "Şırnak",
    "latitude": 37.5192,
    "longitude": 42.4542
  },
  {
    "id": 74,
    "name": "Bartın",
    "latitude": 41.6044,
    "longitude": 32.5111
  },
  {
    "id": 75,
    "name": "Ardahan",
    "latitude": 41.1131,
    "longitude": 42.8208
  },
  {
    "id": 76,
    "name": "Iğdır",
    "latitude": 39.8936,
    "longitude": 43.9978
  },
  {
    "id": 77,
    "name": "Yalova",
    "latitude": 40.6442,
    "longitude": 29.1936
  },
  {
    "id": 78,
    "name": "Karabük",
    "latitude": 41.2236,
    "longitude": 32.6403
  },
  {
    "id": 79,
    "name": "Kilis",
    "latitude": 36.8008,
    "longitude": 37.1239
  },
  {
    "id": 80,
    "name": "Osmaniye",
    "latitude": 37.2281,
    "longitude": 36.2125
  },
  {
    "id": 81,
    "name": "Düzce",
    "latitude": 40.9469,
    "longitude": 31.2381
  }
];

export const DEMO_CATEGORIES: readonly DemoCategory[] = [
  {
    "id": 1,
    "slug": "yazilim",
    "name": "Yazılım Geliştirme",
    "constellation": "Kod Avcısı",
    "description": "Algoritmadan API tasarımına, yazılımın temel taşlarını yıldız yıldız keşfet.",
    "icon": "code",
    "sortOrder": 1
  },
  {
    "id": 2,
    "slug": "yapay-zeka",
    "name": "Yapay Zeka",
    "constellation": "Sinir Ağı",
    "description": "Veriden öğrenen sistemlerin ve büyük dil modellerinin dünyasına yolculuk.",
    "icon": "ai",
    "sortOrder": 2
  },
  {
    "id": 3,
    "slug": "siber-guvenlik",
    "name": "Siber Güvenlik",
    "constellation": "Kalkan",
    "description": "Saldırganın gözünden düşün, savunmanı katman katman kur.",
    "icon": "shield",
    "sortOrder": 3
  },
  {
    "id": 4,
    "slug": "girisimcilik",
    "name": "Girişimcilik",
    "constellation": "Roket",
    "description": "Bir fikri problem, müşteri ve iş modeliyle gerçek bir ürüne dönüştür.",
    "icon": "rocket",
    "sortOrder": 4
  }
];

export const DEMO_BADGES: readonly DemoBadge[] = [
  {
    "code": "ILK_YILDIZ",
    "name": "İlk Yıldız",
    "description": "İlk dersini başarıyla tamamladın.",
    "hint": "Herhangi bir dersin quiz'ini %70 ve üzeri puanla geç.",
    "icon": "star",
    "tier": "GOLD",
    "secret": false,
    "sortOrder": 1
  },
  {
    "code": "KUSURSUZ",
    "name": "Kusursuz Gece",
    "description": "Bir quiz'i %100 ile bitirdin.",
    "hint": "Bir quiz'deki tüm soruları doğru cevapla.",
    "icon": "target",
    "tier": "GOLD",
    "secret": false,
    "sortOrder": 2
  },
  {
    "code": "ALEV_SERISI",
    "name": "Alev Serisi",
    "description": "3 gün üst üste öğrendin.",
    "hint": "3 gün art arda en az bir quiz çöz.",
    "icon": "flame",
    "tier": "GOLD",
    "secret": false,
    "sortOrder": 3
  },
  {
    "code": "KESINTISIZ_HAFTA",
    "name": "Kesintisiz Hafta",
    "description": "7 gün üst üste öğrendin.",
    "hint": "7 gün art arda en az bir quiz çöz.",
    "icon": "calendar",
    "tier": "NEON",
    "secret": false,
    "sortOrder": 4
  },
  {
    "code": "MERAKLI_GEZGIN",
    "name": "Meraklı Gezgin",
    "description": "3 farklı takımyıldızdan ders tamamladın.",
    "hint": "Üç farklı kategoriden birer ders tamamla.",
    "icon": "compass",
    "tier": "NEON",
    "secret": false,
    "sortOrder": 5
  },
  {
    "code": "AZIMLI",
    "name": "Azimli",
    "description": "Geçemediğin bir quiz'i tekrar deneyip geçtin.",
    "hint": "Pes etme: Kaldığın bir quiz'i yeniden dene.",
    "icon": "refresh",
    "tier": "NEON",
    "secret": false,
    "sortOrder": 6
  },
  {
    "code": "GECE_KUSU",
    "name": "Gece Kuşu",
    "description": "Gece yarısından sonra bir quiz tamamladın. Gerçek kodcu gece çalışır.",
    "hint": "Bu rozetin sırrı gecede saklı...",
    "icon": "moon",
    "tier": "NEON",
    "secret": true,
    "sortOrder": 7
  },
  {
    "code": "KOD_AVCISI",
    "name": "Kod Avcısı",
    "description": "Yazılım Geliştirme takımyıldızının tüm yıldızlarını yaktın.",
    "hint": "Yazılım Geliştirme derslerinin hepsini tamamla.",
    "icon": "code",
    "tier": "GOLD",
    "secret": false,
    "sortOrder": 8
  },
  {
    "code": "SINIR_AGI",
    "name": "Sinir Ağı",
    "description": "Yapay Zeka takımyıldızının tüm yıldızlarını yaktın.",
    "hint": "Yapay Zeka derslerinin hepsini tamamla.",
    "icon": "ai",
    "tier": "GOLD",
    "secret": false,
    "sortOrder": 9
  },
  {
    "code": "KALKAN",
    "name": "Kalkan",
    "description": "Siber Güvenlik takımyıldızının tüm yıldızlarını yaktın.",
    "hint": "Siber Güvenlik derslerinin hepsini tamamla.",
    "icon": "shield",
    "tier": "GOLD",
    "secret": false,
    "sortOrder": 10
  },
  {
    "code": "ROKET",
    "name": "Roket",
    "description": "Girişimcilik takımyıldızının tüm yıldızlarını yaktın.",
    "hint": "Girişimcilik derslerinin hepsini tamamla.",
    "icon": "rocket",
    "tier": "GOLD",
    "secret": false,
    "sortOrder": 11
  },
  {
    "code": "SAFAK",
    "name": "Şafak",
    "description": "Gece Saati'nde 07:00'ye ulaştın: Gecenin sonunu gördün.",
    "hint": "Gecenin sonuna kadar öğrenmeye devam et.",
    "icon": "sunrise",
    "tier": "GOLD",
    "secret": true,
    "sortOrder": 12
  }
];

export const DEMO_QUESTIONS: readonly DemoQuestion[] = [
  {
    "id": 11,
    "lessonId": 1,
    "position": 1,
    "prompt": "Python'da bir fonksiyon tanımlamak için hangi anahtar kelime kullanılır?",
    "explanation": "Python'da fonksiyonlar def anahtar kelimesiyle tanımlanır: def selamla(): ...",
    "options": [
      {
        "id": 111,
        "position": 1,
        "label": "function",
        "isCorrect": false
      },
      {
        "id": 112,
        "position": 2,
        "label": "def",
        "isCorrect": true
      },
      {
        "id": 113,
        "position": 3,
        "label": "func",
        "isCorrect": false
      },
      {
        "id": 114,
        "position": 4,
        "label": "define",
        "isCorrect": false
      }
    ],
    "correctOptionId": 112
  },
  {
    "id": 12,
    "lessonId": 1,
    "position": 2,
    "prompt": "print(2 ** 3) ifadesinin çıktısı nedir?",
    "explanation": "** üs alma operatörüdür; 2'nin 3. kuvveti 8'dir.",
    "options": [
      {
        "id": 121,
        "position": 1,
        "label": "6",
        "isCorrect": false
      },
      {
        "id": 122,
        "position": 2,
        "label": "9",
        "isCorrect": false
      },
      {
        "id": 123,
        "position": 3,
        "label": "8",
        "isCorrect": true
      },
      {
        "id": 124,
        "position": 4,
        "label": "16",
        "isCorrect": false
      }
    ],
    "correctOptionId": 123
  },
  {
    "id": 13,
    "lessonId": 1,
    "position": 3,
    "prompt": "Aşağıdakilerden hangisi Python'da bir liste oluşturur?",
    "explanation": "Köşeli parantez liste oluşturur; normal parantez demet (tuple), süslü parantez küme (set) oluşturur.",
    "options": [
      {
        "id": 131,
        "position": 1,
        "label": "[1, 2, 3]",
        "isCorrect": true
      },
      {
        "id": 132,
        "position": 2,
        "label": "(1, 2, 3)",
        "isCorrect": false
      },
      {
        "id": 133,
        "position": 3,
        "label": "{1, 2, 3}",
        "isCorrect": false
      },
      {
        "id": 134,
        "position": 4,
        "label": "<1, 2, 3>",
        "isCorrect": false
      }
    ],
    "correctOptionId": 131
  },
  {
    "id": 14,
    "lessonId": 1,
    "position": 4,
    "prompt": "for i in range(3): print(i) kodu hangi değerleri yazdırır?",
    "explanation": "range(3) 0'dan başlar ve 3'e kadar (3 hariç) sayar: 0, 1, 2.",
    "options": [
      {
        "id": 141,
        "position": 1,
        "label": "1 2 3",
        "isCorrect": false
      },
      {
        "id": 142,
        "position": 2,
        "label": "0 1 2 3",
        "isCorrect": false
      },
      {
        "id": 143,
        "position": 3,
        "label": "3 2 1",
        "isCorrect": false
      },
      {
        "id": 144,
        "position": 4,
        "label": "0 1 2",
        "isCorrect": true
      }
    ],
    "correctOptionId": 144
  },
  {
    "id": 21,
    "lessonId": 2,
    "position": 1,
    "prompt": "Son giren elemanın ilk çıktığı (LIFO) veri yapısı hangisidir?",
    "explanation": "Yığın LIFO çalışır; tarayıcıdaki geri tuşu ve geri al işlemleri yığın mantığına dayanır.",
    "options": [
      {
        "id": 211,
        "position": 1,
        "label": "Yığın (Stack)",
        "isCorrect": true
      },
      {
        "id": 212,
        "position": 2,
        "label": "Kuyruk (Queue)",
        "isCorrect": false
      },
      {
        "id": 213,
        "position": 3,
        "label": "Hash tablosu",
        "isCorrect": false
      },
      {
        "id": 214,
        "position": 4,
        "label": "Bağlı liste",
        "isCorrect": false
      }
    ],
    "correctOptionId": 211
  },
  {
    "id": 22,
    "lessonId": 2,
    "position": 2,
    "prompt": "Sıralı bir dizide ikili aramanın zaman karmaşıklığı nedir?",
    "explanation": "İkili arama her adımda arama alanını yarıya indirdiği için O(log n) sürede çalışır.",
    "options": [
      {
        "id": 221,
        "position": 1,
        "label": "O(n)",
        "isCorrect": false
      },
      {
        "id": 222,
        "position": 2,
        "label": "O(n²)",
        "isCorrect": false
      },
      {
        "id": 223,
        "position": 3,
        "label": "O(1)",
        "isCorrect": false
      },
      {
        "id": 224,
        "position": 4,
        "label": "O(log n)",
        "isCorrect": true
      }
    ],
    "correctOptionId": 224
  },
  {
    "id": 23,
    "lessonId": 2,
    "position": 3,
    "prompt": "Anahtar-değer çiftlerine ortalama O(1) erişim sağlayan yapı hangisidir?",
    "explanation": "Hash tablosu anahtarı bir hash fonksiyonuyla doğrudan bir konuma eşler; ortalama erişim O(1)'dir.",
    "options": [
      {
        "id": 231,
        "position": 1,
        "label": "Yığın",
        "isCorrect": false
      },
      {
        "id": 232,
        "position": 2,
        "label": "Hash tablosu",
        "isCorrect": true
      },
      {
        "id": 233,
        "position": 3,
        "label": "Sıralı dizi",
        "isCorrect": false
      },
      {
        "id": 234,
        "position": 4,
        "label": "Ağaç",
        "isCorrect": false
      }
    ],
    "correctOptionId": 232
  },
  {
    "id": 24,
    "lessonId": 2,
    "position": 4,
    "prompt": "İç içe iki döngüyle n elemanlı listenin tüm ikililerini karşılaştıran algoritmanın karmaşıklığı nedir?",
    "explanation": "Her eleman için tüm elemanları dolaşmak n × n işlem demektir: O(n²).",
    "options": [
      {
        "id": 241,
        "position": 1,
        "label": "O(n)",
        "isCorrect": false
      },
      {
        "id": 242,
        "position": 2,
        "label": "O(log n)",
        "isCorrect": false
      },
      {
        "id": 243,
        "position": 3,
        "label": "O(n²)",
        "isCorrect": true
      },
      {
        "id": 244,
        "position": 4,
        "label": "O(2ⁿ)",
        "isCorrect": false
      }
    ],
    "correctOptionId": 243
  },
  {
    "id": 31,
    "lessonId": 3,
    "position": 1,
    "prompt": "Hazırlanan değişiklikleri depo geçmişine kaydeden Git komutu hangisidir?",
    "explanation": "git commit değişiklikleri açıklamasıyla geçmişe kaydeder; git push ise uzak depoya gönderir.",
    "options": [
      {
        "id": 311,
        "position": 1,
        "label": "git push",
        "isCorrect": false
      },
      {
        "id": 312,
        "position": 2,
        "label": "git commit",
        "isCorrect": true
      },
      {
        "id": 313,
        "position": 3,
        "label": "git clone",
        "isCorrect": false
      },
      {
        "id": 314,
        "position": 4,
        "label": "git fetch",
        "isCorrect": false
      }
    ],
    "correctOptionId": 312
  },
  {
    "id": 32,
    "lessonId": 3,
    "position": 2,
    "prompt": "Ana koddan bağımsız olarak yeni bir özellik geliştirmek için ne kullanılır?",
    "explanation": "Branch, ana koddan ayrılan bağımsız bir geliştirme hattıdır.",
    "options": [
      {
        "id": 321,
        "position": 1,
        "label": "Tag",
        "isCorrect": false
      },
      {
        "id": 322,
        "position": 2,
        "label": "Stash",
        "isCorrect": false
      },
      {
        "id": 323,
        "position": 3,
        "label": "Remote",
        "isCorrect": false
      },
      {
        "id": 324,
        "position": 4,
        "label": "Branch",
        "isCorrect": true
      }
    ],
    "correctOptionId": 324
  },
  {
    "id": 33,
    "lessonId": 3,
    "position": 3,
    "prompt": "İki kişi aynı satırı farklı şekilde değiştirip merge ettiğinde ne olur?",
    "explanation": "Git hangi değişikliğin doğru olduğunu bilemez; çakışmayı bildirir ve çözümü geliştiriciye bırakır.",
    "options": [
      {
        "id": 331,
        "position": 1,
        "label": "Merge çakışması (conflict) oluşur",
        "isCorrect": true
      },
      {
        "id": 332,
        "position": 2,
        "label": "Git son değişikliği otomatik seçer",
        "isCorrect": false
      },
      {
        "id": 333,
        "position": 3,
        "label": "Dosya silinir",
        "isCorrect": false
      },
      {
        "id": 334,
        "position": 4,
        "label": "Commit geçmişi sıfırlanır",
        "isCorrect": false
      }
    ],
    "correctOptionId": 331
  },
  {
    "id": 34,
    "lessonId": 3,
    "position": 4,
    "prompt": "Pull request'in temel amacı nedir?",
    "explanation": "PR, değişikliklerin ekip tarafından incelenip onaylandıktan sonra ana koda birleştirilmesini sağlar.",
    "options": [
      {
        "id": 341,
        "position": 1,
        "label": "Kodu sunucuya yüklemek",
        "isCorrect": false
      },
      {
        "id": 342,
        "position": 2,
        "label": "Depoyu yedeklemek",
        "isCorrect": false
      },
      {
        "id": 343,
        "position": 3,
        "label": "Değişiklikleri incelemeye açıp tartışarak birleştirmek",
        "isCorrect": true
      },
      {
        "id": 344,
        "position": 4,
        "label": "Branch'i silmek",
        "isCorrect": false
      }
    ],
    "correctOptionId": 343
  },
  {
    "id": 41,
    "lessonId": 4,
    "position": 1,
    "prompt": "Yeni bir kaynak oluşturmak için en uygun HTTP metodu hangisidir?",
    "explanation": "POST yeni bir kaynak oluşturur; başarılı olursa genellikle 201 Created döner.",
    "options": [
      {
        "id": 411,
        "position": 1,
        "label": "GET",
        "isCorrect": false
      },
      {
        "id": 412,
        "position": 2,
        "label": "DELETE",
        "isCorrect": false
      },
      {
        "id": 413,
        "position": 3,
        "label": "POST",
        "isCorrect": true
      },
      {
        "id": 414,
        "position": 4,
        "label": "HEAD",
        "isCorrect": false
      }
    ],
    "correctOptionId": 413
  },
  {
    "id": 42,
    "lessonId": 4,
    "position": 2,
    "prompt": "Kimlik doğrulaması yapılmamış bir istek için hangi durum kodu döndürülmelidir?",
    "explanation": "401 kimliğin doğrulanmadığını, 403 ise kimlik bilinse de yetkinin olmadığını anlatır.",
    "options": [
      {
        "id": 421,
        "position": 1,
        "label": "403 Forbidden",
        "isCorrect": false
      },
      {
        "id": 422,
        "position": 2,
        "label": "401 Unauthorized",
        "isCorrect": true
      },
      {
        "id": 423,
        "position": 3,
        "label": "404 Not Found",
        "isCorrect": false
      },
      {
        "id": 424,
        "position": 4,
        "label": "500 Internal Server Error",
        "isCorrect": false
      }
    ],
    "correctOptionId": 422
  },
  {
    "id": 43,
    "lessonId": 4,
    "position": 3,
    "prompt": "Aşağıdaki URL'lerden hangisi REST prensiplerine en uygundur?",
    "explanation": "REST'te URL kaynağı adlandırır; işlemi HTTP metodu belirler: GET /lessons.",
    "options": [
      {
        "id": 431,
        "position": 1,
        "label": "/lessons",
        "isCorrect": true
      },
      {
        "id": 432,
        "position": 2,
        "label": "/getAllLessons",
        "isCorrect": false
      },
      {
        "id": 433,
        "position": 3,
        "label": "/lessons/list/get",
        "isCorrect": false
      },
      {
        "id": 434,
        "position": 4,
        "label": "/doLessons",
        "isCorrect": false
      }
    ],
    "correctOptionId": 431
  },
  {
    "id": 44,
    "lessonId": 4,
    "position": 4,
    "prompt": "Aynı isteği birden çok kez göndermek sonucu değiştirmiyorsa bu işlem nasıl adlandırılır?",
    "explanation": "İdempotent işlemler tekrarlansa da aynı sonucu üretir; PUT ve DELETE buna örnektir.",
    "options": [
      {
        "id": 441,
        "position": 1,
        "label": "Asenkron",
        "isCorrect": false
      },
      {
        "id": 442,
        "position": 2,
        "label": "Durumsuz",
        "isCorrect": false
      },
      {
        "id": 443,
        "position": 3,
        "label": "Önbellekli",
        "isCorrect": false
      },
      {
        "id": 444,
        "position": 4,
        "label": "İdempotent",
        "isCorrect": true
      }
    ],
    "correctOptionId": 444
  },
  {
    "id": 51,
    "lessonId": 5,
    "position": 1,
    "prompt": "Bir sınıfın değişmek için yalnızca tek bir nedeni olması gerektiğini söyleyen prensip hangisidir?",
    "explanation": "Single Responsibility Prensibi, her sınıfın tek bir sorumluluğu olmasını önerir.",
    "options": [
      {
        "id": 511,
        "position": 1,
        "label": "Open/Closed",
        "isCorrect": false
      },
      {
        "id": 512,
        "position": 2,
        "label": "Liskov Substitution",
        "isCorrect": false
      },
      {
        "id": 513,
        "position": 3,
        "label": "Single Responsibility",
        "isCorrect": true
      },
      {
        "id": 514,
        "position": 4,
        "label": "Interface Segregation",
        "isCorrect": false
      }
    ],
    "correctOptionId": 513
  },
  {
    "id": 52,
    "lessonId": 5,
    "position": 2,
    "prompt": "Yeni davranış eklerken mevcut kodu değiştirmek yerine genişletmeyi öneren prensip hangisidir?",
    "explanation": "Open/Closed: Yazılım genişlemeye açık, değişikliğe kapalı olmalıdır.",
    "options": [
      {
        "id": 521,
        "position": 1,
        "label": "Open/Closed",
        "isCorrect": true
      },
      {
        "id": 522,
        "position": 2,
        "label": "Dependency Inversion",
        "isCorrect": false
      },
      {
        "id": 523,
        "position": 3,
        "label": "Single Responsibility",
        "isCorrect": false
      },
      {
        "id": 524,
        "position": 4,
        "label": "DRY",
        "isCorrect": false
      }
    ],
    "correctOptionId": 521
  },
  {
    "id": 53,
    "lessonId": 5,
    "position": 3,
    "prompt": "Üst seviye modüllerin detaylara değil soyutlamalara bağımlı olmasını söyleyen prensip hangisidir?",
    "explanation": "Dependency Inversion, modüllerin arayüzler gibi soyutlamalar üzerinden konuşmasını önerir.",
    "options": [
      {
        "id": 531,
        "position": 1,
        "label": "Liskov Substitution",
        "isCorrect": false
      },
      {
        "id": 532,
        "position": 2,
        "label": "Interface Segregation",
        "isCorrect": false
      },
      {
        "id": 533,
        "position": 3,
        "label": "KISS",
        "isCorrect": false
      },
      {
        "id": 534,
        "position": 4,
        "label": "Dependency Inversion",
        "isCorrect": true
      }
    ],
    "correctOptionId": 534
  },
  {
    "id": 54,
    "lessonId": 5,
    "position": 4,
    "prompt": "Aşağıdakilerden hangisi temiz kod pratiği değildir?",
    "explanation": "Kodu kopyalamak bakımı zorlaştırır; DRY prensibi tekrarı ortak bir yere taşımayı önerir.",
    "options": [
      {
        "id": 541,
        "position": 1,
        "label": "Anlamlı değişken isimleri kullanmak",
        "isCorrect": false
      },
      {
        "id": 542,
        "position": 2,
        "label": "Aynı mantığı birçok yere kopyalamak",
        "isCorrect": true
      },
      {
        "id": 543,
        "position": 3,
        "label": "Fonksiyonları kısa ve odaklı tutmak",
        "isCorrect": false
      },
      {
        "id": 544,
        "position": 4,
        "label": "Tek iş yapan sınıflar yazmak",
        "isCorrect": false
      }
    ],
    "correctOptionId": 542
  },
  {
    "id": 61,
    "lessonId": 6,
    "position": 1,
    "prompt": "Aşağıdakilerden hangisi doğrudur?",
    "explanation": "Derin öğrenme makine öğrenmesinin, makine öğrenmesi de yapay zekanın bir alt kümesidir.",
    "options": [
      {
        "id": 611,
        "position": 1,
        "label": "Derin öğrenme, yapay zekayı kapsar",
        "isCorrect": false
      },
      {
        "id": 612,
        "position": 2,
        "label": "Yapay zeka makine öğrenmesini, makine öğrenmesi de derin öğrenmeyi kapsar",
        "isCorrect": true
      },
      {
        "id": 613,
        "position": 3,
        "label": "Makine öğrenmesi ile yapay zeka birbirinden tamamen bağımsızdır",
        "isCorrect": false
      },
      {
        "id": 614,
        "position": 4,
        "label": "Derin öğrenme yalnızca robotikte kullanılır",
        "isCorrect": false
      }
    ],
    "correctOptionId": 612
  },
  {
    "id": 62,
    "lessonId": 6,
    "position": 2,
    "prompt": "Etiketli verilerle model eğitmeye ne ad verilir?",
    "explanation": "Denetimli öğrenmede her örneğin doğru cevabı (etiketi) bilinir.",
    "options": [
      {
        "id": 621,
        "position": 1,
        "label": "Denetimsiz öğrenme",
        "isCorrect": false
      },
      {
        "id": 622,
        "position": 2,
        "label": "Pekiştirmeli öğrenme",
        "isCorrect": false
      },
      {
        "id": 623,
        "position": 3,
        "label": "Kümeleme",
        "isCorrect": false
      },
      {
        "id": 624,
        "position": 4,
        "label": "Denetimli öğrenme",
        "isCorrect": true
      }
    ],
    "correctOptionId": 624
  },
  {
    "id": 63,
    "lessonId": 6,
    "position": 3,
    "prompt": "Model eğitim verisinde çok başarılı, yeni veride başarısızsa bu duruma ne denir?",
    "explanation": "Overfitting (aşırı öğrenme), modelin genellemek yerine eğitim verisini ezberlemesidir.",
    "options": [
      {
        "id": 631,
        "position": 1,
        "label": "Overfitting (aşırı öğrenme)",
        "isCorrect": true
      },
      {
        "id": 632,
        "position": 2,
        "label": "Underfitting (yetersiz öğrenme)",
        "isCorrect": false
      },
      {
        "id": 633,
        "position": 3,
        "label": "Normalizasyon",
        "isCorrect": false
      },
      {
        "id": 634,
        "position": 4,
        "label": "Veri artırma",
        "isCorrect": false
      }
    ],
    "correctOptionId": 631
  },
  {
    "id": 64,
    "lessonId": 6,
    "position": 4,
    "prompt": "Müşterileri, etiket olmadan benzer davranışlarına göre gruplamak hangi yöntemin örneğidir?",
    "explanation": "Kümeleme (clustering), etiketsiz veride benzer örnekleri gruplayan denetimsiz bir yöntemdir.",
    "options": [
      {
        "id": 641,
        "position": 1,
        "label": "Sınıflandırma",
        "isCorrect": false
      },
      {
        "id": 642,
        "position": 2,
        "label": "Regresyon",
        "isCorrect": false
      },
      {
        "id": 643,
        "position": 3,
        "label": "Kümeleme",
        "isCorrect": true
      },
      {
        "id": 644,
        "position": 4,
        "label": "Çeviri",
        "isCorrect": false
      }
    ],
    "correctOptionId": 643
  },
  {
    "id": 71,
    "lessonId": 7,
    "position": 1,
    "prompt": "Pandas'ta iki boyutlu, tablo benzeri temel veri yapısı hangisidir?",
    "explanation": "DataFrame satır ve sütunlardan oluşan iki boyutlu bir tablodur; Series ise tek bir sütun gibidir.",
    "options": [
      {
        "id": 711,
        "position": 1,
        "label": "Series",
        "isCorrect": false
      },
      {
        "id": 712,
        "position": 2,
        "label": "ndarray",
        "isCorrect": false
      },
      {
        "id": 713,
        "position": 3,
        "label": "DataFrame",
        "isCorrect": true
      },
      {
        "id": 714,
        "position": 4,
        "label": "Dictionary",
        "isCorrect": false
      }
    ],
    "correctOptionId": 713
  },
  {
    "id": 72,
    "lessonId": 7,
    "position": 2,
    "prompt": "Bir CSV dosyasını DataFrame olarak okumak için hangi fonksiyon kullanılır?",
    "explanation": "pd.read_csv('dosya.csv') dosyayı okuyup bir DataFrame döndürür.",
    "options": [
      {
        "id": 721,
        "position": 1,
        "label": "pd.read_csv()",
        "isCorrect": true
      },
      {
        "id": 722,
        "position": 2,
        "label": "pd.open_csv()",
        "isCorrect": false
      },
      {
        "id": 723,
        "position": 3,
        "label": "pd.load()",
        "isCorrect": false
      },
      {
        "id": 724,
        "position": 4,
        "label": "pd.csv()",
        "isCorrect": false
      }
    ],
    "correctOptionId": 721
  },
  {
    "id": 73,
    "lessonId": 7,
    "position": 3,
    "prompt": "Eksik değerleri tespit etmek için hangi metot kullanılır?",
    "explanation": "isna() her hücrenin eksik olup olmadığını döner; dropna() siler, fillna() doldurur.",
    "options": [
      {
        "id": 731,
        "position": 1,
        "label": "dropna()",
        "isCorrect": false
      },
      {
        "id": 732,
        "position": 2,
        "label": "fillna()",
        "isCorrect": false
      },
      {
        "id": 733,
        "position": 3,
        "label": "unique()",
        "isCorrect": false
      },
      {
        "id": 734,
        "position": 4,
        "label": "isna()",
        "isCorrect": true
      }
    ],
    "correctOptionId": 734
  },
  {
    "id": 74,
    "lessonId": 7,
    "position": 4,
    "prompt": "Puanların şehre göre ortalamasını almak için hangi ifade doğrudur?",
    "explanation": "groupby('sehir') veriyi şehre göre gruplar, ['puan'].mean() her grubun ortalamasını hesaplar.",
    "options": [
      {
        "id": 741,
        "position": 1,
        "label": "df.sort_values('sehir').mean()",
        "isCorrect": false
      },
      {
        "id": 742,
        "position": 2,
        "label": "df.groupby('sehir')['puan'].mean()",
        "isCorrect": true
      },
      {
        "id": 743,
        "position": 3,
        "label": "df.filter('sehir').avg()",
        "isCorrect": false
      },
      {
        "id": 744,
        "position": 4,
        "label": "df.pivot('sehir')",
        "isCorrect": false
      }
    ],
    "correctOptionId": 742
  },
  {
    "id": 81,
    "lessonId": 8,
    "position": 1,
    "prompt": "Bir evin fiyatını tahmin etmek hangi tür problemdir?",
    "explanation": "Fiyat sürekli bir değerdir; sürekli değer tahmini regresyon problemidir.",
    "options": [
      {
        "id": 811,
        "position": 1,
        "label": "Sınıflandırma",
        "isCorrect": false
      },
      {
        "id": 812,
        "position": 2,
        "label": "Kümeleme",
        "isCorrect": false
      },
      {
        "id": 813,
        "position": 3,
        "label": "Boyut indirgeme",
        "isCorrect": false
      },
      {
        "id": 814,
        "position": 4,
        "label": "Regresyon",
        "isCorrect": true
      }
    ],
    "correctOptionId": 814
  },
  {
    "id": 82,
    "lessonId": 8,
    "position": 2,
    "prompt": "Veriyi eğitim ve test kümelerine ayırmanın amacı nedir?",
    "explanation": "Test kümesi, modelin genelleme yeteneğini ölçmek için eğitimde kullanılmaz.",
    "options": [
      {
        "id": 821,
        "position": 1,
        "label": "Modelin hiç görmediği veride nasıl performans gösterdiğini ölçmek",
        "isCorrect": true
      },
      {
        "id": 822,
        "position": 2,
        "label": "Eğitimi hızlandırmak",
        "isCorrect": false
      },
      {
        "id": 823,
        "position": 3,
        "label": "Veriyi şifrelemek",
        "isCorrect": false
      },
      {
        "id": 824,
        "position": 4,
        "label": "Eksik verileri silmek",
        "isCorrect": false
      }
    ],
    "correctOptionId": 821
  },
  {
    "id": 83,
    "lessonId": 8,
    "position": 3,
    "prompt": "scikit-learn'de bir modeli eğitmek için hangi metot çağrılır?",
    "explanation": "scikit-learn modelleri fit(X, y) ile eğitilir, predict(X) ile tahmin yapar.",
    "options": [
      {
        "id": 831,
        "position": 1,
        "label": "train()",
        "isCorrect": false
      },
      {
        "id": 832,
        "position": 2,
        "label": "learn()",
        "isCorrect": false
      },
      {
        "id": 833,
        "position": 3,
        "label": "fit()",
        "isCorrect": true
      },
      {
        "id": 834,
        "position": 4,
        "label": "run()",
        "isCorrect": false
      }
    ],
    "correctOptionId": 833
  },
  {
    "id": 84,
    "lessonId": 8,
    "position": 4,
    "prompt": "Dengesiz bir veri setinde yalnızca doğruluk metriğine bakmak neden yanıltıcı olabilir?",
    "explanation": "Azınlık sınıfını hiç bulamayan bir model bile yüksek doğruluk alabilir; precision ve recall da incelenmelidir.",
    "options": [
      {
        "id": 841,
        "position": 1,
        "label": "Doğruluk her zaman %50 çıkar",
        "isCorrect": false
      },
      {
        "id": 842,
        "position": 2,
        "label": "Model yalnızca çoğunluk sınıfını tahmin ederek yüksek doğruluk alabilir",
        "isCorrect": true
      },
      {
        "id": 843,
        "position": 3,
        "label": "Doğruluk yalnızca regresyonda kullanılır",
        "isCorrect": false
      },
      {
        "id": 844,
        "position": 4,
        "label": "Doğruluk negatif olabilir",
        "isCorrect": false
      }
    ],
    "correctOptionId": 842
  },
  {
    "id": 91,
    "lessonId": 9,
    "position": 1,
    "prompt": "LLM'lerin metni işlerken kullandığı en küçük birime ne ad verilir?",
    "explanation": "Modeller metni token'lara böler; bir token bir kelime, kelime parçası veya noktalama olabilir.",
    "options": [
      {
        "id": 911,
        "position": 1,
        "label": "Piksel",
        "isCorrect": false
      },
      {
        "id": 912,
        "position": 2,
        "label": "Token",
        "isCorrect": true
      },
      {
        "id": 913,
        "position": 3,
        "label": "Bayt",
        "isCorrect": false
      },
      {
        "id": 914,
        "position": 4,
        "label": "Vektör",
        "isCorrect": false
      }
    ],
    "correctOptionId": 912
  },
  {
    "id": 92,
    "lessonId": 9,
    "position": 2,
    "prompt": "Prompt içinde modele birkaç örnek giriş-çıkış vermek hangi teknik olarak bilinir?",
    "explanation": "Few-shot prompting, istenen kalıbı örneklerle göstererek modelin doğru formatı yakalamasına yardım eder.",
    "options": [
      {
        "id": 921,
        "position": 1,
        "label": "Zero-shot",
        "isCorrect": false
      },
      {
        "id": 922,
        "position": 2,
        "label": "Fine-tuning",
        "isCorrect": false
      },
      {
        "id": 923,
        "position": 3,
        "label": "Few-shot",
        "isCorrect": true
      },
      {
        "id": 924,
        "position": 4,
        "label": "Tokenization",
        "isCorrect": false
      }
    ],
    "correctOptionId": 923
  },
  {
    "id": 93,
    "lessonId": 9,
    "position": 3,
    "prompt": "Modelin kendinden emin şekilde yanlış bilgi üretmesine ne denir?",
    "explanation": "Halüsinasyon, modelin dayanağı olmayan bilgiyi doğruymuş gibi üretmesidir.",
    "options": [
      {
        "id": 931,
        "position": 1,
        "label": "Halüsinasyon",
        "isCorrect": true
      },
      {
        "id": 932,
        "position": 2,
        "label": "Overfitting",
        "isCorrect": false
      },
      {
        "id": 933,
        "position": 3,
        "label": "Gradyan patlaması",
        "isCorrect": false
      },
      {
        "id": 934,
        "position": 4,
        "label": "Önbellekleme",
        "isCorrect": false
      }
    ],
    "correctOptionId": 931
  },
  {
    "id": 94,
    "lessonId": 9,
    "position": 4,
    "prompt": "Modeli harici, doğrulanmış belgelerle besleyerek cevap üretmesini sağlayan yaklaşım hangisidir?",
    "explanation": "RAG, ilgili belgeleri bulup prompt'a ekleyerek modelin doğrulanmış bilgiyle cevap vermesini sağlar.",
    "options": [
      {
        "id": 941,
        "position": 1,
        "label": "Dropout",
        "isCorrect": false
      },
      {
        "id": 942,
        "position": 2,
        "label": "Transfer öğrenme",
        "isCorrect": false
      },
      {
        "id": 943,
        "position": 3,
        "label": "Veri artırma",
        "isCorrect": false
      },
      {
        "id": 944,
        "position": 4,
        "label": "RAG (Retrieval-Augmented Generation)",
        "isCorrect": true
      }
    ],
    "correctOptionId": 944
  },
  {
    "id": 101,
    "lessonId": 10,
    "position": 1,
    "prompt": "CIA üçlüsündeki \"I\" harfi neyi ifade eder?",
    "explanation": "CIA: Confidentiality (gizlilik), Integrity (bütünlük), Availability (erişilebilirlik).",
    "options": [
      {
        "id": 1011,
        "position": 1,
        "label": "Kimlik (Identity)",
        "isCorrect": false
      },
      {
        "id": 1012,
        "position": 2,
        "label": "Altyapı (Infrastructure)",
        "isCorrect": false
      },
      {
        "id": 1013,
        "position": 3,
        "label": "Bütünlük (Integrity)",
        "isCorrect": true
      },
      {
        "id": 1014,
        "position": 4,
        "label": "İzolasyon (Isolation)",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1013
  },
  {
    "id": 102,
    "lessonId": 10,
    "position": 2,
    "prompt": "Kullanıcıyı sahte bir giriş sayfasına yönlendirip bilgilerini çalmayı amaçlayan saldırı hangisidir?",
    "explanation": "Phishing, güvenilir bir kurum gibi görünerek kullanıcıyı kandırmayı hedefler.",
    "options": [
      {
        "id": 1021,
        "position": 1,
        "label": "Oltalama (Phishing)",
        "isCorrect": true
      },
      {
        "id": 1022,
        "position": 2,
        "label": "DDoS",
        "isCorrect": false
      },
      {
        "id": 1023,
        "position": 3,
        "label": "SQL enjeksiyonu",
        "isCorrect": false
      },
      {
        "id": 1024,
        "position": 4,
        "label": "Kaba kuvvet (Brute force)",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1021
  },
  {
    "id": 103,
    "lessonId": 10,
    "position": 3,
    "prompt": "Kimlik doğrulama (authentication) neyi kontrol eder?",
    "explanation": "Authentication kim olduğunu, authorization ise neye erişebileceğini belirler.",
    "options": [
      {
        "id": 1031,
        "position": 1,
        "label": "Kullanıcının neye erişebileceğini",
        "isCorrect": false
      },
      {
        "id": 1032,
        "position": 2,
        "label": "Sistemin ne kadar hızlı olduğunu",
        "isCorrect": false
      },
      {
        "id": 1033,
        "position": 3,
        "label": "Verinin şifrelenip şifrelenmediğini",
        "isCorrect": false
      },
      {
        "id": 1034,
        "position": 4,
        "label": "Kullanıcının kim olduğunu",
        "isCorrect": true
      }
    ],
    "correctOptionId": 1034
  },
  {
    "id": 104,
    "lessonId": 10,
    "position": 4,
    "prompt": "Parolan çalınsa bile hesabını korumaya yardım eden yöntem hangisidir?",
    "explanation": "MFA, paroladan başka bir doğrulama faktörü (telefon, güvenlik anahtarı vb.) ister.",
    "options": [
      {
        "id": 1041,
        "position": 1,
        "label": "Parolayı not defterine yazmak",
        "isCorrect": false
      },
      {
        "id": 1042,
        "position": 2,
        "label": "Çok faktörlü doğrulama (MFA)",
        "isCorrect": true
      },
      {
        "id": 1043,
        "position": 3,
        "label": "Aynı parolayı her yerde kullanmak",
        "isCorrect": false
      },
      {
        "id": 1044,
        "position": 4,
        "label": "Parolayı kısaltmak",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1042
  },
  {
    "id": 111,
    "lessonId": 11,
    "position": 1,
    "prompt": "HTTPS varsayılan olarak hangi portu kullanır?",
    "explanation": "HTTPS 443, HTTP ise 80 numaralı portu kullanır.",
    "options": [
      {
        "id": 1111,
        "position": 1,
        "label": "21",
        "isCorrect": false
      },
      {
        "id": 1112,
        "position": 2,
        "label": "80",
        "isCorrect": false
      },
      {
        "id": 1113,
        "position": 3,
        "label": "3306",
        "isCorrect": false
      },
      {
        "id": 1114,
        "position": 4,
        "label": "443",
        "isCorrect": true
      }
    ],
    "correctOptionId": 1114
  },
  {
    "id": 112,
    "lessonId": 11,
    "position": 2,
    "prompt": "Güvenlik duvarı için en güvenli varsayılan kural yaklaşımı hangisidir?",
    "explanation": "Default deny yaklaşımında yalnızca açıkça izin verilen trafik geçer.",
    "options": [
      {
        "id": 1121,
        "position": 1,
        "label": "Her şeyi engelle, yalnızca gerekenlere izin ver",
        "isCorrect": true
      },
      {
        "id": 1122,
        "position": 2,
        "label": "Her şeye izin ver, şüphelileri engelle",
        "isCorrect": false
      },
      {
        "id": 1123,
        "position": 3,
        "label": "Sadece gece saatlerinde engelle",
        "isCorrect": false
      },
      {
        "id": 1124,
        "position": 4,
        "label": "Hiç kural kullanma",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1121
  },
  {
    "id": 113,
    "lessonId": 11,
    "position": 3,
    "prompt": "HTTPS'in HTTP'ye göre temel avantajı nedir?",
    "explanation": "HTTPS iletişimi TLS ile şifreleyerek dinleme ve değiştirme saldırılarını önler.",
    "options": [
      {
        "id": 1131,
        "position": 1,
        "label": "Daha hızlı olması",
        "isCorrect": false
      },
      {
        "id": 1132,
        "position": 2,
        "label": "Daha az port kullanması",
        "isCorrect": false
      },
      {
        "id": 1133,
        "position": 3,
        "label": "Trafiği TLS ile şifrelemesi",
        "isCorrect": true
      },
      {
        "id": 1134,
        "position": 4,
        "label": "Çerez kullanmaması",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1133
  },
  {
    "id": 114,
    "lessonId": 11,
    "position": 4,
    "prompt": "Halka açık Wi-Fi'da trafiği şifreli bir tünelden geçiren araç hangisidir?",
    "explanation": "VPN, cihazınla VPN sunucusu arasında şifreli bir tünel kurar.",
    "options": [
      {
        "id": 1141,
        "position": 1,
        "label": "DNS",
        "isCorrect": false
      },
      {
        "id": 1142,
        "position": 2,
        "label": "VPN",
        "isCorrect": true
      },
      {
        "id": 1143,
        "position": 3,
        "label": "DHCP",
        "isCorrect": false
      },
      {
        "id": 1144,
        "position": 4,
        "label": "FTP",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1142
  },
  {
    "id": 121,
    "lessonId": 12,
    "position": 1,
    "prompt": "SQL enjeksiyonunu önlemenin en etkili yolu hangisidir?",
    "explanation": "Parametreli sorgularda girdi her zaman veri olarak işlenir, asla SQL kodu olarak çalıştırılmaz.",
    "options": [
      {
        "id": 1211,
        "position": 1,
        "label": "Girdiyi büyük harfe çevirmek",
        "isCorrect": false
      },
      {
        "id": 1212,
        "position": 2,
        "label": "Parametreli sorgular kullanmak",
        "isCorrect": true
      },
      {
        "id": 1213,
        "position": 3,
        "label": "Sorguları uzun yazmak",
        "isCorrect": false
      },
      {
        "id": 1214,
        "position": 4,
        "label": "Veritabanını yeniden başlatmak",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1212
  },
  {
    "id": 122,
    "lessonId": 12,
    "position": 2,
    "prompt": "Sayfaya zararlı JavaScript enjekte edilmesine dayanan saldırı hangisidir?",
    "explanation": "Cross-Site Scripting (XSS), kullanıcının tarayıcısında saldırganın betiğini çalıştırır.",
    "options": [
      {
        "id": 1221,
        "position": 1,
        "label": "CSRF",
        "isCorrect": false
      },
      {
        "id": 1222,
        "position": 2,
        "label": "DDoS",
        "isCorrect": false
      },
      {
        "id": 1223,
        "position": 3,
        "label": "XSS",
        "isCorrect": true
      },
      {
        "id": 1224,
        "position": 4,
        "label": "MITM",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1223
  },
  {
    "id": 123,
    "lessonId": 12,
    "position": 3,
    "prompt": "Kullanıcının, isteğindeki kimliği değiştirerek başkasının verisine erişebildiği açık hangisidir?",
    "explanation": "IDOR bir bozuk erişim kontrolü örneğidir; sunucu nesneye erişim yetkisini kontrol etmez.",
    "options": [
      {
        "id": 1231,
        "position": 1,
        "label": "IDOR",
        "isCorrect": true
      },
      {
        "id": 1232,
        "position": 2,
        "label": "Zayıf parola",
        "isCorrect": false
      },
      {
        "id": 1233,
        "position": 3,
        "label": "Açık port",
        "isCorrect": false
      },
      {
        "id": 1234,
        "position": 4,
        "label": "Eski tarayıcı",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1231
  },
  {
    "id": 124,
    "lessonId": 12,
    "position": 4,
    "prompt": "OWASP Top 10 nedir?",
    "explanation": "OWASP Top 10, web güvenliğindeki en kritik riskleri düzenli olarak güncelleyen referans listedir.",
    "options": [
      {
        "id": 1241,
        "position": 1,
        "label": "En popüler 10 programlama dili",
        "isCorrect": false
      },
      {
        "id": 1242,
        "position": 2,
        "label": "10 adımlık kurulum rehberi",
        "isCorrect": false
      },
      {
        "id": 1243,
        "position": 3,
        "label": "Bir antivirüs yazılımı",
        "isCorrect": false
      },
      {
        "id": 1244,
        "position": 4,
        "label": "Web uygulamalarındaki en kritik güvenlik risklerinin listesi",
        "isCorrect": true
      }
    ],
    "correctOptionId": 1244
  },
  {
    "id": 131,
    "lessonId": 13,
    "position": 1,
    "prompt": "Etik hackerlığı yasa dışı saldırıdan ayıran en temel unsur nedir?",
    "explanation": "Etik hackerlık her zaman sistem sahibinin yazılı izniyle ve belirlenmiş kapsam içinde yapılır.",
    "options": [
      {
        "id": 1311,
        "position": 1,
        "label": "Kullanılan araçlar",
        "isCorrect": false
      },
      {
        "id": 1312,
        "position": 2,
        "label": "Saldırının gece yapılması",
        "isCorrect": false
      },
      {
        "id": 1313,
        "position": 3,
        "label": "Yazılı izin ve tanımlı kapsam",
        "isCorrect": true
      },
      {
        "id": 1314,
        "position": 4,
        "label": "Hedefin büyüklüğü",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1313
  },
  {
    "id": 132,
    "lessonId": 13,
    "position": 2,
    "prompt": "Sızma testinin ilk aşaması genellikle hangisidir?",
    "explanation": "Test, hedef hakkında bilgi toplanan keşif (reconnaissance) aşamasıyla başlar.",
    "options": [
      {
        "id": 1321,
        "position": 1,
        "label": "Keşif (Reconnaissance)",
        "isCorrect": true
      },
      {
        "id": 1322,
        "position": 2,
        "label": "Raporlama",
        "isCorrect": false
      },
      {
        "id": 1323,
        "position": 3,
        "label": "Erişimi sürdürme",
        "isCorrect": false
      },
      {
        "id": 1324,
        "position": 4,
        "label": "Yama yapma",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1321
  },
  {
    "id": 133,
    "lessonId": 13,
    "position": 3,
    "prompt": "Ağdaki açık portları ve servisleri taramak için yaygın kullanılan araç hangisidir?",
    "explanation": "Nmap; ağdaki cihazları, açık portları ve çalışan servisleri keşfetmek için kullanılan bir tarama aracıdır.",
    "options": [
      {
        "id": 1331,
        "position": 1,
        "label": "Photoshop",
        "isCorrect": false
      },
      {
        "id": 1332,
        "position": 2,
        "label": "Excel",
        "isCorrect": false
      },
      {
        "id": 1333,
        "position": 3,
        "label": "Docker",
        "isCorrect": false
      },
      {
        "id": 1334,
        "position": 4,
        "label": "Nmap",
        "isCorrect": true
      }
    ],
    "correctOptionId": 1334
  },
  {
    "id": 134,
    "lessonId": 13,
    "position": 4,
    "prompt": "Sızma testi raporunda bulgular neye göre önceliklendirilir?",
    "explanation": "Bulgular etki ve olasılığa göre risk seviyesiyle önceliklendirilir; kritik açıklar önce kapatılır.",
    "options": [
      {
        "id": 1341,
        "position": 1,
        "label": "Bulunma sırasına",
        "isCorrect": false
      },
      {
        "id": 1342,
        "position": 2,
        "label": "Risk seviyesine",
        "isCorrect": true
      },
      {
        "id": 1343,
        "position": 3,
        "label": "Alfabetik sıraya",
        "isCorrect": false
      },
      {
        "id": 1344,
        "position": 4,
        "label": "Test eden kişiye",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1342
  },
  {
    "id": 141,
    "lessonId": 14,
    "position": 1,
    "prompt": "Başarılı bir girişim fikri genellikle neyle başlar?",
    "explanation": "Kalıcı girişimler, çözmeye değer gerçek bir problemle başlar.",
    "options": [
      {
        "id": 1411,
        "position": 1,
        "label": "Bir logo tasarımıyla",
        "isCorrect": false
      },
      {
        "id": 1412,
        "position": 2,
        "label": "Gerçek bir problemle",
        "isCorrect": true
      },
      {
        "id": 1413,
        "position": 3,
        "label": "Büyük bir yatırımla",
        "isCorrect": false
      },
      {
        "id": 1414,
        "position": 4,
        "label": "Bir ofis kiralamakla",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1412
  },
  {
    "id": 142,
    "lessonId": 14,
    "position": 2,
    "prompt": "Fikri doğrulamanın en ucuz ve hızlı yolu hangisidir?",
    "explanation": "Müşteri görüşmeleri, kod yazmadan önce problemin gerçek olup olmadığını gösterir.",
    "options": [
      {
        "id": 1421,
        "position": 1,
        "label": "Ürünü tamamen geliştirmek",
        "isCorrect": false
      },
      {
        "id": 1422,
        "position": 2,
        "label": "Reklam bütçesi ayırmak",
        "isCorrect": false
      },
      {
        "id": 1423,
        "position": 3,
        "label": "Patent başvurusu yapmak",
        "isCorrect": false
      },
      {
        "id": 1424,
        "position": 4,
        "label": "Potansiyel müşterilerle görüşmek",
        "isCorrect": true
      }
    ],
    "correctOptionId": 1424
  },
  {
    "id": 143,
    "lessonId": 14,
    "position": 3,
    "prompt": "Değer önerisi neyi anlatır?",
    "explanation": "Değer önerisi; hedef müşteriyi, problemi ve çözümü net bir cümlede birleştirir.",
    "options": [
      {
        "id": 1431,
        "position": 1,
        "label": "Ürünün kime, hangi problemi nasıl çözdüğünü",
        "isCorrect": true
      },
      {
        "id": 1432,
        "position": 2,
        "label": "Şirketin kuruluş tarihini",
        "isCorrect": false
      },
      {
        "id": 1433,
        "position": 3,
        "label": "Çalışan sayısını",
        "isCorrect": false
      },
      {
        "id": 1434,
        "position": 4,
        "label": "Rakiplerin listesini",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1431
  },
  {
    "id": 144,
    "lessonId": 14,
    "position": 4,
    "prompt": "Müşteri görüşmelerinde en değerli bilgi genellikle hangisidir?",
    "explanation": "İnsanların geçmişteki davranışları, gelecekle ilgili iyi niyetli tahminlerinden daha güvenilirdir.",
    "options": [
      {
        "id": 1441,
        "position": 1,
        "label": "Fikrini beğenip beğenmedikleri",
        "isCorrect": false
      },
      {
        "id": 1442,
        "position": 2,
        "label": "Ürüne ne isim vereceğin",
        "isCorrect": false
      },
      {
        "id": 1443,
        "position": 3,
        "label": "Problemi bugün nasıl çözdükleri ve ne yaptıkları",
        "isCorrect": true
      },
      {
        "id": 1444,
        "position": 4,
        "label": "Hangi rengi sevdikleri",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1443
  },
  {
    "id": 151,
    "lessonId": 15,
    "position": 1,
    "prompt": "Lean Startup'taki temel döngü hangisidir?",
    "explanation": "Kur-Ölç-Öğren döngüsü, hızlı deneylerle doğrulanmış öğrenmeyi hedefler.",
    "options": [
      {
        "id": 1511,
        "position": 1,
        "label": "Planla-Bekle-Gör",
        "isCorrect": false
      },
      {
        "id": 1512,
        "position": 2,
        "label": "Tasarla-Sat-Büyü",
        "isCorrect": false
      },
      {
        "id": 1513,
        "position": 3,
        "label": "Kur-Ölç-Öğren",
        "isCorrect": true
      },
      {
        "id": 1514,
        "position": 4,
        "label": "Kodla-Test et-Unut",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1513
  },
  {
    "id": 152,
    "lessonId": 15,
    "position": 2,
    "prompt": "MVP'nin temel amacı nedir?",
    "explanation": "MVP, öğrenmeyi en hızlı sağlayacak en küçük üründür.",
    "options": [
      {
        "id": 1521,
        "position": 1,
        "label": "En kritik varsayımı en az çabayla test etmek",
        "isCorrect": true
      },
      {
        "id": 1522,
        "position": 2,
        "label": "Tüm özellikleri içeren ürünü çıkarmak",
        "isCorrect": false
      },
      {
        "id": 1523,
        "position": 3,
        "label": "Yatırımcılar için reklam yapmak",
        "isCorrect": false
      },
      {
        "id": 1524,
        "position": 4,
        "label": "Rakipleri kopyalamak",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1521
  },
  {
    "id": 153,
    "lessonId": 15,
    "position": 3,
    "prompt": "Aşağıdakilerden hangisi eyleme dönük (actionable) bir metriktir?",
    "explanation": "Tekrar kullanım oranı, ürünün gerçek değer üretip üretmediğini gösterir ve karar almaya yardım eder.",
    "options": [
      {
        "id": 1531,
        "position": 1,
        "label": "Toplam sayfa görüntülenmesi",
        "isCorrect": false
      },
      {
        "id": 1532,
        "position": 2,
        "label": "Sosyal medya beğeni sayısı",
        "isCorrect": false
      },
      {
        "id": 1533,
        "position": 3,
        "label": "Toplam kayıtlı kullanıcı",
        "isCorrect": false
      },
      {
        "id": 1534,
        "position": 4,
        "label": "Haftalık tekrar kullanım oranı",
        "isCorrect": true
      }
    ],
    "correctOptionId": 1534
  },
  {
    "id": 154,
    "lessonId": 15,
    "position": 4,
    "prompt": "Veriler temel varsayımını çürüttüğünde stratejiyi değiştirmeye ne denir?",
    "explanation": "Pivot, öğrendiklerine göre ürünün yönünü değiştirmektir.",
    "options": [
      {
        "id": 1541,
        "position": 1,
        "label": "Exit",
        "isCorrect": false
      },
      {
        "id": 1542,
        "position": 2,
        "label": "Pivot",
        "isCorrect": true
      },
      {
        "id": 1543,
        "position": 3,
        "label": "Scale",
        "isCorrect": false
      },
      {
        "id": 1544,
        "position": 4,
        "label": "Burn",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1542
  },
  {
    "id": 161,
    "lessonId": 16,
    "position": 1,
    "prompt": "İş Modeli Kanvası kaç yapı taşından oluşur?",
    "explanation": "Kanvas dokuz yapı taşından oluşur.",
    "options": [
      {
        "id": 1611,
        "position": 1,
        "label": "5",
        "isCorrect": false
      },
      {
        "id": 1612,
        "position": 2,
        "label": "7",
        "isCorrect": false
      },
      {
        "id": 1613,
        "position": 3,
        "label": "12",
        "isCorrect": false
      },
      {
        "id": 1614,
        "position": 4,
        "label": "9",
        "isCorrect": true
      }
    ],
    "correctOptionId": 1614
  },
  {
    "id": 162,
    "lessonId": 16,
    "position": 2,
    "prompt": "Kanvasın merkezinde hangi yapı taşı yer alır?",
    "explanation": "Değer önerisi kanvasın merkezindedir ve müşteri segmentleriyle uyumlu olmalıdır.",
    "options": [
      {
        "id": 1621,
        "position": 1,
        "label": "Maliyet yapısı",
        "isCorrect": false
      },
      {
        "id": 1622,
        "position": 2,
        "label": "Değer önerisi",
        "isCorrect": true
      },
      {
        "id": 1623,
        "position": 3,
        "label": "Kilit ortaklıklar",
        "isCorrect": false
      },
      {
        "id": 1624,
        "position": 4,
        "label": "Kanallar",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1622
  },
  {
    "id": 163,
    "lessonId": 16,
    "position": 3,
    "prompt": "Temel özelliklerin ücretsiz, gelişmiş özelliklerin ücretli olduğu gelir modeli hangisidir?",
    "explanation": "Freemium modelinde ürünün temel hâli ücretsizdir; gelir, ücretli premium özelliklerden gelir.",
    "options": [
      {
        "id": 1631,
        "position": 1,
        "label": "Freemium",
        "isCorrect": true
      },
      {
        "id": 1632,
        "position": 2,
        "label": "Franchise",
        "isCorrect": false
      },
      {
        "id": 1633,
        "position": 3,
        "label": "Komisyon",
        "isCorrect": false
      },
      {
        "id": 1634,
        "position": 4,
        "label": "Kiralama",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1631
  },
  {
    "id": 164,
    "lessonId": 16,
    "position": 4,
    "prompt": "İş Modeli Kanvası için hangisi doğrudur?",
    "explanation": "Kanvas, öğrendikçe güncellenen yaşayan bir çalışma aracıdır.",
    "options": [
      {
        "id": 1641,
        "position": 1,
        "label": "Bir kez doldurulur ve değişmez",
        "isCorrect": false
      },
      {
        "id": 1642,
        "position": 2,
        "label": "Sadece yatırımcılar içindir",
        "isCorrect": false
      },
      {
        "id": 1643,
        "position": 3,
        "label": "Deneyler ve geri bildirimlerle sürekli güncellenir",
        "isCorrect": true
      },
      {
        "id": 1644,
        "position": 4,
        "label": "Yalnızca büyük şirketler kullanır",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1643
  },
  {
    "id": 171,
    "lessonId": 17,
    "position": 1,
    "prompt": "Etkili bir pitch genellikle neyle başlamalıdır?",
    "explanation": "Dinleyici önce problemin önemini anlamalı; çözüm ancak o zaman anlam kazanır.",
    "options": [
      {
        "id": 1711,
        "position": 1,
        "label": "Ekibin özgeçmişiyle",
        "isCorrect": false
      },
      {
        "id": 1712,
        "position": 2,
        "label": "Finansal tablolarla",
        "isCorrect": false
      },
      {
        "id": 1713,
        "position": 3,
        "label": "Problemin net ve çarpıcı anlatımıyla",
        "isCorrect": true
      },
      {
        "id": 1714,
        "position": 4,
        "label": "Teşekkür konuşmasıyla",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1713
  },
  {
    "id": 172,
    "lessonId": 17,
    "position": 2,
    "prompt": "Çözümün çalıştığını en ikna edici şekilde ne gösterir?",
    "explanation": "Canlı demo, ürünün gerçekten çalıştığını somut olarak kanıtlar.",
    "options": [
      {
        "id": 1721,
        "position": 1,
        "label": "Canlı demo",
        "isCorrect": true
      },
      {
        "id": 1722,
        "position": 2,
        "label": "Uzun bir metin",
        "isCorrect": false
      },
      {
        "id": 1723,
        "position": 3,
        "label": "Logo animasyonu",
        "isCorrect": false
      },
      {
        "id": 1724,
        "position": 4,
        "label": "Kalabalık bir slayt",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1721
  },
  {
    "id": 173,
    "lessonId": 17,
    "position": 3,
    "prompt": "Bir pitch'teki \"talep\" (ask) bölümü neyi ifade eder?",
    "explanation": "Talep bölümünde, sunumun sonunda dinleyiciden somut olarak ne istediğini söylersin.",
    "options": [
      {
        "id": 1731,
        "position": 1,
        "label": "Jüriye sorulan soruları",
        "isCorrect": false
      },
      {
        "id": 1732,
        "position": 2,
        "label": "Rakiplerin listesini",
        "isCorrect": false
      },
      {
        "id": 1733,
        "position": 3,
        "label": "Ürünün fiyatını",
        "isCorrect": false
      },
      {
        "id": 1734,
        "position": 4,
        "label": "Dinleyiciden somut olarak ne istediğini",
        "isCorrect": true
      }
    ],
    "correctOptionId": 1734
  },
  {
    "id": 174,
    "lessonId": 17,
    "position": 4,
    "prompt": "Pitch öncesi hazırlıkta hangisi en çok fayda sağlar?",
    "explanation": "Prova ve soru hazırlığı, kısa sürede net ve özgüvenli bir sunum yapmanı sağlar.",
    "options": [
      {
        "id": 1741,
        "position": 1,
        "label": "Sunumu ezberden okumak",
        "isCorrect": false
      },
      {
        "id": 1742,
        "position": 2,
        "label": "Prova yapmak ve olası sorulara cevap hazırlamak",
        "isCorrect": true
      },
      {
        "id": 1743,
        "position": 3,
        "label": "Slayt sayısını artırmak",
        "isCorrect": false
      },
      {
        "id": 1744,
        "position": 4,
        "label": "Teknik detayları çoğaltmak",
        "isCorrect": false
      }
    ],
    "correctOptionId": 1742
  }
];

const lessonDetails: readonly Omit<DemoLesson, 'questions'>[] = [
  {
    "id": 1,
    "slug": "python-ile-ilk-adim",
    "categoryId": 1,
    "title": "Python ile İlk Adım",
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
    "videoId": "kqtD5dpn9C8",
    "difficulty": "BEGINNER",
    "durationMin": 30,
    "xpReward": 100,
    "starX": 120,
    "starY": 220,
    "sortOrder": 1,
    "categorySlug": "yazilim",
    "prerequisiteIds": [],
    "prerequisiteSlugs": [],
    "x": 120,
    "y": 220
  },
  {
    "id": 2,
    "slug": "veri-yapilari-ve-algoritmalar",
    "categoryId": 1,
    "title": "Veri Yapıları ve Algoritmalar",
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
    "videoId": "8hly31xKli0",
    "difficulty": "INTERMEDIATE",
    "durationMin": 45,
    "xpReward": 150,
    "starX": 240,
    "starY": 130,
    "sortOrder": 2,
    "categorySlug": "yazilim",
    "prerequisiteIds": [
      1
    ],
    "prerequisiteSlugs": [
      "python-ile-ilk-adim"
    ],
    "x": 240,
    "y": 130
  },
  {
    "id": 3,
    "slug": "git-ile-takim-calismasi",
    "categoryId": 1,
    "title": "Git ile Takım Çalışması",
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
    "videoId": "RGOj5yH7evk",
    "difficulty": "BEGINNER",
    "durationMin": 25,
    "xpReward": 100,
    "starX": 250,
    "starY": 290,
    "sortOrder": 3,
    "categorySlug": "yazilim",
    "prerequisiteIds": [
      1
    ],
    "prerequisiteSlugs": [
      "python-ile-ilk-adim"
    ],
    "x": 250,
    "y": 290
  },
  {
    "id": 4,
    "slug": "rest-api-tasarimi",
    "categoryId": 1,
    "title": "REST API Tasarımı",
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
    "videoId": "GZvSYJDk-us",
    "difficulty": "INTERMEDIATE",
    "durationMin": 40,
    "xpReward": 150,
    "starX": 370,
    "starY": 210,
    "sortOrder": 4,
    "categorySlug": "yazilim",
    "prerequisiteIds": [
      2,
      3
    ],
    "prerequisiteSlugs": [
      "veri-yapilari-ve-algoritmalar",
      "git-ile-takim-calismasi"
    ],
    "x": 370,
    "y": 210
  },
  {
    "id": 5,
    "slug": "temiz-kod-ve-solid",
    "categoryId": 1,
    "title": "Temiz Kod ve SOLID",
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
    "videoId": "pTB0EiLXUC8",
    "difficulty": "ADVANCED",
    "durationMin": 45,
    "xpReward": 200,
    "starX": 430,
    "starY": 95,
    "sortOrder": 5,
    "categorySlug": "yazilim",
    "prerequisiteIds": [
      4
    ],
    "prerequisiteSlugs": [
      "rest-api-tasarimi"
    ],
    "x": 430,
    "y": 95
  },
  {
    "id": 6,
    "slug": "yapay-zekaya-giris",
    "categoryId": 2,
    "title": "Yapay Zekaya Giriş",
    "summary": "Yapay zeka, makine öğrenmesi ve derin öğrenme arasındaki farkı kullanım alanlarıyla öğren.",
    "objectives": [
      "Yapay zeka, makine öğrenmesi ve derin öğrenmeyi ayırt etmek",
      "Denetimli ve denetimsiz öğrenmeyi tanımak",
      "Eğitim ve test verisinin rolünü kavramak",
      "Yapay zekanın etik sorumluluklarını tartışmak"
    ],
    "paragraphs": [
      "Yapay zeka, insan zekası gerektiren görevleri yerine getirebilen sistemlerin genel adıdır. Makine öğrenmesi bu alanın bir alt kümesidir: Kuralları tek tek yazmak yerine sistemin örneklerden öğrenmesini sağlar. Derin öğrenme ise çok katmanlı yapay sinir ağlarıyla çalışan bir makine öğrenmesi yaklaşımıdır.",
      "Denetimli öğrenmede model, doğru cevapları (etiketleri) bilinen örneklerden öğrenir; e-postaların spam olup olmadığını tahmin etmek gibi. Denetimsiz öğrenmede etiket yoktur; model verideki gizli grupları ve örüntüleri kendisi bulur.",
      "Bir modelin gerçekten öğrenip öğrenmediğini anlamak için veri eğitim ve test olarak ayrılır. Model eğitim verisini ezberleyip yeni veride başarısız oluyorsa buna aşırı öğrenme (overfitting) denir. Verinin ve modellerin önyargı taşıyabileceğini unutmamak da sorumlu yapay zekanın parçasıdır."
    ],
    "videoId": "aircAruvnKk",
    "difficulty": "BEGINNER",
    "durationMin": 30,
    "xpReward": 100,
    "starX": 600,
    "starY": 200,
    "sortOrder": 1,
    "categorySlug": "yapay-zeka",
    "prerequisiteIds": [],
    "prerequisiteSlugs": [],
    "x": 600,
    "y": 200
  },
  {
    "id": 7,
    "slug": "pandas-ile-veri-analizi",
    "categoryId": 2,
    "title": "Pandas ile Veri Analizi",
    "summary": "DataFrame'lerle veri yükle, temizle, filtrele ve grupla; ham veriden içgörü çıkar.",
    "objectives": [
      "CSV dosyalarını DataFrame olarak yüklemek",
      "Eksik verileri bulmak ve temizlemek",
      "Filtreleme ve sıralama yapmak",
      "groupby ile özet istatistikler çıkarmak"
    ],
    "paragraphs": [
      "Pandas, Python'un veri analizi kütüphanesidir. Temel yapısı DataFrame, satır ve sütunlardan oluşan bir tabloya benzer: pd.read_csv('veri.csv') ile bir dosyayı saniyeler içinde analiz edilebilir hâle getirirsin.",
      "Gerçek veri neredeyse hiç temiz değildir. isna() ile eksik değerleri bulur, dropna() ile atar ya da fillna() ile doldurursun. Koşullu filtreleme (df[df['puan'] > 80]) ve sıralama (sort_values) veriyi anlamanın ilk adımlarıdır.",
      "groupby, veriyi bir sütuna göre gruplayıp her grup için özet çıkarmanı sağlar: Şehir bazında ortalama puan gibi. Bu projedeki Şehir Işıkları sıralaması da aynı fikrin SQL'deki karşılığıyla hesaplanıyor."
    ],
    "videoId": "ZyhVh-qRZPA",
    "difficulty": "INTERMEDIATE",
    "durationMin": 40,
    "xpReward": 150,
    "starX": 700,
    "starY": 110,
    "sortOrder": 2,
    "categorySlug": "yapay-zeka",
    "prerequisiteIds": [
      6,
      1
    ],
    "prerequisiteSlugs": [
      "yapay-zekaya-giris",
      "python-ile-ilk-adim"
    ],
    "x": 700,
    "y": 110
  },
  {
    "id": 8,
    "slug": "makine-ogrenmesinin-temelleri",
    "categoryId": 2,
    "title": "Makine Öğrenmesinin Temelleri",
    "summary": "Regresyon ve sınıflandırmayı tanı; bir modeli eğit, değerlendir ve doğru metriği seç.",
    "objectives": [
      "Regresyon ile sınıflandırmayı ayırt etmek",
      "Veriyi eğitim ve test kümelerine ayırmak",
      "Doğruluk, kesinlik ve duyarlılık metriklerini yorumlamak",
      "Özellik (feature) seçiminin önemini kavramak"
    ],
    "paragraphs": [
      "Makine öğrenmesi problemleri çoğunlukla iki türdür: Regresyon sürekli bir değeri tahmin eder (ev fiyatı gibi), sınıflandırma ise bir kategori seçer (e-posta spam mı değil mi gibi).",
      "Tipik bir akışta veri eğitim ve test kümelerine ayrılır (örneğin %80/%20). Model eğitim kümesinde öğrenir, test kümesinde hiç görmediği verilerle sınanır. scikit-learn gibi kütüphaneler fit() ile eğitimi, predict() ile tahmini birkaç satıra indirir.",
      "Doğru metriği seçmek kritiktir. Dengesiz veride yalnızca doğruluğa (accuracy) bakmak yanıltıcı olabilir: Hastaların %1'inin hasta olduğu bir veri setinde herkese sağlıklı diyen model %99 doğruluk alır ama işe yaramaz. Bu yüzden kesinlik (precision) ve duyarlılık (recall) da incelenir."
    ],
    "videoId": "ukzFI9rgwfU",
    "difficulty": "INTERMEDIATE",
    "durationMin": 45,
    "xpReward": 150,
    "starX": 810,
    "starY": 190,
    "sortOrder": 3,
    "categorySlug": "yapay-zeka",
    "prerequisiteIds": [
      7
    ],
    "prerequisiteSlugs": [
      "pandas-ile-veri-analizi"
    ],
    "x": 810,
    "y": 190
  },
  {
    "id": 9,
    "slug": "buyuk-dil-modelleri",
    "categoryId": 2,
    "title": "Büyük Dil Modelleri ve Prompt Mühendisliği",
    "summary": "Büyük dil modellerinin nasıl çalıştığını, token kavramını ve etkili prompt tekniklerini öğren.",
    "objectives": [
      "Token ve bağlam penceresi kavramlarını anlamak",
      "Net görev tanımı ve örneklerle (few-shot) prompt yazmak",
      "Halüsinasyon riskini azaltmak",
      "LLM'leri uygulamalara güvenle entegre etmek"
    ],
    "paragraphs": [
      "Büyük dil modelleri (LLM), devasa metin verileriyle eğitilmiş ve bir sonraki parçayı (token) tahmin ederek metin üreten modellerdir. Modelin aynı anda dikkate alabildiği metin miktarına bağlam penceresi (context window) denir.",
      "İyi bir prompt; rolü, görevi, kısıtları ve beklenen çıktı formatını net söyler. Birkaç örnek vermek (few-shot) modelin istediğin kalıbı yakalamasını kolaylaştırır. Karmaşık görevlerde modelden adım adım düşünmesini istemek sonuç kalitesini artırabilir.",
      "LLM'ler kendinden emin ama yanlış bilgi üretebilir; buna halüsinasyon denir. Modeli doğrulanmış verilerle beslemek (RAG), çıktıyı yapılandırılmış bir formatta istemek ve sonucu kodla doğrulamak riski azaltır. Bu projedeki Gece Rehberi de modele yalnızca gerçek ilerleme verini verir ve cevabını doğrulamadan göstermez."
    ],
    "videoId": "LPZh9BOjkQs",
    "difficulty": "ADVANCED",
    "durationMin": 40,
    "xpReward": 200,
    "starX": 900,
    "starY": 90,
    "sortOrder": 4,
    "categorySlug": "yapay-zeka",
    "prerequisiteIds": [
      8
    ],
    "prerequisiteSlugs": [
      "makine-ogrenmesinin-temelleri"
    ],
    "x": 900,
    "y": 90
  },
  {
    "id": 10,
    "slug": "siber-guvenligin-temelleri",
    "categoryId": 3,
    "title": "Siber Güvenliğin Temelleri",
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
    "videoId": "U_P23SqJaDc",
    "difficulty": "BEGINNER",
    "durationMin": 30,
    "xpReward": 100,
    "starX": 130,
    "starY": 470,
    "sortOrder": 1,
    "categorySlug": "siber-guvenlik",
    "prerequisiteIds": [],
    "prerequisiteSlugs": [],
    "x": 130,
    "y": 470
  },
  {
    "id": 11,
    "slug": "ag-guvenligi",
    "categoryId": 3,
    "title": "Ağ Güvenliği ve Firewall",
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
    "videoId": "qiQR5rTSshw",
    "difficulty": "INTERMEDIATE",
    "durationMin": 40,
    "xpReward": 150,
    "starX": 250,
    "starY": 390,
    "sortOrder": 2,
    "categorySlug": "siber-guvenlik",
    "prerequisiteIds": [
      10
    ],
    "prerequisiteSlugs": [
      "siber-guvenligin-temelleri"
    ],
    "x": 250,
    "y": 390
  },
  {
    "id": 12,
    "slug": "owasp-top-10",
    "categoryId": 3,
    "title": "Web Güvenliği: OWASP Top 10",
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
    "videoId": "rWHvp7rUka8",
    "difficulty": "INTERMEDIATE",
    "durationMin": 45,
    "xpReward": 150,
    "starX": 260,
    "starY": 540,
    "sortOrder": 3,
    "categorySlug": "siber-guvenlik",
    "prerequisiteIds": [
      10
    ],
    "prerequisiteSlugs": [
      "siber-guvenligin-temelleri"
    ],
    "x": 260,
    "y": 540
  },
  {
    "id": 13,
    "slug": "etik-hackerlik",
    "categoryId": 3,
    "title": "Etik Hackerlık ve Sızma Testi",
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
    "videoId": "2_lswM1S264",
    "difficulty": "ADVANCED",
    "durationMin": 50,
    "xpReward": 200,
    "starX": 390,
    "starY": 460,
    "sortOrder": 4,
    "categorySlug": "siber-guvenlik",
    "prerequisiteIds": [
      11,
      12
    ],
    "prerequisiteSlugs": [
      "ag-guvenligi",
      "owasp-top-10"
    ],
    "x": 390,
    "y": 460
  },
  {
    "id": 14,
    "slug": "fikirden-urune",
    "categoryId": 4,
    "title": "Fikirden Ürüne: Girişimciliğe Giriş",
    "summary": "İyi bir girişimin çözümle değil problemle başladığını; müşteriyi tanımanın ve doğrulamanın önemini öğren.",
    "objectives": [
      "Problem ile çözümü ayırt etmek",
      "Hedef müşteri kitlesini tanımlamak",
      "Müşteri görüşmeleriyle fikri doğrulamak",
      "Değer önerisini tek cümleyle ifade etmek"
    ],
    "paragraphs": [
      "Başarılı girişimlerin çoğu parlak bir çözümle değil, gerçek ve can yakan bir problemle başlar. Kendine sorman gereken ilk soru şudur: Bu problemi kim, ne sıklıkla ve ne kadar şiddetli yaşıyor?",
      "Fikrini doğrulamanın en ucuz yolu potansiyel müşterilerle konuşmaktır. Onlara fikrini satmaya çalışma; problemi nasıl yaşadıklarını ve bugün nasıl çözdüklerini dinle. İnsanların ne dediği değil, ne yaptığı daha çok şey anlatır.",
      "Değer önerisi, ürününün kime, hangi problemi, nasıl çözdüğünü tek cümlede anlatır. Örneğin: \"SkillHub, dijital beceri öğrenmek isteyen gençlere ilerlemelerini bir gece gökyüzü gibi görünür kılarak motivasyon sağlar.\""
    ],
    "videoId": null,
    "difficulty": "BEGINNER",
    "durationMin": 25,
    "xpReward": 100,
    "starX": 610,
    "starY": 470,
    "sortOrder": 1,
    "categorySlug": "girisimcilik",
    "prerequisiteIds": [],
    "prerequisiteSlugs": [],
    "x": 610,
    "y": 470
  },
  {
    "id": 15,
    "slug": "lean-startup-ve-mvp",
    "categoryId": 4,
    "title": "Lean Startup ve MVP",
    "summary": "Kur-Ölç-Öğren döngüsüyle en küçük işe yarar ürünü çıkar, veriye göre pivot ya da devam kararı ver.",
    "objectives": [
      "Kur-Ölç-Öğren döngüsünü uygulamak",
      "Bir MVP'nin kapsamını belirlemek",
      "Gösteriş metrikleriyle eyleme dönük metrikleri ayırt etmek",
      "Pivot kararının ne zaman gerektiğini anlamak"
    ],
    "paragraphs": [
      "Lean Startup yaklaşımı, belirsizlik altında ürün geliştirmeyi bir öğrenme süreci olarak görür. Kur-Ölç-Öğren döngüsünde amaç, en kısa sürede gerçek kullanıcıdan geri bildirim almaktır.",
      "MVP (Minimum Viable Product), en kritik varsayımını test etmeni sağlayan en küçük üründür. Bir gecede çıkarılan bir yarışma prototipi de aslında bir MVP'dir: Fikrin işe yarayıp yaramadığını hızlıca gösterir.",
      "Ölçerken gösteriş metriklerine (toplam indirme gibi) değil, eyleme dönük metriklere (haftalık aktif kullanıcı, tekrar kullanım oranı gibi) bak. Veriler varsayımını çürütüyorsa stratejiyi değiştirmek (pivot) başarısızlık değil, öğrenmenin sonucudur."
    ],
    "videoId": "fEvKo90qBns",
    "difficulty": "INTERMEDIATE",
    "durationMin": 35,
    "xpReward": 150,
    "starX": 720,
    "starY": 380,
    "sortOrder": 2,
    "categorySlug": "girisimcilik",
    "prerequisiteIds": [
      14
    ],
    "prerequisiteSlugs": [
      "fikirden-urune"
    ],
    "x": 720,
    "y": 380
  },
  {
    "id": 16,
    "slug": "is-modeli-kanvasi",
    "categoryId": 4,
    "title": "İş Modeli Kanvası",
    "summary": "Dokuz yapı taşıyla bir işin nasıl değer ürettiğini, sunduğunu ve para kazandığını tek sayfada gör.",
    "objectives": [
      "Kanvasın dokuz yapı taşını tanımak",
      "Müşteri segmentleri ile değer önerisini eşleştirmek",
      "Gelir modellerini karşılaştırmak",
      "Maliyet yapısını ve kilit ortaklıkları belirlemek"
    ],
    "paragraphs": [
      "İş Modeli Kanvası, bir işin tüm mantığını tek sayfada gösteren görsel bir araçtır. Dokuz yapı taşından oluşur: Müşteri segmentleri, değer önerisi, kanallar, müşteri ilişkileri, gelir akışları, kilit kaynaklar, kilit aktiviteler, kilit ortaklıklar ve maliyet yapısı.",
      "Kanvasın kalbinde değer önerisi ile müşteri segmentlerinin uyumu vardır. Kime hizmet ettiğini bilmeden neyi sunacağını, hangi kanaldan ulaşacağını ya da nasıl para kazanacağını doğru belirleyemezsin.",
      "Gelir akışları abonelik, tek seferlik satış, reklam veya freemium gibi modellerden oluşabilir. Kanvas bir kez doldurulup unutulan bir belge değildir; her müşteri görüşmesi ve deneyle güncellenen yaşayan bir taslaktır."
    ],
    "videoId": "QoAOzMTLP5s",
    "difficulty": "INTERMEDIATE",
    "durationMin": 30,
    "xpReward": 150,
    "starX": 730,
    "starY": 540,
    "sortOrder": 3,
    "categorySlug": "girisimcilik",
    "prerequisiteIds": [
      14
    ],
    "prerequisiteSlugs": [
      "fikirden-urune"
    ],
    "x": 730,
    "y": 540
  },
  {
    "id": 17,
    "slug": "pitch-sanati",
    "categoryId": 4,
    "title": "Pitch: Fikrini Anlatma Sanatı",
    "summary": "Problemi, çözümü ve ekibi birkaç dakikada akılda kalıcı bir hikâyeye dönüştür; jüriyi ikna et.",
    "objectives": [
      "Etkili bir pitch'in yapısını kurmak",
      "Problemi bir hikâyeyle anlatmak",
      "Demo ile çözümü somutlaştırmak",
      "Zor sorulara hazırlıklı olmak"
    ],
    "paragraphs": [
      "Pitch, fikrini kısa sürede net ve ikna edici şekilde anlatma sanatıdır. Klasik bir yapı şöyledir: Problem, çözüm, demo, pazar, iş modeli, ekip ve talep (ne istiyorsun?).",
      "İnsanlar rakamları değil hikâyeleri hatırlar. Problemi yaşayan gerçek bir kişinin hikâyesiyle başlamak dinleyiciyi hemen içine çeker. Ardından canlı bir demo, çözümünün çalıştığını tüm slaytlardan daha iyi kanıtlar.",
      "Code Night gibi yarışmalarda jüri birkaç dakika içinde karar verir; bu yüzden prova etmek şarttır. Olası sorulara (rakipler, ölçeklenme, iş modeli) önceden cevap hazırlamak sahnedeki özgüvenini ikiye katlar."
    ],
    "videoId": "17XZGUX_9iM",
    "difficulty": "ADVANCED",
    "durationMin": 30,
    "xpReward": 200,
    "starX": 870,
    "starY": 460,
    "sortOrder": 4,
    "categorySlug": "girisimcilik",
    "prerequisiteIds": [
      15,
      16
    ],
    "prerequisiteSlugs": [
      "lean-startup-ve-mvp",
      "is-modeli-kanvasi"
    ],
    "x": 870,
    "y": 460
  }
];

export const DEMO_LESSONS: readonly DemoLesson[] = lessonDetails.map((lesson) => ({
  ...lesson,
  questions: DEMO_QUESTIONS.filter((question) => question.lessonId === lesson.id),
}));
