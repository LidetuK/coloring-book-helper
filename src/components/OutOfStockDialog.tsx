
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface OutOfStockDialogProps {
  open: boolean;
  onClose: () => void;
}

const OutOfStockDialog = ({ open, onClose }: OutOfStockDialogProps) => {
  const { toast } = useToast();

  const handleSwitchToSoftcover = () => {
    toast({
      title: "Switched to Softcover",
      description: "We've updated your selection to softcover.",
      duration: 3000,
    });
    onClose();
  };

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
        <DialogFooter className="mt-4 sm:justify-end">
          <Button 
            onClick={handleSwitchToSoftcover}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium"
          >
            Switch to Softcover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OutOfStockDialog;
