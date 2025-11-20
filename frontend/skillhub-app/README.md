# Turkcell SkillHub - Frontend

Turkcell SkillHub, gençler için dijital beceri geliştirme platformunun modern ve kullanıcı dostu frontend uygulamasıdır.

## 🚀 Teknolojiler

- **React 18** - Modern UI kütüphanesi
- **TypeScript** - Type-safe JavaScript
- **Vite** - Hızlı build aracı
- **Material-UI (MUI)** - Modern UI bileşenleri
- **React Router** - Client-side routing
- **React Query** - Server state yönetimi
- **Recharts** - Veri görselleştirme
- **Axios** - HTTP istekleri

## 📁 Proje Yapısı

```
src/
├── components/         # Yeniden kullanılabilir bileşenler
│   ├── dashboard/     # Dashboard bileşenleri
│   ├── quiz/          # Quiz bileşenleri
│   └── ProtectedRoute.tsx
├── contexts/          # React Context'ler (Auth)
├── data/              # Mock data
├── hooks/             # Custom React hooks
├── layouts/           # Layout bileşenleri
├── pages/             # Sayfa bileşenleri
├── services/          # API servisleri
├── types/             # TypeScript type tanımları
├── App.tsx            # Ana uygulama
├── main.tsx           # Giriş noktası
└── theme.ts           # MUI tema konfigürasyonu
```

## 🎨 Özellikler

### ✅ Kimlik Doğrulama
- Kullanıcı girişi ve kaydı
- Korumalı rotalar (Protected routes)
- Oturum yönetimi

### 📊 Dashboard
- **Sol Panel**: Aktif dersler
- **Orta Panel**: Quiz sonuçları ve ilerleme grafiği
- **Sağ Panel**: Rozetler ve liderlik tablosu

### 🎓 Eğitim Sistemi
- Kategori bazlı ders listeleme (Yazılım, Yapay Zeka, Siber Güvenlik, Girişimcilik)
- Ders detay sayfası (Video player + Quiz butonu)
- Zorluk seviyesi göstergesi

### 📝 Quiz Sistemi
- İnteraktif quiz çözme
- İlerleme göstergesi
- Anında sonuç ekranı
- Puan kazanma
- Otomatik rozet verme

### 🏆 Rozet ve Seviye
- Motivasyon Rozeti (3 ders tamamlama)
- Uzman Rozeti (10 quizde %80+ başarı)
- Görsel rozet koleksiyonu

### 📈 Liderlik Tablosu
- Genel sıralama
- Şehir bazlı filtreleme
- Kullanıcı sırası vurgulama
- Top 3 özel gösterim (🥇🥈🥉)

### 👤 Profil
- Kullanıcı bilgileri
- İstatistikler (Toplam puan, tamamlanan ders, başarı oranı)
- Rozet koleksiyonu
- İlerleme barları

## 🛠️ Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Kurulum Adımları

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcıda açın:
```
http://localhost:5173
```

## 🎯 Mock Data

Uygulama, `turkcell_skillhub_seed_data` klasöründeki CSV verilerine dayalı mock data ile çalışır:

- **users.csv**: Kullanıcı verileri
- **categories.csv**: Eğitim kategorileri
- **lessons.csv**: Dersler
- **quizzes.csv**: Quiz soruları
- **quiz_results.csv**: Quiz sonuçları
- **badges.csv**: Rozetler
- **leaderboard.csv**: Liderlik tablosu

## 🎨 Tasarım

### Renk Paleti
- **Primary (Sarı)**: #FFC900 - Turkcell sarısı
- **Secondary (Mavi)**: #003D7A - Turkcell mavisi
- **Success**: #4CAF50
- **Error**: #F44336
- **Warning**: #FF9800

### Kategori Renkleri
- **Yazılım**: Mavi (#2196F3)
- **Yapay Zeka**: Mor (#9C27B0)
- **Siber Güvenlik**: Kırmızı (#F44336)
- **Girişimcilik**: Turuncu (#FF9800)

## 📱 Responsive Tasarım

Uygulama, tüm ekran boyutlarında mükemmel görünecek şekilde tasarlanmıştır:
- **Desktop**: 3 kolonlu dashboard düzeni
- **Tablet**: 2 kolonlu düzen, hamburger menü
- **Mobile**: Tek kolon, alt alta paneller

## 🚀 Production Build

Production build oluşturmak için:

```bash
npm run build
```

Build sonucu `dist` klasöründe oluşturulur.

## 📝 Demo Giriş

Herhangi bir e-posta ve şifre ile giriş yapabilirsiniz. Sistem otomatik olarak ilk kullanıcıyı (Ayşe) kullanır.

## 🎯 Özellikler Detayları

### Dashboard 3 Panel Düzeni
1. **Sol Panel - Aktif Dersler**
   - Tamamlanmamış dersler
   - Kategori etiketleri
   - Süre bilgisi
   - "Derse Başla" butonu

2. **Orta Panel - İlerleme**
   - Toplam puan kartı
   - Tamamlanan ders sayısı
   - Tamamlama oranı progress bar
   - Ortalama başarı progress bar
   - Quiz performans grafiği (Recharts)
   - Son quiz sonucu

3. **Sağ Panel - Rozetler & Liderlik**
   - Kazanılan rozetler (grid düzeni)
   - Kullanıcının sırası
   - Top 5 kullanıcı listesi
   - "Tüm Sıralamayı Gör" butonu

## 🔧 Teknik Detaylar

### State Yönetimi
- **Server State**: React Query (cache, loading, error handling)
- **UI State**: Local state (useState, useReducer)
- **Auth State**: Context API

### Performance
- Code splitting (lazy loading)
- React Query caching (5 dakika)
- Memoization (React.memo, useMemo)
- Optimized re-renders

### Type Safety
- Tam TypeScript desteği
- Interface ve type tanımları
- Generic types

## 📄 Lisans

Bu proje Turkcell Code Night yarışması için geliştirilmiştir.

## 👥 Geliştirici

Developed with ❤️ for Turkcell Code Night

