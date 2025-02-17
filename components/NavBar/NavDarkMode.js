"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function NavDarkButton() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      return savedTheme === 'dark'
    }
    return false
  })
  
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!localStorage.getItem('theme')) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(systemPrefersDark)
    }
  }, [])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 text-black hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-500 rounded-full"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}