import type { SessionUser } from '@/shared/domain/types';
import { apiBaseUrl, isDemoMode } from '@/shared/config/runtime';

export interface Session {
  token: string;
  expiresAt: string;
  user: SessionUser;
}

// A demo login can never become a real API credential, even after changing deployment mode.
const STORAGE_KEY = isDemoMode ? 'skillhub.session.demo.v1' : `skillhub.session.api.v1:${apiBaseUrl}`;
const listeners = new Set<() => void>();

function isSession(value: unknown): value is Session {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<Session>;
  const user = candidate.user;
  return typeof candidate.token === 'string'
    && candidate.token.length > 0
    && candidate.token.startsWith('demo:') === isDemoMode
    && typeof candidate.expiresAt === 'string'
    && Number.isFinite(Date.parse(candidate.expiresAt))
    && Date.parse(candidate.expiresAt) > Date.now()
    && typeof user === 'object' && user !== null
    && typeof user.id === 'string'
    && typeof user.displayName === 'string'
    && typeof user.email === 'string'
    && typeof user.memberSince === 'string'
    && (user.university === null || typeof user.university === 'string')
    && typeof user.city === 'object' && user.city !== null
    && typeof user.city.id === 'number'
    && typeof user.city.name === 'string';
}

function readStored(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session: unknown = JSON.parse(raw);
    if (!isSession(session)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

let current: Session | null = readStored();

/** Framework-agnostic session store: the HTTP client and React both read from it. */
export const sessionStore = {
  get(): Session | null {
    return current;
  },
  set(session: Session | null): void {
    current = session;
    try {
      if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Private mode or blocked storage: the session still lives in memory for this tab.
    }
    listeners.forEach((listener) => listener());
  },
  updateUser(user: SessionUser): void {
    if (current) this.set({ ...current, user });
  },
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
