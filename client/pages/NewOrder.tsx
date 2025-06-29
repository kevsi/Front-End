import { NewOrderSidebar } from "@/components/neworder/NewOrderSidebar";
import { NewOrderHeader } from "@/components/neworder/NewOrderHeader";
import { MenuFilters } from "@/components/neworder/MenuFilters";
import { MenuGrid } from "@/components/neworder/MenuGrid";
import { OrderCart } from "@/components/neworder/OrderCart";
import { OrderSuccessModal } from "@/components/neworder/OrderSuccessModal";
import { useState } from "react";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export default function NewOrder() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState("T12");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateTip = () => {
    return 500; // Fixed tip amount as shown in design
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTip();
  };

  const handleSaveOrder = () => {
    console.log("Saving order:", {
      tableNumber,
      items: cartItems,
      subtotal: calculateSubtotal(),
      tip: calculateTip(),
      total: calculateTotal(),
    });
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Reset cart after successful order
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-dashboard-gray flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <NewOrderSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <NewOrderHeader
          tableNumber={tableNumber}
          onTableNumberChange={setTableNumber}
        />

        {/* Filters */}
        <div className="px-4 lg:px-6 py-4">
          <MenuFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 px-4 lg:px-6 pb-6">
          <div className="flex flex-col xl:flex-row gap-6 h-full">
            {/* Menu Grid */}
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold text-dashboard-dark mb-6 font-poppins">
                Liste des articles
              </h2>
              <MenuGrid
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onAddToCart={addToCart}
              />
            </div>

            {/* Order Cart */}
            <div className="w-full xl:w-96 flex-shrink-0">
              <OrderCart
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                subtotal={calculateSubtotal()}
                tip={calculateTip()}
                total={calculateTotal()}
                onSaveOrder={handleSaveOrder}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && <OrderSuccessModal onClose={handleCloseModal} />}
    </div>
  );
}
