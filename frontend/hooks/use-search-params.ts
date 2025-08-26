import {
  useSearchParams as useNextSearchParams,
  useRouter,
} from "next/navigation";
import { useCallback } from "react";

type SetSearchParams = (params: Record<string, string | undefined>) => void;

export function useSearchParams() {
  const router = useRouter();
  const searchParams = useNextSearchParams();

  const get = useCallback(
    (key: string) => searchParams?.get(key) ?? undefined,
    [searchParams]
  );

  const set: SetSearchParams = useCallback(
    (params) => {
      if (!searchParams) return;
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });
      router.replace(`?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  return { get, set, all: searchParams };
}
