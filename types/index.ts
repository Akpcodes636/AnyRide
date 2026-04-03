import { ElementType } from "react";

// ─── Register ────────────────────────────────────────────
export interface RegisterPayload {
  phonenumber: string;
  role?: "customer" | "driver" | "admin";
  registration_token: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  pin?: string;
}

export interface RegisterResponse {
  status: string;
  exists: boolean;
  has_pin: boolean;
  is_driver: boolean;
  is_customer: boolean;
  is_admin: boolean;
  message: string;
  data?: {
    access_token: string;
    refresh_token: string;
  };
}

// ─── Error types ─────────────────────────────────────────
export interface ErrorResponse {
  error: string;
  message?: string | { status: string; message: string; error_code?: string };
  error_code?: string;
}

export interface ApiError {
  error?: string;
  message?: string;
  error_code?: string;
}

export interface ApiErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
  error_code?: string;
}

// ─── API generic ─────────────────────────────────────────
export interface ApiResponse {
  message: string;
  status: string;
  error?: string;
}

// ─── Phone check ─────────────────────────────────────────
export interface PhoneCheckPayload {
  phonenumber: string;
  role: "customer" | "driver";
}

export interface PhoneCheckResponse {
  exists: boolean;
  has_pin: boolean;
  is_customer: boolean;
  is_driver: boolean;
  message: string;
}

// ─── Phone (legacy, kept for enter-phone page) ───────────
export interface PhonePayload {
  phone: string;
}

export interface PhoneResponse {
  message: string;
  phone: string;
}

// ─── Email check (legacy) ────────────────────────────────
export interface EmailCheckPayload {
  token: string;
}

export interface EmailCheckResponse {
  message: string;
  token: string;
}

// ─── User ────────────────────────────────────────────────
export interface User {
  email: string;
  authProvider: string;
}

// ─── Select role ─────────────────────────────────────────
export interface SelectRolePayload {
  role: "passenger" | "driver";
}

// ─── Verify OTP ──────────────────────────────────────────
export interface VerifyOtpPayload {
  phonenumber: string;
  otp_code: string;
}

export interface VerifyOtpResponse {
  status: string;
  message: string;
  error_code?: string;
  data: {
    access_token: string;
    refresh_token: string;
    user?: {
      firstname?: string;
      lastname?: string;
      phonenumber?: string;
    };
  } | null;
  session_info?: string;
  verified?: boolean;
}

// ─── Login ───────────────────────────────────────────────
export interface LoginPayload {
  phonenumber: string;
  otp_code: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  error_code?: string;
  data: {
    access_token: string;
    refresh_token: string;
    user?: {
      firstname?: string;
      lastname?: string;
      phonenumber?: string;
    };
  };
}

export interface LoginFormValues {
  phonenumber: string;
  role: "customer" | "driver";
}

// ─── Verify PIN ──────────────────────────────────────────
export interface VerifyPinRequest {
  phonenumber: string;
  pin: string;
}

export interface VerifyPinResponse {
  status: "success" | "error";
  message: string;
  data?: {
    access_token: string;
    refresh_token: string;
  };
  available_roles?: string[];
}

// ─── Set PIN ─────────────────────────────────────────────
export interface SetPinPayload {
  pin: string;
}

export interface SetPinResponse {
  status: string;
  message: string;
}

// ─── Resend OTP ──────────────────────────────────────────
export interface ResendOtpPayload {
  phonenumber: string;
  forgot_pin: boolean;
}

export interface ResendOtpResponse {
  status: "success" | "error";
  message: string;
  session_info?: string;
}

// ─── Forgot / Reset PIN ─────────────────────────────────
export interface ForgotPinRequest {
  phonenumber: string;
  forgot_pin: true;
}

export interface ForgotPinResponse {
  status: "success" | "error";
  message: string;
}

export interface ResetPinRequest {
  phonenumber: string;
  otp_code: string;
  new_pin: string;
}

export interface ResetPinResponse {
  status: "success" | "error";
  message: string;
  data?: {
    access_token: string;
    refresh_token: string;
  };
}

// ─── Check Phone ─────────────────────────────────────────
export interface CheckPhoneResponse {
  exists: boolean;
  has_pin: boolean;
  is_customer: boolean;
  is_driver: boolean;
  message: string;
}

export interface CheckPhoneRequest {
  phonenumber: string;
  role: "customer" | "driver" | "admin";
}

