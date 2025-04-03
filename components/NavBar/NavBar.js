import NavDarkButton from "./NavDarkMode";
import SignUp from "../Main/SignUp";
import SignIn from "../Main/SignIn";
import Image from "next/image";
import LanguageSelector from "./LangSelector";

export default function NavBar() {



  return (
    <nav className=" shadow-sm transition-colors duration-200 h-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/menucraft.jpeg"
              alt="Menu Craft"
              width={50}
              height={50}
            />
            <LanguageSelector />
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