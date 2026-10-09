import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { UseQueryResult } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { signal } from '@/app/theme/tokens';
import { errorMessage } from '@/shared/api/ApiError';

interface AsyncViewProps<T> {
  query: UseQueryResult<T>;
  children: (data: T) => ReactNode;
  skeleton?: ReactNode;
}

/** One consistent loading / error / success rendering for every server-backed view. */
export function AsyncView<T>({ query, children, skeleton }: AsyncViewProps<T>) {
  if (query.isPending) return <>{skeleton ?? <SkeletonBlock />}</>;
  if (query.isError) return <ErrorState message={errorMessage(query.error)} onRetry={() => query.refetch()} />;
  return <>{children(query.data)}</>;
}

export function SkeletonBlock({ height = 220, count = 1 }: { height?: number; count?: number }) {
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} variant="rounded" height={height} />
      ))}
    </Box>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Card sx={{ p: 4, textAlign: 'center', display: 'grid', gap: 1.5, justifyItems: 'center' }}>
      <ErrorOutlineRounded sx={{ fontSize: 40, color: signal.error }} />
      <Typography variant="h6">Bir bulut gökyüzünü kapattı</Typography>
      <Typography color="text.secondary">{message}</Typography>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry} sx={{ mt: 1 }}>
          Tekrar dene
        </Button>
      )}
    </Card>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <Card sx={{ p: 4, textAlign: 'center', display: 'grid', gap: 1, justifyItems: 'center' }}>
      <Typography variant="h6">{title}</Typography>
      {description && <Typography color="text.secondary">{description}</Typography>}
      {action && <Box sx={{ mt: 1.5 }}>{action}</Box>}
    </Card>
  );
}
