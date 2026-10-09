import LocalFireDepartmentRounded from '@mui/icons-material/LocalFireDepartmentRounded';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useLocation } from 'react-router';
import { glass, gold, neon } from '@/app/theme/tokens';
import { useMe } from '@/features/me/api';
import { useSession } from '@/shared/auth/useSession';
import { isDemoMode } from '@/shared/config/runtime';
import { formatNumber, initials } from '@/shared/lib/format';
import { Logo } from '@/shared/ui/Logo';
import { activeNav, NAV_ITEMS } from './navigation';

/** Phone layout: slim top bar with live stats, thumb-friendly bottom navigation. */
export function MobileTopBar() {
  const { user } = useSession();
  const me = useMe();
  const progress = me.data?.progress;
  return (
    <Box
      component="header"
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: 10,
        height: 64,
        px: 2,
        alignItems: 'center',
        gap: 1,
        background: 'rgba(1, 11, 75, 0.78)',
        backdropFilter: 'blur(16px)',
        boxShadow: `0 1px 0 ${glass.hairline}`,
      }}
    >
      <Box component={RouterLink} to="/gokyuzu" sx={{ textDecoration: 'none', color: 'inherit', mr: 'auto', minWidth: 0 }}>
        <Logo size={19} />
        {isDemoMode && (
          <Tooltip title="Kurgusal örnek veriler. İlerlemen bu tarayıcıda saklanır.">
            <Typography sx={{ color: neon[100], fontSize: 9, lineHeight: 1.2, letterSpacing: 1.5, mt: 0.25 }}>
              DEMO
            </Typography>
          </Tooltip>
        )}
      </Box>
      {progress && progress.streakDays > 0 && (
        <Chip
          size="small"
          icon={<LocalFireDepartmentRounded />}
          label={progress.streakDays}
          sx={{ '& .MuiChip-icon': { color: '#FF9F43' }, fontWeight: 800 }}
        />
      )}
      {progress && (
        <Chip size="small" label={`${formatNumber(progress.totalXp)} XP`} sx={{ color: gold, fontWeight: 800 }} />
      )}
      {user && (
        <Avatar
          component={RouterLink}
          to="/profil"
          aria-label="Profil"
          sx={{ width: 34, height: 34, bgcolor: neon[500], color: '#fff', fontSize: 13, textDecoration: 'none' }}
        >
          {initials(user.displayName)}
        </Avatar>
      )}
    </Box>
  );
}

export function BottomNav() {
  const { pathname } = useLocation();
  const active = activeNav(pathname) ?? false;
  return (
    <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', inset: 'auto 0 0 0', zIndex: 10,
      pb: 'env(safe-area-inset-bottom)', background: 'rgba(1, 11, 75, 0.82)' }}>
      <BottomNavigation value={active} showLabels component="nav" aria-label="Alt menü">
        {NAV_ITEMS.filter((item) => item.inBottomNav).map((item) => (
          <BottomNavigationAction
            key={item.to}
            component={RouterLink}
            to={item.to}
            value={item.to}
            label={item.shortLabel}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
