import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState, useRef } from 'react';

export default function EditMenuDialog({ setRefresh, item, isOpen, onClose, CATEGORIES, getLocalizedValue, isRTL }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        url: '',
        allergens: '',
    });
    const [enteredFile, setEnteredFile] = useState(null);
    const [submission, setSubmission] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (item) {
            setFormData({
                name: getLocalizedValue(item.name_eng, item.name_heb) || '',
                price: item.price || '',
                category: item.category || '',
                description: getLocalizedValue(item.description_eng, item.description_heb) || '',
                url: item.url || '',
                allergens: Array.isArray(item.allergens) ? getLocalizedValue(item.allergens.map(allergen => allergen.eng).join(', '), item.allergens.map(allergen => allergen.heb).join(', ')) : '',
            });
            setEnteredFile(null);
        }
    }, [item, isRTL]);

    useEffect(() => {
        setSubmission(<span></span>);
    }, [formData, enteredFile]);

    if (!item) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setEnteredFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmission(<span className="text-red-600"></span>);

        let selectedAllergens = "";

        if (formData.allergens !== "") {
            selectedAllergens = formData.allergens.split(',').map(item => item.trim()).filter(item => item !== '');
            for (let allergen of selectedAllergens) {
                if (allergen.length > 30) {
                    setSubmission(<span className="text-red-600">{allergen} {getLocalizedValue("is too long. Each should be 30 characters or fewer and separated by comma", "ארוך מדי כל הערה מופרדת בפסיק וקטנה מ30 תווים")}</span>);
                    setLoading(false);
                    return;
                }
            }
        }

        if (!formData.name) {
            setSubmission(<span className="text-red-600">{getLocalizedValue("Please enter a name", "בבקשה הכנס שם")}</span>);
            setLoading(false);
            return;
        }

        if (!formData.price) {
            setSubmission(<span className="text-red-600">{getLocalizedValue("Please enter a price", "בבקשה הכנס מחיר")}</span>);
            setLoading(false);
            return;
        }

        if (/[^0-9./\s]/.test(formData.price)) {
            setSubmission(<span className="text-red-600">{getLocalizedValue("Please enter number for price", "בבקשה הכנס מחיר כמספר")}</span>);
            setLoading(false);
            return;
        }

        if (!formData.category) {
            setSubmission(<span className="text-red-600">{getLocalizedValue("Please enter a category", "בבקשה הכנס קטגוריה")}</span>);
            setLoading(false);
            return;
        }

        // Validate image file if provided
        if (enteredFile) {
            const fileType = enteredFile.type;
            if (fileType !== "image/jpeg" && fileType !== "image/png") {
                setSubmission(<span className="text-red-600">{getLocalizedValue("Please upload a JPEG or PNG image", "קבצי JPEG או PNG ")}</span>);
                setLoading(false);
                return;
            }
        }

        setSubmission(<span className="text-red-600"></span>);

        let allergens = item.allergens;

        if (isRTL) {
            for (let i = 0; i < allergens.length; i++) {
                if (selectedAllergens[i]) {
                    allergens[i].heb = selectedAllergens[i];
                }
            }

            if (selectedAllergens.length > allergens.length) {
                for (let i = allergens.length; i < selectedAllergens.length; i++) {
                    allergens.push({ eng: "", heb: selectedAllergens[i] });
                }
            }
        }
        else {
            for (let i = 0; i < allergens.length; i++) {
                if (selectedAllergens[i]) {
                    allergens[i].eng = selectedAllergens[i];
                }
            }

            if (selectedAllergens.length > allergens.length) {
                for (let i = allergens.length; i < selectedAllergens.length; i++) {
                    allergens.push({ eng: selectedAllergens[i], heb: "" });
                }
            }
        }

        try {
            let imageUrl = formData.url;

            // Upload image if a file was selected
            if (enteredFile) {
                const imageFormData = new FormData();
                imageFormData.append('image', enteredFile);

                const uploadResponse = await fetch('/api/uploadImage', {
                    method: 'POST',
                    body: imageFormData,
                });

                if (!uploadResponse.ok) {
                    setSubmission(<span className="text-red-600">{getLocalizedValue("Failed to upload image, please try again later.", "העלאת התמונה נכשלה, אנא נסה שוב מאוחר יותר.")}</span>);
                    setLoading(false);
                    return;
                }

                const uploadData = await uploadResponse.json();
                imageUrl = uploadData.url;
            }

            const response = await fetch('/api/updateItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: item._id,
                    ...formData,
                    url: imageUrl, // Use the uploaded image URL or existing URL
                    allergens: allergens,
                    isRTL: isRTL
                }),
            });

            if (response.ok) {
                setFormData({
                    name: '',
                    price: '',
                    category: '',
                    description: '',
                    url: '',
                    allergens: '',
                });
                setEnteredFile(null);
                setRefresh(prev => !prev);
                onClose();
            } else {
                setSubmission(<span className="text-red-600">{getLocalizedValue("Failed to save.", "השמירה נכשלה.")}</span>);
            }
        } catch (error) {
            setSubmission(<span className="text-red-600">{getLocalizedValue("Failed to save.", "השמירה נכשלה.")}</span>);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[26rem]">
                <DialogHeader>
                    <DialogTitle>{getLocalizedValue("Edit item", "ערוך פריט")}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4" dir={isRTL ? "rtl" : ""}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {getLocalizedValue("Item Name", "שם הפריט")}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {getLocalizedValue("Price", "מחיר")}
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            required
                            value={formData.price}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {getLocalizedValue("Category", "קטגוריה")}
                        </label>
                        <select
                            id="category"
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleInputChange}
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

                    <div>
                        <label htmlFor="imageOptions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {getLocalizedValue("Image", "תמונה")}
                        </label>
                        
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="url" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    {getLocalizedValue("Image URL", "קישור לתמונה")}
                                </label>
                                <input
                                    type="url"
                                    id="url"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="file" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    {getLocalizedValue("Or upload an image", "או העלה תמונה")}
                                </label>
                                <input
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    type="file"
                                    id="file"
                                    accept="image/png, image/jpeg"
                                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                                />
                                {enteredFile && (
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {getLocalizedValue("Selected file: ", "קובץ נבחר: ")}{enteredFile.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {getLocalizedValue("Description", "תיאור")}
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="allergens" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {getLocalizedValue(" Allergens, Additional comments (comma-separated)", "אלרגיות והערות נוספות (כל הערה מופרדת עם פסיק)")}
                        </label>
                        <input
                            type="text"
                            id="allergens"
                            name="allergens"
                            value={formData.allergens}
                            onChange={handleInputChange}
                            placeholder="e.g., gluten, nuts, dairy"
                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <span className="font-medium">
                            {submission}
                        </span>
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-10 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            {getLocalizedValue("Cancel", "בטל")}
                        </button>
                        <button
                            type="submit"
                            className={`h-10 w-24 px-4 py-2 text-sm font-medium text-white rounded-lg shadow-lg ${loading ? 'bg-amber-200' : 'bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark'}`}
                        >
                            {loading ? getLocalizedValue("Saving...", "...שומר") : getLocalizedValue("Save", "שמירה")}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}