import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { STORAGE_KEYS } from '@/constants/catalog'
import type { UserProfile } from '@/types'

type UserState = UserProfile & {
  setProfile: (profile: UserProfile) => void
  resetProfile: () => void
}

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...defaultProfile,
      setProfile: (profile) => set({ ...profile }),
      resetProfile: () => set({ ...defaultProfile }),
    }),
    {
      name: STORAGE_KEYS.USER,
      partialize: (state) => ({
        name: state.name,
        email: state.email,
        phone: state.phone,
      }),
    },
  ),
)
