# SkillHub · Eski Hâlimiz 🏆

> **Turkcell CodeNight · Trabzon Birinciliği**
> Bir gecede yazıp birincilik kazandığımız hâliyle SkillHub. Sıfırdan yeniden yazmadan önce, hatıra olarak.

| | |
|---|---|
| **Yarışma gecesi** | 20 Kasım 2025, 20:13 → 21 Kasım 2025, 06:27 (ilk ve son commit) |
| **Son commit** | `b2ebdb0` · *"I have been finished backend and frontend entegretion"* |
| **Görüntülerin alındığı gün** | 9 Ekim 2026 |
| **Backend** | Spring Boot 3.5.8 · Java 21 · PostgreSQL · Swagger |
| **Frontend** | React 18 · TypeScript · Material UI 7 · Vite · Gemini API |

---

## Sayfalar

| # | Sayfa | Masaüstü | Mobil |
|---|---|---|---|
| 01 | Giriş | [aç](masaustu/01-giris.png) | [aç](mobil/01-giris.png) |
| 02 | Kayıt | [aç](masaustu/02-kayit.png) | [aç](mobil/02-kayit.png) |
| 03 | Dashboard | [aç](masaustu/03-dashboard.png) | [aç](mobil/03-dashboard.png) · [menü](mobil/03-dashboard-menu.png) |
| 04 | Eğitim Kataloğu | [aç](masaustu/04-dersler.png) | [aç](mobil/04-dersler.png) |
| 05 | Ders Detayı | [aç](masaustu/05-ders-detay.png) | [aç](mobil/05-ders-detay.png) |
| 06 | Liderlik Tablosu | [aç](masaustu/06-liderlik.png) | [aç](mobil/06-liderlik.png) |
| 07 | Profil | [aç](masaustu/07-profil.png) | [aç](mobil/07-profil.png) |
| 08 | AI Asistan | [aç](masaustu/08-ai-asistan.png) | [aç](mobil/08-ai-asistan.png) |
| 09 | AI Asistan · Öneriler | [aç](masaustu/09-ai-asistan-oneriler.png) | [aç](mobil/09-ai-asistan-oneriler.png) |
| 10 | Quiz · Soru | [aç](masaustu/10-quiz-soru.png) | [aç](mobil/10-quiz-soru.png) |
| 11 | Quiz · Sonuç | [aç](masaustu/11-quiz-sonuc.png) | [aç](mobil/11-quiz-sonuc.png) |
| 12 | Swagger API | [aç](masaustu/12-swagger-api.png) | — |

---

## Galeri · Masaüstü

### 01 · Giriş
![Giriş](masaustu/01-giris.png)

### 02 · Kayıt
![Kayıt](masaustu/02-kayit.png)

### 03 · Dashboard
![Dashboard](masaustu/03-dashboard.png)

### 04 · Eğitim Kataloğu
![Eğitim Kataloğu](masaustu/04-dersler.png)

### 05 · Ders Detayı
![Ders Detayı](masaustu/05-ders-detay.png)

### 06 · Liderlik Tablosu
![Liderlik Tablosu](masaustu/06-liderlik.png)

### 07 · Profil
![Profil](masaustu/07-profil.png)

### 08 · AI Asistan
![AI Asistan](masaustu/08-ai-asistan.png)

### 09 · AI Asistan · Öneriler
![AI Asistan Öneriler](masaustu/09-ai-asistan-oneriler.png)

### 10 · Quiz · Soru
![Quiz Soru](masaustu/10-quiz-soru.png)

### 11 · Quiz · Sonuç
![Quiz Sonuç](masaustu/11-quiz-sonuc.png)

### 12 · Swagger API
![Swagger API](masaustu/12-swagger-api.png)

---

## Galeri · Mobil

