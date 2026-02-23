"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* ================= TYPES ================= */

interface AuthUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber?: string;
  profile_image_url?: string;
}

interface DecodedToken {
  userId: number;
  exp: number;
}

interface AuthContextType {
  user: AuthUser | null;
  userName: string;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= HELPERS ================= */

function decodeToken(token: string): DecodedToken | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.exp * 1000 < Date.now()) return null;

    const sub = JSON.parse(payload.sub);

    return {
      userId: sub.userid,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

async function fetchUserProfile(userId: number, token: string): Promise<AuthUser> {
  const res = await fetch(
    `https://anyride.techenex.online/api/v1/users/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch user profile");

  const json = await res.json();
  return json.data;
}

function getUserName(user: AuthUser | null): string {
  if (!user) return "";
  return user.firstname || "My Account";
}

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  /* ===== LOGOUT (declare before useEffect) ===== */
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  /* ===== LOAD USER ON APP START ===== */
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const decoded = decodeToken(token);
      if (!decoded) {
        logout();
        return;
      }

      try {
        const profile = await fetchUserProfile(decoded.userId, token);
        setUser(profile);
      } catch {
        logout();
      }
    };

    loadUser();
  }, []);

  /* ===== LOGIN ===== */
  const login = async (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    const decoded = decodeToken(accessToken);
    if (!decoded) return;

    const profile = await fetchUserProfile(decoded.userId, accessToken);
    setUser(profile);
  };

  /* ===== PROVIDER RETURN ===== */
  return (
    <AuthContext.Provider
      value={{
        user,
        userName: getUserName(user),
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};