import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
// USER PROFILE MANAGEMENT
// ──────────────────────────────────────────────────────────

// GET /api/v1/users/me
export const useCurrentUser = () => {
  return useQuery<any, AxiosError>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/users/me");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// PUT /api/v1/users/me
export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationFn: async (data) => {
      const res = await axiosAuth.put("/api/v1/users/me", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update profile."));
    },
  });
};

// PATCH /api/v1/users/me
export const usePatchCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationFn: async (data) => {
      const res = await axiosAuth.patch("/api/v1/users/me", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update profile."));
    },
  });
};

// POST /api/v1/users/me/register-as-customer
export const useRegisterAsCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, void>({
    mutationFn: async () => {
      const res = await axiosAuth.post("/api/v1/users/me/register-as-customer");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Registered as customer successfully!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to register as customer."));
    },
  });
};

// POST /api/v1/users/me/register-as-driver
export const useRegisterAsDriver = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, void>({
    mutationFn: async () => {
      const res = await axiosAuth.post("/api/v1/users/me/register-as-driver");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Registered as driver successfully!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to register as driver."));
    },
  });
};

// POST /api/v1/users/me/push-token
export const useUpdatePushToken = () => {
  return useMutation<any, AxiosError, { push_token: string }>({
    mutationFn: async ({ push_token }) => {
      const res = await axiosAuth.post("/api/v1/users/me/push-token", { push_token });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Push token updated successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update push token."));
    },
  });
};

// PUT /api/v1/users/me/emergency-contact
export const useUpdateEmergencyContact = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationFn: async (data) => {
      const res = await axiosAuth.put("/api/v1/users/me/emergency-contact", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Emergency contact updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update emergency contact."));
    },
  });
};

