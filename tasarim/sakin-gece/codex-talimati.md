# Sakin Gece — Codex için görsel üretim talimatı

Bu dosya Codex'in okuması için yazıldı. Amaç, SkillHub'ın mevcut ekranlarını **"Sakin Gece"** konseptiyle
yeniden çizen konsept görseller üretmek. Görseller beğenilirse tasarım birebir koda uygulanacak; bu yüzden
gerçekçi, uygulanabilir (React + Material UI ile kodlanabilir) ve beş görsel boyunca tutarlı olmalı.

## 1. Görev

- Sen ödüllü bir ürün tasarımcısısın. Görüntü üretme aracını kullanarak **1536×1024 PNG**, piksel netliğinde,
  yüksek kaliteli arayüz ekran görüntüleri üret.
- Her görsel için `mevcut/` klasöründen ilgili ekran görüntüsü ekte verilir. Bu görüntü **yalnızca düzen ve
  içerik referansıdır**. Renklerini, parıltılarını ve arka planını KOPYALAMA. Yerleşimi, bileşenleri ve
  metinleri koru; görsel dili aşağıdaki sisteme göre baştan çiz.
- Çıktıyı `yeni/` klasörüne, ilgili bölümde yazan dosya adıyla kaydet. Başka hiçbir dosyayı değiştirme.
- Düz, perspektifsiz bir ekran görüntüsü üret. Tarayıcı çerçevesi, cihaz, el, masa, filigran, açıklama
  etiketi ya da "önce/sonra" yazısı OLMASIN. Tek istisna Görsel 5.

## 2. Neden yeniden çiziyoruz

Mevcut tasarım estetik bulunuyor ama **lacivert kullanıcıyı boğuyor**:

- Zemin `#010D3C` neredeyse saf mavi (HSL doygunluğu %97). Aynı koyulukta rahat kullanılan arayüzler
  %30-45 doygunlukta (ör. `#15202B`, `#0F172A`).
- Zemin, kart dolgusu, kart kenarı, her kartın etrafındaki 24px mavi neon parıltı, kartın içindeki parıltı,
  ikincil yazı, sidebar ve scrollbar hep aynı mavi. Gözün dinleneceği nötr bir nokta yok.
- Her sayfanın arkasında binary (0/1) yağmuru akıyor, ders okurken bile.
- Her şey parladığı için hiçbir şey öne çıkmıyor; sarı ve neon değerini kaybediyor.

## 3. Konsept: "Sakin Gece"

- **Metafor:** Dışarısı gece, içerisi sıcak ve aydınlık bir oda. Uygulama sakin, sessiz bir odadır; gece
  gökyüzü yalnızca **pencerelerden** görünür: giriş ekranındaki Karadeniz görseli ve Gökyüzü Haritası kartı.
- **Code Night'ın ruhu lacivert değil, karanlıkta yanan ışıktır.** Lacivert sahne, sarı ve neon oyuncudur.
  Sahne sakinleşince oyuncular daha çok parlar.
- **Işık bir ödüldür:** Parıltı varsayılan değildir. Yalnızca kazanılmış ya da etkileşimdeki şeylerde yanar:
  yanan yıldız, aktif öğe, birincil buton, odak.
- **Şafak:** Ürünün hikâyesi "17:00'de başla, şafakta usta ol". Uygulama ekranlarının en alt kenarında,
  ufukta, zar zor fark edilen sıcak bir şafak ışığı vardır.
- **Hedef his:** Linear, Vercel, Raycast kalitesinde sakin ve premium; ama gece kimliği, altın vurgu ve
  "<" kod işaretiyle ilk bakışta tanınan bir Code Night ürünü.

## 4. Renk sistemi (hex değerlerini birebir kullan)

