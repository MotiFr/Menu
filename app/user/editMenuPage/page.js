"use client"
import DeleteDialog from "@/components/App/DeleteDialog";
import EditMenuDialog from "@/components/App/EditMenuDialog";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Eye, EyeOff, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CategoryDropDown, handleDown, handleUp, SkeletonEditMenu } from "./functions";
import { showError } from "./errToast";
import { useSearchParams } from 'next/navigation';



export default function EditMenuPageClient() {

  const searchParams = useSearchParams();
  const [currentLang, setCurrentLang] = useState('heb');

  useEffect(() => {
    const langParam = searchParams.get('lang');

    if (langParam && (langParam === 'eng' || langParam === 'heb')) {
      setCurrentLang(langParam);
    } else {
      const storedLang = localStorage.getItem('preferredLanguage');
      if (storedLang && (storedLang === 'eng' || storedLang === 'heb')) {
        setCurrentLang(storedLang);
      }
    }
  }, [searchParams]);

  const getLocalizedValue = (engValue, hebValue) => currentLang === 'eng' ? engValue : hebValue;
  const isRTL = currentLang === 'heb';



  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDelete, setisDelete] = useState(false);
  const [isLoadingEye, setIsLoadingEye] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingPosition, setLoadingPosition] = useState(false);

  const [items, setItems] = useState([]);
  const [CATEGORIES, setCATEGORIES] = useState([])
  const [refresh, setRefresh] = useState(false);
  const [isItemVisible, setIsItemVisible] = useState(false);
  const [isCatVisible, setIsCatVisible] = useState(false);
  const [showOnlyHidden, setShowOnlyHidden] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredURL, setEnteredURL] = useState("");
  const [enteredAllergens, setEnteredAllergens] = useState("")
  const [enteredCatName, setEnteredCatName] = useState("")
  const [enteredCatDescription, setEnteredCatDescription] = useState("")
  const [enteredFile, setEnteredFile] = useState("")


  const [submission, setSubmission] = useState("");
  const [submissionCat, setSubmissionCat] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileInputRef = useRef(null);


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


  if (loading) {
    return (
      <SkeletonEditMenu
        isRTL={isRTL}
      />
    )
  }

  if (error) return <div>Error: {error.message}</div>;

  async function submitCategory(event) {
    event.preventDefault();
    setIsSubmitting(true)
    setSubmissionCat("")
    if (enteredCatName === "") {
      setSubmissionCat(<span className="text-red-600">{getLocalizedValue("Please enter a name", "בבקשה הכנס שם")}</span>);
      setIsSubmitting(false)
      return;
    }
    if (enteredCatName.length > 50) {
      setSubmissionCat(<span className="text-red-600">{getLocalizedValue("Category name is too long", "שם הקטגוריה ארוך מדי")}</span>);
      setIsSubmitting(false)
      return;
    }
    if (enteredCatDescription.length > 500) {
      setSubmissionCat(<span className="text-red-600">{getLocalizedValue("Category description is too long", "תיאור הקטגוריה ארוך מדי")}</span>);
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
            category: { name: enteredCatName, description: enteredCatDescription },
            isRTL: isRTL
          }),
        });

        await response.json();


        if (response.ok) {
          setSubmissionCat(<span className="text-green-600">{getLocalizedValue("Successfully added a category", "קטגוריה חדשה נוספה")}</span>);
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
      setSubmissionCat(<span className="text-red-600">{getLocalizedValue("Category already exists", "קטגוריה כבר קיימת")}</span>);
      setIsSubmitting(false)
    }
  }

  async function submitForm(event) {
    event.preventDefault();
    setSubmission("")

    let selectedAllergens = [];

    if (enteredAllergens !== "") {
      selectedAllergens = enteredAllergens.split(',').map(item => item.trim()).filter(item => item !== '');
      for (let allergen of selectedAllergens) {
        if (allergen.length > 30) {
          setSubmission(<span className="text-red-600">{getLocalizedValue(`${allergen} is too long. Each should be 30 characters or fewer and separated by comma`, `${allergen} ארוך מדי צריך להיות פחות מ30 תווים כל אחד ומופרדים על ידי פסיק`)}</span>);
          return;
        }
      }
    }

    if (enteredFile) {
      const fileType = enteredFile.type;
      if (fileType !== "image/jpeg" && fileType !== "image/png") {
        setSubmission(<span className="text-red-600">{getLocalizedValue("Please upload a JPEG or PNG image", "קבצי JPEG או PNG ")}</span>);
        return;
      }
    }


    if (enteredName === "") {
      setSubmission(<span className="text-red-600">{getLocalizedValue("Please enter a name", "בבקשה הכנס שם")}</span>);
    }

    else if (enteredPrice === "") {
      setSubmission(<span className="text-red-600">{getLocalizedValue("Please enter a price", "בבקשה הכנס מחיר")}</span>);
    }
    else if (/[^0-9./\s]/.test(enteredPrice)) {
      setSubmission(<span className="text-red-600">{getLocalizedValue("Please enter number for price", "הכנס מספר במחיר")}</span>);
    }

    else if (enteredCategory === "") {
      setSubmission(<span className="text-red-600">{getLocalizedValue("Please enter a category", "בבקשה בחר קטגוריה")}</span>);
    }
    else if (enteredName.length > 100) {
      setSubmission(<span className="text-red-600">{getLocalizedValue("Item name is too long", "שם ארוך מדי")}</span>);
    }
    else if (enteredDescription.length > 500) {
      setSubmission(<span className="text-red-600">{getLocalizedValue("Item description is too long", "תיאור ארוך מדי")}</span>);
    }
    else if (enteredPrice.length > 50) {
      setSubmission(<span className="text-red-600">{getLocalizedValue("Price is too long", "מחיר ארוך מדי")}</span>);
    }
    else if (enteredAllergens.length > 500) {
      setSubmission(<span className="text-red-600">{getLocalizedValue("Additional comments are too long", "הערות נוספות יותר מדי ארוך")}</span>);
    }
    else if (enteredFile && enteredURL !== "") {
      setSubmission(<span className="text-red-600">{getLocalizedValue("Please enter image or image url", "הכנס או קובץ או קישור")}</span>);
    }



    else {
      setIsSubmitting(true)
      let imageUrl = "";

      if (enteredFile) {
        const formData = new FormData();
        formData.append('image', enteredFile);

        const uploadResponse = await fetch('/api/uploadImage', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          setSubmission(<span className="text-red-600">Failed to upload image, please try again later.</span>);
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      }

      if (imageUrl == "") {
        imageUrl = enteredURL;
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
            url: imageUrl,
            allergens: selectedAllergens,
            isRTL: isRTL
          }),
        });

        await response.json();


        if (response.ok) {
          setSubmission(<span className="text-green-600">{getLocalizedValue("Successfully added an item", "פריט נוסף בהצלחה")}</span>);
          setEnteredName("")
          setEnteredPrice("")
          setEnteredCategory("")
          setEnteredURL("")
          setEnteredDescription("")
          setEnteredAllergens("")
          setEnteredFile("")
          setIsSubmitting(false)
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          setRefresh(prev => !prev);
        }
        else {
          setSubmission(<span className="text-red-600">Failed, please try again later.</span>);
          setIsSubmitting(false)

        }

      } catch (error) {
        setSubmission(<span className="text-red-600">Failed, please try again later.</span>);
        setIsSubmitting(false)

      }
    }

  }

  return (

    <div className="max-w-4xl mx-auto" dir={isRTL ? "rtl" : ""}>
      <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getLocalizedValue("Edit Menu", "ערוך תפריט")}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {getLocalizedValue("Here you can see all your items and categories, edit and remove them.", "פה ניתן לראות ולערוך את כל הפריטים והקטגוריות.")}
        </p>
        <div className="pt-10"></div>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsItemVisible(!isItemVisible)}
            className={`${loading ? `cursor-not-allowed` : ``} w-full mb-4 px-6 py-3 text-l font-medium text-white bg-primary dark:bg-primary-dark rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark transition-colors duration-200`}
          >
            {getLocalizedValue("Add Item", "הוסף פריט")}
          </button>

          {isItemVisible && (
            <div className="bg-white dark:bg-gray-800 shadow-sm p-8" >
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {getLocalizedValue("Add an item to your menu", "הוסף פריט לתפריט")}
              </h1>

              <form className="mt-8 space-y-6" onSubmit={submitForm}>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {getLocalizedValue("Item Name", "שם הפריט")}
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
                      {getLocalizedValue("Price", "מחיר")}
                    </label>
                    <input
                      type="text"
                      id="price"
                      value={enteredPrice}
                      onChange={(event) => setEnteredPrice(event.target.value)}
                      placeholder={getLocalizedValue("e.g. 15 or 15 / 18 for sizes", "לדוגמה 15 או 15 / 18 לגדלים")}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {getLocalizedValue("Choose category", "בחר קטגוריה")}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={enteredCategory}
                      onChange={(event) => setEnteredCategory(event.target.value)}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    >
                      <option value="">{getLocalizedValue("--Select a category--", "--בחר קטגוריה--")}</option>
                      {CATEGORIES.map((category) => (
                        <option key={category.name} value={category.name}>
                          {getLocalizedValue(category.name_eng, category.name_heb)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {CATEGORIES.length === 0 && (<div>
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      {getLocalizedValue("No categories added yet. Start by adding your first category below.", "עדיין אין קטגוריות התחל בלהוסיף אחת למטה")}
                    </p>
                  </div>)}

                  <div className="relative">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {getLocalizedValue("Image URL (optional)", "קישור לתמונה (לא חובה)")}
                    </label>
                    <input
                      value={enteredURL}
                      onChange={(event) => setEnteredURL(event.target.value)}
                      type="url"
                      id="image"
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    />

                    <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
                      {getLocalizedValue("Upload Image (optional)", "העלאת תמונה כקובץ (לא חובה)")}
                    </label>
                    <input
                      ref={fileInputRef}
                      onChange={(event) => setEnteredFile(event.target.files[0])}
                      type="file"
                      id="file"
                      accept="image/png, image/jpeg"
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    />
                  </div>



                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {getLocalizedValue("Description (optional)", "תיאור (לא חובה)")}
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
                      {getLocalizedValue("Allergens, Additional comments, (comma-separated) (optional)", "אלרגיות והערות נוספות (כל הערה מופרדת בפסיק) (לא חובה)")}
                    </label>
                    <input
                      onChange={(event) => setEnteredAllergens(event.target.value)}
                      value={enteredAllergens}
                      type="text"
                      id="allergens"
                      placeholder={getLocalizedValue("e.g., gluten, nuts, spicy", "לדוגמה: מכיל גלוטן, חריף")}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center space-x-4">
                  <div className="flex flex-col items-start space-y-2">
                    <span className="font-medium m-2">
                      {submission}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className={`w-36 max-h-12 px-6 py-3 h-12 text-sm font-medium text-white ${isSubmitting ? `bg-amber-200 cursor-not-allowed` : `bg-primary dark:bg-primary-dark`} rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200`}
                  >
                    {isSubmitting ? getLocalizedValue("Adding...", "...מוסיף") : getLocalizedValue("Add Item", "הוסף פריט")}
                  </button>
                </div>
              </form>
            </div>
          )}

          <button
            onClick={() => setIsCatVisible(!isCatVisible)}
            className="w-full mb-4 px-6 py-3 text-l font-medium text-white bg-primary dark:bg-primary-dark rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark transition-colors duration-200"
          >
            {getLocalizedValue("Add Category", "הוסף קטגוריה")}
          </button>
          {isCatVisible && (
            <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getLocalizedValue("Add category to your menu", "הוסף קטגוריה לתפריט")}</h1>

              <form className="mt-8 space-y-6" onSubmit={submitCategory}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {getLocalizedValue("Category name", "שם הקטגוריה")}
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
                        {getLocalizedValue("Category description", "תיאור הקטגוריה")}
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
                    <span className="ml-4 font-medium">
                      {submissionCat}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className={`w-36 max-h-12 px-6 py-3 h-12 text-sm font-medium text-white ${isSubmitting ? `bg-amber-200 cursor-not-allowed` : `bg-primary dark:bg-primary-dark`} rounded-lg shadow-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200`}
                  >
                    {isSubmitting ? getLocalizedValue("Adding...", "...מוסיף") : getLocalizedValue("Add Category", "הוסף קטגוריה")}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-8 space-y-8">
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setShowOnlyHidden(!showOnlyHidden)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg shadow-md transition-all duration-200 ${
                  showOnlyHidden 
                    ? 'bg-primary dark:bg-primary-dark text-white hover:bg-primary-hover dark:hover:bg-primary-hover-dark' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {showOnlyHidden ? (
                  <Eye className={`h-6 w-6 ${showOnlyHidden ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                ) : (
                  <EyeOff className={`h-6 w-6 ${showOnlyHidden ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                )}
                <span className="font-medium">
                  {getLocalizedValue(
                    showOnlyHidden ? "Show All Items" : "Show Only Hidden Items",
                    showOnlyHidden ? "הצג את כל הפריטים" : "הצג רק פריטים מוסתרים"
                  )}
                </span>
              </button>
            </div>
            {CATEGORIES && CATEGORIES.length > 0 ? (
              CATEGORIES.map((category, indexer) => {
                const Citems = items
                  .filter((item) => item.category === category.name)
                  .filter((item) => !showOnlyHidden || !item.seen);
                return (
                  <details key={category.name}
                  className="backdrop-blur p-2 group bg-slate-200 dark:bg-gray-700 rounded-lg shadow-md transition-colors duration-200"
                  >
                    <summary className="justify-between items-center cursor-pointer list-none select-none">
                      <span className={`${isRTL ? 'right-0 group-open:-rotate-90' : 'left-0 group-open:rotate-90'} absolute top-2 text-xl transform transition-transform duration-300 `}>
                        {!isRTL ? <ChevronRight /> : <ChevronLeft />}
                      </span>
                      <CategoryDropDown
                        setRefresh={setRefresh}
                        category={category}
                        indexer={indexer}
                        CATEGORIES={CATEGORIES}
                        getLocalizedValue={getLocalizedValue}
                        isRTL={isRTL}
                      />

                      <div className="text-l text-gray-900 dark:text-white pb-4">{getLocalizedValue(category.description_eng, category.description_heb)}</div>
                    </summary>
                    <div className="grid grid-cols-1 gap-4">
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

                          <div className="flex items-start space-x-4 pl-6 pr-12" >
                            {item.url && (
                              <Image
                                src={item.url}
                                alt={item.name_eng}
                                width={150}
                                height={150}
                                className={`w-20 h-20 object-cover rounded-lg ${isRTL ? `order-last` : ``}`}

                              />
                            )}
                            <div className="flex-1">
                              <h3 className={item.seen ? `text-lg font-medium text-black dark:text-white line-clamp-1` : `line-clamp-1 text-lg font-medium text-gray-500 dark:text-gray-400`}>
                                {getLocalizedValue(item.name_eng, item.name_heb)}
                              </h3>
                              <p className={item.seen ? `mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-1 max-w-64` : `mt-1 text-sm text-gray-400 dark:text-gray-400 line-clamp-1 max-w-64`}>
                                {getLocalizedValue(item.description_eng, item.description_heb)}
                              </p>
                              <div className={item.url ? getLocalizedValue("absolute bottom-2 right-12", "absolute bottom-2 left-32") : getLocalizedValue("absolute bottom-3 right-12", "absolute bottom-3 left-10")}>
                                <p className="text-right mt-2 text-primary dark:text-primary-dark font-semibold">
                                  {item.price}
                                </p>
                              </div>

                              {items.length === 0 && (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                  {getLocalizedValue("No items added yet. Start by adding your first menu item above", "עדיין לא נוספו פריטים. התחל להוסיף את הפריט הראשון שלך בתפריט למעלה")}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                );
              })
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                {getLocalizedValue("No items added yet. Start by adding your first menu item above", "עדיין לא נוספו פריטים. התחל להוסיף את הפריט הראשון שלך בתפריט למעלה")}
              </p>
            )}
          </div>

        </div>

        <DeleteDialog
          setRefresh={setRefresh}
          item={selectedItem}
          isOpen={isDelete}
          onClose={() => setisDelete(false)}
          getLocalizedValue={getLocalizedValue}
          isRTL={isRTL}
        />
        <EditMenuDialog
          setRefresh={setRefresh}
          item={selectedItem}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          CATEGORIES={CATEGORIES}
          getLocalizedValue={getLocalizedValue}
          isRTL={isRTL}
        />
      </div>
    </div>
  )
}