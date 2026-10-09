import CloseRounded from '@mui/icons-material/CloseRounded';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useLocation } from 'react-router';
import { glass, glow, gold, ink, neon, night } from '@/app/theme/tokens';
import { useMe } from '@/features/me/api';
import { useSession } from '@/shared/auth/useSession';
import { isDemoMode } from '@/shared/config/runtime';
import { formatNumber, initials } from '@/shared/lib/format';
import { Logo } from '@/shared/ui/Logo';
import { NightClockRing } from '@/shared/ui/NightClockRing';
import { activeNav, NAV_ITEMS } from './navigation';

export const SIDEBAR_WIDTH = 272;
export const DRAWER_DURATION = 240;

interface SideNavProps {
  open: boolean;
  isDesktop: boolean;
  reducedMotion: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

export function SideNav({ open, isDesktop, reducedMotion, onClose, onNavigate }: SideNavProps) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const active = activeNav(pathname);
  const { user, signOut } = useSession();
  const me = useMe();
  const clock = me.data?.progress.nightClock;

  return (
    <Drawer
      variant={isDesktop ? 'persistent' : 'temporary'}
      open={open}
      onClose={onClose}
      transitionDuration={reducedMotion ? 0 : DRAWER_DURATION}
      ModalProps={{ keepMounted: true }}
      slotProps={{
        transition: { easing: theme.transitions.easing.easeInOut },
        paper: {
          id: 'app-navigation',
          'aria-label': 'Ana menü',
          inert: !open,
          sx: {
            width: SIDEBAR_WIDTH,
            maxWidth: 'calc(100vw - 24px)',
            height: '100dvh',
            background: isDesktop ? 'rgba(1, 11, 75, 0.72)' : glass.strong,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: `1px solid ${glass.hairline}`,
            boxShadow: isDesktop ? 'none' : '16px 0 64px rgba(0, 4, 28, 0.45)',
          },
        },
        backdrop: {
          sx: { backgroundColor: 'rgba(1, 7, 40, 0.64)', backdropFilter: 'blur(4px)' },
        },
      }}
    >
      <Box
        component="nav"
        aria-label="Ana menü"
        sx={{
          display: 'flex', flexDirection: 'column', minHeight: '100%', p: 2.5, gap: 3,
          pt: 'calc(20px + env(safe-area-inset-top))',
          pb: 'calc(20px + env(safe-area-inset-bottom))',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexShrink: 0 }}>
          <Box component={RouterLink} to="/gokyuzu" onClick={onNavigate} sx={{ textDecoration: 'none', color: 'inherit', pl: 0.5 }}>
            <Logo size={22} />
          </Box>
          {!isDesktop && (
            <Tooltip title="Menüyü kapat">
              <IconButton onClick={onClose} aria-label="Menüyü kapat" sx={{ width: 44, height: 44, color: ink.secondary }}>
                <CloseRounded />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box sx={{ display: 'grid', gap: 0.75 }}>
          {NAV_ITEMS.map((item) => {
            const selected = item.to === active;
            return (
              <ButtonBase
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={onNavigate}
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
          {isDemoMode && (
            <Box sx={{ px: 0.5 }}>
              <Chip label="Etkileşimli demo" size="small" variant="outlined" sx={{ color: neon[100], borderColor: glass.hairline }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, fontSize: 12 }}>
                Örnek veriler. İlerlemen bu tarayıcıda saklanır.
              </Typography>
            </Box>
          )}
          {clock && me.data && (
            <Box
              component={RouterLink}
              to="/profil"
              onClick={onNavigate}
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
    </Drawer>
  );
}
