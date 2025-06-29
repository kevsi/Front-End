import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Plus,
  Clock,
  Shield,
  TrendingUp,
  Settings,
  Zap,
} from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: "blue" | "green" | "purple" | "orange" | "indigo" | "gray";
}

function ActionCard({
  title,
  description,
  icon,
  href,
  color,
}: ActionCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300",
    green:
      "bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300",
    purple:
      "bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300",
    orange:
      "bg-orange-50 border-orange-200 hover:bg-orange-100 hover:border-orange-300",
    indigo:
      "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300",
    gray: "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300",
  };

  const iconColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    indigo: "text-indigo-600",
    gray: "text-gray-600",
  };

  return (
    <Link
      to={href}
      className={`block p-4 lg:p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${colorClasses[color]}`}
    >
      <div className="flex items-start gap-3 lg:gap-4">
        <div
          className={`p-2 lg:p-3 rounded-lg bg-white shadow-sm ${iconColorClasses[color]} flex-shrink-0`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg lg:text-xl font-bold text-dashboard-dark mb-2 font-poppins">
            {title}
          </h3>
          <p className="text-sm lg:text-base text-dashboard-muted font-inter">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="text-center p-4 lg:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-dashboard-yellow rounded-lg mb-3 lg:mb-4 text-white">
        {icon}
      </div>
      <h3 className="text-lg lg:text-xl font-bold text-dashboard-dark mb-2 lg:mb-3 font-poppins">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-dashboard-muted font-inter">
        {description}
      </p>
    </div>
  );
}

export default function Index() {
  const [messageFromServer, setMessageFromServer] = useState("");

  // Fetch message from server on component mount
  useEffect(() => {
    fetchHello();
  }, []);

  const fetchHello = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setMessageFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-gray flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-dashboard-dark font-leckerli">
              Lounge Bar Le Cuivre
            </h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1 text-xs lg:text-sm">
                Version 1.0
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dashboard-dark mb-4 lg:mb-6 font-poppins">
            Système de Gestion Restaurant
          </h2>
          <p className="text-base lg:text-xl text-dashboard-muted max-w-3xl mx-auto font-inter mb-4">
            Une solution complète pour gérer les commandes, suivre les ventes et
            optimiser le service de votre restaurant.
          </p>
          {messageFromServer && (
            <p className="text-sm text-dashboard-yellow font-inter">
              {messageFromServer}
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 lg:mb-16">
          <Link to="/dashboard">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-white font-semibold px-6 lg:px-8 py-3 rounded-lg"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Dashboard Serveur
            </Button>
          </Link>
          <Link to="/new-order">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-dashboard-yellow text-dashboard-yellow hover:bg-dashboard-yellow hover:text-white font-semibold px-6 lg:px-8 py-3 rounded-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nouvelle Commande
            </Button>
          </Link>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          <ActionCard
            title="Dashboard Serveur"
            description="Accédez au tableau de bord principal pour gérer les commandes et suivre l'activité."
            icon={<BarChart3 className="w-6 h-6 lg:w-8 lg:h-8" />}
            href="/dashboard"
            color="blue"
          />

          <ActionCard
            title="Nouvelle Commande"
            description="Créez rapidement une nouvelle commande pour vos clients."
            icon={<Plus className="w-6 h-6 lg:w-8 lg:h-8" />}
            href="/new-order"
            color="green"
          />

          <ActionCard
            title="Historique"
            description="Consultez l'historique complet de toutes les commandes."
            icon={<Clock className="w-6 h-6 lg:w-8 lg:h-8" />}
            href="/orders"
            color="purple"
          />

          <ActionCard
            title="Dashboard Manager"
            description="Interface de gestion avancée pour les responsables."
            icon={<Shield className="w-6 h-6 lg:w-8 lg:h-8" />}
            href="/manager-dashboard"
            color="orange"
          />

          <ActionCard
            title="Commandes Manager"
            description="Gérer toutes les commandes en tant que responsable."
            icon={<ShoppingCart className="w-6 h-6 lg:w-8 lg:h-8" />}
            href="/manager-orders"
            color="purple"
          />

          <ActionCard
            title="Statistiques"
            description="Analysez les performances et les tendances de vente."
            icon={<TrendingUp className="w-6 h-6 lg:w-8 lg:h-8" />}
            href="/manager-dashboard"
            color="indigo"
          />

          <ActionCard
            title="Configuration"
            description="Paramètres et configuration du système."
            icon={<Settings className="w-6 h-6 lg:w-8 lg:h-8" />}
            href="#"
            color="gray"
          />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <FeatureCard
            title="Interface Intuitive"
            description="Design moderne et facile à utiliser pour tous les membres de l'équipe."
            icon={<Zap className="w-5 h-5 lg:w-6 lg:h-6" />}
          />
          <FeatureCard
            title="Gestion en Temps Réel"
            description="Suivi instantané des commandes et mise à jour automatique des statuts."
            icon={<Clock className="w-5 h-5 lg:w-6 lg:h-6" />}
          />
          <FeatureCard
            title="Rapports Détaillés"
            description="Analytics avancés pour optimiser les performances de votre restaurant."
            icon={<BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 text-center">
          <p className="text-sm text-dashboard-muted font-inter">
            © 2024 Lounge Bar Le Cuivre. Système de gestion restaurant.
          </p>
        </div>
      </footer>
    </div>
  );
}
