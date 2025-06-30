import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  leftAction?: React.ReactNode;
}

export function DashboardHeader({ leftAction }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 sm:gap-4 lg:gap-0 lg:justify-between p-3 sm:p-4 lg:p-6 bg-dashboard-gray">
      {/* Mobile layout: Toggle + Greeting */}
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-0 w-full lg:w-auto">
        {leftAction}
        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-dashboard-dark font-poppins">
          Hello, serveur 1
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 w-full lg:max-w-2xl lg:mx-8">
        <div className="relative flex items-center">
          <Search className="absolute left-3 sm:left-4 lg:left-6 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-dashboard-yellow z-10" />
          <Input
            placeholder="What do you want eat today..."
            className="pl-9 sm:pl-11 lg:pl-14 xl:pl-16 pr-3 sm:pr-4 lg:pr-6 xl:pr-8 py-2 sm:py-2.5 lg:py-3 xl:py-4 h-9 sm:h-10 lg:h-12 xl:h-14 bg-white border-0 rounded-xl lg:rounded-2xl text-sm sm:text-base lg:text-lg placeholder:text-dashboard-muted font-poppins"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        {/* Notifications */}
        <div className="relative">
          <div className="w-9 h-8 sm:w-10 sm:h-9 lg:w-12 lg:h-10 xl:w-14 xl:h-12 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-5 xl:w-8 xl:h-7 text-dashboard-dark" />
          </div>
          {/* Notification dot */}
          <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-dashboard-yellow rounded-full"></div>
        </div>

        {/* Profile Avatar */}
        <Avatar className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-xl lg:rounded-2xl">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback className="rounded-xl lg:rounded-2xl text-xs sm:text-sm lg:text-base">
            S1
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
