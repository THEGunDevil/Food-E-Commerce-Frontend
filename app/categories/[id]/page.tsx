"use client";
import { ProductCard } from "@/components/productCard";
import { Product } from "@/models/models";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "@/utils/utils";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";
export default function CategoriesPage() {
  const id = useParams().id;
  const {
    data: categoryResponse,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchProductsByCategory(id as string, 10, 1),
  });
  if (categoryError) {
    return <p className="text-red-500">Something went wrong</p>;
  }
  return (
    <>
      {categoryResponse?.data?.length > 0 && (
        <p className="text-muted-foreground italic text-sm mb-2">
          Search results: {categoryResponse?.data?.length}
        </p>
      )}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : categoryResponse?.data?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </section>
    </>
  );
}
