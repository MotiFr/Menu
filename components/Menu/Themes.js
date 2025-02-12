export const themes = {
    forest: {
        primary: '#566246',
        secondary: '#A4C2A5',
        accent: '#D8DAD3',
        background: '#F1F2EB',
        darkBackground: '#1A1C16',
        pattern: 'radial-gradient(circle at 50% 50%, #A4C2A5 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #566246 0%, transparent 60%)',
    },
    sea: {
        primary: '#141B41',
        secondary: '#306BAC',
        accent: '#6F9CEB',
        background: '#98B9F2',
        darkBackground: '#0A0D21',
        pattern: 'radial-gradient(circle at 50% 50%, #6F9CEB 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #141B41 0%, transparent 60%)',
    },
    dust: {
        primary: '#463F3A',
        secondary: '#8A817C',
        accent: '#BCB8B1',
        background: '#F4F3EE',
        darkBackground: '#161412',
        pattern: 'radial-gradient(circle at 50% 50%, #BCB8B1 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #463F3A 0%, transparent 60%)',
    },
    violet: {
        primary: '#9221CE',
        secondary: '#CC2383',
        accent: '#B5A7B5',
        background: '#F5E6FA',  
        darkBackground: '#14010F',
        pattern: 'radial-gradient(circle at 50% 50%, #CC2383 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #9221CE 0%, transparent 60%)',
    },
    darkWood: {
        primary: '#202030',
        secondary: '#39304A',
        accent: '#635C51',
        background: '#7D7461',
        darkBackground: '#0F0F18',
        pattern: 'radial-gradient(circle at 50% 50%, #635C51 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #202030 0%, transparent 60%)',
    },
    sky: {
        primary: '#174769',
        secondary: '#294C60',
        accent: '#8FB8ED',
        background: '#62BFED',
        darkBackground: '#0B2335',
        pattern: 'radial-gradient(circle at 50% 50%, #8FB8ED 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #174769 0%, transparent 60%)',
    },
    default: {
        primary: '#B3793C',
        secondary: '#617073',
        accent: '#000000',
        background: '#FFFFFF',
        darkBackground: '#000000',
        pattern: 'radial-gradient(circle at 50% 50%, #B3793C 0%, transparent 60%)',
        darkPattern: 'radial-gradient(circle at 50% 50%, #617073 0%, transparent 60%)',
    }
};
export const categoryClasses = {
    forest: 'bg-[#566246]/10 dark:bg-[#566246]/20 border-[#566246]/20 dark:border-[#A4C2A5]/20',
    sea: 'bg-[#141B41]/10 dark:bg-[#141B41]/20 border-[#141B41]/20 dark:border-[#6F9CEB]/20',
    dust: 'bg-[#463F3A]/10 dark:bg-[#463F3A]/20 border-[#463F3A]/20 dark:border-[#BCB8B1]/20',
    violet: 'bg-[#9221CE]/10 dark:bg-[#9221CE]/20 border-[#9221CE]/20 dark:border-[#CC2383]/20',
    darkWood: 'bg-[#202030]/10 dark:bg-[#202030]/20 border-[#202030]/20 dark:border-[#635C51]/20',
    sky: 'bg-[#174769]/10 dark:bg-[#174769]/20 border-[#174769]/20 dark:border-[#8FB8ED]/20',
    default: 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800'
};

