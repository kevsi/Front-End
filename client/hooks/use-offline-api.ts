/**
 * Hooks pour le mode développement offline
 * Évite complètement les appels réseau
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  OFFLINE_DASHBOARD_STATS,
  OFFLINE_ORDERS_RESPONSE,
} from "@/lib/offline-data";
import {
  Order,
  OrderFilters,
  CreateOrderRequest,
  UpdateOrderRequest,
} from "@shared/laravel-api";
import { toast } from "sonner";

// Query keys
export const OFFLINE_QUERY_KEYS = {
  DASHBOARD_STATS: ["offline", "dashboard", "stats"],
  ORDERS: ["offline", "orders"],
} as const;

// Dashboard hooks
export const useOfflineDashboardStats = () => {
  return useQuery({
    queryKey: OFFLINE_QUERY_KEYS.DASHBOARD_STATS,
    queryFn: async () => {
      console.log("Using offline dashboard stats - Development mode");
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 100));
      return {
        data: OFFLINE_DASHBOARD_STATS,
        success: true,
        message: "Offline data - Development mode",
      };
    },
    select: (data) => data.data,
    staleTime: Infinity, // Cache infini
    refetchInterval: false,
    retry: false,
  });
};

// Orders hooks
export const useOfflineOrders = (filters?: OrderFilters) => {
  return useQuery({
    queryKey: [...OFFLINE_QUERY_KEYS.ORDERS, filters],
    queryFn: async () => {
      console.log("Using offline orders data - Development mode");
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Appliquer les filtres localement si nécessaire
      let filteredOrders = OFFLINE_ORDERS_RESPONSE.data;

      if (filters) {
        filteredOrders = filteredOrders.filter((order) => {
          if (filters.status && order.status !== filters.status) return false;
          if (
            filters.table_number &&
            !order.table_number.includes(filters.table_number)
          )
            return false;
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            return (
              order.order_number.toLowerCase().includes(searchLower) ||
              order.table_number.toLowerCase().includes(searchLower) ||
              (order.customer_name &&
                order.customer_name.toLowerCase().includes(searchLower))
            );
          }
          return true;
        });
      }

      return {
        ...OFFLINE_ORDERS_RESPONSE,
        data: filteredOrders,
        total: filteredOrders.length,
      };
    },
    select: (data) => data,
    staleTime: Infinity,
    refetchInterval: false,
    retry: false,
  });
};

// Mutations simulées
export const useOfflineCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: CreateOrderRequest) => {
      console.log("Simulating order creation - Development mode");
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newOrder: Order = {
        id: Math.floor(Math.random() * 1000) + 100,
        order_number: `C${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
        table_number: orderData.table_number,
        customer_name: orderData.customer_name || null,
        status: "pending",
        total_price: orderData.items.reduce(
          (sum, item) => sum + item.quantity * 1500,
          0,
        ),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        items: [],
        user_id: 1,
      };

      return {
        data: newOrder,
        success: true,
        message: "Order created (simulation)",
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: OFFLINE_QUERY_KEYS.ORDERS });
      queryClient.invalidateQueries({
        queryKey: OFFLINE_QUERY_KEYS.DASHBOARD_STATS,
      });
      toast.success(`Commande ${data.data.order_number} simulée créée!`);
    },
    onError: () => {
      toast.error("Erreur de simulation - Mode développement");
    },
  });
};

export const useOfflineUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateOrderRequest;
    }) => {
      console.log("Simulating order update - Development mode");
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedOrder: Order = {
        id,
        order_number: `C${String(id).padStart(3, "0")}`,
        table_number: data.table_number || `T${String(id).padStart(2, "0")}`,
        customer_name: data.customer_name || null,
        status: data.status || "pending",
        total_price: 1500,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        items: [],
        user_id: 1,
      };

      return {
        data: updatedOrder,
        success: true,
        message: "Order updated (simulation)",
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: OFFLINE_QUERY_KEYS.ORDERS });
      toast.success(`Commande ${data.data.order_number} simulée mise à jour!`);
    },
    onError: () => {
      toast.error("Erreur de simulation - Mode développement");
    },
  });
};

export const useOfflineDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      console.log("Simulating order deletion - Development mode");
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        message: "Order deleted (simulation)",
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: OFFLINE_QUERY_KEYS.ORDERS });
      toast.success("Commande supprimée (simulation)!");
    },
    onError: () => {
      toast.error("Erreur de simulation - Mode développement");
    },
  });
};

// Utility hooks
export const useOfflineOrderActions = () => {
  const createOrder = useOfflineCreateOrder();
  const updateOrder = useOfflineUpdateOrder();
  const deleteOrder = useOfflineDeleteOrder();

  return {
    createOrder: createOrder.mutate,
    updateOrder: updateOrder.mutate,
    deleteOrder: deleteOrder.mutate,
    isCreating: createOrder.isPending,
    isUpdating: updateOrder.isPending,
    isDeleting: deleteOrder.isPending,
  };
};
