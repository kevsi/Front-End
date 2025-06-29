import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { ManagerOrder } from "../../pages/ManagerOrders";

interface ManagerOrdersTableProps {
  orders: ManagerOrder[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "nouvelle":
      return "bg-green-100 text-green-800";
    case "validee":
      return "bg-green-100 text-green-800";
    case "servie":
      return "bg-blue-100 text-blue-800";
    case "annulee":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "nouvelle":
      return "Nouvelle";
    case "validee":
      return "Validée";
    case "servie":
      return "Servie";
    case "annulee":
      return "Annulée";
    default:
      return status;
  }
};

export const ManagerOrdersTable: React.FC<ManagerOrdersTableProps> = ({
  orders,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Desktop Table Header - Hidden on mobile */}
      <div className="hidden lg:block p-4 lg:p-6">
        <div className="grid grid-cols-7 gap-4">
          <div className="text-center font-poppins font-bold text-sm lg:text-base text-black">
            N° de commande
          </div>
          <div className="text-center font-poppins font-bold text-sm lg:text-base text-black">
            N° de table
          </div>
          <div className="text-center font-poppins font-bold text-sm lg:text-base text-black">
            Nombres d'articles
          </div>
          <div className="text-center font-poppins font-bold text-sm lg:text-base text-black">
            Prix total
          </div>
          <div className="text-center font-poppins font-bold text-sm lg:text-base text-black">
            Statut
          </div>
          <div className="text-center font-poppins font-bold text-sm lg:text-base text-black">
            Serveur
          </div>
          <div className="text-center font-poppins font-bold text-sm lg:text-base text-black">
            Actions
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="bg-gray-50 p-3 lg:p-4 space-y-3">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              {/* Header Row */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-1">
                    <span className="text-gray-700 font-poppins font-bold text-xs">
                      N°{index + 1}
                    </span>
                  </div>
                  <span className="text-gray-700 font-poppins font-bold text-sm">
                    {order.orderNumber}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-poppins font-bold ${getStatusColor(order.status)}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>

              {/* Info Row */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Table:</span>
                  <span className="ml-2 font-bold text-gray-700">
                    {order.tableNumber}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Articles:</span>
                  <span className="ml-2 font-bold text-gray-700">
                    {order.articleCount}
                  </span>
                </div>
              </div>

              {/* Server and Price Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={order.serverAvatar}
                    alt={order.serverName}
                    className="w-8 h-8 rounded-2xl"
                  />
                  <span className="text-sm font-bold text-gray-700">
                    {order.serverName}
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-700">
                  {order.totalPrice}F
                </div>
              </div>

              {/* Actions Row */}
              <div className="flex justify-between items-center">
                <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-poppins font-bold hover:bg-blue-200 transition-colors">
                  Voir
                </button>
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
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-7 gap-4 items-center">
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

              {/* Server */}
              <div className="flex items-center justify-center gap-2">
                <img
                  src={order.serverAvatar}
                  alt={order.serverName}
                  className="w-12 h-12 rounded-2xl"
                />
                <span className="text-sm font-bold text-gray-700">
                  {order.serverName}
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
  );
};
