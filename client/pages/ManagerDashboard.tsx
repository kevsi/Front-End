import React from "react";
import { LayoutDashboard, ShoppingCart, Package, Box } from "lucide-react";
import { ManagerHeader } from "../components/manager/ManagerHeader";
import { StatisticsChart } from "../components/manager/StatisticsChart";
import { StatsCards } from "../components/manager/StatsCards";
import { ManagerOrdersTable } from "../components/manager/ManagerOrdersTable";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";

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
    isActive: true,
  },
  {
    href: "/orders",
    icon: ShoppingCart,
    label: "Commandes",
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
];

const ManagerDashboard: React.FC = () => {
  return (
    <ResponsiveLayout navItems={navItems} header={<ManagerHeader />}>
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Statistics Chart */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <StatisticsChart />
          </div>

          {/* Stats Cards */}
          <div className="space-y-4 order-1 lg:order-2">
            <StatsCards />
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-dashboard-dark font-poppins mb-4 lg:mb-6">
            Commandes récentes
          </h2>
          <ManagerOrdersTable orders={sampleManagerOrders} />
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default ManagerDashboard;
