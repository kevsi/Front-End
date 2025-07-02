/**
 * Système de notifications unifié pour tout le projet
 * Combine Sonner (toast) et le panel de notifications
 */

import { toast } from "sonner";
import { useNotificationContext } from "@/main";

export type UnifiedNotificationType = "success" | "error" | "warning" | "info";

export interface UnifiedNotificationConfig {
  title: string;
  description?: string;
  type: UnifiedNotificationType;
  duration?: number;
  persistent?: boolean; // Aussi dans le panel de notifications
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Configuration des icônes et couleurs unifiées
const NOTIFICATION_ICONS = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
} as const;

const NOTIFICATION_STYLES = {
  success: {
    backgroundColor: "hsl(142, 76%, 96%)",
    borderColor: "hsl(142, 76%, 86%)",
    color: "hsl(142, 76%, 16%)",
  },
  error: {
    backgroundColor: "hsl(0, 93%, 96%)",
    borderColor: "hsl(0, 93%, 86%)",
    color: "hsl(0, 93%, 16%)",
  },
  warning: {
    backgroundColor: "hsl(48, 96%, 96%)",
    borderColor: "hsl(48, 96%, 86%)",
    color: "hsl(48, 96%, 16%)",
  },
  info: {
    backgroundColor: "hsl(214, 95%, 96%)",
    borderColor: "hsl(214, 95%, 86%)",
    color: "hsl(214, 95%, 16%)",
  },
} as const;

export const useUnifiedNotifications = () => {
  const notificationContext = useNotificationContext();

  const showNotification = ({
    title,
    description,
    type,
    duration = 4000,
    persistent = false,
    action,
  }: UnifiedNotificationConfig) => {
    const icon = NOTIFICATION_ICONS[type];
    const style = NOTIFICATION_STYLES[type];

    // Toast principal (Sonner)
    if (type === "error") {
      toast.error(`${icon} ${title}`, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
        style: {
          background: style.backgroundColor,
          borderColor: style.borderColor,
          color: style.color,
        },
      });
    } else if (type === "success") {
      toast.success(`${icon} ${title}`, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
        style: {
          background: style.backgroundColor,
          borderColor: style.borderColor,
          color: style.color,
        },
      });
    } else if (type === "warning") {
      toast.warning(`${icon} ${title}`, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
        style: {
          background: style.backgroundColor,
          borderColor: style.borderColor,
          color: style.color,
        },
      });
    } else {
      toast.info(`${icon} ${title}`, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
        style: {
          background: style.backgroundColor,
          borderColor: style.borderColor,
          color: style.color,
        },
      });
    }

    // Si persistent, ajouter aussi au panel de notifications
    if (persistent && notificationContext) {
      // Vous pouvez étendre ceci pour ajouter au panel
      console.log("Notification persistante:", { title, description, type });
    }
  };

  // Actions spécifiques pré-configurées avec design unifié
  const notifications = {
    // === COMMANDES ===
    orderCreated: (orderNumber: string) =>
      showNotification({
        title: "Commande enregistrée",
        description: `Commande ${orderNumber} transmise en cuisine`,
        type: "success",
        persistent: true,
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

    orderViewed: (orderNumber: string) =>
      showNotification({
        title: "Commande consultée",
        description: `Détails de la commande ${orderNumber}`,
        type: "info",
        duration: 2000,
      }),

    // === ARTICLES/PRODUITS ===
    articleAdded: (articleName: string) =>
      showNotification({
        title: "Article ajouté",
        description: `${articleName} ajouté à la commande`,
        type: "success",
        duration: 2500,
      }),

    articleRemoved: (articleName: string) =>
      showNotification({
        title: "Article retiré",
        description: `${articleName} retiré de la commande`,
        type: "info",
        duration: 2500,
      }),

    articleCreated: (articleName: string) =>
      showNotification({
        title: "Nouvel article créé",
        description: `${articleName} ajouté au catalogue`,
        type: "success",
      }),

    productViewed: (productName: string) =>
      showNotification({
        title: "Produit consulté",
        description: `Détails de ${productName}`,
        type: "info",
        duration: 2000,
      }),

    // === UTILISATEURS ===
    userViewed: (userName: string) =>
      showNotification({
        title: "Profil consulté",
        description: `Informations de ${userName}`,
        type: "info",
        duration: 2000,
      }),

    userCreated: (userName: string) =>
      showNotification({
        title: "Utilisateur créé",
        description: `${userName} ajouté au système`,
        type: "success",
      }),

    userUpdated: (userName: string) =>
      showNotification({
        title: "Utilisateur modifié",
        description: `Profil de ${userName} mis à jour`,
        type: "success",
      }),

    userDeleted: (userName: string) =>
      showNotification({
        title: "Utilisateur supprimé",
        description: `${userName} retiré du système`,
        type: "error",
      }),

    // === SYSTÈME ===
    dataExported: (type: string) =>
      showNotification({
        title: "Export terminé",
        description: `Données ${type} exportées avec succès`,
        type: "success",
      }),

    dataImported: (type: string, count: number) =>
      showNotification({
        title: "Import terminé",
        description: `${count} ${type} importé(s) avec succès`,
        type: "success",
      }),

    settingsSaved: () =>
      showNotification({
        title: "Paramètres sauvegardés",
        description: "Configuration mise à jour",
        type: "success",
      }),

    // === ERREURS ===
    networkError: () =>
      showNotification({
        title: "Erreur de connexion",
        description: "Vérifiez votre connexion internet",
        type: "error",
        persistent: true,
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
        action: {
          label: "Réessayer",
          onClick: () => window.location.reload(),
        },
      }),

    validationError: (field: string) =>
      showNotification({
        title: "Erreur de validation",
        description: `Le champ "${field}" est requis ou invalide`,
        type: "warning",
      }),

    // === ACTIONS GÉNÉRIQUES ===
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

    loading: (action: string) =>
      showNotification({
        title: "Chargement...",
        description: `${action} en cours`,
        type: "info",
        duration: 2000,
      }),
  };

  return {
    showNotification,
    notifications,
  };
};

// Hook pour les actions CRUD avec notifications automatiques
export function useCRUDNotifications<T extends { id: string | number }>(
  itemType: string, // "commande", "utilisateur", "produit"
  getItemName: (item: T) => string,
) {
  const { notifications } = useUnifiedNotifications();

  return {
    onView: (item: T) => {
      const name = getItemName(item);
      if (itemType === "commande") {
        notifications.orderViewed(name);
      } else if (itemType === "utilisateur") {
        notifications.userViewed(name);
      } else if (itemType === "produit") {
        notifications.productViewed(name);
      }
    },
    onCreate: (item: T) => notifications.actionSuccess(`${itemType} créé`),
    onUpdate: (item: T) => notifications.actionSuccess(`${itemType} modifié`),
    onDelete: (item: T) => notifications.actionSuccess(`${itemType} supprimé`),
    onError: (action: string, error?: string) =>
      notifications.actionError(action, error),
  };
}
