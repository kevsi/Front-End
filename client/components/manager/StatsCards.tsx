import React from "react";

export const StatsCards: React.FC = () => {
  const stats = [
    {
      title: "Total des articles",
      value: "140",
      change: "+12% ce mois",
      bgColor: "bg-white",
      icon: "📦",
    },
    {
      title: "Chiffres d'affaires",
      value: "20000F",
      change: "+12% ce mois",
      bgColor: "bg-yellow-100",
      icon: "💰",
    },
    {
      title: "Commandes Totales",
      value: "8",
      change: "+12% ce mois",
      bgColor: "bg-orange-100",
      icon: "📋",
    },
    {
      title: "Commandes validées",
      value: "8",
      change: "+12% ce mois",
      bgColor: "bg-green-100",
      icon: "✅",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-2xl p-6 shadow-lg border border-gray-100`}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-blue-800 font-medium mb-2 font-inter">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-blue-900 font-inter">
                {stat.value}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <img
                src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${
                  index === 0
                    ? "43165c6e0e3250266d078c20ac3360f4ac478b1d"
                    : index === 1
                      ? "2247bd9c4918a687d8e636235940db9b4d0beb6b"
                      : index === 2
                        ? "94ae10b6fc688dfe90ebf200984ac2f1fb30b27f"
                        : "963b37f6e422c12cd94034b574c299f9a223cf50"
                }?width=40`}
                alt={stat.title}
                className="w-5 h-5"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-blue-800 font-medium font-inter">
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
