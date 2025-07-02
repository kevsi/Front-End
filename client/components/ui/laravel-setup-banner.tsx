import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExternalLink, Database, Server } from "lucide-react";

export function LaravelSetupBanner() {
  if (!import.meta.env.DEV) return null;

  return (
    <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <Server className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 mb-1">
              Configuration Laravel Backend
            </h4>
            <p className="text-blue-700 text-xs">
              Actuellement en mode développement avec données de test.
              Configurez Laravel pour utiliser les données réelles.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
              onClick={() => {
                // Ouvrir la documentation dans un nouvel onglet si possible
                const link = document.createElement("a");
                link.href = "/LARAVEL_INTEGRATION.md";
                link.target = "_blank";
                link.click();
              }}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Guide
            </Button>
            <Button
              size="sm"
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                console.log("🚀 Instructions Laravel:");
                console.log(
                  "1. composer create-project laravel/laravel restaurant-api",
                );
                console.log("2. cd restaurant-api");
                console.log("3. php artisan serve");
                console.log("4. Configurez la base de données dans .env");
                console.log(
                  "📖 Voir LARAVEL_INTEGRATION.md pour plus de détails",
                );
              }}
            >
              <Database className="w-3 h-3 mr-1" />
              Instructions
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
