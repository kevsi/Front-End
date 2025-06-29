import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { OrderTable } from "@/components/dashboard/OrderTable";
import { HistorySidebar } from "@/components/dashboard/HistorySidebar";
import { PromoBanner } from "@/components/dashboard/PromoBanner";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-dashboard-gray flex flex-col lg:flex-row">
      {/* Main Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Stats Cards */}
        <div className="px-4 lg:px-6 py-4">
          <StatsCards />
        </div>

        {/* Promo Banners */}
        <div className="px-4 lg:px-6 py-4">
          <PromoBanner />
        </div>

        {/* Orders Section */}
        <div className="flex-1 px-4 lg:px-6 pb-6">
          <div className="flex flex-col xl:flex-row gap-6 h-full">
            {/* Orders Table */}
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold text-dashboard-dark mb-6 font-poppins">
                Commandes récentes
              </h2>
              <OrderTable />
            </div>

            {/* History Sidebar - Stack below on smaller screens */}
            <div className="w-full xl:w-64 flex-shrink-0">
              <HistorySidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
