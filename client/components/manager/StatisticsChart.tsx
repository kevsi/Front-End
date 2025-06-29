import React from "react";

export const StatisticsChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-96">
      <div className="mb-6">
        <h3 className="text-2xl font-medium text-gray-700 font-inter mb-2">
          Statistics
        </h3>
        <p className="text-sm text-gray-400 font-inter">
          Suivez les statistiques de votre boite
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-600 font-inter mb-4">
          Suivi des ventes
        </h4>

        {/* Filter buttons */}
        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 text-sm font-bold text-black bg-gray-200 rounded-lg border border-gray-300">
            Par produit
          </button>
          <button className="px-4 py-2 text-sm font-bold text-black hover:bg-gray-100 rounded-lg">
            Par serveur
          </button>
          <button className="px-4 py-2 text-sm font-bold text-black hover:bg-gray-100 rounded-lg">
            Par période
          </button>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="relative h-48 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1552eb337f4371ede038834440b46f6453b3049c?width=1380"
          alt="Sales Chart"
          className="w-full h-full object-contain"
        />

        {/* Value indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600">
          50000F
        </div>
      </div>

      {/* Y-axis labels */}
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Jan</span>
        <span>Fab</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Set</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
    </div>
  );
};
