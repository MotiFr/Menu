import { Instagram, Facebook, Twitter, Phone, Mail, Globe } from 'lucide-react';

const MenuFooter = ({ currentLang, currentTheme, Footer }) => {
    const footerText = Footer?.footerText || { eng: '', heb: '' };
    const socialLinks = Footer?.socialLinks || {
        instagram: '',
        facebook: '',
        twitter: '',
        website: '',
        phone: '',
        email: ''
    };

    const getIconColor = () => {
        switch (currentTheme) {
            case 'dark': return 'text-white';
            case 'light': return 'text-black';
            default: return 'text-current';
        }
    };

    const renderSocialButton = (platform, icon) => {
        const url = socialLinks[platform];
        const Icon = icon;

        const formatUrl = (url) => {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
              return `https://${url}`;
            }
            return url;
          };

        if (!url) return null;

        return (
            <a
                href={platform === 'email' ? `mailto:${url}` :
                    platform === 'phone' ? `tel:${url}` : formatUrl(url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block p-2 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
            >
                <Icon size={20} className={getIconColor()} />
            </a>
        );
    };

    const hasSocialLinks = Object.values(socialLinks).some(link => link && link.trim() !== '');
    
    const hasContent = hasSocialLinks || footerText[currentLang];
    if (!hasContent) return null;

    return (
        <footer className={`mt-4 pb-6 rounded-xl ${
            currentTheme === 'light' ? 'bg-white/30 border-white/20' :
            currentTheme === 'dark' ? 'bg-black/30 border-black/20' :
            'bg-white/30 dark:bg-black/30 border-white/20 dark:border-black/20'
        } backdrop-blur-md border`}>
            <div className="flex flex-col justify-between items-center">
                {footerText[currentLang] && (
                    <div className="mb-4 md:mb-0 text-center">
                        <p dir={currentLang === 'heb' ? 'rtl' : 'ltr'} className="opacity-80 text-lg">
                            {footerText[currentLang]}
                        </p>
                    </div>
                )}

                {hasSocialLinks && (
                    <div className="flex items-center gap-3">
                        {renderSocialButton('instagram', Instagram)}
                        {renderSocialButton('facebook', Facebook)}
                        {renderSocialButton('twitter', Twitter)}
                        {renderSocialButton('website', Globe)}
                        {renderSocialButton('phone', Phone)}
                        {renderSocialButton('email', Mail)}
                    </div>
                )}
            </div>
        </footer>
    );
};

export default MenuFooter;