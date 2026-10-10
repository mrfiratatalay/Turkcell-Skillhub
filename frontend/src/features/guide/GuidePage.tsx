import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import RefreshRounded from '@mui/icons-material/RefreshRounded';
import RuleRounded from '@mui/icons-material/RuleRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { accent, ink } from '@/app/theme/tokens';
import { isDemoMode } from '@/shared/config/runtime';
import { relativeTime } from '@/shared/lib/format';
import { AsyncView, EmptyState, SkeletonBlock } from '@/shared/ui/AsyncView';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useToast } from '@/shared/ui/ToastProvider';
import { type Guide, useGuide, useRefreshGuide } from './api';
import { RecommendationCard } from './RecommendationCard';

function SourceChip({ guide }: { guide: Guide }) {
  return guide.source === 'AI' ? (
    <Chip icon={<AutoAwesomeRounded />} label="Claude ile üretildi" variant="outlined"
      sx={{ '& .MuiChip-icon': { color: accent.gold } }} />
  ) : (
    <Chip icon={<RuleRounded />} label="Kural tabanlı rehber" variant="outlined"
      sx={{ '& .MuiChip-icon': { color: accent.neon } }} />
  );
}

export default function GuidePage() {
  const guide = useGuide();
  const refresh = useRefreshGuide();
  const toast = useToast();

  const onRefresh = () =>
    refresh.mutate(undefined, {
      onSuccess: () => toast('Rehber gökyüzünü yeniden okudu ✨'),
      onError: (error) => toast(error.message, 'warning'),
    });

  return (
    <>
      <PageHeader
        title="Gece"
        highlight="Rehberi"
        subtitle={isDemoMode
          ? 'Demo ilerlemene göre sıradaki yıldızını seç. Quiz çözdükçe önerilerin de değişir.'
          : 'Gerçek ilerlemene bakıp sıradaki en değerli adımı önerir. Uydurma yok: her öneri senin verine dayanır.'}
        actions={
          <Button variant="outlined" startIcon={<RefreshRounded />} onClick={onRefresh} disabled={refresh.isPending}>
            {refresh.isPending ? 'Düşünüyor…' : 'Yenile'}
          </Button>
        }
      />
      <AsyncView query={guide} skeleton={<SkeletonBlock height={240} count={2} />}>
        {(data) => (
          <>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
              <SourceChip guide={data} />
              <Typography variant="body2" sx={{ color: ink.muted }}>
                {relativeTime(data.generatedAt)} güncellendi
              </Typography>
            </Box>
            {data.recommendations.length === 0 ? (
              <EmptyState title="Gökyüzün pırıl pırıl" description="Şu an önerilecek bir adım yok; bütün yıldızlarını yakmış olabilirsin!" />
            ) : (
              <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
                {data.recommendations.map((recommendation, i) => (
                  <RecommendationCard key={`${recommendation.kind}-${recommendation.lessonSlug ?? i}`}
                    recommendation={recommendation} highlight={i === 0} fill />
                ))}
              </Box>
            )}
            <Card sx={{ p: 3, mt: 4, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <AutoAwesomeRounded sx={{ color: accent.neon, mt: 0.25 }} />
              <Typography variant="body2" color="text.secondary">
                {isDemoMode ? (
                  'Bu demoda rehber; tamamladığın dersler, skorların ve serin üzerinden öneri sunar. '
                  + 'Öneriler örnek profilindeki ilerlemeyle güncellenir; yapay zekâ servisine bağlanılmaz.'
                ) : (
                  <>
                    Rehber; tamamladığın dersleri, skorlarını, serini ve açık yıldızlarını kullanır. Yapay zekâ etkinse
                    modele yalnızca ilk adın ve ilerleme verin gider; önerdiği her ders sunucuda doğrulanır.
                    {!data.aiConfigured && ' Şu an kural tabanlı rehber çalışıyor; bir Anthropic API anahtarı eklendiğinde öneriler Claude ile üretilir.'}
                  </>
                )}
              </Typography>
            </Card>
          </>
        )}
      </AsyncView>
    </>
  );
}
