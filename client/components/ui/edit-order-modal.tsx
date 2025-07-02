import React, { useState } from "react";
import { X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@shared/laravel-api";

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
  orderDetails: Order | null;
  isLoading?: boolean;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "validated":
      return { label: "Validée", color: "bg-green-100 text-green-800" };
    case "pending":
      return { label: "En attente", color: "bg-amber-100 text-amber-800" };
    case "served":
      return { label: "Servie", color: "bg-blue-100 text-blue-800" };
    case "cancelled":
      return { label: "Annulée", color: "bg-red-100 text-red-800" };
    default:
      return { label: "Inconnue", color: "bg-gray-100 text-gray-800" };
  }
};

export function EditOrderModal({
  isOpen,
  onClose,
  onSave,
  orderDetails,
  isLoading = false,
}: EditOrderModalProps) {
  const [editedStatus, setEditedStatus] = useState<Order["status"]>("pending");
  const [editedTableNumber, setEditedTableNumber] = useState("");

  React.useEffect(() => {
    if (orderDetails) {
      setEditedStatus(orderDetails.status);
      setEditedTableNumber(orderDetails.table_number);
    }
  }, [orderDetails]);

  if (!isOpen || !orderDetails) return null;

  const handleSave = () => {
    const updatedOrder: Order = {
      ...orderDetails,
      status: editedStatus,
      table_number: editedTableNumber,
    };
    onSave(updatedOrder);
  };

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  };

  const statusOptions: { value: Order["status"]; label: string }[] = [
    { value: "pending", label: "En attente" },
    { value: "validated", label: "Validée" },
    { value: "in_progress", label: "En cours" },
    { value: "served", label: "Servie" },
    { value: "cancelled", label: "Annulée" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
            disabled={isLoading}
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Modifier Commande {orderDetails.order_number}
          </h2>
          <p className="text-sm text-gray-600">
            Table {orderDetails.table_number} •{" "}
            {formatPrice(orderDetails.total_price)}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Table Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de table
              </label>
              <input
                type="text"
                value={editedTableNumber}
                onChange={(e) => setEditedTableNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut de la commande
              </label>
              <select
                value={editedStatus}
                onChange={(e) =>
                  setEditedStatus(e.target.value as Order["status"])
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="mt-2">
                <Badge className={getStatusConfig(editedStatus).color}>
                  {getStatusConfig(editedStatus).label}
                </Badge>
              </div>
            </div>

            {/* Articles Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Articles ({orderDetails.items?.length || 0})
              </h3>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                Pour modifier les articles, créez une nouvelle commande. Cette
                interface permet seulement de changer le statut et la table.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
