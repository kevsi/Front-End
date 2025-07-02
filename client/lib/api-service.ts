/**
 * Service centralisé pour l'API Laravel
 * Gère toutes les communications avec le backend Laravel
 */

import {
  LaravelResponse,
  LaravelPaginatedResponse,
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
  API_ENDPOINTS,
} from "@shared/laravel-api";

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    // Configuration de l'URL de base pour Laravel
    this.baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    // Récupérer le token depuis localStorage si disponible
    this.token = localStorage.getItem("auth_token");
  }

  // Configuration des headers
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Méthode générique pour les requêtes
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Vérifier si on doit utiliser les données de fallback
  private shouldUseFallback(error: any, endpoint: string): boolean {
    const isNetworkError =
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch") ||
      error.message.includes("ECONNREFUSED");

    const isDevelopment = import.meta.env.DEV;
    const hasAPIEndpoint = endpoint.startsWith("/api/");

    return isNetworkError && isDevelopment && hasAPIEndpoint;
  }

  // Données de fallback pour le développement
  private getFallbackData(endpoint: string): any {
    switch (endpoint) {
      case "/api/dashboard/stats":
        return {
          data: {
            total_orders: 8,
            total_revenue: 19620, // 196.20€ en centimes
            pending_orders: 1,
            served_orders: 4,
            validated_orders: 1,
            today_orders: 5,
            today_revenue: 12000, // 120€ en centimes
            monthly_growth: 12.5,
            revenue_growth: 8.2,
          },
          success: true,
          message: "Fallback data - Laravel API not available",
        };

      case "/api/orders":
        return {
          data: [
            {
              id: 1,
              order_number: "C001",
              table_number: "T01",
              customer_name: null,
              status: "validated",
              total_price: 3200, // 32€ en centimes
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
                  product: { id: 1, name: "Café Expresso" },
                },
              ],
              user_id: 1,
            },
            {
              id: 2,
              order_number: "C002",
              table_number: "T02",
              customer_name: null,
              status: "pending",
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
                  product: { id: 2, name: "Sandwich Club" },
                },
              ],
              user_id: 1,
            },
          ],
          current_page: 1,
          per_page: 15,
          total: 2,
          last_page: 1,
          from: 1,
          to: 2,
          links: {
            first: "/api/orders?page=1",
            last: "/api/orders?page=1",
            prev: null,
            next: null,
          },
        };

      default:
        return {
          data: null,
          success: false,
          message: "No fallback data available for this endpoint",
        };
    }
  }

  // Authentification
  setToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("auth_token");
  }

  async login(
    email: string,
    password: string,
  ): Promise<LaravelResponse<{ user: User; token: string }>> {
    return this.request(API_ENDPOINTS.LOGIN, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<LaravelResponse> {
    const response = await this.request(API_ENDPOINTS.LOGOUT, {
      method: "POST",
    });
    this.clearToken();
    return response;
  }

  async getMe(): Promise<LaravelResponse<User>> {
    return this.request(API_ENDPOINTS.ME);
  }

  // Dashboard
  async getDashboardStats(): Promise<LaravelResponse<DashboardStats>> {
    return this.request(API_ENDPOINTS.DASHBOARD_STATS);
  }

  // Orders
  async getOrders(
    filters?: OrderFilters,
  ): Promise<LaravelPaginatedResponse<Order>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }

    const endpoint = `${API_ENDPOINTS.ORDERS}${params.toString() ? `?${params.toString()}` : ""}`;
    return this.request(endpoint);
  }

  async getOrder(id: number): Promise<LaravelResponse<Order>> {
    return this.request(API_ENDPOINTS.ORDER_BY_ID(id));
  }

  async createOrder(
    orderData: CreateOrderRequest,
  ): Promise<LaravelResponse<Order>> {
    return this.request(API_ENDPOINTS.ORDERS, {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async updateOrder(
    id: number,
    orderData: UpdateOrderRequest,
  ): Promise<LaravelResponse<Order>> {
    return this.request(API_ENDPOINTS.ORDER_BY_ID(id), {
      method: "PUT",
      body: JSON.stringify(orderData),
    });
  }

  async deleteOrder(id: number): Promise<LaravelResponse> {
    return this.request(API_ENDPOINTS.ORDER_BY_ID(id), {
      method: "DELETE",
    });
  }

  // Products
  async getProducts(
    filters?: ProductFilters,
  ): Promise<LaravelPaginatedResponse<Product>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }

    const endpoint = `${API_ENDPOINTS.PRODUCTS}${params.toString() ? `?${params.toString()}` : ""}`;
    return this.request(endpoint);
  }

  async getProduct(id: number): Promise<LaravelResponse<Product>> {
    return this.request(API_ENDPOINTS.PRODUCT_BY_ID(id));
  }

  async createProduct(
    productData: CreateProductRequest,
  ): Promise<LaravelResponse<Product>> {
    return this.request(API_ENDPOINTS.PRODUCTS, {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(
    id: number,
    productData: UpdateProductRequest,
  ): Promise<LaravelResponse<Product>> {
    return this.request(API_ENDPOINTS.PRODUCT_BY_ID(id), {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: number): Promise<LaravelResponse> {
    return this.request(API_ENDPOINTS.PRODUCT_BY_ID(id), {
      method: "DELETE",
    });
  }

  // Categories
  async getCategories(): Promise<LaravelResponse<Category[]>> {
    return this.request(API_ENDPOINTS.CATEGORIES);
  }

  async getCategory(id: number): Promise<LaravelResponse<Category>> {
    return this.request(API_ENDPOINTS.CATEGORY_BY_ID(id));
  }

  // Users (pour les managers)
  async getUsers(): Promise<LaravelPaginatedResponse<User>> {
    return this.request(API_ENDPOINTS.USERS);
  }

  async getUser(id: number): Promise<LaravelResponse<User>> {
    return this.request(API_ENDPOINTS.USER_BY_ID(id));
  }
}

// Instance singleton
export const apiService = new ApiService();

// Hook React pour utiliser l'API service
export const useApiService = () => {
  return apiService;
};
