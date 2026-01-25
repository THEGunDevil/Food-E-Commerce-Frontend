// components/menu/TopDishes.tsx
"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  ChefHat,
  Flame,
  Star,
  Clock,
  DollarSign,
  MoreVertical,
  Filter,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Dish {
  id: string;
  name: string;
  category: string;
  price: number;
  sales: number;
  revenue: number;
  trend: number;
  rating: number;
  prepTime: number;
  spicyLevel: 0 | 1 | 2 | 3;
  isVegetarian: boolean;
  isSpecial: boolean;
  image?: string;
}

const initialDishes: Dish[] = [
  {
    id: "1",
    name: "Kacchi Biryani (Mutton)",
    category: "biriyani",
    price: 450,
    sales: 156,
    revenue: 70200,
    trend: 25,
    rating: 4.8,
    prepTime: 45,
    spicyLevel: 2,
    isVegetarian: false,
    isSpecial: true,
    image: "/api/placeholder/400/300",
  },
  {
    id: "2",
    name: "Chicken Roast",
    category: "meat",
    price: 280,
    sales: 124,
    revenue: 34720,
    trend: 12,
    rating: 4.5,
    prepTime: 30,
    spicyLevel: 1,
    isVegetarian: false,
    isSpecial: false,
    image: "/api/placeholder/400/300",
  },
  {
    id: "3",
    name: "Beef Tehari",
    category: "biriyani",
    price: 320,
    sales: 98,
    revenue: 31360,
    trend: 18,
    rating: 4.6,
    prepTime: 40,
    spicyLevel: 3,
    isVegetarian: false,
    isSpecial: false,
    image: "/api/placeholder/400/300",
  },
  {
    id: "4",
    name: "Prawn Malai Curry",
    category: "fish",
    price: 380,
    sales: 76,
    revenue: 28880,
    trend: 8,
    rating: 4.7,
    prepTime: 35,
    spicyLevel: 1,
    isVegetarian: false,
    isSpecial: true,
    image: "/api/placeholder/400/300",
  },
  {
    id: "5",
    name: "Firni",
    category: "desserts",
    price: 80,
    sales: 142,
    revenue: 11360,
    trend: 32,
    rating: 4.9,
    prepTime: 20,
    spicyLevel: 0,
    isVegetarian: true,
    isSpecial: false,
    image: "/api/placeholder/400/300",
  },
  {
    id: "6",
    name: "Mixed Vegetable",
    category: "vegetable",
    price: 120,
    sales: 89,
    revenue: 10680,
    trend: 5,
    rating: 4.3,
    prepTime: 25,
    spicyLevel: 1,
    isVegetarian: true,
    isSpecial: false,
    image: "/api/placeholder/400/300",
  },
  {
    id: "7",
    name: "Chicken Tikka",
    category: "meat",
    price: 220,
    sales: 67,
    revenue: 14740,
    trend: 15,
    rating: 4.4,
    prepTime: 30,
    spicyLevel: 2,
    isVegetarian: false,
    isSpecial: false,
    image: "/api/placeholder/400/300",
  },
  {
    id: "8",
    name: "Borhani",
    category: "drinks",
    price: 120,
    sales: 183,
    revenue: 21960,
    trend: 28,
    rating: 4.7,
    prepTime: 5,
    spicyLevel: 1,
    isVegetarian: true,
    isSpecial: false,
    image: "/api/placeholder/400/300",
  },
];

