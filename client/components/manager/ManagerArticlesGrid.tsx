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
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Article Image */}
      <div className="relative mb-4">
        <img
          src={article.image}
          alt={article.name}
          className="w-full h-32 lg:h-40 object-cover rounded-lg"
        />
      </div>

      {/* Article Info */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm lg:text-base font-bold text-gray-800 font-poppins mb-1">
            {article.name}
          </h3>
          <p className="text-sm lg:text-base font-bold text-dashboard-yellow">
            {article.price}F
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => onAddToMenu(article.id)}
          className="bg-dashboard-yellow text-white w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center hover:bg-dashboard-yellow/90 transition-colors flex-shrink-0 ml-2"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
      </div>
    </div>
  );
};

export const ManagerArticlesGrid: React.FC<ManagerArticlesGridProps> = ({
  articles,
  onAddToMenu,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 lg:gap-6">
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
