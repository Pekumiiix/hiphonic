import { useMutation } from '@tanstack/react-query';

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (payload: ISignInPayLoad) => {
      const res = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
  token: string;
}
