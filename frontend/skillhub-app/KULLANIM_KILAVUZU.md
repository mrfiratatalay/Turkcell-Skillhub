# 🚀 TURKCELL SKILLHUB - KULLANIM KILAVUZU

## 📱 UYGULAMAYI ÇALIŞTIRMA

### 1. Sunucuyu Başlatın
```bash
cd "C:\Users\FIRAT\Desktop\Code Night\code_night\frontend\skillhub-app"
npm run dev
```

### 2. Tarayıcıda Açın
```
http://localhost:5173
```

---

## 🔐 LOGIN (GİRİŞ) BİLGİLERİ

### ✅ Demo Giriş - HERHANGİ BİR E-POSTA VE ŞİFRE İLE GİRİŞ YAPABİLİRSİNİZ!

Uygulama **MOCK DATA** ile çalıştığı için **GERÇEKTEN KAYITLI OLMAK GEREKMİYOR**.

#### Örnek Giriş Bilgileri:
```
E-posta: test@test.com
Şifre: 123456
```

VEYA

```
E-posta: demo@turkcell.com
Şifre: password
```

VEYA

```
E-posta: herhangi@email.com
Şifre: herhangibirşey
```

> **NOT:** Sistem otomatik olarak ilk kullanıcıyı (Ayşe) kullanır ve giriş yaptırır.

---

## 👤 MOCK KULLANICILAR (Test İçin)

Sistemde 3 kullanıcı bulunmaktadır:

### Kullanıcı 1: Ayşe
- **User ID:** U1
- **Şehir:** Istanbul
- **Üniversite:** ITU
- **Seviye:** Beginner
- **Puan:** 120
- **Rozet:** 2

### Kullanıcı 2: Ali
- **User ID:** U2
- **Şehir:** Ankara
- **Üniversite:** METU
- **Seviye:** Intermediate
- **Puan:** 250
- **Rozet:** 3

### Kullanıcı 3: Deniz
- **User ID:** U3
- **Şehir:** Izmir
- **Üniversite:** Ege University
- **Seviye:** Advanced
- **Puan:** 400
- **Rozet:** 4

---

## 📚 ÖZELLIKLER VE KULLANIM

### 1. 🏠 Dashboard
- **Sol Panel:** Aktif dersler
- **Orta Panel:** Quiz performansı ve grafik
- **Sağ Panel:** Rozetler ve liderlik tablosu

### 2. 🎓 Eğitimler (Lessons)
- Kategorilere göre dersler
- 4 Kategori:
  - 📘 Yazılım
  - 🤖 Yapay Zeka
  - 🔒 Siber Güvenlik
  - 💼 Girişimcilik

### 3. 📺 Ders Detayı
- Video izleme
- Quiz'e başlama butonu

### 4. 🎯 Quiz Sistemi
- Soru navigasyonu (Önceki/Sonraki)
- Progress bar
- Otomatik puanlama
- Rozet kazanma sistemi

### 5. 🏆 Rozetler
**Motivasyon Rozeti:** 3 ders tamamla
**Uzman Rozeti:** 3 quizde %80+ başarı

### 6. 📊 Profil
- Tüm istatistikler
- Rozet koleksiyonu
- İlerleme oranı

### 7. 🏅 Liderlik Tablosu
- Şehir bazlı filtreleme
- Top 3 özel gösterim
- Kendi sıranı görme

---

## 🎨 TASARIM ÖZELLİKLERİ

### Renkler
- **Primary (Sarı):** #FFC900 - Turkcell sarısı
- **Secondary (Mavi):** #003D7A - Turkcell mavisi