export const menuItemClasses = {
    forest: 'bg-[#A4C2A5]/20 hover:bg-[#A4C2A5]/30 dark:bg-[#566246]/30 dark:hover:bg-[#566246]/40',
    sea: 'bg-[#306BAC]/20 hover:bg-[#306BAC]/30 dark:bg-[#141B41]/30 dark:hover:bg-[#141B41]/40',
    dust: 'bg-[#8A817C]/20 hover:bg-[#8A817C]/30 dark:bg-[#463F3A]/30 dark:hover:bg-[#463F3A]/40',
    violet: 'bg-[#CC2383]/20 hover:bg-[#CC2383]/30 dark:bg-[#9221CE]/30 dark:hover:bg-[#9221CE]/40',
    darkWood: 'bg-[#39304A]/20 hover:bg-[#39304A]/30 dark:bg-[#202030]/30 dark:hover:bg-[#202030]/40',
    sky: 'bg-[#294C60]/20 hover:bg-[#294C60]/30 dark:bg-[#174769]/30 dark:hover:bg-[#174769]/40',
    default: 'bg-white/80 hover:bg-gray-50 dark:bg-gray-900/80 dark:hover:bg-gray-800/80'
};
export const dialogClasses = {
    forest: 'border-[#566246] dark:border-[#A4C2A5] bg-[#F1F2EB] dark:bg-[#1A1C16]',
    sea: 'border-[#141B41] dark:border-[#6F9CEB] bg-[#98B9F2] dark:bg-[#0A0D21]',
    dust: 'border-[#463F3A] dark:border-[#BCB8B1] bg-[#F4F3EE] dark:bg-[#161412]',
    violet: 'border-[#9221CE] dark:border-[#CC2383] bg-[#F5E6FA] dark:bg-[#14010F]',
    darkWood: 'border-[#202030] dark:border-[#635C51] bg-[#7D7461] dark:bg-[#0F0F18]',
    sky: 'border-[#174769] dark:border-[#8FB8ED] bg-[#62BFED] dark:bg-[#0B2335]',
    default: 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
};

export const buttonClasses = {
    forest: 'bg-[#566246] hover:bg-[#566246]/90 dark:bg-[#A4C2A5] dark:hover:bg-[#A4C2A5]/90',
    sea: 'bg-[#141B41] hover:bg-[#141B41]/90 dark:bg-[#306BAC] dark:hover:bg-[#306BAC]/90',
    dust: 'bg-[#463F3A] hover:bg-[#463F3A]/90 dark:bg-[#8A817C] dark:hover:bg-[#8A817C]/90',
    violet: 'bg-[#9221CE] hover:bg-[#9221CE]/90 dark:bg-[#CC2383] dark:hover:bg-[#CC2383]/90',
    darkWood: 'bg-[#202030] hover:bg-[#202030]/90 dark:bg-[#39304A] dark:hover:bg-[#39304A]/90',
    sky: 'bg-[#174769] hover:bg-[#174769]/90 dark:bg-[#294C60] dark:hover:bg-[#294C60]/90',
    default: 'bg-[#B3793C] hover:bg-[#B3793C]/90 dark:bg-[#617073] dark:hover:bg-[#617073]/90'
};

export const priceClasses = {
    forest: 'text-[#566246] dark:text-[#A4C2A5]',
    sea: 'text-[#141B41] dark:text-[#6F9CEB]',
    dust: 'text-[#463F3A] dark:text-[#BCB8B1]',
    violet: 'text-[#CC2383] dark:text-[#9221CE]',
    darkWood: 'text-[#202030] dark:text-[#635C51]',
    sky: 'text-[#174769] dark:text-[#8FB8ED]',
    default: 'text-gray-900 dark:text-gray-100'
};

export const botNav = {
    forest: 'border-[#566246] dark:border-[#5E7150] bg-[#C0C3B8] dark:bg-[#10130D]',
    sea: 'border-[#141B41] dark:border-[#2C416F] bg-[#4D69A3] dark:bg-[#050713]',
    dust: 'border-[#463F3A] dark:border-[#6B645E] bg-[#8B837C] dark:bg-[#0A0807]',
    violet: 'border-[#9221CE] dark:border-[#B34077] bg-[#83668A] dark:bg-[#080007]',
    darkWood: 'border-[#202030] dark:border-[#383040] bg-[#514C48] dark:bg-[#050507]',
    sky: 'border-[#174769] dark:border-[#3B6A93] bg-[#617FA6] dark:bg-[#03081A]',
    default: 'border-gray-500 dark:border-gray-600 bg-[#828282] dark:bg-gray-800'
};

