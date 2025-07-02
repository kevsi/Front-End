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
      } catch (error: any) {
        // En mode développement, toujours utiliser les données de fallback
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
        // En production, on peut lancer l'erreur
        throw error;
      }
    },
    select: (data) => data.data,
    refetchInterval: import.meta.env.DEV ? false : 30000,
    retry: import.meta.env.DEV ? false : 3,
    staleTime: import.meta.env.DEV ? Infinity : 30000, // Cache infini en dev
  });
};

// Orders hooks
export const useOrders = (filters?: OrderFilters) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ORDERS, filters],
    queryFn: async () => {
      try {
        return await apiService.getOrders(filters);
      } catch (error) {
        // En mode développement, utiliser les données de fallback
        if (import.meta.env.DEV) {
          console.warn(
            "Using fallback orders data - Laravel API not available",
          );
          return {
            data: [
              {
                id: 1,
                order_number: "C001",
                table_number: "T01",
                customer_name: null,
                status: "validated" as const,
                total_price: 3200,
                created_at: "2024-05-14T08:20:00Z",
                updated_at: "2024-05-14T08:20:00Z",
                items: [
                  {
                    id: 1,
                    order_id: 1,
                    product_id: 1,
                    quantity: 2,
                    unit_price: 1500,
                    total_price: 3000,
                    notes: null,
                    created_at: "2024-05-14T08:20:00Z",
                    updated_at: "2024-05-14T08:20:00Z",
                    product: {
                      id: 1,
                      name: "Café Expresso",
                      price: 1500,
                      description: "",
                      category_id: 1,
                      image_url: "",
                      is_available: true,
                      created_at: "",
                      updated_at: "",
                    },
                  },
                ],
                user_id: 1,
              },
              {
                id: 2,
                order_number: "C002",
                table_number: "T02",
                customer_name: null,
                status: "pending" as const,
                total_price: 1800,
                created_at: "2024-05-14T08:15:00Z",
                updated_at: "2024-05-14T08:15:00Z",
                items: [
                  {
                    id: 2,
                    order_id: 2,
                    product_id: 2,
                    quantity: 1,
                    unit_price: 1800,
                    total_price: 1800,
                    notes: null,
                    created_at: "2024-05-14T08:15:00Z",
                    updated_at: "2024-05-14T08:15:00Z",
                    product: {
                      id: 2,
                      name: "Sandwich Club",
                      price: 1800,
                      description: "",
                      category_id: 2,
                      image_url: "",
                      is_available: true,
                      created_at: "",
                      updated_at: "",
                    },
                  },
                ],
                user_id: 1,
              },
              {
                id: 3,
                order_number: "C003",
                table_number: "T03",
                customer_name: null,
                status: "served" as const,
                total_price: 4500,
                created_at: "2024-05-14T08:10:00Z",
                updated_at: "2024-05-14T08:10:00Z",
                items: [
                  {
                    id: 3,
                    order_id: 3,
                    product_id: 3,
                    quantity: 3,
                    unit_price: 1500,
                    total_price: 4500,
                    notes: null,
                    created_at: "2024-05-14T08:10:00Z",
                    updated_at: "2024-05-14T08:10:00Z",
                    product: {
                      id: 3,
                      name: "Thé Vert",
                      price: 1500,
                      description: "",
                      category_id: 1,
                      image_url: "",
                      is_available: true,
                      created_at: "",
                      updated_at: "",
                    },
                  },
                ],
                user_id: 1,
              },
            ],
            current_page: 1,
            per_page: 15,
            total: 3,
            last_page: 1,
            from: 1,
            to: 3,
            links: {
              first: "/api/orders?page=1",
              last: "/api/orders?page=1",
              prev: null,
              next: null,
            },
          };
        }
        throw error;
      }
    },
    select: (data) => data,
    refetchInterval: import.meta.env.DEV ? false : 10000,
    retry: import.meta.env.DEV ? false : 3,
    staleTime: import.meta.env.DEV ? Infinity : 10000, // Cache infini en dev
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
    mutationFn: async (orderData: CreateOrderRequest) => {
      if (import.meta.env.DEV) {
        // Simuler la création en mode développement
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          data: {
            id: Math.random(),
            order_number: `C${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
            table_number: orderData.table_number,
            customer_name: orderData.customer_name || null,
            status: "pending" as const,
            total_price: orderData.items.reduce(
              (sum, item) => sum + item.quantity * 1500,
              0,
            ),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            items: [],
            user_id: 1,
          },
        };
      }
      return apiService.createOrder(orderData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_STATS });
      if (import.meta.env.DEV) {
        toast.success(`Commande ${data.data.order_number} simulée créée!`);
      } else {
        toast.success(`Commande ${data.data.order_number} créée avec succès!`);
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la création de la commande:", error);
      if (import.meta.env.DEV) {
        toast.error(
          "Mode développement - Configurez Laravel pour les vraies mutations",
        );
      } else {
        toast.error("Erreur lors de la création de la commande");
      }
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateOrderRequest;
    }) => {
      if (import.meta.env.DEV) {
        // Simuler la mise à jour en mode développement
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          data: {
            id,
            order_number: `C${String(id).padStart(3, "0")}`,
            table_number:
              data.table_number || `T${String(id).padStart(2, "0")}`,
            customer_name: data.customer_name || null,
            status: data.status || ("pending" as const),
            total_price: 1500,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            items: [],
            user_id: 1,
          },
        };
      }
      return apiService.updateOrder(id, data);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORDER(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_STATS });
      if (import.meta.env.DEV) {
        toast.success(
          `Commande ${data.data.order_number} simulée mise à jour!`,
        );
      } else {
        toast.success(`Commande ${data.data.order_number} mise à jour!`);
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour de la commande:", error);
      if (import.meta.env.DEV) {
        toast.error(
          "Mode développement - Configurez Laravel pour les vraies mutations",
        );
      } else {
        toast.error("Erreur lors de la mise à jour de la commande");
      }
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      if (import.meta.env.DEV) {
        // Simuler la suppression en mode développement
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { success: true, message: "Commande supprimée (simulation)" };
      }
      return apiService.deleteOrder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_STATS });
      if (import.meta.env.DEV) {
        toast.success("Commande supprimée (simulation)!");
      } else {
        toast.success("Commande supprimée avec succès!");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression de la commande:", error);
      if (import.meta.env.DEV) {
        toast.error(
          "Mode développement - Configurez Laravel pour les vraies mutations",
        );
      } else {
        toast.error("Erreur lors de la suppression de la commande");
      }
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
