import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  leftAction?: React.ReactNode;
}

export function DashboardHeader({ leftAction }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 sm:gap-3 lg:gap-0 lg:justify-between p-2 sm:p-3 bg-dashboard-gray">
      {/* Mobile layout: Toggle + Greeting */}
      <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
        {leftAction}
        <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark font-poppins">
          Hello, serveur 1
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 w-full lg:max-w-xl lg:mx-4">
        <div className="relative flex items-center">
          <Search className="absolute left-2 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 text-dashboard-yellow z-10" />
          <Input
            placeholder="What do you want eat today..."
            className="pl-6 sm:pl-8 pr-2 sm:pr-3 py-1.5 sm:py-2 h-7 sm:h-8 bg-white border-0 rounded-lg text-xs sm:text-sm placeholder:text-dashboard-muted font-poppins"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Notifications */}
        <div className="relative">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center">
            <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-dashboard-dark" />
          </div>
          {/* Notification dot */}
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-dashboard-yellow rounded-full"></div>
        </div>

        {/* Profile Avatar */}
        <Avatar className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback className="rounded-lg text-xs">S1</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
