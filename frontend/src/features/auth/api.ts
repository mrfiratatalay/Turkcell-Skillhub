import { useMutation, useQuery } from '@tanstack/react-query';
import { http } from '@/shared/api/httpClient';
import { queryKeys } from '@/shared/api/queryKeys';
import type { Session } from '@/shared/auth/sessionStore';
import type { CityRef } from '@/shared/domain/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  displayName: string;
  cityId: number;
  university: string;
}

export const DEMO_CREDENTIALS: LoginRequest = { email: 'demo@skillhub.dev', password: 'gece2025' };

export const useLogin = () => useMutation({ mutationFn: (body: LoginRequest) => http.post<Session>('/auth/login', body) });

export const useRegister = () =>
  useMutation({ mutationFn: (body: RegisterRequest) => http.post<Session>('/auth/register', body) });

export const useCities = () =>
  useQuery({ queryKey: queryKeys.cities, queryFn: () => http.get<CityRef[]>('/cities'), staleTime: Infinity });
