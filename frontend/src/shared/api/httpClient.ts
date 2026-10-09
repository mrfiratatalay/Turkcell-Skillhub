import { sessionStore } from '@/shared/auth/sessionStore';
import { ApiError } from './ApiError';

const BASE_URL = '/api/v1';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
}

async function toApiError(response: Response): Promise<ApiError> {
  try {
    const problem = await response.json();
    return new ApiError(response.status, problem.title ?? 'Hata', problem.detail ?? 'Bir şeyler ters gitti.',
      problem.errors ?? {});
  } catch {
    return new ApiError(response.status, 'Hata', 'Beklenmeyen bir hata oluştu.');
  }
}

async function request<T>(path: string, { method = 'GET', body, signal }: RequestOptions = {}): Promise<T> {
  const headers = new Headers({ Accept: 'application/json' });
  const token = sessionStore.get()?.token;
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (body !== undefined) headers.set('Content-Type', 'application/json');

  let response: Response;
  try {
    response = await fetch(BASE_URL + path, {
      method,
      headers,
      signal,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new ApiError(0, 'Bağlantı hatası', 'Sunucuya ulaşılamadı. Bağlantını kontrol edip tekrar dene.');
  }

  // An expired or revoked token ends the session; route guards redirect to the login page.
  if (response.status === 401 && token) sessionStore.set(null);
  if (!response.ok) throw await toApiError(response);
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const http = {
  get: <T>(path: string, signal?: AbortSignal) => request<T>(path, { signal }),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
  patch: <T>(path: string, body: unknown) => request<T>(path, { method: 'PATCH', body }),
};
