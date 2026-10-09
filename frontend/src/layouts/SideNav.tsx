import LogoutRounded from '@mui/icons-material/LogoutRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useLocation } from 'react-router';
import { glass, glow, gold, ink, neon, night } from '@/app/theme/tokens';
import { useMe } from '@/features/me/api';
import { useSession } from '@/shared/auth/useSession';
import { formatNumber, initials } from '@/shared/lib/format';
import { Logo } from '@/shared/ui/Logo';
import { NightClockRing } from '@/shared/ui/NightClockRing';
import { activeNav, NAV_ITEMS } from './navigation';

export const SIDEBAR_WIDTH = 272;

export function SideNav() {
  const { pathname } = useLocation();
  const active = activeNav(pathname);
  const { user, signOut } = useSession();
  const me = useMe();
  const clock = me.data?.progress.nightClock;

  return (
    <Box
      component="nav"
      aria-label="Ana menü"
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        position: 'fixed',
        inset: '0 auto 0 0',
        width: SIDEBAR_WIDTH,
        zIndex: 10,
        p: 2.5,
        gap: 3,
        background: 'rgba(1, 11, 75, 0.55)',
        backdropFilter: 'blur(16px)',
        boxShadow: `1px 0 0 ${glass.hairline}`,
      }}
    >
      <Box component={RouterLink} to="/gokyuzu" sx={{ px: 1, pt: 1, textDecoration: 'none', color: 'inherit' }}>
        <Logo size={24} />
      </Box>
      <Box sx={{ display: 'grid', gap: 0.75 }}>
        {NAV_ITEMS.map((item) => {
          const selected = item.to === active;
          return (
            <ButtonBase
              key={item.to}
              component={RouterLink}
              to={item.to}
              aria-current={selected ? 'page' : undefined}
              sx={{
                justifyContent: 'flex-start',
                gap: 1.75,
                px: 2,
                py: 1.4,
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: 15,
                color: selected ? night[900] : ink.secondary,
                background: selected ? gold : 'transparent',
                boxShadow: selected ? '0 6px 24px rgba(253,196,11,.30)' : 'none',
                transition: 'background .15s, color .15s',
                '&:hover': { background: selected ? gold : 'rgba(92,163,238,.12)', color: selected ? night[900] : '#fff' },
                '&:focus-visible': { outline: `3px solid ${gold}`, outlineOffset: 2 },
              }}
            >
              {item.icon}
              {item.label}
            </ButtonBase>
          );
        })}
      </Box>
      <Box sx={{ mt: 'auto', display: 'grid', gap: 2 }}>
        {clock && me.data && (
          <Box
            component={RouterLink}
            to="/profil"
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: '18px', background: glass.surface,
              boxShadow: glow.neon, textDecoration: 'none', color: 'inherit' }}
          >
            <NightClockRing progress={clock.nightProgress} time={clock.time} size={64} />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="overline" sx={{ color: neon[300], fontSize: 10, display: 'block' }}>
                Gece Saati
              </Typography>
              <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }} noWrap>
                {clock.title}
              </Typography>
              <Typography variant="body2" sx={{ color: gold, fontWeight: 700 }}>
                {formatNumber(me.data.progress.totalXp)} XP
              </Typography>
            </Box>
          </Box>
        )}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 0.5 }}>
            <Avatar sx={{ width: 38, height: 38, bgcolor: neon[500], color: '#fff', fontSize: 15 }}>
              {initials(user.displayName)}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14 }} noWrap>
                {user.displayName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }} noWrap>
                {user.city.name}
              </Typography>
            </Box>
            <Tooltip title="Çıkış yap">
              <IconButton onClick={signOut} aria-label="Çıkış yap" sx={{ color: ink.secondary }}>
                <LogoutRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  );
}
