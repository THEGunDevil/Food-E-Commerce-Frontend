import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Check, Star, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { Review } from "@/models/models";

export const ReviewCard = ({
  review,
  onLike,
}: {
  review: Review;
  onLike: (id: number) => void;
}) => {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                {review.user.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold">{review.user}</h4>
                {review.verified && (
                  <Badge variant="outline" className="text-xs gap-1">
                    <Check className="h-3 w-3" />
                    Verified Purchase
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant={review.userLiked ? "default" : "outline"}
            size="sm"
            className="h-8 gap-1"
            onClick={() => onLike(review.id)}
          >
            <ThumbsUp className="h-3 w-3" />
            {review.helpful}
          </Button>
        </div>

        <p className="mt-4 text-sm sm:text-base">{review.comment}</p>
      </CardContent>
    </Card>
  );
};