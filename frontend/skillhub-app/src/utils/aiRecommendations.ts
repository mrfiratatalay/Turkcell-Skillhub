import { LessonDTO, CategoryDTO } from '../types';

export interface AIRecommendation {
  type: 'lesson' | 'category' | 'skill_boost' | 'achievement';
  title: string;
  description: string;
  action?: string;
  lessonId?: string;
  categoryId?: string;
  icon: string;
  priority: number; // 1-5 (5 en önemli)
}

interface RecommendationContext {
  skillLevel: string;
  totalPoints: number;
  completedLessons: number;
  quizSuccessRate: number;
  recentCategories: string[];
  badgeCount: number;
}

/**
 * MOCK AI RECOMMENDATION ENGINE
 * Kullanıcı verilerine göre akıllı öneriler üretir
 */
export class AIRecommendationEngine {
  /**
   * Ana öneri fonksiyonu
   */
  static generateRecommendations(
    context: RecommendationContext,
    allLessons: LessonDTO[],
    allCategories: CategoryDTO[],
    completedLessonIds: string[]
  ): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];

    // 1. Skill level bazlı öneri
    recommendations.push(...this.getSkillLevelRecommendations(context, allLessons, completedLessonIds));

    // 2. Kategori bazlı öneri
    recommendations.push(...this.getCategoryRecommendations(context, allCategories, allLessons, completedLessonIds));

    // 3. Performans bazlı öneri
    recommendations.push(...this.getPerformanceRecommendations(context));

    // 4. Motivasyon ve achievement önerileri
    recommendations.push(...this.getMotivationRecommendations(context));

    // Prioritize ve top 4 al
    return recommendations
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 4);
  }

  /**
   * Skill level'a göre ders önerileri
   */
  private static getSkillLevelRecommendations(
    context: RecommendationContext,
    allLessons: LessonDTO[],
    completedLessonIds: string[]
  ): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];
    const uncompletedLessons = allLessons.filter(l => !completedLessonIds.includes(l.lessonId));

    // Skill level'a uygun zorluk seviyesi belirle
    const targetDifficulty = this.getTargetDifficulty(context.skillLevel);
    
    // En uygun dersi bul
    const recommendedLesson = uncompletedLessons.find(l => l.difficulty === targetDifficulty);

    if (recommendedLesson) {
      recommendations.push({
        type: 'lesson',
        title: `📚 ${recommendedLesson.title}`,
        description: `Seviyene uygun bu dersi tamamlayarak becerilerini geliştirebilirsin!`,
        action: 'Derse Başla',
        lessonId: recommendedLesson.lessonId,
        icon: '🎯',
        priority: 5,
      });
    }

    return recommendations;
  }

  /**
   * Kategori bazlı akıllı öneriler
   */
  private static getCategoryRecommendations(
    context: RecommendationContext,
    allCategories: CategoryDTO[],
    allLessons: LessonDTO[],
    completedLessonIds: string[]
  ): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];

    // Kullanıcının henüz denemediği kategorileri bul
    const completedCategoryIds = new Set(
      allLessons
        .filter(l => completedLessonIds.includes(l.lessonId))
        .map(l => l.categoryId)
    );

    const unexploredCategories = allCategories.filter(
      c => !completedCategoryIds.has(c.categoryId)
    );

    // İlk keşfedilmemiş kategoriyi öner
    if (unexploredCategories.length > 0) {
      const category = unexploredCategories[0];
      recommendations.push({
        type: 'category',
        title: `🚀 ${category.name} Keşfet`,
        description: `Yeni bir alana adım at! ${category.description}`,
        action: 'Kategoriye Git',
        categoryId: category.categoryId,
        icon: '🌟',
        priority: 4,
      });
    }

    // Eğer bir kategoride başladıysa, onu tamamlamasını öner
    const partialCategories = Array.from(completedCategoryIds).filter(catId => {
      const categoryLessons = allLessons.filter(l => l.categoryId === catId);
      const completedInCategory = categoryLessons.filter(l => completedLessonIds.includes(l.lessonId)).length;
      return completedInCategory > 0 && completedInCategory < categoryLessons.length;
    });

    if (partialCategories.length > 0) {
      const category = allCategories.find(c => c.categoryId === partialCategories[0]);
      if (category) {
        recommendations.push({
          type: 'category',
          title: `⚡ ${category.name} Tamamla`,
          description: 'Bu kategoride başladın! Şimdi tamamlama zamanı.',
          action: 'Devam Et',
          categoryId: category.categoryId,
          icon: '🔥',
          priority: 5,
        });
      }
    }

    return recommendations;
  }

  /**
   * Performans bazlı öneriler
   */
  private static getPerformanceRecommendations(context: RecommendationContext): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];

    // Düşük quiz başarı oranı
    if (context.quizSuccessRate < 60 && context.completedLessons > 2) {
      recommendations.push({
        type: 'skill_boost',
        title: '💪 Pratik Zamanı',
        description: 'Quiz başarı oranını yükseltmek için daha fazla pratik yapmalısın!',
        action: 'Dersleri Gözden Geçir',
        icon: '📖',
        priority: 4,
      });
    }

    // Yüksek başarı oranı - seviye atlat
    if (context.quizSuccessRate >= 85 && context.skillLevel === 'beginner') {
      recommendations.push({
        type: 'skill_boost',
        title: '🎓 Seviye Atla',
        description: 'Harika performans! Intermediate seviye derslere geçebilirsin.',
        icon: '⬆️',
        priority: 5,
      });
    }

    if (context.quizSuccessRate >= 90 && context.skillLevel === 'intermediate') {
      recommendations.push({
        type: 'skill_boost',
        title: '🏆 Uzman Ol',
        description: 'Mükemmel! Advanced seviye derslerle kendini zorla.',
        icon: '🌟',
        priority: 5,
      });
    }

    return recommendations;
  }

  /**
   * Motivasyon ve başarı önerileri
   */
  private static getMotivationRecommendations(context: RecommendationContext): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];

    // İlk ders sonrası motivasyon
    if (context.completedLessons === 1) {
      recommendations.push({
        type: 'achievement',
        title: '🎉 Harika Başlangıç!',
        description: 'İlk dersini tamamladın! Momentum kaybetme, devam et.',
        icon: '🚀',
        priority: 4,
      });
    }

    // Rozet yaklaşımı (3 ders = motivasyon rozeti)
    if (context.completedLessons === 2 && context.badgeCount === 0) {
      recommendations.push({
        type: 'achievement',
        title: '🏅 Rozete Çok Yakınsın!',
        description: 'Bir ders daha tamamla ve ilk rozetini kazan! 🎯',
        icon: '⭐',
        priority: 5,
      });
    }

    // 10 quiz = uzman rozeti yaklaşımı
    if (context.completedLessons >= 8 && context.completedLessons < 10 && context.quizSuccessRate >= 80) {
      recommendations.push({
        type: 'achievement',
        title: '👑 Uzman Rozeti Yakın!',
        description: `${10 - context.completedLessons} quiz daha ve Uzman rozeti seninki!`,
        icon: '🎖️',
        priority: 5,
      });
    }

    // Liderlik tablosu teşviki
    if (context.totalPoints >= 200 && context.totalPoints < 500) {
      recommendations.push({
        type: 'achievement',
        title: '📊 Liderlik Tablosuna Yakınsın',
        description: 'Daha fazla quiz çözerek sıralamada yüksel!',
        action: 'Liderlik Tablosu',
        icon: '🏆',
        priority: 3,
      });
    }

    // Hiç ders tamamlanmadıysa
    if (context.completedLessons === 0) {
      recommendations.push({
        type: 'lesson',
        title: '👋 Hoş Geldin!',
        description: 'İlk dersine başlayarak yolculuğuna başla!',
        action: 'Derslere Göz At',
        icon: '🎯',
        priority: 5,
      });
    }

    return recommendations;
  }

  /**
   * Skill level'a göre hedef zorluk seviyesi
   */
  private static getTargetDifficulty(skillLevel: string): string {
    switch (skillLevel.toLowerCase()) {
      case 'beginner':
        return 'beginner';
      case 'intermediate':
        return 'intermediate';
      case 'advanced':
        return 'advanced';
      default:
        return 'beginner';
    }
  }

  /**
   * Önerilere uygun aksiyon URL'i üret
   */
  static getActionUrl(recommendation: AIRecommendation): string {
    switch (recommendation.type) {
      case 'lesson':
        return recommendation.lessonId ? `/lessons/${recommendation.lessonId}` : '/lessons';
      case 'category':
        return '/lessons';
      case 'achievement':
        return recommendation.action === 'Liderlik Tablosu' ? '/leaderboard' : '/profile';
      case 'skill_boost':
        return '/lessons';
      default:
        return '/dashboard';
    }
  }
}

