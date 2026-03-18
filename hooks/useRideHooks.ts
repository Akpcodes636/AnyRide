import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosAuth } from "@/config/axios";
import {
  FareEstimateRequest,
  FareEstimateResponse,
  RideRequestCreate,
  RideRequestOut,
  RideRequestListResponse,
  FareUpdate,
  SavedLocationCreate,
  SavedLocationOut,
  RideType,
  Notification,
  NotificationListResponse,
  UnreadCountResponse,
  WalletSetupRequest,
  WalletLoginRequest,
  WalletStatusResponse,
  WalletBalanceResponse,
  CustomerCard,
  TransferRequest,
  TopUpRequest,
  PublishableKeyResponse,
  PaymentIntentRequest,
  PaymentSimulateRequest,
} from "@/types";

// ──────────────────────────────────────────────────────────
// Helper: extract error message from API
// ──────────────────────────────────────────────────────────
function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data;
    if (typeof data.message === "string") return data.message;
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail) && data.detail[0]?.msg) return data.detail[0].msg;
    if (data.error) return data.error;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

// ──────────────────────────────────────────────────────────
// POST /api/v1/rides/estimate-fare
// ──────────────────────────────────────────────────────────
export const useEstimateFare = () => {
  return useMutation<FareEstimateResponse, AxiosError, FareEstimateRequest>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/rides/estimate-fare", data);
      return res.data;
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to estimate fare."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// GET /api/v1/rides/types
// ──────────────────────────────────────────────────────────
export const useRideTypes = () => {
  return useQuery<RideType[], AxiosError>({
    queryKey: ["rideTypes"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/rides/types");
      return res.data.data;
    },
  });
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/rides/requests/
// ──────────────────────────────────────────────────────────
export const useCreateRideRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<RideRequestOut, AxiosError, RideRequestCreate>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/rides/requests/", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Ride request created!");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create ride request."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// GET /api/v1/rides/requests/
// ──────────────────────────────────────────────────────────
export const useRideRequests = (skip = 0, limit = 100) => {
  return useQuery<RideRequestListResponse, AxiosError>({
    queryKey: ["rideRequests", skip, limit],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/rides/requests/", {
        params: { skip, limit },
      });
      return res.data;
    },
  });
};

