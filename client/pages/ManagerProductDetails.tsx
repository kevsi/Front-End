import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ResponsiveLayout } from "../components/ui/responsive-layout";
import ManagerHeader from "../components/manager/ManagerHeader";
import ManagerProductDetailsModal from "../components/manager/ManagerProductDetailsModal";

// Mock product data - in real app this would come from API
const mockProducts = {
  "1": {
    id: "1",
    name: "Kir Royale",
    price: "20000 FCFA",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b789a0a1aa3a46bd1486a4a274f4c1885534f292?width=782",
    description:
      "Nulla occaecat velit laborum exercitation ullamco. Elit labore eu aute elit nostrud culpa velit excepteur deserunt sunt. Velit non est cillum consequat cupidatat ex Lorem laboris labore aliqua ad duis eu laborum.",
    badges: ["NEW", "Populaire", "CHAMPAGNE"],
  },
  "2": {
    id: "2",
    name: "Mojito Classique",
    price: "15000 FCFA",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800",
    description:
      "Un cocktail rafraîchissant à base de rhum blanc, menthe fraîche, citron vert et eau gazeuse. Parfait pour les chaudes soirées d'été.",
    badges: ["Populaire"],
  },
  "3": {
    id: "3",
    name: "Whisky Sour",
    price: "25000 FCFA",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800",
    description:
      "Cocktail classique à base de whisky, jus de citron frais et sirop de sucre. Servi avec une garniture d'orange et une cerise.",
    badges: ["CHAMPAGNE"],
  },
};

export default function ManagerProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id && mockProducts[id as keyof typeof mockProducts]) {
      setProduct(mockProducts[id as keyof typeof mockProducts]);
    } else {
      // Product not found, redirect back
      navigate("/manager-articles");
    }
  }, [id, navigate]);

  const handleClose = () => {
    navigate("/manager-articles");
  };

  if (!product) {
    return null;
  }

  return (
    <ResponsiveLayout
      sidebar={
        <nav>
          <ul className="space-y-1">
            <li>
              <a
                href="/manager-dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/manager-orders"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/manager-articles"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      }
    >
      <div className="flex flex-col">
        <ManagerHeader />

        <ManagerProductDetailsModal
          isOpen={true}
          onClose={handleClose}
          product={product}
        />
      </div>
    </ResponsiveLayout>
  );
}
