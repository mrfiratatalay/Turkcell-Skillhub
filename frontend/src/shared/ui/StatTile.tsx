import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { gold, neon } from '@/app/theme/tokens';

interface StatTileProps {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  accent?: 'gold' | 'neon';
}

export function StatTile({ icon, value, label, accent = 'neon' }: StatTileProps) {
  const color = accent === 'gold' ? gold : neon[100];
  return (
    <Card sx={{ p: 2.25, display: 'flex', alignItems: 'center', gap: 1.75, minWidth: 0 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: '14px',
          display: 'grid',
          placeItems: 'center',
          color,
          background: accent === 'gold' ? 'rgba(253,196,11,.12)' : 'rgba(92,163,238,.14)',
          boxShadow: `0 0 18px ${accent === 'gold' ? 'rgba(253,196,11,.25)' : 'rgba(2,99,204,.35)'}`,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 800, lineHeight: 1.1 }}>{value}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {label}
        </Typography>
      </Box>
    </Card>
  );
}
