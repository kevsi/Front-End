import React from "react";
import { ChevronDown, Search } from "lucide-react";

interface ManagerArticlesFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  priceFilter: string;
  onPriceFilterChange: (value: string) => void;
  onNewArticleClick: () => void;
}

export const ManagerArticlesFilters: React.FC<ManagerArticlesFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceFilter,
  onPriceFilterChange,
  onNewArticleClick,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Filter buttons row */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          {/* Category Filter */}
          <div className="flex items-center">
            <div className="bg-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 font-inter text-xs lg:text-sm">
              Catégorie
            </div>
            <button className="ml-2 bg-gray-100 border border-gray-300 rounded-lg p-2 lg:p-3 shadow-sm hover:bg-gray-200 transition-colors">
              <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
            </button>
          </div>

          {/* Price Filter */}
          <div className="flex items-center">
            <div className="bg-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 font-inter text-xs lg:text-sm">
              Prix
            </div>
            <button className="ml-2 bg-gray-100 border border-gray-300 rounded-lg p-2 lg:p-3 shadow-sm hover:bg-gray-200 transition-colors">
              <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 shadow-sm">
            <Search className="w-4 h-4 lg:w-5 lg:h-5 text-black mr-2 lg:mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Rechercher par nom"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 outline-none text-black font-inter text-sm"
            />
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center gap-3">
          <button className="bg-gray-300 text-black px-6 py-3 rounded-lg font-inter text-sm font-medium hover:bg-gray-400 transition-colors whitespace-nowrap">
            Selectionner pour ajouter au menu
          </button>
          <button
            onClick={onNewArticleClick}
            className="bg-[#F8B602] text-white px-6 py-3 rounded-lg font-inter text-sm font-medium hover:bg-[#F8B602]/90 transition-colors whitespace-nowrap"
          >
            Nouvelle article
          </button>
        </div>
      </div>
    </div>
  );
};
