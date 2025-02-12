"use client"
import { useState } from "react";
import MenuItemDialog from "../App/MenuItemDialog";
import Image from "next/image";
import { menuItemClasses } from '@/components/Menu/Themes';

export default function MenuCard({ items, theme = 'default' }) {
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
                <div className="flex-shrink-0 w-20 h-20 relative">
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    className="rounded-lg object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0 ml-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold truncate pr-4">{item.name}</h3>
                  <span className="text-lg font-bold whitespace-nowrap">${item.price}</span>
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
      />
    </>
  );
}