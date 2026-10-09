import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { glow, gold, neon } from '@/app/theme/tokens';
import { AppIcon } from '@/shared/ui/icons';
import { KIND_META, type Recommendation } from './api';

interface RecommendationCardProps {
  recommendation: Recommendation;
  highlight?: boolean;
  /** Stretch to the grid cell (equal-height rows on the guide page). */
  fill?: boolean;
}

export function RecommendationCard({ recommendation, highlight = false, fill = false }: RecommendationCardProps) {
  const meta = KIND_META[recommendation.kind];
  return (
    <Card sx={{ p: 3, display: 'grid', gap: 1.5, height: fill ? '100%' : 'auto', alignContent: 'start',
      boxShadow: highlight ? glow.gold : undefined }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 46, height: 46, borderRadius: '14px', display: 'grid', placeItems: 'center',
          color: highlight ? gold : neon[100], background: highlight ? 'rgba(253,196,11,.12)' : 'rgba(92,163,238,.14)',
          boxShadow: `0 0 20px ${highlight ? 'rgba(253,196,11,.3)' : 'rgba(2,99,204,.4)'}` }}>
          <AppIcon name={meta.icon} />
        </Box>
        <Chip size="small" variant="outlined" label={meta.label} />
      </Box>
      <Typography variant="h6" component="h3">
        {recommendation.title}
      </Typography>
      <Typography color="text.secondary">{recommendation.reason}</Typography>
      {recommendation.lessonSlug && (
        <Button
          component={RouterLink}
          to={`/dersler/${recommendation.lessonSlug}`}
          variant={highlight ? 'contained' : 'outlined'}
          endIcon={<ArrowForwardRounded />}
          sx={{ justifySelf: 'start', mt: 0.5 }}
        >
          {recommendation.lessonTitle}
        </Button>
      )}
    </Card>
  );
}
