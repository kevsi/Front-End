import { Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  id: string;
  orderNumber: string;
  tableNumber: string;
  items: number;
  total: string;
  status: "validée" | "en-attente" | "servie";
}

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "C01",
    tableNumber: "T01",
    items: 3,
    total: "32000F",
    status: "validée",
  },
  {
    id: "2",
    orderNumber: "C02",
    tableNumber: "T02",
    items: 2,
    total: "18000F",
    status: "en-attente",
  },
  {
    id: "3",
    orderNumber: "C03",
    tableNumber: "T03",
    items: 5,
    total: "45000F",
    status: "servie",
  },
  {
    id: "4",
    orderNumber: "C04",
    tableNumber: "T04",
    items: 1,
    total: "12000F",
    status: "validée",
  },
  {
    id: "5",
    orderNumber: "C05",
    tableNumber: "T05",
    items: 4,
    total: "38000F",
    status: "en-attente",
  },
];

function getStatusVariant(status: Order["status"]) {
  switch (status) {
    case "validée":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "en-attente":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "servie":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

function getStatusText(status: Order["status"]) {
  switch (status) {
    case "validée":
      return "Validée";
    case "en-attente":
      return "En attente";
    case "servie":
      return "Servie";
    default:
      return status;
  }
}

export function OrderTable() {
  return (
    <div className="bg-white rounded-lg lg:rounded-xl shadow-sm overflow-hidden">
      {/* Desktop Table Header */}
      <div className="hidden lg:grid lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 lg:p-6 bg-gray-50 border-b">
        <div className="font-bold text-black text-center font-poppins text-xs sm:text-sm lg:text-base">
          N° de commande
        </div>
        <div className="font-bold text-black text-center font-poppins text-xs sm:text-sm lg:text-base">
          N° de table
        </div>
        <div className="font-bold text-black text-center font-poppins text-xs sm:text-sm lg:text-base">
          Nombres d'articles
        </div>
        <div className="font-bold text-black text-center font-poppins text-xs sm:text-sm lg:text-base">
          Prix total
        </div>
        <div className="font-bold text-black text-center font-poppins text-xs sm:text-sm lg:text-base">
          Statut
        </div>
        <div className="font-bold text-black text-center font-poppins text-xs sm:text-sm lg:text-base">
          Actions
        </div>
      </div>

      {/* Table Body */}
      <div className="space-y-2 sm:space-y-3 p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-[200px] sm:min-h-[300px] lg:min-h-[400px]">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="flex flex-col lg:grid lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 items-start lg:items-center p-2 sm:p-3 lg:p-4 bg-white rounded-lg lg:rounded-xl border border-gray-200 shadow-sm"
          >
            {/* Mobile Layout */}
            <div className="lg:hidden w-full space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Badge
                    variant="outline"
                    className="bg-white border-gray-200 text-gray-800 font-bold text-xs"
                  >
                    N°{index + 1}
                  </Badge>
                  <span className="font-bold text-gray-800 font-poppins text-sm">
                    {order.orderNumber}
                  </span>
                </div>
                <Badge
                  className={`${getStatusVariant(order.status)} text-xs px-2 py-1`}
                >
                  {getStatusText(order.status)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">
                  Table: <span className="font-bold">{order.tableNumber}</span>
                </span>
                <span className="text-xs sm:text-sm text-gray-600">
                  Articles: <span className="font-bold">{order.items}</span>
                </span>
                <span className="font-bold text-gray-800 text-sm">
                  {order.total}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200 text-xs px-2 py-1"
                >
                  Voir détails
                </Button>
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 w-6 h-6 sm:w-8 sm:h-8"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100 w-6 h-6 sm:w-8 sm:h-8"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 w-6 h-6 sm:w-8 sm:h-8"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:contents">
              {/* Order Number Badge */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Badge
                    variant="outline"
                    className="bg-white border-gray-200 text-gray-800 font-bold text-xs"
                  >
                    N°{index + 1}
                  </Badge>
                  <span className="font-bold text-gray-800 font-poppins text-sm">
                    {order.orderNumber}
                  </span>
                </div>
              </div>

              {/* Table Number */}
              <div className="text-center font-bold text-gray-800 font-poppins text-sm">
                {order.tableNumber}
              </div>

              {/* Items Count */}
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <span className="font-bold text-gray-800 font-poppins text-sm">
                  {order.items} articles
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200 font-poppins text-xs px-2 py-1"
                >
                  Voir
                </Button>
              </div>

              {/* Total */}
              <div className="text-center font-bold text-gray-800 font-poppins text-sm">
                {order.total}
              </div>

              {/* Status */}
              <div className="flex justify-center">
                <Badge
                  className={`${getStatusVariant(order.status)} text-xs px-2 py-1`}
                >
                  {getStatusText(order.status)}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-1 sm:gap-2 lg:gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                >
                  <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                >
                  <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                >
                  <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
