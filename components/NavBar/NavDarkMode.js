"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function NavDarkButton() {
  const [theme, setTheme] = useState(null)
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(systemPrefersDark ? 'dark' : 'light')
    }
  }, [])
  
  useEffect(() => {
    if (!theme) return
    
    localStorage.setItem('theme', theme)
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  if (theme === null) {
    return null 
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-black hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-400 rounded-full transition-colors duration-200 hover:bg-amber-100/50 dark:hover:bg-amber-800/20"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}