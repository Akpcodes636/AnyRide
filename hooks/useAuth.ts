"use client";

interface AuthUser {
  userId: string;
  exp: number;
  firstname?: string;
  lastname?: string;
  name?: string;
}

export const useAuth = () => {
  if (typeof window === "undefined") {
    return { user: null, isAuthenticated: false };
  }

  const token = localStorage.getItem("access_token");

  if (!token) {
    return { user: null, isAuthenticated: false };
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    ) as AuthUser;

    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return { user: null, isAuthenticated: false };
    }

    return {
      user: payload,
      isAuthenticated: true,
    };
  } catch {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return { user: null, isAuthenticated: false };
  }
};
