import { ClipboardList, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendColor: string;
  bgGradient: string;
  iconBg: string;
}

function StatCard({
  title,
  value,
  icon,
  trend,
  trendColor,
  bgGradient,
  iconBg,
}: StatCardProps) {
  return (
    <Card className={`${bgGradient} border-0 shadow-lg`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-opacity-80">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`p-3 rounded-xl ${iconBg} shadow-lg`}>{icon}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${trendColor}`}></div>
          <span className="text-xs font-medium">{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const stats = [
    {
      title: "Commandes Totales",
      value: "8",
      icon: <ClipboardList className="w-5 h-5 text-white" />,
      trend: "+12% ce mois",
      trendColor: "bg-green-500",
      bgGradient: "bg-white",
      iconBg: "bg-blue-500",
    },
    {
      title: "Chiffre d'Affaires",
      value: "196,2 €",
      icon: <DollarSign className="w-5 h-5 text-white" />,
      trend: "+8.2% ce mois",
      trendColor: "bg-green-500",
      bgGradient: "bg-gradient-to-r from-green-50 to-emerald-50",
      iconBg: "bg-green-500",
    },
    {
      title: "Commandes en attente",
      value: "1",
      icon: <Clock className="w-5 h-5 text-white" />,
      trend: "Urgent",
      trendColor: "bg-red-500",
      bgGradient: "bg-gradient-to-r from-red-50 to-rose-50",
      iconBg: "bg-red-500",
    },
    {
      title: "Commandes Servies",
      value: "4",
      icon: <CheckCircle className="w-5 h-5 text-white" />,
      trend: "100% complétées",
      trendColor: "bg-green-500",
      bgGradient: "bg-gradient-to-r from-yellow-50 to-amber-50",
      iconBg: "bg-yellow-500",
    },
    {
      title: "Commandes validées",
      value: "1",
      icon: <Clock className="w-5 h-5 text-white" />,
      trend: "En cours",
      trendColor: "bg-green-500",
      bgGradient: "bg-gradient-to-r from-blue-50 to-cyan-50",
      iconBg: "bg-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
