import React, { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OrderDetailsModal } from "@/components/ui/order-details-modal";
import { EditOrderModal } from "@/components/ui/edit-order-modal";
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal";
import { Order } from "../../pages/Orders";
import { Order as LaravelOrder } from "@shared/laravel-api";

interface OrdersTableProps {
  orders: Order[];
}

// Function to convert local Order type to Laravel Order type for modals
const mapToLaravelOrder = (order: Order): LaravelOrder => {
  return {
    id: parseInt(order.id),
    order_number: order.orderNumber,
    table_number: order.tableNumber,
    status: order.status as LaravelOrder["status"],
    total_price: order.totalPrice, // Local format is already in centimes
    created_at: order.createdAt,
    updated_at: order.createdAt,
    items: [], // No items data in local format
    user_id: 1, // Default user
  };
};

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
  const [selectedOrder, setSelectedOrder] = useState<LaravelOrder | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleViewDetails = (order: Order) => {
    const laravelOrder = mapToLaravelOrder(order);
    setSelectedOrder(laravelOrder);
    setShowDetailsModal(true);
  };

  const handleEditOrder = (order: Order) => {
    const laravelOrder = mapToLaravelOrder(order);
    setSelectedOrder(laravelOrder);
    setShowEditModal(true);
  };

  const handleDeleteOrder = (order: Order) => {
    const laravelOrder = mapToLaravelOrder(order);
    setSelectedOrder(laravelOrder);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = async (updatedOrder: LaravelOrder) => {
    if (!selectedOrder) return;
    // TODO: Implement update logic - convert back to local format and update
    console.log("Updating order:", updatedOrder);
    setShowEditModal(false);
    setSelectedOrder(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrder) return;
    // TODO: Implement delete logic - use selectedOrder.order_number to find and remove from local data
    console.log("Deleting order:", selectedOrder);
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  const closeModals = () => {
    setShowDetailsModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

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

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200 text-xs px-2 py-1 rounded-lg font-poppins font-bold transition-colors"
                  >
                    Voir détails
                  </button>
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 w-6 h-6 sm:w-8 sm:h-8 p-1 rounded-lg transition-colors"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleEditOrder(order)}
                      className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100 w-6 h-6 sm:w-8 sm:h-8 p-1 rounded-lg transition-colors"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order)}
                      className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 w-6 h-6 sm:w-8 sm:h-8 p-1 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:contents">
                {/* Order Number Badge */}
                <div className="flex justify-center">
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
                </div>

                {/* Table Number */}
                <div className="text-center font-bold text-gray-800 font-poppins text-sm">
                  {order.tableNumber}
                </div>

                {/* Items Count */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <span className="font-bold text-gray-800 font-poppins text-sm">
                    {order.articleCount} articles
                  </span>
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200 font-poppins text-xs px-2 py-1 rounded-lg transition-colors"
                  >
                    Voir
                  </button>
                </div>

                {/* Total */}
                <div className="text-center font-bold text-gray-800 font-poppins text-sm">
                  {order.totalPrice}F
                </div>

                {/* Status */}
                <div className="flex justify-center">
                  <Badge
                    className={`${getStatusColor(order.status)} text-xs px-2 py-1`}
                  >
                    {getStatusText(order.status)}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-1 sm:gap-2 lg:gap-3">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 p-1 rounded-lg transition-colors"
                  >
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </button>
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 p-1 rounded-lg transition-colors"
                  >
                    <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order)}
                    className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 p-1 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modales */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={closeModals}
        orderDetails={selectedOrder}
      />

      <EditOrderModal
        isOpen={showEditModal}
        onClose={closeModals}
        onSave={handleSaveEdit}
        orderDetails={selectedOrder}
        isLoading={false}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeModals}
        onConfirm={handleConfirmDelete}
        itemType="commande"
        itemName={selectedOrder ? `Commande ${selectedOrder.order_number}` : ""}
        isLoading={false}
      />
    </div>
  );
};
