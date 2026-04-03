import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosAuth } from "@/config/axios";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";

// ──────────────────────────────────────────────────────────
// Helper: extract error message from API
// ──────────────────────────────────────────────────────────
const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data;
    if (typeof data.message === "string") return data.message;
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail) && data.detail[0]?.msg) return data.detail[0].msg;
    if (data.message?.message) return data.message.message;
    if (data.error) return data.error;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};

// ──────────────────────────────────────────────────────────
// AUTHENTICATION TYPES
// ──────────────────────────────────────────────────────────
export interface RegisterCustomerPayload {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email?: string;
  password?: string;
}

export interface RegisterDriverPayload {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email?: string;
  password?: string;
}

export interface LoginCustomerPayload {
  phonenumber: string;
  password?: string;
}

export interface LoginDriverPayload {
  phonenumber: string;
  password?: string;
}

export interface PhoneAuthPayload {
  phonenumber: string;
  role: "customer" | "driver";
}

export interface OtpVerificationPayload {
  phonenumber: string;
  otp_code: string;
  role: "customer" | "driver";
}

export interface PinVerificationPayload {
  phonenumber: string;
  pin: string;
}

export interface PinSetupPayload {
  phonenumber: string;
  pin: string;
}

// ──────────────────────────────────────────────────────────
// CUSTOMER REGISTRATION & LOGIN
// ──────────────────────────────────────────────────────────

// POST /api/v1/auth/register/customer
export const useRegisterCustomer = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation<any, AxiosError, RegisterCustomerPayload>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/register/customer", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Customer registration successful!");
      
      // If tokens are returned, log the user in
      if (data.access_token && data.refresh_token) {
        login(data.access_token, data.refresh_token);
        router.push("/");
      } else {
        // Otherwise redirect to login
        router.push("/login");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Customer registration failed. Please try again."));
    },
  });
};

// POST /api/v1/auth/login/customer
export const useLoginCustomer = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation<any, AxiosError, LoginCustomerPayload>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/login/customer", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.access_token && data.refresh_token) {
        login(data.access_token, data.refresh_token);
        toast.success("Welcome back!");
        router.push("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Customer login failed. Please check your credentials."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// DRIVER REGISTRATION & LOGIN
// ──────────────────────────────────────────────────────────

// POST /api/v1/auth/register/driver
export const useRegisterDriver = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation<any, AxiosError, RegisterDriverPayload>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/register/driver", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Driver registration successful!");
      
      // If tokens are returned, log the user in
      if (data.access_token && data.refresh_token) {
        login(data.access_token, data.refresh_token);
        router.push("/drivers/onboarding");
      } else {
        // Otherwise redirect to login
        router.push("/login");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Driver registration failed. Please try again."));
    },
  });
};

// POST /api/v1/auth/login/driver
export const useLoginDriver = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation<any, AxiosError, LoginDriverPayload>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/login/driver", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.access_token && data.refresh_token) {
        login(data.access_token, data.refresh_token);
        toast.success("Welcome back, driver!");
        router.push("/drivers");
      } else {
        toast.error("Login failed. Please try again.");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Driver login failed. Please check your credentials."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// PHONE AUTHENTICATION
// ──────────────────────────────────────────────────────────

// POST /api/v1/auth/phone/send-otp
export const useSendOtp = () => {
  return useMutation<any, AxiosError, PhoneAuthPayload>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/phone/send-otp", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "OTP sent successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send OTP. Please try again."));
    },
  });
};

// POST /api/v1/auth/phone/check
export const useCheckPhone = () => {
  return useMutation<any, AxiosError, PhoneAuthPayload>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/phone/check", data);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data.exists) {
        toast.info(data.message || "Account exists. Please login.");
      } else {
        toast.success(data.message || "Phone number available for registration.");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to check phone number."));
    },
  });
};

// POST /api/v1/auth/phone/verify-otp/customer
export const useVerifyCustomerOtp = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation<any, AxiosError, OtpVerificationPayload>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/phone/verify-otp/customer", data);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data.status === "success" && data.access_token) {
        login(data.access_token, data.refresh_token);
        toast.success("Login successful!");
        router.push("/");
      } else if (data.status === "registration_required") {
        toast.info("Please complete your registration.");
        router.push(`/register/customer?phone=${variables.phonenumber}`);
      } else {
        toast.error("Verification failed. Please try again.");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "OTP verification failed."));
    },
  });
};

// POST /api/v1/auth/phone/verify-otp/driver
export const useVerifyDriverOtp = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation<any, AxiosError, OtpVerificationPayload>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/phone/verify-otp/driver", data);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data.status === "success" && data.access_token) {
        login(data.access_token, data.refresh_token);
        toast.success("Login successful!");
        router.push("/drivers");
      } else if (data.status === "registration_required") {
        toast.info("Please complete your registration.");
        router.push(`/register/driver?phone=${variables.phonenumber}`);
      } else if (data.status === "pending_verification") {
        login(data.access_token, data.refresh_token);
        toast.info("Your driver account is pending verification.");
        router.push("/drivers/verification");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "OTP verification failed."));
    },
  });
};

