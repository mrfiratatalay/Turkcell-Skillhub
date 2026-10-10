// Lesson categories; each one is drawn as a constellation on the sky map.
import type { DemoCategory } from './types';

export const DEMO_CATEGORIES: readonly DemoCategory[] = [
  {
    "id": 1, "slug": "yazilim", "name": "Yazılım Geliştirme", "constellation": "Kod Avcısı",
    "description": "Algoritmadan API tasarımına, yazılımın temel taşlarını yıldız yıldız keşfet.",
    "icon": "code", "sortOrder": 1
  },
  {
    "id": 2, "slug": "yapay-zeka", "name": "Yapay Zeka", "constellation": "Sinir Ağı",
    "description": "Veriden öğrenen sistemlerin ve büyük dil modellerinin dünyasına yolculuk.",
    "icon": "ai", "sortOrder": 2
  },
  {
    "id": 3, "slug": "siber-guvenlik", "name": "Siber Güvenlik", "constellation": "Kalkan",
    "description": "Saldırganın gözünden düşün, savunmanı katman katman kur.",
    "icon": "shield", "sortOrder": 3
  },
  {
    "id": 4, "slug": "girisimcilik", "name": "Girişimcilik", "constellation": "Roket",
    "description": "Bir fikri problem, müşteri ve iş modeliyle gerçek bir ürüne dönüştür.",
    "icon": "rocket", "sortOrder": 4
  }
];
