"use client"

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavDarkButton() {
    const [isDark, setIsDark] = useState(false);
      
        useEffect(() => {
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }, [isDark]);

        return <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 text-gray-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-500 rounded-full"
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
}