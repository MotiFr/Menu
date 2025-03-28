"use client";

import { Settings2, X, Filter } from "lucide-react";
import MenuFooter from "../Menu/FooterView";
import MenuCardCategories from "../Menu/MenuCardCategories";
import ThemedBackground from "../Menu/ThemeBG";
import ViewTracker from "../Menu/ViewTracker";
import { categoryClasses, themes } from '@/components/Menu/Themes';
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function CategoryMenu({ CATEGORIES, theme, header, description, menu, footerText, socialLinks, restname = "moti", bg, message }) {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState('heb');
  const [showMessage, setShowMessage] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isScrolled, setIsScrolled] = useState(false);
  const isRTL = lang === 'heb';
  const [showAllergens, setShowAllergens] = useState(false);
  const [filteredAllergens, setFilteredAllergens] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const activeTheme = themes[theme] || themes.default;
  const [specificItem, setSpecificItem] = useState(null);
  const itemRef = useRef(null);
  const categoryContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 64); // 64px is the height of the navbar
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (message) {
      const initialTime = message.time || 10;
      setProgress(100);
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            setShowMessage(false);
            return 0;
          }
          return prev - (100 / initialTime);
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [message]);

  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam) {
      setLang(langParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (CATEGORIES && CATEGORIES.length > 0) {
      setSelectedCategory(CATEGORIES[0].name);
    }
  }, [CATEGORIES]);
  
  useEffect(() => {
    if (specificItem && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [specificItem, selectedCategory]);
  
  const getLocalizedValue = (engValue, hebValue) => lang === 'eng' ? engValue : hebValue;
  
  const getAllergens = () => {
    const allAllergens = new Map(); 
    
    menu.forEach(item => {
      if (item.allergens && item.allergens.length > 0) {
        item.allergens.forEach(allergen => {
          if (!allAllergens.has(allergen.eng)) {
            allAllergens.set(allergen.eng, allergen);
          }
        });
      }
    });
    
    return Array.from(allAllergens.values());
  };
  
  const allergensList = getAllergens();
  
  const getFilteredItems = (items) => {
    if (filteredAllergens.length === 0) return items;
    
    return items.filter(item => {
      if (!item.allergens || item.allergens.length === 0) return true;
      
      const hasFilteredAllergen = item.allergens.some(allergen => 
        filteredAllergens.includes(allergen.eng)
      );
      
      return !hasFilteredAllergen;
    });
  };
  
  const toggleAllergenFilter = (allergen) => {
    setFilteredAllergens(prev => 
      prev.includes(allergen.eng) 
        ? prev.filter(a => a !== allergen.eng) 
        : [...prev, allergen.eng]
    );
  };

  const toggleSettings = () => {
    setShowAllergens(!showAllergens);
  };

  const scrollToCategory = (categoryName) => {
    if (categoryContainerRef.current) {
      const container = categoryContainerRef.current;
      const categoryElement = container.querySelector(`[data-category="${categoryName}"]`);
      if (categoryElement) {
        const containerWidth = container.clientWidth;
        const elementLeft = categoryElement.offsetLeft;
        const elementWidth = categoryElement.offsetWidth;
        const scrollPosition = elementLeft - (containerWidth / 2) + (elementWidth / 2);
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <div className="min-h-screen transition-all duration-500" dir={isRTL ? 'rtl' : 'ltr'}>
        <ThemedBackground theme={theme} customBg={bg} />
        
        {message && showMessage && (
          <div className={`fixed z-50 animate-slide-down transition-all duration-300 ${isScrolled ? 'top-0' : 'top-16'} left-0 right-0 flex justify-center`}>
            <div className="w-full max-w-2xl px-4">
              <div 
                onClick={(e) => {
                  if (e.target.closest('button')) return;
                  
                  if (message?.item) {
                    setSelectedCategory(message.item.category);
                    setSpecificItem(message.item._id);
                    scrollToCategory(message.item.category);
                  }
                }}
                className="relative p-4 rounded-b-xl shadow-xl border-b backdrop-blur-md cursor-pointer"
                style={{
                  backgroundColor: `${activeTheme.primary}dd`,
                  borderColor: `${activeTheme.secondary}40`,
                }}
              >
                <div className="absolute top-0 left-0 h-1.5 bg-white/20 w-full">
                  <div 
                    className="h-full bg-white/40 transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-white">
                    {getLocalizedValue(message.eng, message.heb)}
                  </span>
                  <button 
                    onClick={() => setShowMessage(false)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className={`max-w-2xl mx-auto px-2 pt-6 ${message && showMessage ? 'mt-32' : ''}`}>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 dark:text-white pb-6">
              {getLocalizedValue(header.eng, header.heb)}
            </h1>

            <p className="text-lg dark:text-gray-200 pb-6" >
              {getLocalizedValue(description.eng, description.heb)}
            </p>
          </div>

          {/* Category Section */}
          <div className="w-full mx-auto relative">
            <div
              ref={categoryContainerRef}
              className="category-scroll-container overflow-x-auto scrollbar-hide w-full py-3 relative"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory'
              }}
            >
              <div className={`flex whitespace-nowrap justify-start gap-4`}>
                {CATEGORIES?.filter(category => {
                  const categoryItems = menu.filter(item => item.category === category.name && item.seen);
                  return categoryItems.length > 0;
                }).map((category) => (
                  <button
                    key={category.name}
                    data-category={category.name}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      scrollToCategory(category.name);
                    }}
                    className={`relative px-6 py-3 rounded-xl transition-all duration-300 text-base font-medium whitespace-nowrap scroll-snap-align-center flex-shrink-0 overflow-hidden ${
                      selectedCategory === category.name
                        ? 'shadow-2xl ring-4 ring-opacity-80'
                        : 'opacity-75 hover:opacity-90 hover:scale-102'
                    }  dark:text-white dark:hover:bg-gray-700`}
                    style={{
                      backgroundColor: selectedCategory === category.name
                        ? 'rgba(0, 0, 0, 0.75)'
                        : 'rgba(255, 255, 255, 0.05)',
                      color: selectedCategory === category.name
                        ? 'white'
                        : activeTheme.darkBackground,
                      ringColor: selectedCategory === category.name ? 'rgba(255, 255, 255, 0.4)' : 'transparent',
                      height: '120px',
                      width: '200px',
                      padding: 0,
                    }}
                  >
                    <div 
                      className="absolute inset-0 z-0"
                      style={{
                        background: `linear-gradient(135deg, ${activeTheme.primary}60, ${activeTheme.secondary}60)`,
                        border: `1px solid ${activeTheme.primary}70`,
                      }}
                    />
                    {category.url && (
                      <Image
                        src={category.url}
                        alt={isRTL ? category.name_heb : category.name_eng}
                        fill
                        className="absolute inset-0 object-cover z-[1] opacity-30"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}

                    <span 
                      className="relative z-10 text-center flex items-center justify-center w-full h-full px-2 dark:text-white"
                      style={{
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        fontSize: '1.5rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: '600',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        hyphens: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5rem',
                        lineHeight: '1.2',
                        maxHeight: '100%',
                      }}
                    >
                      {isRTL ? category.name_heb : category.name_eng}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'text-left' : 'text-right'}`}>
              {!showAllergens && (
                <button 
                  onClick={toggleSettings} 
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label={getLocalizedValue(
                    showAllergens ? "Close allergens filter" : "Show allergens filter", 
                    showAllergens ? "סגור סינון אלרגנים" : "הצג סינון אלרגנים"
                  )}
                >
                  <Settings2 className="w-8 h-8" />
                </button>
              )}
              
              {showAllergens && (
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Filter className="w-6 h-6 dark:text-white" />
                      <span className="font-semibold text-lg dark:text-white">
                        {getLocalizedValue("Filter", "סינון")}
                      </span>
                      <span className="font-medium text-lg dark:text-white">
                        {getLocalizedValue("Without:", "ללא:")}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {filteredAllergens.length > 0 && (
                        <button 
                          onClick={() => setFilteredAllergens([])}
                          className="text-sm underline hover:text-red-500 dark:text-white"
                        >
                          {getLocalizedValue("Clear filters", "נקה סינון")}
                        </button>
                      )}
                      <button 
                        onClick={toggleSettings} 
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label={getLocalizedValue(
                          showAllergens ? "Close allergens filter" : "Show allergens filter", 
                          showAllergens ? "סגור סינון אלרגנים" : "הצג סינון אלרגנים"
                        )}
                      >
                        <X className="w-8 h-8" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pb-4">
                    {allergensList.map((allergen) => (
                      <Badge
                        key={allergen.eng}
                        variant={filteredAllergens.includes(allergen.eng) ? "default" : "outline"}
                        className={`text-base cursor-pointer px-2 py-0.5 ${filteredAllergens.includes(allergen.eng) ? "bg-red-500 hover:bg-red-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                        onClick={() => toggleAllergenFilter(allergen)}
                      >
                        {isRTL ? allergen.heb : allergen.eng}
                        {filteredAllergens.includes(allergen.eng) && (
                          <X className="w-4 h-4 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {CATEGORIES?.map((category) => {
              const allCategoryItems = menu.filter(item => item.category === category.name && item.seen);
              const filteredItems = getFilteredItems(allCategoryItems);
              
              if (filteredItems.length === 0 || category.name !== selectedCategory) return null;

              return (
                <div
                  key={`category-${category.name}`}
                  className={`${categoryClasses[theme]} max-w-lg mx-auto rounded-2xl backdrop-blur-md p-2 m-3`}
                >
                  <div className="relative">
                    <h2 className={`text-2xl font-bold mb-2 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getLocalizedValue(category.name_eng, category.name_heb)}
                    </h2>
                    <p className={`dark:text-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getLocalizedValue(category.description_eng, category.description_heb)}
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="space-y-2">
                      <MenuCardCategories
                        specificItem={specificItem}
                        items={filteredItems.map((item, idx) => ({
                          ...item, 
                          key: `${category.name}-item-${idx}`,
                          name: getLocalizedValue(item.name_eng, item.name_heb),
                          description: getLocalizedValue(item.description_eng, item.description_heb),
                          ref: item._id === specificItem ? itemRef : null
                        }))}
                        theme={theme}
                        isRTL={isRTL}
                        onSpecificItemOpen={setSpecificItem}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ViewTracker
          restname={restname}
        />
        <MenuFooter
          currentLang={isRTL ? 'heb' : 'eng'}
          currentTheme={theme}
          Footer={{ footerText, socialLinks }}
        />
      </div>
    </>
  );
}