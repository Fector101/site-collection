// // import { create } from "zustand";

// // const useCarouselStore = create((set) => ({
// //   timer: false,
// //   setTimer: (value) => set({ timer: value }),
// // }));

// // export default useCarouselStore;
// import { create } from "zustand";

// // Define the interface for the store's state and actions
// interface CarouselStore {
//   timer: number | null; // Store the timer ID
//   setTimer: (value: number | null) => void;
// }

// const useCarouselStore = create<CarouselStore>((set) => ({
//   timer: null,
//   setTimer: (value: number | null) => set({ timer: value }),
// }));

// export default useCarouselStore;