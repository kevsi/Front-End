import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  leftAction?: React.ReactNode;
}

export function DashboardHeader({ leftAction }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 lg:justify-between p-4 lg:p-6 bg-dashboard-gray">
      {/* Mobile layout: Toggle + Greeting */}
      <div className="flex items-center gap-4 lg:gap-0 w-full lg:w-auto">
        {leftAction}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dashboard-dark font-poppins">
          Hello, serveur 1
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 w-full lg:max-w-2xl lg:mx-8">
        <div className="relative flex items-center">
          <Search className="absolute left-4 lg:left-6 w-6 h-6 lg:w-8 lg:h-8 text-dashboard-yellow z-10" />
          <Input
            placeholder="What do you want eat today..."
            className="pl-12 lg:pl-16 pr-4 lg:pr-8 py-3 lg:py-4 h-12 lg:h-14 bg-white border-0 rounded-2xl text-base lg:text-lg placeholder:text-dashboard-muted font-poppins"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Notifications */}
        <div className="relative">
          <div className="w-12 h-10 lg:w-14 lg:h-12 bg-white rounded-2xl flex items-center justify-center">
            <Bell className="w-6 h-5 lg:w-8 lg:h-7 text-dashboard-dark" />
          </div>
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-dashboard-yellow rounded-full"></div>
        </div>

        {/* Profile Avatar */}
        <Avatar className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback className="rounded-2xl text-sm lg:text-base">
            S1
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
