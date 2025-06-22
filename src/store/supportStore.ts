import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./userStore";

export interface Support {
  id?: string;
  ticketId?: string;
  user?: User;
  subject?: string;
  status?: string;
  updated_at?: string;
  message?: string;
  replyMessage?: string;
}

interface SupportState {
  supports: Support[];
  allSupports: Support[];
  setSupports: (supports: Support[]) => void;
  setAllSupports: (supports: Support[]) => void;
  signoutSupport: () => void;
}

export const useSupportStore = create(
  persist<SupportState>(
    (set) => ({
      allSupports: [],
      supports: [],
      setSupports: (supports: Support[]) => {
        set({ supports });
      },
      setAllSupports: (supports: Support[]) => {
        set({ allSupports: supports });
      },
      signoutSupport: () => {
        set({ supports: [] });
        set({ allSupports: [] });
      },
    }),
    {
      name: "supportStatus",
    }
  )
);
