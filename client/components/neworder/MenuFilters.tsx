import { Search, Calendar, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MenuFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function MenuFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: MenuFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
      {/* Category Filter */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="bg-gray-300 border-0 text-black font-inter"
        >
          Catégorie
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-slate-50 border-gray-300 shadow-sm"
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Name Filter */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="bg-gray-300 border-0 text-black font-inter"
        >
          Noms
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-slate-50 border-gray-300 shadow-sm"
        >
          <Calendar className="w-4 h-4" />
        </Button>
      </div>

      {/* Price Filter */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="bg-gray-300 border-0 text-black font-inter"
        >
          Prix
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-slate-50 border-gray-300 shadow-sm"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Search Input */}
      <div className="flex-1 min-w-[300px]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
          <Input
            placeholder="Rechercher par nom, prix"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 bg-white border-gray-300 shadow-sm font-inter"
          />
        </div>
      </div>
    </div>
  );
}