// POST /api/v1/auth/phone/verify-otp (generic)
export const useVerifyOtp = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation<any, AxiosError, OtpVerificationPayload>({
    mutationFn: async (data) => {
      const endpoint = data.role === "customer" 
        ? "/api/v1/auth/phone/verify-otp/customer"
        : "/api/v1/auth/phone/verify-otp/driver";
      
      const res = await axiosAuth.post(endpoint, {
        phonenumber: data.phonenumber,
        otp_code: data.otp_code,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data.status === "success" && data.access_token) {
        login(data.access_token, data.refresh_token);
        toast.success("Login successful!");
        
        // Redirect based on role
        if (variables.role === "driver") {
          router.push("/drivers");
        } else {
          router.push("/");
        }
      } else if (data.status === "registration_required") {
        toast.info("Please complete your registration.");
        const registerPath = variables.role === "driver" ? "/register/driver" : "/register/customer";
        router.push(`${registerPath}?phone=${variables.phonenumber}`);
      } else if (data.status === "pending_verification") {
        login(data.access_token, data.refresh_token);
        toast.info("Your account is pending verification.");
        router.push("/drivers/verification");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "OTP verification failed."));
    },
  });
};

// POST /api/v1/auth/phone/set-pin
export const useSetPin = () => {
  const router = useRouter();

  return useMutation<any, AxiosError, PinSetupPayload>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/phone/set-pin", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("PIN set successfully!");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to set PIN. Please try again."));
    },
  });
};

// POST /api/v1/auth/phone/verify-pin
export const useVerifyPin = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation<any, AxiosError, PinVerificationPayload>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/phone/verify-pin", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.status === "success" && data.access_token) {
        login(data.access_token, data.refresh_token);
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(data.message || "Invalid PIN. Please try again.");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "PIN verification failed."));
    },
  });
};

// POST /api/v1/auth/phone/reset-pin
export const useResetPin = () => {
  const router = useRouter();

  return useMutation<any, AxiosError, { phonenumber: string; otp_code: string; new_pin: string }>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/auth/phone/reset-pin", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success("PIN reset successfully!");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to reset PIN.");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "PIN reset failed."));
    },
  });
};

// POST /api/v1/auth/refresh
export const useRefreshToken = () => {
  const { login } = useAuth();

  return useMutation<any, AxiosError, { refresh_token: string }>({
    mutationFn: async ({ refresh_token }) => {
      const res = await axiosAuth.post("/api/v1/auth/refresh", { refresh_token });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.access_token) {
        login(data.access_token, data.refresh_token);
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Token refresh failed. Please login again."));
    },
  });
};

// POST /api/v1/auth/logout
export const useLogout = () => {
  const router = useRouter();
  const { logout } = useAuth();

  return useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      await axiosAuth.post("/api/v1/auth/logout");
    },
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully!");
      router.push("/login");
    },
    onError: (error) => {
      // Even if logout fails on server, clear local state
      logout();
      router.push("/login");
    },
  });
};

// ──────────────────────────────────────────────────────────
// USER MODE MANAGEMENT
// ──────────────────────────────────────────────────────────

export interface UserMode {
  isCustomer: boolean;
  isDriver: boolean;
  isAdmin: boolean;
  verificationStatus?: 'not_started' | 'pending' | 'verified' | 'rejected';
}

export const useUserMode = () => {
  const { user, isAuthenticated } = useAuth();

  return useQuery<UserMode, AxiosError>({
    queryKey: ["userMode"],
    queryFn: async () => {
      if (!isAuthenticated || !user) {
        return {
          isCustomer: false,
          isDriver: false,
          isAdmin: false,
        };
      }

      try {
        const res = await axiosAuth.get("/api/v1/users/me");
        const userData = res.data;
        
        return {
          isCustomer: userData.is_customer || false,
          isDriver: userData.is_driver || false,
          isAdmin: userData.is_admin || false,
          verificationStatus: userData.verification_status,
        };
      } catch (error) {
        // If we can't fetch user data, return default mode
        return {
          isCustomer: false,
          isDriver: false,
          isAdmin: false,
        };
      }
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// ──────────────────────────────────────────────────────────
// AUTHENTICATION STATE HOOK
// ──────────────────────────────────────────────────────────

export const useAuthState = () => {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { data: userMode, isLoading: isModeLoading } = useUserMode();

  useEffect(() => {
    if (!isModeLoading) {
      setIsLoading(false);
    }
  }, [isModeLoading]);

  return {
    isAuthenticated,
    user,
    userMode,
    isLoading: isLoading || isModeLoading,
    canAccessCustomerFeatures: isAuthenticated && userMode?.isCustomer,
    canAccessDriverFeatures: isAuthenticated && userMode?.isDriver && userMode?.verificationStatus === 'verified',
    canAccessAdminFeatures: isAuthenticated && userMode?.isAdmin,
    needsDriverVerification: isAuthenticated && userMode?.isDriver && userMode?.verificationStatus !== 'verified',
  };
};
