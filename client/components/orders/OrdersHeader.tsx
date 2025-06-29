import React from "react";
import { Search, Bell } from "lucide-react";

interface OrdersHeaderProps {
  leftAction?: React.ReactNode;
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({ leftAction }) => {
  return (
    <header className="bg-dashboard-gray border-b border-gray-200 p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 lg:justify-between">
        {/* Mobile layout: Toggle + Greeting */}
        <div className="flex items-center gap-4 lg:gap-0 w-full lg:w-auto">
          {leftAction}
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-dashboard-dark font-poppins">
            Hello, serveur 1
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 w-full lg:w-auto">
          <div className="flex-1 w-full lg:max-w-md">
            <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-4 lg:px-6 py-3 lg:py-4 shadow-sm">
              <Search className="text-dashboard-yellow w-6 h-6 lg:w-8 lg:h-8 mr-2 lg:mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="What do you want eat today..."
                className="flex-1 outline-none text-dashboard-muted font-poppins text-sm lg:text-base"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="relative">
              <div className="bg-white p-3 lg:p-4 rounded-2xl shadow-sm border border-gray-200">
                <Bell className="w-6 h-6 lg:w-8 lg:h-8 text-dashboard-dark" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-dashboard-yellow rounded-full"></div>
              </div>
            </div>

            <div className="w-12 h-12 lg:w-15 lg:h-15 bg-gray-300 rounded-2xl overflow-hidden">
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
