# Oyun kuralları

SkillHub'ı oyun yapan kurallar backend'in `domain` katmanında, saf Java olarak duruyor. Hiçbiri Spring'i ya
da veritabanını bilmiyor; her biri bir dakikada okunacak kadar küçük. Bu dokümanda bu kuralları ve neden
böyle kurduğumu anlatıyorum.

## Quiz puanlama

Quiz'i getiren uç (`GET /lessons/{slug}/quiz`) soruları ve şıkları gönderiyor ama hangi şıkkın doğru olduğunu
asla göndermiyor; şık nesnesinde yalnızca `id` ve `label` var. Puanlama tamamen sunucuda,
[`QuizGrader`](../backend/src/main/java/com/skillhub/quiz/domain/QuizGrader.java) içinde yapılıyor.

`QuizGrader` puanlamadan önce cevap kâğıdını doğruluyor:

- Her soru cevaplanmış olmalı.
- Seçilen şık gerçekten o soruya ait olmalı (başka bir sorunun şık kimliğini göndermek işe yaramaz).
- Bir soruya iki cevap gönderilemez, quiz'de olmayan bir soruya cevap gönderilemez.

Kurallar ihlal edilirse anlaşılır bir Türkçe mesajla `400` dönüyor. Puan, doğru sayısının yüzdesi:
4 soruluk bir quiz'de 0, 25, 50, 75 ya da 100. Geçme sınırı **%70**; yani 4 sorudan en az 3'ünü bilmek
gerekiyor.

Cevaplar gönderildikten sonra sonuç ekranı her sorunun doğru şıkkını ve açıklamasını gösteriyor. Bu bir
öğrenme platformu; yanlışın neden yanlış olduğunu görmek işin özü.

## XP politikası: yalnızca gelişme ödüllendirilir

Hackathon sürümünde her quiz gönderimi yeniden puan veriyordu; aynı quiz'i tekrar tekrar çözen biri
sıralamanın tepesine çıkabiliyordu. v2'de XP yalnızca **en iyi skorunu geçtiğin kadar** veriliyor:

```java
public static int earned(int xpReward, Integer previousBestScore, int newScore) {
    int alreadyEarned = previousBestScore == null ? 0 : xpForScore(xpReward, previousBestScore);
    return Math.max(0, xpForScore(xpReward, newScore) - alreadyEarned);
}

static int xpForScore(int xpReward, int score) {
    return Math.round(xpReward * score / 100f);
}
```

100 XP değerindeki bir ders için:

| Deneme | Skor | Önceki en iyi | Kazanılan XP | Bu dersten toplam |
|---|---|---|---|---|
| 1 | %50 | yok | 50 | 50 |
| 2 | %50 | %50 | 0 | 50 |
| 3 | %75 | %50 | 25 | 75 |
| 4 | %100 | %75 | 25 | 100 |
| 5 | %100 | %100 | 0 | 100 |

İki sonucu var. Geçemesen bile emeğinin karşılığını alıyorsun; ama aynı emeği ikinci kez "satamıyorsun".
Bir dersten alınabilecek XP, dersin değerini asla geçemiyor. 17 dersin toplam değeri 2.500 XP.
Kod: [`XpPolicy`](../backend/src/main/java/com/skillhub/progress/domain/XpPolicy.java).

## Gece Saati: seviye sistemi

Code Night 17:00'de başlayıp 07:00'de bitti. Seviye sistemini bu 14 saate oturttum: her seviye gecenin iki
saati, XP kazandıkça saat ilerliyor.

| Seviye | Ad | Başladığı XP | Saat dilimi |
|---|---|---|---|
| 1 | Alacakaranlık | 0 | 17:00 – 19:00 |
| 2 | Akşam Yıldızı | 150 | 19:00 – 21:00 |
| 3 | Gece Çöktü | 400 | 21:00 – 23:00 |
| 4 | Gece Yarısına Doğru | 700 | 23:00 – 01:00 |
| 5 | Gece Yarısı Geçti | 1.050 | 01:00 – 03:00 |
| 6 | Derin Gece | 1.450 | 03:00 – 05:00 |
| 7 | Tan Ağarıyor | 1.900 | 05:00 – 07:00 |
| 8 | Şafak | 2.350 | 07:00 |

Seviyenin içinde saat, XP ile doğrusal ilerliyor. Örnek: 638 XP'lik bir öğrenci 3. seviyede (400–700). Seviyenin
%79'unu tamamlamış: 21:00 + 120 dakikanın %79'u = **22:35**. Demo profilinde gördüğün saat tam olarak bu.

Eşiklerin arası giderek açılıyor (150, 250, 300, 350, 400, 450, 450 XP). İlk seviyeler hızlı geliyor, çünkü
başta motivasyon önemli; sonrakiler sabır istiyor. Şafak için 2.500 XP'nin 2.350'si gerekiyor, yani neredeyse
her dersi yüksek skorla bitirmek. Gecenin sonunu görmek kolay olmamalı.

Saat hem backend'de ([`NightClock`](../backend/src/main/java/com/skillhub/progress/domain/NightClock.java)) hem
demo modunda aynı formülle hesaplanıyor. Quiz sonucu, saatin denemeden önceki ve sonraki hâlini birlikte
döndürüyor; arayüz seviye atlandığını buradan anlayıp kutluyor.

## Seriler

Bir gün içinde en az bir quiz çözdüysen o gün "aktif" sayılıyor; geçemediğin bir deneme de sayılıyor.
Seri, bugünden ya da dünden geriye doğru kesintisiz aktif günlerin sayısı. Yani bugün henüz çalışmadıysan
dünkü serin gece yarısına kadar yaşıyor; öğrenciye "serini koru" demek için zaman kalıyor. Günler İstanbul
saatine göre hesaplanıyor. Kod: [`Streak`](../backend/src/main/java/com/skillhub/progress/domain/Streak.java).

