import React from "react";
import { ManagerSidebar } from "../components/manager/ManagerSidebar";
import { ManagerHeader } from "../components/manager/ManagerHeader";
import { StatisticsChart } from "../components/manager/StatisticsChart";
import { StatsCards } from "../components/manager/StatsCards";
import { ManagerOrdersTable } from "../components/manager/ManagerOrdersTable";

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
    <div className="min-h-screen bg-dashboard-gray">
      <div className="flex">
        <ManagerSidebar />

        <div className="flex-1 flex flex-col">
          <ManagerHeader />

          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Statistics Chart */}
              <div className="lg:col-span-2">
                <StatisticsChart />
              </div>

              {/* Stats Cards */}
              <div className="space-y-4">
                <StatsCards />
              </div>
            </div>

            {/* Recent Orders Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-dashboard-dark font-poppins mb-6">
                Commandes récentes
              </h2>
              <ManagerOrdersTable orders={sampleManagerOrders} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
