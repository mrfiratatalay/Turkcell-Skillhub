import Box from '@mui/material/Box';
import { Outlet } from 'react-router';
import { NightSky } from '@/shared/ui/NightSky';
import { BottomNav, MobileTopBar } from './MobileChrome';
import { SIDEBAR_WIDTH, SideNav } from './SideNav';

export function AppShell() {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <NightSky />
      <SideNav />
      <MobileTopBar />
      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 1,
          ml: { md: `${SIDEBAR_WIDTH}px` },
          px: { xs: 2, sm: 3, md: 5 },
          pt: { xs: 11, md: 5 },
          pb: { xs: 14, md: 8 },
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