| Token | Hex | Nerede |
|---|---|---|
| Zemin | `#0D1222` | Uygulama arka planı. Mürekkep laciverti: lacivert ama griyle seyreltilmiş. Neredeyse düz. |
| Sidebar | `#0A0E1B` | Sol menü ve mobil alt menü. Zeminden bir tık koyu, düz, bulanıklık yok. |
| Yüzey | `#141B30` | Kartlar ve paneller. |
| Yükseltilmiş | `#1B2440` | Aktif menü satırı, chip'ler, ikon kutuları, seçili durumlar. |
| Input | `#11172A` | Form alanları. |
| Çizgi | `#232B42` | 1px kenarlıklar, ayırıcılar, progress izi. |
| Yazı 1 | `#EEF2FA` | Başlıklar ve ana metin (saf beyaz değil). |
| Yazı 2 | `#AEB6C8` | İkincil metin, menü öğeleri. |
| Yazı 3 | `#7D879E` | Meta bilgi, placeholder, mono üst başlıklar. |
| Altın (marka) | `#FDC40B` | TEK ana vurgu: birincil buton, aktif menü işareti, XP, yanan yıldızlar, başlıktaki vurgu kelimesi. |
| Neon (marka) | `#5CA3EE` | İkincil vurgu: bağlantılar, odak halkası, "Keşfe açık" öğeler, bilgi ikonları. Parlamaz. |
| Gece (marka) | `#010D3C` | YALNIZCA pencerelerin içinde: giriş görseli ve Gökyüzü Haritası'nın içi. |
| Şafak | `#FDC40B`, %5-7 opaklık | Ekranın en alt ~140px'inde, ortadan yayılan, zar zor fark edilen sıcak ışık. |

Oran: ekranın ~%60'ı zemin, ~%30'u yüzeyler, en fazla ~%10'u renkli vurgu.

## 5. Kurallar

**Parıltı**
- Kartlarda, inputlarda, chip'lerde ve sidebar'da dış ya da iç parıltı (glow) YOK. Mavi neon kenarlık YOK.
- İzin verilen ışıklar: Gökyüzü Haritası'ndaki yanan yıldızların küçük altın halesi, birincil altın butonun
  çok yumuşak gölgesi (altın, %18 opaklık) ve odaklanmış inputun ince neon halkası.
- Kartlarda derinlik: dolgu farkı + 1px çizgi + üst kenarda neredeyse görünmez beyaz iç parlama (%4).

**Atmosfer**
- Uygulama ekranlarında binary yağmuru YOK. Yalnızca zeminin üst %25'inde birkaç küçük, soluk (%20-30) yıldız.
- Arka planda büyük mavi radyal parıltı YOK.
- Gece gökyüzü yalnızca pencerelerde görünür.

**Bileşenler**
- Kart: `#141B30` dolgu, 1px `#232B42` kenarlık, 20px köşe.
- **Tamamlanmış ("Yandı") kart:** aynı kart + 1px altın kenarlık (%35 opaklık). Parıltı yok.
- Birincil buton: `#FDC40B` dolgu, `#0D1222` kalın yazı, 14px köşe.
- İkincil buton: şeffaf, 1px `#2C3654` kenarlık, `#EEF2FA` yazı.
- Input: `#11172A` dolgu, 1px `#262F48` kenarlık, 14px köşe, `#7D879E` placeholder.
- Chip "Yandı": altın yazı + altın tik ikonu, %12 altın dolgu, kenarlıksız.
- Chip "Keşfe açık": neon yazı + çizgi yıldız ikonu, %10 neon dolgu, kenarlıksız.
- Seviye chip'i (Başlangıç / Orta / İleri): `#1B2440` dolgu, `#AEB6C8` yazı.
- Seçili durum (filtre, sekme): `#1B2440` dolgu + altın ikon ya da 1px altın kenarlık (%45). Büyük altın dolgu
  yalnızca birincil butonda kullanılır.
- Progress: iz `#232B42`, dolgu altın, 6px kalınlık, yuvarlak uçlar.
- Aktif menü: `#1B2440` satır + solda 3px altın dikey çizgi + altın ikon + `#EEF2FA` yazı. Büyük altın blok YOK.
- Pasif menü: `#AEB6C8` ikon ve yazı.
- Üst bar: zemin rengi, altında 1px `#1A2135` çizgi.
- Avatar: `#24304F` daire, `#EEF2FA` baş harfler.
- İkonlar: yuvarlatılmış çizgi ikonlar (Material Symbols Rounded tarzı).

