"use client"

import { Home, List } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { botNav } from '@/components/Menu/Themes';

export default function NavBarMenu({ id, theme }) {
    const pathname = usePathname();
    const [selectionCount, setSelectionCount] = useState(0);
    const [language, setLanguage] = useState('');

    const isActive = (path) => pathname === path;

    const getLocalizedValue = (engValue, hebValue) => language === 'eng' ? engValue : hebValue;
    
    useEffect(() => {
        const updateLanguage = () => {
            const preferredLanguage = localStorage.getItem('preferredLanguage');
            setLanguage(preferredLanguage || '');
        };

        const updateCount = () => {
            const selections = JSON.parse(localStorage.getItem(`selections-${id}`) || '[]');
            setSelectionCount(selections.length);
        };

        updateLanguage();
        updateCount();

        const handleStorageChange = (e) => {
            if (e.key === 'preferredLanguage') {
                updateLanguage();
            }
            updateCount();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('selectionsUpdated', updateCount);

        const languageInterval = setInterval(updateLanguage, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('selectionsUpdated', updateCount);
            clearInterval(languageInterval);
        };
    }, [id]);

    const getUrlWithLang = (baseUrl) => {
        if (language === 'eng') return `${baseUrl}?lang=eng`;
        if (language === 'heb') return `${baseUrl}?lang=heb`;
        return baseUrl;
    };

    return (
        <>
            <div className="h-14 w-full" /> 
            
            <nav className={`${botNav[theme.theme]} fixed bottom-0 left-0 right-0 shadow-2xl border-t border-gray-200 dark:border-gray-700 rounded-t-2xl`}>
                <div className="flex items-center justify-around h-14 px-4">
                    <Link
                        href={getUrlWithLang(`/menu/${id}`)}
                        className={`flex flex-col items-center justify-center w-full py-2 rounded-lg transition-all duration-300 ${
                            isActive(`/menu/${id}`)
                                ? 'bg-primary/10 text-primary dark:text-primary-light'
                                : 'text-black dark:text-white'
                        }`}
                    >
                        <Home className="h-5 w-5 mb-0.5" />
                        <span className="text-sm font-medium">{getLocalizedValue("Menu", "תפריט")}</span>
                    </Link>
                    <Link
                        href={getUrlWithLang(`/menu/${id}/selections`)}
                        className={`flex flex-col items-center justify-center w-full py-2 rounded-lg transition-all duration-300 ${
                            isActive(`/menu/${id}/selections`)
                                ? 'bg-primary/10 text-primary dark:text-primary-light'
                                : 'text-black dark:text-white'
                        }`}
                    >
                        <div className="relative">
                            <List className="h-5 w-5 mb-0.5" />
                            {selectionCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {selectionCount}
                                </span>
                            )}
                        </div>
                        <span className="text-sm font-medium">{getLocalizedValue("My Selections", "הבחירות שלי")}</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}