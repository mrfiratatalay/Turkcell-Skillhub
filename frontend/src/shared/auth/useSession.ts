import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useSyncExternalStore } from 'react';
import { type Session, sessionStore } from './sessionStore';

export function useSession() {
  const session = useSyncExternalStore(sessionStore.subscribe, sessionStore.get, sessionStore.get);
  const queryClient = useQueryClient();

  const signIn = useCallback((next: Session) => {
    queryClient.clear();
    sessionStore.set(next);
  }, [queryClient]);

  const signOut = useCallback(() => {
    sessionStore.set(null);
    queryClient.clear();
  }, [queryClient]);

  return { session, user: session?.user ?? null, isAuthenticated: session !== null, signIn, signOut };
}
