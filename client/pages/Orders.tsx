import React, { useState } from "react";
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

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-dashboard-gray">
      <ResponsiveLayout
        navItems={navItems}
        header={<OrdersHeader />}
        sidebarFooter={<OrdersHistorySidebar />}
      >
        <div className="p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-dashboard-dark font-poppins">
              Mes commandes
            </h2>
            <button className="bg-dashboard-yellow text-white px-4 py-2 rounded-lg font-inter text-sm font-medium hover:bg-dashboard-yellow/90 transition-colors whitespace-nowrap">
              📊 Exporter
            </button>
          </div>

          <OrdersFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
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
      </ResponsiveLayout>
    </div>
  );
};

export default Orders;
