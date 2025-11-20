# 🔐 MOCK AUTHENTICATION SİSTEMİ

## ✅ NASIL ÇALIŞIYOR?

### Authentication/Register: LocalStorage (Mock)
- Login → LocalStorage'dan kontrol edilir
- Register → LocalStorage'a kaydedilir
- Logout → LocalStorage temizlenir
- **Backend'e HIÇBIR AUTH İSTEĞİ GİTMEZ**

### Diğer Tüm İşlemler: Backend API
- Lessons → Backend'den gelir
- Quiz → Backend'den gelir
- Profile → Backend'den gelir
- Leaderboard → Backend'den gelir
- **BACKEND ÇALIŞMALIDIR**

---

## 👥 TEST KULLANICILARI

### Demo User 1 (Advanced Level)
```
E-posta: ahmet@test.com
Şifre: 123456
```

### Demo User 2 (Intermediate Level)
```
E-posta: ayse@test.com
Şifre: 123456
```

### Demo User 3 (Beginner Level)
```
E-posta: mehmet@test.com
Şifre: 123456
```

---

## 🆕 YENİ KULLANICI KAYDI

Kayıt sayfasından istediğiniz bilgilerle yeni kullanıcı oluşturabilirsiniz:

1. **Ad Soyad:** Minimum 3 karakter
2. **E-posta:** Geçerli e-posta formatı (@ içermeli)
3. **Şifre:** Minimum 6 karakter
4. **Şehir:** Dropdown'dan seçin
5. **Üniversite:** Yazın

**Kayıt olduktan sonra direkt giriş yapılır.**

---

## 🔧 TEKNİK DETAYLAR

### LocalStorage Keys:
- `skillhub_users` → Tüm kullanıcılar
- `skillhub_current_user` → Giriş yapan kullanıcı
- `authToken` → Mock token (userId bazlı)
- `currentUserId` → Aktif kullanıcı ID'si

### User ID Format:
- **Auto-increment:** U1, U2, U3, U4, ...
- Her yeni kayıtta otomatik artırılır

### Dosyalar:
- `src/utils/mockAuth.ts` → Mock auth logic
- `src/contexts/AuthContext.tsx` → Auth context (mock auth kullanıyor)

---

## ⚠️ BACKEND ÇALIŞMASI GEREKİYOR

Mock auth sadece **Login/Register** içindir.

**Backend çalışmazsa:**
- ✅ Login çalışır
- ✅ Register çalışır
- ✅ Logout çalışır
- ❌ Dashboard yüklenmez (API çağrısı yapar)
- ❌ Lessons yüklenmez (API çağrısı yapar)
- ❌ Quiz çalışmaz (API çağrısı yapar)
- ❌ Profile yüklenmez (API çağrısı yapar)
- ❌ Leaderboard yüklenmez (API çağrısı yapar)

---

## 🚀 KULLANIM ADIMLARı

### 1. Frontend'i Başlat:
```bash
cd frontend/skillhub-app
npm run dev
```

### 2. Backend'i Başlat (Gerekli):
```bash
cd backend
.\BASIT-BASLAT.ps1
```

### 3. Test Et:
1. http://localhost:5173 → Login sayfası
2. Test kullanıcısıyla giriş: `ahmet@test.com` / `123456`
3. Dashboard'a yönlendirilir
4. Backend API'den veriler gelir

---

## 💡 AVANTAJLAR

✅ **Backend auth problemi yok**  
✅ **Hızlı test**  
✅ **Token problemleri yok**  
✅ **Database auth tablosu gerekmiyor**  
✅ **Backend API'ler normal çalışır**  
✅ **CORS sorunu sadece API çağrılarında (auth'ta değil)**  

---

## 🎯 SONUÇ

**Bu sistem en ideal çözümdür çünkü:**

1. Auth sistemi tamamen frontend'te (localStorage)
2. Backend sadece data API'leri için kullanılır
3. CORS sorunu sadece data API'lerinde olabilir (auth'ta olmaz)
4. Test ve development çok hızlıdır
5. Gerçek backend'e geçmek kolaydır

**SİSTEM HAZIR! TEST EDEBİLİRSİNİZ! 🚀**

