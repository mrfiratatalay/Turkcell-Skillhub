import type { SessionUser } from '@/shared/domain/types';

export interface Session {
  token: string;
  expiresAt: string;
  user: SessionUser;
}

const STORAGE_KEY = 'skillhub.session';
const listeners = new Set<() => void>();

function readStored(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Session;
    if (Date.parse(session.expiresAt) <= Date.now()) {
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
