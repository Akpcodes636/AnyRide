import { create } from "zustand";

export type DriverStep =
  | "availability"
  | "acceptRide"
  | "riderAssigned";

export type RideRequest = {
  id: string;
  name: string;
  avatar?: string;
  code: string;
  pickup: string;
  dropoff: string;
  distance: string;
  eta: string;
  paymentMethod: "cash" | "inapp";
};

type DriverStore = {
  step: DriverStep;
  activeRequest: RideRequest | null;
  setStep: (step: DriverStep) => void;
  setActiveRequest: (request: RideRequest) => void;
  clearRide: () => void;
};

export const useDriverStore = create<DriverStore>((set) => ({
  step: "availability",
  activeRequest: null,
  setStep: (step) => set({ step }),
  setActiveRequest: (request) => set({ activeRequest: request }),
  clearRide: () => set({ step: "availability", activeRequest: null }),
}));