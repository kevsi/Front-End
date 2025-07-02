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
    // En mode développement, ne pas faire d'appels réseau
    if (import.meta.env.DEV) {
      throw new Error(`API calls disabled in development mode for ${endpoint}`);
    }

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
    } catch (error: any) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
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
