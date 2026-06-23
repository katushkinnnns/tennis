import { STORAGE_KEYS } from '@/constants/catalog'
import type { Theme } from '@/types/theme'

type PersistedThemeState = {
  state?: {
    theme?: Theme
  }
}

export const applyThemeClass = (theme: Theme): void => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export const getPersistedTheme = (): Theme | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.THEME)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as PersistedThemeState
    const theme = parsed.state?.theme
    return theme === 'dark' || theme === 'light' ? theme : null
  } catch {
    return null
  }
}

export const initializeTheme = (): void => {
  const persistedTheme = getPersistedTheme()
  if (!persistedTheme) {
    return
  }

  applyThemeClass(persistedTheme)
}
