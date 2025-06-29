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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 p-6 bg-gray-50 border-b">
        <div className="font-bold text-black text-center">N° de commande</div>
        <div className="font-bold text-black text-center">N° de table</div>
        <div className="font-bold text-black text-center">
          Nombres d'articles
        </div>
        <div className="font-bold text-black text-center">Prix total</div>
        <div className="font-bold text-black text-center">Statut</div>
        <div className="font-bold text-black text-center">Actions</div>
      </div>

      {/* Table Body */}
      <div className="space-y-3 p-4 bg-gray-50 min-h-[400px]">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="grid grid-cols-6 gap-4 items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            {/* Order Number Badge */}
            <div className="flex justify-center">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="bg-white border-gray-200 text-gray-800 font-bold"
                >
                  N°{index + 1}
                </Badge>
                <span className="font-bold text-gray-800">
                  {order.orderNumber}
                </span>
              </div>
            </div>

            {/* Table Number */}
            <div className="text-center font-bold text-gray-800">
              {order.tableNumber}
            </div>

            {/* Items Count */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-gray-800">
                {order.items} articles
              </span>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200"
              >
                Voir
              </Button>
            </div>

            {/* Total */}
            <div className="text-center font-bold text-gray-800">
              {order.total}
            </div>

            {/* Status */}
            <div className="flex justify-center">
              <Badge className={getStatusVariant(order.status)}>
                {getStatusText(order.status)}
              </Badge>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
