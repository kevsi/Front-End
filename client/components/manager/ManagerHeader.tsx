import React from "react";
import { Bell } from "lucide-react";

interface ManagerHeaderProps {
  leftAction?: React.ReactNode;
}

export const ManagerHeader: React.FC<ManagerHeaderProps> = ({ leftAction }) => {
  return (
    <header className="bg-dashboard-gray border-b border-gray-100 p-2 sm:p-3">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 sm:gap-3 lg:gap-0 lg:justify-between">
        {/* Mobile layout: Toggle + Greeting */}
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
          {leftAction}
          <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark font-poppins truncate">
            Hello, gérant
          </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <div className="relative">
            <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-sm border border-gray-200">
              <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-dashboard-dark" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-dashboard-yellow rounded-full"></div>
            </div>
          </div>

          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-lg overflow-hidden">
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
