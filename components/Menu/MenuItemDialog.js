"use client"
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { priceClasses, buttonClasses, dialogClasses } from '@/components/Menu/Themes'

export default function MenuItemDialog({ theme = 'default', item, isOpen, onClose, isRTL = false }) {
  const pathname = usePathname();
  const restaurantId = pathname.split('/')[2];
  const storageKey = `selections-${restaurantId}`;

  if (!item) return null;

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem(storageKey)) || [];
    cart.push(item);
    localStorage.setItem(storageKey, JSON.stringify(cart));
    window.dispatchEvent(new Event('selectionsUpdated'));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-[26rem] ${dialogClasses[theme]}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle className={priceClasses[theme]}>{item.name}</DialogTitle>
        </DialogHeader>

        {item.url && (
          <div className="mt-4 relative h-72">
          <Image
            src={item.url}
            alt={item.name}
            fill
            sizes="(max-width: 1200px) 40vw, 25vw"
            className="rounded-lg object-cover"
            onError={(e) => {
              e.target.closest('.relative').style.display = 'none';
            }}
          />
        </div>
        
        
        )}
        

        <div className="mt-4 max-h-48 overflow-y-auto">
          <p className={`text-sm ${theme === 'default' ? 'text-gray-600 dark:text-gray-300' : 'text-black/70 dark:text-white/70'}`}>
            {item.description}
          </p>
        </div>

        {item.allergens?.length > 0 && (
          <div className="mt-4 space-y-2">
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

        <div className={`mt-6 ${isRTL ? 'text-left' : 'text-right'}`}>
          <p className={`text-xl font-bold ${priceClasses[theme]}`}>
            {item.price}
          </p>
          <button
            className={`w-full mt-4 px-6 py-3 text-l font-medium text-white rounded-lg shadow-lg transition-colors duration-200 ${buttonClasses[theme]}`}
            onClick={() => addToCart(item)}
          >
            {isRTL ? 'בחר פריט' : 'Select item'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}