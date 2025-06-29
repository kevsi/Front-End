import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { ManagerOrder } from "../../pages/ManagerDashboard";

interface ManagerOrdersTableProps {
  orders: ManagerOrder[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "nouvelle":
      return "bg-green-100 text-green-800";
    case "validee":
      return "bg-blue-100 text-blue-800";
    case "servie":
      return "bg-gray-100 text-gray-800";
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
      {/* Table Header */}
      <div className="bg-gradient-to-r from-dashboard-yellow/0 to-dashboard-yellow/0 p-6">
        <div className="grid grid-cols-7 gap-4">
          <div className="bg-transparent text-black rounded-lg p-4 text-center font-poppins font-bold">
            N° de commande
          </div>
          <div className="bg-transparent text-black rounded-lg p-4 text-center font-poppins font-bold">
            N° de table
          </div>
          <div className="bg-transparent text-black rounded-lg p-4 text-center font-poppins font-bold">
            Nombres d'articles
          </div>
          <div className="bg-transparent text-black rounded-lg p-4 text-center font-poppins font-bold">
            Prix total
          </div>
          <div className="bg-transparent text-black rounded-lg p-4 text-center font-poppins font-bold">
            Statut
          </div>
          <div className="bg-transparent text-black rounded-lg p-4 text-center font-poppins font-bold">
            Serveur
          </div>
          <div className="bg-transparent text-black rounded-lg p-4 text-center font-poppins font-bold">
            Actions
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="bg-gray-50 p-4 space-y-3">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-7 gap-4 items-center">
              {/* Order Number */}
              <div className="flex items-center gap-3">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
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
              <div className="flex items-center gap-2 justify-center">
                <img
                  src={order.serverAvatar}
                  alt={order.serverName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-black font-poppins font-bold text-sm">
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
