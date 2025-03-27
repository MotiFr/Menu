export const themes = {
    forest: {
        primary: '#4A5940',        // Slightly darker for better contrast
        secondary: '#8EB48F',      // Slightly muted for harmony
        accent: '#D8DAD3',         // Kept the same
        background: '#F7F8F2',     // Lighter for better light mode
        darkBackground: '#1A1C16', // Kept the same
        pattern: 'radial-gradient(circle at 50% 50%, #A4C2A5 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #566246 0%, transparent 60%)',
    },
    sea: {
        primary: '#0F1A4D',        // Deeper blue for better contrast
        secondary: '#3878C4',      // Brighter for better visibility
        accent: '#7BA6F0',         // Slightly adjusted for harmony
        background: '#E8F0FF',     // Much lighter for better light mode
        darkBackground: '#0A0D21', // Kept the same
        pattern: 'radial-gradient(circle at 50% 50%, #6F9CEB 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #141B41 0%, transparent 60%)',
    },
    dust: {
        primary: '#403A35',        // Slightly darker
        secondary: '#8A817C',      // Kept the same
        accent: '#BCB8B1',         // Kept the same
        background: '#F9F8F5',     // Lighter for better light mode
        darkBackground: '#161412', // Kept the same
        pattern: 'radial-gradient(circle at 50% 50%, #BCB8B1 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #463F3A 0%, transparent 60%)',
    },
    violet: {
        primary: '#7A1CAF',        // Slightly muted for better harmony
        secondary: '#B12075',      // Slightly muted for better harmony
        accent: '#C9BDC9',         // Lightened for better visibility
        background: '#FAF0FD',     // Lighter for better light mode  
        darkBackground: '#14010F', // Kept the same
        pattern: 'radial-gradient(circle at 50% 50%, #CC2383 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #9221CE 0%, transparent 60%)',
    },
    darkWood: {
        primary: '#202030',        // Kept the same
        secondary: '#39304A',      // Kept the same
        accent: '#756C5F',         // Brightened a bit for better visibility
        background: '#EAE5DB',     // Much lighter for light mode
        darkBackground: '#0F0F18', // Kept the same
        pattern: 'radial-gradient(circle at 50% 50%, #635C51 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #202030 0%, transparent 60%)',
    },
    sky: {
        primary: '#174769',        // Kept the same
        secondary: '#2B5778',      // Slightly darkened for better contrast
        accent: '#8FB8ED',         // Kept the same
        background: '#E6F4FF',     // Much lighter for better light mode
        darkBackground: '#0B2335', // Kept the same
        pattern: 'radial-gradient(circle at 50% 50%, #8FB8ED 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #174769 0%, transparent 60%)',
    },
    // New theme: Terracotta - warm, earthy tones inspired by pottery and desert landscapes
    terracotta: {
        primary: '#993D20',        // Rich terracotta
        secondary: '#D2691E',      // Lighter terracotta/clay
        accent: '#E6C9A8',         // Soft sand color
        background: '#FFF8EC',     // Very light sand/cream
        darkBackground: '#241811', // Deep brown
        pattern: 'radial-gradient(circle at 50% 50%, #D2691E 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #993D20 0%, transparent 60%)',
    },
    // New theme: Mint - fresh, cool mint tones with complementary accents
    mint: {
        primary: '#0E8A6E',        // Deep mint green
        secondary: '#52B788',      // Medium mint
        accent: '#B7E4C7',         // Light mint
        background: '#F0FFF4',     // Barely mint tinted white
        darkBackground: '#0A2E21', // Dark green
        pattern: 'radial-gradient(circle at 50% 50%, #52B788 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #0E8A6E 0%, transparent 60%)',
    },
    // New theme: Berry - rich berry tones inspired by blackberries and blueberries
    berry: {
        primary: '#4A1942',        // Deep berry purple
        secondary: '#7B2869',      // Medium berry
        accent: '#C85C8E',         // Lighter berry
        background: '#FCF2F6',     // Very light pink
        darkBackground: '#25091F', // Very dark purple
        pattern: 'radial-gradient(circle at 50% 50%, #7B2869 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #4A1942 0%, transparent 60%)',
    },
    default: {
        primary: '#A36B2C',        // Slightly darker
        secondary: '#566266',      // Slightly muted
        accent: '#333333',         // Changed from pure black for better harmony
        background: '#FFFFFF',     // Kept the same
        darkBackground: '#0F1214', // Changed from pure black
        pattern: 'radial-gradient(circle at 50% 50%, #B3793C 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #617073 0%, transparent 60%)',
    }
};

