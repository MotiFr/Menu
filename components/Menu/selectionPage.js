"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
    const pathname = usePathname();
    const restaurantId = pathname.split('/')[2];
    const storageKey = `selections-${restaurantId}`;

    const [selections, setSelections] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                    Your selections for this restaurant will appear here
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Click on items from the menu to get started!
                </p>
            </div>
        );
    }

    return (
        <>
            <ThemedBackground theme={theme} />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className={`text-2xl font-bold mb-6 ${priceClasses[theme]}`}>
                    Your Selections
                </h1>

                <div className="grid gap-2">
                    {groupedSelections.map(({ item, count }) => (
                        <Card
                            key={item._id}
                            className={`border-none overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer ${menuItemClasses[theme]}`}
                            onClick={() => openItemDialog(item)}
                        >
                            <CardContent className="relative p-0">
                                <div className={`absolute top-2 right-2 ${menuItemClasses[theme]} text-sm font-semibold px-2 py-1 rounded-full shadow`}>
                                    {count > 1 && <span className="text-l">(x{count})</span>}
                                </div>
                                <div className="flex items-center p-3">
                                    {item.url && (
                                        <div className="relative w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={item.url}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 ml-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className={`text-lg font-semibold ${priceClasses[theme]}`}>
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <p className={`text-lg font-semibold ${priceClasses[theme]}`}>
                                                    ${item.price}
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeItem(item._id);
                                                    }}
                                                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="w-5 h-5 text-black dark:text-white hover:text-red-600" />
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
                                    {selectedItem.name}
                                </DialogTitle>
                            </DialogHeader>

                            {selectedItem.url && (
                                <div className="mt-4 relative h-48 w-full">
                                    <Image
                                        src={selectedItem.url}
                                        alt={selectedItem.name}
                                        fill
                                        className="rounded-lg object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority
                                    />
                                </div>
                            )}

                            <div className="mt-4 max-h-48 overflow-y-auto">
                                <p className="text-sm text-muted-foreground">
                                    {selectedItem.description}
                                </p>
                            </div>

                            {selectedItem.allergens?.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <h4 className="text-sm font-medium">Allergens:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.allergens.map((allergen) => (
                                            <Badge
                                                key={allergen}
                                                variant="destructive"
                                                className="text-xs"
                                            >
                                                {allergen}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 text-right">
                                <p className={`text-xl font-bold ${priceClasses[theme]}`}>
                                    ${selectedItem.price}
                                </p>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}