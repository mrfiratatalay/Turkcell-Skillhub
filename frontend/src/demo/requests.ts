import { ApiError } from '@/shared/api/ApiError';
import type { SessionUser } from '@/shared/domain/types';

/** Request parsing helpers shared by every demo endpoint; failures mirror the API's error contract. */
export function invalid(detail: string, fields: Record<string, string> = {}): never {
  throw new ApiError(400, 'Geçersiz bilgi', detail, fields);
}

export function objectBody(body: unknown): Record<string, unknown> {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) invalid('Gönderilen bilgiler okunamadı.');
  return body as Record<string, unknown>;
}

export function checkAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw new DOMException('İstek iptal edildi.', 'AbortError');
}

export function queryInteger(params: URLSearchParams, key: string, fallback: number, min: number, max: number): number {
  const raw = params.get(key);
  if (raw === null) return fallback;
  const value = Number(raw);
  if (!/^\d+$/.test(raw) || !Number.isInteger(value) || value < min || value > max) invalid('İstek parametreleri geçersiz.');
  return value;
}

export function copyUser(user: SessionUser): SessionUser {
  return { ...user, city: { ...user.city } };
}
