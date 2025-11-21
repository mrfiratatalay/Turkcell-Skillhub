/**
 * Lesson Descriptions Map
 * Backend CSV'de description olmadığı için frontend'de tanımlıyoruz
 */

export const lessonDescriptions: Record<string, string> = {
  // Python Dersleri (C1)
  L1: 'Python programlama diline sıfırdan başlayın. Değişkenler, veri tipleri, koşullu ifadeler, döngüler ve fonksiyonlar gibi temel programlama kavramlarını pratik örneklerle öğrenin. Nesne yönelimli programlama temellerine giriş yaparak kodlama becerilerinizi geliştirin.',
  L5: 'İleri seviye Python konularını derinlemesine keşfedin. Dekoratörler, jeneratörler, context manager ve async programlama teknikleri ile profesyonel kod yazımını öğrenin. Design pattern\'ler ve best practice\'lerle yazılım geliştirme becerilerinizi bir üst seviyeye taşıyın.',
  L6: 'Django framework kullanarak tam kapsamlı web uygulamaları geliştirin. MVC mimarisi, ORM ile veritabanı yönetimi, RESTful API tasarımı ve deployment süreçlerini pratik projelerle öğrenin. Modern web teknolojileri ile güvenli ve ölçeklenebilir uygulamalar oluşturun.',

  // AI/ML Dersleri (C2)
  L2: 'Makine öğrenmesinin temel prensiplerini ve algoritmalarını öğrenin. Supervised ve unsupervised learning yöntemleri, model eğitimi, parametre optimizasyonu ve model değerlendirme teknikleri. Scikit-learn kütüphanesi ile gerçek veri setleri üzerinde çalışarak pratik deneyim kazanın.',
  L7: 'Derin öğrenme ve yapay sinir ağları teknolojilerini keşfedin. Neural network mimarileri, Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN) ve transfer learning teknikleri. TensorFlow ve Keras ile görüntü işleme ve NLP uygulamaları geliştirin.',
  L8: 'Pandas kütüphanesi ile profesyonel veri analizi yapın. DataFrame ve Series veri yapıları, veri temizleme, dönüştürme ve manipülasyon teknikleri. Matplotlib ve Seaborn ile veri görselleştirme yaparak anlamlı içgörüler elde edin. Gerçek dünya veri setleriyle çalışın.',

  // Siber Güvenlik Dersleri (C3)
  L3: 'Siber güvenliğin temel kavramlarını ve prensiplerinöğrenin. Güvenlik tehditleri, saldırı türleri ve savunma stratejileri. Güvenli yazılım geliştirme pratikleri, şifreleme teknikleri ve kimlik doğrulama mekanizmaları. Güncel güvenlik standartları ve compliance konularını keşfedin.',
  L9: 'Etik hackleme ve penetrasyon testi tekniklerini öğrenin. Zafiyet analizi, güvenlik açığı tarama ve exploitation teknikleri. Kali Linux ve popüler güvenlik araçları ile hands-on deneyim kazanın. Güvenlik raporlama ve remediation süreçlerini öğrenin.',
  L10: 'Ağ güvenliği konusunda uzmanlaşın. Firewall konfigürasyonu, IDS/IPS sistemleri, VPN teknolojileri ve güvenli ağ mimarisi tasarımı. Network monitoring, log analizi ve incident response süreçleri. Kurumsal düzeyde ağ güvenliği çözümleri geliştirin.',

  // Girişimcilik Dersleri (C4)
  L4: 'Startup ekosistemini tanıyın ve kendi girişiminizi kurmak için gerekli bilgileri edinin. İş fikri geliştirme, pazar araştırması, MVP (Minimum Viable Product) oluşturma ve yatırımcı bulma süreçleri. Pitch hazırlama, finansal planlama ve erken aşama büyüme stratejileri.',
  L11: 'Dijital pazarlama stratejileri ve modern marketing tekniklerini öğrenin. SEO optimizasyonu, Google Ads ve sosyal medya reklamcılığı. İçerik pazarlama, e-mail marketing ve influencer marketing stratejileri. Analytics ve veri odaklı karar verme süreçleri ile pazarlama ROI\'ınızı artırın.',
  L12: 'İş modeli tasarımı ve Business Model Canvas metodolojisi. Value proposition geliştirme, müşteri segmentleri belirleme, gelir modelleri ve maliyet yapısı optimizasyonu. Lean startup prensipleri ile iş modelinizi test edin ve pivot stratejileri geliştirin.',
};

/**
 * Ders ID'sine göre description döndürür
 * Eğer tanımlanmamışsa default açıklama döner
 */
export function getLessonDescription(lessonId: string, fallback?: string): string {
  return (
    lessonDescriptions[lessonId] ||
    fallback ||
    'Bu derste konuyla ilgili temel ve ileri düzey bilgileri öğreneceksiniz.'
  );
}

/**
 * Lesson title'dan kısa açıklama üretir (fallback)
 */
export function generateDescriptionFromTitle(title: string): string {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes('introduction') || lowerTitle.includes('basics') || lowerTitle.includes('fundamentals')) {
    return `${title} dersinde konunun temellerini ve pratik uygulamalarını öğreneceksiniz.`;
  }

  if (lowerTitle.includes('advanced')) {
    return `${title} dersinde ileri düzey teknikleri ve best practice'leri keşfedeceksiniz.`;
  }

  return `${title} dersinde konuyla ilgili detaylı bilgi ve uygulamalı örnekler bulacaksınız.`;
}

