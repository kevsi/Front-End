import React, { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { LayoutDashboard, Plus, ShoppingCart } from "lucide-react";
import { OrdersHeader } from "../components/orders/OrdersHeader";
import { OrdersFilters } from "../components/orders/OrdersFilters";
import { OrdersTable } from "../components/orders/OrdersTable";
import { OrdersHistorySidebar } from "../components/orders/OrdersHistorySidebar";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";

export interface Order {
  id: string;
  orderNumber: string;
  tableNumber: string;
  articleCount: number;
  totalPrice: number;
  status: "validated" | "pending" | "served" | "cancelled";
  createdAt: string;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/new-order",
    icon: Plus,
    label: "Nouveau",
  },
  {
    href: "/orders",
    icon: ShoppingCart,
    label: "Commandes",
    isActive: true,
  },
];

const sampleOrders: Order[] = [
  {
    id: "1",
    orderNumber: "C01",
    tableNumber: "T01",
    articleCount: 3,
    totalPrice: 32000,
    status: "validated",
    createdAt: "2024-05-14T08:20:00Z",
  },
  {
    id: "2",
    orderNumber: "C02",
    tableNumber: "T02",
    articleCount: 5,
    totalPrice: 45000,
    status: "pending",
    createdAt: "2024-05-14T08:15:00Z",
  },
  {
    id: "3",
    orderNumber: "C03",
    tableNumber: "T03",
    articleCount: 2,
    totalPrice: 18000,
    status: "served",
    createdAt: "2024-05-14T08:10:00Z",
  },
  {
    id: "4",
    orderNumber: "C04",
    tableNumber: "T04",
    articleCount: 4,
    totalPrice: 38000,
    status: "cancelled",
    createdAt: "2024-05-14T08:05:00Z",
  },
  {
    id: "5",
    orderNumber: "C05",
    tableNumber: "T05",
    articleCount: 6,
    totalPrice: 52000,
    status: "validated",
    createdAt: "2024-05-14T08:00:00Z",
  },
  {
    id: "6",
    orderNumber: "C06",
    tableNumber: "T06",
    articleCount: 1,
    totalPrice: 12000,
    status: "pending",
    createdAt: "2024-05-14T07:55:00Z",
  },
];

const Orders: React.FC = () => {
  const { notifications } = useNotifications();
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "" || order.status === statusFilter;

    const matchesTime = () => {
      if (timeFilter === "") return true;

      const orderDate = new Date(order.createdAt);
      const hour = orderDate.getHours();

      switch (timeFilter) {
        case "morning":
          return hour >= 6 && hour < 12;
        case "afternoon":
          return hour >= 12 && hour < 18;
        case "evening":
          return hour >= 18 && hour < 24;
        case "night":
          return hour >= 0 && hour < 6;
        default:
          return true;
      }
    };

    const matchesDate = () => {
      if (dateFilter === "") return true;

      const orderDate = new Date(order.createdAt);
      const today = new Date();
      const orderDateStr = orderDate.toDateString();
      const todayStr = today.toDateString();

      switch (dateFilter) {
        case "today":
          return orderDateStr === todayStr;
        case "yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return orderDateStr === yesterday.toDateString();
        case "week":
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return orderDate >= weekAgo;
        default:
          return true;
      }
    };

    return matchesSearch && matchesStatus && matchesTime() && matchesDate();
  });

  return (
    <ResponsiveLayout navItems={navItems} header={<OrdersHeader />}>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-dashboard-dark font-poppins">
              Mes commandes
            </h2>
            <button
              onClick={() => notifications.dataExported("commandes")}
              className="bg-dashboard-yellow text-white px-4 py-2 rounded-lg font-inter text-sm font-medium hover:bg-dashboard-yellow/90 transition-colors whitespace-nowrap"
            >
              📊 Exporter
            </button>
          </div>

          <OrdersFilters
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
              if (query.length > 2) {
                const results = filteredOrders.length;
                notifications.searchPerformed(query, results);
              }
            }}
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <div className="mt-6">
            <OrdersTable orders={filteredOrders} />
          </div>
        </div>

        {/* History Sidebar for desktop */}
        <div className="hidden xl:block xl:w-80 flex-shrink-0">
          <OrdersHistorySidebar />
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default Orders;