// ──────────────────────────────────────────────────────────
// GET /api/v1/rides/requests/{request_id}
// ──────────────────────────────────────────────────────────
export const useRideRequestById = (requestId: number | null) => {
  return useQuery<RideRequestOut, AxiosError>({
    queryKey: ["rideRequest", requestId],
    queryFn: async () => {
      const res = await axiosAuth.get(`/api/v1/rides/requests/${requestId}`);
      return res.data;
    },
    enabled: !!requestId,
  });
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/rides/requests/{request_id}/cancel
// ──────────────────────────────────────────────────────────
export const useCancelRideRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { requestId: number; reason?: string }>({
    mutationFn: async ({ requestId, reason }) => {
      await axiosAuth.post(`/api/v1/rides/requests/${requestId}/cancel`, null, {
        params: reason ? { reason } : undefined,
      });
    },
    onSuccess: () => {
      toast.success("Ride request cancelled.");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to cancel ride request."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// PUT /api/v1/rides/requests/{request_id}/fare
// ──────────────────────────────────────────────────────────
export const useIncreaseFare = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { requestId: number; fareUpdate: FareUpdate }>({
    mutationFn: async ({ requestId, fareUpdate }) => {
      await axiosAuth.put(`/api/v1/rides/requests/${requestId}/fare`, fareUpdate);
    },
    onSuccess: () => {
      toast.success("Fare updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update fare."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// GET /api/v1/users/me/locations
// ──────────────────────────────────────────────────────────
export const useSavedLocations = () => {
  return useQuery<SavedLocationOut[], AxiosError>({
    queryKey: ["savedLocations"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/users/me/locations");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/users/me/locations
// ──────────────────────────────────────────────────────────
export const useAddSavedLocation = () => {
  const queryClient = useQueryClient();

  return useMutation<SavedLocationOut, AxiosError, SavedLocationCreate>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/users/me/locations", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Location saved!");
      queryClient.invalidateQueries({ queryKey: ["savedLocations"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to save location."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// DELETE /api/v1/users/me/locations/{location_id}
// ──────────────────────────────────────────────────────────
export const useDeleteSavedLocation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (locationId) => {
      await axiosAuth.delete(`/api/v1/users/me/locations/${locationId}`);
    },
    onSuccess: () => {
      toast.success("Location deleted.");
      queryClient.invalidateQueries({ queryKey: ["savedLocations"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete location."));
    },
  });
};


export const useAcceptRideRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (requestId: number) => {
      await axiosAuth.post(`/api/v1/rides/requests/${requestId}/accept`);
    },
    onSuccess: () => {
      toast.success("Ride accepted!");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to accept ride request."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/rides/requests/{request_id}/confirm
// ──────────────────────────────────────────────────────────
// export const useConfirmRideRequest = () => {
//   const queryClient = useQueryClient();

//   return useMutation<void, AxiosError, number>({
//     mutationFn: async (requestId: number) => {
//       await axiosAuth.post(`/api/v1/rides/requests/${requestId}/confirm`);
//     },
//     onSuccess: () => {
//       toast.success("Ride confirmed!");
//       queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
//     },
//     onError: (error) => {
//       toast.error(getErrorMessage(error, "Failed to confirm ride request."));
//     },
//   });
// };

export const useConfirmRideRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { requestId: number; rideId: number }>({
    mutationFn: async ({ requestId, rideId }) => {
      await axiosAuth.post(`/api/v1/rides/requests/${requestId}/confirm`, null, {
        params: { ride_id: rideId }, // query parameter
      });
    },
    onSuccess: () => {
      toast.success("Ride confirmed!");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to confirm ride request."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// POST /api/v1/rides/requests/{request_id}/reject
// ──────────────────────────────────────────────────────────
export const useRejectRideRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { requestId: number; reason?: string; driver_id: number }>({
    mutationFn: async ({ requestId, reason, driver_id }) => {
      await axiosAuth.post(`/api/v1/rides/requests/${requestId}/reject`, {
        reason,
        driver_id
      });
    },
    onSuccess: () => {
      toast.success("Ride request rejected.");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to reject ride request."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// Legacy endpoints for backward compatibility
// ──────────────────────────────────────────────────────────
export const useAcceptRideRequestLegacy = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (requestId: number) => {
      await axiosAuth.post(`/ride-requests/${requestId}/accept`);
    },
    onSuccess: () => {
      toast.success("Ride accepted!");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to accept ride request."));
    },
  });
};

export const useConfirmRideRequestLegacy = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (requestId: number) => {
      await axiosAuth.post(`/ride-requests/${requestId}/confirm`);
    },
    onSuccess: () => {
      toast.success("Ride confirmed!");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to confirm ride request."));
    },
  });
};

export const useRejectRideRequestLegacy = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { requestId: number; reason?: string; driver_id: number }>({
    mutationFn: async ({ requestId, reason, driver_id }) => {
      await axiosAuth.post(`/ride-requests/${requestId}/reject`, {
        reason,
        driver_id
      });
    },
    onSuccess: () => {
      toast.success("Ride request rejected.");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to reject ride request."));
    },
  });
};

export const useCancelRideRequestLegacy = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { requestId: number; reason?: string }>({
    mutationFn: async ({ requestId, reason }) => {
      await axiosAuth.post(`/ride-requests/${requestId}/cancel`, { reason });
    },
    onSuccess: () => {
      toast.success("Ride request cancelled.");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to cancel ride request."));
    },
  });
};

export const useIncreaseFareLegacy = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { requestId: number; fareUpdate: FareUpdate }>({
    mutationFn: async ({ requestId, fareUpdate }) => {
      await axiosAuth.put(`/ride-requests/${requestId}/fare`, fareUpdate);
    },
    onSuccess: () => {
      toast.success("Fare updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["rideRequests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update fare."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// Notification Hooks
// ──────────────────────────────────────────────────────────

// GET /api/v1/notifications/
export const useNotifications = () => {
  return useQuery<NotificationListResponse, AxiosError>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/notifications/");
      return res.data;
    },
  });
};

// GET /api/v1/notifications/unread-count
export const useUnreadCount = () => {
  return useQuery<UnreadCountResponse, AxiosError>({
    queryKey: ["unreadCount"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/notifications/unread-count");
      return res.data;
    },
  });
};

// GET /api/v1/notifications/{notification_id}
export const useNotification = (id: number) => {
  return useQuery<Notification, AxiosError>({
    queryKey: ["notification", id],
    queryFn: async () => {
      const res = await axiosAuth.get(`/api/v1/notifications/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

// DELETE /api/v1/notifications/{notification_id}
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (id: number) => {
      await axiosAuth.delete(`/api/v1/notifications/${id}`);
    },
    onSuccess: () => {
      toast.success("Notification deleted.");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete notification."));
    },
  });
};

// PATCH /api/v1/notifications/{notification_id}/read
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (id: number) => {
      await axiosAuth.patch(`/api/v1/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to mark notification as read."));
    },
  });
};

// POST /api/v1/notifications/mark-all-read
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      await axiosAuth.post("/api/v1/notifications/mark-all-read");
    },
    onSuccess: () => {
      toast.success("All notifications marked as read.");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to mark all notifications as read."));
    },
  });
};

// ──────────────────────────────────────────────────
// Wallet Hooks
// ──────────────────────────────────────────────────

// POST /api/v1/wallets/setup
export const useSetupWallet = () => {
  const queryClient = useQueryClient();

  return useMutation<WalletStatusResponse, AxiosError, WalletSetupRequest>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/wallets/setup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Wallet setup successfully!");
      queryClient.invalidateQueries({ queryKey: ["walletStatus"] });
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to setup wallet."));
    },
  });
};

// POST /api/v1/wallets/login
export const useLoginWallet = () => {
  const queryClient = useQueryClient();

  return useMutation<WalletStatusResponse, AxiosError, WalletLoginRequest>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/wallets/login", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Wallet logged in successfully!");
      queryClient.invalidateQueries({ queryKey: ["walletStatus"] });
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to login to wallet."));
    },
  });
};

// GET /api/v1/wallets/status
export const useWalletStatus = () => {
  return useQuery<WalletStatusResponse, AxiosError>({
    queryKey: ["walletStatus"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/wallets/status");
      return res.data;
    },
  });
};

// GET /api/v1/wallets/balance
export const useWalletBalance = () => {
  return useQuery<WalletBalanceResponse, AxiosError>({
    queryKey: ["walletBalance"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/wallets/balance");
      return res.data;
    },
  });
};

// GET /api/v1/wallets/card
export const useCustomerCard = () => {
  return useQuery<CustomerCard, AxiosError>({
    queryKey: ["customerCard"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/wallets/card");
      return res.data;
    },
  });
};

// POST /api/v1/wallets/transfer
export const useTransferFunds = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, TransferRequest>({
    mutationFn: async (data) => {
      await axiosAuth.post("/api/v1/wallets/transfer", data);
    },
    onSuccess: () => {
      toast.success("Transfer completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to transfer funds."));
    },
  });
};

// POST /api/v1/wallets/topup
export const useTopUpWallet = () => {
  const queryClient = useQueryClient();

  return useMutation<WalletBalanceResponse, AxiosError, TopUpRequest>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/wallets/topup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Wallet topped up successfully!");
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to top up wallet."));
    },
  });
};

