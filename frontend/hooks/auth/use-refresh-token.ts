import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BACKEND_URL } from '@/utils/config';

export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (extendRememberMe: boolean = false) => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
          : null;
      if (!token) throw new Error('No token available');

      const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ extendRememberMe }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      const rememberMe =
        typeof window !== 'undefined'
          ? localStorage.getItem('remember_me') === 'true' ||
            sessionStorage.getItem('remember_me') === 'true'
          : false;

      const storage =
        typeof window !== 'undefined' ? (rememberMe ? localStorage : sessionStorage) : null;
      if (storage) {
        storage.setItem('auth_token', data.token);
        if (data.expiresAt) {
          storage.setItem('token_expires_at', data.expiresAt);
        }
      }

      queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      return data;
    },
  });
}
