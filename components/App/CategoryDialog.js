import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function CategoryDialog({ setRefresh, category, isOpen, onClose, getLocalizedValue, isRTL }) {

    const [changedCategory, setChangedCategory] = useState({
        name: getLocalizedValue(category.name_eng, category.name_heb),
        description: getLocalizedValue(category.description_eng, category.description_heb),
    })
    const [loading, setLoading] = useState(false);
    const [submission, setSubmission] = useState('');

    useEffect(() => {
        setChangedCategory({
            name: getLocalizedValue(category.name_eng, category.name_heb),
            description: getLocalizedValue(category.description_eng, category.description_heb),
        })
    }, [isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!changedCategory.name) {
            setSubmission(<span className="text-red-600">{getLocalizedValue("Please enter a name", "בבקשה הכנס שם")}</span>);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/updateCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    changedCategory: changedCategory,
                    categoryName: category.name,
                    isRTL,
                }),
            });

            if (response.ok) {
                setRefresh(prev => !prev);
                onClose();
            } else {
                setSubmission(<span className="text-red-600">Failed to save.</span>);
            }
        } catch (error) {
            setSubmission(<span className="text-red-600">Failed to save.</span>);
        } finally {
            setLoading(false);
        }


    }

    if (!category) return null;

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-[26rem]">
                    <DialogHeader>
                        <DialogTitle>{getLocalizedValue("Edit Category", "ערוך קטגוריה")}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4" dir={isRTL ? "rtl" : ""}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {getLocalizedValue("Category Name", "שם הקטגוריה")}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={changedCategory.name}
                                onChange={(e) => setChangedCategory({ ...changedCategory, name: e.target.value })}
                                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {getLocalizedValue("Description", "תיאור")}
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={changedCategory.description}
                                onChange={(e) => setChangedCategory({ ...changedCategory, description: e.target.value })}
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
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                {getLocalizedValue("Cancel", "ביטול")}
                            </button>
                            <button
                                type="submit"
                                className={`w-24 px-4 py-2 text-sm font-medium text-white rounded-lg shadow-lg ${loading ? 'bg-amber-200 cursor-not-allowed' : 'bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark'}`}
                            >
                                {loading ? getLocalizedValue("Saving...", "...שומר") : getLocalizedValue("Save", "שמור")}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}