// POST /api/v1/users/me/avatar
export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, FormData>({
    mutationFn: async (formData) => {
      const res = await axiosAuth.post("/api/v1/users/me/avatar", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Avatar uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to upload avatar."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// DRIVER DOCUMENTS MANAGEMENT
// ──────────────────────────────────────────────────────────

// GET /api/v1/drivers/documents/types
export const useDriverDocumentTypes = () => {
  return useQuery<any[], AxiosError>({
    queryKey: ["driverDocumentTypes"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/drivers/documents/types");
      return res.data;
    },
  });
};

// GET /api/v1/drivers/documents/my-documents
export const useMyDriverDocuments = () => {
  return useQuery<any[], AxiosError>({
    queryKey: ["myDriverDocuments"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/drivers/documents/my-documents");
      // Handle different response structures
      const data = res.data;
      // If response has a data property with the array, use that
      // Otherwise, if the response itself is an array, use it directly
      return Array.isArray(data) ? data : (data?.data || []);
    },
  });
};

// POST /api/v1/drivers/documents/upload
export const useUploadDriverDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, FormData>({
    mutationFn: async (formData) => {
      const res = await axiosAuth.post("/api/v1/drivers/documents/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Document uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["myDriverDocuments"] });
      queryClient.invalidateQueries({ queryKey: ["driverVerificationStatus"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to upload document."));
    },
  });
};

// GET /api/v1/drivers/documents/verification-status
type DriverVerificationStatus = {
  overall_status: "not_started" | "pending" | "approved" | "rejected";
  documents?: {
    id: string;
    status: string;
  }[];
};

export const useDriverVerificationStatus = () => {
  return useQuery<DriverVerificationStatus, AxiosError>({
    queryKey: ["driverVerificationStatus"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/drivers/documents/verification-status");
      const data = res.data?.data ?? res.data;
      return data ?? { overall_status: "not_started" };
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

// ──────────────────────────────────────────────────────────
// RIDER DOCUMENTS MANAGEMENT
// ──────────────────────────────────────────────────────────

// GET /api/v1/riders/documents/types
export const useRiderDocumentTypes = () => {
  return useQuery<any[], AxiosError>({
    queryKey: ["riderDocumentTypes"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/riders/documents/types");
      return res.data;
    },
  });
};

// GET /api/v1/riders/documents/my-documents
export const useMyRiderDocuments = () => {
  return useQuery<any[], AxiosError>({
    queryKey: ["myRiderDocuments"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/riders/documents/my-documents");
      return res.data;
    },
  });
};

// POST /api/v1/riders/documents/upload
export const useUploadRiderDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, FormData>({
    mutationFn: async (formData) => {
      const res = await axiosAuth.post("/api/v1/riders/documents/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Document uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["myRiderDocuments"] });
      queryClient.invalidateQueries({ queryKey: ["riderVerificationStatus"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to upload document."));
    },
  });
};

// GET /api/v1/riders/documents/verification-status
export const useRiderVerificationStatus = () => {
  return useQuery<any, AxiosError>({
    queryKey: ["riderVerificationStatus"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/riders/documents/verification-status");
      return res.data;
    },
  });
};

// ──────────────────────────────────────────────────────────
// DRIVER PROFILE MANAGEMENT
// ──────────────────────────────────────────────────────────

// GET /api/v1/drivers/{driver_id}
export const useDriverProfile = (driverId?: string) => {
  return useQuery<any, AxiosError>({
    queryKey: ["driverProfile", driverId],
    queryFn: async () => {
      if (!driverId) throw new Error("Driver ID is required");
      const res = await axiosAuth.get(`/api/v1/drivers/${driverId}`);
      return res.data;
    },
    enabled: !!driverId,
  });
};

// ──────────────────────────────────────────────────────────
// RIDE MANAGEMENT
// ──────────────────────────────────────────────────────────

// GET /api/v1/rides/types
export const useRideTypes = () => {
  return useQuery<any[], AxiosError>({
    queryKey: ["rideTypes"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/rides/types");
      return res.data.data;
    },
  });
};

// POST /api/v1/rides/
export const useCreateRide = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/rides/", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Ride created successfully!");
      queryClient.invalidateQueries({ queryKey: ["rides"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create ride."));
    },
  });
};

// GET /api/v1/rides/
export const useRides = (skip = 0, limit = 100) => {
  return useQuery<any, AxiosError>({
    queryKey: ["rides", skip, limit],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/rides/", {
        params: { skip, limit },
      });
      return res.data;
    },
  });
};

// GET /api/v1/rides/{ride_id}
export const useRide = (rideId?: string) => {
  return useQuery<any, AxiosError>({
    queryKey: ["ride", rideId],
    queryFn: async () => {
      if (!rideId) throw new Error("Ride ID is required");
      const res = await axiosAuth.get(`/api/v1/rides/${rideId}`);
      return res.data;
    },
    enabled: !!rideId,
  });
};

// PUT /api/v1/rides/{ride_id}
export const useUpdateRide = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, { rideId: string; data: any }>({
    mutationFn: async ({ rideId, data }) => {
      const res = await axiosAuth.put(`/api/v1/rides/${rideId}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Ride updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["rides"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update ride."));
    },
  });
};

// DELETE /api/v1/rides/{ride_id}
export const useDeleteRide = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: async (rideId) => {
      await axiosAuth.delete(`/api/v1/rides/${rideId}`);
    },
    onSuccess: () => {
      toast.success("Ride deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["rides"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete ride."));
    },
  });
};

// GET /api/v1/rides/active/{ride_id}
export const useActiveRide = (rideId?: string) => {
  return useQuery<any, AxiosError>({
    queryKey: ["activeRide", rideId],
    queryFn: async () => {
      if (!rideId) throw new Error("Ride ID is required");
      const res = await axiosAuth.get(`/api/v1/rides/active/${rideId}`);
      return res.data;
    },
    enabled: !!rideId,
  });
};

// POST /api/v1/rides/{ride_id}/cancel
export const useCancelRide = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { rideId: string; reason?: string }>({
    mutationFn: async ({ rideId, reason }) => {
      await axiosAuth.post(`/api/v1/rides/${rideId}/cancel`, null, {
        params: reason ? { reason } : undefined,
      });
    },
    onSuccess: () => {
      toast.success("Ride cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: ["rides"] });
      queryClient.invalidateQueries({ queryKey: ["activeRide"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to cancel ride."));
    },
  });
};

// POST /api/v1/rides/{ride_id}/arrived
export const useMarkArrived = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: async (rideId) => {
      await axiosAuth.post(`/api/v1/rides/${rideId}/arrived`);
    },
    onSuccess: () => {
      toast.success("Driver arrived marked successfully!");
      queryClient.invalidateQueries({ queryKey: ["rides"] });
      queryClient.invalidateQueries({ queryKey: ["activeRide"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to mark arrival."));
    },
  });
};

// POST /api/v1/rides/{ride_id}/start
export const useStartRide = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: async (rideId) => {
      await axiosAuth.post(`/api/v1/rides/${rideId}/start`);
    },
    onSuccess: () => {
      toast.success("Ride started successfully!");
      queryClient.invalidateQueries({ queryKey: ["rides"] });
      queryClient.invalidateQueries({ queryKey: ["activeRide"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to start ride."));
    },
  });
};

// POST /api/v1/rides/{ride_id}/complete
export const useCompleteRide = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { rideId: string; total_price?: number; duration_minutes?: number }>({
    mutationFn: async ({ rideId, total_price, duration_minutes }) => {
      await axiosAuth.post(`/api/v1/rides/${rideId}/complete`, {
        total_price,
        duration_minutes,
      });
    },
    onSuccess: () => {
      toast.success("Ride completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["rides"] });
      queryClient.invalidateQueries({ queryKey: ["activeRide"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to complete ride."));
    },
  });
};

// POST /api/v1/rides/{ride_id}/review
export const useSubmitRideReview = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { rideId: string; rating: number; comment?: string }>({
    mutationFn: async ({ rideId, rating, comment }) => {
      await axiosAuth.post(`/api/v1/rides/${rideId}/review`, {
        rating,
        comment,
      });
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["rides"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to submit review."));
    },
  });
};

// POST /api/v1/rides/estimate-fare
export const useEstimateFare = () => {
  return useMutation<any, AxiosError, any>({
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
// VIRTUAL STOPS
// ──────────────────────────────────────────────────────────

// GET /api/v1/virtual-stops/
export const useVirtualStops = () => {
  return useQuery<any[], AxiosError>({
    queryKey: ["virtualStops"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/virtual-stops/");
      return res.data;
    },
  });
};

// ──────────────────────────────────────────────────────────
// SUPPORT TICKETS
// ──────────────────────────────────────────────────────────

// POST /api/v1/support/tickets
export const useCreateSupportTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, any>({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("/api/v1/support/tickets", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Support ticket created successfully!");
      queryClient.invalidateQueries({ queryKey: ["supportTickets"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create support ticket."));
    },
  });
};

// GET /api/v1/support/tickets/me
export const useMySupportTickets = () => {
  return useQuery<any[], AxiosError>({
    queryKey: ["mySupportTickets"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/v1/support/tickets/me");
      return res.data;
    },
  });
};

// ──────────────────────────────────────────────────────────
// RIDE CHAT
// ──────────────────────────────────────────────────────────

// POST /api/v1/rides/{ride_id}/chat
export const useSendChatMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, { rideId: string; message: string }>({
    mutationFn: async ({ rideId, message }) => {
      const res = await axiosAuth.post(`/api/v1/rides/${rideId}/chat`, { message });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send message."));
    },
  });
};

// ──────────────────────────────────────────────────────────
// RIDE TRACKING
// ──────────────────────────────────────────────────────────

// GET /api/v1/rides/track/{token}
export const useTrackRide = (token?: string) => {
  return useQuery<any, AxiosError>({
    queryKey: ["trackRide", token],
    queryFn: async () => {
      if (!token) throw new Error("Track token is required");
      const res = await axiosAuth.get(`/api/v1/rides/track/${token}`);
      return res.data;
    },
    enabled: !!token,
  });
};

// GET /api/v1/rides/track/{token}/data
export const useTrackRideData = (token?: string) => {
  return useQuery<any, AxiosError>({
    queryKey: ["trackRideData", token],
    queryFn: async () => {
      if (!token) throw new Error("Track token is required");
      const res = await axiosAuth.get(`/api/v1/rides/track/${token}/data`);
      return res.data;
    },
    enabled: !!token,
  });
};

type DocumentUploadRequest = {
  document_type_id: string;
  file: File;
};


// export const useDriverDocumentsUpload = ()=> {
//   const queryClient = useQueryClient();

//   return useMutation<DocumentUploadRequest, AxiosError>({
//     mutationFn: async() =>{
//       const res = await axiosAuth.post("/api/v1/drivers/documents/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success("Document uploaded successfully")
//       queryClient.invalidateQueries({ queryKey: ["driverDocuments"] });
//       queryClient.invalidateQueries({ queryKey: ["driverDocumentsTypes"] });
//     },
//     onError:(error)=> {
//       toast.error(getErrorMessage(error,"Failed to upload document."));
//     }
//   })
// }