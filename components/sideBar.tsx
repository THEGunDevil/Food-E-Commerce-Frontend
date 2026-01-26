// components/SideBarNav.tsx
"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Bell,
  ChefHat,
  Heart,
  Home,
  LayoutDashboardIcon,
  LogOut,
  Settings,
  User,
  Utensils,
  Salad, // <-- extra icon option
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { useState } from "react";
import { LogoutDialog } from "./logOutDialogBox";
import { useAuth } from "@/contexts/authContext";

function SideBarNav() {
  // TODO: Replace with real user role
  const role: "admin" | "customer" | "staff" = "customer";
  const { logout } = useAuth();
  const [logOutDialogBox, setLogOutDialogBox] = useState<boolean>(false);

  const sidebarItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      href: "/",
      roles: ["admin", "customer", "staff"],
    },
    {
      icon: <Utensils className="h-5 w-5" />,
      label: "My Orders",
      href: "/my-orders",
      roles: ["customer", "admin"],
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Favorites",
      href: "/favorites",
      roles: ["customer"],
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Notifications",
      href: "/notifications",
      badge: 3,
      roles: ["admin", "customer", "staff"],
    },
    {
      icon: <Salad className="h-5 w-5" />,
      label: "Menu Management",
      href: "/menu-manager",
      roles: ["admin"],
    },
    {
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
      label: "Dashboard",
      href: "/dashboard",
      roles: ["admin"],
    },
  ];

  const accountItems = [
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      href: "/profile/:sfsd",
      roles: ["admin", "customer", "staff"],
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/settings",
      roles: ["admin", "customer"],
    },
    {
      icon: <LogOut className="h-5 w-5" />,
      label: "Logout",
      roles: ["admin", "customer", "staff"],
    },
  ];

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 h-screen border-r bg-background sticky top-0">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Himel's Foods</h1>
              <p className="text-sm text-muted-foreground">Food Delivery</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-1">
            {sidebarItems
              .filter((item) => item.roles.includes(role))
              .map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start gap-3 h-11"
                  asChild
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary">{item.badge}</Badge>
                    )}
                  </Link>
                </Button>
              ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-1">
            {accountItems
              .filter((item) => item.roles.includes(role))
              .map((item) =>
                item.label === "Logout" ? (
                  <Button
                    key={item.label}
                    onClick={() => setLogOutDialogBox(true)}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-11 flex items-center"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                ) : (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-11"
                    asChild
                  >
                    <Link href={item.href!} className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                ),
              )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t mt-auto">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>HM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">Himel Ahmed</p>
              <p className="text-sm text-muted-foreground">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>
      <LogoutDialog
        open={logOutDialogBox}
        onOpenChange={setLogOutDialogBox}
        onLogout={logout}
      />
    </>
  );
}

export default SideBarNav;
