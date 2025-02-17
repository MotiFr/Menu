"use client"
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { priceClasses, dialogClasses } from '@/components/Menu/Themes'

export default function MenuItemDialog({ theme = 'default', item, isOpen, onClose, isRTL, lang }) {

    if (!item) return null;
    const getLocalizedValue = (engValue, hebValue) => lang === 'eng' ? engValue : hebValue;


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={`max-w-[26rem] ${dialogClasses[theme]}`} dir={isRTL ? 'rtl' : 'ltr'}>
                <DialogHeader>
                    <DialogTitle className={priceClasses[theme]}>{getLocalizedValue(item.nam_eng, item.name_heb)}</DialogTitle>
                </DialogHeader>

                {item.url && (
                    <div className="mt-4 relative h-48 w-full">
                        <Image
                            src={item.url}
                            alt={item.name}
                            fill
                            className="rounded-lg object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                    </div>
                )}

                <div className="mt-4 max-h-48 overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
                    <p className="text-sm text-muted-foreground">
                        {getLocalizedValue(item.description_eng, item.description_heb)}
                    </p>
                </div>

                {item.allergens?.length > 0 && (
                    <div className="mt-4 space-y-2" dir={isRTL ? 'rtl' : 'ltr'}>
                        <div className="flex flex-wrap gap-2">
                            {item.allergens.map((allergen) => (
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
                        {item.price}
                    </p>
                </div>


            </DialogContent>
        </Dialog>
    );
}