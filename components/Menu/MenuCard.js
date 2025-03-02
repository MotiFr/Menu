"use client"
import { useState } from "react";
import MenuItemDialog from "./MenuItemDialog";
import Image from "next/image";
import { menuItemClasses } from '@/components/Menu/Themes';

export default function MenuCard({ items, theme = 'default', isRTL = false }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  return (
    <>
      {items.map((item) => (
        item.seen && (
          <div
            key={item._id}
            onClick={() => handleItemClick(item)}
            className={`${menuItemClasses[theme]} rounded-xl cursor-pointer 
              transition-all duration-300 hover:shadow-xl h-24`}
          >
            <div className="flex items-center h-full p-4">
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
              <div className={`flex-1 min-w-0 ${isRTL ? 'mr-6' : 'ml-6'}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-lg font-semibold truncate ${isRTL ? 'pl-4' : 'pr-4'}`}>
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold whitespace-nowrap ml-4">{item.price}</span>
                </div>
                <p className="opacity-80 line-clamp-2 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        )
      ))}

      <MenuItemDialog
        theme={theme}
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        isRTL={isRTL}
      />
    </>
  );
}