## Rozetler

| Rozet | Nasıl kazanılır | Seviye |
|---|---|---|
| İlk Yıldız | İlk dersini tamamla | Altın |
| Kusursuz Gece | Bir quiz'i %100 ile bitir | Altın |
| Alev Serisi | 3 gün üst üste quiz çöz | Altın |
| Kesintisiz Hafta | 7 gün üst üste quiz çöz | Neon |
| Meraklı Gezgin | 3 farklı takımyıldızdan ders tamamla | Neon |
| Azimli | Daha önce geçemediğin bir quiz'i geç | Neon |
| Gece Kuşu *(gizli)* | Gece 00:00 ile 05:00 arasında bir quiz tamamla | Neon |
| Kod Avcısı, Sinir Ağı, Kalkan, Roket | Bir takımyıldızın bütün derslerini tamamla | Altın |
| Şafak *(gizli)* | Gece Saati'nde 07:00'ye ulaş | Altın |

"Gece Kuşu" Code Night'ın sloganından geliyor: gerçek kodcu gece çalışır. Gizli rozetler kazanılana kadar
adlarını ve hikâyelerini saklıyor; API onları "Gizli Rozet" olarak döndürüyor, yalnızca ipucu görünüyor.

**Tasarım: Strategy deseni.** Her rozet [`BadgeRule`](../backend/src/main/java/com/skillhub/progress/domain/badge/BadgeRule.java)
arayüzünü uygulayan küçük bir sınıf:

```java
public interface BadgeRule {
    String code();
    boolean isEarned(BadgeContext context);
}
```

`BadgeContext` öğrencinin istatistiklerini, kataloğu ve rozeti tetikleyen denemeyi taşıyor.
[`BadgeService`](../backend/src/main/java/com/skillhub/progress/application/BadgeService.java) her denemeden
sonra kuralların üzerinden geçiyor, kazanılmamış ve koşulu sağlanmış rozetleri veriyor. Rozet listesi tek bir
yapılandırma sınıfında duruyor ([`BadgeRulesConfig`](../backend/src/main/java/com/skillhub/progress/infrastructure/BadgeRulesConfig.java)).
Bazı kurallar parametreli: aynı `DailyStreak` sınıfı 3 ve 7 günlük iki rozeti, aynı `Constellation` sınıfı
dört takımyıldız rozetini veriyor.

Yeni bir rozet eklemek üç adım: yeni bir kural sınıfı, listeye bir satır ve rozetin görünen bilgileri için
yeni bir migration. Değerlendiriciye ve mevcut kurallara dokunmak gerekmiyor; Açık/Kapalı ilkesinin kitaptaki
örneği gibi.

**Neden kurallar veritabanında değil?** Kural bir davranış: tipi, testi ve kod incelemesi olmalı. Veritabanı ise
oyuncunun gördüğü adı, açıklamayı ve ipucunu tutuyor. Metni değiştirmek için kod değiştirmek gerekmiyor, kuralı
değiştirmek için de veri.

## Kilitler ve açılan yıldızlar

[`LessonStatusPolicy`](../backend/src/main/java/com/skillhub/catalog/domain/LessonStatusPolicy.java) her ders
için üç durumdan birini hesaplıyor:

- **COMPLETED (yandı):** En iyi skor %70 ve üzeri.
- **AVAILABLE (keşfe açık):** Bütün ön koşulları tamamlanmış.
- **LOCKED (kilitli):** En az bir ön koşulu eksik.

Kilit yalnızca arayüzde gösterilen bir süs değil; sunucu da uyguluyor. Kilitli bir dersin quiz'ini getirmeye
ya da göndermeye çalışan istek `403 Bu yıldız henüz kilitli` cevabı alıyor. Ders kartı eksik ön koşulları,
ders sayfası da açılış yolunu gösteriyor.

Bir denemeden önce ve sonra öğrencinin kataloğunun bir fotoğrafı çekiliyor. Önce `LOCKED`, sonra `AVAILABLE`
olan dersler "yeni açılan yıldızlar" olarak sonuç ekranına geliyor.

## Bir denemenin tamamı

Bütün bu kurallar [`QuizService.submitAt`](../backend/src/main/java/com/skillhub/quiz/application/QuizService.java)
içinde, tek bir transaction'da bir araya geliyor:

1. Öğrencinin satırını kilitle; aynı öğrencinin eşzamanlı denemeleri sıraya girsin.
2. Ders bu öğrenci için açık mı, kontrol et.
3. Öğrencinin katalogdaki durumunun "önce" fotoğrafını çek.
4. Cevap kâğıdını doğrula ve puanla.
5. Denemeyi ve cevapları kaydet.
6. XP'yi hesapla; sıfırdan büyükse deftere yaz.
7. Rozet kurallarını çalıştır, yeni kazanılanları ver.
8. "Sonra" fotoğrafını çek, yeni açılan dersleri bul.
9. `AttemptCompleted` olayını yayınla (Gece Rehberi'nin önbelleği commit'ten sonra temizlenir).
10. Sonucu döndür: skor, kazanılan XP, Gece Saati'nin önceki ve sonraki hâli, seviye atlandı mı, yeni
    rozetler, açılan dersler ve her sorunun açıklaması.

Arayüz, tek bir istekle gelen bu cevaptan bütün kutlama ekranını kuruyor. Kilitleme ve transaction kararlarının
neden böyle olduğunu [Çözdüğüm problemler](11-cozdugum-problemler.md)'de anlattım.
