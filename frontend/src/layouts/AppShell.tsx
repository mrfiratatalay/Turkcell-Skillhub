import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useMe } from '@/features/me/api';
import { AppBackdrop } from '@/shared/ui/AppBackdrop';
import { AppTopBar, BottomNav } from './MobileChrome';
import { DRAWER_DURATION, SIDEBAR_WIDTH, SideNav } from './SideNav';

const SIDEBAR_STORAGE_KEY = 'skillhub.sidebar-open';

function readSidebarPreference() {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) !== 'false';
  } catch {
    return true;
  }
}

export function AppShell() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { key: locationKey } = useLocation();
  const me = useMe();
  const [desktopOpen, setDesktopOpen] = useState(readSidebarPreference);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerOpen = isDesktop ? desktopOpen : mobileOpen;

  // A mobile modal must not keep its focus trap or scroll lock after navigation/resizing.
  useEffect(() => {
    setMobileOpen(false);
  }, [locationKey, isDesktop]);

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(desktopOpen));
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }, [desktopOpen]);

  const toggleDrawer = () => {
    if (isDesktop) setDesktopOpen((open) => !open);
    else setMobileOpen((open) => !open);
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <AppBackdrop dawn={me.data?.progress.nightClock.nightProgress ?? 0} withBottomNav />
      <SideNav
        open={drawerOpen}
        isDesktop={isDesktop}
        reducedMotion={reducedMotion}
        onClose={() => setMobileOpen(false)}
        onNavigate={() => { if (!isDesktop) setMobileOpen(false); }}
      />
      <AppTopBar open={drawerOpen} desktopOpen={desktopOpen} onMenuToggle={toggleDrawer} />
      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 1,
          ml: { md: desktopOpen ? `${SIDEBAR_WIDTH}px` : 0 },
          px: { xs: 2, sm: 3, md: 5 },
          pt: 'calc(88px + env(safe-area-inset-top))',
          pb: { xs: 14, md: 8 },
          transition: theme.transitions.create('margin-left', { duration: DRAWER_DURATION }),
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
      <BottomNav />
    </Box>
  );
}
