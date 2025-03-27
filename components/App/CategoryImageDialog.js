import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";

export default function CategoryImageDialog({ setRefresh, category, isOpen, onClose, getLocalizedValue, isRTL }) {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (category?.url) {
      setImageUrl(category.url);
    }
  }, [category]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setError(getLocalizedValue("Please upload a JPEG or PNG file", "אנא העלה קובץ JPEG או PNG"));
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setImageUrl(data.url);
      setUploadedFile(null);
    } catch (error) {
      setError(getLocalizedValue("Failed to upload image", "העלאת התמונה נכשלה"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/updateCategoryImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: category._id,
          name: category.name,
          url: imageUrl,
        }),
      });

      if (response.ok) {
        setRefresh(prev => !prev);
        onClose();
      } else {
        setError(getLocalizedValue("Failed to save image", "שמירת התמונה נכשלה"));
      }
    } catch (error) {
      setError(getLocalizedValue("Failed to save image", "שמירת התמונה נכשלה"));
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {getLocalizedValue("Category Image", "תמונת קטגוריה")}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">
              {getLocalizedValue("Image URL", "קישור לתמונה")}
            </Label>
            <Input
              id="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder={getLocalizedValue("Enter image URL", "הכנס קישור לתמונה")}
            />
          </div>
          <div className="grid gap-2">
            <Label>
              {getLocalizedValue("Or upload an image", "או העלה תמונה")}
            </Label>
            <div className="flex gap-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  getLocalizedValue("Uploading...", "מעלה...")
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    {getLocalizedValue("Choose Image", "בחר תמונה")}
                  </>
                )}
              </Button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          {imageUrl && (
            <div className="relative h-32 w-full rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between gap-2">
          {imageUrl && (
            <Button
              variant="destructive"
              onClick={() => setImageUrl('')}
              className="flex-1"
            >
              {getLocalizedValue("Remove Image", "הסר תמונה")}
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={onClose}>
              {getLocalizedValue("Cancel", "ביטול")}
            </Button>
            <Button onClick={handleSave}>
              {getLocalizedValue("Save", "שמור")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 