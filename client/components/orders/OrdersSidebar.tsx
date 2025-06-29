import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Plus, ShoppingCart } from "lucide-react";

export const OrdersSidebar: React.FC = () => {
  return (
    <div className="w-80 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-4xl font-leckerli text-dashboard-dark text-center mb-12">
          Lounge Bar Le Cuivre
        </h1>

        <nav className="space-y-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-6 p-4 text-dashboard-muted hover:text-dashboard-dark hover:bg-gray-50 rounded-2xl transition-colors font-poppins"
              >
                <LayoutDashboard size={40} className="text-dashboard-muted" />
                <span className="text-lg font-medium">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/new-order"
                className="flex items-center gap-6 p-4 text-dashboard-muted hover:text-dashboard-dark hover:bg-gray-50 rounded-2xl transition-colors font-poppins"
              >
                <Plus size={40} className="text-dashboard-muted" />
                <span className="text-lg font-medium">Nouveau</span>
              </Link>
            </li>

            <li>
              <Link
                to="/orders"
                className="flex items-center gap-6 p-4 bg-dashboard-yellow text-white rounded-2xl shadow-lg font-poppins"
              >
                <ShoppingCart size={40} className="text-white" />
                <span className="text-lg font-medium">Commandes</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
