"use client"
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ThemedBackground from "@/components/Menu/ThemeBG";
import { menuItemClasses, dialogClasses, priceClasses } from "./Themes";

export default function SelectionPage({ theme = "default" }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const restaurantId = pathname.split('/')[2];
    const storageKey = `selections-${restaurantId}`;

    const [selections, setSelections] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [lang, setLang] = useState('heb');
    const isRTL = lang === 'heb';


    useEffect(() => {
        const langParam = searchParams.get('lang');
        if (langParam) {
          setLang(langParam);
        }
      }, [searchParams]);

    const getLocalizedValue = (engValue, hebValue) => lang === 'eng' ? engValue : hebValue;


    useEffect(() => {
        const selected = JSON.parse(localStorage.getItem(storageKey)) || [];
        setSelections(selected);

        const handleSelectionsUpdate = () => {
            const updated = JSON.parse(localStorage.getItem(storageKey)) || [];
            setSelections(updated);
        };

        window.addEventListener('selectionsUpdated', handleSelectionsUpdate);
        return () => window.removeEventListener('selectionsUpdated', handleSelectionsUpdate);
    }, [storageKey]);

    const removeItem = (itemId) => {
        const itemIndex = selections.findIndex(item => item._id === itemId);
        if (itemIndex === -1) return;

        const updatedSelections = [...selections];
        updatedSelections.splice(itemIndex, 1);
        setSelections(updatedSelections);
        localStorage.setItem(storageKey, JSON.stringify(updatedSelections));
        window.dispatchEvent(new Event('selectionsUpdated'));
    };

    const openItemDialog = (item) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const groupedSelections = selections.reduce((acc, item) => {
        const existing = acc.find(group => group.item._id === item._id);
        if (existing) {
            existing.count++;
        } else {
            acc.push({ item, count: 1 });
        }
        return acc;
    }, []);

    if (selections.length === 0) {
        return (
            <div className={`min-h-[400px] flex flex-col items-center justify-center text-center p-8 ${menuItemClasses[theme]}`}>
                <h2 className="text-2xl font-semibold mb-4">
                    {getLocalizedValue("Your selections for this restaurant will appear here", "הבחירות שלך מתפריט המסעדה יופיעו כאן")}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    {getLocalizedValue("Click on items from the menu to get started!", "לחץ על פריט בתפריט המסדעה להתחיל")}
                </p>
            </div>
        );
    }

    return (
        <>
            <ThemedBackground theme={theme} />
            <div className="max-w-4xl mx-auto p-6" dir={isRTL ? 'rtl' : 'ltr'}>
                <h1 className={`text-2xl font-bold mb-6 ${priceClasses[theme]}`} >
                    {getLocalizedValue("Your Selections", "הבחירות שלך")}
                </h1>

                <div className="grid gap-2">
                    {groupedSelections.map(({ item, count }) => (
                        <Card
                            key={item._id}
                            className={`border-none overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer ${menuItemClasses[theme]}`}
                            onClick={() => openItemDialog(item)}
                        >
                            <CardContent className="relative p-0">
                                <div className={`absolute top-1 right-1 ${menuItemClasses[theme]} text-sm font-semibold px-1 py-1 rounded-full shadow`}>
                                    {count > 1 && <span className="text-l">(x{count})</span>}
                                </div>
                                <div className="flex items-center p-3">
                                    {item.url && (
                                        <div className={`relative w-20 h-20 flex-shrink-0 ${isRTL ? 'order-last' : ''}`}>
                                            <Image
                                                src={item.url}
                                                alt={item.name}
                                                fill
                                                className="rounded-lg object-cover"
                                                sizes="100px"
                                                onError={(e) => {
                                                    e.target.closest('.flex-shrink-0').style.display = 'none';
                                                }} />
                                        </div>
                                    )}
                                    <div className="flex-1 ml-4 mr-6">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className={`text-lg font-semibold ${priceClasses[theme]}`}>
                                                    {getLocalizedValue(item.name_eng, item.name_heb)}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                                                    {getLocalizedValue(item.description_eng, item.description_heb)}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <p className={`text-lg font-semibold ${priceClasses[theme]}`}>
                                                    {item.price}
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeItem(item._id);
                                                    }}
                                                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="absolute right-2 bottom-2 w-5 h-5 text-black dark:text-white hover:text-red-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
                <DialogContent className={`max-w-[26rem] ${dialogClasses[theme]}`}>
                    {selectedItem && (
                        <>
                            <DialogHeader>
                                <DialogTitle className={priceClasses[theme]}>
                                    {getLocalizedValue(selectedItem.name_eng, selectedItem.name_heb)}
                                </DialogTitle>
                            </DialogHeader>

                            {selectedItem.url && (
                                <div className="mt-4 relative h-72 w-full">
                                    <Image
                                        src={selectedItem.url}
                                        alt={selectedItem.name}
                                        fill
                                        sizes="(max-width: 1200px) 40vw, 25vw"
                                        className="rounded-lg object-cover"
                                        onError={(e) => {
                                            e.target.closest('.relative').style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}

                            <div className="mt-4 max-h-48 overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
                                <p className="text-sm text-muted-foreground">
                                    {getLocalizedValue(selectedItem.description_eng, selectedItem.description_heb)}
                                </p>
                            </div>

                            {selectedItem.allergens?.length > 0 && (
                                <div className="mt-4 space-y-2" dir={isRTL ? 'rtl' : 'ltr'}>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.allergens.map((allergen) => (
                                            <Badge
                                                key={allergen.eng}
                                                variant="destructive"
                                                className="text-xs"
                                            >
                                                {isRTL ? allergen.heb : allergen.eng}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6" dir={isRTL ? 'ltr' : 'rtl'}>
                                <p className={`text-xl font-bold ${priceClasses[theme]}`}>
                                    {selectedItem.price}
                                </p>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}