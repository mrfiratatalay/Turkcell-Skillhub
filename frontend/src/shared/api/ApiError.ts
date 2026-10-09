/** An RFC 9457 problem returned by the API, or a network failure (status 0). */
export class ApiError extends Error {
  readonly status: number;
  readonly title: string;
  readonly fieldErrors: Record<string, string>;

  constructor(status: number, title: string, detail: string, fieldErrors: Record<string, string> = {}) {
    super(detail);
    this.status = status;
    this.title = title;
    this.fieldErrors = fieldErrors;
  }
}

export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return 'Beklenmeyen bir hata oluştu. Lütfen tekrar dene.';
}