**Tipografi**
- Başlıklar: Outfit benzeri, geometrik, yuvarlak hatlı, çok kalın (800) sans-serif; harf arası hafif sıkı.
- Üst başlıklar: JetBrains Mono benzeri monospace, BÜYÜK HARF, geniş harf aralığı, `#7D879E`, başında altın
  "<" işareti. Örnek: "< GÖKYÜZÜ HARİTAN".
- Gövde metni 15-17px, ferah satır aralığı (1.6-1.7).

**Metin**
- Tüm arayüz metinleri Türkçe ve aşağıda yazıldığı gibi olsun. Türkçe karakterleri (ı, İ, ş, ğ, ü, ö, ç)
  doğru çiz. Uydurma metin, lorem ipsum ya da ekstra etiket ekleme. Küçük metinler bile okunaklı olsun.
- Logo: altın hilal ay ikonu + "<SkillHub" yazısı ("<Skill" beyaz, "Hub" altın).

## 6. Görseller

### Görsel 1 — Giriş, masaüstü → `yeni/01-giris.png`

Referans: `mevcut/01-giris.png`. İki kolonlu bölünmüş düzen korunur.

- **Sol %55 — pencere.** Referanstaki Karadeniz gece illüstrasyonu (yıldızlı gökyüzü, altın takımyıldız
  çizgileri, sahildeki sıcak şehir ışıkları, dağ siluetleri) korunur. Üstündeki koyu lacivert perde kalkar;
  yalnızca yazıların arkasında soldan sağa azalan hafif bir karartma kalır. Görselin kendi renkleri, özellikle
  sıcak şehir ışıkları nefes alsın. Görselin sağ kenarı ~80px boyunca yumuşakça sağ panele erir.
  - Sol üstte logo.
  - Sol alt blok: ince altın çerçeveli chip "🏆 Turkcell Code Night 2025 · Trabzon 1.si" (parıltısız);
    büyük başlık "Her ders bir yıldız." ("yıldız." altın); alt yazı "Gökyüzünü sen aydınlat. 17:00'de başla,
    şafakta usta ol."
  - Üç özellik, her biri neon çizgi ikonlu, parıltısız: "Gökyüzü Haritası" — "Her ders bir yıldız;
    bitirdikçe takımyıldızın yanar." / "Gece Saati" — "17:00'de başla, XP kazandıkça şafağa ilerle." /
    "Şehir Işıkları" — "Şehrin için öğren, Türkiye haritasında parla."
- **Sağ %45 — sıcak oda.** Düz `#0D1222`. Yağmur yok, parıltılı kart yok. Formun arkasında masa lambası ışığı
  gibi çok yumuşak, sıcak bir radyal ışık (altın, %5). Form kutusuz, doğrudan panelin üstünde, ~420px
  genişlikte, dikeyde ortalı:
  - Başlık "SkillHub'u keşfet"; alt yazı "Bir tıkla gökyüzüne katıl, tüm modülleri deneyimle."
  - Roket ikonlu altın birincil buton: "Demoyu keşfet"
  - Küçük `#AEB6C8` metin: "Kurgusal örnek verilerle keşfedersin. Yaptığın değişiklikler bu tarayıcıda saklanır."
  - Ortasında yazı olan ince ayırıcı: "ya da demo profiline giriş yap"
  - Input "E-posta"; input "Şifre" (sağında göz ikonu)
  - İkincil buton: "Demo profiline giriş yap"
  - Küçük mono `#7D879E` metin: "demo@skillhub.dev · gece2025"
  - "Kendi demo profilini ister misin? Profil oluştur" ("Profil oluştur" neon bağlantı)

### Görsel 2 — Gökyüzü paneli, masaüstü → `yeni/02-gokyuzu.png`

