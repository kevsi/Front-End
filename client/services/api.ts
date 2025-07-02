import {
  ApiResponse,
  PaginatedResponse,
  Order,
  OrderDetails,
  CreateOrderRequest,
  UpdateOrderRequest,
  Article,
  CreateArticleRequest,
  UpdateArticleRequest,
  User,
  CreateUserRequest,
  UpdateUserRequest,
  OrderFilters,
  ArticleFilters,
  UserFilters,
  DashboardStats,
} from "@/types/api";
import {
  fallbackOrders,
  fallbackArticles,
  fallbackUsers,
  fallbackStats,
  fallbackOrderItems,
  filterOrdersLocally,
  filterArticlesLocally,
} from "./fallback-data";

// Configuration de l'API
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
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
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Orders API
  async getOrders(
    filters?: OrderFilters,
  ): Promise<ApiResponse<PaginatedResponse<Order>>> {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.dateFrom) params.append("date_from", filters.dateFrom);
    if (filters?.dateTo) params.append("date_to", filters.dateTo);
    if (filters?.tableNumber)
      params.append("table_number", filters.tableNumber);
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString() ? `?${params.toString()}` : "";
    return this.request<ApiResponse<PaginatedResponse<Order>>>(
      `/orders${query}`,
    );
  }

  async getOrder(id: string): Promise<ApiResponse<OrderDetails>> {
    return this.request<ApiResponse<OrderDetails>>(`/orders/${id}`);
  }

  async createOrder(data: CreateOrderRequest): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateOrder(
    id: string,
    data: UpdateOrderRequest,
  ): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteOrder(id: string): Promise<ApiResponse<null>> {
    return this.request<ApiResponse<null>>(`/orders/${id}`, {
      method: "DELETE",
    });
  }

  // Articles API
  async getArticles(
    filters?: ArticleFilters,
  ): Promise<ApiResponse<PaginatedResponse<Article>>> {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.priceMin)
      params.append("price_min", filters.priceMin.toString());
    if (filters?.priceMax)
      params.append("price_max", filters.priceMax.toString());
    if (filters?.inStock !== undefined)
      params.append("in_stock", filters.inStock.toString());
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString() ? `?${params.toString()}` : "";
    return this.request<ApiResponse<PaginatedResponse<Article>>>(
      `/articles${query}`,
    );
  }

  async getArticle(id: string): Promise<ApiResponse<Article>> {
    return this.request<ApiResponse<Article>>(`/articles/${id}`);
  }

  async createArticle(
    data: CreateArticleRequest,
  ): Promise<ApiResponse<Article>> {
    return this.request<ApiResponse<Article>>("/articles", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateArticle(
    id: string,
    data: UpdateArticleRequest,
  ): Promise<ApiResponse<Article>> {
    return this.request<ApiResponse<Article>>(`/articles/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteArticle(id: string): Promise<ApiResponse<null>> {
    return this.request<ApiResponse<null>>(`/articles/${id}`, {
      method: "DELETE",
    });
  }

  // Users API
  async getUsers(
    filters?: UserFilters,
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    const params = new URLSearchParams();
    if (filters?.role) params.append("role", filters.role);
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString() ? `?${params.toString()}` : "";
    return this.request<ApiResponse<PaginatedResponse<User>>>(`/users${query}`);
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>(`/users/${id}`);
  }

  async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateUser(
    id: string,
    data: UpdateUserRequest,
  ): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    return this.request<ApiResponse<null>>(`/users/${id}`, {
      method: "DELETE",
    });
  }

  // Dashboard API
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.request<ApiResponse<DashboardStats>>("/dashboard/stats");
  }

  // Upload API
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append("image", file);

    return this.request<ApiResponse<{ url: string }>>("/upload/image", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }
}

export const apiService = new ApiService();
export default apiService;
