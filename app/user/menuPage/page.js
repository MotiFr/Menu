"use client"
import MenuItemDialog from "@/components/App/MenuItemDialog";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";





export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [CATEGORIES, setCATEGORIES] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/items');
        const json = await response.json();
        setCATEGORIES(json.categories);
        setMenu(json.items);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const skeletonItems = Array.from({ length: 4 });
  if (loading) return (
    <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Menu</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        View and manage your restaurant's menu items.
      </p>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skeletonItems.map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-20 h-20 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-5 w-16 mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Menu</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          View and manage your restaurant's menu items.
        </p>

        <div className="mt-8 space-y-8">
          {CATEGORIES.map((category) => {
            const items = menu.filter((item) => item.category === category);            
            if (items.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleItemClick(item)}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        {item.url && (
                          <Image
                            src={item.url}
                            alt={item.name}
                            width={150}
                            height={150}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {item.description} 
                          </p>
                          <p className="text-right mt-2 text-primary dark:text-primary-dark font-semibold">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MenuItemDialog
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}