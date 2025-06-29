import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/pages/NewOrder";

interface OrderCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  tip: number;
  total: number;
  onSaveOrder: () => void;
}

export function OrderCart({
  items,
  onUpdateQuantity,
  subtotal,
  tip,
  total,
  onSaveOrder,
}: OrderCartProps) {
  return (
    <div className="bg-white rounded-lg p-6 h-fit">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dashboard-dark font-poppins mb-4">
          Commande
        </h2>
        <p className="text-dashboard-dark font-roboto text-xl">
          Numéro de table :
        </p>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-dashboard-muted text-center py-8">
            Aucun article dans la commande
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              {/* Product Image */}
              <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h4 className="font-bold text-dashboard-dark font-poppins">
                  {item.name}
                </h4>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-6 h-5 p-0 bg-gray-300 border-0 rounded"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm font-sf-pro min-w-[1rem] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-6 h-5 p-0 bg-gray-300 border-0 rounded"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="text-dashboard-dark font-bold font-poppins">
                {item.price * item.quantity}F
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        {/* Tip */}
        <div className="flex justify-between items-center">
          <span className="text-dashboard-muted font-poppins">Pourboire</span>
          <span className="text-dashboard-dark font-poppins">{tip}F</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-dashboard-dark font-poppins">Total</span>
          <span className="text-dashboard-dark font-bold text-xl font-poppins">
            {total}.00F
          </span>
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={onSaveOrder}
        className="w-full mt-6 bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-white font-poppins text-lg py-4 rounded-2xl"
        disabled={items.length === 0}
      >
        Enregistrer
      </Button>
    </div>
  );
}
