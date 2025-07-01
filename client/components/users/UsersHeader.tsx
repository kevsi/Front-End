import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UsersHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-2 sm:px-3 py-2 sm:py-3">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 sm:gap-3 lg:gap-0 lg:justify-between">
        {/* Left side - Greeting */}
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark font-poppins truncate">
          Hello, Proprio
        </h2>

        {/* Right side - Search, Notifications, Profile */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 sm:gap-3 lg:gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="flex-1 w-full lg:max-w-xl">
            <div className="flex items-center bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 gap-2 shadow-sm border border-gray-100">
              <Search className="w-3 h-3 sm:w-4 sm:h-4 text-dashboard-yellow flex-shrink-0" />
              <Input
                placeholder="What do you want eat today..."
                className="border-0 bg-transparent text-xs sm:text-sm text-dashboard-muted placeholder:text-dashboard-muted focus-visible:ring-0 focus-visible:ring-offset-0 font-poppins"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Notification Button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 p-0"
              >
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-dashboard-dark" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-dashboard-yellow rounded-full"></div>
              </Button>
            </div>

            {/* Profile Avatar */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/03a5b073e889d5771a326f1475d71863815812c5?width=120"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
