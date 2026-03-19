// "use client";

// interface AuthUser {
//   userId: string;
//   exp: number;
//   firstname?: string;
//   lastname?: string;
// }

// export const useAuth = () => {
//   if (typeof window === "undefined") {
//     return { user: null, isAuthenticated: false };
//   }

//   const token = localStorage.getItem("access_token");

//   if (!token) {
//     return { user: null, isAuthenticated: false };
//   }

//   try {
//     const payload = JSON.parse(atob(token.split(".")[1])) as AuthUser;

//     const isExpired = payload.exp * 1000 < Date.now();

//     if (isExpired) {
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");
//       return { user: null, isAuthenticated: false };
//     }

//     return {
//       user: payload,
//       isAuthenticated: true,
//     };

//   } catch {
//     return { user: null, isAuthenticated: false };
//   }
// };


interface AuthUser {
  userId: string;
  firstname?: string;
  lastname?: string;
  name?: string; // optional: firstname + lastname
}

interface UseAuthReturn {
  isAuthenticated: boolean;
  userName: string; // display name
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  if (!token) return { isAuthenticated: false, userName: "", logout: () => {} };

  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as AuthUser & { exp: number };
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("access_token");
      return { isAuthenticated: false, userName: "", logout: () => {} };
    }

    const userName = payload.name || `${payload.firstname || ""} ${payload.lastname || ""}`.trim();

    return {
      isAuthenticated: true,
      userName,
      logout: () => {
        localStorage.removeItem("access_token");
        window.location.href = "/"; // or router.push("/")
      },
    };
  } catch {
    localStorage.removeItem("access_token");
    return { isAuthenticated: false, userName: "", logout: () => {} };
  }
};