import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import AutorenewRounded from '@mui/icons-material/AutorenewRounded';
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';
import DiamondRounded from '@mui/icons-material/DiamondRounded';
import ExploreRounded from '@mui/icons-material/ExploreRounded';
import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded';
import LocalFireDepartmentRounded from '@mui/icons-material/LocalFireDepartmentRounded';
import NightsStayRounded from '@mui/icons-material/NightsStayRounded';
import PsychologyRounded from '@mui/icons-material/PsychologyRounded';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import ShieldRounded from '@mui/icons-material/ShieldRounded';
import StarRounded from '@mui/icons-material/StarRounded';
import TrackChangesRounded from '@mui/icons-material/TrackChangesRounded';
import WbTwilightRounded from '@mui/icons-material/WbTwilightRounded';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { ComponentType } from 'react';

/** The API sends semantic icon keys; this is the single mapping to concrete glyphs. */
const ICONS: Record<string, ComponentType<SvgIconProps>> = {
  code: CodeRounded,
  ai: PsychologyRounded,
  shield: ShieldRounded,
  rocket: RocketLaunchRounded,
  star: StarRounded,
  target: TrackChangesRounded,
  flame: LocalFireDepartmentRounded,
  calendar: CalendarMonthRounded,
  compass: ExploreRounded,
  refresh: AutorenewRounded,
  moon: NightsStayRounded,
  sunrise: WbTwilightRounded,
  secret: HelpOutlineRounded,
  polish: DiamondRounded,
  sparkle: AutoAwesomeRounded,
};

export function AppIcon({ name, ...props }: { name: string } & SvgIconProps) {
  const Icon = ICONS[name] ?? AutoAwesomeRounded;
  return <Icon {...props} />;
}