export const categoryClasses = {
    forest: 'bg-[#4A5940]/20 dark:bg-[#4A5940]/20 border-[#4A5940]/20 dark:border-[#8EB48F]/90 backdrop-blur-sm',
    sea: 'bg-[#0F1A4D]/20 dark:bg-[#0F1A4D]/20 border-[#0F1A4D]/20 dark:border-[#7BA6F0]/90 backdrop-blur-sm',
    dust: 'bg-[#403A35]/20 dark:bg-[#403A35]/20 border-[#403A35]/20 dark:border-[#BCB8B1]/90 backdrop-blur-sm',
    violet: 'bg-[#7A1CAF]/20 dark:bg-[#7A1CAF]/20 border-[#7A1CAF]/20 dark:border-[#B12075]/90 backdrop-blur-sm',
    darkWood: 'bg-[#202030]/20 dark:bg-[#202030]/20 border-[#202030]/20 dark:border-[#756C5F]/90 backdrop-blur-sm',
    sky: 'bg-[#174769]/20 dark:bg-[#174769]/20 border-[#174769]/20 dark:border-[#8FB8ED]/90 backdrop-blur-sm',
    terracotta: 'bg-[#993D20]/20 dark:bg-[#993D20]/20 border-[#993D20]/20 dark:border-[#E6C9A8]/90 backdrop-blur-sm',
    mint: 'bg-[#0E8A6E]/20 dark:bg-[#0E8A6E]/20 border-[#0E8A6E]/20 dark:border-[#B7E4C7]/90 backdrop-blur-sm',
    berry: 'bg-[#4A1942]/20 dark:bg-[#4A1942]/20 border-[#4A1942]/20 dark:border-[#C85C8E]/90 backdrop-blur-sm',
    default: 'bg-gray-50/20 dark:bg-gray-800/20 border-gray-200/20 dark:border-gray-800/90 backdrop-blur-sm'
};

export const menuItemClasses = {
    forest: 'bg-[#8EB48F]/20 dark:bg-[#4A5940]/80',
    sea: 'bg-[#3878C4]/20 dark:bg-[#0F1A4D]/80',
    dust: 'bg-[#8A817C]/20 dark:bg-[#403A35]/80',
    violet: 'bg-[#B12075]/20 dark:bg-[#7A1CAF]/80',
    darkWood: 'bg-[#39304A]/20 dark:bg-[#202030]/80',
    sky: 'bg-[#2B5778]/20 dark:bg-[#174769]/80',
    terracotta: 'bg-[#D2691E]/20 dark:bg-[#993D20]/80',
    mint: 'bg-[#52B788]/20 dark:bg-[#0E8A6E]/80',
    berry: 'bg-[#7B2869]/20 dark:bg-[#4A1942]/80',
    default: 'bg-white/60 dark:bg-gray-900/80'
};

export const dialogClasses = {
    forest: 'border-[#4A5940] dark:border-[#8EB48F] bg-[#F7F8F2] dark:bg-[#1A1C16]',
    sea: 'border-[#0F1A4D] dark:border-[#7BA6F0] bg-[#E8F0FF] dark:bg-[#0A0D21]',
    dust: 'border-[#403A35] dark:border-[#BCB8B1] bg-[#F9F8F5] dark:bg-[#161412]',
    violet: 'border-[#7A1CAF] dark:border-[#B12075] bg-[#FAF0FD] dark:bg-[#14010F]',
    darkWood: 'border-[#202030] dark:border-[#756C5F] bg-[#EAE5DB] dark:bg-[#0F0F18]',
    sky: 'border-[#174769] dark:border-[#8FB8ED] bg-[#E6F4FF] dark:bg-[#0B2335]',
    terracotta: 'border-[#993D20] dark:border-[#E6C9A8] bg-[#FFF8EC] dark:bg-[#241811]',
    mint: 'border-[#0E8A6E] dark:border-[#B7E4C7] bg-[#F0FFF4] dark:bg-[#0A2E21]',
    berry: 'border-[#4A1942] dark:border-[#C85C8E] bg-[#FCF2F6] dark:bg-[#25091F]',
    default: 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
};

