"use client"
import React from 'react';
import MenuItemDialog from "@/components/App/MenuItemDialog";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ThemedBackground from '@/components/Menu/ThemeBG';
import { categoryClasses, menuItemClasses, themes } from '@/components/Menu/Themes';
import AutoResizeTextarea from '@/components/Menu/TextareaSize';


const ThemeButton = ({ themeName, colors, isActive, onClick, setIsThemed }) => (
  <button
    onClick={() => onClick(themeName, setIsThemed(true))}
    className={`relative w-12 h-12 rounded-full m-2 transition-all duration-300 
      hover:scale-110 hover:shadow-lg transform
      ${isActive ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-black dark:ring-white scale-110' : 'scale-100'}`}
    style={{
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary} 33%, ${colors.secondary} 33%, ${colors.secondary} 66%, ${colors.accent} 66%, ${colors.accent} 100%)`
    }}
    title={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
  />
);

export default function MenuPage() {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isThemed, setIsThemed] = useState(false);
  const [menu, setMenu] = useState([]);
  const [CATEGORIES, setCATEGORIES] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingChange, setLoadingChage] = useState(false)
  const [menuTitle, setMenuTitle] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [errText, setErrText] = useState('')

  const redirect = useCallback(() => {
    window.location.href = '/';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/items');
        const json = await response.json();
        if (json.message === "Not authenticated") {
          redirect();
        }
        setCATEGORIES(json.categories);
        setMenu(json.items);
        setCurrentTheme(json.theme);
        setMenuDescription(json.description);
        setMenuTitle(json.header)

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [redirect]);




  if (loading) return (
    <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Menu</h1>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return <div>Error: {error.message}</div>;

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  async function handleChanges(event) {
    event.preventDefault();
    setLoadingChage(true)
    if (menuTitle.length > 150) {
      setErrText("Header is too long");
      setLoadingChage(false)
      return
    }
    if (menuDescription.length > 1500) {
      setErrText("Description is too long");
      setLoadingChage(false)
      return
    }
    try {
      const response = await fetch('/api/changeMenu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: currentTheme,
          header: menuTitle,
          description: menuDescription
        }),
      });

      await response.json();


      if (response.ok) {
        setLoadingChage(false)
        setIsThemed(false)
      }
      else {
        setLoadingChage(false)
      }

    } catch (error) {
    }
  }

  return (
    <div className="min-h-screen transition-all duration-500">
      <ThemedBackground theme={currentTheme} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Theme Selector */}
        <div className="mb-8 p-6 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-black/20">
          <h2 className="text-lg font-semibold mb-4 text-center">Choose Your Theme</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(themes).map(([name, colors]) => (
              <ThemeButton
                key={name}
                themeName={name}
                colors={colors}
                isActive={currentTheme === name}
                onClick={setCurrentTheme}
                setIsThemed={setIsThemed}
              />
            ))}

          </div>

          {/* Menu Header */}

          <div className="text-center mb-12">
            <h2 className="text-lg font-semibold mb-4 text-center mt-6">Edit Header And Description By Clicking</h2>
            <form onSubmit={handleChanges}>
              <div className="mb-4">
                <AutoResizeTextarea
                  type="text"
                  className="bg-inherit text-4xl font-bold w-full text-center"
                  placeholder="Header"
                  value={menuTitle}
                  onChange={e => (setMenuTitle(e.target.value), setIsThemed(true))}
                />
              </div>
              <div>
                <AutoResizeTextarea
                  className="bg-inherit text-lg opacity-80 w-full text-center"
                  placeholder="Description"
                  value={menuDescription}
                  onChange={e => (setMenuDescription(e.target.value), setIsThemed(true))}
                />
              </div>
              <div className='w-full'>
                {isThemed ?
                  <button
                    className={`absolute right-4 bottom-5 m-2 p-2 text-xs font-medium text-white rounded-lg shadow-lg transition-colors duration-200 ${loadingChange ? `bg-primary-light cursor-not-allowed` : `bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark `}`}
                    type="submit"
                  >
                    Save changes
                  </button>
                  : null}
                  <div className='text-lg text-red-500'>{errText}</div>
              </div>
            </form>
          </div>

        </div>



        {/* Menu Categories */}
        <div className="space-y-8">
          {CATEGORIES && CATEGORIES.length > 0 && (
            CATEGORIES.map((category) => {
              const items = menu.filter((item) => item.category === category.name && item.seen === true);
              if (items.length === 0) return null;

              return (
                <div
                  key={category.name}
                  className={`${categoryClasses[currentTheme]} rounded-2xl border backdrop-blur-md p-2`}
                >
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                  <p className="opacity-80 mb-8">{category.description}</p>

                  <div className="space-y-2">
                    {items.map((item) => (
                      item.seen && (
                        <div
                          key={item._id}
                          onClick={() => handleItemClick(item)}
                          className={`${menuItemClasses[currentTheme]} rounded-xl cursor-pointer 
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
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <MenuItemDialog
        theme={currentTheme}
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}