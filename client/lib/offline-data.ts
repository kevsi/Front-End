/**
 * Données statiques pour le mode développement offline
 * Évite complètement les appels API vers Laravel
 */

import {
  DashboardStats,
  Order,
  LaravelPaginatedResponse,
} from "@shared/laravel-api";

export const OFFLINE_DASHBOARD_STATS: DashboardStats = {
  total_orders: 8,
  total_revenue: 19620, // 196.20€ en centimes
  pending_orders: 1,
  served_orders: 4,
  validated_orders: 1,
  today_orders: 5,
  today_revenue: 12000, // 120€ en centimes
  monthly_growth: 12.5,
  revenue_growth: 8.2,
};

export const OFFLINE_ORDERS: Order[] = [
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
        created_at: "2024-05-14T08:20:00Z",
        updated_at: "2024-05-14T08:20:00Z",
        product: {
          id: 1,
          name: "Café Expresso",
          price: 1500,
          description: "Café expresso italien",
          category_id: 1,
          image_url: "/placeholder.svg",
          is_available: true,
          created_at: "2024-05-14T08:00:00Z",
          updated_at: "2024-05-14T08:00:00Z",
          category: {
            id: 1,
            name: "Boissons",
            description: "Boissons chaudes et froides",
            image_url: "/placeholder.svg",
            is_active: true,
            created_at: "2024-05-14T08:00:00Z",
            updated_at: "2024-05-14T08:00:00Z",
          },
        },
      },
      {
        id: 2,
        order_id: 1,
        product_id: 2,
        quantity: 1,
        unit_price: 200,
        total_price: 200,
        notes: null,
        created_at: "2024-05-14T08:20:00Z",
        updated_at: "2024-05-14T08:20:00Z",
        product: {
          id: 2,
          name: "Sucre",
          price: 200,
          description: "Sucre blanc",
          category_id: 1,
          image_url: "/placeholder.svg",
          is_available: true,
          created_at: "2024-05-14T08:00:00Z",
          updated_at: "2024-05-14T08:00:00Z",
        },
      },
    ],
    user_id: 1,
  },
  {
    id: 2,
    order_number: "C002",
    table_number: "T02",
    customer_name: "Marie Dupont",
    status: "pending",
    total_price: 1800, // 18€ en centimes
    created_at: "2024-05-14T08:15:00Z",
    updated_at: "2024-05-14T08:15:00Z",
    items: [
      {
        id: 3,
        order_id: 2,
        product_id: 3,
        quantity: 1,
        unit_price: 1800,
        total_price: 1800,
        notes: "Sans mayonnaise",
        created_at: "2024-05-14T08:15:00Z",
        updated_at: "2024-05-14T08:15:00Z",
        product: {
          id: 3,
          name: "Sandwich Club",
          price: 1800,
          description: "Sandwich club avec salade, tomate, bacon",
          category_id: 2,
          image_url: "/placeholder.svg",
          is_available: true,
          created_at: "2024-05-14T08:00:00Z",
          updated_at: "2024-05-14T08:00:00Z",
          category: {
            id: 2,
            name: "Plats",
            description: "Plats principaux",
            image_url: "/placeholder.svg",
            is_active: true,
            created_at: "2024-05-14T08:00:00Z",
            updated_at: "2024-05-14T08:00:00Z",
          },
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
    status: "served",
    total_price: 4500, // 45€ en centimes
    created_at: "2024-05-14T08:10:00Z",
    updated_at: "2024-05-14T08:10:00Z",
    items: [
      {
        id: 4,
        order_id: 3,
        product_id: 4,
        quantity: 3,
        unit_price: 1500,
        total_price: 4500,
        notes: null,
        created_at: "2024-05-14T08:10:00Z",
        updated_at: "2024-05-14T08:10:00Z",
        product: {
          id: 4,
          name: "Thé Vert",
          price: 1500,
          description: "Thé vert japonais",
          category_id: 1,
          image_url: "/placeholder.svg",
          is_available: true,
          created_at: "2024-05-14T08:00:00Z",
          updated_at: "2024-05-14T08:00:00Z",
        },
      },
    ],
    user_id: 1,
  },
  {
    id: 4,
    order_number: "C004",
    table_number: "T04",
    customer_name: null,
    status: "cancelled",
    total_price: 2500,
    created_at: "2024-05-14T08:05:00Z",
    updated_at: "2024-05-14T08:05:00Z",
    items: [],
    user_id: 1,
  },
  {
    id: 5,
    order_number: "C005",
    table_number: "T05",
    customer_name: "Jean Martin",
    status: "in_progress",
    total_price: 3800,
    created_at: "2024-05-14T08:00:00Z",
    updated_at: "2024-05-14T08:00:00Z",
    items: [
      {
        id: 5,
        order_id: 5,
        product_id: 5,
        quantity: 2,
        unit_price: 1900,
        total_price: 3800,
        notes: "Bien cuit",
        created_at: "2024-05-14T08:00:00Z",
        updated_at: "2024-05-14T08:00:00Z",
        product: {
          id: 5,
          name: "Steak Frites",
          price: 1900,
          description: "Steak avec frites maison",
          category_id: 2,
          image_url: "/placeholder.svg",
          is_available: true,
          created_at: "2024-05-14T08:00:00Z",
          updated_at: "2024-05-14T08:00:00Z",
        },
      },
    ],
    user_id: 1,
  },
];

export const OFFLINE_ORDERS_RESPONSE: LaravelPaginatedResponse<Order> = {
  data: OFFLINE_ORDERS,
  current_page: 1,
  per_page: 15,
  total: OFFLINE_ORDERS.length,
  last_page: 1,
  from: 1,
  to: OFFLINE_ORDERS.length,
  links: {
    first: "/api/orders?page=1",
    last: "/api/orders?page=1",
    prev: null,
    next: null,
  },
};

// Variable pour vérifier si on est en mode offline
export const IS_OFFLINE_MODE =
  import.meta.env.DEV &&
  import.meta.env.VITE_API_URL === "http://localhost:8000";
