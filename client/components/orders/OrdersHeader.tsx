import React from "react";
import { Search, Bell } from "lucide-react";

export const OrdersHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-dashboard-dark font-poppins">
          Hello, serveur 1
        </h1>

        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-6 py-4 w-96 shadow-sm">
              <Search className="text-dashboard-yellow w-8 h-8 mr-3" />
              <input
                type="text"
                placeholder="What do you want eat today..."
                className="flex-1 outline-none text-dashboard-muted font-poppins"
              />
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
              <Bell className="w-8 h-8 text-dashboard-dark" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-dashboard-yellow rounded-full"></div>
            </div>
          </div>

          <div className="w-15 h-15 bg-gray-300 rounded-2xl overflow-hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fb539ebc7ed643642e042113049e79bd48f1c04?width=120"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
