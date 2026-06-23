import { useEffect } from 'react'

import { useThemeStore } from '@/stores/themeStore'
import { applyThemeClass } from '@/lib/theme'
import type { Theme } from '@/types/theme'

type UseThemeReturn = {
  theme: Theme
  isDark: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useTheme = (): UseThemeReturn => {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  useEffect(() => {
    applyThemeClass(theme)
  }, [theme])

  return {
    theme,
    isDark: theme === 'dark',
    setTheme,
    toggleTheme,
  }
}
