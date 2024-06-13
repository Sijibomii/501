import { create } from "zustand";
import { combine } from "zustand/middleware";

interface TripModalProps {
    isOpen: boolean;
    set: any;
}

export const useTripModal = create<TripModalProps>(
  combine(
    {
      isOpen: false,
    },
    (set: any) => ({
      set,
    })
  )
);