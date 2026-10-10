// Girişimcilik lessons (Roket constellation).
import type { DemoLessonDetails } from '../types';

export const GIRISIMCILIK_LESSONS: readonly DemoLessonDetails[] = [
  {
    "id": 14, "slug": "fikirden-urune", "categoryId": 4,
    "title": "Fikirden Ürüne: Girişimciliğe Giriş",
    "summary": "İyi bir girişimin çözümle değil problemle başladığını; müşteriyi tanımanın ve doğrulamanın önemini öğren.",
    "objectives": [
      "Problem ile çözümü ayırt etmek",
      "Hedef müşteri kitlesini tanımlamak",
      "Müşteri görüşmeleriyle fikri doğrulamak",
      "Değer önerisini tek cümleyle ifade etmek"
    ],
    "paragraphs": [
      "Başarılı girişimlerin çoğu parlak bir çözümle değil, gerçek ve can yakan bir problemle başlar. Kendine sorman gereken ilk soru şudur: Bu problemi kim, ne sıklıkla ve ne kadar şiddetli yaşıyor?",
      "Fikrini doğrulamanın en ucuz yolu potansiyel müşterilerle konuşmaktır. Onlara fikrini satmaya çalışma; problemi nasıl yaşadıklarını ve bugün nasıl çözdüklerini dinle. İnsanların ne dediği değil, ne yaptığı daha çok şey anlatır.",
      "Değer önerisi, ürününün kime, hangi problemi, nasıl çözdüğünü tek cümlede anlatır. Örneğin: \"SkillHub, dijital beceri öğrenmek isteyen gençlere ilerlemelerini bir gece gökyüzü gibi görünür kılarak motivasyon sağlar.\""
    ],
    "videoId": null, "difficulty": "BEGINNER", "durationMin": 25, "xpReward": 100, "starX": 610, "starY": 470,
    "sortOrder": 1, "categorySlug": "girisimcilik", "prerequisiteIds": [], "prerequisiteSlugs": [], "x": 610,
    "y": 470
  },
  {
    "id": 15, "slug": "lean-startup-ve-mvp", "categoryId": 4, "title": "Lean Startup ve MVP",
    "summary": "Kur-Ölç-Öğren döngüsüyle en küçük işe yarar ürünü çıkar, veriye göre pivot ya da devam kararı ver.",
    "objectives": [
      "Kur-Ölç-Öğren döngüsünü uygulamak",
      "Bir MVP'nin kapsamını belirlemek",
      "Gösteriş metrikleriyle eyleme dönük metrikleri ayırt etmek",
      "Pivot kararının ne zaman gerektiğini anlamak"
    ],
    "paragraphs": [
      "Lean Startup yaklaşımı, belirsizlik altında ürün geliştirmeyi bir öğrenme süreci olarak görür. Kur-Ölç-Öğren döngüsünde amaç, en kısa sürede gerçek kullanıcıdan geri bildirim almaktır.",
      "MVP (Minimum Viable Product), en kritik varsayımını test etmeni sağlayan en küçük üründür. Bir gecede çıkarılan bir yarışma prototipi de aslında bir MVP'dir: Fikrin işe yarayıp yaramadığını hızlıca gösterir.",
      "Ölçerken gösteriş metriklerine (toplam indirme gibi) değil, eyleme dönük metriklere (haftalık aktif kullanıcı, tekrar kullanım oranı gibi) bak. Veriler varsayımını çürütüyorsa stratejiyi değiştirmek (pivot) başarısızlık değil, öğrenmenin sonucudur."
    ],
    "videoId": "fEvKo90qBns", "difficulty": "INTERMEDIATE", "durationMin": 35, "xpReward": 150, "starX": 720,
    "starY": 380, "sortOrder": 2, "categorySlug": "girisimcilik", "prerequisiteIds": [14],
    "prerequisiteSlugs": ["fikirden-urune"], "x": 720, "y": 380
  },
  {
    "id": 16, "slug": "is-modeli-kanvasi", "categoryId": 4, "title": "İş Modeli Kanvası",
    "summary": "Dokuz yapı taşıyla bir işin nasıl değer ürettiğini, sunduğunu ve para kazandığını tek sayfada gör.",
    "objectives": [
      "Kanvasın dokuz yapı taşını tanımak",
      "Müşteri segmentleri ile değer önerisini eşleştirmek",
      "Gelir modellerini karşılaştırmak",
      "Maliyet yapısını ve kilit ortaklıkları belirlemek"
    ],
    "paragraphs": [
      "İş Modeli Kanvası, bir işin tüm mantığını tek sayfada gösteren görsel bir araçtır. Dokuz yapı taşından oluşur: Müşteri segmentleri, değer önerisi, kanallar, müşteri ilişkileri, gelir akışları, kilit kaynaklar, kilit aktiviteler, kilit ortaklıklar ve maliyet yapısı.",
      "Kanvasın kalbinde değer önerisi ile müşteri segmentlerinin uyumu vardır. Kime hizmet ettiğini bilmeden neyi sunacağını, hangi kanaldan ulaşacağını ya da nasıl para kazanacağını doğru belirleyemezsin.",
      "Gelir akışları abonelik, tek seferlik satış, reklam veya freemium gibi modellerden oluşabilir. Kanvas bir kez doldurulup unutulan bir belge değildir; her müşteri görüşmesi ve deneyle güncellenen yaşayan bir taslaktır."
    ],
    "videoId": "QoAOzMTLP5s", "difficulty": "INTERMEDIATE", "durationMin": 30, "xpReward": 150, "starX": 730,
    "starY": 540, "sortOrder": 3, "categorySlug": "girisimcilik", "prerequisiteIds": [14],
    "prerequisiteSlugs": ["fikirden-urune"], "x": 730, "y": 540
  },
  {
    "id": 17, "slug": "pitch-sanati", "categoryId": 4, "title": "Pitch: Fikrini Anlatma Sanatı",
    "summary": "Problemi, çözümü ve ekibi birkaç dakikada akılda kalıcı bir hikâyeye dönüştür; jüriyi ikna et.",
    "objectives": [
      "Etkili bir pitch'in yapısını kurmak",
      "Problemi bir hikâyeyle anlatmak",
      "Demo ile çözümü somutlaştırmak",
      "Zor sorulara hazırlıklı olmak"
    ],
    "paragraphs": [
      "Pitch, fikrini kısa sürede net ve ikna edici şekilde anlatma sanatıdır. Klasik bir yapı şöyledir: Problem, çözüm, demo, pazar, iş modeli, ekip ve talep (ne istiyorsun?).",
      "İnsanlar rakamları değil hikâyeleri hatırlar. Problemi yaşayan gerçek bir kişinin hikâyesiyle başlamak dinleyiciyi hemen içine çeker. Ardından canlı bir demo, çözümünün çalıştığını tüm slaytlardan daha iyi kanıtlar.",
      "Code Night gibi yarışmalarda jüri birkaç dakika içinde karar verir; bu yüzden prova etmek şarttır. Olası sorulara (rakipler, ölçeklenme, iş modeli) önceden cevap hazırlamak sahnedeki özgüvenini ikiye katlar."
    ],
    "videoId": "17XZGUX_9iM", "difficulty": "ADVANCED", "durationMin": 30, "xpReward": 200, "starX": 870,
    "starY": 460, "sortOrder": 4, "categorySlug": "girisimcilik", "prerequisiteIds": [15, 16],
    "prerequisiteSlugs": ["lean-startup-ve-mvp", "is-modeli-kanvasi"],
    "x": 870, "y": 460
  }
];
