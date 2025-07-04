import React, { useState } from "react";
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
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const categories = [
    { value: "", label: "Toutes catégories" },
    { value: "cocktail", label: "Cocktails" },
    { value: "bieres", label: "Bières" },
    { value: "vins", label: "Vins" },
    { value: "spiritueux", label: "Spiritueux" },
    { value: "soft", label: "Soft Drinks" },
  ];

  const priceRanges = [
    { value: "", label: "Tous les prix" },
    { value: "0-1000", label: "0 - 1000 FCFA" },
    { value: "1000-3000", label: "1000 - 3000 FCFA" },
    { value: "3000-5000", label: "3000 - 5000 FCFA" },
    { value: "5000+", label: "5000+ FCFA" },
  ];

  const getCurrentCategoryLabel = () => {
    const category = categories.find((cat) => cat.value === selectedCategory);
    return category ? category.label : "Catégorie";
  };

  const getCurrentPriceLabel = () => {
    const price = priceRanges.find((range) => range.value === priceFilter);
    return price ? price.label : "Prix";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Filter buttons row */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          {/* Category Filter */}
          <div className="relative">
            <div className="flex items-center">
              <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 lg:px-4 lg:py-2.5 font-inter text-xs lg:text-sm text-gray-700">
                {getCurrentCategoryLabel()}
              </div>
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="ml-2 bg-white border border-gray-200 rounded-lg p-2 lg:p-2.5 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
              </button>
            </div>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      onCategoryChange(category.value);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedCategory === category.value
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="relative">
            <div className="flex items-center">
              <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 lg:px-4 lg:py-2.5 font-inter text-xs lg:text-sm text-gray-700">
                {getCurrentPriceLabel()}
              </div>
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className="ml-2 bg-white border border-gray-200 rounded-lg p-2 lg:p-2.5 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
              </button>
            </div>

            {showPriceDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => {
                      onPriceFilterChange(range.value);
                      setShowPriceDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      priceFilter === range.value
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 lg:px-4 lg:py-2.5 shadow-sm focus-within:bg-white focus-within:ring-2 focus-within:ring-dashboard-yellow/20 transition-all">
            <Search className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 mr-2 lg:mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Rechercher par nom"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 outline-none text-gray-900 font-inter text-sm bg-transparent placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center gap-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2.5 lg:px-6 lg:py-3 rounded-lg font-inter text-sm font-medium hover:bg-gray-200 hover:shadow-sm transition-all whitespace-nowrap border border-gray-200">
            Selectionner pour ajouter au menu
          </button>
          <button
            onClick={onNewArticleClick}
            className="bg-dashboard-yellow text-white px-4 py-2.5 lg:px-6 lg:py-3 rounded-lg font-inter text-sm font-medium hover:bg-dashboard-yellow/90 hover:shadow-lg transition-all whitespace-nowrap transform hover:scale-105 active:scale-95"
          >
            Nouvelle article
          </button>
        </div>
      </div>
    </div>
  );
};
