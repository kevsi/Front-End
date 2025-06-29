import React from "react";
import { Clock, X, ThumbsUp } from "lucide-react";

interface HistoryEvent {
  id: string;
  type: "pending" | "rejected" | "served";
  orderNumber: string;
  timestamp: string;
}

const historyEvents: HistoryEvent[] = [
  {
    id: "1",
    type: "pending",
    orderNumber: "1",
    timestamp: "Mai 14, 8h:20",
  },
  {
    id: "2",
    type: "rejected",
    orderNumber: "2",
    timestamp: "Mai 14, 8h:20",
  },
  {
    id: "3",
    type: "served",
    orderNumber: "3",
    timestamp: "Mai 14, 8h:20",
  },
];

const getEventIcon = (type: string) => {
  switch (type) {
    case "pending":
      return <Clock className="w-4 h-4 text-white" />;
    case "rejected":
      return <X className="w-4 h-4 text-white" />;
    case "served":
      return <ThumbsUp className="w-4 h-4 text-white" />;
    default:
      return <Clock className="w-4 h-4 text-white" />;
  }
};

const getEventText = (type: string, orderNumber: string) => {
  switch (type) {
    case "pending":
      return `Commande n°${orderNumber} en attente`;
    case "rejected":
      return `Commande n°${orderNumber} rejetée`;
    case "served":
      return `Commande n°${orderNumber} servie`;
    default:
      return `Commande n°${orderNumber}`;
  }
};

export const OrdersHistorySidebar: React.FC = () => {
  return (
    <div className="w-50 min-h-screen bg-gray-50 border-l border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-bold text-black font-inter mb-6 text-center">
          Historique
        </h3>

        <div className="space-y-5 relative">
          {historyEvents.map((event, index) => (
            <div key={event.id} className="relative">
              <div className="flex items-center gap-3">
                <div className="bg-dashboard-yellow rounded-full p-2 relative z-10">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-black font-inter mb-1">
                    {getEventText(event.type, event.orderNumber)}
                  </p>
                  <p className="text-xs text-black font-inter font-bold">
                    {event.timestamp}
                  </p>
                </div>
              </div>

              {/* Vertical line connecting events */}
              {index < historyEvents.length - 1 && (
                <div className="absolute left-5 top-10 w-px h-8 bg-black"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