export default function TopDishes() {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [sortBy, setSortBy] = useState<"sales" | "revenue" | "rating">("sales");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "weekly"
  );

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "biriyani", label: "Biriyani", color: "bg-red-100 text-red-800" },
    {
      value: "meat",
      label: "Meat Dishes",
      color: "bg-orange-100 text-orange-800",
    },
    { value: "fish", label: "Fish", color: "bg-blue-100 text-blue-800" },
    {
      value: "vegetable",
      label: "Vegetable",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "desserts",
      label: "Desserts",
      color: "bg-purple-100 text-purple-800",
    },
    { value: "drinks", label: "Drinks", color: "bg-cyan-100 text-cyan-800" },
  ];

  const getCategoryBadge = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    if (!cat) return null;
    return (
      <Badge variant="secondary" className={cat.color}>
        {cat.label}
      </Badge>
    );
  };

  const getSpicyLevel = (level: number) => {
    const levels = [
      { label: "No Spice", color: "text-gray-400" },
      { label: "Mild", color: "text-green-600" },
      { label: "Medium", color: "text-yellow-600" },
      { label: "Spicy", color: "text-red-600" },
    ];
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Flame
            key={i}
            className={`h-3 w-3 ${
              i < level ? levels[level].color : "text-gray-300"
            }`}
            fill={i < level ? "currentColor" : "none"}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">
          {levels[level].label}
        </span>
      </div>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTrendIcon = (trend: number) => {
    if (trend >= 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-3 w-3 mr-1" />
          <span className="text-xs font-medium">+{trend}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="h-3 w-3 mr-1" />
          <span className="text-xs font-medium">{trend}%</span>
        </div>
      );
    }
  };

  const sortedDishes = [...dishes]
    .filter(
      (dish) => categoryFilter === "all" || dish.category === categoryFilter
    )
    .sort((a, b) => {
      if (sortBy === "sales") return b.sales - a.sales;
      if (sortBy === "revenue") return b.revenue - a.revenue;
      return b.rating - a.rating;
    })
    .slice(0, viewMode === "grid" ? 8 : 6);

  // Stats
  const totalRevenue = dishes.reduce((sum, dish) => sum + dish.revenue, 0);
  const totalSales = dishes.reduce((sum, dish) => sum + dish.sales, 0);
  const avgPrice =
    dishes.reduce((sum, dish) => sum + dish.price, 0) / dishes.length;
  const topCategory = dishes.reduce((acc, dish) => {
    acc[dish.category] = (acc[dish.category] || 0) + dish.sales;
    return acc;
  }, {} as Record<string, number>);

  const topCategoryName =
    Object.entries(topCategory).sort(([, a], [, b]) => b - a)[0]?.[0] || "";

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              Top Performing Dishes
            </CardTitle>
            <CardDescription>
              Best-selling items and performance metrics
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Tabs
              value={viewMode}
              onValueChange={(v) => setViewMode(v as "grid" | "list")}
            >
              <TabsList className="h-9">
                <TabsTrigger value="grid" className="text-xs">
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list" className="text-xs">
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Select
              value={timeRange}
              onValueChange={(v: "daily" | "weekly" | "monthly") =>
                setTimeRange(v)
              }
            >
              <SelectTrigger className="h-9 w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingCart className="h-3 w-3 text-blue-600" />
              <p className="text-xs text-blue-700">Total Sales</p>
            </div>
            <p className="text-xl font-bold text-gray-900">{totalSales}</p>
            <p className="text-xs text-gray-500">Items sold</p>
          </div>

          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-3 w-3 text-green-600" />
              <p className="text-xs text-green-700">Total Revenue</p>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(totalRevenue)}
            </p>
            <p className="text-xs text-gray-500">From {dishes.length} dishes</p>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-3 w-3 text-purple-600" />
              <p className="text-xs text-purple-700">Avg. Price</p>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(avgPrice)}
            </p>
            <p className="text-xs text-gray-500">Per dish</p>
          </div>

          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-3 w-3 text-orange-600" />
              <p className="text-xs text-orange-700">Top Category</p>
            </div>
            <p className="text-xl font-bold text-gray-900 capitalize">
              {topCategoryName || "N/A"}
            </p>
            <p className="text-xs text-gray-500">Highest sales</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">
                Sort By
              </label>
              <Select
                value={sortBy}
                onValueChange={(v: "sales" | "revenue" | "rating") =>
                  setSortBy(v)
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Most Sales</SelectItem>
                  <SelectItem value="revenue">Highest Revenue</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">
                Category
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-end">
            <Button variant="outline" size="sm" className="gap-2 h-9">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedDishes.map((dish) => (
              <div
                key={dish.id}
                className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <ChefHat className="h-12 w-12 text-gray-300" />
                    </div>
                  </div>

                  <div className="absolute top-2 right-2">
                    {dish.isSpecial && (
                      <Badge className="bg-orange-500 text-white">
                        Special
                      </Badge>
                    )}
                    {dish.isVegetarian && (
                      <Badge className="bg-green-500 text-white absolute top-10 right-2">
                        Veg
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm line-clamp-1">
                      {dish.name}
                    </h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mt-1 -mr-2"
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Dish</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-green-600">
                          Restock
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Price</span>
                      <span className="font-bold">
                        {formatCurrency(dish.price)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Sales</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{dish.sales}</span>
                        {getTrendIcon(dish.trend)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Revenue</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(dish.revenue)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-500 fill-current" />
                        <span className="text-xs font-medium">
                          {dish.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between">
                      {getSpicyLevel(dish.spicyLevel)}
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="h-3 w-3" />
                        {dish.prepTime} min
                      </div>
                    </div>
                    <div className="mt-2">
                      {getCategoryBadge(dish.category)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="space-y-3">
            {sortedDishes.map((dish, index) => (
              <div
                key={dish.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 group"
              >
                <div className="hidden sm:flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 rounded-lg">
                        <AvatarFallback>
                          <ChefHat className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{dish.name}</h4>
                          {dish.isSpecial && (
                            <Badge
                              variant="outline"
                              className="border-orange-300 text-orange-600 text-xs"
                            >
                              Special
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {getCategoryBadge(dish.category)}
                          <span className="text-xs text-gray-600">
                            {getSpicyLevel(dish.spicyLevel)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Price</p>
                        <p className="font-bold">
                          {formatCurrency(dish.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Sales</p>
                        <div className="flex items-center justify-end gap-1">
                          <p className="font-medium">{dish.sales}</p>
                          {getTrendIcon(dish.trend)}
                        </div>
                      </div>
                      <div className="text-right hidden md:block">
                        <p className="text-xs text-gray-600">Revenue</p>
                        <p className="font-medium text-green-600">
                          {formatCurrency(dish.revenue)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-500 fill-current" />
                        <span className="text-sm font-medium">
                          {dish.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">rating</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-sm">{dish.prepTime} min</span>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                      {dish.isVegetarian ? (
                        <Badge
                          variant="outline"
                          className="border-green-300 text-green-700"
                        >
                          Vegetarian
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-red-300 text-red-700"
                        >
                          Non-Veg
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 gap-1">
                          <Eye className="h-3 w-3" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button size="sm" className="h-8 gap-1">
                          <ShoppingCart className="h-3 w-3" />
                          <span className="hidden sm:inline">Order</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Performance Summary */}
        <div className="mt-8 pt-6 border-t">
          <h4 className="font-semibold mb-4">Performance Summary</h4>
          <div className="space-y-4">
            {sortedDishes.slice(0, 3).map((dish) => (
              <div key={dish.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{dish.name}</span>
                    <span className="text-xs text-gray-600">
                      ({dish.category})
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      {dish.sales} sales
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {formatCurrency(dish.revenue)}
                    </span>
                  </div>
                </div>
                <Progress
                  value={(dish.sales / totalSales) * 100}
                  className={`${dish.trend >= 20
                      ? "bg-green-500"
                      : dish.trend >= 10
                      ? "bg-blue-500"
                      : dish.trend >= 0
                      ? "bg-amber-500"
                      : "bg-red-500"} h-2`
                    
                  }
                />
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold">Best Seller</p>
              <p className="text-primary mt-1">{sortedDishes[0]?.name}</p>
              <p className="text-xs text-gray-600">
                {sortedDishes[0]?.sales} sales
              </p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold">Highest Revenue</p>
              <p className="text-green-600 mt-1">
                {formatCurrency(sortedDishes[0]?.revenue || 0)}
              </p>
              <p className="text-xs text-gray-600">{sortedDishes[0]?.name}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold">Top Rated</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="h-4 w-4 text-amber-500 fill-current" />
                <span>
                  {sortedDishes.sort((a, b) => b.rating - a.rating)[0]?.rating}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {sortedDishes.sort((a, b) => b.rating - a.rating)[0]?.name}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