// GET /api/v1/wallets/payment/publishable-key
export const usePublishableKey = () => {
  return useQuery<PublishableKeyResponse, AxiosError>({
    queryKey: ["publishableKey"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/wallets/payment/publishable-key");
      return res.data;
    },
  });
};

// POST /api/v1/wallets/payment/create-intent
export const useCreatePaymentIntent = () => {
  const queryClient = useQueryClient();

  return useMutation<PaymentResponse, AxiosError, PaymentIntentRequest>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/wallets/payment/create-intent", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Payment intent created!");
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create payment intent."));
    },
  });
};

// GET /api/v1/wallets/payment/intent/{payment_intent_id}
export const usePaymentIntent = (id: string) => {
  return useQuery<PaymentResponse, AxiosError>({
    queryKey: ["paymentIntent", id],
    queryFn: async () => {
      const res = await axiosAuth.get(`/api/v1/wallets/payment/intent/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

// POST /api/v1/wallets/payment/simulate
export const useSimulatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, PaymentSimulateRequest>({
    mutationFn: async (data) => {
      await axiosAuth.post("/api/v1/wallets/payment/simulate", data);
    },
    onSuccess: () => {
      toast.success("Payment simulated successfully!");
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
      queryClient.invalidateQueries({ queryKey: ["paymentIntent"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to simulate payment."));
    },
  });
};