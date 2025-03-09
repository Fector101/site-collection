import { create } from "zustand";

const useCarouselStore = create((set) => ({
  timer: false,
  setTimer: (value) => set({ timer: value }),
}));

export default useCarouselStore;