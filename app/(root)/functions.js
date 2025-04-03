import Image from "next/image";

export function BackgroundDecorations() {
    return (
        <>
            {/* Artistic Background Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none dark:opacity-10">
                <Image
                    src="/artistic-grid.svg"
                    alt=""
                    fill
                    className="object-cover dark:opacity-15"
                    priority
                />
            </div>

            <div className="absolute top-0 right-0 w-full h-64 opacity-10 pointer-events-none dark:opacity-15">
                <Image
                    src="/watercolor.svg"
                    alt=""
                    fill
                    className="object-cover object-top dark:hue-rotate-15"
                />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-64 opacity-10 pointer-events-none rotate-180 dark:opacity-15">
                <Image
                    src="/watercolor.svg"
                    alt=""
                    fill
                    className="object-cover object-top dark:hue-rotate-15"
                />
            </div>

            <div className="absolute -top-20 -right-20 w-96 h-96 opacity-20 pointer-events-none dark:opacity-15">
                <Image
                    src="/ink-splash.svg"
                    alt=""
                    width={500}
                    height={500}
                    className="dark:hue-rotate-15"
                />
            </div>

            <div className="absolute -bottom-20 -left-20 w-96 h-96 opacity-20 pointer-events-none rotate-180 dark:opacity-15">
                <Image
                    src="/ink-splash.svg"
                    alt=""
                    width={500}
                    height={500}
                    className="dark:hue-rotate-15"
                />
            </div>
        </>
    );
}

// Function to render heading decorations
export function HeadingDecorations() {
    return (
        <>
            <div className="absolute -top-10 -left-10 w-24 h-24 opacity-70 pointer-events-none dark:opacity-30">
                <Image
                    src="/brushstroke1.svg"
                    alt=""
                    width={96}
                    height={96}
                    className="rotate-12"
                />
            </div>

            <div className="absolute -bottom-10 -right-10 w-24 h-24 opacity-70 pointer-events-none dark:opacity-30">
                <Image
                    src="/brushstroke2.svg"
                    alt=""
                    width={96}
                    height={96}
                    className="-rotate-12"
                />
            </div>
        </>
    );
}

// Function to render subtitle decorations
export function SubtitleDecorations() {
    return (
        <>
            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-16 h-16 opacity-70 pointer-events-none dark:opacity-30">
                <Image
                    src="/brushstroke-accent1.svg"
                    alt=""
                    width={64}
                    height={64}
                />
            </div>

            <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-16 h-16 opacity-70 pointer-events-none dark:opacity-30">
                <Image
                    src="/brushstroke-accent3.svg"
                    alt=""
                    width={64}
                    height={64}
                />
            </div>
        </>
    );
}

// Function to render button decorations
export function ButtonDecorations() {
    return (
        <>
            <div className="absolute -top-10 -left-10 w-20 h-20 opacity-40 pointer-events-none dark:opacity-20">
                <Image
                    src="/icon-splatter.svg"
                    alt=""
                    width={80}
                    height={80}
                />
            </div>

            <div className="absolute top-1/2 -right-12 w-12 h-12 opacity-30 pointer-events-none dark:opacity-20">
                <Image
                    src="/brushstroke-accent2.svg"
                    alt=""
                    width={48}
                    height={48}
                    className="rotate-45"
                />
            </div>
        </>
    );
}


// Function to render the phone mockup
export function PhoneMockup() {
    return (
        <div className="relative flex justify-center">
            <div className="relative w-80 h-[600px] md:w-[380px] md:h-[700px] bg-gradient-to-b from-gray-100 to-white dark:from-gray-800/90 dark:to-gray-900/90 rounded-[45px] shadow-[0_50px_70px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_70px_-20px_rgba(0,0,0,0.5)] overflow-hidden border-[10px] border-gray-300 dark:border-gray-700">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-gray-300 dark:bg-gray-700 rounded-b-xl z-10"></div>
                
                {/* Phone Screen - Dynamic Content */}
                <div className="w-full h-full bg-white dark:bg-gray-800 overflow-hidden relative">
                    <iframe 
                        src="/menu/moti" 
                        className="w-full h-full absolute inset-0 border-none"
                        title="Restaurant Menu Preview"
                    />
                </div>
                
                {/* Camera dot */}
                <div className="absolute top-4 right-6 w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                
                {/* Phone Buttons */}
                <div className="absolute -right-[10px] top-32 w-[10px] h-14 bg-gray-300 dark:bg-gray-600 rounded-l-lg"></div>
                <div className="absolute -left-[10px] top-28 w-[10px] h-12 bg-gray-300 dark:bg-gray-600 rounded-r-lg"></div>
                <div className="absolute -left-[10px] top-48 w-[10px] h-12 bg-gray-300 dark:bg-gray-600 rounded-r-lg"></div>
                <div className="absolute -left-[10px] top-64 w-[10px] h-24 bg-gray-300 dark:bg-gray-600 rounded-r-lg"></div>
            </div>
            
            {/* Artistic elements around phone */}
            <div className="absolute -top-10 -left-10 w-28 h-28 opacity-70 pointer-events-none">
                <Image
                    src="/brushstroke1.svg"
                    alt=""
                    width={112}
                    height={112}
                    className="rotate-45"
                />
            </div>
            <div className="absolute -bottom-10 -right-10 w-28 h-28 opacity-70 pointer-events-none">
                <Image
                    src="/brushstroke2.svg"
                    alt=""
                    width={112}
                    height={112}
                    className="-rotate-45"
                />
            </div>
            
            {/* Additional decorative elements */}
            <div className="absolute -right-6 top-1/3 w-4 h-4 opacity-60 pointer-events-none">
                <Image
                    src="/sketch-dot.svg"
                    alt=""
                    width={16}
                    height={16}
                />
            </div>
            <div className="absolute -left-6 bottom-1/3 w-4 h-4 opacity-60 pointer-events-none">
                <Image
                    src="/sketch-dot.svg"
                    alt=""
                    width={16}
                    height={16}
                />
            </div>
        </div>
    );
}

// Function to render corner accents
export function CornerAccents() {
    return (
        <>
            {/* Decorative corner accents */}
            <div className="absolute top-8 left-8 w-24 h-24 opacity-30 pointer-events-none">
                <Image
                    src="/artistic-check.svg"
                    alt=""
                    width={96}
                    height={96}
                />
            </div>

            <div className="absolute bottom-8 right-8 w-24 h-24 opacity-30 pointer-events-none">
                <Image
                    src="/artistic-check.svg"
                    alt=""
                    width={96}
                    height={96}
                    className="rotate-180"
                />
            </div>
        </>
    );
}

// Function to render floating dots
export function FloatingDots() {
    return (
        <>
            {/* Subtle floating dots */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 opacity-60 pointer-events-none animate-pulse">
                <Image
                    src="/sketch-dot.svg"
                    alt=""
                    width={16}
                    height={16}
                />
            </div>

            <div className="absolute bottom-1/4 right-1/3 w-4 h-4 opacity-60 pointer-events-none animate-pulse">
                <Image
                    src="/sketch-dot.svg"
                    alt=""
                    width={16}
                    height={16}
                />
            </div>

            <div className="absolute top-1/3 right-1/4 w-4 h-4 opacity-60 pointer-events-none animate-pulse">
                <Image
                    src="/sketch-dot.svg"
                    alt=""
                    width={16}
                    height={16}
                />
            </div>
        </>
    );
}
