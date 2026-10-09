import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useSession } from './useSession';

/** Guards private routes; remembers where the learner wanted to go. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSession();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/giris" replace state={{ from: location.pathname }} />;
  }
  return children;
}

export function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSession();
  return isAuthenticated ? <Navigate to="/gokyuzu" replace /> : children;
}
