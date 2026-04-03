import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import axiosAuth from "@/lib/axiosAuth";

import { AxiosError } from "axios";
import { 
  Vehicle, 
  VehicleCreateRequest, 
  VehicleUpdateRequest,
  Review, 
  ReviewCreateRequest,
  DriverDocument,
  DocumentUploadRequest,
  ActiveRide,
  NegotiationCreateRequest,
  NegotiationAcceptRequest,
  Transaction,
  TransferRequest,
  TopUpRequest,
  WalletBalanceResponse,
  CustomerCard,
  PaymentIntentRequest,
  PaymentSimulateRequest,
  Notification,
  NotificationListResponse,
  UnreadCountResponse,
  SavedLocationOut,
  RideRequestOut,
  RideRequestListResponse,
  FareEstimateRequest,
  FareEstimateResponse,
  RideType,
  RideTypesResponse,
  RideRequestCreate,
  FareUpdate,
  SavedLocationCreate,
  WalletSetupRequest,
  WalletLoginRequest,
  WalletStatusResponse,
  PublishableKeyResponse,
  RideReview,
  RideReviewsResponse
} from "@/types";
import { toast } from "sonner";
import { axiosAuth } from "@/config/axios";

// ──────────────────────────────────────────────────────────
// Helper: extract error message from API
// ──────────────────────────────────────────────────────────
const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as AxiosError;
    const data = axiosError.response?.data as any;
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.detail === "string") return data.detail;
    if (Array.isArray(data?.detail) && data.detail[0]?.msg) return data.detail[0].msg;
    if (data?.error) return data.error;
  }
  if (error instanceof Error) return error.message;
  return defaultMessage;
};

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

// GET /api/v1/wallets/transactions
export const useTransactionHistory = () => {
  return useQuery<Transaction[], AxiosError>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/wallets/transactions");
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

// ──────────────────────────────────────────────────
// Driver Ride Lifecycle Hooks
// ──────────────────────────────────────────────────

// POST /api/v1/rides/{id}/arrived
// ──────────────────────────────────────────────────
export const useDriverArrived = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { rideId: number }>({
    mutationFn: async ({ rideId }) => {
      await axiosAuth.post(`/api/v1/rides/${rideId}/arrived`);
    },
    onSuccess: () => {
      toast.success("Driver has arrived!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to mark arrival."));
    },
  });
};

// POST /api/v1/rides/{id}/start
// ──────────────────────────────────────────────────
export const useStartTrip = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { rideId: number }>({
    mutationFn: async ({ rideId }) => {
      await axiosAuth.post(`/api/v1/rides/${rideId}/start`);
    },
    onSuccess: () => {
      toast.success("Trip started!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to start trip."));
    },
  });
};

// POST /api/v1/rides/{id}/complete
// ──────────────────────────────────────────────────
export const useCompleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { rideId: number; total_price?: number; duration_minutes?: number }>({
    mutationFn: async ({ rideId, total_price, duration_minutes }) => {
      await axiosAuth.post(`/api/v1/rides/${rideId}/complete`, {
        total_price,
        duration_minutes,
      });
    },
    onSuccess: () => {
      toast.success("Trip completed successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to complete trip."));
    },
  });
};

// GET /api/v1/rides/active/{ride_id}
// ──────────────────────────────────────────────────
export const useActiveRide = () => {
  return useQuery<any, AxiosError>({
    queryKey: ["activeRide"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/rides/active");
      return res.data;
    },
  });
};

// POST /api/v1/rides/negotiations/{request_id}/negotiations
// ──────────────────────────────────────────────────
export const useCreateNegotiation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, { request_id: number; negotiation_offer: string }>({
    mutationFn: async ({ request_id, negotiation_offer }) => {
      const res = await axiosAuth.post(`/api/v1/rides/negotiations/${request_id}/negotiations`, {
        negotiation_offer,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Negotiation sent!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send negotiation."));
    },
  });
};

// POST /api/v1/rides/negotiations/{request_id}/negotiations/{negotiation_id}/accept
// ──────────────────────────────────────────────────
export const useAcceptNegotiation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { request_id: number; negotiation_id: number }>({
    mutationFn: async ({ request_id, negotiation_id }) => {
      await axiosAuth.post(`/api/v1/rides/negotiations/${request_id}/negotiations/${negotiation_id}/accept`);
    },
    onSuccess: () => {
      toast.success("Negotiation accepted!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to accept negotiation."));
    },
  });
};

