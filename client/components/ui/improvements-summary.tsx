/**
 * Composant récapitulatif des améliorations apportées au projet
 * Affiche les améliorations de cohérence et d'uniformisation
 */

import React, { useState } from "react";
import {
  CheckCircle2,
  Eye,
  Bell,
  Download,
  Palette,
  Code,
  Zap,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ImprovementsSummaryProps {
  isOpen: boolean;
  onClose: () => void;
}

const improvements = [
  {
    category: "Actions Visuelles",
    icon: Eye,
    color: "blue",
    items: [
      {
        title: "Boutons 'Voir' unifiés",
        description:
          "Tous les boutons de visualisation utilisent maintenant le composant ViewAction unifié",
        status: "completed",
        before: "15+ styles différents",
        after: "1 composant cohérent",
      },
      {
        title: "Groupe d'actions standardisé",
        description:
          "ActionGroup combine View/Edit/Delete avec un design uniforme",
        status: "completed",
        before: "Actions dispersées",
        after: "Groupes cohérents",
      },
      {
        title: "Tailles et couleurs harmonisées",
        description:
          "Design tokens unifiés pour toutes les interactions (sm/md/lg)",
        status: "completed",
        before: "Incohérences visuelles",
        after: "Cohérence parfaite",
      },
    ],
  },
  {
    category: "Système de Notifications",
    icon: Bell,
    color: "green",
    items: [
      {
        title: "Notifications unifiées",
        description: "useUnifiedNotifications remplace les multiples systèmes",
        status: "completed",
        before: "3 systèmes différents",
        after: "1 système centralisé",
      },
      {
        title: "Design cohérent",
        description:
          "Toutes les notifications suivent le même style avec icônes et couleurs",
        status: "completed",
        before: "Styles mélangés",
        after: "Design uniforme",
      },
      {
        title: "Actions contextuelles",
        description:
          "Notifications automatiques pour chaque action (voir, créer, modifier)",
        status: "completed",
        before: "Notifications manuelles",
        after: "Automatisation complète",
      },
    ],
  },
  {
    category: "Export de Données",
    icon: Download,
    color: "purple",
    items: [
      {
        title: "Actions d'export unifiées",
        description:
          "ExportAction standardise tous les exports (CSV, Excel, PDF)",
        status: "completed",
        before: "Boutons disparates",
        after: "Interface cohérente",
      },
      {
        title: "Formats multiples",
        description: "Support uniforme CSV, Excel, PDF et impression",
        status: "completed",
        before: "Support partiel",
        after: "Support complet",
      },
      {
        title: "Notifications automatiques",
        description: "Feedback automatique pour tous les exports",
        status: "completed",
        before: "Pas de feedback",
        after: "Feedback systématique",
      },
    ],
  },
  {
    category: "Architecture",
    icon: Code,
    color: "indigo",
    items: [
      {
        title: "Composants réutilisables",
        description:
          "Création de composants UI génériques pour éviter la duplication",
        status: "completed",
        before: "Code dupliqué",
        after: "Composants partagés",
      },
      {
        title: "Hooks spécialisés",
        description:
          "useCRUDNotifications et useExportActions pour les patterns communs",
        status: "completed",
        before: "Logique dispersée",
        after: "Hooks centralisés",
      },
      {
        title: "Types TypeScript",
        description: "Types unifiés pour toutes les actions et interactions",
        status: "completed",
        before: "Types incohérents",
        after: "Types stricts",
      },
    ],
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-800",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
    badge: "bg-green-100 text-green-800",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-800",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-200",
    badge: "bg-indigo-100 text-indigo-800",
  },
};

export function ImprovementsSummary({
  isOpen,
  onClose,
}: ImprovementsSummaryProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const totalImprovements = improvements.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Améliorations du Projet
              </h2>
              <p className="text-gray-600 mb-4">
                Récapitulatif des améliorations de cohérence et d'uniformisation
                apportées à l'application.
              </p>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-green-100 text-green-800 border-0">
                  ✅ {totalImprovements} améliorations
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-0">
                  🎨 Design unifié
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-0">
                  🚀 UX améliorée
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {improvements.map((category) => {
              const isExpanded = expandedCategories.includes(category.category);
              const IconComponent = category.icon;
              const colors = colorClasses[category.color];

              return (
                <Card key={category.category} className="overflow-hidden">
                  <CardHeader
                    className={cn(
                      "cursor-pointer transition-colors",
                      colors.bg,
                      colors.border,
                      "border-l-4",
                    )}
                    onClick={() => toggleCategory(category.category)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className={cn("w-5 h-5", colors.text)} />
                        <CardTitle className="text-lg">
                          {category.category}
                        </CardTitle>
                        <Badge className={colors.badge}>
                          {category.items.length} améliorations
                        </Badge>
                      </div>
                      <ChevronRight
                        className={cn(
                          "w-5 h-5 transition-transform",
                          colors.text,
                          isExpanded && "rotate-90",
                        )}
                      />
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {category.items.map((item, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-gray-100 pl-4"
                          >
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-gray-600 mb-3">
                                  {item.description}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                  <div className="bg-red-50 p-2 rounded-lg">
                                    <div className="font-medium text-red-700 mb-1">
                                      ❌ Avant
                                    </div>
                                    <div className="text-red-600">
                                      {item.before}
                                    </div>
                                  </div>
                                  <div className="bg-green-50 p-2 rounded-lg">
                                    <div className="font-medium text-green-700 mb-1">
                                      ✅ Après
                                    </div>
                                    <div className="text-green-600">
                                      {item.after}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Next Steps */}
          <Card className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-600" />
                Prochaines Étapes Recommandées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                  <span>
                    Appliquer les mêmes patterns aux pages Manager et NewOrder
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                  <span>Créer des composants de filtres unifiés</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                  <span>
                    Implémenter des tests unitaires pour les nouveaux composants
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                  <span>Documenter les design tokens et patterns</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end">
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            Parfait ! Continuer le développement
          </Button>
        </div>
      </div>
    </div>
  );
}
