import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { ApiError } from '@/shared/api/ApiError';
import { ToastProvider } from '@/shared/ui/ToastProvider';
import { router } from './router';
import { MODE_STORAGE_KEY } from './theme/schemes';
import { theme } from './theme/theme';
import { ThemeColorMeta } from './theme/ThemeColorMeta';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      // Client errors (4xx) are answers, not glitches: never retry them.
      retry: (failures, error) =>
        !(error instanceof ApiError && error.status >= 400 && error.status < 500) && failures < 2,
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="dark" modeStorageKey={MODE_STORAGE_KEY} noSsr disableTransitionOnChange>
      <CssBaseline />
      <ThemeColorMeta />
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
