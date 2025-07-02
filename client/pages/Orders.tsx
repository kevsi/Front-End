import React, { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { LayoutDashboard, Plus, ShoppingCart } from "lucide-react";
import { OrdersHeader } from "../components/orders/OrdersHeader";
import { OrdersFilters } from "../components/orders/OrdersFilters";
import { OrdersTable } from "../components/orders/OrdersTable";
import { HistorySidebar } from "@/components/dashboard/HistorySidebar";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";
import { ExportAction, useExportActions } from "@/components/ui/export-action";
import { ErrorBoundary } from "@/components/ui/error-boundary";

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
  const { exportData } = useExportActions("commandes");
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
      {/* Orders Section */}
      <div className="flex-1 px-2 sm:px-3 pb-2 sm:pb-3">
        {/* Section Headers */}
        <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6 pt-2 sm:pt-3">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h2 className="text-sm sm:text-base font-semibold text-dashboard-dark font-poppins mb-1 sm:mb-2">
                Historique
              </h2>
              <ExportAction
                onExport={(format) => exportData(filteredOrders, format)}
                dataType="commandes"
                variant="dropdown"
                size="sm"
                availableFormats={["csv", "excel", "pdf"]}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 h-full">
          {/* Orders Table */}
          <div className="flex-1 min-w-0">
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

            <div className="mt-4">
              <OrdersTable orders={filteredOrders} />
            </div>
          </div>

          {/* History Sidebar - Stack below on smaller screens */}
          <div className="w-full xl:w-56 flex-shrink-0">
            <HistorySidebar />
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default Orders;
