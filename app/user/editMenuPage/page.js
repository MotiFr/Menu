"use client"
import DeleteDialog from "@/components/App/DeleteDialog";
import EditMenuDialog from "@/components/App/EditMenuDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";




export default function editMenuPage() {

  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDelete, setisDelete] = useState(false);



  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setisDelete(true)
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingPosition, setLoadingPosition] = useState(false);
  

  const [items, setItems] = useState([]);
  const [CATEGORIES, setCATEGORIES] = useState([])
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/items');
        const json = await response.json();
        setCATEGORIES(json.categories);
        setItems(json.items);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);


  const [isVisible, setIsVisible] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredURL, setEnteredURL] = useState("");
  const [enteredAllergens, setEnteredAllergens] = useState("")

  const [submission, setSubmission] = useState("");
  const [submissionCat, setSubmissionCat] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)


  if (loading) {
    return (
      <>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Menu</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Add, edit, or remove items from your menu.
            </p>
            <div className="pt-10"></div>
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="w-full mb-4 px-6 py-3 text-l font-medium text-white bg-primary dark:bg-primary-dark rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark transition-colors duration-200"
              >
                Add an item
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
      </>
    )
  }



  if (error) return <div>Error: {error.message}</div>;

  async function handleUp(item, items) {
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

  async function handleDown(item, items) {
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

  async function submitForm(event) {
    event.preventDefault();
    setSubmission("")
    setSubmissionCat("")
    setIsSubmitting(true)

    let selectedAllergens = "";

    if (enteredAllergens !== "") {
      selectedAllergens = enteredAllergens.split(',').map(item => item.trim()).filter(item => item !== '');
    }


    if (enteredName === "") {
      setSubmission(<span className="text-red-600">Please enter a name</span>);
    }

    else if (enteredPrice === "") {
      setSubmission(<span className="text-red-600">Please enter a price</span>);
    }

    else if (enteredCategory === "") {
      setSubmission(<span className="text-red-600">Please enter a category</span>);
    }

    else {
      if (!CATEGORIES.some(category => category === enteredCategory)) {
        try {
          const response = await fetch('/api/categoryUp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              category: enteredCategory,
            }),
          });

          await response.json();


          if (response.ok) {
            setSubmissionCat(<span className="text-green-600">Successfully added a category.</span>);
          }
          else {
            setSubmissionCat(<span className="text-red-600">Failed, please try again later.</span>);
          }

        } catch (error) {
          setSubmissionCat(<span className="text-red-600">Failed, please try again later.</span>);
        }
      }

      try {
        const response = await fetch('/api/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: enteredName,
            price: enteredPrice,
            category: enteredCategory,
            description: enteredDescription,
            url: enteredURL,
            allergens: selectedAllergens
          }),
        });

        await response.json();


        if (response.ok) {
          setSubmission(<span className="text-green-600">Successfully added an item.</span>);
          setEnteredName("")
          setEnteredPrice("")
          setEnteredCategory("")
          setEnteredURL("")
          setEnteredDescription("")
          setEnteredAllergens("")
          setIsSubmitting(false)
          setRefresh(prev => !prev);
        }
        else {
          setSubmission(<span className="text-red-600">Failed, please try again later.</span>);
        }

      } catch (error) {
        setSubmission(<span className="text-red-600">Failed, please try again later.</span>);
      }
    }

  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Menu</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Add, edit, or remove items from your menu.
        </p>
        <div className="pt-10"></div>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="w-full mb-4 px-6 py-3 text-l font-medium text-white bg-primary dark:bg-primary-dark rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark transition-colors duration-200"
          >
            Add an item
          </button>

          {isVisible && (
            <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Menu</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Add, edit, or remove items from your menu.
              </p>

              <form className="mt-8 space-y-6" onSubmit={submitForm}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Item Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={enteredName}
                      onChange={(event) => setEnteredName(event.target.value)}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={enteredPrice}
                      onChange={(event) => setEnteredPrice(event.target.value)}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <input
                      id="category"
                      value={enteredCategory}
                      onChange={(event) => setEnteredCategory(event.target.value)}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                      list="categories"
                    />
                    <datalist id="categories">
                      {CATEGORIES.map((category) => (
                        <option key={category}>
                          {category}
                        </option>
                      ))}
                    </datalist>
                  </div>

                  <div className="relative">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Image URL
                    </label>
                    <input
                      onChange={(event) => setEnteredURL(event.target.value)}
                      type="url"
                      id="image"
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={enteredDescription}
                      onChange={(event) => setEnteredDescription(event.target.value)}
                      rows={3}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="allergens" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Allergens (comma-separated)
                    </label>
                    <input
                      onChange={(event) => setEnteredAllergens(event.target.value)}
                      value={enteredAllergens}
                      type="text"
                      id="allergens"
                      placeholder="e.g., gluten, nuts, dairy"
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center space-x-4">
                  <div className="flex flex-col items-start space-y-2">
                    <span className="font-medium">
                      {submission}
                    </span>
                    <span className="font-medium">
                      {submissionCat}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className={`w-36 max-h-12 px-6 py-3 h-12 text-sm font-medium text-white ${ isSubmitting ? `bg-amber-200` : `bg-primary dark:bg-primary-dark`} rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200`}
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-8 space-y-8">
            {CATEGORIES.map((category) => {
              const Citems = items.filter((item) => item.category === category);
              return (
                <div key={category}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Citems.map((item, index) => (
                      <div
                        key={item._id}
                        onClick={() => handleItemClick(item)}
                        className="relative bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                      >
                         {index > 0 && !loadingPosition && (
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            handleUp(item, Citems);
                          }}
                          className="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                        >
                          <ArrowUp className="h-6 w-6" />
                        </button> )}
                        {index < Citems.length - 1 && !loadingPosition && (
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDown(item, Citems);
                          }}
                          className="absolute top-7 right-0 p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                        >
                          <ArrowDown className="h-6 w-6" />
                        </button>
                        )}
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(item);
                          }}
                          className="absolute bottom-0 right-0 p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-6 w-6" />
                        </button>
                        
                        <div className="flex items-start space-x-4 pr-8">
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

                            {items.length === 0 && (
                              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                No items added yet. Start by adding your first menu item above.
                              </p>
                            )}
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
        <DeleteDialog
          setRefresh={setRefresh}
          item={selectedItem}
          isOpen={isDelete}
          onClose={() => setisDelete(false)}
        />
        <EditMenuDialog
          setRefresh={setRefresh}
          item={selectedItem}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          CATEGORIES={CATEGORIES}
        />
      </div>
    </div>
  )
}