import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { accent, surface } from '@/app/theme/tokens';

interface StatTileProps {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  accent?: 'gold' | 'neon';
}

export function StatTile({ icon, value, label, accent: tone = 'neon' }: StatTileProps) {
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
          color: tone === 'gold' ? accent.gold : accent.neon,
          background: surface.raised,
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
