import { ThumbsUp, X, Clock } from "lucide-react";

interface HistoryItem {
  id: string;
  title: string;
  time: string;
  type: "approved" | "rejected" | "pending";
}

const historyItems: HistoryItem[] = [
  {
    id: "1",
    title: "Commande n°1 en attente",
    time: "Mai 14, 8h:20",
    type: "pending",
  },
  {
    id: "2",
    title: "Commande n°2 rejetée",
    time: "Mai 14, 8h:20",
    type: "rejected",
  },
  {
    id: "3",
    title: "Commande n°3 servie",
    time: "Mai 14, 8h:20",
    type: "approved",
  },
];

function getHistoryIcon(type: HistoryItem["type"]) {
  switch (type) {
    case "approved":
      return <ThumbsUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />;
    case "rejected":
      return <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />;
    case "pending":
      return <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />;
    default:
      return <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />;
  }
}

export function HistorySidebar() {
  return (
    <div className="bg-slate-50 h-full rounded-lg">
      <div className="p-2 sm:p-3 lg:p-4">
        <h3 className="text-center font-bold text-black text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 lg:mb-6">
          Historique
        </h3>

        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {historyItems.map((item, index) => (
            <div key={item.id} className="relative">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Icon */}
                <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-dashboard-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  {getHistoryIcon(item.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-black leading-tight">
                    {item.title}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-black mt-0.5 sm:mt-1">
                    {item.time}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < historyItems.length - 1 && (
                <div className="absolute left-2.5 sm:left-3 lg:left-3.5 top-5 sm:top-6 lg:top-7 w-px h-3 sm:h-4 lg:h-6 bg-black"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