### Kategori Renkleri
- **Yazılım:** Mavi (#2196F3)
- **Yapay Zeka:** Mor (#9C27B0)
- **Siber Güvenlik:** Kırmızı (#F44336)
- **Girişimcilik:** Turuncu (#FF9800)

---

## 🔥 HIZLI TEST SENARYOSU

### Senaryo 1: İlk Giriş ve Dashboard Keşfi
1. `http://localhost:5173` adresine git
2. Herhangi bir e-posta ve şifre ile giriş yap
3. Dashboard'u incele (3 panel düzeni)
4. Sağ üstte kullanıcı bilgilerini gör

### Senaryo 2: Ders İzleme ve Quiz Çözme
1. Sol panelden bir derse tıkla VEYA "Eğitimler" menüsüne git
2. Bir ders seç
3. Video izle
4. "Quiz'e Başla" butonuna tıkla
5. Soruları cevapla
6. Sonuç ekranını gör
7. Yeni rozet kazandıysan göreceksin! 🎉

### Senaryo 3: Liderlik Tablosunda Kendini Gör
1. Sidebar'dan "Liderlik Tablosu" seç
2. Kendi sıranı gör (sarı vurgulu)
3. Şehir filtresi kullan
4. Top 3 kullanıcıları gör (🥇🥈🥉)

### Senaryo 4: Profil ve Rozetler
1. Sağ üstten avatar'a tıkla → "Profilim"
2. Tüm istatistikleri gör
3. Rozet koleksiyonunu incele
4. Tamamlama oranını kontrol et

---

## ⚡ PERFORMANS VE ÖZELLİKLER

✅ **Tam Responsive** - Mobil, tablet, desktop
✅ **Modern UI/UX** - Material-UI bileşenleri
✅ **Smooth Animasyonlar** - Hover efektleri
✅ **Type Safe** - Full TypeScript
✅ **React Query** - Cache yönetimi
✅ **Grafik Gösterimi** - Recharts ile
✅ **Rozet Sistemi** - Otomatik kazanma

---

## 🐛 HATA ÇÖZÜMLEME

### Port Meşgul Hatası
```bash
# Port'u değiştir
npm run dev -- --port 3000
```

### Cache Sorunu
```bash
# Vite cache'ini temizle
rm -r node_modules/.vite
npm run dev
```

### TypeScript Hatası
```bash
# node_modules'u yeniden yükle
rm -r node_modules
npm install
npm run dev
```

---

## 📁 PROJE YAPISI

```
src/
├── components/         # Yeniden kullanılabilir bileşenler
│   ├── dashboard/     # Dashboard bileşenleri
│   └── quiz/          # Quiz bileşenleri
├── contexts/          # Auth Context
├── data/              # Mock data
├── hooks/             # Custom React hooks (React Query)
├── layouts/           # Layout bileşenleri
├── pages/             # Sayfa bileşenleri
├── services/          # API servisleri
├── types/             # TypeScript type tanımları
├── App.tsx            # Ana uygulama
└── main.tsx           # Giriş noktası
```

---

## 🎯 TEST KONTROL LİSTESİ

- [ ] Login ekranı çalışıyor mu?
- [ ] Dashboard 3 panel görünüyor mu?
- [ ] Dersler listeleniryor mu?
- [ ] Video oynatılıyor mu?
- [ ] Quiz çözülebiliyor mu?
- [ ] Puan kazanılıyor mu?
- [ ] Rozetler görünüyor mu?
- [ ] Liderlik tablosu çalışıyor mu?
- [ ] Profil sayfası doğru mu?
- [ ] Mobil uyumlu mu?
- [ ] Grafik gösterimi çalışıyor mu?
- [ ] Sidebar navigasyon doğru mu?

---

## 💡 ÖNEMLİ NOTLAR

1. **Mock Data Kullanımı:** Uygulama gerçek bir backend'e bağlı değil, tüm veriler `src/data/mockData.ts` dosyasında.

2. **LocalStorage:** Kullanıcı bilgileri ve token LocalStorage'da saklanır.

3. **Otomatik Rozet Sistemi:** Quiz sonrasında otomatik olarak rozet kontrolü yapılır.

4. **Dinamik Puanlama:** Quiz puanınız otomatik hesaplanır ve toplam puana eklenir.

5. **React Query Cache:** Veriler cache'lenir, gereksiz API çağrıları önlenir.

---

## 🚀 PRODUCTION BUILD

```bash
# Build oluştur
npm run build

# Build'i önizle
npm run preview
```

Build dosyaları `dist` klasöründe oluşur.

---

## 📞 DESTEK

Herhangi bir sorun yaşarsanız:
1. Tarayıcı console'unu kontrol edin (F12)
2. Cache'i temizleyin
3. Sunucuyu yeniden başlatın

**İyi Eğlenceler! 🎉**

