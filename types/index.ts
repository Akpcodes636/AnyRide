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
  error: string;
  message?: string;
  error_code?: string;
}

export interface ApiErrorResponse {
  error?: string;
  message?: string;
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
export interface VerifyPinPayload {
  phonenumber: string;
  pin: string;
}

export interface VerifyPinResponse {
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

// ─── Ride fare ───────────────────────────────────────────
export interface VehicleOption {
  vehicle_type: string;
  icon_url: string;
  estimated_duration_minutes: number;
  formatted_fare: string;
}

export interface FareData {
  vehicle_options: VehicleOption[];
}

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

export interface ApiErrorResponse {
  detail?: string;
  message?: string;
}


export interface RideType {
  id: number;
  name: string;
  vehicle_type: string;
  icon_url: string;
  estimated_duration_minutes: number;
  capacity: string;
  formatted_fare?: string;
}

export interface ApiErrorResponse {
  detail?: string;
  message?: string;
}

export interface RideType {
  id: number;
  name: string;
  icon_urls?: string;
  capacitys?: string;
  estimated_duration_minutess?: number;
  formatted_fare?: string;
}

export interface RideTypesResponse {
  status: string;
  message: string;
  data: RideType[];
}

export interface RideType {
  id: number;
  name: string;
  description: string;
  base_price: number;
}

export interface RideAcceptanceCardProps {
  driverName: string;
  car: string;
  rideCode: string;
  eta: string;
  rides: number;
  distance: string;
  rating: number;
  image: string;
}

export interface StarsProps {
  rating: number;
  size?: number;
};