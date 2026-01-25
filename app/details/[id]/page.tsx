"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  ChevronLeft,
  Clock,
  Truck,
  Shield,
  Check,
  Leaf,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, RatingDistribution, Review } from "@/models/models";
import { ReviewForm } from "@/components/reviewForm";
import { ReviewCard } from "@/components/reviewCard";
import { fetchProductById, fetchProductReviews } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { ReviewCardSkeleton } from "@/components/skeletons/reviewCardSkeleton";
import { ProductDetailsSkeleton } from "@/components/skeletons/productDetailSkeleton";

const ratingDistribution: RatingDistribution[] = [
  { stars: 5, count: 89, percentage: 70 },
  { stars: 4, count: 25, percentage: 20 },
  { stars: 3, count: 8, percentage: 6 },
  { stars: 2, count: 3, percentage: 2 },
  { stars: 1, count: 3, percentage: 2 },
];


export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  console.log(id);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {};

  const handleReviewLike = (reviewId: number) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              userLiked: !review.userLiked,
              helpful: review.userLiked
                ? review.helpful - 1
                : review.helpful + 1,
            }
          : review
      )
    );
  };

  const {
    data: productResponse,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id as string),
  });
  const {
    data: reviewsResponse,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchProductReviews(id as string, 10, 1),
  });
  const product = productResponse?.data as Product;
  const [reviews, setReviews] = useState<Review[]>(reviewsResponse?.data || []);
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalHelpfulCount = reviews.reduce(
    (acc, review) => acc + review.helpful,
    0
  );
  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>

      <main className="container mx-auto sm:px-4 py-4 sm:py-6 md:py-8">
        {/* Product Grid */}
        {productError ? (
          <Alert>
            <AlertDescription>
              An error occurred while loading the product.
            </AlertDescription>
          </Alert>
        ) : (
          <></>
        )}
        {productLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-2xl bg-muted flex items-center justify-center relative">
                <div className="text-8xl md:text-9xl">🥑</div>
                <Badge className="absolute top-4 left-4">Fresh</Badge>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 w-20 h-20 rounded-lg border-2 flex items-center justify-center transition-all ${
                      selectedImage === index
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-2xl">🥑</div>
                  </button>
                ))}
              </div>

              {/* Product Highlights - Mobile Only */}
              <div className="lg:hidden grid grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Leaf className="h-6 w-6 mx-auto text-green-600 mb-2" />
                    <p className="text-sm font-medium">100% Organic</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Award className="h-6 w-6 mx-auto text-amber-600 mb-2" />
                    <p className="text-sm font-medium">Premium Quality</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <Badge variant="secondary" className="mb-3">
                  {product.category}
                </Badge>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(averageRating)
                            ? "fill-primary text-primary"
                            : "text-muted"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <button
                      onClick={() =>
                        document
                          .getElementById("reviews")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {reviews.length} reviews
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant="destructive" className="ml-2">
                    Save 30%
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  Price per piece
                </p>
              </div>

              {/* Product Description */}
              <p className="text-muted-foreground">{product.description}</p>

              {/* Product Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="quantity" className="text-sm font-medium">
                      Quantity
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-10 w-10"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="w-20 h-10 text-center"
                      />

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-10 w-10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="lg"
                      className="flex-1 sm:flex-none gap-2"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      variant={isFavorite ? "default" : "outline"}
                      size="lg"
                      className="gap-2"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isFavorite ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </div>

                {/* {product.stock_quantity > 0 ? (
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    In stock • {product.deliveryInfo}
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertDescription>
                    Out of stock • Check back soon!
                  </AlertDescription>
                </Alert>
              )} */}
              </div>

              {/* Product Highlights - Desktop Only */}
              <div className="hidden lg:grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Truck className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-muted-foreground">Over $30</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Clock className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Fresh Daily</p>
                    <p className="text-xs text-muted-foreground">
                      Direct from farm
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Shield className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Quality Guarantee</p>
                    <p className="text-xs text-muted-foreground">
                      100% satisfaction
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Product Tabs Section */}
        <div className="mt-12" id="details">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-1 lg:w-auto">
              {/* <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger> */}
              <TabsTrigger value="reviews" className="w-full">
                Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>

            {/* <TabsContent value="description" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                    <p className="text-muted-foreground">{product.longDescription}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Origin</p>
                        <p className="text-sm text-muted-foreground">{product.origin}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Thermometer className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Shelf Life</p>
                        <p className="text-sm text-muted-foreground">{product.shelfLife}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium">Storage</p>
                        <p className="text-sm text-muted-foreground">{product.storageTips}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'Rich in healthy monounsaturated fats',
                      'Excellent source of fiber for digestive health',
                      'Packed with vitamins C, E, K, and B-6',
                      'Contains potassium and folate for heart health',
                      'Natural antioxidant properties',
                      'Supports skin health and hydration'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Facts</CardTitle>
                  <CardDescription>Per 100g serving</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(product.nutrition).map(([key, value]) => (
                      <div key={key} className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold">{value}</p>
                        <p className="text-sm text-muted-foreground uppercase">{key}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Allergen Information</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.allergens.map((allergen) => (
                        <Badge key={allergen} variant="outline" className="gap-1">
                          <Check className="h-3 w-3" />
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}

            <TabsContent value="reviews" className="mt-6" id="reviews">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Reviews Summary */}
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold mb-2">
                          {averageRating.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(averageRating)
                                  ? "fill-primary text-primary"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {reviews.length} total reviews
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {totalHelpfulCount} helpful votes
                        </p>
                      </div>

                      <div className="space-y-3">
                        {ratingDistribution.map((dist) => (
                          <div
                            key={dist.stars}
                            className="flex items-center gap-2"
                          >
                            <div className="flex items-center gap-1 w-16">
                              <span className="text-sm">{dist.stars}</span>
                              <Star className="h-3 w-3 fill-primary text-primary" />
                            </div>
                            <Progress
                              value={dist.percentage}
                              className="h-2 flex-1"
                            />
                            <span className="text-sm w-8 text-right">
                              {dist.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <ReviewForm menuId={id as string} />
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Customer Reviews
                      </h3>
                      <Select defaultValue="newest">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="highest">
                            Highest Rating
                          </SelectItem>
                          <SelectItem value="lowest">Lowest Rating</SelectItem>
                          <SelectItem value="helpful">Most Helpful</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {!reviewsLoading && reviewsError && (
                      <p className="text-sm text-center text-destructive">
                        Failed to load reviews. Please try again.
                      </p>
                    )}
                    {reviewsLoading ? (
                      <ReviewCardSkeleton />
                    ) : reviews.length === 0 ? (
                      <p>No reviews found.</p>
                    ) : (
                      reviews.map((review) => (
                        <ReviewCard
                          key={review.id}
                          review={review}
                          onLike={handleReviewLike}
                        />
                      ))
                    )}
                  </div>

                  <div className="mt-8 text-center">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">
              You May Also Like
            </h2>
            <Button variant="link" onClick={() => router.push("/shop")}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item: Product) => (
              <Card
                key={item.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                    <div className="text-4xl">{item.image}</div>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="font-bold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-xs">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
