import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token") ||
            sessionStorage.getItem("auth_token")
          : null;
      if (!token) return null;

      const response = await fetch(`api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            sessionStorage.removeItem("auth_token");
          }
        }
        return null;
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}
