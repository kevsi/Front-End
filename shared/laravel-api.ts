/**
 * Types et interfaces pour l'API Laravel
 * Base de données: MySQL/PostgreSQL
 */

// Base response structure from Laravel
export interface LaravelResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface LaravelPaginatedResponse<T = any> {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "serveur" | "cuisinier";
  created_at: string;
  updated_at: string;
}

// Order types
export interface Order {
  id: number;
  order_number: string;
  table_number: string;
  customer_name?: string;
  status: "pending" | "validated" | "in_progress" | "served" | "cancelled";
  total_price: number;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
  user_id: number;
  user?: User;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  product?: Product;
}

// Product types
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Statistics types
export interface DashboardStats {
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
  served_orders: number;
  validated_orders: number;
  today_orders: number;
  today_revenue: number;
  monthly_growth: number;
  revenue_growth: number;
}

// Request types
export interface CreateOrderRequest {
  table_number: string;
  customer_name?: string;
  items: {
    product_id: number;
    quantity: number;
    notes?: string;
  }[];
}

export interface UpdateOrderRequest {
  table_number?: string;
  customer_name?: string;
  status?: Order["status"];
  items?: {
    id?: number;
    product_id: number;
    quantity: number;
    notes?: string;
  }[];
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  is_available?: boolean;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  category_id?: number;
  image_url?: string;
  is_available?: boolean;
}

// Filter types
export interface OrderFilters {
  status?: Order["status"];
  date_from?: string;
  date_to?: string;
  table_number?: string;
  user_id?: number;
  search?: string;
}

export interface ProductFilters {
  category_id?: number;
  is_available?: boolean;
  search?: string;
  price_min?: number;
  price_max?: number;
}

// API endpoints configuration
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  ME: "/api/auth/me",

  // Orders
  ORDERS: "/api/orders",
  ORDER_BY_ID: (id: number) => `/api/orders/${id}`,
  ORDER_STATS: "/api/orders/stats",

  // Products
  PRODUCTS: "/api/products",
  PRODUCT_BY_ID: (id: number) => `/api/products/${id}`,

  // Categories
  CATEGORIES: "/api/categories",
  CATEGORY_BY_ID: (id: number) => `/api/categories/${id}`,

  // Users
  USERS: "/api/users",
  USER_BY_ID: (id: number) => `/api/users/${id}`,

  // Dashboard
  DASHBOARD_STATS: "/api/dashboard/stats",
} as const;
