import { create } from "zustand";

type ModalType = "tripCompleted" | "review" | "dispute" | "tip" | "fund" | "feesBreakdown" | "addVehicle" | "withdraw";

interface ModalStore {
  modal: ModalType | null;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  resetState: () => void;
}

const createModalStore = () =>
  create<ModalStore>((set) => ({
    modal: null,
    openModal: (type) => set({ modal: type }),
    closeModal: () => set({ modal: null }),
    resetState: () => set({ modal: null }),
  }));

export const useTripModal = createModalStore();