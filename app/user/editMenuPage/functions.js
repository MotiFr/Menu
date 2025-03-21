import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Ellipsis, Pencil, Trash2 } from "lucide-react";
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
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white relative pl-4 pr-4">
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

export function SkeletonEditMenu({ isRTL }) {
  return (
    <div className="max-w-4xl mx-auto" dir={isRTL ? "rtl" : ""}>
      <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        <div className="pt-10"></div>

        {/* Action buttons skeletons */}
        <div className="max-w-4xl mx-auto">
          <Skeleton className="w-full mb-4 h-12 rounded-lg" />
          <Skeleton className="w-full mb-4 h-12 rounded-lg" />

          {/* Categories and items skeletons */}
          <div className="mt-8 space-y-8">
            {/* Repeat for 2 categories */}
            {[1, 2].map((category) => (
              <div key={category} className="mb-6">
                {/* Category header skeleton */}
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-8" />
                </div>

                {/* Category description skeleton */}
                <Skeleton className="h-4 w-2/3 mb-4" />

                {/* Items skeletons - 3 items per category */}
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="relative bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-4 pl-6 pr-12">
                        {/* Item image skeleton */}
                        <div className={`${isRTL ? "order-last" : ""}`}>
                          <Skeleton className="w-20 h-20 rounded-lg" />
                        </div>

                        <div className="flex-1">
                          {/* Item name skeleton */}
                          <Skeleton className="h-5 w-1/2 mb-2" />

                          {/* Item description skeleton */}
                          <Skeleton className="h-4 w-3/4" />

                          {/* Item price skeleton */}
                          <div className={`absolute ${isRTL ? "left-32 bottom-2" : "right-12 bottom-2"
                            }`}>
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
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