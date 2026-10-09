import { type ComponentType, lazy, type LazyExoticComponent, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { AppShell } from '@/layouts/AppShell';
import { RedirectIfAuthenticated, RequireAuth } from '@/shared/auth/RequireAuth';
import { PageLoader } from '@/shared/ui/PageLoader';

// Every page is its own chunk: the first paint only downloads what the current route needs.
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/RegisterPage'));
const DashboardPage = lazy(() => import('@/features/sky/DashboardPage'));
const LessonsPage = lazy(() => import('@/features/lessons/LessonsPage'));
const LessonDetailPage = lazy(() => import('@/features/lessons/LessonDetailPage'));
const QuizPage = lazy(() => import('@/features/quiz/QuizPage'));
const GuidePage = lazy(() => import('@/features/guide/GuidePage'));
const CityLightsPage = lazy(() => import('@/features/leaderboard/CityLightsPage'));
const BadgesPage = lazy(() => import('@/features/badges/BadgesPage'));
const ProfilePage = lazy(() => import('@/features/me/ProfilePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const page = (Page: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
);

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/gokyuzu" replace /> },
  { path: '/giris', element: <RedirectIfAuthenticated>{page(LoginPage)}</RedirectIfAuthenticated> },
  { path: '/kayit', element: <RedirectIfAuthenticated>{page(RegisterPage)}</RedirectIfAuthenticated> },
  // The quiz runs in focus mode, outside the navigation shell.
  { path: '/dersler/:slug/quiz', element: <RequireAuth>{page(QuizPage)}</RequireAuth> },
  {
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      { path: '/gokyuzu', element: page(DashboardPage) },
      { path: '/dersler', element: page(LessonsPage) },
      { path: '/dersler/:slug', element: page(LessonDetailPage) },
      { path: '/rehber', element: page(GuidePage) },
      { path: '/sehir-isiklari', element: page(CityLightsPage) },
      { path: '/rozetler', element: page(BadgesPage) },
      { path: '/profil', element: page(ProfilePage) },
    ],
  },
  { path: '*', element: page(NotFoundPage) },
]);
