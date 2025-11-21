/**
 * Mock Name Generator
 * Backend'de name olmayan kullanıcılar için tutarlı isimler üretir
 */

const firstNames = [
  'Ahmet', 'Mehmet', 'Ali', 'Ayşe', 'Fatma', 'Zeynep', 'Mustafa', 'Emre',
  'Can', 'Deniz', 'Ece', 'Elif', 'Burak', 'Cem', 'Selin', 'Yusuf',
  'Hasan', 'İbrahim', 'Meryem', 'Ömer', 'Kemal', 'Leyla', 'Berk', 'Eylül',
  'Kerem', 'Kaan', 'Defne', 'Arda', 'Berat', 'Doruk', 'Gizem', 'Hande',
];

const lastNames = [
  'Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Yıldırım', 'Öztürk',
  'Aydın', 'Özdemir', 'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara',
  'Koç', 'Kurt', 'Özkan', 'Şimşek', 'Erdoğan', 'Ünal', 'Aksoy', 'Avcı',
  'Türk', 'Polat', 'Güneş', 'Tekin', 'Aydin', 'Bulut', 'Karaca', 'Sönmez',
];

/**
 * UserId'den deterministic hash üretir
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * UserId bazında tutarlı mock isim üretir
 * Aynı userId için her zaman aynı ismi döndürür
 */
export function generateMockName(userId: string): string {
  const hash = hashCode(userId);
  
  const firstNameIndex = hash % firstNames.length;
  const lastNameIndex = Math.floor(hash / firstNames.length) % lastNames.length;
  
  return `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`;
}

/**
 * İsim varsa onu döndürür, yoksa mock isim üretir
 */
export function getDisplayName(name: string | undefined | null, userId: string): string {
  if (name && name.trim()) {
    return name;
  }
  return generateMockName(userId);
}

/**
 * Avatar için ilk harfi döndürür (isim veya userId'den)
 */
export function getAvatarLetter(name: string | undefined | null, userId: string): string {
  const displayName = getDisplayName(name, userId);
  return displayName.charAt(0).toUpperCase();
}

