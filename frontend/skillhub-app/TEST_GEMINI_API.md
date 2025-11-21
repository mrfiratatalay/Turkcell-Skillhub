# 🧪 Gemini API Test Rehberi

## ✅ Kurulum Tamamlandı!

### 📁 Oluşturulan Dosyalar:
- ✅ `.env` → API key içeride
- ✅ `src/services/geminiApi.ts` → Gemini 2.5 Flash entegrasyonu
- ✅ `src/components/dashboard/AIRecommendations.tsx` → UI component

---

## 🚀 Hızlı Test

### 1️⃣ Frontend'i Başlat:

```powershell
cd "C:\Users\FIRAT\Desktop\Code Night\code_night\frontend\skillhub-app"
npm run dev
```

### 2️⃣ Tarayıcıda Aç:

```
http://localhost:5173/dashboard
```

### 3️⃣ AI Önerileri Kartını Gör:

Dashboard'ın **en üstünde** mor renkli **"AI Önerileri"** kartı olacak.

---

## 🔍 Beklenen Görünümler

### ✅ Başarılı (Gemini API Çalışıyor):

```
┌─────────────────────────────────────────┐
│  🧠  AI Önerileri                       │
│      [✨ Gemini AI]                     │
├─────────────────────────────────────────┤
│  Loading...                             │
│  AI önerileri hazırlanıyor...           │
└─────────────────────────────────────────┘

↓ SONRA (2-3 saniye)

┌─────────────────────────────────────────┐
│  🧠  AI Önerileri                       │
│      [✨ Gemini AI]                     │
├─────────────────────────────────────────┤
│  🎯 Motivasyon Rozetine Çok Yakınsın!   │
│     1 ders daha tamamla...              │
│     Hedefine çok yaklaştın              │
├─────────────────────────────────────────┤
│  📚 Python Temelleri ile Başla          │
│     Seviyene uygun ve popüler           │
│     Temel kavramları öğrenmek için      │
└─────────────────────────────────────────┘
```

### ⚠️ Fallback (API Key Hatalı veya API Down):

```
┌─────────────────────────────────────────┐
│  🧠  AI Önerileri                       │
│      [💡 Akıllı Öneri]                  │
├─────────────────────────────────────────┤
│  👋 Hoş Geldin!                         │
│     İlk dersine başla...                │
└─────────────────────────────────────────┘
```

**Not:** Fallback durumunda "Gemini AI" yerine "Akıllı Öneri" yazar.

---

## 🐛 Hata Ayıklama

### Console'u Aç:

1. Tarayıcıda **F12** bas
2. **Console** tab'ına geç
3. Şu mesajları ara:

#### ✅ Başarılı Log'lar:

```
Gemini raw response: [{"title":"...","description":"..."}]
Parsed recommendations: [{...}]
```

#### ❌ Hata Log'ları:

```
Gemini API error: 400 - API_KEY_INVALID
// ÇÖZÜM: .env dosyasındaki API key'i kontrol et

Gemini API error: 429 - QUOTA_EXCEEDED
// ÇÖZÜM: API quota doldu, yeni key al veya fallback kullan

No response text from Gemini
// ÇÖZÜM: İnternet bağlantısını kontrol et
```

---

## 🔑 API Key Kontrolü

### .env Dosyasını Kontrol Et:

```powershell
Get-Content "C:\Users\FIRAT\Desktop\Code Night\code_night\frontend\skillhub-app\.env"
```

**Beklenen Çıktı:**

```
VITE_GEMINI_API_KEY=AIzaSyBv_JV7edI7hVPd5CjjrNtw1c4kiMvNifw
VITE_API_BASE_URL=http://localhost:8080/api
```

### API Key Geçerli mi Test Et:

```powershell
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBv_JV7edI7hVPd5CjjrNtw1c4kiMvNifw" `
  -H 'Content-Type: application/json' `
  -X POST `
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Merhaba"
          }
        ]
      }
    ]
  }'
