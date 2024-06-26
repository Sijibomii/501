import { create } from "zustand";
import { combine } from "zustand/middleware";

interface InventoryModalProps {
    isOpen: boolean;
    set: any;
}

export const useBusInventoryModal = create<InventoryModalProps>(
  combine(
    {
      isOpen: false,
    },
    (set: any) => ({
      set,
    })
  )
);