import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import { gold } from '@/app/theme/tokens';

const pulse = keyframes`0%, 100% { transform: scale(.92); opacity: .55; } 50% { transform: scale(1.06); opacity: 1; }`;

/** Route-level loading: a breathing crescent instead of a spinner. */
export function PageLoader() {
  return (
    <Box role="status" aria-label="Yükleniyor" sx={{ display: 'grid', placeItems: 'center', minHeight: '50vh' }}>
      <Box
        component="svg"
        viewBox="0 0 48 48"
        sx={{ width: 56, height: 56, animation: `${pulse} 1.6s ease-in-out infinite`,
          filter: 'drop-shadow(0 0 10px rgba(253, 196, 11, 0.35))', '@media (prefers-reduced-motion: reduce)': { animation: 'none' } }}
      >
        <path d="M30 4A20 20 0 1 0 44 34 16 16 0 1 1 30 4Z" fill={gold} />
      </Box>
    </Box>
  );
}
