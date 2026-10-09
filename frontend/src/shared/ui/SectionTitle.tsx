import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { gold, neon } from '@/app/theme/tokens';

/** Mono, code-flavoured section label: "< BÖLÜM". */
export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', columnGap: 2,
      rowGap: 1, mb: 2, minHeight: 36 }}>
      <Typography variant="overline" component="h2" sx={{ color: neon[300], fontSize: 13, whiteSpace: 'nowrap' }}>
        <Box component="span" sx={{ color: gold, mr: 1 }}>
          &lt;
        </Box>
        {children}
      </Typography>
      {action}
    </Box>
  );
}
