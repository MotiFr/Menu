import { Instagram, Facebook, Twitter, Phone, Mail, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import AutoResizeTextarea from '../Menu/TextareaSize';

const Footer = ({ currentLang, currentTheme, t, footer }) => {
    const [footerText, setFooterText] = useState({
        heb: '',
        eng: ''
    });

    const [socialLinks, setSocialLinks] = useState({
        instagram: '',
        facebook: '',
        twitter: '',
        website: '',
        phone: '',
        email: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (footer.footerText) {
            setFooterText(footer.footerText);
        }
        if (footer.socialLinks) {
            setSocialLinks(footer.socialLinks);
        }
    }, [footer]);

    const saveChanges = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/footer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    footerText,
                    socialLinks
                }),
            });

            if (response.ok) {
                setIsEditing(false);
            } else {
                console.error("Failed to save footer data");
            }
        } catch (error) {
            console.error("Error saving footer data:", error);
        } finally {
            setLoading(false);
        }
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
          

        return (
            <div className="relative group">
                {isEditing ? (
                    <div className="flex items-center mb-2">
                        <span className="mr-2">{platform}:</span>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setSocialLinks({ ...socialLinks, [platform]: e.target.value })}
                            className="bg-white/20 dark:bg-black/20 rounded px-2 py-1 w-full"
                            placeholder={currentLang === 'heb' ? 'הכנס קישור' : 'Enter URL'}
                        />
                    </div>
                ) : (
                    url && (
                        <a
                            href={platform === 'email' ? `mailto:${url}` :
                                platform === 'phone' ? `tel:${url}` : formatUrl(url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block p-2 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
                        >
                            <Icon size={20} className={getIconColor()} />
                        </a>
                    )
                )}
            </div>
        );
    };

    const hasSocialLinks = Object.values(socialLinks).some(link => link && link.trim() !== '');

    return (
        <footer className={`mt-4 p-6 rounded-xl ${currentTheme === 'light' ? 'bg-white/30 border-white/20' :
            currentTheme === 'dark' ? 'bg-black/30 border-black/20' :
                'bg-white/30 dark:bg-black/30 border-white/20 dark:border-black/20'
            } backdrop-blur-md border`}>
            {isEditing ? (
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4">{t.editFooter || 'Edit Footer'}</h3>

                    <div className="mb-4">
                        <label className="block mb-2">{t.footerText || 'Footer Text'}:</label>
                        <AutoResizeTextarea
                            className="bg-white/20 dark:bg-black/20 rounded px-3 py-2 w-full"
                            placeholder={currentLang === 'heb' ? "טקסט תחתית בעברית" : "Footer text in English"}
                            value={footerText[currentLang]}
                            onChange={e => setFooterText(prev => ({ ...prev, [currentLang]: e.target.value }))}
                            dir={currentLang === 'heb' ? 'rtl' : 'ltr'}
                        />
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium mb-2">{t.socialLinks || 'Social Media Links'}:</h4>
                        {renderSocialButton('instagram', Instagram)}
                        {renderSocialButton('facebook', Facebook)}
                        {renderSocialButton('twitter', Twitter)}
                        {renderSocialButton('website', Globe)}
                        {renderSocialButton('phone', Phone)}
                        {renderSocialButton('email', Mail)}
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            disabled={loading}
                        >
                            {t.cancel || 'Cancel'}
                        </button>
                        <button
                            onClick={saveChanges}
                            className="px-4 py-2 rounded-lg bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark text-white transition-colors"
                            disabled={loading}
                        >
                            {loading ? currentLang === 'heb' ? 'שומר...' : 'Saving...' : (t.save || 'Save')}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 text-center">
                        {(footerText[currentLang] || (!hasSocialLinks && (currentLang === 'heb' ? 'לחץ על ״ערוך״ כדי להוסיף תחתית' : 'Click "Edit" to add footer text'))) && (
                            <p dir={currentLang === 'heb' ? 'rtl' : 'ltr'} className="opacity-80 text-lg">
                                {footerText[currentLang] || (!hasSocialLinks && (currentLang === 'heb' ? 'לחץ על ״ערוך״ כדי להוסיף תחתית' : 'Click "Edit" to add footer text'))}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {socialLinks.instagram && renderSocialButton('instagram', Instagram)}
                        {socialLinks.facebook && renderSocialButton('facebook', Facebook)}
                        {socialLinks.twitter && renderSocialButton('twitter', Twitter)}
                        {socialLinks.website && renderSocialButton('website', Globe)}
                        {socialLinks.phone && renderSocialButton('phone', Phone)}
                        {socialLinks.email && renderSocialButton('email', Mail)}
                    </div>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1 text-xl rounded-lg bg-primary/80 dark:bg-primary-dark/80 hover:bg-primary dark:hover:bg-primary-dark text-white transition-colors"
                    >
                        {t.edit || 'Edit'}
                    </button>
                </div>
            )}
        </footer>
    );
};

export default Footer;