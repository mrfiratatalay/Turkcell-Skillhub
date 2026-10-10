// Yapay Zeka quiz questions; options keep the backend seed ids.
import type { DemoQuestion } from '../types';

export const YAPAY_ZEKA_QUESTIONS: readonly DemoQuestion[] = [
  {
    "id": 61, "lessonId": 6, "position": 1,
    "prompt": "Aşağıdakilerden hangisi doğrudur?",
    "explanation": "Derin öğrenme makine öğrenmesinin, makine öğrenmesi de yapay zekanın bir alt kümesidir.",
    "options": [
      { "id": 611, "position": 1, "label": "Derin öğrenme, yapay zekayı kapsar", "isCorrect": false },
      {
        "id": 612, "position": 2,
        "label": "Yapay zeka makine öğrenmesini, makine öğrenmesi de derin öğrenmeyi kapsar",
        "isCorrect": true
      },
      {
        "id": 613, "position": 3,
        "label": "Makine öğrenmesi ile yapay zeka birbirinden tamamen bağımsızdır",
        "isCorrect": false
      },
      { "id": 614, "position": 4, "label": "Derin öğrenme yalnızca robotikte kullanılır", "isCorrect": false }
    ],
    "correctOptionId": 612
  },
  {
    "id": 62, "lessonId": 6, "position": 2,
    "prompt": "Etiketli verilerle model eğitmeye ne ad verilir?",
    "explanation": "Denetimli öğrenmede her örneğin doğru cevabı (etiketi) bilinir.",
    "options": [
      { "id": 621, "position": 1, "label": "Denetimsiz öğrenme", "isCorrect": false },
      { "id": 622, "position": 2, "label": "Pekiştirmeli öğrenme", "isCorrect": false },
      { "id": 623, "position": 3, "label": "Kümeleme", "isCorrect": false },
      { "id": 624, "position": 4, "label": "Denetimli öğrenme", "isCorrect": true }
    ],
    "correctOptionId": 624
  },
  {
    "id": 63, "lessonId": 6, "position": 3,
    "prompt": "Model eğitim verisinde çok başarılı, yeni veride başarısızsa bu duruma ne denir?",
    "explanation": "Overfitting (aşırı öğrenme), modelin genellemek yerine eğitim verisini ezberlemesidir.",
    "options": [
      { "id": 631, "position": 1, "label": "Overfitting (aşırı öğrenme)", "isCorrect": true },
      { "id": 632, "position": 2, "label": "Underfitting (yetersiz öğrenme)", "isCorrect": false },
      { "id": 633, "position": 3, "label": "Normalizasyon", "isCorrect": false },
      { "id": 634, "position": 4, "label": "Veri artırma", "isCorrect": false }
    ],
    "correctOptionId": 631
  },
  {
    "id": 64, "lessonId": 6, "position": 4,
    "prompt": "Müşterileri, etiket olmadan benzer davranışlarına göre gruplamak hangi yöntemin örneğidir?",
    "explanation": "Kümeleme (clustering), etiketsiz veride benzer örnekleri gruplayan denetimsiz bir yöntemdir.",
    "options": [
      { "id": 641, "position": 1, "label": "Sınıflandırma", "isCorrect": false },
      { "id": 642, "position": 2, "label": "Regresyon", "isCorrect": false },
      { "id": 643, "position": 3, "label": "Kümeleme", "isCorrect": true },
      { "id": 644, "position": 4, "label": "Çeviri", "isCorrect": false }
    ],
    "correctOptionId": 643
  },
  {
    "id": 71, "lessonId": 7, "position": 1,
    "prompt": "Pandas'ta iki boyutlu, tablo benzeri temel veri yapısı hangisidir?",
    "explanation": "DataFrame satır ve sütunlardan oluşan iki boyutlu bir tablodur; Series ise tek bir sütun gibidir.",
    "options": [
      { "id": 711, "position": 1, "label": "Series", "isCorrect": false },
      { "id": 712, "position": 2, "label": "ndarray", "isCorrect": false },
      { "id": 713, "position": 3, "label": "DataFrame", "isCorrect": true },
      { "id": 714, "position": 4, "label": "Dictionary", "isCorrect": false }
    ],
    "correctOptionId": 713
  },
  {
    "id": 72, "lessonId": 7, "position": 2,
    "prompt": "Bir CSV dosyasını DataFrame olarak okumak için hangi fonksiyon kullanılır?",
    "explanation": "pd.read_csv('dosya.csv') dosyayı okuyup bir DataFrame döndürür.",
    "options": [
      { "id": 721, "position": 1, "label": "pd.read_csv()", "isCorrect": true },
      { "id": 722, "position": 2, "label": "pd.open_csv()", "isCorrect": false },
      { "id": 723, "position": 3, "label": "pd.load()", "isCorrect": false },
      { "id": 724, "position": 4, "label": "pd.csv()", "isCorrect": false }
    ],
    "correctOptionId": 721
  },
  {
    "id": 73, "lessonId": 7, "position": 3,
    "prompt": "Eksik değerleri tespit etmek için hangi metot kullanılır?",
    "explanation": "isna() her hücrenin eksik olup olmadığını döner; dropna() siler, fillna() doldurur.",
    "options": [
      { "id": 731, "position": 1, "label": "dropna()", "isCorrect": false },
      { "id": 732, "position": 2, "label": "fillna()", "isCorrect": false },
      { "id": 733, "position": 3, "label": "unique()", "isCorrect": false },
      { "id": 734, "position": 4, "label": "isna()", "isCorrect": true }
    ],
    "correctOptionId": 734
  },
  {
    "id": 74, "lessonId": 7, "position": 4,
    "prompt": "Puanların şehre göre ortalamasını almak için hangi ifade doğrudur?",
    "explanation": "groupby('sehir') veriyi şehre göre gruplar, ['puan'].mean() her grubun ortalamasını hesaplar.",
    "options": [
      { "id": 741, "position": 1, "label": "df.sort_values('sehir').mean()", "isCorrect": false },
      { "id": 742, "position": 2, "label": "df.groupby('sehir')['puan'].mean()", "isCorrect": true },
      { "id": 743, "position": 3, "label": "df.filter('sehir').avg()", "isCorrect": false },
      { "id": 744, "position": 4, "label": "df.pivot('sehir')", "isCorrect": false }
    ],
    "correctOptionId": 742
  },
  {
    "id": 81, "lessonId": 8, "position": 1,
    "prompt": "Bir evin fiyatını tahmin etmek hangi tür problemdir?",
    "explanation": "Fiyat sürekli bir değerdir; sürekli değer tahmini regresyon problemidir.",
    "options": [
      { "id": 811, "position": 1, "label": "Sınıflandırma", "isCorrect": false },
      { "id": 812, "position": 2, "label": "Kümeleme", "isCorrect": false },
      { "id": 813, "position": 3, "label": "Boyut indirgeme", "isCorrect": false },
      { "id": 814, "position": 4, "label": "Regresyon", "isCorrect": true }
    ],
    "correctOptionId": 814
  },
  {
    "id": 82, "lessonId": 8, "position": 2,
    "prompt": "Veriyi eğitim ve test kümelerine ayırmanın amacı nedir?",
    "explanation": "Test kümesi, modelin genelleme yeteneğini ölçmek için eğitimde kullanılmaz.",
    "options": [
      {
        "id": 821, "position": 1,
        "label": "Modelin hiç görmediği veride nasıl performans gösterdiğini ölçmek",
        "isCorrect": true
      },
      { "id": 822, "position": 2, "label": "Eğitimi hızlandırmak", "isCorrect": false },
      { "id": 823, "position": 3, "label": "Veriyi şifrelemek", "isCorrect": false },
      { "id": 824, "position": 4, "label": "Eksik verileri silmek", "isCorrect": false }
    ],
    "correctOptionId": 821
  },
  {
    "id": 83, "lessonId": 8, "position": 3,
    "prompt": "scikit-learn'de bir modeli eğitmek için hangi metot çağrılır?",
    "explanation": "scikit-learn modelleri fit(X, y) ile eğitilir, predict(X) ile tahmin yapar.",
    "options": [
      { "id": 831, "position": 1, "label": "train()", "isCorrect": false },
      { "id": 832, "position": 2, "label": "learn()", "isCorrect": false },
      { "id": 833, "position": 3, "label": "fit()", "isCorrect": true },
      { "id": 834, "position": 4, "label": "run()", "isCorrect": false }
    ],
    "correctOptionId": 833
  },
  {
    "id": 84, "lessonId": 8, "position": 4,
    "prompt": "Dengesiz bir veri setinde yalnızca doğruluk metriğine bakmak neden yanıltıcı olabilir?",
    "explanation": "Azınlık sınıfını hiç bulamayan bir model bile yüksek doğruluk alabilir; precision ve recall da incelenmelidir.",
    "options": [
      { "id": 841, "position": 1, "label": "Doğruluk her zaman %50 çıkar", "isCorrect": false },
      {
        "id": 842, "position": 2,
        "label": "Model yalnızca çoğunluk sınıfını tahmin ederek yüksek doğruluk alabilir",
        "isCorrect": true
      },
      { "id": 843, "position": 3, "label": "Doğruluk yalnızca regresyonda kullanılır", "isCorrect": false },
      { "id": 844, "position": 4, "label": "Doğruluk negatif olabilir", "isCorrect": false }
    ],
    "correctOptionId": 842
  },
  {
    "id": 91, "lessonId": 9, "position": 1,
    "prompt": "LLM'lerin metni işlerken kullandığı en küçük birime ne ad verilir?",
    "explanation": "Modeller metni token'lara böler; bir token bir kelime, kelime parçası veya noktalama olabilir.",
    "options": [
      { "id": 911, "position": 1, "label": "Piksel", "isCorrect": false },
      { "id": 912, "position": 2, "label": "Token", "isCorrect": true },
      { "id": 913, "position": 3, "label": "Bayt", "isCorrect": false },
      { "id": 914, "position": 4, "label": "Vektör", "isCorrect": false }
    ],
    "correctOptionId": 912
  },
  {
    "id": 92, "lessonId": 9, "position": 2,
    "prompt": "Prompt içinde modele birkaç örnek giriş-çıkış vermek hangi teknik olarak bilinir?",
    "explanation": "Few-shot prompting, istenen kalıbı örneklerle göstererek modelin doğru formatı yakalamasına yardım eder.",
    "options": [
      { "id": 921, "position": 1, "label": "Zero-shot", "isCorrect": false },
      { "id": 922, "position": 2, "label": "Fine-tuning", "isCorrect": false },
      { "id": 923, "position": 3, "label": "Few-shot", "isCorrect": true },
      { "id": 924, "position": 4, "label": "Tokenization", "isCorrect": false }
    ],
    "correctOptionId": 923
  },
  {
    "id": 93, "lessonId": 9, "position": 3,
    "prompt": "Modelin kendinden emin şekilde yanlış bilgi üretmesine ne denir?",
    "explanation": "Halüsinasyon, modelin dayanağı olmayan bilgiyi doğruymuş gibi üretmesidir.",
    "options": [
      { "id": 931, "position": 1, "label": "Halüsinasyon", "isCorrect": true },
      { "id": 932, "position": 2, "label": "Overfitting", "isCorrect": false },
      { "id": 933, "position": 3, "label": "Gradyan patlaması", "isCorrect": false },
      { "id": 934, "position": 4, "label": "Önbellekleme", "isCorrect": false }
    ],
    "correctOptionId": 931
  },
  {
    "id": 94, "lessonId": 9, "position": 4,
    "prompt": "Modeli harici, doğrulanmış belgelerle besleyerek cevap üretmesini sağlayan yaklaşım hangisidir?",
    "explanation": "RAG, ilgili belgeleri bulup prompt'a ekleyerek modelin doğrulanmış bilgiyle cevap vermesini sağlar.",
    "options": [
      { "id": 941, "position": 1, "label": "Dropout", "isCorrect": false },
      { "id": 942, "position": 2, "label": "Transfer öğrenme", "isCorrect": false },
      { "id": 943, "position": 3, "label": "Veri artırma", "isCorrect": false },
      { "id": 944, "position": 4, "label": "RAG (Retrieval-Augmented Generation)", "isCorrect": true }
    ],
    "correctOptionId": 944
  }
];
