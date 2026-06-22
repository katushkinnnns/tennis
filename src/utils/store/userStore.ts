import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { STORAGE_KEYS } from '@/utils/constants/catalog'
import type { UserProfile } from '@/utils/types/product'

type UserState = UserProfile & {
  setProfile: (profile: UserProfile) => void
  resetProfile: () => void
}

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
}

/**
 * Store профиля пользователя с персистентностью в localStorage.
 */
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
