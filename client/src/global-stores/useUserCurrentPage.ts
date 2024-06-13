import { create } from "zustand";
import { combine } from "zustand/middleware";

type AllowedPages = 'home' | 'route' | 'settings';

interface UserCurrentPageState {
    page: AllowedPages;
}

export const useUserCurrentPage = create<UserCurrentPageState>(
  combine(
    {
      currentPage: 'home',
    },
    (set: any) => ({
      set,
    })
  )
);