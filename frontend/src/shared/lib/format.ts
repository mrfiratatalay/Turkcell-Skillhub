const numberFormat = new Intl.NumberFormat('tr-TR');
const dateFormat = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
// "dün" reads naturally; "evvelsi gün" does not, so only ±1 day uses the idiomatic form.
const relativeAuto = new Intl.RelativeTimeFormat('tr-TR', { numeric: 'auto' });
const relativeNumeric = new Intl.RelativeTimeFormat('tr-TR', { numeric: 'always' });

export const formatNumber = (value: number) => numberFormat.format(value);

export const formatDate = (iso: string) => dateFormat.format(new Date(iso));

export function relativeTime(iso: string, now = Date.now()): string {
  const seconds = Math.round((Date.parse(iso) - now) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) {
      const value = Math.round(seconds / size);
      return (Math.abs(value) === 1 ? relativeAuto : relativeNumeric).format(value, unit);
    }
  }
  return 'az önce';
}

/** Greeting by the learner's local hour; the night is the platform's favourite time. */
export function greeting(date = new Date()): { text: string; emoji: string } {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return { text: 'Günaydın', emoji: '☀️' };
  if (hour >= 12 && hour < 17) return { text: 'İyi günler', emoji: '🌤️' };
  if (hour >= 17 && hour < 22) return { text: 'İyi akşamlar', emoji: '🌆' };
  return { text: 'İyi geceler', emoji: '🌙' };
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toLocaleUpperCase('tr-TR'))
    .join('');
}

export function firstName(name: string): string {
  return name.split(/\s+/)[0] ?? name;
}
