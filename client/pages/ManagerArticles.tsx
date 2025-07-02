import React, { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { LayoutDashboard, ShoppingCart, Box } from "lucide-react";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";
import { ManagerOrdersHeader } from "@/components/manager/ManagerOrdersHeader";
import { ManagerArticlesFilters } from "@/components/manager/ManagerArticlesFilters";
import { ManagerArticlesGrid } from "@/components/manager/ManagerArticlesGrid";
import { NewArticleModal } from "@/components/manager/NewArticleModal";
import { useArticles, useCreateArticle } from "@/hooks/api";
import { ArticleFilters } from "@/types/api";

export interface Article {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const navItems: NavItem[] = [
  {
    href: "/manager-dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/manager-orders",
    icon: ShoppingCart,
    label: "Commandes",
  },
  {
    href: "/manager-articles",
    icon: Box,
    label: "Articles",
    isActive: true,
  },
];

const sampleArticles: Article[] = [
  {
    id: "1",
    name: "Mojito",
    price: 2000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
    category: "cocktail",
  },
  {
    id: "2",
    name: "Daiquiri",
    price: 2000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
    category: "cocktail",
  },
  {
    id: "3",
    name: "Mojito",
    price: 2800,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
    category: "cocktail",
  },
  {
    id: "4",
    name: "Margarita",
    price: 2000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
    category: "cocktail",
  },
  {
    id: "5",
    name: "Mojito",
    price: 2000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
    category: "cocktail",
  },
  {
    id: "6",
    name: "Mojito",
    price: 2600,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
    category: "cocktail",
  },
  {
    id: "7",
    name: "Mojito",
    price: 2000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
    category: "cocktail",
  },
];

const ManagerArticles: React.FC = () => {
  const { notifications } = useNotifications();
  const [articles, setArticles] = useState<Article[]>(sampleArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || article.category === selectedCategory;

    const matchesPrice = () => {
      if (priceFilter === "") return true;

      const price = article.price;
      switch (priceFilter) {
        case "0-1000":
          return price >= 0 && price <= 1000;
        case "1000-3000":
          return price > 1000 && price <= 3000;
        case "3000-5000":
          return price > 3000 && price <= 5000;
        case "5000+":
          return price > 5000;
        default:
          return true;
      }
    };

    return matchesSearch && matchesCategory && matchesPrice();
  });

  const handleAddToMenu = (articleId: string) => {
    try {
      const article = articles.find((a) => a.id === articleId);
      if (article) {
        console.log("Adding article to menu:", articleId);
        notifications.articleAddedToMenu(article.name);
        // Logique pour ajouter l'article au menu
      }
    } catch (error) {
      notifications.actionError("Ajout de l'article au menu");
    }
  };

  const handleCreateArticle = (articleData: {
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    image?: File;
  }) => {
    try {
      const newArticle: Article = {
        id: Date.now().toString(),
        name: articleData.name,
        price: articleData.price,
        image: articleData.image
          ? URL.createObjectURL(articleData.image)
          : "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
        category: articleData.category.toLowerCase(),
      };

      setArticles((prev) => [newArticle, ...prev]);
      notifications.articleCreated(articleData.name);
      setIsNewArticleModalOpen(false);
    } catch (error) {
      notifications.actionError("Création de l'article");
    }
  };

  return (
    <ResponsiveLayout navItems={navItems} header={<ManagerOrdersHeader />}>
      <div className="p-4 lg:p-6 bg-gray-50/50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-dashboard-dark font-poppins">
              Gestion des Articles
            </h2>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Gérez vos articles et ajoutez-les au menu
            </p>
          </div>

          <ManagerArticlesFilters
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
              if (query.length > 2) {
                const results = filteredArticles.length;
                notifications.searchPerformed(query, results);
              }
            }}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            onNewArticleClick={() => setIsNewArticleModalOpen(true)}
          />

          <div className="mt-6 lg:mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {filteredArticles.length} article
                {filteredArticles.length !== 1 ? "s" : ""} trouvé
                {filteredArticles.length !== 1 ? "s" : ""}
              </h3>
            </div>
            <ManagerArticlesGrid
              articles={filteredArticles}
              onAddToMenu={handleAddToMenu}
            />
          </div>

          <NewArticleModal
            isOpen={isNewArticleModalOpen}
            onClose={() => setIsNewArticleModalOpen(false)}
            onSubmit={handleCreateArticle}
          />
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default ManagerArticles;
