"use client";
import { useState } from "react";
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
import { Product } from "@/models/models";
import { UUID } from "crypto";

// Full Cart Page Component
const CartPage = () => {
  const {
    data: cartResponse,
    isLoading: cartLoading,
    isError: cartError,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: () => fetchCartItems(),
  });
  const savedCartItems = localStorage.getItem("cartItems");
  let initialCartItems: Product[] = cartResponse;
  if (savedCartItems) {
    try {
      const parsed = JSON.parse(savedCartItems);
      initialCartItems = Array.isArray(parsed) ? parsed : cartResponse;
    } catch (error) {
      initialCartItems = cartResponse;
      console.error(error);
    }
  }
  console.log(initialCartItems);
  
  const [cartItems, setCartItems] = useState<Product[]>(initialCartItems);
  const [selectedDelivery, setSelectedDelivery] = useState("free");
  const router = useRouter();
  const updateQuantity = (id: UUID, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: UUID) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryPrice =
      deliveryOptions.find((d) => d.id === selectedDelivery)?.price || 0;
    return subtotal + deliveryPrice;
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="shrink-0">
                      <div className="h-24 w-24 rounded-xl bg-muted flex items-center justify-center">
                        <span className="text-4xl">{item.image}</span>
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
                            {item.category}
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
                          onClick={() => removeItem(item.id)}
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
                              updateQuantity(item.id, item.quantity - 1)
                            }
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
                              updateQuantity(item.id, item.quantity + 1)
                            }
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
                  {deliveryOptions.map((option) => (
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
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-3">
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
              </div>

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
