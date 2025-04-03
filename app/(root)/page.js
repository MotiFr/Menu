import Image from "next/image";
import LanguageSelectorMain from "@/components/NavBar/LangSelectorMain";
import NavDarkButton from "@/components/NavBar/NavDarkMode";
import SignIn from "@/components/Main/SignIn";
import SignUp from "@/components/Main/SignUp";
import ContactUsButton from "@/components/Main/ContactUsButton";
import { BackgroundDecorations, HeadingDecorations, SubtitleDecorations, ButtonDecorations, PhoneMockup, FloatingDots, CornerAccents } from "@/app/(root)/functions";

const translations = {
    eng: {
        title: "Transform Your Menu Into A Digital Experience",
        subtitle: "Upload your menu and make it a digital experience with stunning designs, and easy to use.",
        getStarted: "Get Started"
    },
    heb: {
        title: "הפכו את התפריט שלכם לחוויה דיגיטלית",
        subtitle: "העלו את התפריט שלכם והמירו אותו לתפריט דיגיטלי אטרקטיבי, עם עיצובים חדשניים וקלים ליישום.",
        getStarted: "התחילו עכשיו"
    },
};

export default async function Home({ searchParams }) {
    const lang = (await searchParams)?.lang || 'heb';
    const t = translations[lang] || translations.heb;
    const isRTL = lang === 'heb';
    const dir = isRTL ? 'rtl' : 'ltr';

    return (
        <div className={`${isRTL ? 'text-right' : 'text-left'}`} dir={dir}>
            <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-900 min-h-screen">
                {/* Dark mode artistic background overlay */}
                <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.06)_0%,_transparent_40%)] dark:bg-[radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.06)_0%,_transparent_40%)]"></div>
                <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,191,36,0.03)_1px,transparent_1px)] dark:bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 dark:bg-[radial-gradient(circle_800px_at_100%_200px,rgba(251,191,36,0.08),transparent),radial-gradient(circle_800px_at_0%_300px,rgba(251,191,36,0.08),transparent)]"></div>

                <nav className="shadow-sm transition-colors duration-200 dark:bg-gray-900/50 backdrop-blur-sm" dir={"ltr"}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center space-x-4">
                                <Image
                                    src="/images/menucraft.jpeg"
                                    alt="Menu Craft"
                                    width={50}
                                    height={50}
                                />
                                <LanguageSelectorMain />
                            </div>
                            <div className="flex items-center space-x-4">
                                <NavDarkButton />
                                <SignIn text={lang === 'eng' ? 'Login' : 'כניסה'} />
                            </div>
                        </div>
                    </div>
                </nav>
                
                <BackgroundDecorations />

                <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 md:pt-16 w-full">
                    <div className="flex flex-col items-center justify-start py-6 md:py-8 gap-3 md:gap-4 text-center px-4">
                        <div className="relative mt-4">
                            <HeadingDecorations />

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-amber-900 dark:text-amber-300 inline-block relative max-w-4xl mx-auto leading-tight">
                                <span className="relative z-10">
                                    {t.title}
                                </span>
                                <div className="absolute h-5 md:h-6 bg-amber-300/30 dark:bg-amber-700/20 left-0 right-0 bottom-2 -z-0 skew-x-3"></div>
                            </h1>
                        </div>

                        <div className="relative max-w-3xl mx-auto px-4 md:px-0">
                            <SubtitleDecorations />

                            <p className="text-lg md:text-xl text-amber-800 dark:text-amber-300 font-medium relative inline-block leading-relaxed">
                                <span className="relative z-10">
                                    {t.subtitle}
                                </span>
                                <span className="absolute h-3 bg-amber-300/20 dark:bg-amber-700/20 left-0 right-0 bottom-1 -z-0 -skew-x-3"></span>
                            </p>
                        </div>

                        <div className="mt-8 md:mt-12 relative">
                            <ButtonDecorations />

                            <div className="relative flex justify-center">
                                <div className="relative group">
                                    {/* Artistic background layers */}
                                    <div className="absolute -inset-16 opacity-20 dark:opacity-15 pointer-events-none">
                                        <Image
                                            src="/ink-splash.svg"
                                            alt=""
                                            width={600}
                                            height={600}
                                            className="w-full h-full object-cover transform scale-110 dark:hue-rotate-15 group-hover:scale-125 group-hover:rotate-3 transition-all duration-1000"
                                        />
                                    </div>
                                    <div className="absolute -inset-8 opacity-30 dark:opacity-20 pointer-events-none">
                                        <Image
                                            src="/watercolor.svg"
                                            alt=""
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-cover transform rotate-180 scale-110 dark:hue-rotate-15 group-hover:scale-125 group-hover:-rotate-175 transition-all duration-1000"
                                        />
                                    </div>
                                    
                                    {/* Flowing blobs */}
                                    <div className="absolute -top-12 -left-12 w-28 h-28 bg-amber-300/10 dark:bg-amber-500/10 rounded-full blur-xl animate-blob"></div>
                                    <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-amber-400/10 dark:bg-amber-600/10 rounded-full blur-xl animate-blob animation-delay-2000"></div>
                                    
                                    {/* Hand-drawn frame effect */}
                                    <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-amber-100/50 dark:border-amber-800/30 rounded-xl transform -rotate-1"></div>
                                    <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-amber-200/30 dark:border-amber-700/20 rounded-xl transform rotate-1"></div>
                                    
                                    {/* Main container */}
                                    <div className="relative bg-gradient-to-br from-white/90 via-white/80 to-white/90 dark:from-gray-800/90 dark:via-gray-800/80 dark:to-gray-800/90 backdrop-blur-md rounded-xl p-8 border-2 border-amber-100/50 dark:border-amber-800/30 shadow-[0_10px_50px_-12px_rgba(251,191,36,0.25)] dark:shadow-[0_10px_50px_-12px_rgba(251,191,36,0.15)] overflow-hidden">
                                        {/* Corner brushstrokes */}
                                        <div className="absolute -top-6 -left-6 w-16 h-16 opacity-70 dark:opacity-50 pointer-events-none">
                                            <Image
                                                src="/brushstroke1.svg"
                                                alt=""
                                                width={64}
                                                height={64}
                                                className="rotate-12 group-hover:rotate-[30deg] transition-all duration-1000"
                                            />
                                        </div>
                                        <div className="absolute -bottom-6 -right-6 w-16 h-16 opacity-70 dark:opacity-50 pointer-events-none">
                                            <Image
                                                src="/brushstroke2.svg"
                                                alt=""
                                                width={64}
                                                height={64}
                                                className="-rotate-12 group-hover:-rotate-[30deg] transition-all duration-1000"
                                            />
                                        </div>
                                        
                                        {/* Artistic ribbon banner */}
                                        <div className="absolute -top-1 -right-3 transform rotate-6 group-hover:rotate-3 transition-all duration-700">
                                            <div className="relative">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/40 to-amber-600/40 dark:from-amber-500/30 dark:to-amber-600/30 blur-md rounded-sm"></div>
                                                <div className="relative bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 px-6 py-1.5 text-white text-sm font-medium shadow-lg before:absolute before:content-[''] before:bottom-0 before:-left-4 before:border-t-[8px] before:border-r-[8px] before:border-t-transparent before:border-r-amber-700/80">
                                                    {lang === 'eng' ? '1 Month Free Trial' : 'חודש ניסיון חינם'}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Content with artistic elements */}
                                        <div className="flex flex-col items-center">
                                            <div className="relative transform group-hover:scale-105 transition-all duration-700">
                                                
                                            </div>
                                            
                                            <div className="relative w-full group-hover:scale-[1.03] transition-transform duration-700">
                                                <SignUp text={t.getStarted} />
                                            </div>
                                        </div>
                                        
                                        {/* Flowing underline */}
                                        <div className="absolute bottom-4 left-0 right-0 h-1 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent dark:via-amber-500/30 animate-flow"></div>
                                        </div>
                                        
                                        {/* Artistic dots */}
                                        <div className="absolute top-1/4 left-3 w-2 h-2 bg-amber-400/60 dark:bg-amber-500/60 rounded-full animate-float"></div>
                                        <div className="absolute bottom-1/3 right-5 w-1.5 h-1.5 bg-amber-500/60 dark:bg-amber-600/60 rounded-full animate-float-delayed"></div>
                                        <div className="absolute top-2/3 right-3 w-1 h-1 bg-amber-600/60 dark:bg-amber-700/60 rounded-full animate-float animation-delay-4000"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advantages Section */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 md:pt-32 pb-16 md:pb-24 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-20 items-center">
                        {/* Phone Mockup */}
                        <PhoneMockup />

                        {/* Advantages List */}
                        <div className="relative">
                            <div className="absolute -top-16 -left-16 w-32 h-32 opacity-30 pointer-events-none">
                                <Image
                                    src="/ink-splash.svg"
                                    alt=""
                                    width={128}
                                    height={128}
                                />
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 dark:text-amber-300 mb-8 relative inline-block">
                                <span className="relative z-10">
                                    {lang === 'eng' ? 'Advantages' : 'יתרונות'}
                                </span>
                                <div className="absolute h-4 bg-amber-300/30 dark:bg-amber-700/20 left-0 right-0 bottom-1 -z-0 skew-x-3"></div>
                                <div className="absolute -bottom-3 left-0 w-12 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
                            </h2>
                            
                            <div className="space-y-3.5 max-h-[480px] md:max-h-[580px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-amber-100 dark:scrollbar-thumb-amber-700 dark:scrollbar-track-gray-800">
                                {/* Advantage 1 */}
                                <div className="relative group transition-all duration-300 transform hover:-translate-y-1 hover:translate-x-1">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-amber-50/30 to-transparent dark:from-amber-900/20 dark:via-amber-800/10 dark:to-transparent rounded-lg -z-10 transition-all duration-300 group-hover:from-amber-200/60 dark:group-hover:from-amber-700/30"></div>
                                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500 rounded-full transition-all duration-300 group-hover:w-1.5 group-hover:h-[calc(100%+4px)] group-hover:-top-1"></div>
                                    <div className="pl-4 py-2.5 pr-3">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 flex-shrink-0 mr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-0 relative tracking-wide group-hover:text-amber-700 dark:group-hover:text-amber-100 transition-colors duration-300">
                                                {lang === 'eng' ? 'Real-Time Updates' : 'עדכונים בזמן אמת'}
                                            </h3>
                                        </div>
                                        <p className="text-amber-700 dark:text-amber-300/80 leading-snug text-sm mt-1 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors duration-300 ml-8">
                                            {lang === 'eng' 
                                                ? 'Instantly update your menu and see changes live—no delays, no reprints.' 
                                                : 'עדכנו את התפריט שלכם מיד ותראו את השינויים באופן מיידי – בלי עיכובים וללא צורך בהדפסה מחדש.'}
                                        </p>
                                    </div>
                                    <div className="absolute right-2 top-2 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                                        <Image
                                            src="/brushstroke-accent2.svg"
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="rotate-45"
                                        />
                                    </div>
                                </div>
                                
                                {/* Advantage 2 */}
                                <div className="relative group transition-all duration-300 transform hover:-translate-y-1 hover:translate-x-1">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-amber-50/30 to-transparent dark:from-amber-900/20 dark:via-amber-800/10 dark:to-transparent rounded-lg -z-10 transition-all duration-300 group-hover:from-amber-200/60 dark:group-hover:from-amber-700/30"></div>
                                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500 rounded-full transition-all duration-300 group-hover:w-1.5 group-hover:h-[calc(100%+4px)] group-hover:-top-1"></div>
                                    <div className="pl-4 py-2.5 pr-3">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 flex-shrink-0 mr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-0 relative tracking-wide group-hover:text-amber-700 dark:group-hover:text-amber-100 transition-colors duration-300">
                                                {lang === 'eng' ? 'Stunning Designs' : 'עיצובים מרהיבים'}
                                            </h3>
                                        </div>
                                        <p className="text-amber-700 dark:text-amber-300/80 leading-snug text-sm mt-1 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors duration-300 ml-8">
                                            {lang === 'eng' 
                                                ? 'Choose from beautiful templates and tailor your menu\'s look to match your brand.' 
                                                : 'בחרו מתבניות יפות והתאימו את מראה התפריט כך שישקף בצורה מושלמת את המותג שלכם.'}
                                        </p>
                                    </div>
                                    <div className="absolute right-2 top-2 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                                        <Image
                                            src="/brushstroke-accent2.svg"
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="rotate-45"
                                        />
                                    </div>
                                </div>
                                
                                {/* Advantage 3 */}
                                <div className="relative group transition-all duration-300 transform hover:-translate-y-1 hover:translate-x-1">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-amber-50/30 to-transparent dark:from-amber-900/20 dark:via-amber-800/10 dark:to-transparent rounded-lg -z-10 transition-all duration-300 group-hover:from-amber-200/60 dark:group-hover:from-amber-700/30"></div>
                                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500 rounded-full transition-all duration-300 group-hover:w-1.5 group-hover:h-[calc(100%+4px)] group-hover:-top-1"></div>
                                    <div className="pl-4 py-2.5 pr-3">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 flex-shrink-0 mr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-0 relative tracking-wide group-hover:text-amber-700 dark:group-hover:text-amber-100 transition-colors duration-300">
                                                {lang === 'eng' ? 'QR Code Generation' : 'יצירת קוד QR'}
                                            </h3>
                                        </div>
                                        <p className="text-amber-700 dark:text-amber-300/80 leading-snug text-sm mt-1 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors duration-300 ml-8">
                                            {lang === 'eng' 
                                                ? 'Receive a unique QR code the moment you sign up, making customer access effortless.' 
                                                : 'קבלו קוד QR ייחודי ברגע ההרשמה, להבטחת גישה קלה ונוחה ללקוחותיכם.'}
                                        </p>
                                    </div>
                                    <div className="absolute right-2 top-2 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                                        <Image
                                            src="/brushstroke-accent2.svg"
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="rotate-45"
                                        />
                                    </div>
                                </div>
                                
                                {/* Advantage 4 */}
                                <div className="relative group transition-all duration-300 transform hover:-translate-y-1 hover:translate-x-1">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-amber-50/30 to-transparent dark:from-amber-900/20 dark:via-amber-800/10 dark:to-transparent rounded-lg -z-10 transition-all duration-300 group-hover:from-amber-200/60 dark:group-hover:from-amber-700/30"></div>
                                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500 rounded-full transition-all duration-300 group-hover:w-1.5 group-hover:h-[calc(100%+4px)] group-hover:-top-1"></div>
                                    <div className="pl-4 py-2.5 pr-3">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 flex-shrink-0 mr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-0 relative tracking-wide group-hover:text-amber-700 dark:group-hover:text-amber-100 transition-colors duration-300">
                                                {lang === 'eng' ? 'User-Friendly Interface' : 'ממשק ידידותי למשתמש'}
                                            </h3>
                                        </div>
                                        <p className="text-amber-700 dark:text-amber-300/80 leading-snug text-sm mt-1 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors duration-300 ml-8">
                                            {lang === 'eng' 
                                                ? 'Manage your digital menu easily from any device, ensuring a smooth and intuitive experience.' 
                                                : 'ניהול התפריט הדיגיטלי נעשה בקלות מכל מכשיר, מה שמבטיח חוויה חלקה ואינטואיטיבית.'}
                                        </p>
                                    </div>
                                    <div className="absolute right-2 top-2 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                                        <Image
                                            src="/brushstroke-accent2.svg"
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="rotate-45"
                                        />
                                    </div>
                                </div>
                                
                                {/* Advantage 5 */}
                                <div className="relative group transition-all duration-300 transform hover:-translate-y-1 hover:translate-x-1">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-amber-50/30 to-transparent dark:from-amber-900/20 dark:via-amber-800/10 dark:to-transparent rounded-lg -z-10 transition-all duration-300 group-hover:from-amber-200/60 dark:group-hover:from-amber-700/30"></div>
                                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500 rounded-full transition-all duration-300 group-hover:w-1.5 group-hover:h-[calc(100%+4px)] group-hover:-top-1"></div>
                                    <div className="pl-4 py-2.5 pr-3">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 flex-shrink-0 mr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-0 relative tracking-wide group-hover:text-amber-700 dark:group-hover:text-amber-100 transition-colors duration-300">
                                                {lang === 'eng' ? 'Multilingual Support' : 'תמיכה בשפות מרובות'}
                                            </h3>
                                        </div>
                                        <p className="text-amber-700 dark:text-amber-300/80 leading-snug text-sm mt-1 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors duration-300 ml-8">
                                            {lang === 'eng' 
                                                ? 'Fully optimized for both English and Hebrew, catering to your diverse clientele.' 
                                                : 'מערכת מותאמת לשתי השפות – אנגלית ועברית – כדי לתת מענה לקהל מגוון.'}
                                        </p>
                                    </div>
                                    <div className="absolute right-2 top-2 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                                        <Image
                                            src="/brushstroke-accent2.svg"
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="rotate-45"
                                        />
                                    </div>
                                </div>

                                {/* New Advantage 6 - Lightning-Fast Performance */}
                                <div className="relative group transition-all duration-300 transform hover:-translate-y-1 hover:translate-x-1">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-amber-50/30 to-transparent dark:from-amber-900/20 dark:via-amber-800/10 dark:to-transparent rounded-lg -z-10 transition-all duration-300 group-hover:from-amber-200/60 dark:group-hover:from-amber-700/30"></div>
                                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500 rounded-full transition-all duration-300 group-hover:w-1.5 group-hover:h-[calc(100%+4px)] group-hover:-top-1"></div>
                                    <div className="pl-4 py-2.5 pr-3">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 flex-shrink-0 mr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-0 relative tracking-wide group-hover:text-amber-700 dark:group-hover:text-amber-100 transition-colors duration-300">
                                                {lang === 'eng' ? 'Lightning-Fast Performance' : 'ביצועים מהירים במיוחד'}
                                            </h3>
                                        </div>
                                        <p className="text-amber-700 dark:text-amber-300/80 leading-snug text-sm mt-1 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors duration-300 ml-8">
                                            {lang === 'eng' 
                                                ? 'Experience near-instant menu rendering thanks to our advanced server-side rendering technology.' 
                                                : 'חוו טעינה מהירה של התפריט הודות לטכנולוגיית עיבוד צד-שרת מתקדמת שלנו.'}
                                        </p>
                                    </div>
                                    <div className="absolute right-2 top-2 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                                        <Image
                                            src="/brushstroke-accent2.svg"
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="rotate-45"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced QR Code Section */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 md:pb-24 w-full -mt-8 md:-mt-16">
                    <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto relative group/qr">
                        {/* Ambient glow effects */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-amber-500/20 to-amber-600/30 dark:from-amber-400/20 dark:via-amber-500/10 dark:to-amber-600/20 rounded-[2rem] blur-2xl scale-90 opacity-75 transition-all duration-700 ease-out group-hover/qr:scale-110 group-hover/qr:blur-3xl group-hover/qr:opacity-100"></div>
                        <div className="absolute inset-0 bg-gradient-to-tl from-amber-300/20 via-amber-400/10 to-amber-500/20 dark:from-amber-300/10 dark:via-amber-400/5 dark:to-amber-500/10 rounded-[2rem] blur-xl scale-95 rotate-180 opacity-50 transition-all duration-700 ease-out group-hover/qr:scale-105 group-hover/qr:blur-2xl group-hover/qr:opacity-75"></div>

                        {/* Main QR container */}
                        <div className="relative mb-6">
                            {/* Decorative elements */}
                            <div className="absolute -top-8 -left-8 w-20 h-20 opacity-40 transition-all duration-700 ease-out group-hover/qr:rotate-12 group-hover/qr:scale-110 group-hover/qr:opacity-60">
                                <Image
                                    src="/brushstroke1.svg"
                                    alt=""
                                    width={80}
                                    height={80}
                                    className="rotate-12"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-20 h-20 opacity-40 transition-all duration-700 ease-out group-hover/qr:-rotate-12 group-hover/qr:scale-110 group-hover/qr:opacity-60">
                                <Image
                                    src="/brushstroke2.svg"
                                    alt=""
                                    width={80}
                                    height={80}
                                    className="-rotate-12"
                                />
                            </div>

                            {/* QR Code wrapper */}
                            <div className="relative bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/80 backdrop-blur-md p-7 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] border border-amber-200/50 dark:border-amber-700/30 transition-all duration-700 ease-out group-hover/qr:shadow-[0_25px_60px_-12px_rgba(251,191,36,0.3)] dark:group-hover/qr:shadow-[0_25px_60px_-12px_rgba(251,191,36,0.2)] group-hover/qr:border-amber-300/60 dark:group-hover/qr:border-amber-600/40">
                                {/* Corner dots */}
                                <div className="absolute top-3 left-3 w-3 h-3 opacity-40 group-hover/qr:opacity-60">
                                    <Image
                                        src="/sketch-dot.svg"
                                        alt=""
                                        width={12}
                                        height={12}
                                    />
                                </div>
                                <div className="absolute bottom-3 right-3 w-3 h-3 opacity-40 group-hover/qr:opacity-60">
                                    <Image
                                        src="/sketch-dot.svg"
                                        alt=""
                                        width={12}
                                        height={12}
                                    />
                                </div>

                                <div className="relative transition-all duration-700 ease-out group-hover/qr:scale-[1.02] group-hover/qr:rotate-1">
                                    {/* Inner glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-amber-400/30 dark:from-amber-400/20 dark:to-amber-600/20 rounded-2xl blur-md opacity-0 transition-opacity duration-700 ease-out group-hover/qr:opacity-100"></div>
                                    
                                    {/* QR Code */}
                                    <div className="relative bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm">
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800/30 dark:to-amber-900/30 rounded-2xl opacity-0 transition-opacity duration-700 ease-out group-hover/qr:opacity-100"></div>
                                        <Image
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://www.menucraftqr.com/menu/moti&bgcolor=FFFFFF00`}
                                            alt="QR Code for Menu"
                                            width={180}
                                            height={180}
                                            className="relative z-10 transition-transform duration-700 ease-out rounded-xl mix-blend-multiply dark:mix-blend-normal dark:invert dark:brightness-90"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text content */}
                        <div className="relative inline-block transition-all duration-700 ease-out group-hover/qr:transform group-hover/qr:translate-y-1">
                            <p className={`text-lg font-semibold text-amber-800 dark:text-amber-300 relative inline-block leading-relaxed mb-2 ${isRTL ? 'rtl' : 'ltr'}`}>
                                <span className="relative z-10">
                                    {lang === 'eng' ? 'Want to try it yourself?' : 'רוצים לנסות בעצמכם?'}
                                </span>
                                <span className="absolute h-2.5 bg-gradient-to-r from-amber-300/40 to-amber-400/20 dark:from-amber-700/30 dark:to-amber-600/20 left-0 right-0 bottom-0.5 -z-0 -skew-x-3 transition-all duration-700 ease-out group-hover/qr:h-3 group-hover/qr:from-amber-300/50 group-hover/qr:to-amber-400/30 dark:group-hover/qr:from-amber-600/40 dark:group-hover/qr:to-amber-700/30"></span>
                            </p>
                            <p className={`text-sm text-amber-700/90 dark:text-amber-400/90 ${isRTL ? 'rtl' : 'ltr'} transition-all duration-700 ease-out group-hover/qr:text-amber-800 dark:group-hover/qr:text-amber-300`}>
                                {lang === 'eng' ? 'Scan with your smartphone camera' : 'סרקו עם מצלמת הסמארטפון'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 md:pb-32 w-full">
                    {/* Background Effects */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-300/20 dark:bg-amber-600/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-amber-400/20 dark:bg-amber-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="text-center mb-16 relative">
                        {/* Title Decorations */}
                        <div className="absolute -top-8 -left-8 w-24 h-24 opacity-60 pointer-events-none">
                            <Image
                                src="/brushstroke1.svg"
                                alt=""
                                width={96}
                                height={96}
                                className="rotate-12 animate-float"
                            />
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 opacity-60 pointer-events-none">
                            <Image
                                src="/brushstroke2.svg"
                                alt=""
                                width={96}
                                height={96}
                                className="-rotate-12 animate-float-delayed"
                            />
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 dark:text-amber-300 relative inline-block">
                            <span className="relative z-10">
                                {lang === 'eng' ? 'How It Works' : 'איך זה עובד'}
                            </span>
                            <div className="absolute h-5 bg-amber-300/30 dark:bg-amber-700/20 left-0 right-0 bottom-2 -z-0 skew-x-3"></div>
                            <div className="absolute -bottom-4 left-0 w-16 h-1.5 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 relative">
                        {/* Connecting Lines */}
                        <div className="absolute top-32 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-amber-300/0 via-amber-400/50 to-amber-300/0 dark:from-amber-600/0 dark:via-amber-500/30 dark:to-amber-600/0 hidden md:block"></div>
                        <div className="absolute top-32 left-2/3 right-0 h-0.5 bg-gradient-to-r from-amber-300/0 via-amber-400/50 to-amber-300/0 dark:from-amber-600/0 dark:via-amber-500/30 dark:to-amber-600/0 hidden md:block"></div>

                        {/* Step 1 */}
                        <div className="relative group">
                            {/* Card Background with Enhanced Hover Effects */}
                            <div className="relative p-8 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/80 rounded-3xl border-2 border-amber-200/50 dark:border-amber-700/30 shadow-lg transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.3)] dark:hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.2)] backdrop-blur-sm transform hover:-translate-y-2">
                                {/* Decorative Elements */}
                                <div className="absolute -top-8 -left-8 w-24 h-24 opacity-40 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                    <Image
                                        src="/brushstroke1.svg"
                                        alt=""
                                        width={96}
                                        height={96}
                                        className="rotate-12"
                                    />
                                </div>

                                {/* Step Number with Enhanced Effects */}
                                <div className="relative w-24 h-24 mx-auto mb-8">
                                    <div className="absolute inset-0 bg-amber-400/20 dark:bg-amber-600/20 rounded-2xl blur-2xl transform group-hover:scale-125 transition-transform duration-500"></div>
                                    <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 rounded-2xl text-white text-4xl font-bold shadow-lg group-hover:shadow-amber-300/50 dark:group-hover:shadow-amber-700/50 transition-all duration-500">
                                        <span className="relative z-10">1</span>
                                    </div>
                                </div>

                                {/* Content with Enhanced Typography */}
                                <div className="relative">
                                    <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-300 mb-4 group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors duration-500">
                                        {lang === 'eng' ? 'Sign Up & Get Your QR Code' : 'הרשמה וקבלת קוד QR'}
                                    </h3>
                                    <p className="text-base text-amber-700 dark:text-amber-400 leading-relaxed group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors duration-500">
                                        {lang === 'eng' 
                                            ? 'Begin by signing up for MenuCraftQR and receive your unique QR code instantly. This code links directly to your digital menu.'
                                            : 'התחילו בהרשמה ל-MenuCraftQR וקבלו מיד את קוד ה-QR הייחודי שלכם. קוד זה מקשר ישירות לתפריט הדיגיטלי שלכם.'}
                                    </p>
                                </div>

                                {/* Floating Accent */}
                                <div className="absolute -bottom-4 -right-4 w-12 h-12 opacity-0 group-hover:opacity-40 transition-all duration-500 pointer-events-none">
                                    <Image
                                        src="/sketch-dot.svg"
                                        alt=""
                                        width={48}
                                        height={48}
                                        className="animate-float"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative group">
                            <div className={`relative p-8 ${isRTL ? '' : 'pb-10'} bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/80 rounded-3xl border-2 border-amber-200/50 dark:border-amber-700/30 shadow-lg transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.3)] dark:hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.2)] backdrop-blur-sm transform hover:-translate-y-2`}>
                                {/* Decorative Elements */}
                                <div className="absolute -top-8 -right-8 w-24 h-24 opacity-40 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                                    <Image
                                        src="/brushstroke2.svg"
                                        alt=""
                                        width={96}
                                        height={96}
                                        className="-rotate-12"
                                    />
                                </div>

                                {/* Step Number with Enhanced Effects */}
                                <div className="relative w-24 h-24 mx-auto mb-8">
                                    <div className="absolute inset-0 bg-amber-400/20 dark:bg-amber-600/20 rounded-2xl blur-2xl transform group-hover:scale-125 transition-transform duration-500"></div>
                                    <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 rounded-2xl text-white text-4xl font-bold shadow-lg group-hover:shadow-amber-300/50 dark:group-hover:shadow-amber-700/50 transition-all duration-500">
                                        <span className="relative z-10">2</span>
                                    </div>
                                </div>

                                {/* Content with Enhanced Typography */}
                                <div className="relative">
                                    <h3 className={`text-2xl font-bold text-amber-900 dark:text-amber-300 ${isRTL ? 'mb-4' : 'mb-10'} group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors duration-500`}>
                                        {lang === 'eng' ? 'Upload Your Menu' : 'העלאת התפריט'}
                                    </h3>
                                    <p className="text-base text-amber-700 dark:text-amber-400 leading-relaxed group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors duration-500">
                                        {lang === 'eng'
                                            ? 'Easily upload and customize your menu in real time using our intuitive, user-friendly interface. Update your dishes whenever you need—effortlessly.'
                                            : 'העלו והתאימו אישית את התפריט שלכם בזמן אמת באמצעות הממשק האינטואיטיבי שלנו. עדכנו את המנות שלכם בכל עת - בקלות.'}
                                    </p>
                                </div>

                                {/* Floating Accent */}
                                <div className="absolute -bottom-4 -left-4 w-12 h-12 opacity-0 group-hover:opacity-40 transition-all duration-500 pointer-events-none">
                                    <Image
                                        src="/sketch-dot.svg"
                                        alt=""
                                        width={48}
                                        height={48}
                                        className="animate-float-delayed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative group">
                            <div className={`relative p-8 ${isRTL ? '' : 'pb-10'} bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/80 rounded-3xl border-2 border-amber-200/50 dark:border-amber-700/30 shadow-lg transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.3)] dark:hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.2)] backdrop-blur-sm transform hover:-translate-y-2`}>
                                {/* Decorative Elements */}
                                <div className="absolute -bottom-8 -right-8 w-24 h-24 opacity-40 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                    <Image
                                        src="/brushstroke-accent1.svg"
                                        alt=""
                                        width={96}
                                        height={96}
                                        className="rotate-45"
                                    />
                                </div>

                                {/* Step Number with Enhanced Effects */}
                                <div className="relative w-24 h-24 mx-auto mb-8">
                                    <div className="absolute inset-0 bg-amber-400/20 dark:bg-amber-600/20 rounded-2xl blur-2xl transform group-hover:scale-125 transition-transform duration-500"></div>
                                    <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 rounded-2xl text-white text-4xl font-bold shadow-lg group-hover:shadow-amber-300/50 dark:group-hover:shadow-amber-700/50 transition-all duration-500">
                                        <span className="relative z-10">3</span>
                                    </div>
                                </div>

                                {/* Content with Enhanced Typography */}
                                <div className="relative">
                                    <h3 className={`text-2xl font-bold text-amber-900 dark:text-amber-300 ${isRTL ? 'mb-4' : 'mb-10'} group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors duration-500`}>
                                        {lang === 'eng' ? 'Print & Share' : 'הדפסה ושיתוף'}
                                    </h3>
                                    <p className="text-base text-amber-700 dark:text-amber-400 leading-relaxed group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors duration-500">
                                        {lang === 'eng'
                                            ? 'Print your QR code and display it prominently in your restaurant. Customers simply scan the code to view your dynamic, up-to-date menu.'
                                            : 'הדפיסו את קוד ה-QR והציגו אותו במקום בולט במסעדה שלכם. הלקוחות פשוט סורקים את הקוד.'}
                                    </p>
                                </div>

                                {/* Floating Accent */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 opacity-0 group-hover:opacity-40 transition-all duration-500 pointer-events-none">
                                    <Image
                                        src="/sketch-dot.svg"
                                        alt=""
                                        width={48}
                                        height={48}
                                        className="animate-float"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Decorative Bottom Wave */}
                    <div className="relative mt-24">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-amber-300/20 to-amber-200/20 dark:from-amber-700/10 dark:via-amber-600/10 dark:to-amber-700/10 blur-3xl transform -skew-y-6"></div>
                        <div className="absolute inset-0 bg-gradient-to-l from-amber-300/10 via-amber-400/10 to-amber-300/10 dark:from-amber-600/5 dark:via-amber-500/5 dark:to-amber-600/5 blur-2xl transform skew-y-3 translate-y-8"></div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 w-full">
                    {/* Background Effects */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-amber-300/20 dark:bg-amber-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-amber-400/20 dark:bg-amber-700/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                    </div>

                    <div className="text-center mb-16 relative">
                        {/* Title Decorations */}
                        <div className="absolute -top-8 -left-8 w-24 h-24 opacity-60 pointer-events-none">
                            <Image
                                src="/brushstroke1.svg"
                                alt=""
                                width={96}
                                height={96}
                                className="rotate-12 animate-float"
                            />
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 opacity-60 pointer-events-none">
                            <Image
                                src="/brushstroke2.svg"
                                alt=""
                                width={96}
                                height={96}
                                className="-rotate-12 animate-float-delayed"
                            />
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 dark:text-amber-300 relative inline-block">
                            <span className="relative z-10">
                                {lang === 'eng' ? 'Pricing' : 'מחירון'}
                            </span>
                            <div className="absolute h-5 bg-amber-300/30 dark:bg-amber-700/20 left-0 right-0 bottom-2 -z-0 skew-x-3"></div>
                            <div className="absolute -bottom-4 left-0 w-16 h-1.5 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
                        {/* Standard Plan */}
                        <div className="relative group h-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-amber-500/20 to-amber-600/30 dark:from-amber-400/20 dark:via-amber-500/10 dark:to-amber-600/20 rounded-[2rem] blur-2xl scale-90 opacity-75 transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-3xl group-hover:opacity-100"></div>
                            
                            <div className="relative p-8 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/80 rounded-3xl border-2 border-amber-200/50 dark:border-amber-700/30 shadow-lg transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.3)] dark:hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.2)] backdrop-blur-sm transform hover:-translate-y-2 h-full flex flex-col">
                                {/* Decorative Elements */}
                                <div className="absolute -top-8 -left-8 w-24 h-24 opacity-40 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                    <Image
                                        src="/brushstroke1.svg"
                                        alt=""
                                        width={96}
                                        height={96}
                                        className="rotate-12"
                                    />
                                </div>

                                <div className="relative flex-grow">
                                    <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-300 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors duration-500">
                                        {lang === 'eng' ? 'Standard Plan' : 'תוכנית סטנדרטית'}
                                    </h3>
                                    <div className="flex items-baseline mb-6">
                                        <span className="text-4xl font-bold text-amber-600 dark:text-amber-400">50₪</span>
                                        <span className="text-amber-700 dark:text-amber-500 ml-2">{lang === 'eng' ? '/ month' : '/ לחודש'}</span>
                                    </div>
                                    <div className="mb-6">
                                        <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-full text-sm font-medium">
                                            {lang === 'eng' ? '1-Month Free Trial' : 'חודש ניסיון חינם'}
                                        </span>
                                    </div>
                                    <p className="text-base text-amber-700 dark:text-amber-400 leading-relaxed group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors duration-500">
                                        {lang === 'eng' 
                                            ? 'Perfect for individual restaurants looking to manage their digital menu seamlessly.'
                                            : 'מושלם למסעדות בודדות המעוניינות לנהל את התפריט הדיגיטלי שלהן בצורה חלקה.'}
                                    </p>
                                </div>

                                {/* Button */}
                                <div className="relative mt-8">
                                    <SignUp text={lang === 'eng' ? 'Get Started' : 'להתחיל עכשיו'} />
                                </div>
                            </div>
                        </div>

                        {/* Business Plan */}
                        <div className="relative group h-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-amber-500/20 to-amber-600/30 dark:from-amber-400/20 dark:via-amber-500/10 dark:to-amber-600/20 rounded-[2rem] blur-2xl scale-90 opacity-75 transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-3xl group-hover:opacity-100"></div>
                            
                            <div className="relative p-8 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/80 rounded-3xl border-2 border-amber-200/50 dark:border-amber-700/30 shadow-lg transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.3)] dark:hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.2)] backdrop-blur-sm transform hover:-translate-y-2 h-full flex flex-col">
                                {/* Decorative Elements */}
                                <div className="absolute -top-8 -right-8 w-24 h-24 opacity-40 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                                    <Image
                                        src="/brushstroke2.svg"
                                        alt=""
                                        width={96}
                                        height={96}
                                        className="-rotate-12"
                                    />
                                </div>

                                <div className="relative flex-grow">
                                    <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-300 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors duration-500">
                                        {lang === 'eng' ? 'Business Plan' : 'תוכנית עסקית'}
                                    </h3>
                                    <div className="flex items-baseline mb-6">
                                        <span className="text-lg text-amber-700 dark:text-amber-400">
                                            {lang === 'eng' ? 'Contact us for pricing' : 'צור קשר לקבלת הצעת מחיר'}
                                        </span>
                                    </div>
                                    <div className="mb-6">
                                        <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-full text-sm font-medium">
                                            {lang === 'eng' ? 'Custom Solutions' : 'פתרונות מותאמים אישית'}
                                        </span>
                                    </div>
                                    <p className="text-base text-amber-700 dark:text-amber-400 leading-relaxed group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors duration-500">
                                        {lang === 'eng' 
                                            ? 'Owner of multiple restaurants? Want to add a payment option from your menu? Contact us and we will tell you more.'
                                            : 'בעלי כמה מסעדות / רוצה להוסיף אפשרות תשלום מהתפריט שלכם? צור קשר ונספר לכם עוד יותר.'}
                                    </p>
                                </div>

                                {/* Button */}
                                <div className="relative mt-8">
                                    <ContactUsButton text={lang === 'eng' ? 'Contact Us' : 'צור קשר'} lang={lang} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CornerAccents />
                <FloatingDots />
                
                {/* Footer */}
                <footer className="relative z-10 mt-16 border-t border-amber-200/30 dark:border-amber-800/30 overflow-hidden">
                    <div className="absolute inset-0 opacity-30 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-200/20 to-transparent dark:from-amber-800/10"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
                            <Image
                                src="/ink-splash.svg"
                                alt=""
                                width={128}
                                height={128}
                                className="rotate-180 dark:hue-rotate-15"
                            />
                        </div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="flex justify-center items-center gap-3">
                            <Image
                                src="/images/menucraft.jpeg"
                                alt="Menu Craft"
                                width={40}
                                height={40}
                                className="rounded-lg shadow-sm"
                            />
                            <p className="text-amber-700 dark:text-amber-400 text-sm font-medium">
                                <span className="relative">
                                    {lang === 'eng' ? '© 2023 All rights reserved' : '© 2023 כל הזכויות שמורות'}
                                    <span className="absolute h-1.5 bg-amber-300/20 dark:bg-amber-700/20 left-0 right-0 bottom-0 -z-0 -skew-x-3"></span>
                                </span>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}  