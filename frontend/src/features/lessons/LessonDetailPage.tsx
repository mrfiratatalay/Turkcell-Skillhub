import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import BoltRounded from '@mui/icons-material/BoltRounded';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useParams } from 'react-router';
import { gold, neon } from '@/app/theme/tokens';
import { AsyncView, SkeletonBlock } from '@/shared/ui/AsyncView';
import { AppIcon } from '@/shared/ui/icons';
import { DifficultyChip, StatusChip } from '@/shared/ui/LessonChips';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SectionTitle } from '@/shared/ui/SectionTitle';
import { type LessonDetail, useLesson } from './api';
import { LessonActionCard } from './LessonActionCard';
import { VideoEmbed } from './VideoEmbed';

function LessonBody({ lesson }: { lesson: LessonDetail }) {
  return (
    <Box sx={{ display: 'grid', gap: 4, minWidth: 0 }}>
      <Box component="section">
        <SectionTitle>Neler öğreneceksin</SectionTitle>
        <Card sx={{ p: 3, display: 'grid', gap: 1.5, gridTemplateColumns: { sm: '1fr 1fr' } }}>
          {lesson.objectives.map((objective) => (
            <Box key={objective} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
              <CheckCircleOutlineRounded sx={{ color: gold, mt: '2px' }} />
              <Typography>{objective}</Typography>
            </Box>
          ))}
        </Card>
      </Box>
      <Box component="section">
        <SectionTitle>Ders notları</SectionTitle>
        <Card sx={{ p: { xs: 3, md: 4 }, display: 'grid', gap: 2 }}>
          {lesson.paragraphs.map((paragraph) => (
            <Typography key={paragraph.slice(0, 32)} sx={{ fontSize: 17, lineHeight: 1.85, maxWidth: '70ch' }}>
              {paragraph}
            </Typography>
          ))}
        </Card>
      </Box>
      {lesson.videoId && (
        <Box component="section">
          <SectionTitle>Ders videosu</SectionTitle>
          <VideoEmbed videoId={lesson.videoId} title={lesson.title} />
        </Box>
      )}
    </Box>
  );
}

export default function LessonDetailPage() {
  const { slug = '' } = useParams();
  const lesson = useLesson(slug);

  return (
    <>
      <Button component={RouterLink} to="/dersler" startIcon={<ArrowBackRounded />} variant="text" sx={{ mb: 2, ml: -1 }}>
        Dersler
      </Button>
      <AsyncView query={lesson} skeleton={<SkeletonBlock height={320} count={2} />}>
        {(data) => (
          <>
            <PageHeader
              title={data.title}
              subtitle={data.summary}
              eyebrow={
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                  <Chip variant="outlined" icon={<AppIcon name={data.category.icon} />}
                    label={`${data.category.name} · ${data.category.constellation}`}
                    sx={{ '& .MuiChip-icon': { color: neon[100] } }} />
                  <StatusChip status={data.status} />
                  <DifficultyChip difficulty={data.difficulty} />
                  <Chip size="small" icon={<AccessTimeRounded />} label={`${data.durationMin} dk`} />
                  <Chip size="small" icon={<BoltRounded />} label={`${data.xpReward} XP`} sx={{ color: gold }} />
                </Box>
              }
            />
            <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 360px' },
              alignItems: 'start' }}>
              <Box sx={{ order: { xs: 2, lg: 1 }, minWidth: 0 }}>
                <LessonBody lesson={data} />
              </Box>
              <Box sx={{ order: { xs: 1, lg: 2 } }}>
                <LessonActionCard lesson={data} />
              </Box>
            </Box>
          </>
        )}
      </AsyncView>
    </>
  );
}
