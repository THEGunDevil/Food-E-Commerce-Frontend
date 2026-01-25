"use client";
import {
  Home,
  Heart,
  ShoppingCart,
  Menu,
  Utensils,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { CartButton } from "./cart";
import Link from "next/link";
import BreadCrumb from "./breadCrumb";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button> */}

            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">H</span>
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:inline">
                Himel'sFoods
              </span>
            </Link>
          </div>
          <BreadCrumb />

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Desktop Cart Trigger */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {/* {itemCount > 0 && ( */}
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary">
                  {4}
                </Badge>
                {/* )} */}
              </Button>
            </Link>

            {/* Mobile menu Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
                {/* Header */}
                <div className="p-6 border-b">
                  <Link href="/" className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center">
                      <span className="text-white font-bold">H</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">Himel's Foods</h1>
                      <p className="text-sm text-muted-foreground">
                        Food Delivery
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Navigation Items */}
                <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                  <div className="space-y-1">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Home className="h-5 w-5" />
                        <span>Home</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Utensils className="h-5 w-5" />
                        <span>My Orders</span>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/favorites"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Heart className="h-5 w-5" />
                          <span>Favorites</span>
                        </div>
                        <Badge variant="secondary">3</Badge>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/notifications"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5" />
                          <span>Notifications</span>
                        </div>
                        <Badge variant="secondary">3</Badge>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/menu-manager"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5" />
                          <span>Menu Management</span>
                        </div>
                        <Badge variant="secondary">3</Badge>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5" />
                          <span>Dashboard</span>
                        </div>
                      </Link>
                    </SheetClose>

                    {/* <SheetClose asChild>
                      <Link
                        href="/offers"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Percent className="h-5 w-5" />
                        <span>Offers</span>
                      </Link>
                    </SheetClose> */}
                  </div>

                  <Separator className="my-4" />

                  {/* Account Section */}
                  <div className="space-y-1">
                    <SheetClose asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
                    </SheetClose>
                    <CartButton />
                    <SheetClose asChild>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/logout"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </Link>
                    </SheetClose>
                  </div>
                </div>

                {/* User Profile at Bottom */}
                <div className="p-4 border-t mt-auto">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>HM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Himel Ahmed</p>
                      <p className="text-sm text-muted-foreground">
                        Premium Member
                      </p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
