import { Grid3x3, Plus, ShoppingCart } from "lucide-react";
import { AppHeader } from "@/components/ui/app-header";
import { MenuGrid } from "@/components/neworder/MenuGrid";
import { OrderCart } from "@/components/neworder/OrderCart";
import { OrderSuccessModal } from "@/components/neworder/OrderSuccessModal";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";
import { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";

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

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    icon: Grid3x3,
    label: "Dashboard",
  },
  {
    href: "/new-order",
    icon: Plus,
    label: "Nouveau",
    isActive: true,
  },
  {
    href: "/orders",
    icon: ShoppingCart,
    label: "Commandes",
  },
];

export default function NewOrder() {
  const { notifications } = useNotifications();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState("T12");
  const [tip, setTip] = useState(500);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const addToCart = (item: MenuItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
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

  const calculateTotal = () => {
    return calculateSubtotal() + tip;
  };

  const handleTipChange = (newTip: number) => {
    setTip(newTip);
  };

  const handleSaveOrder = () => {
    try {
      console.log("Saving order:", {
        tableNumber,
        items: cartItems,
        subtotal: calculateSubtotal(),
        tip: tip,
        total: calculateTotal(),
      });

      // Générer un numéro de commande
      const orderNumber = `C${Date.now().toString().slice(-3)}`;
      notifications.orderCreated(orderNumber);
      setShowSuccessModal(true);
    } catch (error) {
      notifications.actionError("Cr��ation de la commande");
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Reset cart after successful order
    setCartItems([]);
  };

  return (
    <>
      <ResponsiveLayout
        navItems={navItems}
        header={<AppHeader title="Nouvelle Commande" />}
      >
        {/* Content Area */}
        <div className="flex-1 px-4 lg:px-6 pb-4">
          <div className="flex flex-col xl:flex-row gap-3 lg:gap-4 h-full">
            {/* Menu Grid */}
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-dashboard-dark mb-3 sm:mb-4 lg:mb-5 pt-2 sm:pt-3 font-poppins">
                Liste des articles
              </h2>
              <MenuGrid onAddToCart={addToCart} />
            </div>

            {/* Order Cart */}
            <div className="w-full xl:w-80 flex-shrink-0">
              <OrderCart
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                subtotal={calculateSubtotal()}
                tip={tip}
                total={calculateTotal()}
                onSaveOrder={handleSaveOrder}
                tableNumber={tableNumber}
                onTableNumberChange={setTableNumber}
                onTipChange={handleTipChange}
              />
            </div>
          </div>
        </div>
      </ResponsiveLayout>

      {/* Success Modal */}
      {showSuccessModal && <OrderSuccessModal onClose={handleCloseModal} />}
    </>
  );
}
