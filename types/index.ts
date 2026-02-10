export interface RegisterPayload {
  email: string;
  authProvider:string;
}

export interface User {
  email: string;
  authProvider: string; // optional, only if your API returns it
  // Add any other fields returned by your API, e.g.:
  // createdAt?: string;
  // isVerified?: boolean;
}

export interface RegisterResponse {
  user: User | null; // null if registration failed
  message?: string; // optional message from API
  authProvider: "email" | "google" | "apple";
}

export interface ErrorResponse {
  error: string;
}

export interface EmailCheckPayload {
  token: string;
}

export interface EmailCheckResponse {
  message: string; 
  token: string;   
}


export interface PhonePayload {
  phone: string;
}

export interface PhoneResponse {
  message: string;
  phone: string;
}

export interface ErrorResponse {
  error: string;
}