import React from "react";
import { X, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Order } from "@shared/laravel-api";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: Order | null;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "validated":
      return {
        icon: <CheckCircle2 className="w-4 h-4" />,
        color: "bg-emerald-500",
        textColor: "text-emerald-700",
        bgColor: "bg-emerald-50",
        label: "Validée",
      };
    case "pending":
      return {
        icon: <Clock className="w-4 h-4" />,
        color: "bg-amber-500",
        textColor: "text-amber-700",
        bgColor: "bg-amber-50",
        label: "En attente",
      };
    case "served":
      return {
        icon: <CheckCircle2 className="w-4 h-4" />,
        color: "bg-blue-500",
        textColor: "text-blue-700",
        bgColor: "bg-blue-50",
        label: "Servie",
      };
    case "cancelled":
      return {
        icon: <XCircle className="w-4 h-4" />,
        color: "bg-red-500",
        textColor: "text-red-700",
        bgColor: "bg-red-50",
        label: "Annulée",
      };
    default:
      return {
        icon: <Clock className="w-4 h-4" />,
        color: "bg-gray-500",
        textColor: "text-gray-700",
        bgColor: "bg-gray-50",
        label: "Inconnue",
      };
  }
};

export function OrderDetailsModal({
  isOpen,
  onClose,
  orderDetails,
}: OrderDetailsModalProps) {
  if (!isOpen || !orderDetails) return null;

  const statusConfig = getStatusConfig(orderDetails.status);
  const formattedDate = new Date(orderDetails.created_at).toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  // Fonction pour formater le prix Laravel (centimes vers euros)
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex items-start gap-4">
            <div className={`p-3 ${statusConfig.color} rounded-xl`}>
              {statusConfig.icon}
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Commande {orderDetails.order_number}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  📍 Table {orderDetails.table_number}
                </span>
                <span>•</span>
                <span>{formattedDate}</span>
                <span>•</span>
                <Badge
                  className={`${statusConfig.bgColor} ${statusConfig.textColor} border-0`}
                >
                  {statusConfig.label}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Articles commandés ({orderDetails.items?.length || 0})
            </h3>

            <div className="space-y-3">
              {orderDetails.items?.length > 0 ? (
                orderDetails.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product?.image_url || "/placeholder.svg"}
                        alt={item.product?.name || "Article"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {item.product?.name || "Article inconnu"}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {item.product?.category?.name || "Non catégorisé"}
                      </p>
                      {item.notes && (
                        <p className="text-xs text-gray-500 italic mt-1">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-600">Qté:</span>
                        <span className="bg-white px-2 py-1 rounded-md text-sm font-semibold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="font-bold text-gray-900">
                        {formatPrice(item.total_price)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucun article dans cette commande</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">Total de la commande</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(orderDetails.total_price)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
