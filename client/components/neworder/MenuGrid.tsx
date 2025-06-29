import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/pages/NewOrder";

interface MenuGridProps {
  searchQuery: string;
  selectedCategory: string;
  onAddToCart: (item: MenuItem) => void;
}

// Sample menu data - in a real app this would come from an API
const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "2",
    name: "Daiquiri",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "3",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "4",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "5",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "6",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "7",
    name: "Daiquiri",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "8",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "9",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "10",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "11",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "12",
    name: "Daiquiri",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "13",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "14",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "15",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "16",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "17",
    name: "Daiquiri",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "18",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "19",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
  {
    id: "20",
    name: "Mojito",
    price: 4000,
    image: "/placeholder.svg",
    category: "cocktails",
  },
];

export function MenuGrid({
  searchQuery,
  selectedCategory,
  onAddToCart,
}: MenuGridProps) {
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          {/* Image */}
          <div className="relative mb-4">
            <div className="w-full h-24 bg-gray-200 rounded-2xl mb-4 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="font-medium text-dashboard-dark font-poppins">
              {item.name}
            </h3>
            <p className="text-dashboard-yellow font-bold text-lg font-poppins">
              ${item.price}
            </p>
          </div>

          {/* Add Button */}
          <div className="flex justify-end mt-4">
            <Button
              size="icon"
              className="bg-dashboard-yellow hover:bg-dashboard-yellow/90 rounded-lg p-2"
              onClick={() => onAddToCart(item)}
            >
              <Plus className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
