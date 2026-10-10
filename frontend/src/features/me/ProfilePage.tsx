import BoltRounded from '@mui/icons-material/BoltRounded';
import EditRounded from '@mui/icons-material/EditRounded';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import LocalFireDepartmentRounded from '@mui/icons-material/LocalFireDepartmentRounded';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import PlaceRounded from '@mui/icons-material/PlaceRounded';
import QuizRounded from '@mui/icons-material/QuizRounded';
import SchoolRounded from '@mui/icons-material/SchoolRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { accent, gold, onGold } from '@/app/theme/tokens';
import { useSession } from '@/shared/auth/useSession';
import { formatDate, formatNumber, initials } from '@/shared/lib/format';
import { AsyncView, SkeletonBlock } from '@/shared/ui/AsyncView';
import { DemoControls } from '@/shared/ui/DemoControls';
import { NightClockRing } from '@/shared/ui/NightClockRing';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SectionTitle } from '@/shared/ui/SectionTitle';
import { StatTile } from '@/shared/ui/StatTile';
import { type Me, useMe } from './api';
import { AttemptList } from './AttemptList';
import { EditProfileDialog } from './EditProfileDialog';
import { XpChart } from './XpChart';

function ProfileCard({ me, onEdit, onSignOut }: { me: Me; onEdit: () => void; onSignOut: () => void }) {
  const { user, progress } = me;
  return (
    <Card sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
      <Avatar sx={{ width: 96, height: 96, fontSize: 36, color: onGold,
        background: `linear-gradient(135deg, ${gold}, #FFE58A)`, boxShadow: '0 0 0 4px rgba(253, 196, 11, 0.18)' }}>
        {initials(user.displayName)}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 240 }}>
        <Typography variant="h4" component="p">{user.displayName}</Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
          <Chip size="small" icon={<PlaceRounded />} label={user.city.name} sx={{ '& .MuiChip-icon': { color: accent.gold } }} />
          {user.university && <Chip size="small" icon={<SchoolRounded />} label={user.university} />}
          <Chip size="small" variant="outlined" label={`Üyelik: ${formatDate(user.memberSince)}`} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <NightClockRing progress={progress.nightClock.nightProgress} time={progress.nightClock.time}
          caption={progress.nightClock.title} size={120} />
        <Box sx={{ display: 'grid', gap: 1 }}>
          <Button variant="outlined" startIcon={<EditRounded />} onClick={onEdit}>Düzenle</Button>
          <Button variant="text" startIcon={<LogoutRounded />} onClick={onSignOut}>Çıkış yap</Button>
        </Box>
      </Box>
    </Card>
  );
}

export default function ProfilePage() {
  const me = useMe();
  const { signOut } = useSession();
  const [editing, setEditing] = useState(false);

  return (
    <>
      <PageHeader title="Profilin" highlight="ve gecen" subtitle="Yolculuğunun özeti: Gece Saati, seriler ve son denemeler." />
      <AsyncView query={me} skeleton={<SkeletonBlock height={200} count={2} />}>
        {(data) => (
          <Box sx={{ display: 'grid', gap: 4 }}>
            <ProfileCard me={data} onEdit={() => setEditing(true)} onSignOut={signOut} />
            <DemoControls />
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' } }}>
              <StatTile icon={<BoltRounded />} value={formatNumber(data.progress.totalXp)} label="Toplam XP" accent="gold" />
              <StatTile icon={<LocalFireDepartmentRounded />} value={data.progress.longestStreak} label="En uzun seri" />
              <StatTile icon={<QuizRounded />} value={data.progress.attemptCount} label="Quiz denemesi" />
              <StatTile icon={<EmojiEventsRounded />} value={data.rank ? `#${data.rank}` : '–'} label="Türkiye sırası" accent="gold" />
            </Box>
            <Box component="section">
              <SectionTitle>XP yolculuğu</SectionTitle>
              <XpChart />
            </Box>
            <Box component="section">
              <SectionTitle>Son denemeler</SectionTitle>
              <AttemptList limit={10} />
            </Box>
            {editing && <EditProfileDialog user={data.user} open={editing} onClose={() => setEditing(false)} />}
          </Box>
        )}
      </AsyncView>
    </>
  );
}
