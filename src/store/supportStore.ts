import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id?: string;
  avatar?: string;
  email?: string;
  full_name?: string;
}

interface Support {
  id?: string;
  ticketId?: string;
  user?: User;
  subject?: string;
  status?: string;
  updated_at?: Date;
  message?: string;
  replyMessage?: string;
}

interface SupportState {
  supports: Support[];
  setSupports: (supports: Support[]) => void;
  signoutSupport: () => void;
}

export const useSupportStore = create(
  persist<SupportState>(
    (set) => ({
      supports: [],
      setSupports: (supports: Support[]) => {
        set({ supports });
      },
      signoutSupport: () => {
        set({ supports: [] });
      },
    }),
    {
      name: "supportStatus",
    }
  )
);
