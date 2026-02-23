import { create } from "zustand";

type RideStep = "request" | "rideType" | "findingRide" | "confirmRide";

type RideLocation = {
  address: string;
  lat: number;
  lng: number;
};

type RideTypeOption = "ECONOMY" | "COMFORT" | "XL" | null;

type RideData = {
  pickup: RideLocation | null;
  destination: RideLocation | null;
  rideType: RideTypeOption;
  rideId: string | null;
};

type RideStore = {
  step: RideStep;
  rideData: RideData;

  setStep: (step: RideStep) => void;
  next: () => void;
  back: () => void;
  setRideData: (data: Partial<RideData>) => void;
};

export const useRideStore = create<RideStore>((set, get) => ({
  step: "request",

  rideData: {
    pickup: null,
    destination: null,
    rideType: null,
    rideId: null,
  },

  setStep: (step) => set({ step }),

  next: () => {
    const step = get().step;

    if (step === "request") set({ step: "rideType" });
    else if (step === "rideType") set({ step: "findingRide" });
    else if (step === "findingRide") set({ step: "confirmRide" });
  },

  back: () => {
    const step = get().step;

    if (step === "confirmRide") set({ step: "findingRide" });
    else if (step === "findingRide") set({ step: "rideType" });
    else if (step === "rideType") set({ step: "request" });
  },

  setRideData: (data) =>
    set((state) => ({
      rideData: { ...state.rideData, ...data },
    })),
}));