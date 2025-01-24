import { QrCode } from "lucide-react";
import NavDarkButton from "./NavDarkMode";

export default function NavBar() {



  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <QrCode className="h-8 w-8 text-primary dark:text-primary-dark" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">MenuQR</span>
          </div>
          <div className="flex items-center space-x-4">
            <NavDarkButton />
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Login
            </button>
            <button className="bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover dark:hover:bg-primary-hover-dark">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

}