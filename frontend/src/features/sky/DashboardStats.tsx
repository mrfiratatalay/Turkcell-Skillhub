import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import LocalFireDepartmentRounded from '@mui/icons-material/LocalFireDepartmentRounded';
import MilitaryTechRounded from '@mui/icons-material/MilitaryTechRounded';
import StarRounded from '@mui/icons-material/StarRounded';
import Box from '@mui/material/Box';
import type { Me } from '@/features/me/api';
import { StatTile } from '@/shared/ui/StatTile';

export function DashboardStats({ me }: { me: Me }) {
  const p = me.progress;
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr 1fr' }, alignContent: 'stretch', height: '100%' }}>
      <StatTile icon={<StarRounded />} value={`${p.completedLessons}/${p.totalLessons}`} label="Yanan yıldız" accent="gold" />
      <StatTile icon={<LocalFireDepartmentRounded />} value={p.streakDays} label="Günlük seri" />
      <StatTile icon={<MilitaryTechRounded />} value={`${p.badgeCount}/${p.totalBadges}`} label="Rozet" />
      <StatTile icon={<EmojiEventsRounded />} value={me.rank ? `#${me.rank}` : '–'} label="Sıralama" accent="gold" />
    </Box>
  );
}