// POST /api/v1/rides/reviews/
// ──────────────────────────────────────────────────
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, { ride_id: number; rating: number; comment: string }>({
    mutationFn: async ({ ride_id, rating, comment }) => {
      const res = await axiosAuth.post(`/api/v1/rides/reviews/`, {
        ride_id,
        rating,
        comment,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review submitted!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to submit review."));
    },
  });
};

// GET /api/v1/rides/reviews/ride/{ride_id}
// ──────────────────────────────────────────────────
export const useRideReviews = (rideId?: string | number) => {
  return useQuery<RideReview[], AxiosError>({
    queryKey: ["rideReviews", rideId],
    queryFn: async () => {
      if (!rideId) return [];
      const res = await axiosAuth.get<{ data: RideReview[] }>(`/api/v1/rides/reviews/ride/${rideId}`);
      return res.data.data;
    },
    enabled: !!rideId,
  });
};

// GET /api/v1/rides/track/{token}
// ──────────────────────────────────────────────────
export const useTrackRide = () => {
  return useQuery<any, AxiosError>({
    queryKey: ["trackRide"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/rides/track/");
      return res.data;
    },
  });
};

// POST /api/v1/vehicles
// ──────────────────────────────────────────────────
export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/vehicles", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Vehicle created successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create vehicle."));
    },
  });
};

// GET /api/v1/vehicles
// ──────────────────────────────────────────────────
export const useGetVehicles = () => {
  return useQuery<any, AxiosError>({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/vehicles");
      return res.data;
    },
  });
};

// GET /api/v1/vehicles/{vehicle_id}
// ──────────────────────────────────────────────────
export const useGetVehicle = (vehicleId?: number) => {
  return useQuery<Vehicle, AxiosError>({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => {
      if (!vehicleId) throw new Error("Vehicle ID is required");
      const res = await axiosAuth.get(`/api/v1/vehicles/${vehicleId}`);
      return res.data;
    },
    enabled: !!vehicleId,
  });
};

// PUT /api/v1/vehicles/{vehicle_id}
// ──────────────────────────────────────────────────
export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, { vehicle_id: number }>({
    mutationFn: async ({ vehicle_id, ...data }) => {
      const res = await axiosAuth.put(`/api/v1/vehicles/${vehicle_id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Vehicle updated successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update vehicle."));
    },
  });
};

// DELETE /api/v1/vehicles/{vehicle_id}
// ──────────────────────────────────────────────────
export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { vehicle_id: number }>({
    mutationFn: async (vehicle_id) => {
      await axiosAuth.delete(`/api/v1/vehicles/${vehicle_id}`);
    },
    onSuccess: () => {
      toast.success("Vehicle deleted successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete vehicle."));
    },
  });
};

// POST /api/v1/vehicles/{vehicle_id}/images
// ──────────────────────────────────────────────────
export const useUploadVehicleImage = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, { vehicle_id: number }>({
    mutationFn: async ({ vehicle_id, ...data }) => {
      const res = await axiosAuth.post(`/api/v1/vehicles/${vehicle_id}/images`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Image uploaded successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to upload image."));
    },
  });
};

// DELETE /api/v1/vehicles/{vehicle_id}/images/{image_id}
// ──────────────────────────────────────────────────
export const useDeleteVehicleImage = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { vehicle_id: number; image_id: number }>({
    mutationFn: async ({ vehicle_id, image_id }) => {
      await axiosAuth.delete(`/api/v1/vehicles/${vehicle_id}/images/${image_id}`);
    },
    onSuccess: () => {
      toast.success("Image deleted successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete image."));
    },
  });
};

// Driver Documents
// ──────────────────────────────────────────────────

// GET /api/v1/drivers/documents/types
// ──────────────────────────────────────────────────
export const useDocumentTypes = () => {
  return useQuery<any, AxiosError>({
    queryKey: ["documentTypes"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/drivers/documents/types");
      return res.data;
    },
  });
};

// GET /api/v1/drivers/documents/my-documents
// ──────────────────────────────────────────────────
export const useMyDocuments = () => {
  return useQuery<any, AxiosError>({
    queryKey: ["myDocuments"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/drivers/documents/my-documents");
      return res.data;
    },
  });
};

// POST /api/v1/drivers/documents/upload
// ──────────────────────────────────────────────────
export const useUploadDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/drivers/documents/upload", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Document uploaded successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to upload document."));
    },
  });
};

// GET /api/v1/drivers/documents/verification-status
// ──────────────────────────────────────────────────
export const useVerificationStatus = () => {
  return useQuery<any, AxiosError>({
    queryKey: ["verificationStatus"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/drivers/documents/verification-status");
      return res.data;
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

// POST /api/v1/wallets/transfer
export const useTransferFunds = () => {
  const queryClient = useQueryClient();

  return useMutation<WalletBalanceResponse, AxiosError, TransferRequest>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/wallets/transfer", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Funds transferred successfully!");
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to transfer funds."));
    },
  });
};