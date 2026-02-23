import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  RegisterPayload,
  RegisterResponse,
  VerifyOtpResponse,
  VerifyPinResponse,
  LoginPayload,
  LoginResponse,
  PhoneCheckResponse,
  PhoneCheckPayload,
  ResendOtpPayload,
  ResendOtpResponse,
  SetPinPayload,
  SetPinResponse,
  CreateRidePayload,
  ApiErrorResponse,
  RideType,
} from "@/types";
import { toast } from "sonner";
import { axiosAuth } from "@/config/axios";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";

// ──────────────────────────────────────────────────────────
// Helper: extract a human-readable error message from API errors
// ──────────────────────────────────────────────────────────
function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data;

    // The backend returns message as string or nested object
    if (typeof data.message === "string") return data.message;
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail) && data.detail[0]?.msg) return data.detail[0].msg;
    if (data.message?.message) return data.message.message;
    if (data.error) return data.error;
  }

  if (error instanceof Error) return error.message;

  return fallback;
}

// ──────────────────────────────────────────────────────────
// POST /api/v1/auth/phone/register
// ──────────────────────────────────────────────────────────
export const useRegister = () => {
  const router = useRouter();
  const { login } = useAuth();

  const handleRegister = async (data: RegisterPayload) => {
    const response = await axiosAuth.post<RegisterResponse>(
      "/api/v1/auth/phone/register",
      data
    );
    return response.data;
  };

  const mutation = useMutation<RegisterResponse, AxiosError, RegisterPayload>({
    mutationFn: handleRegister,
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful!");

      // If backend returns tokens on registration, log the user in
      if (data.data?.access_token) {
        login(data.data.access_token, data.data.refresh_token);
        router.push("/");
        return;
      }

      // Otherwise redirect to set-pin
      router.push("/set-pin");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Registration failed. Please try again."));
    },
  });

  return mutation;
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/auth/phone/check
// ──────────────────────────────────────────────────────────
export const usePhoneCheck = () => {
  const router = useRouter();

  const checkPhone = async (data: PhoneCheckPayload): Promise<PhoneCheckResponse> => {
    const response = await axiosAuth.post("/api/v1/auth/phone/check", data);
    return response.data;
  };

  return useMutation<PhoneCheckResponse, AxiosError, PhoneCheckPayload>({
    mutationFn: checkPhone,
    onSuccess: async (data, variables) => {
      const { phonenumber, role } = variables;

      // NEW USER → send OTP and go to verify
      if (!data.exists) {
        await axiosAuth.post("/api/v1/auth/phone/send-otp", {
          phonenumber,
          forgot_pin: false,
        });

        router.push(
          `/verify-otp?phone=${encodeURIComponent(phonenumber)}&role=${role}`
        );
        return;
      }

      // EXISTING USER WITH PIN → go to PIN entry
      if (data.exists && data.has_pin) {
        router.push(
          `/enter-pin?phone=${encodeURIComponent(phonenumber)}`
        );
        return;
      }

      // EXISTING USER WITHOUT PIN → send OTP and go to verify
      if (data.exists && !data.has_pin) {
        await axiosAuth.post("/api/v1/auth/phone/send-otp", {
          phonenumber,
          forgot_pin: false,
        });

        router.push(
          `/verify-otp?phone=${encodeURIComponent(phonenumber)}&role=${role}`
        );
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Could not verify phone number. Please try again."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/auth/phone/verify-otp/customer | /driver
// ──────────────────────────────────────────────────────────
export const useVerifyOtp = () => {
  const router = useRouter();
  const { login } = useAuth();

  const verifyOtp = async (data: {
    phonenumber: string;
    otp_code: string;
    role: "customer" | "driver";
  }): Promise<VerifyOtpResponse> => {
    const endpoint =
      data.role === "driver"
        ? "/api/v1/auth/phone/verify-otp/driver"
        : "/api/v1/auth/phone/verify-otp/customer";

    const response = await axiosAuth.post(endpoint, {
      phonenumber: data.phonenumber,
      otp_code: data.otp_code,
    });

    return response.data;
  };

  return useMutation<
    VerifyOtpResponse,
    AxiosError,
    { phonenumber: string; otp_code: string; role: "customer" | "driver" }
  >({
    mutationFn: verifyOtp,
    onSuccess: (data, variables) => {
      // Registration required — new user
      if (data.status === "registration_required") {
        router.push(
          `/register?token=${data.session_info}&phone=${variables.phonenumber}&role=${variables.role}`
        );
        return;
      }

      // Successful login (existing user)
      if (data.status === "success" && data.data) {
        login(data.data.access_token, data.data.refresh_token);
        toast.success("Welcome back!");
        router.push("/");
        return;
      }

      // Driver warning case (pending approval)
      if (data.status === "warning" && data.data) {
        login(data.data.access_token, data.data.refresh_token);
        toast.info(data.message || "Your driver account is pending approval.");
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "OTP verification failed. Please check and try again."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/auth/phone/verify-otp  (generic login)
// ──────────────────────────────────────────────────────────
export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (data: LoginPayload): Promise<LoginResponse> => {
    const response = await axiosAuth.post("/api/v1/auth/phone/verify-otp", data);
    return response.data;
  };

  const mutation = useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      login(data.data.access_token, data.data.refresh_token);
      toast.success("Login successful!");
      router.push("/");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Login failed. Please check your OTP and try again."));
    },
  });

  return mutation;
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/auth/phone/verify-pin
// ──────────────────────────────────────────────────────────
export const useVerifyPin = () => {
  const router = useRouter();
  const { login } = useAuth();

  const verifyPin = async (data: { phonenumber: string; pin: string }): Promise<VerifyPinResponse> => {
    const response = await axiosAuth.post("/api/v1/auth/phone/verify-pin", data);
    return response.data;
  };

  return useMutation<VerifyPinResponse, AxiosError, { phonenumber: string; pin: string }>({
    mutationFn: verifyPin,
    onSuccess: (data) => {
      if (data.data) {
        login(data.data.access_token, data.data.refresh_token);
        toast.success("Welcome back!");
        router.push("/");
      } else {
        toast.error(data.message || "PIN verification failed.");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Invalid PIN. Please try again."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/auth/phone/set-pin
// ──────────────────────────────────────────────────────────
export const useSetPin = () => {
  return useMutation<SetPinResponse, AxiosError, SetPinPayload>({
    mutationFn: async (payload) => {
      const token = localStorage.getItem("access_token");

      const response = await axiosAuth.post("/api/v1/auth/phone/set-pin", payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to set PIN. Please try again."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/auth/phone/send-otp  (resend)
// ──────────────────────────────────────────────────────────
  export const useResendOtp = () => {
    const resendOtpFn = async (data: ResendOtpPayload): Promise<ResendOtpResponse> => {
      const response = await axiosAuth.post("/api/v1/auth/phone/send-otp", data);
      return response.data;
    };

    return useMutation<ResendOtpResponse, AxiosError, ResendOtpPayload>({
      mutationFn: resendOtpFn,
      onSuccess: (data) => {
        toast.success(data.message || "OTP sent successfully!");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "Failed to resend OTP. Please try again."));
      },
    });
  };


export const useCreateRide = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createRide = async (payload: CreateRidePayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosAuth.post("/api/v1/rides/requests/", payload);
      console.log("Ride created successfully:", res.data);
      return res.data;
    } catch (err: unknown) {
      let message = "Failed to create ride";

      if (err instanceof AxiosError) {
        const data = err.response?.data as ApiErrorResponse | undefined;
        message = data?.detail ?? data?.message ?? message;
      }

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { createRide, loading, error };
};

export const useRideTypes = () => {
  return useQuery<RideType[], AxiosError>({
    queryKey: ["rideTypes"],
    queryFn: async () => {
      const response = await axiosAuth.get("/api/v1/rides/types");
      return response.data.data; // unwrap the nested array
    },
  });
};