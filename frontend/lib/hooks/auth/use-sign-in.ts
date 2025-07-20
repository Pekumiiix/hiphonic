import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ISignInPayLoad) => {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      const storage =
        typeof window !== 'undefined' ? (payload.rememberMe ? localStorage : sessionStorage) : null;
      if (storage) {
        storage.setItem('auth_token', data.token);
        storage.setItem('remember_me', (payload.rememberMe ?? false).toString());
        if (data.expiresAt) {
          storage.setItem('token_expires_at', data.expiresAt);
        }
      }

      queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      return data;
    },
  });
}

interface ISignInPayLoad {
  email: string;
  password: string;
  rememberMe?: boolean;
}
