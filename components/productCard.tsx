"use client";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Product } from "@/models/models";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/cart";
export default function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(product.favorite);
  const router = useRouter();
  const { addToCartMutate } = useCart();

  const handleAddToCart = (p: Product, quantity: number = 1) => {
    addToCartMutate.mutate({ product: p, quantity });
  };
  return (
    <Card
      onClick={() => {
        router.push("/details");
      }}
      className="group overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <CardHeader className="p-4 pb-2">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 z-10 h-8 w-8 bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? "fill-destructive text-destructive" : ""
              }`}
            />
          </Button>
          <div
            className={`flex items-center justify-center h-48 mb-4 rounded-lg ${
              product.category_name === "Fresh Fruits"
                ? "bg-red-50"
                : product.category_name === "Vegetables"
                  ? "bg-green-50"
                  : "bg-muted"
            }`}
          >
            <img
              src={product?.images[0].image_url}
              className="w-full h-full object-cover rounded-lg"
              alt={product.name}
            />
            {/* <Image priority width={100} fill
  className="object-cover rounded-lg"
  onError={(e) => {
    e.currentTarget.src = placeholder.src;
  }}
  priority
   height={100} src={category.cat_image_url} alt={category.name} /> */}{" "}
          </div>
        </div>
        <Badge variant="secondary" className="w-fit mb-2">
          {product.category_name}
        </Badge>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.average_rating)
                    ? "fill-primary text-primary"
                    : "text-muted"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              {product.average_rating}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product, 1);
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
