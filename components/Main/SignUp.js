"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, User, Mail, Store, Phone, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from "next/navigation";
import TermsOfServiceDialog from "./TermsOf";
import Image from "next/image";


const translations = {
    eng: {
        title: "Create Account",
        username: "Username",
        password: "Password",
        email: "Email",
        restaurantName: "Restaurant Name",
        phone: "Phone Number (optional)",
        languages: "Languages",
        english: "English",
        hebrew: "Hebrew",
        terms: "By checking here I accept the",
        createAccount: "Create Account",
        enterUsername: "Enter your username",
        createPassword: "Create a password",
        enterEmail: "Enter your email",
        enterRestaurantName: "Enter restaurant name",
        enterPhone: "Enter your phone number"
    },
    heb: {
        title: "יצירת חשבון",
        username: "שם משתמש",
        password: "סיסמה",
        email: "אימייל",
        restaurantName: "שם המסעדה",
        phone: "מספר טלפון (אופציונלי)",
        languages: "שפות",
        english: "אנגלית",
        hebrew: "עברית",
        terms: "בסימון כאן אני מקבל את",
        createAccount: "יצירת חשבון",
        enterUsername: "הכנס שם משתמש",
        createPassword: "צור סיסמה",
        enterEmail: "הכנס אימייל",
        enterRestaurantName: "הכנס שם מסעדה",
        enterPhone: "הכנס מספר טלפון"
    }
};

