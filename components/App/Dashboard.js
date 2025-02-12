"use client"
import { Home, Menu as MenuIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Dashboard() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 pb-16">
            <main className="pt-16 px-4 max-w-4xl mx-auto">
            </main>
            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-around h-16">
                    <Link
                        href="/user/welcomePage"
                        className={`flex flex-col items-center px-4 py-2 text-sm ${isActive('/user/welcomePage')
                                ? 'text-primary dark:text-primary-dark'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        <Home className="h-6 w-6" />
                        <span className="mt-1">Home</span>
                    </Link>
                    <Link
                        href="/user/menuPage"
                        className={`flex flex-col items-center px-4 py-2 text-sm ${isActive('/user/menuPage')
                                ? 'text-primary dark:text-primary-dark'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        <MenuIcon className="h-6 w-6" />
                        <span className="mt-1">Menu</span>
                    </Link>
                    <Link
                        href="/user/editMenuPage"
                        className={`flex flex-col items-center px-4 py-2 text-sm ${isActive('/user/editMenuPage')
                                ? 'text-primary dark:text-primary-dark'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        <Settings className="h-6 w-6" />
                        <span className="mt-1">Edit</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}