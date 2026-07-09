// Base URL for the backend. Empty string keeps requests same-origin so the
// Vite dev proxy (see vite.config.ts) forwards /api to the Spring server.
const API_BASE = import.meta.env.VITE_API_URL ?? ''

// Mirrors the backend com.js.ticketingsystem.common.ApiError shape.
type ApiErrorBody = {
  status: number
  error: string
  message: string
  fieldErrors: Record<string, string>
}

export class ApiRequestError extends Error {
  status: number
  fieldErrors: Record<string, string>

  constructor(
    status: number,
    message: string,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

export function errorMessage(error: unknown): string {
  return error instanceof ApiRequestError
    ? error.message
    : 'Something went wrong. Please try again.'
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new ApiRequestError(0, 'Unable to reach the server. Please try again.')
  }

  const data = (await res.json().catch(() => null)) as ApiErrorBody | T | null

  if (!res.ok) {
    const err = data as ApiErrorBody | null
    throw new ApiRequestError(
      res.status,
      err?.message ?? 'Something went wrong. Please try again.',
      err?.fieldErrors ?? {},
    )
  }

  return data as T
}