export default function SignUp({text = 'Sign Up'}) {
    const searchParams = useSearchParams();
    const lang = searchParams?.get('lang') || 'heb';
    const t = translations[lang] || translations.heb;
    const isRTL = lang === 'heb';
    const dir = isRTL ? 'rtl' : 'ltr';

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        restaurantName: '',
        phone: '',
        languages: {
            english: true,
            hebrew: true
        }
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errPass, setErrPass] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [errUsername, setErrUsername] = useState('');
    const [errRestaurantName, setErrRestaurantName] = useState('');
    const [errLanguages, setErrLanguages] = useState('');
    const [errPhone, setErrPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emails, setEmails] = useState();
    const [userNames, setUserNames] = useState();
    const [fetching, setFetching] = useState(true);
    const [errTerms, setErrTerms] = useState('')
    const [terms, setTerms] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/signUpData');
                const json = await response.json();
                const emails = json.users.map(user => user.email);
                const usernames = json.users.map(user => user.username);
                setEmails(emails);
                setUserNames(usernames);
                setFetching(false);


            } catch (err) {
                setErrLanguages('Something went wrong, please try again');
            }
        };

        fetchData();
    }, []);

    const router = useRouter();

    const handleBlur = () => {

        if (userNames.includes(formData.username)) {
            setErrUsername('Username already exists');
        }
        if (emails.includes(formData.email)) {
            setErrEmail('Email already exists');
        }
        if (formData.username.length < 3 && formData.username.length !== 0) {
            setErrUsername('Username must be at least 3 characters');
        }
        if (formData.username.length > 20 && formData.username.length !== 0) {
            setErrUsername('Username must be shorter than 20 characters');
        }
        if (formData.username && formData.username.includes(' ')) {
            setErrUsername('Username cant have spaces');
        }
        if (formData.password.length < 8 && formData.password.length !== 0) {
            setErrPass('Password must be at least 8 characters');
        }
        if (formData.password.length > 30 && formData.password.length !== 0) {
            setErrPass('Password must be shorter than 30 characters');
        }
        if ((!formData.email.includes('@') || !formData.email.includes('.') || formData.email.length > 50) && formData.email !== "") {
            setErrEmail('Invalid email');
        }
        if (formData.restaurantName === "" && formData.restaurantName.length !== 0) {
            setErrRestaurantName('Please enter restaurant name');
        }
        if (formData.restaurantName.length > 100 && formData.restaurantName.length !== 0) {
            setErrRestaurantName('Restaurant name must be shorter than 100 characters');
        }
        if (((formData.phone.length > 15 && formData.phone !== "") || (formData.phone.length < 8 && formData.phone !== "")) && formData.phone !== "") {
            setErrPhone('Invalid phone number');
        }
        if (!formData.languages.english && !formData.languages.hebrew) {
            setErrLanguages('Select at least one language');
        }


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrPass('');
        setErrEmail('');
        setErrUsername('');
        setErrRestaurantName('');
        setErrLanguages('');
        setErrPhone('');
        setErrTerms('')

        if (!/^[a-zA-Z]+$/.test(formData.username)) {
            setErrUsername('Username must be in English');
            setIsLoading(false);
            return;
        }
        if (userNames.includes(formData.username)) {
            setErrUsername('Username already exists');
            setIsLoading(false);
            return;
        }
        
        if (emails.includes(formData.email)) {
            setErrEmail('Email already exists');
            setIsLoading(false);
            return;
        }
        if (formData.username.length < 3) {
            setErrUsername('Username must be at least 3 characters');
            setIsLoading(false);
            return;
        }
        if (formData.username.length > 20) {
            setErrUsername('Username must be shorter than 20 characters');
            setIsLoading(false);
            return;
        }
        if (formData.password.length < 8) {
            setErrPass('Password must be at least 8 characters');
            setIsLoading(false);
            return;
        }
        if (formData.password.length > 30) {
            setErrPass('Password must be shorter than 30 characters');
            setIsLoading(false);
            return;
        }
        if (!formData.email.includes('@') || !formData.email.includes('.') || formData.email.length > 50) {
            setErrEmail('Invalid email');
            setIsLoading(false);
            return;
        }
        if (formData.restaurantName === "") {
            setErrRestaurantName('Please enter restaurant name');
            setIsLoading(false);
            return;
        }
        if (formData.restaurantName.length > 100) {
            setErrRestaurantName('Restaurant name must be shorter than 100 characters');
            setIsLoading(false);
            return;
        }
        if ((formData.phone.length > 15 && formData.phone !== "") || (formData.phone.length < 8 && formData.phone !== "")) {
            setErrPhone('Invalid phone number');
            setIsLoading(false);
            return;
        }
        if (!formData.languages.english && !formData.languages.hebrew) {
            setErrLanguages('Select at least one language');
            setIsLoading(false);
            return;
        }
        if (!terms) {
            setIsLoading(false);
            setErrTerms('Pleas agree to the terms of service');
            return;
        }
        if (fetching) {
            setIsLoading(false);
            setErrLanguages('Something went wrong, please try again');
            return;
        }

        try {
            const response = await fetch('/api/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData,
                }),
            });

            await response.json();

            if (response.ok) {
                router.push('/user/welcomePage');
            }
            else {
                setErrLanguages('Something went wrong, please try again');
            }


        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setErrPass('');
        setErrEmail('');
        setErrUsername('');
        setErrRestaurantName('');
        setErrLanguages('');
        setErrPhone('');
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLanguageChange = (language) => {
        setFormData(prevData => ({
            ...prevData,
            languages: {
                ...prevData.languages,
                [language]: !prevData.languages[language]
            }
        }));
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
        if (newOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
            <Button
            size="lg"
            className="mt-6 text-xl px-12 py-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-600 dark:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 text-white border-0 shadow-xl shadow-amber-800/20 dark:shadow-black/30 rounded-xl flex items-center gap-4 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-800/30 dark:hover:shadow-black/40 hover:translate-y-[-3px] relative overflow-hidden group"
        >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-300/10 to-transparent dark:from-amber-400/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300/60 to-amber-400/30 dark:from-amber-400/40 dark:to-amber-500/20"></div>
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-amber-300/60 to-amber-400/30 dark:from-amber-400/40 dark:to-amber-500/20"></div>
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-amber-300/60 rounded-tl-md"></div>
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-amber-300/60 rounded-tr-md"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-amber-300/60 rounded-bl-md"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-amber-300/60 rounded-br-md"></div>
            <span className="relative z-10 font-semibold tracking-wide">
                {text}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/40 transition-all duration-300 group-hover:h-1"></span>
            </span>
            <ChevronRight className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-md w-[95vw] min-h-[85vh] sm:min-h-[80vh] bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-900/90 backdrop-blur-lg border-2 border-amber-200/50 dark:border-amber-700/30 shadow-[0_20px_60px_-15px_rgba(251,191,36,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.2)] ${isRTL ? 'rtl' : 'ltr'}`} dir={dir}>
                <div className="absolute -top-8 -left-8 w-24 h-24 opacity-40 pointer-events-none select-none">
                    <Image
                        src="/brushstroke1.svg"
                        alt=""
                        width={96}
                        height={96}
                        className="rotate-12"
                    />
                </div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 opacity-40 pointer-events-none select-none">
                    <Image
                        src="/brushstroke2.svg"
                        alt=""
                        width={96}
                        height={96}
                        className="-rotate-12"
                    />
                </div>

                <DialogHeader className="mb-3 px-0">
                    <DialogTitle className="text-2xl sm:text-3xl font-bold text-center text-amber-900 dark:text-amber-300 relative inline-block mx-auto">
                        <span className="relative z-10">{t.title}</span>
                        <div className="absolute h-4 bg-amber-300/30 dark:bg-amber-700/20 left-0 right-0 bottom-1 -z-0 skew-x-3"></div>
                    </DialogTitle>
                </DialogHeader>

                <div className="px-0 w-full flex flex-col justify-between h-full">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="username" className={`text-sm font-medium text-amber-900 dark:text-amber-300 block ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t.username}
                                </Label>
                                <div className="relative">
                                    <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600 dark:text-amber-400`} />
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleChange}
                                        onClick={() => setErrUsername('')}
                                        onBlur={handleBlur}
                                        className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} bg-white/50 dark:bg-gray-800/50 border-amber-200 dark:border-amber-700/50 focus:border-amber-400 dark:focus:border-amber-600 focus:ring-amber-400 dark:focus:ring-amber-600 transition-all duration-300`}
                                        placeholder={t.enterUsername}
                                    />
                                </div>
                                <span className={`text-red-500 text-xs ${isRTL ? 'text-right' : 'text-left'} block`}>
                                    {errUsername}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="password" className={`text-sm font-medium text-amber-900 dark:text-amber-300 block ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t.password}
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        onClick={() => setErrPass('')}
                                        onBlur={handleBlur}
                                        className={`${isRTL ? 'text-right pl-10' : 'text-left pr-10'} bg-white/50 dark:bg-gray-800/50 border-amber-200 dark:border-amber-700/50 focus:border-amber-400 dark:focus:border-amber-600 focus:ring-amber-400 dark:focus:ring-amber-600 transition-all duration-300`}
                                        placeholder={t.createPassword}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 h-full px-3 hover:bg-transparent text-amber-600 dark:text-amber-400`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <span className={`text-red-500 text-xs ${isRTL ? 'text-right' : 'text-left'} block`}>
                                    {errPass}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="email" className={`text-sm font-medium text-amber-900 dark:text-amber-300 block ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t.email}
                                </Label>
                                <div className="relative">
                                    <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600 dark:text-amber-400`} />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        onClick={() => setErrEmail('')}
                                        onBlur={handleBlur}
                                        className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} bg-white/50 dark:bg-gray-800/50 border-amber-200 dark:border-amber-700/50 focus:border-amber-400 dark:focus:border-amber-600 focus:ring-amber-400 dark:focus:ring-amber-600 transition-all duration-300`}
                                        placeholder={t.enterEmail}
                                    />
                                </div>
                                <span className={`text-red-500 text-xs ${isRTL ? 'text-right' : 'text-left'} block`}>
                                    {errEmail}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="restaurantName" className={`text-sm font-medium text-amber-900 dark:text-amber-300 block ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t.restaurantName}
                                </Label>
                                <div className="relative">
                                    <Store className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600 dark:text-amber-400`} />
                                    <Input
                                        id="restaurantName"
                                        name="restaurantName"
                                        type="text"
                                        value={formData.restaurantName}
                                        onChange={handleChange}
                                        onClick={() => setErrRestaurantName('')}
                                        onBlur={handleBlur}
                                        className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} bg-white/50 dark:bg-gray-800/50 border-amber-200 dark:border-amber-700/50 focus:border-amber-400 dark:focus:border-amber-600 focus:ring-amber-400 dark:focus:ring-amber-600 transition-all duration-300`}
                                        placeholder={t.enterRestaurantName}
                                    />
                                </div>
                                <span className={`text-red-500 text-xs ${isRTL ? 'text-right' : 'text-left'} block`}>
                                    {errRestaurantName}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="phone" className={`text-sm font-medium text-amber-900 dark:text-amber-300 block ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t.phone}
                                </Label>
                                <div className="relative">
                                    <Phone className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600 dark:text-amber-400`} />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onClick={() => setErrPhone('')}
                                        onBlur={handleBlur}
                                        className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} bg-white/50 dark:bg-gray-800/50 border-amber-200 dark:border-amber-700/50 focus:border-amber-400 dark:focus:border-amber-600 focus:ring-amber-400 dark:focus:ring-amber-600 transition-all duration-300`}
                                        placeholder={t.enterPhone}
                                    />
                                </div>
                                <span className={`text-red-500 text-xs ${isRTL ? 'text-right' : 'text-left'} block`}>
                                    {errPhone}
                                </span>
                            </div>

                            <div className="space-y-1.5">
                                <Label className={`text-sm font-medium text-amber-900 dark:text-amber-300 block ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t.languages}
                                </Label>
                                <div className="space-y-1.5">
                                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} bg-white/50 dark:bg-gray-800/50 p-2 rounded-xl border border-amber-200/50 dark:border-amber-700/30 transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-600`}>
                                        <Checkbox
                                            id="english"
                                            checked={formData.languages.english}
                                            onCheckedChange={() => handleLanguageChange('english')}
                                            onClick={() => setErrLanguages('')}
                                            onBlur={handleBlur}
                                            className="border-amber-400 dark:border-amber-600"
                                        />
                                        <Label htmlFor="english" className="cursor-pointer text-amber-900 dark:text-amber-300">{t.english}</Label>
                                    </div>
                                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} bg-white/50 dark:bg-gray-800/50 p-2 rounded-xl border border-amber-200/50 dark:border-amber-700/30 transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-600`}>
                                        <Checkbox
                                            id="hebrew"
                                            checked={formData.languages.hebrew}
                                            onCheckedChange={() => handleLanguageChange('hebrew')}
                                            onClick={() => setErrLanguages('')}
                                            onBlur={handleBlur}
                                            className="border-amber-400 dark:border-amber-600"
                                        />
                                        <Label htmlFor="hebrew" className="cursor-pointer text-amber-900 dark:text-amber-300">{t.hebrew}</Label>
                                    </div>
                                </div>
                                <span className={`text-red-500 text-xs ${isRTL ? 'text-right' : 'text-left'} block mt-0.5`}>
                                    {errLanguages}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} bg-white/50 dark:bg-gray-800/50 p-2 rounded-xl border border-amber-200/50 dark:border-amber-700/30 transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-600`}>
                                    <Label htmlFor="terms" className={`cursor-pointer text-amber-900 dark:text-amber-300 ${isRTL ? 'ml-auto' : 'mr-auto'}`}>
                                        {t.terms} <TermsOfServiceDialog />
                                    </Label>
                                    <Checkbox
                                        id="terms"
                                        onCheckedChange={(isChecked) => setTerms(isChecked)}
                                        onClick={() => setErrTerms('')}
                                        onBlur={handleBlur}
                                        className="border-amber-400 dark:border-amber-600"
                                    />
                                </div>
                                <span className={`text-red-500 text-xs ${isRTL ? 'text-right' : 'text-left'} block mt-0.5`}>
                                    {errTerms}
                                </span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className={`w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-600 dark:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 text-white shadow-xl shadow-amber-800/20 dark:shadow-black/30 rounded-xl py-3 mt-4 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-800/30 dark:hover:shadow-black/40 hover:translate-y-[-2px] relative overflow-hidden group ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
                            disabled={isLoading}
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-300/10 to-transparent dark:from-amber-400/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300/60 to-amber-400/30 dark:from-amber-400/40 dark:to-amber-500/20"></div>
                            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-amber-300/60 to-amber-400/30 dark:from-amber-400/40 dark:to-amber-500/20"></div>
                            <span className="relative z-10 font-semibold tracking-wide text-lg">
                                {t.createAccount}
                            </span>
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}