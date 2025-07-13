'use client';

import { createContext, use, useEffect, useMemo, useState } from 'react';

type User = {
  id: number;
  username: string;
  email: string;
};

type AuthProviderContextValue = {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const AuthContextProvider = createContext<AuthProviderContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchUser() {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3333/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      refresh: fetchUser,
    }),
    [user, loading],
  );

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
}

export function useAuth() {
  const context = use(AuthContextProvider);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
