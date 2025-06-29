import React, { useState } from "react";
import { LayoutDashboard, ShoppingCart, Package, Box } from "lucide-react";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";
import { ManagerOrdersHeader } from "@/components/manager/ManagerOrdersHeader";
import { ManagerOrdersFilters } from "@/components/manager/ManagerOrdersFilters";
import { ManagerOrdersTable } from "@/components/manager/ManagerOrdersTable";

export interface ManagerOrder {
  id: string;
  orderNumber: string;
  tableNumber: string;
  articleCount: number;
  totalPrice: number;
  status: "nouvelle" | "validee" | "servie" | "annulee";
  serverName: string;
  serverAvatar: string;
  createdAt: string;
}

const navItems: NavItem[] = [
  {
    href: "/manager-dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/manager-orders",
    icon: ShoppingCart,
    label: "Commandes",
    isActive: true,
  },
  {
    href: "#",
    icon: Package,
    label: "Stocks",
  },
  {
    href: "#",
    icon: Box,
    label: "Articles",
  },
];

const sampleManagerOrders: ManagerOrder[] = [
  {
    id: "1",
    orderNumber: "C01",
    tableNumber: "T01",
    articleCount: 3,
    totalPrice: 32000,
    status: "nouvelle",
    serverName: "Pierre",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a581c1b02fd399a4a3622f9a8ab2a7c75a5950ed?width=96",
    createdAt: "2024-05-14T08:20:00Z",
  },
  {
    id: "2",
    orderNumber: "C02",
    tableNumber: "T02",
    articleCount: 3,
    totalPrice: 32000,
    status: "nouvelle",
    serverName: "Chloé",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0fc4a66c4c0424020a2db292b5ead3ffebd3ec9e?width=96",
    createdAt: "2024-05-14T08:15:00Z",
  },
  {
    id: "3",
    orderNumber: "C03",
    tableNumber: "T03",
    articleCount: 3,
    totalPrice: 32000,
    status: "nouvelle",
    serverName: "Val",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d2f0743df5d6e59647165812b0f16ad41c8eb14c?width=96",
    createdAt: "2024-05-14T08:10:00Z",
  },
  {
    id: "4",
    orderNumber: "C04",
    tableNumber: "T04",
    articleCount: 3,
    totalPrice: 32000,
    status: "validee",
    serverName: "Pierre",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a581c1b02fd399a4a3622f9a8ab2a7c75a5950ed?width=96",
    createdAt: "2024-05-14T08:05:00Z",
  },
  {
    id: "5",
    orderNumber: "C05",
    tableNumber: "T05",
    articleCount: 3,
    totalPrice: 32000,
    status: "validee",
    serverName: "Chloé",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0fc4a66c4c0424020a2db292b5ead3ffebd3ec9e?width=96",
    createdAt: "2024-05-14T08:00:00Z",
  },
  {
    id: "6",
    orderNumber: "C06",
    tableNumber: "T06",
    articleCount: 3,
    totalPrice: 32000,
    status: "validee",
    serverName: "Val",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d2f0743df5d6e59647165812b0f16ad41c8eb14c?width=96",
    createdAt: "2024-05-14T07:55:00Z",
  },
];

const ManagerOrders: React.FC = () => {
  const [orders, setOrders] = useState<ManagerOrder[]>(sampleManagerOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.serverName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <ResponsiveLayout navItems={navItems} header={<ManagerOrdersHeader />}>
      <div className="p-4 lg:p-6">
        <h2 className="text-xl lg:text-2xl font-bold text-dashboard-dark font-poppins mb-6">
          Commandes
        </h2>

        <ManagerOrdersFilters
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
          <ManagerOrdersTable orders={filteredOrders} />
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default ManagerOrders;
