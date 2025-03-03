import NavDarkButton from "./NavDarkMode";
import { botNav } from "@/components/Menu/Themes";
import LanguageSelectorMenu from "./LangSelectorMenu";


export default async function NavTopMenu({ theme, restname }) {

  return <>

    <nav className={`${botNav[theme]} shadow-sm transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <LanguageSelectorMenu
            restname={restname}
            />
          </div>
          <div className="flex items-center space-x-4">
            <NavDarkButton />
          </div>
        </div>
      </div>
    </nav>
  </>
}