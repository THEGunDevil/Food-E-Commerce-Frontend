"use client"

import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ReviewCardSkeleton = () => {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          {/* Left: Avatar + User Info */}
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <Skeleton className="h-10 w-10 rounded-full" />

            <div className="space-y-2">
              {/* Username + badge */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>

              {/* Rating + date */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>

          {/* Helpful button */}
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>

        {/* Comment text */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>
      </CardContent>
    </Card>
  );
};