// ─── Send OTP ────────────────────────────────────────────
export interface SendOtpPayload {
  phonenumber: string;
  forgot_pin?: boolean;
}

export interface SendOtpResponse {
  status: string;
  message: string;
  session_info: string;
}

// ─── Register User ───────────────────────────────────────
export interface RegisterUserRequest {
  registration_token: string;
  firstname: string;
  lastname: string;
  gender: string;
  email?: string;
  pin: string;
  role: "customer" | "driver";
}

export interface RegisterUserResponse {
  status: string;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

// ─── Fare Estimation ─────────────────────────────────────
export interface FareEstimateRequest {
  pickup_lat: number;
  pickup_lon: number;
  dropoff_lat: number;
  dropoff_lon: number;
  vehicle_type?: string;
}

export interface FareVehicleOption {
  vehicle_type: string;
  base_fare: number;
  final_fare: number;
  formatted_fare: string;
  surge_multiplier: number;
  vehicle_multiplier: number;
  estimated_duration_minutes: number;
}

export interface FareEstimateData {
  distance_km: number;
  estimated_duration_minutes: number;
  currency: string;
  currency_symbol: string;
  base_fare: number;
  is_surge_pricing: boolean;
  available_drivers: number;
  vehicle_options: FareVehicleOption[];
}

export interface FareEstimateResponse {
  status: string;
  message: string;
  data: FareEstimateData;
}

// ─── Ride Types ──────────────────────────────────────────
export interface RideType {
  id: number;
  name: string;
  description?: string;
  base_fare: number;
  price_per_km: number;
  price_per_minute: number;
  minimum_fare: number;
  capacity: number;
  icon_url?: string;
  sort_order?: number;
  is_active?: boolean;
}

export interface RideTypesResponse {
  status: string;
  message: string;
  data: RideType[];
}

// ─── Ride Requests ───────────────────────────────────────
export interface RideRequestCreate {
  pickup_lat?: number;
  pickup_lon?: number;
  dropoff_lat?: number;
  dropoff_lon?: number;
  pickup_address?: string;
  dropoff_address?: string;
  estimated_price?: number;
  rideType?: string;
  paymentMethod?: string;
  fk_customer_id: number;
}

export interface RideRequestOut {
  id: number;
  fk_customer_id: number;
  fk_driver_id?: number | null;
  fk_vehicle_id?: number | null;
  fk_ride_id?: number | null;
  status: string;
  pickup_lat?: number | null;
  pickup_lon?: number | null;
  dropoff_lat?: number | null;
  dropoff_lon?: number | null;
  pickup_address?: string | null;
  dropoff_address?: string | null;
  estimated_price?: number | null;
  ride_type?: string | null;
  payment_method?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RideRequestListResponse {
  status: string;
  message: string;
  data: RideRequestOut[];
}

// ─── Fare Update ─────────────────────────────────────────
export interface FareUpdate {
  new_fare: number;
}

// ─── Rides ───────────────────────────────────────────────
export interface CreateRidePayload {
  pickup_lat: number;
  pickup_lon: number;
  dropoff_lat: number;
  dropoff_lon: number;
  pickup_address: string;
  dropoff_address: string;
  estimated_price: number;
  ride_type: string;
  payment_method: string;
  fk_customer_id: number;
}

// ─── Saved Locations ─────────────────────────────────────
export interface SavedLocationCreate {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// ─── Notification Types ───────────────────────────────────────
export interface Notification {
  id: number;
  text: string;
  type: string;
  unread: boolean;
  time: string;
  created_at: string;
}

export interface NotificationListResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
}

export interface UnreadCountResponse {
  unread_count: number;
}

// ─── Wallet Types ───────────────────────────────────────
export interface WalletSetupRequest {
  pin: string;
  phone_number: string;
  email?: string;
}

export interface WalletLoginRequest {
  pin: string;
}

export interface WalletStatusResponse {
  is_setup: boolean;
  is_logged_in: boolean;
  balance: number;
  currency: string;
}

export interface WalletBalanceResponse {
  balance: number;
  currency: string;
  pending_transactions: number;
}

export interface CustomerCard {
  id: string;
  last4: string;
  brand: string;
  expiry_month: number;
  expiry_year: number;
  is_default: boolean;
}

export interface TransferRequest {
  recipient_phone: string;
  amount: number;
  description?: string;
}

export interface TopUpRequest {
  amount: number;
  payment_method_id: string;
  description?: string;
}

export interface PublishableKeyResponse {
  publishable_key: string;
}

export interface PaymentIntentRequest {
  amount: number;
  currency?: string;
  payment_method_id?: string;
}

export interface PaymentSimulateRequest {
  payment_intent_id: string;
}

export interface SavedLocationOut {
  id: number;
  fk_user_id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

// Legacy alias for backwards compat
export type Location = SavedLocationOut;

// ─── UI Component Props ──────────────────────────────────
export interface RideAcceptanceCardProps {
  driverName: string;
  car: string;
  rideCode: string;
  eta: string;
  rides: number;
  distance: string;
  rating: number;
  image: string;
  requestId:number;
}

export interface StarsProps {
  rating: number;
  size?: number;
}

export interface CountdownBarProps {
  seconds: number;
  total: number;
}

export interface TooltipPayload {
  value: number;
  name: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

export interface FormState {
  cardNumber: string;
  expiry: string;
  cvv: string;
  accountName: string;
}

export interface SettingsItemProps {
  icon: ElementType;
  label: string;
  onClick?: () => void;
}

export interface Ride {
  label: string;
  status: string;
  statusColor: string;
  pickup: string;
  destination: string;
}

export interface RideCardProps {
  ride: Ride;
}

export interface Coords {
  lat: number;
  lon: number;
}

export interface StageConfig {
  title: string;
  greenSub?: boolean;
  subtitle?: string;
}

export interface VehicleOption {
  vehicle_type: string;
  icon_url: string;
  formatted_fare: string;
  estimated_duration_minutes: number;
  capacity: string;
}

export interface FareData {
  vehicle_options: VehicleOption[];
}

export interface SavedLocationCreate {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// ─── Notification Types ───────────────────────────────────────
export interface Notification {
  id: number;
  text: string;
  type: string;
  unread: boolean;
  time: string;
  created_at: string;
}

export interface NotificationListResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
}

export interface UnreadCountResponse {
  unread_count: number;
}

// ─── Wallet Types ───────────────────────────────────────
export interface WalletSetupRequest {
  pin: string;
  phone_number: string;
  email?: string;
}

export interface WalletLoginRequest {
  pin: string;
}

export interface WalletStatusResponse {
  is_setup: boolean;
  is_logged_in: boolean;
  balance: number;
  currency: string;
}

export interface WalletBalanceResponse {
  balance: number;
  currency: string;
  pending_transactions: number;
}

export interface CustomerCard {
  id: string;
  last4: string;
  brand: string;
  expiry_month: number;
  expiry_year: number;
  is_default: boolean;
}

export interface TransferRequest {
  recipient_phone: string;
  amount: number;
  description?: string;
}

export interface TopUpRequest {
  amount: number;
  payment_method_id: string;
  description?: string;
}

export interface PublishableKeyResponse {
  publishable_key: string;
}

export interface PaymentIntentRequest {
  amount: number;
  currency?: string;
  payment_method_id?: string;
}

export interface PaymentSimulateRequest {
  payment_intent_id: string;
}


export interface RideData  {
  pickup?: { address: string; lat: number; lng: number };
  destination?: { address: string; lat: number; lng: number };
  requestId?: number;
  rideId?: number;       // <-- Add this
  fareEstimate?: { base_fare: number };
  rideType?: string | null;
};

// ─── Vehicle Types ───────────────────────────────────────────
export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  plate_number: string;
  seating_capacity: number;
  vehicle_type: string;
  color?: string;
  is_active: boolean;
  verification_status: "verified" | "under-review" | "declined" | "pending";
  created_at: string;
  updated_at: string;
  images?: VehicleImage[];
}

export interface VehicleImage {
  id: number;
  vehicle_id: number;
  image_url: string;
  image_type: "front" | "back" | "side" | "interior" | "document";
  is_primary: boolean;
  created_at: string;
}

export interface VehicleCreateRequest {
  make: string;
  model: string;
  year: number;
  plate_number: string;
  seating_capacity: number;
  vehicle_type: string;
  color?: string;
}

export interface VehicleUpdateRequest {
  make?: string;
  model?: string;
  year?: number;
  plate_number?: string;
  seating_capacity?: number;
  vehicle_type?: string;
  color?: string;
  is_active?: boolean;
}

export interface VehicleListResponse {
  status: string;
  message: string;
  data: Vehicle[];
}

// ─── Review Types ───────────────────────────────────────────
export interface Review {
  id: number;
  ride_id: number;
  driver_id: number;
  rider_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
  ride?: {
    id: number;
    pickup_address: string;
    dropoff_address?: string;
    total_price?: number;
    created_at: string;
  };
  rider?: {
    id: number;
    name: string;
    phonenumber: string;
  };
}

export interface ReviewCreateRequest {
  ride_id: number;
  rating: number;
  comment?: string;
}

export interface ReviewListResponse {
  status: string;
  message: string;
  data: Review[];
}

// ─── Driver Document Types ───────────────────────────────────
export interface DocumentType {
  id: number;
  name: string;
  description: string;
  is_required: boolean;
  document_format: string;
  max_file_size_mb: number;
  created_at: string;
}

export interface DriverDocument {
  id: number;
  driver_id: number;
  document_type_id: number;
  file_url: string;
  file_name: string;
  verification_status: "pending" | "approved" | "rejected" | "expired";
  rejection_reason?: string;
  expires_at?: string;
  uploaded_at: string;
  updated_at: string;
  document_type?: DocumentType;
}

export interface DocumentUploadRequest {
  document_type_id: number;
  file: File;
  expires_at?: string;
}

export interface VerificationStatusResponse {
  status: string;
  message: string;
  data: {
    overall_status: "verified" | "pending" | "rejected" | "incomplete";
    verified_documents: number;
    total_required_documents: number;
    documents: DriverDocument[];
  };
}

// ─── Driver Ride Lifecycle Types ───────────────────────────────
export interface ActiveRide {
  id: number;
  driver_id: number;
  customer_id: number;
  vehicle_id: number;
  pickup_address: string;
  dropoff_address: string;
  pickup_lat: number;
  pickup_lon: number;
  dropoff_lat: number;
  dropoff_lon: number;
  status: "requested" | "accepted" | "arrived" | "started" | "completed" | "cancelled";
  ride_type: string;
  estimated_price: number;
  actual_price?: number;
  duration_minutes?: number;
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  customer?: {
    name: string;
    phonenumber: string;
  };
  vehicle?: {
    make: string;
    model: string;
    plate_number: string;
  };
}

export interface RideNegotiation {
  id: number;
  ride_request_id: number;
  driver_id: number;
  negotiation_offer: string;
  status: "pending" | "accepted" | "rejected" | "expired";
  created_at: string;
  updated_at: string;
}

export interface NegotiationCreateRequest {
  ride_request_id: number;
  negotiation_offer: string;
}

export interface NegotiationAcceptRequest {
  ride_request_id: number;
  negotiation_id: number;
}

// ─── Transaction Types ───────────────────────────────────────
export interface Transaction {
  id: number;
  user_id: number;
  amount: number;
  transaction_type: "credit" | "debit" | "transfer" | "withdrawal" | "topup";
  status: "pending" | "completed" | "failed" | "cancelled";
  description?: string;
  reference_id?: string;
  reference_type?: "ride" | "transfer" | "withdrawal" | "topup";
  created_at: string;
  updated_at: string;
  ride?: {
    id: number;
    pickup_address: string;
    dropoff_address?: string;
  };
}

export interface TransactionListResponse {
  status: string;
  message: string;
  data: Transaction[];
}

// ─── Component Props Types ───────────────────────────────────
export interface VehicleCardProps {
  vehicle: Vehicle;
  onActivate?: (vehicleId: number) => void;
  onDeactivate?: (vehicleId: number) => void;
  onEdit?: (vehicleId: number) => void;
  onDelete?: (vehicleId: number) => void;
}

export interface ReviewCardProps {
  review: Review;
  showEarnings?: boolean;
}

export interface TransactionCardProps {
  transaction: Transaction;
  showDate?: boolean;
}

export interface StatusBadgeProps {
  status: "verified" | "under-review" | "declined" | "pending" | "approved" | "rejected" | "expired" | "incomplete";
  size?: "sm" | "md" | "lg";
}

export interface NavigationItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: {
    text: string;
    color: string;
  };
}

// ─── UI State Types ─────────────────────────────────────────
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface FilterState {
  rating?: number;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
}


export interface RideReview {
  id: number;
  ride_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

export interface RideReviewsResponse {
  status: "success" | "error";
  message: string;
  data: RideReview[];
}

