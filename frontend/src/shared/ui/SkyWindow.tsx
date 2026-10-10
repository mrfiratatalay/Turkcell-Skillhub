import Card, { type CardProps } from '@mui/material/Card';
import { night } from '@/app/theme/tokens';

/**
 * A window onto the brand night inside the calm interface. The deep Code Night navy lives only here
 * (sky map, city lights), which is what makes it feel like looking out at the real sky.
 */
export function SkyWindow({ sx, ...props }: CardProps) {
  return (
    <Card
      {...props}
      sx={[
        {
          background: `radial-gradient(ellipse 80% 70% at 50% 35%, #08185A 0%, ${night[900]} 62%, #020A2E 100%)`,
          borderColor: 'rgba(92, 163, 238, 0.18)',
          boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
