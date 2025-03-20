"use client"
import React from 'react';
import MenuItemDialog from "@/components/App/MenuItemDialog";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import ThemedBackground from '@/components/Menu/ThemeBG';
import { categoryClasses, menuItemClasses, themes } from '@/components/Menu/Themes';
import AutoResizeTextarea from '@/components/Menu/TextareaSize';
import Footer from '@/components/App/FooterEdit';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const translations = {
  eng: {
    chooseTheme: "Choose Your Theme",
    editHeader: "Edit Header And Description By Clicking",
    saveChanges: "Save changes",
    headerTooLong: "Header is too long",
    descTooLong: "Description is too long",
    yourMenu: "Your Menu",
    hebrewTitle: "Hebrew Title",
    englishTitle: "English Title",
    hebrewDesc: "Hebrew Description",
    englishDesc: "English Description",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    socialLinks: "Social media links",
    footerText: "Footer text",
    editFooter: "Edit footer",


  },
  heb: {
    chooseTheme: "בחר עיצוב",
    editHeader: "לחץ על הכותרת ועל התיאור בשביל לערוך",
    saveChanges: "שמור שינויים",
    headerTooLong: "הכותרת ארוכה מדי",
    descTooLong: "התיאור ארוך מדי",
    yourMenu: "התפריט שלך",
    hebrewTitle: "כותרת בעברית",
    englishTitle: "כותרת באנגלית",
    hebrewDesc: "תיאור בעברית",
    englishDesc: "תיאור באנגלית",
    edit: "ערוך",
    save: "שמור",
    cancel: "ביטול",
    socialLinks: "קישור לרשתות חברתיות",
    footerText: "טקסט תחתית",
    editFooter: "ערוך תחתית",
  }
};

