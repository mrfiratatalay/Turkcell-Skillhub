import { UserProgress, LessonDTO, CategoryDTO } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
// Gemini 2.5 Flash: En balanced model, 1M token context window
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Debug
console.log('🔧 Gemini API Config:', {
  hasKey: !!GEMINI_API_KEY,
  keyLength: GEMINI_API_KEY.length,
  model: GEMINI_MODEL,
  url: GEMINI_API_URL
});

export interface GeminiRecommendation {
  title: string;
  description: string;
  reason: string;
  priority: number;
  type: 'lesson' | 'category' | 'skill' | 'motivation';
}

/**
 * Gemini API ile AI destekli kişiselleştirilmiş öneri oluşturur
 */
export async function getGeminiRecommendations(
  userProgress: UserProgress,
  allLessons: LessonDTO[],
  allCategories: CategoryDTO[],
  completedLessonIds: string[]
): Promise<GeminiRecommendation[]> {
  // API key yoksa hata fırlat
  if (!GEMINI_API_KEY || GEMINI_API_KEY === '') {
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in .env file');
  }

  // Kullanıcı profili için özet hazırla
  const userProfile = {
    skillLevel: userProgress.user.skillLevel,
    totalPoints: userProgress.user.totalPoints,
    completedLessons: userProgress.completedLessons,
    totalLessons: userProgress.totalLessons,
    completionRate: userProgress.completionRate,
    averageScore: userProgress.averageScore,
    badgeCount: userProgress.badges.length,
    recentResults: userProgress.recentQuizResults.slice(0, 3).map(r => ({
      lessonId: r.lessonId,
      score: r.score,
    })),
  };

  // Tamamlanmamış dersler
  const availableLessons = allLessons
    .filter(l => !completedLessonIds.includes(l.lessonId))
    .map(l => ({
      id: l.lessonId,
      title: l.title,
      category: allCategories.find(c => c.categoryId === l.categoryId)?.name || 'Unknown',
      difficulty: l.difficulty,
      duration: l.durationMin,
    }));

  // ÇOK KISA prompt (token tasarrufu için)
  const prompt = `Kullanıcı: ${userProfile.skillLevel} seviye, ${userProfile.completedLessons}/${userProfile.totalLessons} ders tamamladı, %${userProfile.averageScore} başarı.

3 kişisel eğitim önerisi ver. Sadece JSON array döndür:
[{"title":"...","description":"...","reason":"...","priority":5,"type":"motivation"}]`;


  try {
    // Gemini API REST format (DÖKÜMAN: https://ai.google.dev/gemini-api/docs)
    console.log('🚀 Gemini API Request Starting...');
    console.log('  URL:', GEMINI_API_URL);
    console.log('  API Key:', GEMINI_API_KEY.substring(0, 15) + '...');
    
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'x-goog-api-key': GEMINI_API_KEY, // ✅ DÖKÜMAN: Header'da gönder!
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192, // ✅ Yükseltildi! (Gemini 2.5 Flash max: 8192)
          responseMimeType: 'application/json', // ✅ JSON formatı zorla
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Gemini API HTTP Error:', response.status, errorData);
      throw new Error(`Gemini API HTTP ${response.status}: ${errorData.substring(0, 200)}`);
    }

    const data = await response.json();
    console.log('📦 Gemini Full Response:', JSON.stringify(data, null, 2));
    
    // Gemini 2.5 Flash response formatı (döküman)
    const candidate = data.candidates?.[0];
    
    if (!candidate) {
      console.error('❌ No candidates in response');
      throw new Error('No candidates in Gemini response');
    }

    // Finish reason check
    if (candidate.finishReason === 'SAFETY') {
      console.error('❌ Response blocked by safety filters');
      throw new Error('Response blocked by Gemini safety filters');
    }

    if (candidate.finishReason === 'MAX_TOKENS') {
      console.error('❌ Response incomplete: MAX_TOKENS reached');
      throw new Error('Response incomplete: token limit reached');
    }

    const text = candidate.content?.parts?.[0]?.text;
    
    if (!text) {
      console.error('❌ No text in candidate:', candidate);
      throw new Error('No text in Gemini response');
    }

    console.log('📝 Gemini Raw Text:', text);

    // JSON parse et - Gemini farklı formatlarda dönebilir
    let cleanText = text.trim();
    
    // Markdown code block varsa temizle
    cleanText = cleanText.replace(/```json\s*/gi, '').replace(/```\s*/g, '');
    
    // Başta/sonda gereksiz karakterleri ve whitespace temizle
    cleanText = cleanText.trim();
    
    // Eğer array ile başlamıyorsa, array'i bul
    if (!cleanText.startsWith('[')) {
      const arrayMatch = cleanText.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        cleanText = arrayMatch[0];
      } else {
        console.error('❌ No JSON array found in text:', cleanText);
        throw new Error('No JSON array in Gemini response');
      }
    }

    console.log('🧹 Cleaned JSON:', cleanText);

    let recommendations: GeminiRecommendation[];
    try {
      recommendations = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      console.error('Failed to parse:', cleanText);
      throw new Error(`Failed to parse JSON: ${parseError}`);
    }

    // Validation
    if (!Array.isArray(recommendations)) {
      console.error('❌ Response is not an array:', recommendations);
      throw new Error('Gemini response is not an array');
    }

    if (recommendations.length === 0) {
      console.error('❌ Empty recommendations array');
      throw new Error('Gemini returned empty recommendations');
    }

    console.log('✅ Parsed Recommendations:', recommendations);
    return recommendations.slice(0, 4); // Max 4 öneri
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

