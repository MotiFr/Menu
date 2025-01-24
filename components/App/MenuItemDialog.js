import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function MenuItemDialog({ item, isOpen, onClose }) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[26rem]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>

        {item.url && (
          <div className="mt-4 relative h-48 w-full">
            <Image
              src={item.url}
              alt={item.name}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        )}

        <div className="mt-4 max-h-48 overflow-y-auto">
          <p className="text-sm text-muted-foreground">
            {item.description} 
          </p>
        </div>


        {item.allergens?.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Allergens:</h4>
            <div className="flex flex-wrap gap-2">
              {item.allergens.map((allergen) => (
                <Badge
                  key={allergen}
                  variant="destructive"
                  className="text-xs"
                >
                  {allergen}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-right">
          <p className="text-xl font-bold text-primary">
            ${item.price}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}