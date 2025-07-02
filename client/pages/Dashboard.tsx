import { Grid3x3, Plus, ShoppingCart, Zap } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { OrderTable } from "@/components/dashboard/OrderTable";
import { HistorySidebar } from "@/components/dashboard/HistorySidebar";
import { PromoBanner } from "@/components/dashboard/PromoBanner";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";
import { LaravelSetupBanner } from "@/components/ui/laravel-setup-banner";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ImprovementsSummary } from "@/components/ui/improvements-summary";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const [showImprovements, setShowImprovements] = useState(false);

  return (
    <>
      <ResponsiveLayout navItems={navItems} header={<DashboardHeader />}>
        {/* Laravel Setup Banner */}
        <div className="px-2 sm:px-3 py-1">
          <LaravelSetupBanner />
        </div>

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
          {/* Section Headers */}
          <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6 pt-2 sm:pt-3">
            <div className="flex-1">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-dashboard-dark font-poppins mb-1 sm:mb-2">
                Commandes récentes
              </h2>
            </div>
            <div className="w-full xl:w-56 flex-shrink-0">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-dashboard-dark font-poppins text-center xl:text-left mb-1 sm:mb-2 xl:pl-0">
                Historique
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 h-full">
            {/* Orders Table */}
            <div className="flex-1 min-w-0">
              <ErrorBoundary>
                <OrderTable />
              </ErrorBoundary>
            </div>

            {/* History Sidebar - Stack below on smaller screens */}
            <div className="w-full xl:w-56 flex-shrink-0">
              <ErrorBoundary>
                <HistorySidebar />
              </ErrorBoundary>
            </div>
          </div>
        </div>

        {/* Improvements Summary Button - Floating */}
        {import.meta.env.DEV && (
          <div className="fixed bottom-4 right-4 z-40">
            <Button
              onClick={() => setShowImprovements(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
              size="sm"
            >
              <Zap className="w-4 h-4 mr-2" />
              Voir les améliorations
            </Button>
          </div>
        )}
      </ResponsiveLayout>

      {/* Improvements Summary Modal */}
      <ImprovementsSummary
        isOpen={showImprovements}
        onClose={() => setShowImprovements(false)}
      />
    </>
  );
}
