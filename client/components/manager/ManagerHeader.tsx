import React from "react";
import { Bell } from "lucide-react";

interface ManagerHeaderProps {
  leftAction?: React.ReactNode;
}

export const ManagerHeader: React.FC<ManagerHeaderProps> = ({ leftAction }) => {
  return (
    <header className="bg-dashboard-gray border-b border-gray-200 p-2 sm:p-3 lg:p-4 xl:p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-0 lg:justify-between">
        {/* Mobile layout: Toggle + Greeting */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-0 w-full lg:w-auto">
          {leftAction}
          <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-dashboard-dark font-poppins">
            Hello, gérant
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
          <div className="relative">
            <div className="bg-white p-1.5 sm:p-2 lg:p-3 xl:p-4 rounded-lg lg:rounded-xl xl:rounded-2xl shadow-sm border border-gray-200">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-dashboard-dark" />
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-dashboard-yellow rounded-full"></div>
            </div>
          </div>

          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gray-300 rounded-lg lg:rounded-xl xl:rounded-2xl overflow-hidden">
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
