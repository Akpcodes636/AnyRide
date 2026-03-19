import { create } from "zustand";
import { FareEstimateData, FareVehicleOption } from "@/types";

/* ================= TYPES ================= */

export type RideStep =
  | "request"
  | "rideType"
  | "findingRide"
  | "confirmRide"
  | "acceptingOffer"
  | "rideTracker";

export type RideLocation = {
  address: string;
  lat: number;
  lng: number;
};

export type RideTypeOption = "ECONOMY" | "COMFORT" | "XL" | null;

export type Driver = {
  id: number;
  name: string;
  car: string;
  rating: number;
  rides: number;
  eta: string;
  distance: string;
  image: string;
};

export type RideStatus =
  | "idle"
  | "searching"
  | "matched"
  | "ongoing"
  | "completed"
  | "cancelled";

export type RideData = {
  pickup: RideLocation | null;
  destination: RideLocation | null;
  rideType: RideTypeOption;
  rideId: string | null;
  fareEstimate: FareEstimateData | null;
  selectedVehicle: FareVehicleOption | null;
  requestId: number | null;

  // 🔥 Real-time fields
  driver: Driver | null;
  driversViewing: number;
  status: RideStatus;
};

type RideStore = {
  step: RideStep;
  rideData: RideData;

  setStep: (step: RideStep) => void;
  next: () => void;
  back: () => void;
  setRideData: (data: Partial<RideData>) => void;
  reset: () => void;
};

/* ================= INITIAL STATE ================= */

const initialRideData: RideData = {
  pickup: null,
  destination: null,
  rideType: null,
  rideId: null,
  fareEstimate: null,
  selectedVehicle: null,
  requestId: null,

  driver: null,
  driversViewing: 0,
  status: "idle",
};

/* ================= STORE ================= */

export const useRideStore = create<RideStore>((set, get) => ({
  step: "request",
  rideData: { ...initialRideData },

  setStep: (step) => set({ step }),

  next: () => {
    const step = get().step;

    if (step === "request") set({ step: "rideType" });
    else if (step === "rideType") set({ step: "findingRide" });
    else if (step === "findingRide") set({ step: "confirmRide" });
    else if (step === "confirmRide") set({ step: "acceptingOffer" });
    else if (step === "acceptingOffer") set({ step: "rideTracker" });
  },

  back: () => {
    const step = get().step;

    if (step === "confirmRide") set({ step: "findingRide" });
    else if (step === "findingRide") set({ step: "rideType" });
    else if (step === "rideType") set({ step: "request" });
  },

  setRideData: (data) =>
    set((state) => ({
      rideData: {
        ...state.rideData,
        ...data,
      },
    })),

  reset: () =>
    set({
      step: "request",
      rideData: { ...initialRideData },
    }),
}));