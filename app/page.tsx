"use client";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchAndFilter } from "@/components/search";
import { CategoryCard } from "@/components/category";
import { Category, FilterModel, Product } from "@/models/models";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryData, fetchMenuData } from "@/utils/utils";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/productCard";
// Mock data
// Bangladeshi Restaurant Filters
const filters: FilterModel[] = [
  { value: "all", label: "All" },
  { value: "spicy", label: "Spicy" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "halal", label: "Halal" },
  { value: "popular", label: "Most Popular" },
  { value: "chef-special", label: "Chef Special" },
  { value: "deserts", label: "Deserts" },
  { value: "under-300", label: "Under ৳300" },
];

const HomePage = () => {
  const router = useRouter();
  const {
    data: menuResponse,
    isLoading: menuLoading,
    isError: menuError,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: () => fetchMenuData(10, 1),
  });

  const {
    data: categoryResponse,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategoryData(),
  });
  const foodCategories = categoryResponse?.data as Category[] | [];
  const menuData = menuResponse?.data as Product[] | [];
  return (
    <main className="grow container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Fresh Food Delivered to Your Door
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover homemade, premium food, drinks and healthy essentials all in
          one place.
        </p>
      </div>

      {/* Search and Filter */}
      <SearchAndFilter filters={filters} />

      {/* Categories */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Shop by Category
          </h2>
          {foodCategories && foodCategories?.length > 10 && (
            <Button variant="link" className="gap-1">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {foodCategories?.map((category: Category) => (
            <div
              key={category.id}
              onClick={() => {
                router.push(`/categories/${category.id}`);
              }}
              className="cursor-pointer"
            >
              <CategoryCard
                category={category}
                categoryCount={foodCategories?.length}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Popular This Week
          </h2>
          <Button variant="link" className="gap-1">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuData?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <Card className="bg-linear-to-r from-primary to-primary/80 border-0 mb-12">
        <CardContent className="p-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Free Delivery on First Order!
            </h2>
            <p className="text-primary-foreground/90 mb-6">
              Sign up today and get free delivery on your first purchase. No
              minimum order required.
            </p>
            <Link href="/auth/sign-up">
              <Button variant="secondary" size="lg">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default HomePage;
