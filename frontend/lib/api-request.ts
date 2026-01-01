import type { AxiosError } from 'axios';
import api from '@/services/http.service';

/**
 * Generic reusable API request function
 *
 * @param method - HTTP method (e.g. 'get', 'post', 'put', 'delete')
 * @param endpoint - API endpoint string (e.g. '/auth/sign-in')
 * @param data - Optional request body or params
 */
export async function apiRequest<TResponse, TData = unknown>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  endpoint: string,
  data?: TData,
): Promise<TResponse> {
  try {
    const res = await api.request<TResponse>({
      method,
      url: endpoint,
      ...(data ? { data } : {}),
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || err.message);
  }
}