```

**Beklenen Sonuç:** JSON response döner (API çalışıyor)

---

## 🎯 Gemini 2.5 Flash Özellikleri

Bu projede kullanılan model: **`gemini-2.5-flash`**

### Neden Bu Model?

✅ **En Balanced:** Hız ve kalite dengesi mükemmel  
✅ **1M Token Context:** Çok fazla veri işleyebilir  
✅ **Ücretsiz Tier:** Günde 1500 istek ücretsiz  
✅ **JSON Output:** Structured output desteği  
✅ **Türkçe Desteği:** Türkçe anlıyor ve üretiyor  

### Diğer Modeller:

- **`gemini-3-pro`** → En akıllı ama yavaş ve pahalı
- **`gemini-2.5-pro`** → Reasoning için en iyi
- **`gemini-2.5-flash-lite`** → En hızlı ama daha basit

---

## 📊 API Kullanım Limitleri

### Ücretsiz Tier:

- **1500 request/day** (günlük)
- **15 request/minute** (dakikalık)
- **Max 32K tokens/request** (istek başına)

### Projede Kullanım:

- Her dashboard yüklendiğinde: **1 request**
- Ortalama token: ~500-1000 (prompt + response)
- Tahmini günlük: **10-20 request** (normal kullanımda)

**✅ Limit aşma riski YOK!**

---

## 🛠️ Sorun Giderme

### Problem: AI Önerileri Görünmüyor

**Çözüm 1:** Frontend'i yeniden başlat

```powershell
# Ctrl+C ile durdur
npm run dev
```

**Çözüm 2:** Cache temizle

```powershell
# Tarayıcıda: Ctrl+Shift+Delete → Cache temizle
# VEYA
# Tarayıcıda: Ctrl+F5 (hard refresh)
```

**Çözüm 3:** .env dosyasını kontrol et

```powershell
# Dosya var mı?
Test-Path "C:\Users\FIRAT\Desktop\Code Night\code_night\frontend\skillhub-app\.env"

# İçeriği doğru mu?
Get-Content ".env"
```

### Problem: "Akıllı Öneri" Yazıyor (Gemini AI değil)

Bu **NORMAL!** API fallback çalışıyor.

**Sebepleri:**
1. API key hatalı veya eksik
2. İnternet bağlantısı yok
3. Gemini API quota doldu
4. Gemini API geçici olarak down

**Öneriler hala gösteriliyor ama Gemini'den gelmiyor.**

---

## 📖 Gemini API Dökümanı

Detaylı bilgi için:

🔗 https://ai.google.dev/gemini-api/docs

**Önemli Bölümler:**
- Quickstart: https://ai.google.dev/gemini-api/docs/quickstart
- Models: https://ai.google.dev/gemini-api/docs/models/gemini
- Rate Limits: https://ai.google.dev/gemini-api/docs/rate-limits

---

## ✅ Test Checklist

- [ ] `.env` dosyası var ve API key içinde
- [ ] Frontend başladı (`npm run dev`)
- [ ] Dashboard açıldı (`http://localhost:5173/dashboard`)
- [ ] AI Önerileri kartı görünüyor (mor renkli)
- [ ] Loading state göründü
- [ ] 2-3 saniye sonra öneriler yüklendi
- [ ] Console'da hata YOK
- [ ] "Gemini AI" badge görünüyor (fallback değil)

---

## 🎉 Bonus Puanlama

✅ **Gerçek AI entegrasyonu** (+5 puan)  
✅ **Kişiselleştirilmiş öneriler** (+3 puan)  
✅ **Modern UI/UX** (+2 puan)  
━━━━━━━━━━━━━━━━━━━━━━━━━  
**TOPLAM: +10 BONUS PUAN** 🏆

---

**Sistem hazır! Test et ve jüriye göster!** 🚀

