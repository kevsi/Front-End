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
      return <ThumbsUp className="w-4 h-4 text-white" />;
    case "rejected":
      return <X className="w-4 h-4 text-white" />;
    case "pending":
      return <Clock className="w-4 h-4 text-white" />;
    default:
      return <Clock className="w-4 h-4 text-white" />;
  }
}

export function HistorySidebar() {
  return (
    <div className="bg-slate-50 h-full rounded-lg">
      <div className="p-4">
        <h3 className="text-center font-bold text-black text-lg mb-6">
          Historique
        </h3>

        <div className="space-y-6">
          {historyItems.map((item, index) => (
            <div key={item.id} className="relative">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-7 h-7 bg-dashboard-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  {getHistoryIcon(item.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black leading-tight">
                    {item.title}
                  </p>
                  <p className="text-sm font-semibold text-black mt-1">
                    {item.time}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < historyItems.length - 1 && (
                <div className="absolute left-3.5 top-7 w-px h-6 bg-black"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
