import NavDarkButton from "./NavDarkMode";
import SignUp from "../Main/SignUp";
import SignIn from "../Main/SignIn";
import Image from "next/image";

export default function NavBar() {



  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Image
              src="/images/menucraft.jpeg"
              alt="Menu Craft"
              width={50}
              height={50}
            />
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