import { Bell, ChevronDown, User, LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNotificationContext } from "@/main";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppHeaderProps {
  title: string;
  showMobileMenu?: boolean;
  onMobileMenuToggle?: () => void;
}

export function AppHeader({
  title,
  showMobileMenu,
  onMobileMenuToggle,
}: AppHeaderProps) {
  const { showNotifications, setShowNotifications } = useNotificationContext();

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    console.log("Déconnexion");
  };

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          {showMobileMenu && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileMenuToggle}
              className="lg:hidden p-1 h-8 w-8"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}

          {/* Title */}
          <h1 className="text-lg font-bold text-gray-900 font-poppins">
            {title}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNotificationClick}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Bell className="w-4 h-4 text-gray-600" />
            </Button>
            {/* Notification indicator */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-8 px-2 hover:bg-gray-100"
              >
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="text-xs bg-dashboard-yellow text-white">
                    S1
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-3 h-3 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Serveur</p>
                  <p className="text-xs text-gray-500">
                    serveur@restaurant.com
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
    </header>
  );
}
