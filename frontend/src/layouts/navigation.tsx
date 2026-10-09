import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import MenuBookRounded from '@mui/icons-material/MenuBookRounded';
import MilitaryTechRounded from '@mui/icons-material/MilitaryTechRounded';
import NightsStayRounded from '@mui/icons-material/NightsStayRounded';
import PersonRounded from '@mui/icons-material/PersonRounded';
import PublicRounded from '@mui/icons-material/PublicRounded';
import type { ReactElement } from 'react';

export interface NavItem {
  to: string;
  label: string;
  shortLabel: string;
  icon: ReactElement;
  inBottomNav: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/gokyuzu', label: 'Gökyüzü', shortLabel: 'Gökyüzü', icon: <NightsStayRounded />, inBottomNav: true },
  { to: '/dersler', label: 'Dersler', shortLabel: 'Dersler', icon: <MenuBookRounded />, inBottomNav: true },
  { to: '/rehber', label: 'Gece Rehberi', shortLabel: 'Rehber', icon: <AutoAwesomeRounded />, inBottomNav: true },
  { to: '/sehir-isiklari', label: 'Şehir Işıkları', shortLabel: 'Işıklar', icon: <PublicRounded />, inBottomNav: true },
  { to: '/rozetler', label: 'Rozetler', shortLabel: 'Rozetler', icon: <MilitaryTechRounded />, inBottomNav: true },
  { to: '/profil', label: 'Profil', shortLabel: 'Profil', icon: <PersonRounded />, inBottomNav: false },
];

/** The nav item a path belongs to (e.g. /dersler/x/quiz highlights "Dersler"). */
export function activeNav(pathname: string): string | undefined {
  return NAV_ITEMS.find((item) => pathname === item.to || pathname.startsWith(`${item.to}/`))?.to;
}
