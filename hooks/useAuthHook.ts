import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { EmailCheckPayload, EmailCheckResponse, ErrorResponse, PhonePayload, PhoneResponse, RegisterPayload, RegisterResponse } from "@/types";
import { toast } from "sonner";
import { EmailRoute } from "@/app/utils/Route";


export const useRegister = () => {
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleRegister = async (data: RegisterPayload) => {
    const response = await axios.post("/api/auth/register", data);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    RegisterPayload
  >({
    mutationFn: handleRegister,
    onSuccess: (data: RegisterResponse) => {
      toast.success("Otp Sent Successfully!");
      //   console.log(data);
      if (data.user) {
        const email = data.user.email;
            console.log("Redirecting to check-email page...");
        router.push(`${EmailRoute}?email=${encodeURIComponent(email)}`); // Redirect after successful registration
      }
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unknown error occurred.";
      toast.error(errorMessage);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};


export const useVerifyEmail = () => {
  const router = useRouter();

  const mutation = useMutation<
    EmailCheckResponse, // success type
    AxiosError<ErrorResponse>, // error type
    EmailCheckPayload
  >({
    mutationFn: async (payload: EmailCheckPayload) => {
      const response = await axios.get("/api/auth/verify", {
        params: { token: payload.token },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Email verified!");
      console.log("VERIFY RESPONSE:", data);
      localStorage.setItem("token", data.token);
      router.push("/enter-phone");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // ✅ safe access to error message
      const msg =
        error.response?.data?.error ||
        "Something went wrong during email verification.";
      toast.error(msg);
    },
  });

  return mutation;
};


export const usePhoneNumber = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: { phone: string }) => {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token in storage");
      }

      const response = await axios.post(
        "/api/auth/add-phone",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },

    onError: (error: any) => {
      console.error("PHONE MUTATION ERROR:", error);
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Failed to save phone number"
      );
    },

    onSuccess: (data, variables) => {
      // 1. Phone saved to DB. 
      // 2. NOW triggers OTP generation API.
      const token = localStorage.getItem("token");
      axios.post("/api/auth/otp", {}, {
          headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
          toast.success("OTP sent to your phone!");
          router.push(`/verify?phone=${encodeURIComponent(variables.phone)}`);
      })
      .catch((err) => {
          console.error("OTP send error:", err);
          // Still redirect, user can click "Resend" there
          toast.error("Phone saved, but failed to send OTP. Please resend.");
          router.push(`/verify?phone=${encodeURIComponent(variables.phone)}`);
      });
    },
  });
};

export const useVerifyOtp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: { code: string }) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token in storage");
  
        const response = await axios.post("/api/auth/verify-phone", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
    onSuccess: (data) => {
      toast.success("Phone verified successfully!");
      router.push("/select-role");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Verification failed");
    },
  });
};

export const useResendOtp = () => {
    return useMutation({
      mutationFn: async () => {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token");
    
          const response = await axios.post("/api/auth/otp", {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data;
      },
      onSuccess: () => {
        toast.success("OTP resent successfully!");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.error || "Failed to resend OTP");
      },
    });
  };

export const useSelectRole = () => {
    const router = useRouter();
  
    return useMutation({
      mutationFn: async (payload: { role: "passenger" | "driver" }) => {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token");
    
          const response = await axios.post("/api/auth/set-role", payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data;
      },
      onSuccess: () => {
        toast.success("Welcome to AnyRide!");
        router.push("/set-pin"); 
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.error || "Failed to set role");
      },
    });
  };

export const useLogin = () => {
  const router = useRouter();

  const handleLogin = async (data: { email: string }) => {
    const response = await axios.post("/api/auth/login", data);
    return response.data;
  };

  return useMutation({
    mutationFn: handleLogin,
    onSuccess: (data: any) => {
        toast.success("Magic link sent!");
        if (data.user) {
            const email = data.user.email;
            router.push(`${EmailRoute}?email=${encodeURIComponent(email)}`);
        }
    },
    onError: (error: any) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Login failed.";
      toast.error(errorMessage);
    },
  });
};

export const useSetPin = () => {
    const router = useRouter();
  
    return useMutation({
      mutationFn: async (payload: { pin: string }) => {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token");
    
          const response = await axios.post("/api/auth/set-pin", payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data;
      },
      // onError handled in component for custom UI
    });
};

export const useVerifyPin = () => {
    const router = useRouter();
  
    return useMutation({
      mutationFn: async (payload: { pin: string }) => {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token");
    
          const response = await axios.post("/api/auth/verify-pin", payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data;
      },
      onSuccess: () => {
        toast.success("Welcome back!");
        router.push("/request-ride"); 
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.error || "Invalid PIN");
      },
    });
};
