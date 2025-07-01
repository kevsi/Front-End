import React from "react";
import { Search, Bell } from "lucide-react";

interface ManagerOrdersHeaderProps {
  leftAction?: React.ReactNode;
}

export const ManagerOrdersHeader: React.FC<ManagerOrdersHeaderProps> = ({
  leftAction,
}) => {
  return (
    <header className="bg-dashboard-gray p-2 sm:p-3">
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-3 lg:gap-0 lg:justify-between">
        {/* Mobile layout: Toggle + Greeting */}
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
          {leftAction}
          <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark font-poppins truncate">
            Hello, gérant
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-3 lg:gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="flex-1 lg:max-w-xl">
            <div className="flex items-center bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm">
              <Search className="w-3 h-3 sm:w-4 sm:h-4 text-dashboard-yellow mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="What do you want eat today..."
                className="flex-1 outline-none text-dashboard-muted font-poppins text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Notifications */}
            <div className="relative">
              <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-sm">
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-dashboard-dark" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-dashboard-yellow rounded-full"></div>
              </div>
            </div>

            {/* Profile Avatar */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-lg overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fb539ebc7ed643642e042113049e79bd48f1c04?width=120"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