const ThemeButton = ({ themeName, colors, isActive, onClick, setIsThemed }) => (
  <button
    onClick={() => onClick(themeName, setIsThemed(true))}
    className={`relative w-12 h-12 rounded-full m-2 transition-all duration-300 
      hover:scale-110 hover:shadow-lg transform
      ${isActive ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-black dark:ring-white scale-110' : 'scale-100'}`}
    style={{
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary} 33%, ${colors.secondary} 33%, ${colors.secondary} 66%, ${colors.accent} 66%, ${colors.accent} 100%)`
    }}
    title={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
  />
);

export default function MenuPageClient() {
  const searchParams = useSearchParams();
  const [currentLang, setCurrentLang] = useState('heb');

  useEffect(() => {
    const langParam = searchParams.get('lang');

    if (langParam && (langParam === 'eng' || langParam === 'heb')) {
      setCurrentLang(langParam);
    } else {
      const storedLang = localStorage.getItem('preferredLanguage');
      if (storedLang && (storedLang === 'eng' || storedLang === 'heb')) {
        setCurrentLang(storedLang);
      }
    }
  }, [searchParams]);
  const t = translations[currentLang];

  const [currentTheme, setCurrentTheme] = useState('default');
  const [isThemed, setIsThemed] = useState(false);
  const [menu, setMenu] = useState([]);
  const [CATEGORIES, setCATEGORIES] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingChange, setLoadingChage] = useState(false);
  const [menuTitles, setMenuTitles] = useState({ heb: '', eng: '' });
  const [menuDescriptions, setMenuDescriptions] = useState({ heb: '', eng: '' });
  const [errText, setErrText] = useState('');
  const [footerText, setFooterText] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  const redirect = useCallback(() => {
    window.location.href = '/';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/items');
        const json = await response.json();
        if (json.message === "Not authenticated") {
          redirect();
        }
        setCATEGORIES(json.categories);
        setMenu(json.items);
        setCurrentTheme(json.theme);
        setMenuDescriptions({
          heb: json.description.heb || '',
          eng: json.description.eng || ''
        });
        setMenuTitles({
          heb: json.header.heb || '',
          eng: json.header.eng || ''
        });
        setFooterText(json.footerText);
        setSocialLinks(json.socialLinks);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [redirect]);

  if (loading) return (
    <div className="min-h-screen transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Theme selection and header editing section */}
        <div className="mb-8 p-6 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-black/20">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />

          {/* Theme buttons - circles */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-14 rounded-full" />
            ))}
          </div>

          {/* Header editing section - everything centered */}
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />

            <div className="space-y-10">
              <div className="mb-4">
                <Skeleton className="h-12 w-3/4 mx-auto" />
              </div>

              <div>
                <Skeleton className="h-24 w-full mx-auto" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  if (error) return <div>Error: {error.message}</div>;

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  async function handleChanges(event) {
    event.preventDefault();
    setLoadingChage(true);

    if (menuTitles.heb.length > 150 || menuTitles.eng.length > 150) {
      setErrText(t.headerTooLong);
      setLoadingChage(false);
      return;
    }
    if (menuDescriptions.heb.length > 1500 || menuDescriptions.eng.length > 1500) {
      setErrText(t.descTooLong);
      setLoadingChage(false);
      return;
    }

    try {
      const response = await fetch('/api/changeMenu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: currentTheme,
          header: {
            heb: menuTitles.heb,
            eng: menuTitles.eng
          },
          description: {
            heb: menuDescriptions.heb,
            eng: menuDescriptions.eng
          }
        }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('header', JSON.stringify(result.header));
        localStorage.setItem('description', JSON.stringify(result.description));
        setLoadingChage(false);
        setIsThemed(false);
      } else {
        setLoadingChage(false);
      }

    } catch (error) {
      console.error('Error saving changes:', error);
      setLoadingChage(false);
    }
  }

  const textDirection = currentLang === 'heb' ? 'rtl' : 'ltr';

  return (

    <div className="min-h-screen transition-all duration-500" dir={textDirection}>
      <ThemedBackground theme={currentTheme} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 p-6 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-black/20">
          <h2 className="text-lg font-semibold mb-4 text-center">{t.chooseTheme}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(themes).map(([name, colors]) => (
              <ThemeButton
                key={name}
                themeName={name}
                colors={colors}
                isActive={currentTheme === name}
                onClick={setCurrentTheme}
                setIsThemed={setIsThemed}
              />
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-lg font-semibold mb-4 text-center mt-6">{t.editHeader}</h2>
            <form onSubmit={handleChanges}>
              <div className="space-y-4">
                <div className="mb-4">
                  <AutoResizeTextarea
                    className="bg-inherit text-4xl font-bold w-full text-center"
                    placeholder={currentLang === 'heb' ? "כותרת בעברית" : "English Title"}
                    value={menuTitles[currentLang]}
                    onChange={e => {
                      setMenuTitles(prev => ({ ...prev, [currentLang]: e.target.value }));
                      setIsThemed(true);
                    }}
                    dir={currentLang === 'heb' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <AutoResizeTextarea
                    className="bg-inherit text-lg opacity-80 w-full text-center"
                    placeholder={currentLang === 'heb' ? "תיאור בעברית" : "English Description"}
                    value={menuDescriptions[currentLang]}
                    onChange={e => {
                      setMenuDescriptions(prev => ({ ...prev, [currentLang]: e.target.value }));
                      setIsThemed(true);
                    }}
                    dir={currentLang === 'heb' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              <div className='w-full relative mt-14'>
                {isThemed && (
                  <button
                    className={`absolute right-4 bottom-5 m-2 p-2 text-xs font-medium text-white rounded-lg shadow-lg transition-colors duration-200 ${loadingChange ? 'bg-primary-light cursor-not-allowed' : 'bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark'}`}
                    type="submit"
                  >
                    {t.saveChanges}
                  </button>
                )}
                <div className='text-lg text-red-500'>{errText}</div>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          {CATEGORIES && CATEGORIES.length > 0 && (
            CATEGORIES.map((category) => {
              const items = menu.filter((item) => item.category === category.name && item.seen === true);
              if (items.length === 0) return null;

              return (
                <details
                  key={category.name}
                  className={`${categoryClasses[currentTheme]} rounded-2xl border backdrop-blur-md p-2 group`}
                >
                  <summary className="pb-4 justify-between items-center cursor-pointer list-none select-none">
                    <h2 className="text-2xl font-bold mb-2">{category[`name_${currentLang}`]}</h2>
                    <p className="opacity-80">{category[`description_${currentLang}`]}</p>
                    <span className={`${currentLang === 'heb' ? 'left-2 group-open:rotate-90' : 'right-2 group-open:-rotate-90'} top-2 text-xl absolute transform transition-transform duration-300 `}>
                      {currentLang === 'heb' ? <ChevronRight /> : <ChevronLeft />}
                    </span>
                  </summary>
                  
                  <div className="space-y-2">
                    {items.map((item) => (
                      item.seen && (
                        <div
                          key={item._id}
                          onClick={() => handleItemClick(item)}
                          className={`${menuItemClasses[currentTheme]} rounded-xl cursor-pointer 
                            transition-all duration-300 hover:shadow-xl h-24`}
                        >
                          <div className="flex items-center h-full p-4">
                            {item.url && (
                              <div className={`flex-shrink-0 w-20 h-20 relative ${currentLang == "heb" ? 'order-last' : ''}`}>
                                <Image
                                  src={item.url}
                                  alt={item[`name_${currentLang}`]}
                                  fill
                                  sizes='10'
                                  className="rounded-lg object-cover"
                                  onError={(e) => {
                                    e.target.closest('.flex-shrink-0').style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0 ml-6">
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold truncate pr-4">{item[`name_${currentLang}`]}</h3>
                                <span className="text-lg font-bold whitespace-nowrap">{item.price}</span>
                              </div>
                              <p className="opacity-80 line-clamp-2 text-sm">{item[`description_${currentLang}`]}</p>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </details>
              );
            })
          )}
        </div>
      </div>

      <Footer
        currentLang={currentLang}
        currentTheme={currentTheme}
        t={t}
        footer={{ socialLinks, footerText }}
      />

      <MenuItemDialog
        theme={currentTheme}
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        isRTL={textDirection === "rtl"}
        lang={currentLang}
      />
    </div>
  );
}