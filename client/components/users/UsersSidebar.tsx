import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users } from "lucide-react";

export function UsersSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
      active: false,
    },
    {
      icon: Users,
      label: "Utilisateurs",
      href: "/users",
      active: location.pathname === "/users",
    },
  ];

  return (
    <div className="w-[345px] bg-white h-screen flex-shrink-0">
      <div className="flex flex-col items-center gap-16 pt-10 px-12">
        {/* Logo */}
        <h1 className="text-[40px] font-normal text-dashboard-dark text-center leading-normal font-leckerli">
          Lounge Bar Le Cuivre
        </h1>

        {/* Menu Items */}
        <div className="flex flex-col gap-4 w-full">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-6 px-6 py-4 rounded-2xl transition-all duration-200",
                  item.active
                    ? "bg-dashboard-yellow shadow-[0px_20px_50px_rgba(46,46,46,0.05)]"
                    : "hover:bg-gray-50",
                )}
              >
                <IconComponent
                  className={cn(
                    "w-10 h-10",
                    item.active ? "text-white" : "text-black",
                  )}
                />
                <span
                  className={cn(
                    "text-lg font-medium font-poppins",
                    item.active ? "text-white" : "text-dashboard-muted",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