Referans: `mevcut/02-gokyuzu.png`. Giriş yapılmış ana ekran; yerleşim aynı kalır.

- **Sidebar** (sol, 272px, `#0A0E1B`, sağında 1px çizgi): üstte logo. Menü: "Gökyüzü" (aktif), "Dersler",
  "Gece Rehberi", "Şehir Işıkları", "Rozetler", "Profil". Altta küçük neon chip "Etkileşimli demo" ve
  `#7D879E` metin "Örnek veriler. İlerlemen bu tarayıcıda saklanır."; mini Gece Saati kartı (küçük halka
  içinde "22:35", yanında mono "GECE SAATİ", "Gece Çöktü", altın "638 XP"); en altta kullanıcı satırı: "DY"
  avatarı, "Deniz Yıldız", altında "Trabzon", sağda çıkış ikonu.
- **Üst bar:** menü ikon butonu ve "Gökyüzü" başlığı; sağda "🔥 3" chip'i, altın "638 XP" chip'i, "DY" avatarı.
- **Karşılama:** büyük "İyi akşamlar, Deniz" ("Deniz" altın); altında `#AEB6C8` "Gece Saati 22:35. 11 yıldız
  daha seni bekliyor."
- **Üst satır, solda geniş Gece Saati kartı:** halka saat (iz `#232B42`, altın yay ~%40 dolu, soluk tik
  noktaları), ortasında büyük "22:35" ve altında mono "GECE SAATİ". Halkanın sağında mono "SEVİYE 3/8", büyük
  "Gece Çöktü", "Gece 17:00'de başladı; senin saatin 22:35. Her XP saati ileri alır.", solda altın "638 XP",
  sağda "Sonraki seviyeye 62 XP", altın progress (~%90 dolu).
- **Üst satır, sağda 2×2 istatistik kartı:** "6/17 Yanan yıldız" (altın yıldız), "3 Günlük seri" (alev),
  "4/12 Rozet" (madalya), "#18 Sıralama" (kupa). İkonlar `#1B2440` yuvarlak kareler içinde.
- **"< GÖKYÜZÜ HARİTAN"** üst başlığı; sağında lejant: altın nokta "Yanan yıldız", beyaz nokta "Keşfe açık".
- **Gökyüzü Haritası kartı = pencere.** Ekranın tek gerçek gece alanı. İçi derin `#010D3C` gece, çok küçük
  yıldızlar, ortada hafif bir derinlik; 1px `#232B42` çerçeve, 20px köşe. Mono neon takımyıldız etiketleri
  "KOD AVCISI · 3/5" ve "SİNİR AĞI · 1/4". Yanan yıldızlar küçük altın haleli, dört köşeli altın yıldızlar;
  aralarında ince altın çizgiler: "Python ile İlk Adım", "Veri Yapıları ve Algor…", "Git ile Takım Çalışması",
  "Yapay Zekaya Giriş". Keşfe açık yıldızlar küçük, soğuk beyaz noktalar; aralarında kesik, soluk neon
  çizgiler: "REST API Tasarımı", "Temiz Kod ve SOLID", "Pandas ile Veri Analizi", "Makine Öğrenmesinin Te…",
  "Büyük Dil Modelleri ve…". Kartın alt kısmı ekranın alt kenarında kesilebilir.
- **Şafak:** ekranın en alt kenarında, ortadan yayılan, zar zor fark edilen sıcak altın ışık.

### Görsel 3 — Dersler, masaüstü → `yeni/03-dersler.png`

Referans: `mevcut/03-dersler.png`. Sidebar ve üst bar Görsel 2'deki gibi; aktif menü ve üst bar başlığı "Dersler".

- Başlık "Dersler ve yıldızlar" ("ve yıldızlar" altın); altında "17 ders, 4 takımyıldız. Kilidi açık her
  yıldız keşfini bekliyor; bitirdiklerin altın gibi parlar."
