import { ClipboardList, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDashboardStats } from "@/hooks/use-laravel-api";
import { useOfflineDashboardStats } from "@/hooks/use-offline-api";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendColor: string;
  bgGradient: string;
  iconBg: string;
  isLoading?: boolean;
}

function StatCard({
  title,
  value,
  icon,
  trend,
  trendColor,
  bgGradient,
  iconBg,
  isLoading = false,
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card className="bg-white border-0 shadow-sm font-inter min-w-0">
        <CardContent className="p-2 sm:p-3 lg:p-4">
          <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="w-8 h-8 rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${bgGradient} border-0 shadow-sm font-inter min-w-0`}>
      <CardContent className="p-2 sm:p-3 lg:p-4">
        <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4 min-w-0">
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1 overflow-hidden">
            <p className="text-xs sm:text-xs lg:text-sm font-medium opacity-70 leading-3 sm:leading-4 tracking-wide truncate">
              {title}
            </p>
            <p className="text-sm sm:text-base lg:text-xl xl:text-2xl font-bold leading-4 sm:leading-5 lg:leading-6 truncate">
              {value}
            </p>
          </div>
          <div
            className={`p-1 sm:p-1.5 lg:p-2 xl:p-2.5 rounded-lg lg:rounded-xl ${iconBg} shadow-sm flex-shrink-0`}
          >
            {icon}
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 overflow-hidden">
          <div
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${trendColor} flex-shrink-0`}
          ></div>
          <span className="text-xs font-medium leading-3 sm:leading-4 truncate min-w-0">
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  // Utiliser les hooks offline en mode développement
  const onlineQuery = useDashboardStats();
  const offlineQuery = useOfflineDashboardStats();

  // Choisir la source de données selon l'environnement
  const {
    data: stats,
    isLoading,
    error,
  } = import.meta.env.DEV ? offlineQuery : onlineQuery;

  // Vérifier si on utilise des données de fallback
  const isUsingFallback = import.meta.env.DEV;

  // Fonction pour formater le prix
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  };

  // Fonction pour calculer la croissance
  const formatGrowth = (growth: number) => {
    const sign = growth >= 0 ? "+" : "";
    return `${sign}${growth.toFixed(1)}% ce mois`;
  };

  // Données par défaut en cas d'erreur ou de chargement
  const defaultStats = {
    total_orders: 0,
    total_revenue: 0,
    pending_orders: 0,
    served_orders: 0,
    validated_orders: 0,
    monthly_growth: 0,
    revenue_growth: 0,
  };

  const currentStats = stats || defaultStats;

  const statsConfig = [
    {
      title: "Commandes Totales",
      value: isLoading ? "..." : currentStats.total_orders.toString(),
      icon: (
        <ClipboardList className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
      ),
      trend: isLoading ? "..." : formatGrowth(currentStats.monthly_growth),
      trendColor:
        currentStats.monthly_growth >= 0 ? "bg-green-500" : "bg-red-500",
      bgGradient: "bg-white text-blue-900",
      iconBg: "bg-blue-500",
    },
    {
      title: "Chiffre d'Affaires",
      value: isLoading ? "..." : formatPrice(currentStats.total_revenue),
      icon: (
        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
      ),
      trend: isLoading ? "..." : formatGrowth(currentStats.revenue_growth),
      trendColor:
        currentStats.revenue_growth >= 0 ? "bg-green-500" : "bg-red-500",
      bgGradient: "bg-gradient-to-r from-green-50 to-emerald-50 text-green-800",
      iconBg: "bg-green-500",
    },
    {
      title: "Commandes en attente",
      value: isLoading ? "..." : currentStats.pending_orders.toString(),
      icon: (
        <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
      ),
      trend: currentStats.pending_orders > 0 ? "Urgent" : "Aucune",
      trendColor:
        currentStats.pending_orders > 0 ? "bg-red-500" : "bg-green-500",
      bgGradient: "bg-gradient-to-r from-red-50 to-rose-50 text-red-900",
      iconBg: "bg-red-500",
    },
    {
      title: "Commandes Servies",
      value: isLoading ? "..." : currentStats.served_orders.toString(),
      icon: (
        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
      ),
      trend: currentStats.served_orders > 0 ? "Complétées" : "Aucune",
      trendColor: "bg-green-500",
      bgGradient: "bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-900",
      iconBg: "bg-yellow-500",
    },
    {
      title: "Commandes validées",
      value: isLoading ? "..." : currentStats.validated_orders.toString(),
      icon: (
        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
      ),
      trend: currentStats.validated_orders > 0 ? "En cours" : "Aucune",
      trendColor:
        currentStats.validated_orders > 0 ? "bg-blue-500" : "bg-gray-500",
      bgGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-900",
      iconBg: "bg-blue-400",
    },
  ];

  // Afficher un message d'erreur si nécessaire
  if (error) {
    console.error("Erreur lors du chargement des statistiques:", error);
  }

  return (
    <div className="space-y-2">
      {/* Indicateur de mode développement */}
      {import.meta.env.DEV && isUsingFallback && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-center">
          <p className="text-xs text-amber-700">
            🔧 Mode développement - Données de test (Laravel API non disponible)
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
        {statsConfig.map((stat, index) => (
          <StatCard key={index} {...stat} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
}
