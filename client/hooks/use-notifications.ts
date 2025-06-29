import { toast } from "@/hooks/use-toast";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationConfig {
  title: string;
  description?: string;
  type: NotificationType;
  duration?: number;
}

export const useNotifications = () => {
  const showNotification = ({
    title,
    description,
    type,
    duration = 3000,
  }: NotificationConfig) => {
    const variant = type === "error" ? "destructive" : "default";

    toast({
      title,
      description,
      variant,
      duration,
    });
  };

  // Notifications spécifiques pour les actions courantes
  const notifications = {
    // Commandes
    orderCreated: (orderNumber: string) =>
      showNotification({
        title: "Commande créée avec succès",
        description: `La commande ${orderNumber} a été créée`,
        type: "success",
      }),

    orderValidated: (orderNumber: string) =>
      showNotification({
        title: "Commande validée",
        description: `La commande ${orderNumber} a été validée`,
        type: "success",
      }),

    orderServed: (orderNumber: string) =>
      showNotification({
        title: "Commande servie",
        description: `La commande ${orderNumber} a été marquée comme servie`,
        type: "success",
      }),

    orderCancelled: (orderNumber: string) =>
      showNotification({
        title: "Commande annulée",
        description: `La commande ${orderNumber} a été annulée`,
        type: "warning",
      }),

    orderDeleted: (orderNumber: string) =>
      showNotification({
        title: "Commande supprimée",
        description: `La commande ${orderNumber} a été supprimée`,
        type: "error",
      }),

    // Articles/Menu
    articleAdded: (articleName: string) =>
      showNotification({
        title: "Article ajouté au panier",
        description: `${articleName} a été ajouté à votre commande`,
        type: "success",
      }),

    articleRemoved: (articleName: string) =>
      showNotification({
        title: "Article retiré",
        description: `${articleName} a été retiré de votre commande`,
        type: "info",
      }),

    articleAddedToMenu: (articleName: string) =>
      showNotification({
        title: "Article ajouté au menu",
        description: `${articleName} a été ajouté au menu du restaurant`,
        type: "success",
      }),

    articleCreated: (articleName: string) =>
      showNotification({
        title: "Article créé avec succès",
        description: `${articleName} a été ajouté au catalogue`,
        type: "success",
      }),

    // Quantités
    quantityUpdated: (articleName: string, quantity: number) =>
      showNotification({
        title: "Quantité mise à jour",
        description: `${articleName} - Quantité: ${quantity}`,
        type: "info",
      }),

    // Gestion des tables
    tableNumberChanged: (oldTable: string, newTable: string) =>
      showNotification({
        title: "Table modifiée",
        description: `Table changée de ${oldTable} à ${newTable}`,
        type: "info",
      }),

    // Recherche et filtres
    searchPerformed: (query: string, results: number) =>
      showNotification({
        title: "Recherche effectuée",
        description: `${results} résultat(s) trouvé(s) pour "${query}"`,
        type: "info",
        duration: 2000,
      }),

    filterApplied: (filterType: string, filterValue: string) =>
      showNotification({
        title: "Filtre appliqué",
        description: `${filterType}: ${filterValue}`,
        type: "info",
        duration: 2000,
      }),

    // Actions administratives
    dataExported: (type: string) =>
      showNotification({
        title: "Données exportées",
        description: `Export ${type} terminé avec succès`,
        type: "success",
      }),

    settingsSaved: () =>
      showNotification({
        title: "Paramètres sauvegardés",
        description: "Vos paramètres ont été enregistrés",
        type: "success",
      }),

    // Erreurs communes
    networkError: () =>
      showNotification({
        title: "Erreur de connexion",
        description: "Vérifiez votre connexion internet",
        type: "error",
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

    // Actions génériques
    actionSuccess: (action: string) =>
      showNotification({
        title: "Action réussie",
        description: `${action} effectuée avec succès`,
        type: "success",
      }),

    actionError: (action: string, error?: string) =>
      showNotification({
        title: "Échec de l'action",
        description: error || `Impossible d'effectuer ${action}`,
        type: "error",
      }),

    // Sidebar et navigation
    sidebarToggled: (isOpen: boolean) =>
      showNotification({
        title: isOpen ? "Menu ouvert" : "Menu fermé",
        type: "info",
        duration: 1000,
      }),
  };

  return {
    showNotification,
    notifications,
  };
};
