import NavDarkButton from "@/components/NavBar/NavDarkMode";
import { destroyAuthSession } from "@/lib/auth";

export default function AppNav() {
    return <div className="bg-gray-50 dark:bg-gray-900 pb-16">
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="flex items-center justify-between px-4 h-14">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">MenuQR</h1>
            <button 
            className="text-sm text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={destroyAuthSession}
            >Logout</button>
            <NavDarkButton />
        </div>
    </header>
    </div>
}