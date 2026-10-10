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
import { gold, ink, line, neon, scrim, shadow, surface, tint } from '@/app/theme/tokens';
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
            background: surface.sidebar,
            borderRight: `1px solid ${line.hairline}`,
            boxShadow: isDesktop ? 'none' : shadow.floating,
          },
        },
        backdrop: {
          sx: { backgroundColor: scrim, backdropFilter: 'blur(2px)' },
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
                  position: 'relative',
                  justifyContent: 'flex-start',
                  gap: 1.75,
                  px: 2,
                  py: 1.4,
                  borderRadius: '12px',
                  fontWeight: selected ? 700 : 600,
                  fontSize: 15,
                  color: selected ? ink.primary : ink.secondary,
                  background: selected ? surface.raised : 'transparent',
                  transition: 'background .15s, color .15s',
                  '& .MuiSvgIcon-root': { color: selected ? gold : 'inherit' },
                  // The active page is marked by a slim gold bar, not a gold slab.
                  '&::before': { content: '""', position: 'absolute', left: 0, top: 10, bottom: 10, width: 3,
                    borderRadius: 3, background: gold, opacity: selected ? 1 : 0, transition: 'opacity .15s' },
                  '&:hover': { background: selected ? surface.raised : tint.hover, color: ink.primary },
                  '&:focus-visible': { outline: `2px solid ${neon[300]}`, outlineOffset: 2 },
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
              <Chip label="Etkileşimli demo" size="small" variant="outlined"
                sx={{ color: neon[300], borderColor: 'rgba(92, 163, 238, 0.35)' }} />
              <Typography variant="body2" sx={{ mt: 0.75, fontSize: 12, color: ink.muted }}>
                Örnek veriler. İlerlemen bu tarayıcıda saklanır.
              </Typography>
            </Box>
          )}
          {clock && me.data && (
            <Box
              component={RouterLink}
              to="/profil"
              onClick={onNavigate}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: '18px', background: surface.card,
                border: `1px solid ${line.default}`, textDecoration: 'none', color: 'inherit', transition: 'border-color .15s',
                '&:hover': { borderColor: line.strong }, '&:focus-visible': { outline: `2px solid ${neon[300]}`, outlineOffset: 2 } }}
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
              <Avatar sx={{ width: 38, height: 38, bgcolor: surface.avatar, color: ink.primary, fontSize: 15 }}>
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
