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
    <div className="bg-white h-full rounded-lg shadow-sm border border-gray-100">
      <div className="p-2 sm:p-3">
        <div className="space-y-2 sm:space-y-3">
          {historyItems.map((item, index) => (
            <div key={item.id} className="relative">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Icon */}
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-dashboard-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  {getHistoryIcon(item.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-black leading-tight truncate">
                    {item.title}
                  </p>
                  <p className="text-xs font-semibold text-gray-600 mt-0.5">
                    {item.time}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < historyItems.length - 1 && (
                <div className="absolute left-2 sm:left-2.5 top-4 sm:top-5 w-px h-2 sm:h-3 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
