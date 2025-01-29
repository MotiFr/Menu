import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";


export default function DeleteCatDialog({ setRefresh, category, isOpen, onClose }) {
    
    const [ failed, setFailed ] = useState(false);
    const [loading, setLoading] = useState(false);

    async function DeleteItem(category) {
        setLoading(true);
        try {
              const response = await fetch('/api/deleteCategory', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  category: category,
                }),
              });
        
              await response.json();
        
              if (response.ok) {
                onClose();
              }
            } catch {
                setFailed(true);
            } finally {
                setLoading(false);
                setRefresh(prev => !prev);
            }   

    }

    if (!category) return null;

    return <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-[26rem]">
            <DialogHeader>
                <DialogTitle>Delete Category</DialogTitle>
            </DialogHeader>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Are you sure you want to delete 
                <span className="font-extrabold"> {category.name} </span> ?</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    when you delete a category, all items in that category will be deleted.
                </p>
            <div className="mt-4 flex justify-end space-x-4">
                {failed ? <div className="text-red-500">failed to delete category</div> : null }
                <button
                    onClick={() => DeleteItem(category)}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${loading ? 'bg-red-300' : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'}`}
                >
                    Yes
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    No
                </button>
            </div>
        </DialogContent>
    </Dialog>
}