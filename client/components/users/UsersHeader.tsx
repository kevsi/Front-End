import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UsersHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Greeting */}
        <h2 className="text-4xl font-bold text-dashboard-dark font-poppins">
          Hello, Proprio
        </h2>

        {/* Right side - Search, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-[765px]">
            <div className="flex items-center bg-white rounded-2xl px-6 py-4 gap-2 shadow-sm border border-gray-100">
              <Search className="w-8 h-8 text-dashboard-yellow flex-shrink-0" />
              <Input
                placeholder="What do you want eat today..."
                className="border-0 bg-transparent text-lg text-dashboard-muted placeholder:text-dashboard-muted focus-visible:ring-0 focus-visible:ring-offset-0 font-poppins"
              />
            </div>
          </div>

          {/* Notification Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="w-[60px] h-[60px] bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50"
            >
              <Bell className="w-10 h-10 text-dashboard-dark" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-dashboard-yellow rounded-full"></div>
            </Button>
          </div>

          {/* Profile Avatar */}
          <div className="w-[60px] h-[60px] bg-gray-200 rounded-2xl flex items-center justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/03a5b073e889d5771a326f1475d71863815812c5?width=120"
              alt="Profile"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
