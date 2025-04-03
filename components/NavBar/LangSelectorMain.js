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

const LanguageSelector = ({ defaultLang = 'heb' }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlLang = searchParams.get('lang');
    const [currentLang, setCurrentLang] = useState(urlLang || defaultLang);
    const [availableLanguages] = useState({
        english: true,
        hebrew: true
    });

    useEffect(() => {
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
    }, [urlLang, searchParams, availableLanguages]);

    const handleValueChange = (value) => {
        setCurrentLang(value);
        localStorage.setItem('preferredLanguage', value);
        const params = new URLSearchParams(searchParams);
        params.set('lang', value);
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Select value={currentLang} onValueChange={handleValueChange}>
            <SelectTrigger className="w-[100px]">
                <SelectValue placeholder={currentLang === 'eng' ? 'EN' : 'HEB'} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
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
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default LanguageSelector;