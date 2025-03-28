"use client"
import { useState, useEffect, useRef } from "react";
import MenuItemDialog from "./MenuItemDialog";
import Image from "next/image";
import { menuItemClasses } from '@/components/Menu/Themes';
import { Badge } from '@/components/ui/badge';

export default function MenuCard({ items, theme = 'default', isRTL = false, specificItem = null, onSpecificItemOpen = () => {} }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (specificItem) {
      const item = items.find(item => item._id === specificItem);
      if (item) {
        // Add a small delay before opening
        const timer = setTimeout(() => {
          setSelectedItem(item);
          setIsDialogOpen(true);
        }, 400); // delay of 800ms
        return () => clearTimeout(timer);
      }
    }
  }, [specificItem, items]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
    onSpecificItemOpen(null); // Clear the specificItem in the parent
  };

  return (
    <>
      {items.map((item) => (
        item.seen && (
          <div
            key={item._id}
            ref={item._id === specificItem ? itemRef : null}
            onClick={() => handleItemClick(item)}
            className={`${menuItemClasses[theme]} relative rounded-xl cursor-pointer 
              transition-all duration-300 hover:shadow-xl ${item.allergens?.length > 0 ? `h-28` : ` h-26`}`}
          >
            <div className="flex h-full p-4">
              {item.url && (
                <div className={`flex-shrink-0 w-20 h-20 relative ${isRTL ? 'order-last' : ''}`}>
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    className="rounded-lg object-cover"
                    sizes="100px"
                    onError={(e) => {
                      e.target.closest('.flex-shrink-0').style.display = 'none';
                    }}
                  />

                </div>
              )}
              <div className={`flex-1 min-w-0 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-lg font-semibold truncate ${isRTL ? 'pl-4' : 'pr-4'}`}>
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold whitespace-nowrap ml-4">₪{item.price}</span>
                </div>
                <p className="opacity-80 line-clamp-1 text-sm">{item.description}</p>
              </div>
              <div className="absolute bottom-2 right-6">
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
            </div>
             

          </div>

        )
      ))}

      <MenuItemDialog
        theme={theme}
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={handleClose}
        isRTL={isRTL}
      />
    </>
  );
}