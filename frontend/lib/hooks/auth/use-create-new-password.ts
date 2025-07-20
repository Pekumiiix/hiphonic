import { useMutation } from '@tanstack/react-query';

export function useCreateNewPassword() {
  return useMutation({
    mutationFn: async (payload: ISignUpPayLoad) => {
      const res = await fetch('/api/auth/create-new-password', {
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
  token: string;
  newPassword: string;
}