- Kategori filtre chip'leri: "Tüm gökyüzü" (seçili), "Yazılım Geliştirme · 3/5", "Yapay Zeka · 1/4",
  "Siber Güvenlik · 1/4", "Girişimcilik · 1/4"; her biri küçük çizgi ikonlu.
- Seviye sekmeleri "Hepsi" (seçili), "Başlangıç", "Orta", "İleri"; yanında geniş arama alanı, büyüteç ikonlu,
  placeholder "Ders ara: Python, güvenlik, pitch…"
- Bölüm başlığı: "<>" ikonu + "Yazılım Geliştirme", yanında mono "KOD AVCISI TAKIMYILDIZI"; sağda altın
  progress ve "3/5".
- 3 sütunlu kart ızgarası. Her kartta: üstte "<> Yazılım Geliştirme" etiketi ve sağda durum chip'i; kalın
  başlık; açıklama; meta satırı (saat ikonu süre, şimşek ikonu XP, "4 soru"); sağda seviye chip'i; altta
  "En iyi skorun" + yüzde + altın progress.
  1. "Python ile İlk Adım" — Yandı — "Değişkenler, veri tipleri, koşullar ve döngülerle ilk Python
     programlarını yaz." — 30 dk · 100 XP · 4 soru — Başlangıç — %100
  2. "Veri Yapıları ve Algoritmalar" — Yandı — "Doğru veri yapısını seçmeyi ve algoritmaları Big-O ile
     karşılaştırmayı öğren." — 45 dk · 150 XP · 4 soru — Orta — %75
  3. "Git ile Takım Çalışması" — Yandı — "Commit, branch, merge ve pull request akışıyla ekibinle aynı kod
     üzerinde çakışmadan çalış." — 25 dk · 100 XP · 4 soru — Başlangıç — %100
  4. "REST API Tasarımı" — Keşfe açık — "Kaynak odaklı URL'ler, doğru HTTP metotları ve durum kodlarıyla
     tutarlı API'ler tasarla." — 40 dk · 150 XP · 4 soru — Orta — %50
  5. "Temiz Kod ve SOLID" — Keşfe açık — "SOLID prensipleri ve temiz kod alışkanlıklarıyla büyüdükçe
     bozulmayan yazılımlar kur." — 45 dk · 200 XP · 4 soru — İleri
- Tamamlanmış ve keşfe açık kartların farkı yalnızca ince altın kenarlık ve chip'lerle anlaşılmalı;
  hiçbir kart parlamamalı. İkinci satır ekranın altında kesilebilir. En altta şafak ışığı.

### Görsel 4 — Ders detayı, masaüstü → `yeni/04-ders-detay.png`

Referans: `mevcut/04-ders-detay.png`. Okumaya odaklı, en sakin ekran. Sidebar ve üst bar Görsel 2'deki gibi;
aktif menü ve üst bar başlığı "Dersler".

- **Sol ana kolon:** neon "← Dersler" bağlantısı. Chip satırı: "<> Yazılım Geliştirme · Kod Avcısı",
  "Yandı" (altın), "Başlangıç", "30 dk", "100 XP". Büyük başlık "Python ile İlk Adım"; altında `#AEB6C8`
  "Değişkenler, veri tipleri, koşullar ve döngülerle ilk Python programlarını yaz."
- "< NELER ÖĞRENECEKSİN" kartı, iki sütun, altın tik daireli maddeler: "Değişken ve temel veri tiplerini
  kullanmak", "if/else ile karar yapıları kurmak", "for ve while döngüleriyle tekrar eden işleri
  otomatikleştirmek", "Fonksiyon tanımlayıp yeniden kullanmak".
- "< DERS NOTLARI" kartı, okuma için ferah, `#EEF2FA` metin, 17px, satır aralığı 1.7. Metindeki
  `yas = 21` ifadesi `#1B2440` zeminli mono kod etiketi olsun:
  - "Python, okunabilir sözdizimi sayesinde programlamaya başlamak için en sevilen dillerden biridir. Web
    geliştirmeden veri bilimine, otomasyondan yapay zekaya kadar pek çok alanda kullanılır."
  - "Bir değişken, bir değere verdiğin isimdir: yas = 21 dediğinde yas artık 21'i temsil eder. Python
    türleri kendisi çıkarır; int, float, str ve bool en sık kullanacağın temel tiplerdir."
