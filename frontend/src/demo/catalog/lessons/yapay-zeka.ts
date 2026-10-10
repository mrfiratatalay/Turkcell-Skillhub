// Yapay Zeka lessons (Sinir Ağı constellation).
import type { DemoLessonDetails } from '../types';

export const YAPAY_ZEKA_LESSONS: readonly DemoLessonDetails[] = [
  {
    "id": 6, "slug": "yapay-zekaya-giris", "categoryId": 2, "title": "Yapay Zekaya Giriş",
    "summary": "Yapay zeka, makine öğrenmesi ve derin öğrenme arasındaki farkı kullanım alanlarıyla öğren.",
    "objectives": [
      "Yapay zeka, makine öğrenmesi ve derin öğrenmeyi ayırt etmek",
      "Denetimli ve denetimsiz öğrenmeyi tanımak",
      "Eğitim ve test verisinin rolünü kavramak",
      "Yapay zekanın etik sorumluluklarını tartışmak"
    ],
    "paragraphs": [
      "Yapay zeka, insan zekası gerektiren görevleri yerine getirebilen sistemlerin genel adıdır. Makine öğrenmesi bu alanın bir alt kümesidir: Kuralları tek tek yazmak yerine sistemin örneklerden öğrenmesini sağlar. Derin öğrenme ise çok katmanlı yapay sinir ağlarıyla çalışan bir makine öğrenmesi yaklaşımıdır.",
      "Denetimli öğrenmede model, doğru cevapları (etiketleri) bilinen örneklerden öğrenir; e-postaların spam olup olmadığını tahmin etmek gibi. Denetimsiz öğrenmede etiket yoktur; model verideki gizli grupları ve örüntüleri kendisi bulur.",
      "Bir modelin gerçekten öğrenip öğrenmediğini anlamak için veri eğitim ve test olarak ayrılır. Model eğitim verisini ezberleyip yeni veride başarısız oluyorsa buna aşırı öğrenme (overfitting) denir. Verinin ve modellerin önyargı taşıyabileceğini unutmamak da sorumlu yapay zekanın parçasıdır."
    ],
    "videoId": "aircAruvnKk", "difficulty": "BEGINNER", "durationMin": 30, "xpReward": 100, "starX": 600,
    "starY": 200, "sortOrder": 1, "categorySlug": "yapay-zeka", "prerequisiteIds": [], "prerequisiteSlugs": [],
    "x": 600, "y": 200
  },
  {
    "id": 7, "slug": "pandas-ile-veri-analizi", "categoryId": 2, "title": "Pandas ile Veri Analizi",
    "summary": "DataFrame'lerle veri yükle, temizle, filtrele ve grupla; ham veriden içgörü çıkar.",
    "objectives": [
      "CSV dosyalarını DataFrame olarak yüklemek",
      "Eksik verileri bulmak ve temizlemek",
      "Filtreleme ve sıralama yapmak",
      "groupby ile özet istatistikler çıkarmak"
    ],
    "paragraphs": [
      "Pandas, Python'un veri analizi kütüphanesidir. Temel yapısı DataFrame, satır ve sütunlardan oluşan bir tabloya benzer: pd.read_csv('veri.csv') ile bir dosyayı saniyeler içinde analiz edilebilir hâle getirirsin.",
      "Gerçek veri neredeyse hiç temiz değildir. isna() ile eksik değerleri bulur, dropna() ile atar ya da fillna() ile doldurursun. Koşullu filtreleme (df[df['puan'] > 80]) ve sıralama (sort_values) veriyi anlamanın ilk adımlarıdır.",
      "groupby, veriyi bir sütuna göre gruplayıp her grup için özet çıkarmanı sağlar: Şehir bazında ortalama puan gibi. Bu projedeki Şehir Işıkları sıralaması da aynı fikrin SQL'deki karşılığıyla hesaplanıyor."
    ],
    "videoId": "ZyhVh-qRZPA", "difficulty": "INTERMEDIATE", "durationMin": 40, "xpReward": 150, "starX": 700,
    "starY": 110, "sortOrder": 2, "categorySlug": "yapay-zeka", "prerequisiteIds": [6, 1],
    "prerequisiteSlugs": ["yapay-zekaya-giris", "python-ile-ilk-adim"],
    "x": 700, "y": 110
  },
  {
    "id": 8, "slug": "makine-ogrenmesinin-temelleri", "categoryId": 2, "title": "Makine Öğrenmesinin Temelleri",
    "summary": "Regresyon ve sınıflandırmayı tanı; bir modeli eğit, değerlendir ve doğru metriği seç.",
    "objectives": [
      "Regresyon ile sınıflandırmayı ayırt etmek",
      "Veriyi eğitim ve test kümelerine ayırmak",
      "Doğruluk, kesinlik ve duyarlılık metriklerini yorumlamak",
      "Özellik (feature) seçiminin önemini kavramak"
    ],
    "paragraphs": [
      "Makine öğrenmesi problemleri çoğunlukla iki türdür: Regresyon sürekli bir değeri tahmin eder (ev fiyatı gibi), sınıflandırma ise bir kategori seçer (e-posta spam mı değil mi gibi).",
      "Tipik bir akışta veri eğitim ve test kümelerine ayrılır (örneğin %80/%20). Model eğitim kümesinde öğrenir, test kümesinde hiç görmediği verilerle sınanır. scikit-learn gibi kütüphaneler fit() ile eğitimi, predict() ile tahmini birkaç satıra indirir.",
      "Doğru metriği seçmek kritiktir. Dengesiz veride yalnızca doğruluğa (accuracy) bakmak yanıltıcı olabilir: Hastaların %1'inin hasta olduğu bir veri setinde herkese sağlıklı diyen model %99 doğruluk alır ama işe yaramaz. Bu yüzden kesinlik (precision) ve duyarlılık (recall) da incelenir."
    ],
    "videoId": "ukzFI9rgwfU", "difficulty": "INTERMEDIATE", "durationMin": 45, "xpReward": 150, "starX": 810,
    "starY": 190, "sortOrder": 3, "categorySlug": "yapay-zeka", "prerequisiteIds": [7],
    "prerequisiteSlugs": ["pandas-ile-veri-analizi"],
    "x": 810, "y": 190
  },
  {
    "id": 9, "slug": "buyuk-dil-modelleri", "categoryId": 2,
    "title": "Büyük Dil Modelleri ve Prompt Mühendisliği",
    "summary": "Büyük dil modellerinin nasıl çalıştığını, token kavramını ve etkili prompt tekniklerini öğren.",
    "objectives": [
      "Token ve bağlam penceresi kavramlarını anlamak",
      "Net görev tanımı ve örneklerle (few-shot) prompt yazmak",
      "Halüsinasyon riskini azaltmak",
      "LLM'leri uygulamalara güvenle entegre etmek"
    ],
    "paragraphs": [
      "Büyük dil modelleri (LLM), devasa metin verileriyle eğitilmiş ve bir sonraki parçayı (token) tahmin ederek metin üreten modellerdir. Modelin aynı anda dikkate alabildiği metin miktarına bağlam penceresi (context window) denir.",
      "İyi bir prompt; rolü, görevi, kısıtları ve beklenen çıktı formatını net söyler. Birkaç örnek vermek (few-shot) modelin istediğin kalıbı yakalamasını kolaylaştırır. Karmaşık görevlerde modelden adım adım düşünmesini istemek sonuç kalitesini artırabilir.",
      "LLM'ler kendinden emin ama yanlış bilgi üretebilir; buna halüsinasyon denir. Modeli doğrulanmış verilerle beslemek (RAG), çıktıyı yapılandırılmış bir formatta istemek ve sonucu kodla doğrulamak riski azaltır. Bu projedeki Gece Rehberi de modele yalnızca gerçek ilerleme verini verir ve cevabını doğrulamadan göstermez."
    ],
    "videoId": "LPZh9BOjkQs", "difficulty": "ADVANCED", "durationMin": 40, "xpReward": 200, "starX": 900,
    "starY": 90, "sortOrder": 4, "categorySlug": "yapay-zeka", "prerequisiteIds": [8],
    "prerequisiteSlugs": ["makine-ogrenmesinin-temelleri"],
    "x": 900, "y": 90
  }
];
