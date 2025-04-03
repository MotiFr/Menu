"use client"
import { useState, useEffect } from "react";
import MenuItemDialog from "./MenuItemDialog";
import Image from "next/image";
import { menuItemClasses } from '@/components/Menu/Themes';

export default function MenuCard({ items, theme = 'default', isRTL = false, specificItem = null, onSpecificItemOpen = () => {} }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      <div className="grid grid-cols-2 gap-2 pb-6">
        {items.map((item) => (
          item.seen && (
            <div
              key={item._id}
              ref={item.ref}
              onClick={() => handleItemClick(item)}
              className={`${menuItemClasses[theme]} relative cursor-pointer rounded-lg
                transition-all duration-300 hover:scale-102 hover:shadow-lg`}
            >
              <div className="relative h-32 w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                {item.url ? (
                  <div className="relative h-32 w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      sizes="(max-width: 767px) 50vw, 33vw"
                      className="object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className="w-full h-full hidden items-center justify-center dark:bg-gray-700/20"
                      style={{ backgroundColor: menuItemClasses[theme].secondary + '33' }}
                    >
                      <span
                        className="text-sm font-medium text-center px-1 dark:text-white"
                        style={{ color: menuItemClasses[theme].primary }}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center dark:bg-gray-700/20"
                    style={{ backgroundColor: menuItemClasses[theme].secondary + '33' }}
                  >
                    <span
                      className="text-sm font-medium text-center px-1 dark:text-white"
                      style={{ color: menuItemClasses[theme].primary }}
                    >
                      {item.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-2">
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className="text-sm font-bold line-clamp-1 dark:text-white"
                    style={{ color: menuItemClasses[theme].primary }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="font-bold text-sm dark:text-white"
                    style={{ color: menuItemClasses[theme].primary }}
                  >
                    ₪{item.price}
                  </span>
                </div>

                <p
                  className="text-xs mb-2 line-clamp-2 dark:text-gray-300"
                  style={{ color: menuItemClasses[theme].darkBackground }}
                >
                  {item.description}
                </p>

                {item.allergens && item.allergens.length > 0 && (
                  <div className="mt-auto">
                    <p
                      className="text-xs font-semibold mb-1 dark:text-white"
                      style={{ color: menuItemClasses[theme].primary }}
                    >
                      {isRTL ? 'אלרגנים:' : 'Allergens:'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.allergens.map((allergen) => (
                        <span
                          key={allergen.eng}
                          className="text-xs px-1 py-0.5 rounded-full bg-red-500 text-white"
                        >
                          {isRTL ? allergen.heb : allergen.eng}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        ))}
      </div>

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