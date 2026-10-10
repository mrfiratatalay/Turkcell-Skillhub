import LocalFireDepartmentRounded from '@mui/icons-material/LocalFireDepartmentRounded';
import MenuOpenRounded from '@mui/icons-material/MenuOpenRounded';
import MenuRounded from '@mui/icons-material/MenuRounded';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useLocation } from 'react-router';
import { accent, atmosphere, ink, line, surface, tint } from '@/app/theme/tokens';
import { useMe } from '@/features/me/api';
import { useSession } from '@/shared/auth/useSession';
import { isDemoMode } from '@/shared/config/runtime';
import { formatNumber, initials } from '@/shared/lib/format';
import { Logo } from '@/shared/ui/Logo';
import { ThemeModeToggle } from '@/shared/ui/ThemeModeToggle';
import { activeNav, NAV_ITEMS } from './navigation';
import { DRAWER_DURATION, SIDEBAR_WIDTH } from './SideNav';

interface AppTopBarProps {
  open: boolean;
  desktopOpen: boolean;
  onMenuToggle: () => void;
}

/** The menu toggle stays reachable even when the desktop sidebar is hidden. */
export function AppTopBar({ open, desktopOpen, onMenuToggle }: AppTopBarProps) {
  const { pathname } = useLocation();
  const active = activeNav(pathname);
  const pageTitle = NAV_ITEMS.find((item) => item.to === active)?.label ?? 'SkillHub';
  const { user } = useSession();
  const me = useMe();
  const progress = me.data?.progress;
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        right: 0,
        left: { xs: 0, md: desktopOpen ? SIDEBAR_WIDTH : 0 },
        zIndex: (theme) => theme.zIndex.appBar,
        height: 'calc(64px + env(safe-area-inset-top))',
        pt: 'env(safe-area-inset-top)',
        px: { xs: 1.5, sm: 2, md: 3 },
        alignItems: 'center',
        gap: 1,
        background: atmosphere.bar,
        backdropFilter: 'blur(12px)',
        boxShadow: `0 1px 0 ${line.hairline}`,
        transition: (theme) => theme.transitions.create('left', { duration: DRAWER_DURATION }),
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      }}
    >
      <Tooltip title={open ? 'Menüyü gizle' : 'Menüyü aç'}>
        <IconButton
          onClick={onMenuToggle}
          aria-label={open ? 'Menüyü gizle' : 'Menüyü aç'}
          aria-expanded={open}
          aria-controls="app-navigation"
          sx={{
            width: 44, height: 44, flexShrink: 0, borderRadius: '14px',
            color: ink.secondary, background: surface.card, border: `1px solid ${line.default}`,
            '&:hover': { background: surface.raised, borderColor: line.strong, color: ink.primary },
          }}
        >
          {open ? <MenuOpenRounded /> : <MenuRounded />}
        </IconButton>
      </Tooltip>
      <Box component={RouterLink} to="/gokyuzu" sx={{ display: { xs: 'block', md: 'none' }, textDecoration: 'none', color: 'inherit', mr: 'auto', minWidth: 0 }}>
        <Logo size={18} />
        {isDemoMode && (
          <Tooltip title="Kurgusal örnek veriler. İlerlemen bu tarayıcıda saklanır.">
            <Typography sx={{ color: accent.neon, fontSize: 9, lineHeight: 1.2, letterSpacing: 1.5, mt: 0.25 }}>
              DEMO
            </Typography>
          </Tooltip>
        )}
      </Box>
      <Typography noWrap sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 600, color: 'text.secondary', mr: 'auto' }}>
        {pageTitle}
      </Typography>
      <ThemeModeToggle />
      {progress && progress.streakDays > 0 && (
        <Chip
          size="small"
          icon={<LocalFireDepartmentRounded />}
          label={progress.streakDays}
          sx={{ display: { xs: 'none', sm: 'inline-flex' }, '& .MuiChip-icon': { color: accent.flame }, fontWeight: 800 }}
        />
      )}
      {progress && (
        <Chip size="small" label={`${formatNumber(progress.totalXp)} XP`} sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: accent.gold, background: tint.gold, fontWeight: 800 }} />
      )}
      {user && (
        <Avatar
          component={RouterLink}
          to="/profil"
          aria-label="Profil"
          sx={{ width: 34, height: 34, bgcolor: surface.avatar, color: ink.primary, fontSize: 13, textDecoration: 'none',
            '&:focus-visible': { outline: `2px solid ${accent.neon}`, outlineOffset: 2 } }}
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
      pb: 'env(safe-area-inset-bottom)', background: surface.sidebar }}>
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
