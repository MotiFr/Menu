"use client"
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

const LanguageSelectorMenu = ({ defaultLang = 'eng', restname }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlLang = searchParams.get('lang');
    const [currentLang, setCurrentLang] = useState(urlLang || defaultLang);
    const [availableLanguages, setAvailableLanguages] = useState({
        english: false,
        hebrew: false
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLanguages = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/languagesMenu', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({restname})
                });
                if (!response.ok) throw new Error('Failed to fetch languages');
                const lang = await response.json();
                const data = lang.languages;
                setAvailableLanguages(data);
                
                if (data.english && !data.hebrew) {
                    setCurrentLang('eng');
                    localStorage.setItem('preferredLanguage', 'eng');
                    const params = new URLSearchParams(searchParams);
                    params.set('lang', 'eng');
                    router.push(`${pathname}?${params.toString()}`);
                } else if (!data.english && data.hebrew) {
                    setCurrentLang('heb');
                    localStorage.setItem('preferredLanguage', 'heb');
                    const params = new URLSearchParams(searchParams);
                    params.set('lang', 'heb');
                    router.push(`${pathname}?${params.toString()}`);
                }
            } catch (error) {
                console.error('Error fetching languages:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        if (urlLang && urlLang !== currentLang) {
            if ((urlLang === 'eng' && availableLanguages.english) || 
                (urlLang === 'heb' && availableLanguages.hebrew)) {
                setCurrentLang(urlLang);
                localStorage.setItem('preferredLanguage', urlLang);
            }
        } else if (!urlLang) {
            const storedLang = localStorage.getItem('preferredLanguage') || defaultLang;
            
            let validLang = storedLang;
            if (storedLang === 'eng' && !availableLanguages.english) {
                validLang = availableLanguages.hebrew ? 'heb' : defaultLang;
            } else if (storedLang === 'heb' && !availableLanguages.hebrew) {
                validLang = availableLanguages.english ? 'eng' : defaultLang;
            }
            
            if (validLang !== currentLang) {
                setCurrentLang(validLang);
                const params = new URLSearchParams(searchParams);
                params.set('lang', validLang);
                router.push(`${pathname}?${params.toString()}`);
            }
        }
    }, [urlLang, searchParams, isLoading, availableLanguages]);

    const handleValueChange = (value) => {
        setCurrentLang(value);
        localStorage.setItem('preferredLanguage', value);
        const params = new URLSearchParams(searchParams);
        params.set('lang', value);
        router.push(`${pathname}?${params.toString()}`);
    };

    if (
        (!availableLanguages.english && !availableLanguages.hebrew) || 
        (availableLanguages.english && !availableLanguages.hebrew) || 
        (!availableLanguages.english && availableLanguages.hebrew)
    ) {
        return null;
    }

    return (
        <Select value={currentLang} onValueChange={handleValueChange} disabled={isLoading}>
            <SelectTrigger className="w-[100px]">
                <SelectValue placeholder={currentLang === 'eng' ? 'EN' : 'HEB'} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    {availableLanguages.english && (
                        <SelectItem value="eng">
                            <div className="flex items-center gap-2">
                                <Image
                                    height={50}
                                    width={50}
                                    src="https://cdn-icons-png.flaticon.com/512/3909/3909383.png"
                                    alt="English"
                                    className="w-5 h-5"
                                />
                                <span>EN</span>
                            </div>
                        </SelectItem>
                    )}
                    {availableLanguages.hebrew && (
                        <SelectItem value="heb">
                            <div className="flex items-center gap-2">
                                <Image
                                    height={50}
                                    width={50}
                                    src="https://cdn-icons-png.flaticon.com/512/3909/3909391.png"
                                    alt="Hebrew"
                                    className="w-5 h-5"
                                />
                                <span>HEB</span>
                            </div>
                        </SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default LanguageSelectorMenu;