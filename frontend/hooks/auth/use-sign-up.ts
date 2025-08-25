import { useMutation } from '@tanstack/react-query';

export function useSignUp() {
  return useMutation({
    mutationFn: async (payload: ISignUpPayLoad) => {
      const res = await fetch('/api/auth/sign-up', {
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

interface ISignUpPayLoad {
  username: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}
