export interface GResponse<T> {
  statusCode?: number;
  message?: string | string[] | null;
  data?: T;
  error?: Error | undefined | null;
}
