'use client';

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

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

export const AuthContext = createContext<AuthProviderContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchUser() {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3333/me', {
        credentials: 'include',
      });
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

{
  /**
  
  'use client';

import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';

type User = {
  id: number;
  username: string;
  email: string;
};

type AuthProviderContextValue = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthProviderContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, _setLoading] = useState<boolean>(false); // No async fetch, so loading is false

  const value = useMemo(
    () => ({
      user,
      loading,
      setUser,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
*/
}
