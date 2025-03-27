'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { buttonClasses, themes } from '@/components/Menu/Themes';
import ThemedBackground from "../Menu/ThemeBG";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { X, Settings2, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ResponsiveMenu = ({
    item,
    categories,
    theme = 'forest',
    header = { eng: 'Our Menu', heb: 'התפריט שלנו' },
    description = { eng: 'Explore our delicious offerings', heb: 'גלו את המנות הטעימות שלנו' }
}) => {
    const searchParams = useSearchParams();
    const [lang, setLang] = useState('heb');
    const isRTL = lang === 'heb';

    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [visibleCategories, setVisibleCategories] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [showAllergens, setShowAllergens] = useState(false);
    const [filteredAllergens, setFilteredAllergens] = useState([]);
    const [allergensList, setAllergensList] = useState([]);

    useEffect(() => {
        const urlLang = searchParams.get('lang');
        if (urlLang) {
            setLang(urlLang);
        }
    }, [searchParams]);

    const pathname = usePathname();
    const restaurantId = pathname.split('/')[2];
    const storageKey = `selections-${restaurantId}`;

    const addToCart = (item) => {
        let cart = JSON.parse(localStorage.getItem(storageKey)) || [];
        cart.push(item);
        localStorage.setItem(storageKey, JSON.stringify(cart));
        window.dispatchEvent(new Event('selectionsUpdated'));
    };

    const processItems = useCallback((itemsData) => {
        if (!itemsData || !Array.isArray(itemsData)) return [];

        return itemsData
            .filter(single => single.seen !== false)
            .map(single => ({
                _id: single._id || single.id || `item-${Math.random().toString(36).substr(2, 9)}`,
                name_eng: single.name_eng || single.nameEng || single.title || '',
                name_heb: single.name_heb || single.nameHeb || '',
                description_eng: single.description_eng || single.descriptionEng || single.description || '',
                description_heb: single.description_heb || single.descriptionHeb || '',
                price: single.price || '0',
                category: single.category || 'Uncategorized',
                url: single.url || single.image || single.imageUrl || '',
                allergens: single.allergens || [],
                order: single.order || 0,
                seen: single.seen !== undefined ? single.seen : true
            }));
    }, []);

    const menuItems = useCallback(() => {
        return processItems(item);
    }, [item, processItems]);

    const activeTheme = themes[theme] || themes.forest;

    useEffect(() => {
        if (categories && categories.length > 0) {
            const items = menuItems();

            const categoryItemCounts = {};
            items.forEach(item => {
                if (!categoryItemCounts[item.category]) {
                    categoryItemCounts[item.category] = 0;
                }
                categoryItemCounts[item.category]++;
            });

            const filtered = categories.filter(category =>
                categoryItemCounts[category.name] && categoryItemCounts[category.name] > 0
            );

            setVisibleCategories(filtered);

            if (filtered.length > 0 && !selectedCategory) {
                setSelectedCategory(filtered[0].name);
            }
        }
    }, [categories, menuItems, selectedCategory]);

    useEffect(() => {
        const items = menuItems();
        const allAllergens = new Set();

        items.forEach(item => {
            if (item.allergens && Array.isArray(item.allergens)) {
                item.allergens.forEach(allergen => {
                    if (allergen.eng) {
                        allAllergens.add(JSON.stringify(allergen));
                    }
                });
            }
        });

        const uniqueAllergens = Array.from(allAllergens).map(allergenStr => JSON.parse(allergenStr));
        setAllergensList(uniqueAllergens);
    }, [menuItems]);

    useEffect(() => {
        if (selectedCategory) {
            const items = menuItems();
            let filtered = items.filter(item => item.category === selectedCategory);

            if (filteredAllergens.length > 0) {
                filtered = filtered.filter(item => {
                    if (!item.allergens || !Array.isArray(item.allergens)) return true;

                    const itemAllergenNames = item.allergens.map(a => a.eng);
                    return !filteredAllergens.some(allergen => itemAllergenNames.includes(allergen));
                });
            }

            setFilteredItems(filtered);
        }
    }, [selectedCategory, menuItems, filteredAllergens]);

    const scrollCategories = (direction) => {
        const container = document.querySelector('.category-scroll-container');
        if (container) {
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const openItemDialog = (item) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const toggleSettings = () => {
        setShowAllergens(!showAllergens);
    };

    const toggleAllergenFilter = (allergen) => {
        setFilteredAllergens(prev => {
            if (prev.includes(allergen.eng)) {
                return prev.filter(a => a !== allergen.eng);
            } else {
                return [...prev, allergen.eng];
            }
        });
    };

    const getLocalizedValue = (engValue, hebValue) => {
        return isRTL ? hebValue : engValue;
    };

    if (!visibleCategories || visibleCategories.length === 0) {
        return <div className="p-4 text-center">No categories available</div>;
    }

    return (
        <div className="w-full min-h-screen dark:bg-gray-900 dark:text-white">
            <ThemedBackground theme={theme} />

            <div className="max-w-7xl mx-auto px-2 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 dark:text-white" style={{ color: activeTheme.primary }}>
                        {getLocalizedValue(header.eng, header.heb)}
                    </h1>
                    <p className="text-lg opacity-80 dark:text-gray-300" style={{ color: activeTheme.darkBackground }}>
                        {getLocalizedValue(description.eng, description.heb)}
                    </p>
                </div>
            </div>

            {/* Inside the category scrolling section, modify the div structure */}
            <div className="w-full mx-auto relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
                    <button
                        onClick={() => scrollCategories('left')}
                        className="bg-white/50 dark:bg-gray-800/50 rounded-full p-2 shadow-md"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
                    <button
                        onClick={() => scrollCategories('right')}
                        className="bg-white/50 dark:bg-gray-800/50 rounded-full p-2 shadow-md"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div
                    className="category-scroll-container overflow-x-auto scrollbar-hide w-full py-3 relative"
                    style={{
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch',
                        scrollSnapType: 'x mandatory'
                    }}
                >
                    {/* Add gradient overlay for visual hint of scrollable content */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/50 to-transparent z-10 dark:from-gray-900/50"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/50 to-transparent z-10 dark:from-gray-900/50"></div>

                    <div className={`flex ${isRTL ? 'space-x-reverse' : ''} pb-2 whitespace-nowrap justify-start gap-4 px-10`}>
                    {visibleCategories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`relative px-6 py-3 rounded-xl transition-all duration-300 text-base font-medium whitespace-nowrap scroll-snap-align-center flex-shrink-0 overflow-hidden ${selectedCategory === category.name
                                ? 'shadow-lg transform scale-105 ring-2 ring-opacity-50'
                                : 'opacity-75 hover:opacity-90 hover:scale-102'
                                } dark:text-white dark:hover:bg-gray-700`}
                            style={{
                                backgroundColor: selectedCategory === category.name
                                    ? activeTheme.primary
                                    : activeTheme.secondary,
                                color: selectedCategory === category.name
                                    ? activeTheme.background
                                    : activeTheme.darkBackground,
                                ringColor: selectedCategory === category.name ? activeTheme.primary : 'transparent',
                                height: '120px', // Fixed height
                                width: '200px', // Fixed width
                                padding: 0, // Remove padding to use full background
                            }}
                        >
                            {/* Background Image or Grey Background */}
                            {category.url ? (
                                <Image
                                    src={category.url}
                                    alt={isRTL ? category.name_heb : category.name_eng}
                                    fill
                                    className="absolute inset-0 object-cover z-0 opacity-50"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div 
                                    className="absolute inset-0 bg-gray-200 dark:bg-gray-700 opacity-30 z-0"
                                />
                            )}

                            {/* Category Text */}
                            <span 
                                className="relative z-10 text-center flex items-center justify-center w-full h-full px-2"
                                style={{
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                }}
                            >
                                {isRTL ? category.name_heb : category.name_eng}
                            </span>
                        </button>
                    ))}
                </div>

                </div>
                <div className={`mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
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
                            <div className={`flex items-center gap-2 flex-wrap flex-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
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
                                        className={`text-sm underline hover:text-red-500 ${isRTL ? 'mr-auto' : 'ml-auto'}`}
                                    >
                                        {getLocalizedValue("Clear filters", "נקה סינון")}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {visibleCategories.map((category) => (
                    category.name === selectedCategory && (
                        <div key={`desc-${category.name}`} className="mb-6 text-center">
                            <h2 className="text-2xl font-bold mb-2" style={{ color: activeTheme.primary }}>
                                {isRTL ? category.name_heb : category.name_eng}
                            </h2>
                            <p className="text-sm italic max-w-2xl mx-auto" style={{ color: activeTheme.darkBackground }}>
                                {isRTL ? category.description_heb : category.description_eng}
                            </p>
                        </div>
                    )
                ))}

                <div className="grid grid-cols-2 gap-4 pb-6">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <MenuItemCard
                                key={item._id}
                                item={item}
                                theme={activeTheme}
                                isRTL={isRTL}
                                onClick={() => openItemDialog(item)}
                            />
                        ))
                    ) : (
                        <div className="col-span-2 text-center p-4">
                            <p className="text-sm" style={{ color: activeTheme.darkBackground }}>
                                {isRTL ? 'אין פריטים בקטגוריה זו' : 'No items in this category'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {selectedItem && (
                    <DialogContent
                        className={`max-w-md ${isRTL ? 'rtl' : 'ltr'}`}
                        style={{ backgroundColor: activeTheme.background }}
                    >
                        <DialogHeader>
                            <DialogTitle
                                className="text-xl font-bold"
                                style={{ color: activeTheme.primary }}
                            >
                                {isRTL ? selectedItem.name_heb : selectedItem.name_eng}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="mt-4">
                            <div className="flex-shrink-0 relative h-56 w-full mb-4 rounded-md overflow-hidden">
                                {selectedItem.url ? (
                                    <Image
                                        src={selectedItem.url}
                                        alt={isRTL ? selectedItem.name_heb : selectedItem.name_eng}
                                        fill
                                        className="object-cover"
                                        onError={(e) => {
                                            e.target.closest('.flex-shrink-0').style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center"
                                        style={{ backgroundColor: activeTheme.secondary + '33' }}
                                    >
                                        <span
                                            className="text-lg font-medium text-center px-1"
                                            style={{ color: activeTheme.primary }}
                                        >
                                            {isRTL ? selectedItem.name_heb : selectedItem.name_eng}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div
                                className="text-lg font-bold mb-2"
                                style={{ color: activeTheme.primary }}
                            >
                                ₪{selectedItem.price}
                            </div>

                            <p
                                className="text-sm mb-4"
                                style={{ color: activeTheme.darkBackground }}
                            >
                                {isRTL ? selectedItem.description_heb : selectedItem.description_eng}
                            </p>

                            {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                                <div className="mt-4">
                                    <p
                                        className="text-sm font-semibold mb-2"
                                        style={{ color: activeTheme.primary }}
                                    >
                                        {isRTL ? 'אלרגנים:' : 'Allergens:'}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.allergens.map((allergen, index) => (
                                            <span
                                                key={index}
                                                className="text-xs px-2 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: activeTheme.secondary,
                                                    color: activeTheme.background
                                                }}
                                            >
                                                {isRTL ? allergen.heb : allergen.eng}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        className={`w-full mt-4 px-6 py-3 text-l font-medium text-white rounded-lg shadow-lg transition-colors duration-200 ${buttonClasses[theme]}`}
                                        onClick={() => { addToCart(selectedItem), setIsDialogOpen(false) }}
                                    >
                                        {isRTL ? 'בחר פריט' : 'Select item'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div >
    );
};

const MenuItemCard = ({ item, theme, isRTL, onClick }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className="rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer dark:bg-gray-800 dark:border dark:border-gray-700"
            style={{ backgroundColor: theme.accent }}
            onClick={onClick}
        >
            <div className="relative h-32 w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                {item.url && !imageError ? (
                    <Image
                        src={item.url}
                        alt={isRTL ? item.name_heb : item.name_eng}
                        fill
                        sizes="(max-width: 767px) 50vw, 33vw"
                        className="object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center dark:bg-gray-700/20"
                        style={{ backgroundColor: theme.secondary + '33' }}
                    >
                        <span
                            className="text-sm font-medium text-center px-1 dark:text-white"
                            style={{ color: theme.primary }}
                        >
                            {isRTL ? item.name_heb : item.name_eng}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-2">
                <div className="flex justify-between items-start mb-1">
                    <h3
                        className="text-sm font-bold line-clamp-1 dark:text-white"
                        style={{ color: theme.primary }}
                    >
                        {isRTL ? item.name_heb : item.name_eng}
                    </h3>
                    <span
                        className="font-bold text-sm dark:text-white"
                        style={{ color: theme.primary }}
                    >
                        ₪{item.price}
                    </span>
                </div>

                <p
                    className="text-xs mb-2 line-clamp-2 dark:text-gray-300"
                    style={{ color: theme.darkBackground }}
                >
                    {isRTL ? item.description_heb : item.description_eng}
                </p>

                {item.allergens && item.allergens.length > 0 && (
                    <div className="mt-auto">
                        <p
                            className="text-xs font-semibold mb-1 dark:text-white"
                            style={{ color: theme.primary }}
                        >
                            {isRTL ? 'אלרגנים:' : 'Allergens:'}
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {item.allergens.map((allergen, index) => (
                                <span
                                    key={index}
                                    className="text-xs px-1 py-0.5 rounded-full dark:bg-gray-700"
                                    style={{
                                        backgroundColor: theme.secondary,
                                        color: theme.background
                                    }}
                                >
                                    {isRTL ? allergen.heb : allergen.eng}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResponsiveMenu;