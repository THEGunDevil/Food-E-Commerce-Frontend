"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  X,
  Check,
  Clock,
  Truck,
  CreditCard,
  Lock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "@/utils/utils";
import { CartItem } from "@/models/models";
import { useCart } from "@/hooks/cart";
import { UUID } from "crypto";
import { useAuth } from "@/contexts/authContext";
import Image from "next/image";
// Full Cart Page Component
const CartPage = () => {
  const { userID } = useAuth();
  const {
    data: cartResponse,
    isLoading: cartLoading,
    isError: cartError,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: () => fetchCartItems(),
  });
  const { removeFromCart, updateItemQuantity } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    if (cartResponse) {
      setCartItems(Array.isArray(cartResponse.data) ? cartResponse.data : []);
      return;
    }
  }, [cartResponse]);
  const [selectedDelivery, setSelectedDelivery] = useState("free");
  const handleQuantity = (id: UUID, q: number) => {
    updateItemQuantity.mutate({ id, quantity: q });
  };
  const router = useRouter();
  const itemCount = cartItems.length;
  console.log(cartResponse);

  if (cartLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Loading Cart...</h1>
        </div>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Error Loading Cart</h1>
          <p className="text-muted-foreground mb-8">
            There was an issue fetching your cart items. Please try again.
          </p>
          <Button size="lg" onClick={() => router.push("/shop")}>
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any delicious items to your cart yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/shop")}>
              Start Shopping
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="hidden sm:flex"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
        <Badge variant="secondary" className="ml-auto">
          {itemCount} item{itemCount !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="shrink-0">
                      <div className="h-24 w-24 rounded-xl bg-muted flex items-center justify-center">
                        {item?.image?.map((i) => {
                          if (i.is_primary) {
                            return (
                              <Image
                                key={i.id}
                                src={i.image_url}
                                alt={item.name}
                                className="h-full w-full object-cover rounded-xl"
                                width={96} // Explicit width/height for Next.js Image optimization (adjust based on h-24 w-24, e.g., 96px for 24*4 assuming 1rem=16px)
                                height={96}
                                priority={false} // Optional: Set to true if this is above-the-fold
                              />
                            );
                          }
                          return null; // Skip non-primary images
                        })}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.category_name}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">
                              ${item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-muted-foreground line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeFromCart.mutate(item.menu_item_id)
                          }
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleQuantity(
                                item.menu_item_id,
                                item.quantity - 1,
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="h-9 w-9"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center text-lg font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleQuantity(
                                item.menu_item_id,
                                item.quantity + 1,
                              )
                            }
                            disabled={item.quantity >= 10}
                            className="h-9 w-9"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Shopping Button */}
          <div className="mt-8">
            <Button variant="outline" onClick={() => router.push("/shop")}>
              <Plus className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Delivery Options */}
              <div className="space-y-3">
                <h3 className="font-semibold">Delivery Options</h3>
                <RadioGroup
                  value={selectedDelivery}
                  onValueChange={setSelectedDelivery}
                >
                  {/* {deliveryOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center w-full space-x-2"
                    >
                      <RadioGroupItem
                        value={option.id}
                        id={`full-${option.id}`}
                      />
                      <Label
                        htmlFor={`full-${option.id}`}
                        className="flex-1 cursor-pointer p-3 rounded-lg border hover:bg-accent"
                      >
                        <div className="flex justify-between w-full items-center">
                          <div>
                            <div className="font-medium">{option.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {option.time}
                            </div>
                          </div>
                          <div className="font-bold">
                            {option.price === 0
                              ? "FREE"
                              : `$${option.price.toFixed(2)}`}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))} */}
                </RadioGroup>
              </div>

              <Separator />

              {/* Price Breakdown */}
              {/* <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="font-medium">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">
                    {deliveryOptions.find((d) => d.id === selectedDelivery)
                      ?.price === 0
                      ? "FREE"
                      : `$${deliveryOptions
                          .find((d) => d.id === selectedDelivery)
                          ?.price.toFixed(2)}`}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div> */}

              {/* Security Info */}
              <Alert className="bg-green-50 border-green-200">
                <Lock className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    <span>Secure SSL encryption</span>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full h-12 text-lg"
                onClick={() => router.push("/checkout")}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
