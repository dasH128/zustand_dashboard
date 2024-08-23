import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bear {
  id: number;
  nombre: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;
  bears: Bear[];
  /*computed: {
    totalBears: number;
  };*/
  totalBears: () => number;
  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  doNothing: () => void;
  addBears: () => void;
  clearBears: () => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      blackBears: 13,
      polarBears: 5,
      pandaBears: 1,
      bears: [{ id: 1, nombre: "Oso #1" }],
      /*computed: {
        get totalBears(): number {
          return (
            get().blackBears +
            get().polarBears +
            get().pandaBears +
            get().bears.length
          );
        },
      },*/
      totalBears: () => {
        return (
          get().blackBears +
          get().polarBears +
          get().pandaBears +
          get().bears.length
        );
      },
      increaseBlackBears: (by: number) =>
        set((state) => ({ blackBears: state.blackBears + by })),
      increasePolarBears: (by: number) =>
        set((state) => ({ polarBears: state.polarBears + by })),
      increasePandaBears: (by: number) =>
        set((state) => ({ pandaBears: state.pandaBears + by })),
      doNothing: () => set((state) => ({ bears: [...state.bears] })),
      addBears: () =>
        set((state) => ({
          bears: [
            ...state.bears,
            {
              id: state.bears.length + 1,
              nombre: `Oso # ${state.bears.length + 1}`,
            },
          ],
        })),
      clearBears: () => set({ bears: [] }),
    }),
    {
      name: "bears-store",
    }
  )
);
