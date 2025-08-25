import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BACKEND_URL } from '@/utils/config';

export function useSignout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
          : null;

      if (token) {
        try {
          await fetch(`${BACKEND_URL}/auth/signout`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          });
        } catch (error) {
          console.log(error);
        }
      }

      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('remember_me');
        localStorage.removeItem('token_expires_at');
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('remember_me');
        sessionStorage.removeItem('token_expires_at');
      }

      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}
