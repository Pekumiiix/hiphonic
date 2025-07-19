import { useMutation } from '@tanstack/react-query';

export function useSignIn() {
  return useMutation({
    mutationFn: async (payload: ISignInPayLoad) => {
      const res = await fetch('/api/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    },
  });
}

interface ISignInPayLoad {
  email: string;
  password: string;
  rememberMe?: boolean;
}
