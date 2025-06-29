import React from "react";
import { ChevronDown, Calendar, Filter, Search } from "lucide-react";

interface OrdersFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const OrdersFilters: React.FC<OrdersFiltersProps> = ({
  searchQuery,
  onSearchChange,
  timeFilter,
  onTimeFilterChange,
  dateFilter,
  onDateFilterChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 lg:p-6">
      {/* Mobile: Stack filters vertically */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Filter buttons row */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          {/* Time Filter */}
          <div className="flex items-center">
            <div className="bg-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 font-inter text-xs lg:text-sm">
              Heure
            </div>
            <button className="ml-2 bg-gray-100 border border-gray-300 rounded-lg p-2 lg:p-3 shadow-sm hover:bg-gray-200 transition-colors">
              <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
            </button>
          </div>

          {/* Date Filter */}
          <div className="flex items-center">
            <div className="bg-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 font-inter text-xs lg:text-sm">
              Date
            </div>
            <button className="ml-2 bg-gray-100 border border-gray-300 rounded-lg p-2 lg:p-3 shadow-sm hover:bg-gray-200 transition-colors">
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center">
            <div className="bg-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 font-inter text-xs lg:text-sm">
              Statut
            </div>
            <button className="ml-2 bg-gray-100 border border-gray-300 rounded-lg p-2 lg:p-3 shadow-sm hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 shadow-sm">
            <Search className="w-4 h-4 lg:w-5 lg:h-5 text-black mr-2 lg:mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Rechercher par numéro, table, article"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 outline-none text-black font-inter text-sm"
            />
          </div>
        </div>

        {/* Advanced Search - Hide on small screens */}
        <div className="hidden lg:flex items-center min-w-0 lg:max-w-md">
          <div className="bg-gray-300 rounded-lg px-4 py-3 font-inter text-sm flex-1 min-w-0">
            <span className="truncate">Recherche efficace</span>
          </div>
          <button className="ml-2 bg-gray-100 border border-gray-300 rounded-lg p-3 shadow-sm hover:bg-gray-200 transition-colors">
            <Search className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
