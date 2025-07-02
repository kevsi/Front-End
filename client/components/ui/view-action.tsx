/**
 * Composant unifié pour toutes les actions "Voir" du projet
 * Assure la cohérence visuelle et comportementale
 */

import React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ViewActionProps {
  onView: () => void;
  variant?: "icon" | "button" | "compact";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

// Design tokens unifiés pour les actions "Voir"
const VIEW_ACTION_STYLES = {
  base: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 transition-all duration-200",
  focus: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
  disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
};

const VARIANT_STYLES = {
  icon: {
    sm: "w-6 h-6 p-1",
    md: "w-8 h-8 p-1.5",
    lg: "w-10 h-10 p-2",
  },
  button: {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  },
  compact: {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  },
};

const ICON_SIZES = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function ViewAction({
  onView,
  variant = "button",
  size = "md",
  disabled = false,
  label,
  className,
  showIcon = true,
}: ViewActionProps) {
  // Labels par défaut selon la variante
  const defaultLabels = {
    icon: "", // Pas de texte pour les icônes
    button: "Voir détails",
    compact: "Voir",
  };

  const displayLabel = label ?? defaultLabels[variant];
  const variantClass = VARIANT_STYLES[variant][size];
  const iconSize = ICON_SIZES[size];

  if (variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={onView}
        disabled={disabled}
        className={cn(
          VIEW_ACTION_STYLES.base,
          VIEW_ACTION_STYLES.focus,
          VIEW_ACTION_STYLES.disabled,
          variantClass,
          "rounded-lg",
          className,
        )}
        title="Voir les détails"
      >
        <Eye className={iconSize} />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size={size === "sm" ? "sm" : "default"}
      onClick={onView}
      disabled={disabled}
      className={cn(
        VIEW_ACTION_STYLES.base,
        VIEW_ACTION_STYLES.focus,
        VIEW_ACTION_STYLES.disabled,
        variantClass,
        "rounded-lg font-medium",
        className,
      )}
    >
      {showIcon && <Eye className={cn(iconSize, displayLabel && "mr-1.5")} />}
      {displayLabel}
    </Button>
  );
}

// Hook pour actions de visualisation standardisées
export function useViewAction<T>(
  onView: (item: T) => void,
  options?: {
    beforeView?: (item: T) => boolean; // Retourne false pour annuler
    afterView?: (item: T) => void;
  },
) {
  const handleView = (item: T) => {
    // Vérification pré-action
    if (options?.beforeView && !options.beforeView(item)) {
      return;
    }

    // Action principale
    onView(item);

    // Action post-visualisation
    options?.afterView?.(item);
  };

  return { handleView };
}

// Composants pré-configurés pour les différents contextes
export const OrderViewAction = ({
  onView,
  variant = "compact",
  ...props
}: Omit<ViewActionProps, "label"> & { onView: () => void }) => (
  <ViewAction
    onView={onView}
    variant={variant}
    label={variant === "compact" ? "Voir" : "Voir commande"}
    {...props}
  />
);

export const UserViewAction = ({
  onView,
  variant = "icon",
  ...props
}: Omit<ViewActionProps, "label"> & { onView: () => void }) => (
  <ViewAction
    onView={onView}
    variant={variant}
    label="Voir profil"
    {...props}
  />
);

export const ProductViewAction = ({
  onView,
  variant = "compact",
  ...props
}: Omit<ViewActionProps, "label"> & { onView: () => void }) => (
  <ViewAction
    onView={onView}
    variant={variant}
    label={variant === "compact" ? "Voir" : "Voir produit"}
    {...props}
  />
);
