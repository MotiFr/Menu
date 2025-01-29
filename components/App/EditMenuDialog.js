import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

export default function EditMenuDialog({ setRefresh, item, isOpen, onClose, CATEGORIES }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        url: '',
        allergens: '',
    });
    const [submission, setSubmission] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || '',
                price: item.price || '',
                category: item.category || '',
                description: item.description || '',
                url: item.url || '',
                allergens: Array.isArray(item.allergens) ? item.allergens.join(', ') : '',
            });
        }
    }, [item]);

    if (!item) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.name) {
            setSubmission(<span className="text-red-600">Please enter a name</span>);
            setLoading(false);
            return;
        }

        if (!formData.price) {
            setSubmission(<span className="text-red-600">Please enter a price</span>);
            setLoading(false);
            return;
        }

        if (!formData.category) {
            setSubmission(<span className="text-red-600">Please enter a category</span>);
            setLoading(false);
            return;
        }

        try {
            const selectedAllergens = formData.allergens
                ? formData.allergens.split(',').map(item => item.trim()).filter(Boolean)
                : [];

            const response = await fetch('/api/updateItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: item._id,
                    ...formData,
                    allergens: selectedAllergens,
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
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[26rem]">
                <DialogHeader>
                    <DialogTitle>Edit item</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Item Name
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
                            Price
                        </label>
                        <input
                            type="number"
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
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleInputChange}
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

                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Image URL
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
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
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
                            Allergens (comma-separated)
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
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`w-24 px-4 py-2 text-sm font-medium text-white rounded-lg shadow-lg ${loading ? 'bg-amber-200' : 'bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark'}`}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}