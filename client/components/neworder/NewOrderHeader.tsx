import { Search, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationsModal } from "@/components/ui/notifications-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface NewOrderHeaderProps {
  tableNumber: string;
  onTableNumberChange: (tableNumber: string) => void;
  leftAction?: React.ReactNode;
}

export function NewOrderHeader({
  tableNumber,
  onTableNumberChange,
  leftAction,
}: NewOrderHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  // Notifications d'exemple - À remplacer par des vraies données
  const sampleNotifications = [
    {
      id: "1",
      title: "Nouvelle commande",
      message: "Commande #123 reçue pour la table 5",
      type: "success" as const,
      timestamp: "Il y a 2 minutes",
      isRead: false,
      category: "order" as const,
    },
    {
      id: "2",
      title: "Cuisine",
      message: "Plat prêt pour la table 2",
      type: "info" as const,
      timestamp: "Il y a 5 minutes",
      isRead: false,
      category: "order" as const,
    },
  ];

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleMarkAsRead = (notificationId: string) => {
    console.log("Marqué comme lu:", notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log("Tout marqué comme lu");
  };

  const handleLogout = () => {
    console.log("Déconnexion");
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 sm:gap-3 lg:gap-2 lg:justify-between p-2 sm:p-3 bg-dashboard-gray">
        {/* Mobile layout: Toggle + Greeting */}
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto flex-shrink-0">
          {leftAction}
          <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark font-poppins truncate">
            Hello, serveur 1
          </h1>
        </div>

        {/* Search Bar - Closer to buttons */}
        <div className="flex-1 w-full lg:max-w-md lg:mx-2">
          <div className="relative flex items-center">
            <Search className="absolute left-2 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 text-dashboard-yellow z-10" />
            <Input
              placeholder="Rechercher dans la liste"
              className="pl-6 sm:pl-8 pr-2 sm:pr-3 py-1.5 sm:py-2 h-7 sm:h-8 bg-white border-0 rounded-lg text-xs sm:text-sm placeholder:text-dashboard-muted font-poppins"
            />
          </div>
        </div>

        {/* Right Actions - Larger buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Table Number */}
          <div className="bg-gray-300 rounded-md px-2 sm:px-3 py-1 sm:py-1.5">
            <span className="text-black font-semibold text-xs sm:text-sm font-poppins">
              {tableNumber}
            </span>
          </div>

          {/* Notifications - Larger button */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNotificationClick}
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors border-gray-200"
            >
              <Bell className="w-5 h-5 text-dashboard-dark" />
            </Button>
            {/* Notification dot */}
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-dashboard-yellow rounded-full"></div>
          </div>

          {/* Profile Dropdown - Larger */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10 px-3 bg-white rounded-lg border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Avatar className="w-6 h-6 rounded-md">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="rounded-md text-xs bg-dashboard-yellow text-white">
                    S1
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-dashboard-dark" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Serveur 1</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    serveur1@restaurant.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={sampleNotifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </>
  );
}
