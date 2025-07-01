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

export function UsersHeader() {
  const [showNotifications, setShowNotifications] = useState(false);

  // Notifications d'exemple - À remplacer par des vraies données
  const sampleNotifications = [
    {
      id: "1",
      title: "Nouveau utilisateur",
      message: "Un nouveau serveur a été ajouté",
      type: "success" as const,
      timestamp: "Il y a 30 minutes",
      isRead: false,
      category: "user" as const,
    },
    {
      id: "2",
      title: "Rapport mensuel",
      message: "Rapport d'activité utilisateurs disponible",
      type: "info" as const,
      timestamp: "Il y a 2 heures",
      isRead: false,
      category: "system" as const,
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
      <div className="bg-white border-b border-gray-200 px-2 sm:px-3 py-2 sm:py-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 sm:gap-3 lg:gap-2 lg:justify-between">
          {/* Left side - Greeting */}
          <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark font-poppins truncate flex-shrink-0">
            Hello, Proprio
          </h2>

          {/* Search Bar - Closer to buttons */}
          <div className="flex-1 w-full lg:max-w-md lg:mx-2">
            <div className="relative flex items-center">
              <Search className="absolute left-2 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 text-dashboard-yellow z-10" />
              <Input
                placeholder="What do you want eat today..."
                className="pl-6 sm:pl-8 pr-2 sm:pr-3 py-1.5 sm:py-2 h-7 sm:h-8 bg-white border-0 rounded-lg text-xs sm:text-sm placeholder:text-dashboard-muted font-poppins"
              />
            </div>
          </div>

          {/* Right Actions - Larger buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
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
                      P1
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-dashboard-dark" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Propriétaire
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      proprio@restaurant.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
