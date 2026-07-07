import { apiPost } from './api'

const TOKEN_KEY = 'odeon.auth.token'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return getToken() !== null
}

export type UserRole = 'CUSTOMER' | 'ORGANIZER' | 'STAFF'

type AuthResponse = { token: string }

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
  phoneNumber: string
  role: UserRole
  organizationName?: string
  inviteCode?: string
}

export function login(payload: LoginPayload): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/api/auth/login', payload)
}

export function register(payload: RegisterPayload): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/api/auth/register', payload)
}
