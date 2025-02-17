import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import CategoryDialog from "@/components/App/CategoryDialog";
import DeleteCatDialog from "@/components/App/DeleteCatDialog";


export function CategoryDropDown({ setRefresh, category, indexer, CATEGORIES, getLocalizedValue, isRTL }) {

  const [selectedCategory, setSelectedCategory] = useState(category);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loadingPosition, setLoadingPosition] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);




  const handleEditCat = () => {
    setIsDialogOpen(true);
    setIsDropdownOpen(false);
  };

  const handleDeleteCat = () => {
    setIsDeleting(true);
    setIsDropdownOpen(false);
  }

  const handleUp = async () => {
    setLoadingPosition(true);
    try {
      const response = await fetch('/api/categoryElevate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: category,
        }),
      });

      if (response.ok) {
        setRefresh(prev => !prev);
      }
    } catch (error) {

    } finally {
      setLoadingPosition(false)
    }
  }

  const handleDown = async () => {
    setLoadingPosition(true);
    try {
      const response = await fetch('/api/categoryLower', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: category,
        }),
      });

      if (response.ok) {
        setRefresh(prev => !prev);
      }
    } catch (error) {

    } finally {
      setLoadingPosition(false)
    }
  }



  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white relative">
        {getLocalizedValue(category.name_eng, category.name_heb)}
        <span className={`${getLocalizedValue(`absolute right-0`, `absolute left-0`)}`}>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger>
              <Ellipsis className="h-8 w-8" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuItem
                onSelect={handleEditCat}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex items-center space-x-2">
                  <Pencil className="h-4 w-4" />
                  <span>{getLocalizedValue("Edit Category", "ערוך קטגוריה")}</span>
                </div>
              </DropdownMenuItem>
              {indexer > 0 && !loadingPosition && (
                <DropdownMenuItem
                  onSelect={handleUp}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <ArrowUp className="h-4 w-4" />
                    <span>{getLocalizedValue("Move up", "להזיז למעלה")}</span>
                  </div>
                </DropdownMenuItem>
              )}
              {indexer < CATEGORIES.length - 1 && !loadingPosition && (
                <DropdownMenuItem
                  onSelect={handleDown}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <ArrowDown className="h-4 w-4" />
                    <span>{getLocalizedValue("Move down", "להזיז למטה")}</span>
                  </div>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onSelect={handleDeleteCat}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex items-center space-x-2">
                  <Trash2 className="h-4 w-4" />
                  <span>{getLocalizedValue("Delete Category", "מחק קטגוריה")}</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </span>
      </h2>

      <CategoryDialog
        setRefresh={setRefresh}
        category={selectedCategory}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        CATEGORIES={CATEGORIES}
        getLocalizedValue={getLocalizedValue}
        isRTL={isRTL}
      />

      <DeleteCatDialog
        setRefresh={setRefresh}
        category={selectedCategory}
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        getLocalizedValue={getLocalizedValue}
        isRTL={isRTL}
      />



    </>
  )
}

export function SkeletonEditMenu() {
  return (<>
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Menu</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Here you can see all your items and categories, edit and remove them.
        </p>
        <div className="pt-10"></div>
        <div className="max-w-4xl mx-auto">
          <button
            className={`cursor-not-allowed w-full mb-4 px-6 py-3 text-l font-medium text-white bg-primary dark:bg-primary-dark rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark transition-colors duration-200`}
          >
            Add Item
          </button>
          <button
            className={`cursor-not-allowed w-full mb-4 px-6 py-3 text-l font-medium text-white bg-primary dark:bg-primary-dark rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark transition-colors duration-200`}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
    <div className="p-10 flex items-start space-x-4">
      <Skeleton className="w-20 h-20 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-5 w-16 mt-2" />
      </div>
    </div>
    <div className="p-10 flex items-start space-x-4">
      <Skeleton className="w-20 h-20 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-5 w-16 mt-2" />
      </div>
    </div>
  </>)
}

export async function handleUp(item, items, setLoadingPosition, setRefresh) {
  setLoadingPosition(true)
  try {
    const response = await fetch('/api/handleUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: item,
        items: items,
      }),
    });

    await response.json();


    if (response.ok) {
      setRefresh(prev => !prev);
    }

  } catch (error) {
  }
  finally {
    setLoadingPosition(false)
  }
}

export async function handleDown(item, items, setLoadingPosition, setRefresh) {
  setLoadingPosition(true)
  try {
    const response = await fetch('/api/handleDown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: item,
        items: items,
      }),
    });

    await response.json();


    if (response.ok) {
      setRefresh(prev => !prev);
    }

  } catch (error) {
  } finally {
    setLoadingPosition(false)
  }
}