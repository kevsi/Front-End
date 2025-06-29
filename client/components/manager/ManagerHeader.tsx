import React from "react";
import { Bell } from "lucide-react";

export const ManagerHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-dashboard-dark font-poppins">
          Hello, gérant
        </h1>

        <div className="flex items-center gap-6">
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
