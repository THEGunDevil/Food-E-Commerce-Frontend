"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface reviewPayload {
  rating: number;
  comment: string;
}

export const ReviewForm = ({ menuId }: { menuId: string }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const reviewMutation = useMutation({
    mutationFn: async (payload: reviewPayload) => {
      const res = await axios.post(
        `${process.env.NODE_ENV}/reviews/menus/${menuId}`,
        payload
      );

      return res.data;
    },
    onSuccess: () => {
      setRating(0);
      setComment("");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") return;
    reviewMutation.mutate({ rating, comment });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <CardDescription>
          Share your experience with this product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Rating Selection */}
        <form onSubmit={handleSubmit}>
          <div>
            <Label className="mb-2 block">Your Rating *</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setRating(star)}
                  className="h-10 w-10"
                >
                  <Star
                    className={`h-5 w-5 ${
                      star <= rating
                        ? "fill-primary text-primary"
                        : "text-muted"
                    }`}
                  />
                </Button>
              ))}
            </div>
          </div>

          {/* Comment Input */}
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              placeholder="What did you think of this product? Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={reviewMutation.isPending || rating === 0 || comment.trim() === ""}
            className="w-full sm:w-auto mt-2"
          >
            {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