- **Sağ kolon kartı** (tamamlandığı için 1px altın kenarlık, parıltısız): halka içinde "%100" ve altında mono
  "EN İYİ"; yanında "Yıldız yandı ✦", "4 soru · %70 ile geçersin · 1 deneme", altın "Tüm XP toplandı".
  Tam genişlikte, yenile ikonlu altın buton "Quiz'i tekrar çöz". Mono "< SONRAKİ YILDIZLAR" başlığı ve liste:
  "Veri Yapıları ve Algoritmalar" (Yandı), "Git ile Takım Çalışması" (Yandı), "Pandas ile Veri Analizi"
  (Keşfe açık). Altta küçük `#AEB6C8` metin "Demoda tüm ders ve quizler açık. İstediğin yıldızdan
  başlayabilirsin." ve en altta `#7D879E` "XP yalnızca en iyi skorunu geçtiğinde artar."
- En altta şafak ışığı.

### Görsel 5 — Mobil → `yeni/05-mobil.png`

Referans: `mevcut/05-mobil-giris.png` ve `mevcut/06-mobil-gokyuzu.png`. 1536×1024 sunum görseli: düz `#0A0E1B`
arka plan üzerinde yan yana duran iki modern akıllı telefon ekranı. İnce siyah çerçeve, dik, perspektifsiz.
Telefonların dışında hiçbir yazı yok.

- **Sol telefon — Giriş:** üstteki ~%40'ta Karadeniz gece görseli (hilal ay, altın takımyıldız, sahil
  ışıkları); üstünde logo, "🏆 Turkcell Code Night 2025 · Trabzon 1.si" chip'i ve "Her ders bir yıldız."
  başlığı ("yıldız." altın). Görsel aşağıda yumuşakça düz `#0D1222` panele erir. Panelde: "SkillHub'u keşfet",
  "Bir tıkla gökyüzüne katıl, tüm modülleri deneyimle.", altın "Demoyu keşfet" butonu, "ya da demo profiline
  giriş yap" ayırıcısı, "E-posta" ve "Şifre" inputları.
- **Sağ telefon — Gökyüzü:** üst bar (menü ikonu, logo, "DY" avatarı); "İyi akşamlar, Deniz" ("Deniz" altın);
  "Gece Saati 22:35. 11 yıldız daha seni bekliyor."; Gece Saati kartı (halka saat "22:35", mono "GECE SAATİ",
  "SEVİYE 3/8", "Gece Çöktü", altın "638 XP", altın progress); altında iki istatistik kartı: "6/17 Yanan
  yıldız", "3 Günlük seri". En altta `#0A0E1B` alt menü: "Gökyüzü" (aktif, altın ikon ve yazı), "Dersler",
  "Rehber", "Işıklar", "Rozetler". Alt menünün hemen üstünde zar zor fark edilen şafak ışığı.

## 7. Kaydetmeden önce kontrol et

Görseli kaydettikten sonra aç ve aşağıdakileri kontrol et. Ciddi bir sapma varsa en fazla bir kez yeniden üret.

1. Zemin mürekkep laciverti (`#0D1222`) mi? Parlak kraliyet mavisi de, gri-siyah da olmamalı.
2. Kartların etrafında mavi neon parıltı ya da mavi kenarlık var mı? Olmamalı.
3. Renkli vurgu (altın + neon) ekranın ~%10'unu geçiyor mu? Geçmemeli.
4. Gece gökyüzü yalnızca pencerelerde mi görünüyor?
5. Türkçe metinler doğru ve okunaklı mı? Uydurma metin var mı?
6. Yerleşim, referans ekran görüntüsüyle aynı mı?
