# Demo turu: SkillHub'ı 5 dakikada tanı

Bu sayfayı teknik bilgi gerektirmeden SkillHub'ı gezmek isteyenler için yazdım. Özellikle işe alım
sürecinde projeme bakan İK uzmanlarının, hiçbir şey kurmadan her modülü deneyebilmesini istedim.

## Neye bakıyorsun?

SkillHub gençlere yazılım, yapay zekâ, siber güvenlik ve girişimcilik öğreten oyunlaştırılmış bir öğrenme
platformu. Her ders gökyüzünde bir yıldız, her konu bir takımyıldız. Bir dersin quiz'ini geçen öğrencinin
yıldızı yanar; kazandığı XP ile **Gece Saati** 17:00'den sabaha doğru ilerler. Bu saat, projenin doğduğu
14 saatlik Code Night gecesine bir selam.

## Nasıl girilir?

1. [skillhub-turkcell.vercel.app](https://skillhub-turkcell.vercel.app) adresini aç.
2. **Demoyu keşfet** düğmesine bas. Kayıt, şifre ya da kurulum gerekmez.
3. Artık hazır bir öğrenci profilindesin: Trabzon'dan **Deniz Yıldız**. Altı ders bitirmiş, bir dersi yarım
   bırakmış, dört rozet kazanmış ve üç günlük bir serisi var.

Yaptığın her şey yalnızca kendi tarayıcında saklanır. Kimsenin verisini bozamazsın ve istediğin an
başlangıç durumuna dönebilirsin.

## Önerdiğim tur

| # | Nereye git | Ne göreceksin | Arkasında ne var |
|---|---|---|---|
| 1 | **Gökyüzü** | Gece Saati, yanan yıldızlar, seri ve sıralama özeti, takımyıldız haritası. Bir yıldıza dokununca o derse gidersin. | Ekrandaki her sayı öğrencinin quiz sonuçlarından hesaplanır; elle girilmiş tek bir puan yoktur. |
| 2 | **Dersler** | 17 ders, 4 takımyıldız; konuya, zorluğa ve metne göre filtre. "REST API Tasarımı" %50'de yarım kalmış. | Dersler arasında ön koşul ilişkisi var: bir ders, öncekiler bitince açılır. |
| 3 | **Bir ders ve quiz'i** | Ders notları, konu videosu ve 4 soruluk quiz. Quiz'i klavyeyle de çözebilirsin: 1-4 ya da A-D şık seçer, Enter ilerletir. | Gerçek sistemde doğru cevaplar tarayıcıya hiç gönderilmez; puan sunucuda hesaplanır. |
| 4 | **Quiz sonucu** | Puan, kazanılan XP, Gece Saati'nin ne kadar ilerlediği, yeni rozetler ve her sorunun açıklaması. | Aynı quiz'i aynı puanla tekrar çözersen XP gelmez: XP yalnızca en iyi skorunu geçtiğin kadar verilir. |
| 5 | **Şehir Işıkları** | 81 ilin gece haritası. Öğrencileri öğrendikçe şehirler daha parlak yanar; bir şehre dokununca o şehrin sıralaması açılır. | Sıralamalar her seferinde XP kayıtlarından yeniden hesaplanır; kopyalanmış bir puan tablosu yoktur. |
| 6 | **Rozetler** | Dokununca dönen 12 koleksiyon kartı, ikisi gizli. İpucu: "Gece Kuşu" gece yarısından sonra quiz çözenlere açılır. | Her rozet ayrı bir kural; yeni rozet eklemek mevcut koda dokunmayı gerektirmez. |
| 7 | **Gece Rehberi** | Öğrencinin durumuna göre üç kişisel öneri: sıradaki yıldız, yarım kalan ders, takımyıldızı tamamlama gibi. | Gerçek sistemde öneriyi Claude yazar ve her öneri doğrulanır. Demoda kural tabanlı rehber çalışır. |
| 8 | **Profil** | 30 günlük XP grafiği, son denemeler ve profil düzenleme. Üst bardaki güneş/ay düğmesi açık ve koyu tema arasında geçiş yapar. | Tema değişimi sayfayı yeniden yüklemeden, renk değişkenleriyle anında olur. |

## İki farklı deneyim

- **Deneyimli öğrenci:** Giriş ekranında **Demoyu keşfet**. Yolun yarısındaki bir öğrencinin ekranlarını görürsün.
- **Yeni öğrenci:** Sol menünün altındaki çıkış düğmesinden çık, giriş ekranında **Profil oluştur**'a bas.
  Saat 17:00'de, karanlık bir gökyüzüyle başlarsın; ilk geçtiğin quiz sana "İlk Yıldız" rozetini kazandırır.
- **Baştan başlamak:** Profil sayfasındaki **Demoyu sıfırla** düğmesi her şeyi ilk hâline döndürür.

## Roller hakkında

SkillHub'da tek bir kullanıcı rolü var: **öğrenci**. Yönetici paneli bilinçli olarak yok. Ders içerikleri,
kodla birlikte sürümlenen veritabanı dosyalarından geliyor; böylece her içerik değişikliği gözden geçirilebiliyor
ve gerekirse geri alınabiliyor. İçerik yönetimi paneli [yol haritamda](12-sorular-ve-sinirlar.md#yol-haritası).

## Bu demo gerçek sistemin kendisi mi?

Canlı demo, arayüzün tarayıcıda çalışan bir sürümü. Gerçek sistem bir Java (Spring Boot) API'si ve PostgreSQL
veritabanıyla çalışıyor. Bir sunucuyu ve veritabanını sürekli açık tutmak para gerektirdiği için, herkesin
projeyi her an deneyebilmesi adına bu demo modunu ayrıca kurdum. Demo, gerçek API ile birebir aynı istek ve
cevap biçimini kullanıyor; ekranlar iki modda da aynı kod. Ayrıntısı: [Yayın stratejisi](09-yayin-stratejisi.md).

Demo ile gerçek sistem arasındaki farklar:

- Demoda bütün dersler açık. Gerçek sistemde ön koşulu bitmemiş ders kilitli kalır; sunucu kilitli bir dersin
  quiz'ine erişimi reddeder.
- Demoda Gece Rehberi kural tabanlı çalışır. Gerçek sistemde bir API anahtarı tanımlıysa önerileri Claude üretir.
- Demodaki diğer öğrenciler sabit kurgusal profiller. Gerçek sistemde 30 kurgusal öğrencinin geçmişi, gerçek
  quiz servisinden geçirilerek üretilir.

Gerçek sistemi kendi bilgisayarında tek komutla çalıştırmak için: [Çalıştırma ve API](10-calistirma-ve-api.md).
