import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { OrderTable } from "@/components/dashboard/OrderTable";
import { HistorySidebar } from "@/components/dashboard/HistorySidebar";
import { PromoBanner } from "@/components/dashboard/PromoBanner";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-dashboard-gray flex">
      {/* Main Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Stats Cards */}
        <div className="px-6 py-4">
          <StatsCards />
        </div>

        {/* Promo Banners */}
        <div className="px-6 py-4">
          <PromoBanner />
        </div>

        {/* Orders Section */}
        <div className="flex-1 px-6 pb-6">
          <div className="flex gap-6 h-full">
            {/* Orders Table */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-dashboard-dark mb-6">
                Commandes récentes
              </h2>
              <OrderTable />
            </div>

            {/* History Sidebar */}
            <div className="w-64 flex-shrink-0">
              <HistorySidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