export const buttonClasses = {
    forest: 'bg-[#4A5940] hover:bg-[#4A5940]/90 dark:bg-[#8EB48F] dark:hover:bg-[#8EB48F]/90',
    sea: 'bg-[#0F1A4D] hover:bg-[#0F1A4D]/90 dark:bg-[#3878C4] dark:hover:bg-[#3878C4]/90',
    dust: 'bg-[#403A35] hover:bg-[#403A35]/90 dark:bg-[#8A817C] dark:hover:bg-[#8A817C]/90',
    violet: 'bg-[#7A1CAF] hover:bg-[#7A1CAF]/90 dark:bg-[#B12075] dark:hover:bg-[#B12075]/90',
    darkWood: 'bg-[#202030] hover:bg-[#202030]/90 dark:bg-[#39304A] dark:hover:bg-[#39304A]/90',
    sky: 'bg-[#174769] hover:bg-[#174769]/90 dark:bg-[#2B5778] dark:hover:bg-[#2B5778]/90',
    terracotta: 'bg-[#993D20] hover:bg-[#993D20]/90 dark:bg-[#D2691E] dark:hover:bg-[#D2691E]/90',
    mint: 'bg-[#0E8A6E] hover:bg-[#0E8A6E]/90 dark:bg-[#52B788] dark:hover:bg-[#52B788]/90',
    berry: 'bg-[#4A1942] hover:bg-[#4A1942]/90 dark:bg-[#7B2869] dark:hover:bg-[#7B2869]/90',
    default: 'bg-[#A36B2C] hover:bg-[#A36B2C]/90 dark:bg-[#566266] dark:hover:bg-[#566266]/90'
};

export const priceClasses = {
    forest: 'text-[#4A5940] dark:text-[#8EB48F]',
    sea: 'text-[#0F1A4D] dark:text-[#7BA6F0]',
    dust: 'text-[#403A35] dark:text-[#BCB8B1]',
    violet: 'text-[#B12075] dark:text-[#7A1CAF]',
    darkWood: 'text-[#202030] dark:text-[#756C5F]',
    sky: 'text-[#174769] dark:text-[#8FB8ED]',
    terracotta: 'text-[#993D20] dark:text-[#E6C9A8]',
    mint: 'text-[#0E8A6E] dark:text-[#B7E4C7]',
    berry: 'text-[#4A1942] dark:text-[#C85C8E]',
    default: 'text-gray-900 dark:text-gray-100'
};

export const botNav = {
    forest: 'border-[#4A5940] dark:border-[#526148] bg-[#E3E5DC] dark:bg-[#10130D]',
    sea: 'border-[#0F1A4D] dark:border-[#233B66] bg-[#D1DFFA] dark:bg-[#050713]',
    dust: 'border-[#403A35] dark:border-[#5E5752] bg-[#E5E2DE] dark:bg-[#0A0807]',
    violet: 'border-[#7A1CAF] dark:border-[#9A2D6E] bg-[#E9DAEA] dark:bg-[#080007]',
    darkWood: 'border-[#202030] dark:border-[#383040] bg-[#CFC8C0] dark:bg-[#050507]',
    sky: 'border-[#174769] dark:border-[#2F5F87] bg-[#D4E4F7] dark:bg-[#03081A]',
    terracotta: 'border-[#993D20] dark:border-[#AC5732] bg-[#F7E8D8] dark:bg-[#150D09]',
    mint: 'border-[#0E8A6E] dark:border-[#1A9E80] bg-[#E0F5EB] dark:bg-[#051A14]',
    berry: 'border-[#4A1942] dark:border-[#5F2156] bg-[#F5E1EB] dark:bg-[#150610]',
    default: 'border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800'
};