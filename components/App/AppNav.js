import NavDarkButton from "@/components/NavBar/NavDarkMode";

export default function AppNav() {
    return <div className="bg-gray-50 dark:bg-gray-900 pb-16">
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="flex items-center justify-between px-4 h-14">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">MenuQR</h1>
            <NavDarkButton />
        </div>
    </header>
    </div>
}