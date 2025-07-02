import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Order } from "../../pages/Orders";

interface OrdersTableProps {
  orders: Order[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "validated":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "served":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "validated":
      return "Validée";
    case "pending":
      return "En attente";
    case "served":
      return "Servie";
    case "cancelled":
      return "Annulée";
    default:
      return status;
  }
};

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        {/* Desktop Table Header */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-1 sm:gap-2 p-2 sm:p-3 bg-gray-50 border-b min-w-[600px]">
          <div className="font-semibold text-black text-center font-poppins text-xs">
            N° commande
          </div>
          <div className="font-semibold text-black text-center font-poppins text-xs">
            N° table
          </div>
          <div className="font-semibold text-black text-center font-poppins text-xs">
            Articles
          </div>
          <div className="font-semibold text-black text-center font-poppins text-xs">
            Prix total
          </div>
          <div className="font-semibold text-black text-center font-poppins text-xs">
            Statut
          </div>
          <div className="font-semibold text-black text-center font-poppins text-xs">
            Actions
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-1 sm:space-y-2 p-2 sm:p-3 bg-gray-50 min-h-[150px] sm:min-h-[200px]">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="flex flex-col lg:grid lg:grid-cols-6 gap-1 sm:gap-2 items-start lg:items-center p-2 sm:p-3 bg-white rounded-lg border border-gray-200 shadow-sm min-w-[600px] lg:min-w-0"
            >
              {/* Mobile Layout */}
              <div className="lg:hidden w-full space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Badge
                      variant="outline"
                      className="bg-white border-gray-200 text-gray-800 font-bold text-xs"
                    >
                      N°{index + 1}
                    </Badge>
                    <span className="font-bold text-gray-800 font-poppins text-sm">
                      {order.orderNumber}
                    </span>
                  </div>
                  <Badge
                    className={`${getStatusColor(order.status)} text-xs px-2 py-1`}
                  >
                    {getStatusText(order.status)}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Table:{" "}
                    <span className="font-bold">{order.tableNumber}</span>
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    Articles:{" "}
                    <span className="font-bold">{order.articleCount}</span>
                  </span>
                  <span className="font-bold text-gray-800 text-sm">
                    {order.totalPrice}F
                  </span>
                </div>

                {/* Price and Actions Row */}
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-700">
                    {order.totalPrice}F
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="bg-yellow-100 text-yellow-600 p-2 rounded-lg hover:bg-yellow-200 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* View Details Button */}
                <button className="w-full bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-poppins font-bold hover:bg-blue-200 transition-colors">
                  Voir détails
                </button>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-6 gap-4 items-center">
                {/* Order Number */}
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                    <span className="text-gray-700 font-poppins font-bold text-sm">
                      N°{index + 1}
                    </span>
                  </div>
                  <span className="text-gray-700 font-poppins font-bold">
                    {order.orderNumber}
                  </span>
                </div>

                {/* Table Number */}
                <div className="text-center">
                  <span className="text-gray-700 font-poppins font-bold">
                    {order.tableNumber}
                  </span>
                </div>

                {/* Article Count */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-gray-700 font-poppins font-bold">
                    {order.articleCount} articles
                  </span>
                  <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-poppins font-bold hover:bg-blue-200 transition-colors">
                    Voir
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-center">
                  <span className="text-gray-700 font-poppins font-bold">
                    {order.totalPrice}F
                  </span>
                </div>

                {/* Status */}
                <div className="text-center">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-poppins font-bold ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 justify-center">
                  <button className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors">
                    <Eye size={20} />
                  </button>
                  <button className="bg-yellow-100 text-yellow-600 p-2 rounded-lg hover:bg-yellow-200 transition-colors">
                    <Edit size={20} />
                  </button>
                  <button className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
