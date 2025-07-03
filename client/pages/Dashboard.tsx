import { Grid3x3, Plus, ShoppingCart } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { OrderTable } from "@/components/dashboard/OrderTable";
import { HistorySidebar } from "@/components/dashboard/HistorySidebar";
import { PromoBanner } from "@/components/dashboard/PromoBanner";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";
import { useResponsive } from "@/hooks/use-responsive";

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
  const { getSpacing, getTextSize, isMobile } = useResponsive();

  return (
    <ResponsiveLayout navItems={navItems} header={<DashboardHeader />}>
      {/* Stats Cards */}
      <div
        className={getSpacing({
          mobile: "px-4 py-3",
          desktop: "px-2 sm:px-3 py-1 sm:py-2",
        })}
      >
        <StatsCards />
      </div>

      {/* Promo Banners */}
      <div
        className={getSpacing({
          mobile: "px-4 py-2",
          desktop: "px-2 sm:px-3 py-1",
        })}
      >
        <PromoBanner />
      </div>

      {/* Orders Section */}
      <div
        className={`flex-1 ${getSpacing({ mobile: "px-4 pb-4", desktop: "px-2 sm:px-3 pb-2 sm:pb-3" })}`}
      >
        {/* Section Headers */}
        <div
          className={`flex flex-col xl:flex-row gap-3 mb-6 ${getSpacing({ mobile: "pt-4", desktop: "pt-2 sm:pt-3" })}`}
        >
          <div className="flex-1">
            <h2
              className={`font-semibold text-dashboard-dark font-poppins mb-2 ${getTextSize({ mobile: "text-lg", desktop: "text-sm sm:text-base" })}`}
            >
              Commandes récentes
            </h2>
          </div>
          <div className="w-full xl:w-56 flex-shrink-0">
            <h2
              className={`font-semibold text-dashboard-dark font-poppins text-center xl:text-left mb-2 ${getTextSize({ mobile: "text-lg", desktop: "text-sm sm:text-base" })}`}
            >
              Historique
            </h2>
          </div>
        </div>

        {/* Content */}
        <div
          className={`flex flex-col xl:flex-row gap-4 h-full ${isMobile ? "space-y-6" : ""}`}
        >
          {/* Orders Table */}
          <div className="flex-1 min-w-0">
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
