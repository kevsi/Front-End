import React from "react";
import { Plus } from "lucide-react";
import { Article } from "../../pages/ManagerArticles";
import { useResponsive } from "@/hooks/use-responsive";

interface ManagerArticlesGridProps {
  articles: Article[];
  onAddToMenu: (articleId: string) => void;
}

interface ArticleCardProps {
  article: Article;
  onAddToMenu: (articleId: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onAddToMenu }) => {
  const { isMobile, getSpacing, getTextSize } = useResponsive();

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 min-w-0 group ${getSpacing({ mobile: "p-3", desktop: "p-2" })}`}
    >
      {/* Article Image */}
      <div
        className={`relative overflow-hidden rounded-md ${getSpacing({ mobile: "mb-3", desktop: "mb-2" })}`}
      >
        <img
          src={article.image}
          alt={article.name}
          className={`w-full object-cover transition-transform duration-200 group-hover:scale-105 ${isMobile ? "h-32" : "h-24"}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Article Info */}
      <div
        className={`flex items-end justify-between min-w-0 ${getSpacing({ mobile: "gap-2", desktop: "gap-1.5" })}`}
      >
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3
            className={`font-bold text-gray-900 font-poppins mb-1 truncate leading-tight ${getTextSize({ mobile: "text-sm", desktop: "text-xs" })}`}
          >
            {article.name}
          </h3>
          <p
            className={`font-bold text-dashboard-yellow truncate ${getTextSize({ mobile: "text-base", desktop: "text-sm" })}`}
          >
            {article.price}F
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => onAddToMenu(article.id)}
          className={`bg-dashboard-yellow text-white rounded-md flex items-center justify-center hover:bg-dashboard-yellow/90 transition-all duration-200 flex-shrink-0 ${isMobile ? "w-8 h-8" : "w-6 h-6"}`}
          aria-label={`Ajouter ${article.name} au menu`}
        >
          <Plus
            className={`stroke-2 ${isMobile ? "w-4 h-4" : "w-3.5 h-3.5"}`}
          />
        </button>
      </div>
    </div>
  );
};

export const ManagerArticlesGrid: React.FC<ManagerArticlesGridProps> = ({
  articles,
  onAddToMenu,
}) => {
  const { getGridCols, getSpacing, getTextSize, isMobile } = useResponsive();

  if (articles.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center ${getSpacing({ mobile: "py-16", desktop: "py-12" })}`}
      >
        <div
          className={`bg-gray-100 rounded-full flex items-center justify-center mb-4 ${isMobile ? "w-20 h-20" : "w-16 h-16"}`}
        >
          <Plus
            className={`text-gray-400 ${isMobile ? "w-10 h-10" : "w-8 h-8"}`}
          />
        </div>
        <h3
          className={`font-semibold text-gray-900 mb-2 ${getTextSize({ mobile: "text-xl", desktop: "text-lg" })}`}
        >
          Aucun article trouvé
        </h3>
        <p
          className={`text-gray-500 ${getTextSize({ mobile: "text-base", desktop: "text-sm" })}`}
        >
          Essayez de modifier vos filtres ou ajoutez un nouvel article.
        </p>
      </div>
    );
  }

  // Responsive grid columns configuration
  const gridCols = getGridCols({
    xs: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 6,
  });

  const gridClass = `grid gap-${isMobile ? "3" : "2"}`;
  const colsClass = `grid-cols-${gridCols}`;

  return (
    <div
      className={`${gridClass} ${colsClass} sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`}
    >
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onAddToMenu={onAddToMenu}
        />
      ))}
    </div>
  );
};
