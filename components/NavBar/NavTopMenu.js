import NavDarkButton from "./NavDarkMode";
import { botNav } from "@/components/Menu/Themes";
import LanguageSelector from "./LangSelector";


export default async function NavTopMenu({ theme }) {

  return <>

    <nav className={`${botNav[theme]} shadow-sm transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <LanguageSelector />
          </div>
          <div className="flex items-center space-x-4">
            <NavDarkButton />
          </div>
        </div>
      </div>
    </nav>
  </>
}