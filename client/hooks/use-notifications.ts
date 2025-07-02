import { toast } from "sonner";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationConfig {
  title: string;
  description?: string;
  type: NotificationType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Unified notification icons
const ICONS = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
} as const;

export const useNotifications = () => {
  const showNotification = ({
    title,
    description,
    type,
    duration = 4000,
    action,
  }: NotificationConfig) => {
    const icon = ICONS[type];
    const fullTitle = `${icon} ${title}`;

    switch (type) {
      case "error":
        toast.error(fullTitle, {
          description,
          duration,
          action: action
            ? {
                label: action.label,
                onClick: action.onClick,
              }
            : undefined,
        });
        break;
      case "success":
        toast.success(fullTitle, {
          description,
          duration,
          action: action
            ? {
                label: action.label,
                onClick: action.onClick,
              }
            : undefined,
        });
        break;
      case "warning":
        toast.warning(fullTitle, {
          description,
          duration,
          action: action
            ? {
                label: action.label,
                onClick: action.onClick,
              }
            : undefined,
        });
        break;
      default:
        toast(fullTitle, {
          description,
          duration,
          action: action
            ? {
                label: action.label,
                onClick: action.onClick,
              }
            : undefined,
        });
    }
  };

  // Essential notifications only - removed noise
  const notifications = {
    // === ORDERS ===
    orderCreated: (orderNumber: string) =>
      showNotification({
        title: "Commande enregistrée",
        description: `Commande ${orderNumber} transmise en cuisine`,
        type: "success",
      }),

    orderValidated: (orderNumber: string) =>
      showNotification({
        title: "Commande confirmée",
        description: `Commande ${orderNumber} prise en charge`,
        type: "success",
      }),

    orderServed: (orderNumber: string) =>
      showNotification({
        title: "Service terminé",
        description: `Commande ${orderNumber} servie à table`,
        type: "success",
      }),

    orderCancelled: (orderNumber: string) =>
      showNotification({
        title: "Commande annulée",
        description: `Commande ${orderNumber} retirée du système`,
        type: "warning",
      }),

    orderDeleted: (orderNumber: string) =>
      showNotification({
        title: "Commande supprimée",
        description: `Commande ${orderNumber} effacée définitivement`,
        type: "error",
      }),

    // === ARTICLES ===
    articleCreated: (articleName: string) =>
      showNotification({
        title: "Article créé",
        description: `${articleName} ajouté au catalogue`,
        type: "success",
      }),

    // === USERS ===
    userCreated: (userName: string) =>
      showNotification({
        title: "Utilisateur créé",
        description: `${userName} ajouté au système`,
        type: "success",
      }),

    userDeleted: (userName: string) =>
      showNotification({
        title: "Utilisateur supprimé",
        description: `${userName} retiré du système`,
        type: "error",
      }),

    // === SYSTEM ===
    dataExported: (type: string) =>
      showNotification({
        title: "Export terminé",
        description: `Données ${type} exportées avec succès`,
        type: "success",
      }),

    settingsSaved: () =>
      showNotification({
        title: "Paramètres sauvegardés",
        description: "Configuration mise à jour",
        type: "success",
      }),

    // === ERRORS ===
    networkError: () =>
      showNotification({
        title: "Erreur de connexion",
        description: "Vérifiez votre connexion internet",
        type: "error",
        action: {
          label: "Réessayer",
          onClick: () => window.location.reload(),
        },
      }),

    unauthorized: () =>
      showNotification({
        title: "Accès non autorisé",
        description: "Vous n'avez pas les droits pour cette action",
        type: "error",
      }),

    serverError: () =>
      showNotification({
        title: "Erreur serveur",
        description: "Une erreur est survenue. Veuillez réessayer",
        type: "error",
      }),

    validationError: (field: string) =>
      showNotification({
        title: "Erreur de validation",
        description: `Le champ "${field}" est requis ou invalide`,
        type: "warning",
      }),

    // === GENERIC ===
    actionSuccess: (action: string) =>
      showNotification({
        title: "Action réussie",
        description: `${action} effectué avec succès`,
        type: "success",
        duration: 3000,
      }),

    actionError: (action: string, error?: string) =>
      showNotification({
        title: "Échec de l'action",
        description: error || `Impossible d'effectuer ${action}`,
        type: "error",
      }),
  };

  return {
    showNotification,
    notifications,
  };
};
