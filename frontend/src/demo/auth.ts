import { ApiError } from '@/shared/api/ApiError';
import { sessionStore } from '@/shared/auth/sessionStore';
import type { Session } from '@/shared/auth/sessionStore';
import type { SessionUser } from '@/shared/domain/types';
import { DEMO_CITIES } from './catalog';
import { checkAborted, copyUser, invalid, objectBody } from './requests';
import { DEMO_EMAIL, DEMO_PASSWORD, DEMO_USER_ID, demoDatabase, makeId, persistDemoData } from './state';
import type { DemoAccount, DemoCredential } from './state';

function createSession(account: DemoAccount): Session {
  // This credential is valid only for the local adapter; it cannot authenticate with the backend.
  return {
    token: `demo:${account.user.id}:${makeId()}`,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    user: copyUser(account.user),
  };
}

export function currentAccount(): DemoAccount {
  const session = sessionStore.get();
  const prefix = session && `demo:${session.user.id}:`;
  const account = session && demoDatabase().accounts.find((entry) => entry.user.id === session.user.id);
  if (!session || !prefix || !session.token.startsWith(prefix)
    || !Number.isFinite(Date.parse(session.expiresAt)) || Date.parse(session.expiresAt) <= Date.now() || !account) {
    sessionStore.set(null);
    throw new ApiError(401, 'Oturum gerekli', 'Demoyu kullanmak için tekrar giriş yap.');
  }
  return account;
}

function bytesHex(bytes: Uint8Array): string {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function passwordHash(password: string, saltHex: string, iterations: number): Promise<string> {
  if (!globalThis.crypto?.subtle) {
    throw new ApiError(503, 'Yerel kayıt kullanılamıyor', 'Bu tarayıcı yerel hesap için güvenli şifrelemeyi desteklemiyor. Demo hesabıyla giriş yapabilirsin.');
  }
  const salt = Uint8Array.from(saltHex.match(/.{2}/g) ?? [], (byte) => parseInt(byte, 16));
  const key = await globalThis.crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const hash = await globalThis.crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return bytesHex(new Uint8Array(hash));
}

async function createCredential(password: string): Promise<DemoCredential> {
  if (!globalThis.crypto?.subtle) {
    throw new ApiError(503, 'Yerel kayıt kullanılamıyor', 'Bu tarayıcı yerel hesap için güvenli şifrelemeyi desteklemiyor. Demo hesabıyla giriş yapabilirsin.');
  }
  const salt = bytesHex(globalThis.crypto.getRandomValues(new Uint8Array(16)));
  const iterations = 120_000;
  return { salt, iterations, hash: await passwordHash(password, salt, iterations) };
}

export async function login(body: unknown, signal?: AbortSignal): Promise<Session> {
  const request = objectBody(body);
  const email = typeof request.email === 'string' ? request.email.trim().toLowerCase() : '';
  const password = typeof request.password === 'string' ? request.password : '';
  if (!email || !password) invalid('E-posta ve şifreyi gir.');
  const account = demoDatabase().accounts.find((entry) => entry.user.email.toLowerCase() === email);
  let matches = false;
  if (account?.user.id === DEMO_USER_ID) matches = email === DEMO_EMAIL && password === DEMO_PASSWORD;
  else if (account?.credential) {
    matches = await passwordHash(password, account.credential.salt, account.credential.iterations) === account.credential.hash;
  }
  checkAborted(signal);
  if (!account || !matches) {
    throw new ApiError(401, 'Giriş yapılamadı', 'E-posta veya şifre yanlış. Bu demoda yalnızca bu tarayıcıda oluşturduğun hesaplar ve demo hesabı kullanılabilir.');
  }
  persistDemoData();
  return createSession(account);
}

export function profileFields(request: Record<string, unknown>): Pick<SessionUser, 'displayName' | 'city' | 'university'> {
  const errors: Record<string, string> = {};
  const displayName = typeof request.displayName === 'string' ? request.displayName.trim() : '';
  if (displayName.length < 2 || displayName.length > 40) errors.displayName = 'Ad soyad 2-40 karakter olmalı.';
  const city = DEMO_CITIES.find((entry) => entry.id === request.cityId);
  if (!city) errors.cityId = 'Şehir seçmelisin.';
  const university = typeof request.university === 'string' ? request.university.trim() : '';
  if (university.length > 120) errors.university = 'Üniversite adı çok uzun.';
  if (Object.keys(errors).length > 0 || !city) invalid('Bilgilerini kontrol edip tekrar dene.', errors);
  return { displayName, city: { id: city.id, name: city.name }, university: university || null };
}

export async function register(body: unknown, signal?: AbortSignal): Promise<Session> {
  const request = objectBody(body);
  const profile = profileFields(request);
  const email = typeof request.email === 'string' ? request.email.trim().toLowerCase() : '';
  const password = typeof request.password === 'string' ? request.password : '';
  const errors: Record<string, string> = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) errors.email = 'Geçerli bir e-posta gir.';
  if (password.length < 8 || password.length > 72) errors.password = 'Şifre 8-72 karakter olmalı.';
  if (Object.keys(errors).length > 0) invalid('Bilgilerini kontrol edip tekrar dene.', errors);
  if (demoDatabase().accounts.some((entry) => entry.user.email.toLowerCase() === email)) {
    throw new ApiError(409, 'Hesap zaten var', 'Bu e-posta bu tarayıcıdaki demoda kayıtlı.', { email: 'Bu e-posta zaten kullanılıyor.' });
  }
  const credential = await createCredential(password);
  checkAborted(signal);
  // Recheck after asynchronous hashing so two submissions cannot create duplicate accounts.
  if (demoDatabase().accounts.some((entry) => entry.user.email.toLowerCase() === email)) {
    throw new ApiError(409, 'Hesap zaten var', 'Bu e-posta bu tarayıcıdaki demoda kayıtlı.', { email: 'Bu e-posta zaten kullanılıyor.' });
  }
  const account: DemoAccount = {
    user: { id: makeId(), email, ...profile, memberSince: new Date().toISOString() },
    credential, bestScores: {}, attempts: [], badgeAwards: {},
  };
  demoDatabase().accounts.push(account);
  persistDemoData();
  return createSession(account);
}
