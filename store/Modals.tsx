import { create } from "zustand";
type ModalType = "tripCompleted" | "review" | "dispute" | "tip" | "fund";

interface ModalStore {
  modal:ModalType | null;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  resetState: () => void;
}

// Factory function to create modal stores
const createModalStore = () =>
  create<ModalStore>((set) => ({
    modal: null,

    openModal: (type) => set({ modal: type }),

    closeModal: () => set({ modal: null }),

    resetState: () => set({ modal: null }),
  }));

// Create specific modal stores
export const useTripModal = createModalStore();
// export const useReviewModal = createModalStore();