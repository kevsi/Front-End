/**
 * Hooks React Query pour l'API Laravel
 * Gère le cache, les mutations et les refetch automatiques
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/lib/api-service";
import {
  Order,
  Product,
  Category,
  User,
  DashboardStats,
  CreateOrderRequest,
  UpdateOrderRequest,
  CreateProductRequest,
  UpdateProductRequest,
  OrderFilters,
  ProductFilters,
} from "@shared/laravel-api";
import { toast } from "sonner";

// Query keys
export const QUERY_KEYS = {
  DASHBOARD_STATS: ["dashboard", "stats"],
  ORDERS: ["orders"],
  ORDER: (id: number) => ["orders", id],
  PRODUCTS: ["products"],
  PRODUCT: (id: number) => ["products", id],
  CATEGORIES: ["categories"],
  USERS: ["users"],
  ME: ["auth", "me"],
} as const;

// Dashboard hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_STATS,
    queryFn: async () => {
      try {
        return await apiService.getDashboardStats();
      } catch (error) {
        // En mode développement, utiliser les données de fallback
        if (import.meta.env.DEV) {
          console.warn(
            "Using fallback dashboard stats - Laravel API not available",
          );
          return {
            data: {
              total_orders: 8,
              total_revenue: 19620,
              pending_orders: 1,
              served_orders: 4,
              validated_orders: 1,
              today_orders: 5,
              today_revenue: 12000,
              monthly_growth: 12.5,
              revenue_growth: 8.2,
            },
            success: true,
            message: "Fallback data - Laravel API not available",
          };
        }
        throw error;
      }
    },
    select: (data) => data.data,
    refetchInterval: import.meta.env.DEV ? false : 30000, // Pas de refetch en mode dev avec fallback
    retry: import.meta.env.DEV ? false : 3, // Pas de retry en mode dev
  });
};

// Orders hooks
export const useOrders = (filters?: OrderFilters) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ORDERS, filters],
    queryFn: () => apiService.getOrders(filters),
    select: (data) => data,
    refetchInterval: 10000, // Refetch every 10 seconds for real-time updates
  });
};

export const useOrder = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.ORDER(id),
    queryFn: () => apiService.getOrder(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: CreateOrderRequest) =>
      apiService.createOrder(orderData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_STATS });
      toast.success(`Commande ${data.data.order_number} créée avec succès!`);
    },
    onError: (error) => {
      console.error("Erreur lors de la création de la commande:", error);
      toast.error("Erreur lors de la création de la commande");
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrderRequest }) =>
      apiService.updateOrder(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORDER(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_STATS });
      toast.success(`Commande ${data.data.order_number} mise à jour!`);
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour de la commande:", error);
      toast.error("Erreur lors de la mise à jour de la commande");
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_STATS });
      toast.success("Commande supprimée avec succès!");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression de la commande:", error);
      toast.error("Erreur lors de la suppression de la commande");
    },
  });
};

// Products hooks
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, filters],
    queryFn: () => apiService.getProducts(filters),
    select: (data) => data,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT(id),
    queryFn: () => apiService.getProduct(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: CreateProductRequest) =>
      apiService.createProduct(productData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      toast.success(`Produit "${data.data.name}" créé avec succès!`);
    },
    onError: (error) => {
      console.error("Erreur lors de la création du produit:", error);
      toast.error("Erreur lors de la création du produit");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductRequest }) =>
      apiService.updateProduct(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCT(variables.id),
      });
      toast.success(`Produit "${data.data.name}" mis à jour!`);
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour du produit:", error);
      toast.error("Erreur lors de la mise à jour du produit");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      toast.success("Produit supprimé avec succès!");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression du produit:", error);
      toast.error("Erreur lors de la suppression du produit");
    },
  });
};

// Categories hooks
export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: () => apiService.getCategories(),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Users hooks
export const useUsers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: () => apiService.getUsers(),
    select: (data) => data,
  });
};

// Auth hooks
export const useMe = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ME,
    queryFn: () => apiService.getMe(),
    select: (data) => data.data,
    retry: false,
  });
};

// Utility hooks for common operations
export const useOrderActions = () => {
  const createOrder = useCreateOrder();
  const updateOrder = useUpdateOrder();
  const deleteOrder = useDeleteOrder();

  return {
    createOrder: createOrder.mutate,
    updateOrder: updateOrder.mutate,
    deleteOrder: deleteOrder.mutate,
    isCreating: createOrder.isPending,
    isUpdating: updateOrder.isPending,
    isDeleting: deleteOrder.isPending,
  };
};

export const useProductActions = () => {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  return {
    createProduct: createProduct.mutate,
    updateProduct: updateProduct.mutate,
    deleteProduct: deleteProduct.mutate,
    isCreating: createProduct.isPending,
    isUpdating: updateProduct.isPending,
    isDeleting: deleteProduct.isPending,
  };
};