/**
 * Mock öneriler (fallback için - Gemini API çalışmazsa)
 */
export function getMockRecommendations(
  userProgress: UserProgress,
  completedLessons: number
): GeminiRecommendation[] {
  const recommendations: GeminiRecommendation[] = [];

  // İlk giriş
  if (completedLessons === 0) {
    recommendations.push({
      title: '👋 Hoş Geldin!',
      description: 'İlk dersine başlayarak yolculuğuna başla',
      reason: 'Yeni başlangıçlar her zaman heyecan verici!',
      priority: 5,
      type: 'motivation',
    });
  }

  // Motivasyon rozeti yakın
  if (completedLessons > 0 && completedLessons < 3) {
    recommendations.push({
      title: '🎯 Motivasyon Rozetine Çok Yakınsın!',
      description: `${3 - completedLessons} ders daha ve ilk rozet seninki!`,
      reason: `Şu an ${completedLessons}/3 ders tamamladın`,
      priority: 5,
      type: 'motivation',
    });
  }

  // Seviye yükseltme önerisi
  if (userProgress.averageScore >= 80 && userProgress.user.skillLevel === 'beginner') {
    recommendations.push({
      title: '⚡ Intermediate Seviyeye Hazırsın',
      description: 'Quiz başarın %80 üzerinde, daha zorlayıcı derslere geç',
      reason: 'Performansın çok yüksek, kendini zorla',
      priority: 4,
      type: 'skill',
    });
  }

  // Uzman rozeti yakın
  if (completedLessons >= 8 && userProgress.averageScore >= 80) {
    recommendations.push({
      title: '👑 Uzman Rozeti İçin Son Spurt',
      description: '10 quiz %80+ başarı ile uzman rozeti kazanırsın',
      reason: `${completedLessons} quiz tamamladın, biraz daha!`,
      priority: 5,
      type: 'motivation',
    });
  }

  // Yeni kategori önerisi
  if (completedLessons > 0) {
    recommendations.push({
      title: '🚀 Yeni Kategori Keşfet',
      description: 'Farklı alanlarda becerini geliştirerek CV\'ni güçlendir',
      reason: 'Çeşitlilik iş dünyasında avantaj sağlar',
      priority: 3,
      type: 'category',
    });
  }

  // Düzenli çalışma teşviki
  if (completedLessons >= 3) {
    recommendations.push({
      title: '📚 Momentum Kaybetme',
      description: 'Düzenli çalışarak becerilerini kalıcı hale getir',
      reason: 'Harika bir ilerleme gösteriyorsun',
      priority: 3,
      type: 'motivation',
    });
  }

  return recommendations.slice(0, 4);
}

/**
 * AI Assistant için basitleştirilmiş API wrapper
 * Sadece userProgress ve lessons ile çağrılabilir
 */
export async function getAIRecommendations(
  userProgress: UserProgress,
  lessons: LessonDTO[]
): Promise<GeminiRecommendation[]> {
  console.log('🎯 getAIRecommendations (wrapper) çağrıldı');
  
  // Tamamlanmış ders ID'lerini çıkar
  const completedLessonIds = userProgress.recentQuizResults.map(r => r.lessonId);
  
  // Kategorileri lessons'dan çıkar (unique)
  const categories: CategoryDTO[] = Array.from(
    new Set(lessons.map(l => l.categoryId))
  ).map(id => ({
    categoryId: id,
    name: lessons.find(l => l.categoryId === id)?.title.split(' ')[0] || 'Genel',
    description: '',
  }));

  console.log('  - Completed Lesson IDs:', completedLessonIds);
  console.log('  - Categories:', categories.length);
  
  // Asıl Gemini fonksiyonunu çağır
  return getGeminiRecommendations(userProgress, lessons, categories, completedLessonIds);
}

