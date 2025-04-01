
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface OutOfStockDialogProps {
  open: boolean;
  onClose: () => void;
}

const OutOfStockDialog = ({ open, onClose }: OutOfStockDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-in animate-out zoom-in-95 slide-in-from-left-1/2">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-600 flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-2">
              <X className="h-5 w-5 text-red-600" />
            </div>
            Out of Stock
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            We're sorry, but hardcover copies are currently out of stock. Please select the softcover option instead.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Switch to Softcover
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutOfStockDialog;