<table>
  <tr>
    <td align="center"><img src="mobil/01-giris.png" width="220"><br>01 · Giriş</td>
    <td align="center"><img src="mobil/02-kayit.png" width="220"><br>02 · Kayıt</td>
    <td align="center"><img src="mobil/03-dashboard-menu.png" width="220"><br>03 · Menü</td>
  </tr>
  <tr>
    <td align="center"><img src="mobil/03-dashboard.png" width="220"><br>03 · Dashboard</td>
    <td align="center"><img src="mobil/04-dersler.png" width="220"><br>04 · Eğitim Kataloğu</td>
    <td align="center"><img src="mobil/05-ders-detay.png" width="220"><br>05 · Ders Detayı</td>
  </tr>
  <tr>
    <td align="center"><img src="mobil/06-liderlik.png" width="220"><br>06 · Liderlik Tablosu</td>
    <td align="center"><img src="mobil/07-profil.png" width="220"><br>07 · Profil</td>
    <td align="center"><img src="mobil/08-ai-asistan.png" width="220"><br>08 · AI Asistan</td>
  </tr>
  <tr>
    <td align="center"><img src="mobil/09-ai-asistan-oneriler.png" width="220"><br>09 · Öneriler</td>
    <td align="center"><img src="mobil/10-quiz-soru.png" width="220"><br>10 · Quiz · Soru</td>
    <td align="center"><img src="mobil/11-quiz-sonuc.png" width="220"><br>11 · Quiz · Sonuç</td>
  </tr>
</table>

---

## Gülümseten Detaylar 😄

Bir gecede yazılan her projede olduğu gibi, bunda da tatlı kusurlar vardı:

- **Giriş ve kayıt gerçek değildi.** Kullanıcılar tarayıcının localStorage'ında tutuluyordu, demo şifreler de giriş ekranında yazıyordu.
- **Liderlik tablosundaki isimler uydurmaydı.** Backend isimleri `null` döndürüyordu, frontend de rastgele isimler üretiyordu. Üstteki kartta "Ayşe · #12" yazarken listenin 12. sırasında "Berat Şimşek (Sen)" görünüyor.
- **AI Asistan çelişkiye düşüyordu.** "Motivasyon Rozetine çok yakınsın!" diyordu, ama profilde o rozet zaten kazanılmış görünüyordu.
- **Üst bardaki "Puan / Rozet" alanları boştu.** Başlıklar vardı, değerler yoktu.
- **Menüde "Profil" diye bir öğe yoktu.** "Rozetlerim" profil sayfasını açıyordu.
- **Mobilde taşma vardı.** Ders kataloğu ve ders detayı 390px ekrandan taşıyordu (676px / 453px genişlik), ders kartlarında metinler üst üste biniyordu.
- **Arayüz Türkçe, içerik İngilizceydi.** Ders başlıkları ve quiz soruları İngilizceydi.
- **Footer'da "© 2024" yazıyordu.** Yarışma 2025'teydi.
- **Gemini anahtarı repoya commit'lenmişti.** Google onu "sızdırılmış" olarak işaretleyip kapattı. Bu yüzden AI Asistan, görüntülerde "AI servisi geçici olarak kullanılamıyor" uyarısıyla yedek önerilere düşüyor.

Yine de bu hâliyle birinci olduk. 🥇

---

## Bu Görüntüler Nasıl Alındı?

- **Araç:** Playwright ve headless Chrome ile otomatik çekildi.
- **Ekranlar:** Masaüstü 1440×900, mobil 390×844, ikisi de 2x (retina) çözünürlükte ve tam sayfa.
- **Veri:** Orijinal seed verisiyle, **Ayşe (U1)** hesabıyla giriş yapıldı. Quiz, "Introduction to Python" (L1) dersinde tüm sorular doğru cevaplanarak tamamlandı.
- **Çalıştırmak için yapılan düzeltmeler:** Java 25 derleme ayarı ve eksik `react-hot-toast` paketi. Arayüze dokunulmadı.
- **Sol menü:** Tam sayfa görüntülerde menünün yarıda bitmesi çekim yönteminden kaynaklanıyor. Sabit (fixed) menü yalnızca ekran yüksekliği kadar çiziliyor.

## Eski Koda Dönmek İçin

```bash
git checkout b2ebdb0
```
