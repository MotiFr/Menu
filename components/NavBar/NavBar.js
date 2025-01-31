import { QrCode } from "lucide-react";
import NavDarkButton from "./NavDarkMode";
import SignUp from "../Main/SignUp";
import SignIn from "../Main/SignIn";

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
            <SignIn />
            <SignUp />
          </div>
        </div>
      </div>
    </nav>
  );

}