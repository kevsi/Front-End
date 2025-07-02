import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderDetailsModal } from "@/components/ui/order-details-modal";
import { EditOrderModal } from "@/components/ui/edit-order-modal";
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal";
import { ViewAction, ActionGroup } from "@/components/ui/action-buttons";
import { useNotifications } from "@/hooks/use-notifications";
import { useState } from "react";
import { useOrders, useOrderActions } from "@/hooks/use-laravel-api";
import {
  useOfflineOrders,
  useOfflineOrderActions,
} from "@/hooks/use-offline-api";
import { Order } from "@shared/laravel-api";

// Mapping des statuts Laravel vers l'affichage français
type DisplayStatus = "validée" | "en-attente" | "servie" | "annulée";

const statusMapping: Record<Order["status"], DisplayStatus> = {
  validated: "validée",
  pending: "en-attente",
  in_progress: "en-attente",
  served: "servie",
  cancelled: "annulée",
};

// Fonction pour formater le prix
const formatPrice = (price: number) => {
  return (price / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
};

function getStatusVariant(status: Order["status"]) {
  switch (status) {
    case "validated":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "pending":
    case "in_progress":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "served":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "cancelled":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

function getStatusText(status: Order["status"]) {
  const displayStatus = statusMapping[status];
  switch (displayStatus) {
    case "validée":
      return "Validée";
    case "en-attente":
      return "En attente";
    case "servie":
      return "Servie";
    case "annulée":
      return "Annulée";
    default:
      return status;
  }
}

export function OrderTable() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Système de notifications unifié
  const { notifications } = useNotifications();

  // Utiliser les hooks appropriés selon l'environnement
  const onlineOrdersQuery = useOrders();
  const offlineOrdersQuery = useOfflineOrders();
  const onlineActions = useOrderActions();
  const offlineActions = useOfflineOrderActions();

  // Choisir la source de données selon l'environnement
  const {
    data: ordersResponse,
    isLoading: isLoadingOrders,
    error,
  } = import.meta.env.DEV ? offlineOrdersQuery : onlineOrdersQuery;

  const { updateOrder, deleteOrder, isUpdating, isDeleting } = import.meta.env
    .DEV
    ? offlineActions
    : onlineActions;

  // Extraire les données des commandes
  const orders = ordersResponse?.data || [];

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
    // Removed unnecessary view notification
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = async (updatedOrder: Order) => {
    if (!selectedOrder) return;

    const updateData = {
      table_number: updatedOrder.table_number,
      status: updatedOrder.status,
      // Ajouter d'autres champs selon besoin
    };

    updateOrder(
      { id: selectedOrder.id, data: updateData },
      {
        onSuccess: () => {
          setShowEditModal(false);
          setSelectedOrder(null);
        },
      },
    );
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrder) return;

    deleteOrder(selectedOrder.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setSelectedOrder(null);
      },
    });
  };

  const closeModals = () => {
    setShowDetailsModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  // Composant de loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-2 p-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="p-3 bg-white rounded-lg border">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-12" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-24" />
            <div className="flex gap-1">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Afficher le loading skeleton
  if (isLoadingOrders) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <LoadingSkeleton />
      </div>
    );
  }

  // Afficher un message d'erreur
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-red-600 mb-2">
          Erreur lors du chargement des commandes
        </p>
        <p className="text-sm text-gray-500">
          Veuillez vérifier votre connexion à l'API Laravel
        </p>
      </div>
    );
  }

  // Afficher un message si aucune commande
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-600 mb-2">Aucune commande trouvée</p>
        <p className="text-sm text-gray-500">
          Les nouvelles commandes apparaîtront ici automatiquement
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Indicateur de mode développement */}
      {import.meta.env.DEV && orders.length > 0 && !error && (
        <div className="bg-blue-50 border-b border-blue-200 p-2 text-center">
          <p className="text-xs text-blue-700">
            🔧 Données de test - Configurez Laravel pour les données réelles
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        {/* Desktop Table Header */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-1 sm:gap-2 p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-yellow-500 border-b min-w-[600px]">
          <div className="font-semibold text-white text-center font-poppins text-xs">
            N° commande
          </div>
          <div className="font-semibold text-white text-center font-poppins text-xs">
            N° table
          </div>
          <div className="font-semibold text-white text-center font-poppins text-xs">
            Articles
          </div>
          <div className="font-semibold text-white text-center font-poppins text-xs">
            Prix total
          </div>
          <div className="font-semibold text-white text-center font-poppins text-xs">
            Statut
          </div>
          <div className="font-semibold text-white text-center font-poppins text-xs">
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
                      {order.order_number}
                    </span>
                  </div>
                  <Badge
                    className={`${getStatusVariant(order.status)} text-xs px-2 py-1`}
                  >
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Table:{" "}
                    <span className="font-bold">{order.table_number}</span>
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    Articles:{" "}
                    <span className="font-bold">
                      {order.items?.length || 0}
                    </span>
                  </span>
                  <span className="font-bold text-gray-800 text-sm">
                    {formatPrice(order.total_price)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <ViewAction
                    onClick={() => handleViewDetails(order)}
                    variant="button"
                    size="sm"
                    label="Voir détails"
                  />
                  <ActionGroup
                    onView={() => handleViewDetails(order)}
                    onEdit={() => handleEditOrder(order)}
                    onDelete={() => handleDeleteOrder(order)}
                    editDisabled={isUpdating}
                    deleteDisabled={isDeleting}
                    size="sm"
                  />
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
                      {order.order_number}
                    </span>
                  </div>
                </div>

                {/* Table Number */}
                <div className="text-center font-bold text-gray-800 font-poppins text-sm">
                  {order.table_number}
                </div>

                {/* Items Count */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <span className="font-bold text-gray-800 font-poppins text-sm">
                    {order.items?.length || 0} articles
                  </span>
                  <ViewAction
                    onClick={() => handleViewDetails(order)}
                    variant="compact"
                    size="sm"
                    showIcon={false}
                  />
                </div>

                {/* Total */}
                <div className="text-center font-bold text-gray-800 font-poppins text-sm">
                  {formatPrice(order.total_price)}
                </div>

                {/* Status */}
                <div className="flex justify-center">
                  <Badge
                    className={`${getStatusVariant(order.status)} text-xs px-2 py-1`}
                  >
                    {getStatusText(order.status)}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex justify-center">
                  <ActionGroup
                    onView={() => handleViewDetails(order)}
                    onEdit={() => handleEditOrder(order)}
                    onDelete={() => handleDeleteOrder(order)}
                    editDisabled={isUpdating}
                    deleteDisabled={isDeleting}
                    size="md"
                  />
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
        isLoading={isUpdating}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeModals}
        onConfirm={handleConfirmDelete}
        itemType="commande"
        itemName={selectedOrder ? `Commande ${selectedOrder.order_number}` : ""}
        isLoading={isDeleting}
      />
    </div>
  );
}
