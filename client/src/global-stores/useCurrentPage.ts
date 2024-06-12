import { create } from "zustand";
import { combine } from "zustand/middleware";

type AllowedPages = 'dash' | 'inventory' | 'route' | 'settings';

interface CurrentPageState {
    page: AllowedPages;
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