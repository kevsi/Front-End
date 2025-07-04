import React from "react";
import { Plus } from "lucide-react";
import { Article } from "../../pages/ManagerArticles";

interface ManagerArticlesGridProps {
  articles: Article[];
  onAddToMenu: (articleId: string) => void;
}

interface ArticleCardProps {
  article: Article;
  onAddToMenu: (articleId: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onAddToMenu }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 lg:p-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02] min-w-0 group">
      {/* Article Image */}
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <img
          src={article.image}
          alt={article.name}
          className="w-full h-28 lg:h-36 object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Article Info */}
      <div className="flex items-end justify-between min-w-0 gap-2">
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="text-sm lg:text-base font-bold text-gray-900 font-poppins mb-1 truncate leading-tight">
            {article.name}
          </h3>
          <p className="text-base lg:text-lg font-bold text-dashboard-yellow truncate">
            {article.price}F
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => onAddToMenu(article.id)}
          className="bg-dashboard-yellow text-white w-8 h-8 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center hover:bg-dashboard-yellow/90 hover:shadow-lg transition-all duration-200 flex-shrink-0 transform hover:scale-105 active:scale-95"
          aria-label={`Ajouter ${article.name} au menu`}
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5 stroke-2" />
        </button>
      </div>
    </div>
  );
};

export const ManagerArticlesGrid: React.FC<ManagerArticlesGridProps> = ({
  articles,
  onAddToMenu,
}) => {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun article trouvé
        </h3>
        <p className="text-gray-500 text-sm">
          Essayez de modifier vos filtres ou ajoutez un nouvel article.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 lg:gap-4">
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
