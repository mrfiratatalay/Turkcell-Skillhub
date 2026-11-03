# SkillHub dokümanları

Bu klasörde SkillHub'ı kendi anlatımımla, ayrıntısıyla açıklıyorum: projenin nereden çıktığını, hangi
problemi nasıl çözdüğümü ve her teknik kararın arkasındaki gerekçeyi. Her dokümanda kararın bedelini de
yazdım; çünkü bence bir kararı anlatmanın yarısı, neyden vazgeçtiğini söyleyebilmek.

## Nereden başlamalı?

| Kimsin? | Önerdiğim sıra |
|---|---|
| Projeye ilk kez bakıyorsun, teknik ayrıntı istemiyorsun | [Hikâye](01-hikaye.md) → [Demo turu](02-demo-turu.md) |
| Yazılımcısın, mimariyi ve kodu merak ediyorsun | [Hikâye](01-hikaye.md) → [Mimari](03-mimari.md) → [Oyun kuralları](05-oyun-kurallari.md) → [Çözdüğüm problemler](11-cozdugum-problemler.md) |
| Mülakattan önce hızlıca göz atacaksın | [Çözdüğüm problemler](11-cozdugum-problemler.md) → [Sorular ve sınırlar](12-sorular-ve-sinirlar.md) |
| Projeyi kendi makinende çalıştıracaksın | [Çalıştırma ve API](10-calistirma-ve-api.md) |

## Bütün dokümanlar

| # | Doküman | İçinde ne var |
|---|---|---|
| 01 | [Hikâye](01-hikaye.md) | Code Night gecesi, hackathon kodunun dürüst bir incelemesi, neden baştan yazdığım ve kendime koyduğum kurallar |
| 02 | [Demo turu](02-demo-turu.md) | Teknik bilgi gerektirmeyen, 5 dakikalık adım adım tur |
| 03 | [Mimari](03-mimari.md) | Modüler monolit, katmanlar, modüller, bir isteğin yolculuğu, Docker yerleşimi |
| 04 | [Veritabanı](04-veritabani.md) | Şema, XP defteri, ön koşul grafiği, veritabanında korunan kurallar, zaman dilimi |
| 05 | [Oyun kuralları](05-oyun-kurallari.md) | Quiz puanlama, XP politikası, Gece Saati, seriler, rozetler, kilitler |
| 06 | [Güvenlik](06-guvenlik.md) | JWT, BCrypt, zamanlama saldırısı, IDOR, hata sözleşmesi, sırlar |
| 07 | [Gece Rehberi](07-gece-rehberi.md) | Claude ile öneri üretimi, doğrulama, kural tabanlı yedek motor, önbellek |
| 08 | [Arayüz ve tasarım](08-arayuz-ve-tasarim.md) | Frontend mimarisi, sunucu durumu, Sakin Gece tasarım dili, erişilebilirlik |
| 09 | [Yayın stratejisi](09-yayin-stratejisi.md) | Sunucu masrafı olmadan canlı demo, demo modu, Vercel ve Docker |
| 10 | [Çalıştırma ve API](10-calistirma-ve-api.md) | Kurulum, ortam değişkenleri, örnek isteklerle API |
| 11 | [Çözdüğüm problemler](11-cozdugum-problemler.md) | Problem, çözüm ve gerekçe biçiminde on iki kısa hikâye |
| 12 | [Sorular ve sınırlar](12-sorular-ve-sinirlar.md) | Sık sorulan teknik sorular, bilinen sınırlar ve yol haritası |

## Okurken bilmen gerekenler

- Kod, sınıf ve değişken adları İngilizce; arayüz metinleri ve bu dokümanlar Türkçe.
- Dokümanlardaki bağlantılar doğrudan ilgili kaynak dosyaya gider. Bir iddiayı okuduğunda kodunu da
  açıp bakabilesin istedim.
- Elle yazılan hiçbir dosya 300 satırı geçmiyor; bu dokümanlar da bu kurala uyuyor.
