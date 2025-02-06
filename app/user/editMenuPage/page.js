"use client"
import DeleteDialog from "@/components/App/DeleteDialog";
import EditMenuDialog from "@/components/App/EditMenuDialog";
import { ArrowDown, ArrowUp, Eye, EyeOff, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CategoryDropDown, handleDown, handleUp, SkeletonEditMenu } from "./functions";
import { showError } from "./errToast";


export default function editMenuPage() {


  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDelete, setisDelete] = useState(false);
  const [isLoadingEye, setIsLoadingEye] = useState(false);


  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setisDelete(true)
  }

  const handleView = async (item) => {
    setIsLoadingEye(true);
    try {
      const response = await fetch('/api/View', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: item
        }),
      });

      await response.json();


      if (response.ok) {
        setRefresh(prev => !prev);
      }

    } catch (error) {
      showError("Something went wrong")
    } finally {
      setIsLoadingEye(false);
    }
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingPosition, setLoadingPosition] = useState(false);

  const [items, setItems] = useState([]);
  const [CATEGORIES, setCATEGORIES] = useState([])
  const [refresh, setRefresh] = useState(false);


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
        setItems(json.items);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);


  const [isItemVisible, setIsItemVisible] = useState(false);
  const [isCatVisible, setIsCatVisible] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredURL, setEnteredURL] = useState("");
  const [enteredAllergens, setEnteredAllergens] = useState("")
  const [enteredCatName, setEnteredCatName] = useState("")
  const [enteredCatDescription, setEnteredCatDescription] = useState("")


  const [submission, setSubmission] = useState("");
  const [submissionCat, setSubmissionCat] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)


  if (loading) {
    return (
      <SkeletonEditMenu />
    )
  }

  if (error) return <div>Error: {error.message}</div>;

  async function submitCategory(event) {
    event.preventDefault();
    setIsSubmitting(true)
    setSubmissionCat("")
    if (enteredCatName === "") {
      setSubmissionCat(<span className="text-red-600">Please enter a name</span>);
      setIsSubmitting(false)
      return;
    }
    if (enteredCatName.length > 50) {
      setSubmissionCat(<span className="text-red-600">Category name is too long.</span>);
      setIsSubmitting(false)
      return;
    }
    if (enteredCatDescription.length > 500) {
      setSubmissionCat(<span className="text-red-600">Category description is too long.</span>);
      setIsSubmitting(false)
      return;
    }
    if (!CATEGORIES || !CATEGORIES.some(category => category.name === enteredCatName)) {
      try {
        const response = await fetch('/api/categoryUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: { name: enteredCatName, description: enteredCatDescription }
          }),
        });

        await response.json();


        if (response.ok) {
          setSubmissionCat(<span className="text-green-600">Successfully added a category.</span>);
          setIsSubmitting(false)
          setEnteredCatDescription("")
          setEnteredCatName("")
          setRefresh(prev => !prev);
        }
        else {
          setSubmissionCat(<span className="text-red-600">Failed, please try again later.</span>);
        }

      } catch (error) {
        setSubmissionCat(<span className="text-red-600">Failed, please try again later.</span>);
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setSubmissionCat(<span className="text-red-600">Category already exists.</span>);
      setIsSubmitting(false)
    }
  }

  async function submitForm(event) {
    event.preventDefault();
    setSubmission("")

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
    else if (enteredName.length > 100) {
      setSubmission(<span className="text-red-600">Item name is too long.</span>);
    }
    else if (enteredDescription.length > 500) {
      setSubmission(<span className="text-red-600">Item description is too long.</span>);
    }
    else if (enteredPrice.length > 50) {
      setSubmission(<span className="text-red-600">Price is too long.</span>);
    }
    else if (setEnteredAllergens.length > 500) {
      setSubmission(<span className="text-red-600">Allergens are too long.</span>);
    }


    else {
      setIsSubmitting(true)


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
          Here you can see all your items and categories, edit and remove them.
        </p>
        <div className="pt-10"></div>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsItemVisible(!isItemVisible)}
            className="w-full mb-4 px-6 py-3 text-l font-medium text-white bg-primary dark:bg-primary-dark rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark transition-colors duration-200"
          >
            Add Item
          </button>

          {isItemVisible && (
            <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add an item to your menu</h1>

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
                    <select
                      id="category"
                      name="category"
                      value={enteredCategory}
                      onChange={(event) => setEnteredCategory(event.target.value)}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    >
                      <option value="">--Select a category--</option>
                      {CATEGORIES.map((category) => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {CATEGORIES.length === 0 && (<div>
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No categories added yet. Start by adding your first category below.
                    </p>
                  </div>)}

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
                  </div>

                  <button
                    type="submit"
                    className={`w-36 max-h-12 px-6 py-3 h-12 text-sm font-medium text-white ${isSubmitting ? `bg-amber-200 cursor-not-allowed` : `bg-primary dark:bg-primary-dark`} rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200`}
                  >
                    {isSubmitting ? 'Adding...' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <button
            onClick={() => setIsCatVisible(!isCatVisible)}
            className="w-full mb-4 px-6 py-3 text-l font-medium text-white bg-primary dark:bg-primary-dark rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark transition-colors duration-200"
          >
            Add Category
          </button>
          {isCatVisible && (
            <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add category to your menu</h1>

              <form className="mt-8 space-y-6" onSubmit={submitCategory}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={enteredCatName}
                      onChange={(event) => setEnteredCatName(event.target.value)}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    />
                    <div className="relative mt-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category description
                      </label>
                      <textarea
                        type="text"
                        rows={2}
                        id="name"
                        value={enteredCatDescription}
                        onChange={(event) => setEnteredCatDescription(event.target.value)}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-center space-x-4">
                  <div className="flex flex-col items-start space-y-2">
                    <span className="font-medium">
                      {submissionCat}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className={`w-36 max-h-12 px-6 py-3 h-12 text-sm font-medium text-white ${isSubmitting ? `bg-amber-200 cursor-not-allowed` : `bg-primary dark:bg-primary-dark`} rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200`}
                  >
                    {isSubmitting ? 'Adding...' : 'Add Category'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-8 space-y-8">
            {CATEGORIES && CATEGORIES.length > 0 ? (
              CATEGORIES.map((category, indexer) => {
                const Citems = items.filter((item) => item.category === category.name);
                return (
                  <div key={category.name}>
                    <CategoryDropDown
                      setRefresh={setRefresh}
                      category={category}
                      indexer={indexer}
                      CATEGORIES={CATEGORIES}
                    />
                    <div className="text-l text-gray-900 dark:text-white mb-4">{category.description}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Citems.map((item, index) => (
                        <div
                          key={item._id}
                          onClick={() => handleItemClick(item)}
                          className="relative bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="absolute left-0 top-0 flex flex-col p-2">
                            {index > 0 && !loadingPosition && (
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleUp(item, Citems, setLoadingPosition, setRefresh);
                                }}
                                className="mb-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                              >
                                <ArrowUp className="h-6 w-6" />
                              </button>
                            )}
                            {index < Citems.length - 1 && !loadingPosition && (
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleDown(item, Citems, setLoadingPosition, setRefresh);
                                }}
                                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                              >
                                <ArrowDown className="h-6 w-6" />
                              </button>
                            )}
                          </div>

                          <div className="absolute right-0 bottom-0 flex flex-col p-2">
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                handleView(item);
                              }}
                              className="mb-1 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
                            >
                              {item.seen ? (
                                <div><Eye className={`h-6 w-6 ${isLoadingEye ? `cursor-not-allowed` : ``}`} /></div>
                              ) : (
                                <div><EyeOff className={`h-6 w-6 ${isLoadingEye ? `cursor-not-allowed` : ``}`} /></div>
                              )}
                            </button>
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDelete(item);
                              }}
                              className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                            >
                              <Trash2 className="h-6 w-6" />
                            </button>
                          </div>

                          <div className="flex items-start space-x-4 pl-12 pr-12">
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
                              <h3 className={item.seen ? `text-lg font-medium text-black dark:text-white` : `text-lg font-medium text-gray-500 dark:text-gray-400`}>
                                {item.name}
                              </h3>
                              <p className={item.seen ? `mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2` : `mt-1 text-sm text-gray-400 dark:text-gray-400 line-clamp-1`}>
                                {item.description}
                              </p>
                              <div className="absolute bottom-2 right-12">
                              <p className="text-right mt-2 text-primary dark:text-primary-dark font-semibold">
                                {item.price}
                              </p>
                              </div>

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
              })
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No items added yet. Start by adding your first menu item above.
              </p>
            )}
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