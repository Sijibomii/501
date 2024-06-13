import { create } from "zustand";
import { combine } from "zustand/middleware";

type AllowedPages = string; //'dash' | 'inventory' | 'route' | 'settings';

interface CurrentPageState {
    currentPage: AllowedPages;
    set: any;
}

export const useCurrentPage = create<CurrentPageState>(
  combine(
    {
      currentPage: 'dash',
    },
    (set: any) => ({
      set,
    })
  )
);