/**
 * Lesson Video URLs Map
 * Backend CSV'de videoUrl olmadığı için frontend'de tanımlıyoruz
 * YouTube embed formatı: https://www.youtube.com/embed/VIDEO_ID
 */

export const lessonVideos: Record<string, string> = {
  // Python Dersleri (C1) - Güncel ve Çalışan Videolar
  L1: 'https://www.youtube.com/embed/kqtD5dpn9C8', // Python for Beginners - Full Course
  L5: 'https://www.youtube.com/embed/HGOBQPFzWKo', // Advanced Python - Full Tutorial
  L6: 'https://www.youtube.com/embed/F5mRW0jo-U4', // Django Tutorial - Complete Course

  // AI/ML Dersleri (C2) - Güncel ve Çalışan Videolar
  L2: 'https://www.youtube.com/embed/ukzFI9rgwfU', // Machine Learning Course - Beginner to Advanced
  L7: 'https://www.youtube.com/embed/aircAruvnKk', // Neural Networks - 3Blue1Brown (Verified Working)
  L8: 'https://www.youtube.com/embed/ZyhVh-qRZPA', // Pandas Complete Tutorial - Full Course

  // Siber Güvenlik Dersleri (C3) - Güncel ve Çalışan Videolar
  L3: 'https://www.youtube.com/embed/U_P23SqJaDc', // Cybersecurity Full Course - Beginner to Expert
  L9: 'https://www.youtube.com/embed/2_lswM1S264', // Ethical Hacking Full Course - CompTIA PenTest+
  L10: 'https://www.youtube.com/embed/qiQR5rTSshw', // Network Security - Complete Guide

  // Girişimcilik Dersleri (C4) - Güncel ve Çalışan Videolar
  L4: 'https://www.youtube.com/embed/jVEtqGEEyY8', // How to Start a Startup - Y Combinator
  L11: 'https://www.youtube.com/embed/nU-IIXBWlS4', // Digital Marketing Course - Full Tutorial
  L12: 'https://www.youtube.com/embed/QoAOzMTLP5s', // Business Model Canvas Explained
};

/**
 * Ders ID'sine göre video URL döndürür
 * Eğer tanımlanmamışsa placeholder video döner
 */
export function getLessonVideo(lessonId: string, fallbackUrl?: string): string {
  return (
    lessonVideos[lessonId] ||
    fallbackUrl ||
    'https://www.youtube.com/embed/dQw4w9WgXcQ' // Placeholder video
  );
}

/**
 * Video URL'in geçerli olup olmadığını kontrol eder
 */
export function isValidVideoUrl(url: string | undefined): boolean {
  if (!url) return false;
  
  // YouTube embed URL pattern
  const youtubeEmbedPattern = /^https:\/\/www\.youtube\.com\/embed\/[\w-]+$/;
  
  // YouTube watch URL pattern (convert edilebilir)
  const youtubeWatchPattern = /^https:\/\/(www\.)?youtube\.com\/watch\?v=([\w-]+)$/;
  
  return youtubeEmbedPattern.test(url) || youtubeWatchPattern.test(url);
}

/**
 * YouTube watch URL'i embed formatına çevirir
 */
export function convertToEmbedUrl(url: string): string {
  const watchMatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  
  return url;
}

