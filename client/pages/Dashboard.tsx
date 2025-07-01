import { Grid3x3, Plus, ShoppingCart } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { OrderTable } from "@/components/dashboard/OrderTable";
import { HistorySidebar } from "@/components/dashboard/HistorySidebar";
import { PromoBanner } from "@/components/dashboard/PromoBanner";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    icon: Grid3x3,
    label: "Dashboard",
    isActive: true,
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
  },
];

export default function Dashboard() {
  return (
    <ResponsiveLayout navItems={navItems} header={<DashboardHeader />}>
      {/* Stats Cards */}
      <div className="px-2 sm:px-3 py-1 sm:py-2">
        <StatsCards />
      </div>

      {/* Promo Banners */}
      <div className="px-2 sm:px-3 py-1">
        <PromoBanner />
      </div>

      {/* Orders Section */}
      <div className="flex-1 px-2 sm:px-3 pb-2 sm:pb-3">
        <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 h-full">
          {/* Orders Table */}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm sm:text-base font-semibold text-dashboard-dark mb-2 font-poppins">
              Commandes récentes
            </h2>
            <OrderTable />
          </div>

          {/* History Sidebar - Stack below on smaller screens */}
          <div className="w-full xl:w-56 flex-shrink-0">
            <HistorySidebar />
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
