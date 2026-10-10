// Collectible badges and the hints shown before they are earned.
import type { DemoBadge } from './types';

export const DEMO_BADGES: readonly DemoBadge[] = [
  {
    "code": "ILK_YILDIZ", "name": "İlk Yıldız",
    "description": "İlk dersini başarıyla tamamladın.",
    "hint": "Herhangi bir dersin quiz'ini %70 ve üzeri puanla geç.",
    "icon": "star", "tier": "GOLD", "secret": false, "sortOrder": 1
  },
  {
    "code": "KUSURSUZ", "name": "Kusursuz Gece",
    "description": "Bir quiz'i %100 ile bitirdin.",
    "hint": "Bir quiz'deki tüm soruları doğru cevapla.",
    "icon": "target", "tier": "GOLD", "secret": false, "sortOrder": 2
  },
  {
    "code": "ALEV_SERISI", "name": "Alev Serisi",
    "description": "3 gün üst üste öğrendin.",
    "hint": "3 gün art arda en az bir quiz çöz.",
    "icon": "flame", "tier": "GOLD", "secret": false, "sortOrder": 3
  },
  {
    "code": "KESINTISIZ_HAFTA", "name": "Kesintisiz Hafta",
    "description": "7 gün üst üste öğrendin.",
    "hint": "7 gün art arda en az bir quiz çöz.",
    "icon": "calendar", "tier": "NEON", "secret": false, "sortOrder": 4
  },
  {
    "code": "MERAKLI_GEZGIN", "name": "Meraklı Gezgin",
    "description": "3 farklı takımyıldızdan ders tamamladın.",
    "hint": "Üç farklı kategoriden birer ders tamamla.",
    "icon": "compass", "tier": "NEON", "secret": false, "sortOrder": 5
  },
  {
    "code": "AZIMLI", "name": "Azimli",
    "description": "Geçemediğin bir quiz'i tekrar deneyip geçtin.",
    "hint": "Pes etme: Kaldığın bir quiz'i yeniden dene.",
    "icon": "refresh", "tier": "NEON", "secret": false, "sortOrder": 6
  },
  {
    "code": "GECE_KUSU", "name": "Gece Kuşu",
    "description": "Gece yarısından sonra bir quiz tamamladın. Gerçek kodcu gece çalışır.",
    "hint": "Bu rozetin sırrı gecede saklı...",
    "icon": "moon", "tier": "NEON", "secret": true, "sortOrder": 7
  },
  {
    "code": "KOD_AVCISI", "name": "Kod Avcısı",
    "description": "Yazılım Geliştirme takımyıldızının tüm yıldızlarını yaktın.",
    "hint": "Yazılım Geliştirme derslerinin hepsini tamamla.",
    "icon": "code", "tier": "GOLD", "secret": false, "sortOrder": 8
  },
  {
    "code": "SINIR_AGI", "name": "Sinir Ağı",
    "description": "Yapay Zeka takımyıldızının tüm yıldızlarını yaktın.",
    "hint": "Yapay Zeka derslerinin hepsini tamamla.",
    "icon": "ai", "tier": "GOLD", "secret": false, "sortOrder": 9
  },
  {
    "code": "KALKAN", "name": "Kalkan",
    "description": "Siber Güvenlik takımyıldızının tüm yıldızlarını yaktın.",
    "hint": "Siber Güvenlik derslerinin hepsini tamamla.",
    "icon": "shield", "tier": "GOLD", "secret": false, "sortOrder": 10
  },
  {
    "code": "ROKET", "name": "Roket",
    "description": "Girişimcilik takımyıldızının tüm yıldızlarını yaktın.",
    "hint": "Girişimcilik derslerinin hepsini tamamla.",
    "icon": "rocket", "tier": "GOLD", "secret": false, "sortOrder": 11
  },
  {
    "code": "SAFAK", "name": "Şafak",
    "description": "Gece Saati'nde 07:00'ye ulaştın: Gecenin sonunu gördün.",
    "hint": "Gecenin sonuna kadar öğrenmeye devam et.",
    "icon": "sunrise", "tier": "GOLD", "secret": true, "sortOrder": 12
  }
];
