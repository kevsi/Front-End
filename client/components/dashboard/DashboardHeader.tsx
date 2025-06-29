import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between p-6 bg-dashboard-gray">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-dashboard-dark">
        Hello, serveur 1
      </h1>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative flex items-center">
          <Search className="absolute left-6 w-8 h-8 text-dashboard-yellow z-10" />
          <Input
            placeholder="What do you want eat today..."
            className="pl-16 pr-8 py-4 h-14 bg-white border-0 rounded-2xl text-lg placeholder:text-dashboard-muted"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <div className="w-14 h-12 bg-white rounded-2xl flex items-center justify-center">
            <Bell className="w-8 h-7 text-dashboard-dark" />
          </div>
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-dashboard-yellow rounded-full"></div>
        </div>

        {/* Profile Avatar */}
        <Avatar className="w-14 h-14 rounded-2xl">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback className="rounded-2xl">S1</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
