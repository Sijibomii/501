import { create } from "zustand";
import { combine } from "zustand/middleware";

type AllowedPages = string; //'home' | 'route' | 'settings';

interface UserCurrentPageState {
    currentPage: AllowedPages;
    set: any;
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