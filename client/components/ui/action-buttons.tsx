/**
 * Composants d'actions unifiés pour tout le projet
 * Assure la cohérence des interactions (View, Edit, Delete, etc.)
 */

import React from "react";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Design tokens unifiés pour toutes les actions
const ACTION_STYLES = {
  view: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
  edit: "bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100",
  delete: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
  create: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
  save: "bg-blue-600 text-white hover:bg-blue-700",
  cancel: "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200",
  export: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
  import: "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100",
} as const;

const BASE_CLASSES =
  "transition-all duration-200 focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

interface BaseActionProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button" | "compact";
  className?: string;
  tooltip?: string;
}

// Tailles unifiées
const SIZE_CLASSES = {
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

// === COMPOSANTS D'ACTION SPÉCIFIQUES ===

export function ViewAction({
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  variant = "button",
  className,
  tooltip = "Voir les détails",
}: BaseActionProps) {
  const actionClass = ACTION_STYLES.view;
  const sizeClass = SIZE_CLASSES[variant][size];
  const iconSize = ICON_SIZES[size];

  if (variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          actionClass,
          BASE_CLASSES,
          sizeClass,
          "rounded-lg",
          className,
        )}
        title={tooltip}
      >
        <Eye className={iconSize} />
      </Button>
    );
  }

  const label = variant === "compact" ? "Voir" : "Voir détails";

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        actionClass,
        BASE_CLASSES,
        sizeClass,
        "rounded-lg font-medium",
        className,
      )}
    >
      <Eye className={cn(iconSize, "mr-1.5")} />
      {loading ? "Chargement..." : label}
    </Button>
  );
}

export function EditAction({
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  variant = "icon",
  className,
  tooltip = "Modifier",
}: BaseActionProps) {
  const actionClass = ACTION_STYLES.edit;
  const sizeClass = SIZE_CLASSES[variant][size];
  const iconSize = ICON_SIZES[size];

  if (variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          actionClass,
          BASE_CLASSES,
          sizeClass,
          "rounded-lg",
          className,
        )}
        title={tooltip}
      >
        <Edit className={iconSize} />
      </Button>
    );
  }

  const label = variant === "compact" ? "Modifier" : "Modifier";

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        actionClass,
        BASE_CLASSES,
        sizeClass,
        "rounded-lg font-medium",
        className,
      )}
    >
      <Edit className={cn(iconSize, "mr-1.5")} />
      {loading ? "Chargement..." : label}
    </Button>
  );
}

export function DeleteAction({
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  variant = "icon",
  className,
  tooltip = "Supprimer",
}: BaseActionProps) {
  const actionClass = ACTION_STYLES.delete;
  const sizeClass = SIZE_CLASSES[variant][size];
  const iconSize = ICON_SIZES[size];

  if (variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          actionClass,
          BASE_CLASSES,
          sizeClass,
          "rounded-lg",
          className,
        )}
        title={tooltip}
      >
        <Trash2 className={iconSize} />
      </Button>
    );
  }

  const label = variant === "compact" ? "Supprimer" : "Supprimer";

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        actionClass,
        BASE_CLASSES,
        sizeClass,
        "rounded-lg font-medium",
        className,
      )}
    >
      <Trash2 className={cn(iconSize, "mr-1.5")} />
      {loading ? "Suppression..." : label}
    </Button>
  );
}

export function CreateAction({
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  variant = "button",
  className,
  tooltip = "Créer",
  label = "Créer",
}: BaseActionProps & { label?: string }) {
  const actionClass = ACTION_STYLES.create;
  const sizeClass = SIZE_CLASSES[variant][size];
  const iconSize = ICON_SIZES[size];

  if (variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          actionClass,
          BASE_CLASSES,
          sizeClass,
          "rounded-lg",
          className,
        )}
        title={tooltip}
      >
        <Plus className={iconSize} />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        actionClass,
        BASE_CLASSES,
        sizeClass,
        "rounded-lg font-medium",
        className,
      )}
    >
      <Plus className={cn(iconSize, "mr-1.5")} />
      {loading ? "Création..." : label}
    </Button>
  );
}

export function SaveAction({
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  variant = "button",
  className,
  tooltip = "Enregistrer",
}: BaseActionProps) {
  const actionClass = ACTION_STYLES.save;
  const sizeClass = SIZE_CLASSES[variant][size];
  const iconSize = ICON_SIZES[size];

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        actionClass,
        BASE_CLASSES,
        sizeClass,
        "rounded-lg font-medium",
        className,
      )}
    >
      <Save className={cn(iconSize, "mr-1.5")} />
      {loading ? "Enregistrement..." : "Enregistrer"}
    </Button>
  );
}

export function CancelAction({
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  variant = "button",
  className,
  tooltip = "Annuler",
}: BaseActionProps) {
  const actionClass = ACTION_STYLES.cancel;
  const sizeClass = SIZE_CLASSES[variant][size];
  const iconSize = ICON_SIZES[size];

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        actionClass,
        BASE_CLASSES,
        sizeClass,
        "rounded-lg font-medium",
        className,
      )}
    >
      <X className={cn(iconSize, "mr-1.5")} />
      Annuler
    </Button>
  );
}

export function ExportAction({
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  variant = "button",
  className,
  tooltip = "Exporter",
  label = "Exporter",
}: BaseActionProps & { label?: string }) {
  const actionClass = ACTION_STYLES.export;
  const sizeClass = SIZE_CLASSES[variant][size];
  const iconSize = ICON_SIZES[size];

  if (variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          actionClass,
          BASE_CLASSES,
          sizeClass,
          "rounded-lg",
          className,
        )}
        title={tooltip}
      >
        <Download className={iconSize} />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        actionClass,
        BASE_CLASSES,
        sizeClass,
        "rounded-lg font-medium",
        className,
      )}
    >
      <Download className={cn(iconSize, "mr-1.5")} />
      {loading ? "Export..." : label}
    </Button>
  );
}

// === GROUPE D'ACTIONS ===
interface ActionGroupProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  viewDisabled?: boolean;
  editDisabled?: boolean;
  deleteDisabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ActionGroup({
  onView,
  onEdit,
  onDelete,
  viewDisabled = false,
  editDisabled = false,
  deleteDisabled = false,
  loading = false,
  size = "md",
  className,
}: ActionGroupProps) {
  return (
    <div className={cn("flex gap-1 sm:gap-2", className)}>
      {onView && (
        <ViewAction
          onClick={onView}
          disabled={viewDisabled || loading}
          loading={loading}
          size={size}
          variant="icon"
        />
      )}
      {onEdit && (
        <EditAction
          onClick={onEdit}
          disabled={editDisabled || loading}
          loading={loading}
          size={size}
          variant="icon"
        />
      )}
      {onDelete && (
        <DeleteAction
          onClick={onDelete}
          disabled={deleteDisabled || loading}
          loading={loading}
          size={size}
          variant="icon"
        />
      )}
    </div>
  );
}
