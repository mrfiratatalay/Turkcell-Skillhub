import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { fonts, glow, gold, ink, neon, night } from '@/app/theme/tokens';
import { formatNumber, initials } from '@/shared/lib/format';
import type { LeaderboardEntry } from './api';

function Row({ entry }: { entry: LeaderboardEntry }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '44px 40px minmax(0, 1fr) auto',
        alignItems: 'center',
        gap: 1.5,
        px: { xs: 1.5, sm: 2.5 },
        py: 1.5,
        borderRadius: '14px',
        background: entry.me ? 'rgba(253,196,11,.08)' : 'transparent',
        boxShadow: entry.me ? glow.gold : 'none',
      }}
    >
      <Typography sx={{ fontFamily: fonts.mono, fontWeight: 800, color: entry.rank <= 3 ? gold : ink.secondary }}>
        #{entry.rank}
      </Typography>
      <Avatar sx={{ width: 40, height: 40, bgcolor: entry.me ? gold : neon[500], color: entry.me ? night[900] : '#fff',
        fontSize: 14 }}>
        {initials(entry.displayName)}
      </Avatar>
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontWeight: 700 }} noWrap>{entry.displayName}</Typography>
          {entry.me && <Chip size="small" label="Sen" color="primary" sx={{ height: 20, fontWeight: 800 }} />}
        </Box>
        <Typography variant="body2" color="text.secondary" noWrap>
          {entry.cityName} · {entry.levelTitle} · {entry.completedLessons} yıldız
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: 800, color: entry.me ? gold : '#fff', whiteSpace: 'nowrap' }}>
        {formatNumber(entry.xp)} XP
      </Typography>
    </Box>
  );
}

/** Everyone after the podium; your own row stays visible even when you are outside the list. */
export function RankingList({ entries, me }: { entries: LeaderboardEntry[]; me: LeaderboardEntry | null }) {
  const meListed = entries.some((e) => e.me);
  return (
    <Card sx={{ p: { xs: 1, sm: 1.5 }, display: 'grid', gap: 0.5, gridTemplateColumns: 'minmax(0, 1fr)' }}>
      {entries.map((entry) => (
        <Row key={entry.userId} entry={entry} />
      ))}
      {me && !meListed && (
        <>
          <Typography sx={{ textAlign: 'center', color: ink.muted, letterSpacing: 4 }}>• • •</Typography>
          <Row entry={me} />
        </>
      )}
    </Card>
  );
}
