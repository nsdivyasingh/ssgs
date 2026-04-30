import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const QuantityStepper = ({ value = 1, onChange, onRemove }) => {
  const [quantity, setQuantity] = useState(value);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const increase = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onChange?.(newQty);
  };

  const decrease = () => {
    if (quantity === 1) {
      setConfirmOpen(true);
      return;
    }

    const newQty = quantity - 1;
    setQuantity(newQty);
    onChange?.(newQty);
  };

  return (
    <div className="flex items-center border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={decrease}
        className="px-3 py-1 text-lg hover:bg-soft transition-all duration-150 active:scale-95"
      >
        −
      </button>

      <span className="px-4 text-sm font-medium min-w-10 text-center">{quantity}</span>

      <button
        type="button"
        onClick={increase}
        className="px-3 py-1 text-lg hover:bg-soft transition-all duration-150 active:scale-95"
      >
        +
      </button>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this product?</AlertDialogTitle>
            <AlertDialogDescription>
              Quantity is already 1. Do you want to remove this item from your cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmOpen(false);
                onRemove?.();
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuantityStepper;
