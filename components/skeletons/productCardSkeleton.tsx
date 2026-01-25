import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <div className="relative">
          {/* Favorite button placeholder */}
          <div className="absolute right-0 top-0 z-10">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          {/* Image placeholder */}
          <div className="flex items-center justify-center h-48 mb-4 rounded-lg bg-muted">
            <Skeleton className="w-36 h-36 rounded-lg" />
          </div>
        </div>

        {/* Category badge */}
        <Skeleton className="h-5 w-24 mb-2 rounded-full" />

        {/* Product title */}
        <Skeleton className="h-5 w-3/4 mb-2" />

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded-sm" />
          ))}
          <Skeleton className="h-4 w-8 ml-2" />
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {/* Price */}
        <Skeleton className="h-7 w-24" />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Add to cart button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
};
