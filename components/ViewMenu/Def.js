"use client";

import { ChevronLeft, ChevronRight, Settings2, X, Filter } from "lucide-react";
import MenuFooter from "../Menu/FooterView";
import MenuCard from "../Menu/MenuCard";
import ThemedBackground from "../Menu/ThemeBG";
import ViewTracker from "../Menu/ViewTracker";
import { categoryClasses, themes } from '@/components/Menu/Themes';
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from '@/components/ui/badge';

export default function Def({ CATEGORIES, theme, header, description, menu, footerText, socialLinks, restname, bg, message }) {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState('heb');
  const [showMessage, setShowMessage] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isScrolled, setIsScrolled] = useState(false);
  const isRTL = lang === 'heb';
  const [showAllergens, setShowAllergens] = useState(false);
  const [filteredAllergens, setFilteredAllergens] = useState([]);
  const [specificItem, setSpecificItem] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState('');
  const activeTheme = themes[theme] || themes.default;
  const categoryRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 64);
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
    if (expandedCategory && categoryRefs.current[expandedCategory]) {
      categoryRefs.current[expandedCategory].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [expandedCategory]);

  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam) {
      setLang(langParam);
    }
  }, [searchParams]);
  
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
                    setExpandedCategory(message.item.category);
                    setSpecificItem(message.item._id);
                    setShowMessage(false);
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
        
        <div className={`max-w-7xl mx-auto px-2 py-8 ${message && showMessage ? 'mt-32' : ''}`}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-6">
              {getLocalizedValue(header.eng, header.heb)}
            </h1>

            <p className="text-lg opacity-80 pb-6">
              {getLocalizedValue(description.eng, description.heb)}
            </p>
          </div>

          <div className="space-y-4">
            <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'text-left' : 'text-right'}`}>
              <button 
                onClick={toggleSettings} 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={getLocalizedValue(
                  showAllergens ? "Close allergens filter" : "Show allergens filter", 
                  showAllergens ? "סגור סינון אלרגנים" : "הצג סינון אלרגנים"
                )}
              >
                {showAllergens ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Settings2 className="w-8 h-8" />
                )}
              </button>
              
              {showAllergens && (
                <div className="flex items-center gap-2 flex-wrap flex-1">
                  <div className="flex items-center gap-2">
                    <Filter className="w-6 h-6" />
                    <span className="font-semibold text-lg">
                      {getLocalizedValue("Filter", "סינון")}
                    </span>
                    <span className="font-medium text-lg">
                      {getLocalizedValue("Without:", "ללא:")}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {allergensList.map((allergen) => (
                      <Badge
                        key={allergen.eng}
                        variant={filteredAllergens.includes(allergen.eng) ? "default" : "outline"}
                        className={`text-base cursor-pointer px-3 py-1 ${filteredAllergens.includes(allergen.eng) ? "bg-red-500 hover:bg-red-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                        onClick={() => toggleAllergenFilter(allergen)}
                      >
                        {isRTL ? allergen.heb : allergen.eng}
                        {filteredAllergens.includes(allergen.eng) && (
                          <X className="w-4 h-4 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {filteredAllergens.length > 0 && (
                    <button 
                      onClick={() => setFilteredAllergens([])}
                      className="text-sm underline hover:text-red-500 ml-auto"
                    >
                      {getLocalizedValue("Clear filters", "נקה סינון")}
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {CATEGORIES?.map((category) => {
              const allCategoryItems = menu.filter(item => item.category === category.name && item.seen);
              const filteredItems = getFilteredItems(allCategoryItems);
              
              if (filteredItems.length === 0) return null;

              return (
                <details
                  key={`category-${category.name}`}
                  ref={el => categoryRefs.current[category.name] = el}
                  open={category.name === expandedCategory}
                  className={`${categoryClasses[theme]} rounded-2xl border backdrop-blur-md p-2 group`}
                >
                  <summary className="pb-4 justify-between items-center cursor-pointer list-none select-none">
                    <h2 className={`text-2xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getLocalizedValue(category.name_eng, category.name_heb)}
                    </h2>
                    <p className={`opacity-80 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getLocalizedValue(category.description_eng, category.description_heb)}
                    </p>
                    <span className={`${isRTL ? 'left-2 group-open:rotate-90' : 'right-2 group-open:-rotate-90'} top-2 text-xl absolute transform transition-transform duration-300 `}>
                      {isRTL ? <ChevronRight /> : <ChevronLeft />}
                    </span>
                  </summary>

                  <div className="pt-2">
                    <div className="space-y-2">
                      <MenuCard
                        items={filteredItems.map((item, idx) => ({
                          ...item, 
                          key: `${category.name}-item-${idx}`,
                          name: getLocalizedValue(item.name_eng, item.name_heb),
                          description: getLocalizedValue(item.description_eng, item.description_heb)
                        }))}
                        theme={theme}
                        isRTL={isRTL}
                        specificItem={specificItem}
                        onSpecificItemOpen={setSpecificItem}
                      />
                    </div>
                  </div>
                </details>
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