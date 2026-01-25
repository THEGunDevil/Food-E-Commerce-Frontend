"use client"
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ProductDetailsSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Column – Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square rounded-2xl overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-20 w-20 rounded-lg shrink-0"
            />
          ))}
        </div>

        {/* Mobile Highlights */}
        <div className="lg:hidden grid grid-cols-2 gap-4 mt-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6 text-center space-y-2">
                <Skeleton className="h-6 w-6 mx-auto rounded-full" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Column – Product Details */}
      <div className="space-y-6">
        {/* Category + Title */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-10 w-[70%]" />

          {/* Rating */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-6 w-20 rounded-full"
            />
          ))}
        </div>

        {/* Quantity & Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>

          {/* Stock Alert */}
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>

        {/* Desktop Highlights */}
        <div className="hidden lg:grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6 text-center space-y-2">
                <Skeleton className="h-6 w-6 mx-auto rounded-full" />
                <Skeleton className="h-4 w-24 mx-auto" />
                <Skeleton className="h-3 w-32 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
