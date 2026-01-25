"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Check,
  CreditCard,
  Lock,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator"; // Fixed Import
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export const CartButton = () => {
  const initialCartItems = [
    {
      id: 1,
      name: "Organic Hass Avocado",
      price: 3.49,
      originalPrice: 4.99,
      quantity: 2,
      image: "🥑",
      category: "Fresh Fruits",
      inStock: true,
    },
    {
      id: 2,
      name: "Greek Yogurt",
      price: 2.99,
      quantity: 1,
      image: "🥛",
      category: "Dairy & Eggs",
      inStock: true,
    },
    {
      id: 3,
      name: "Artisan Bread",
      price: 5.99,
      quantity: 1,
      image: "🥖",
      category: "Bakery",
      inStock: true,
    },
  ];

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 4.99,
      time: "3-5 business days",
    },
    {
      id: "express",
      name: "Express Delivery",
      price: 9.99,
      time: "1-2 business days",
    },
    { id: "free", name: "Free Delivery", price: 0, time: "5-7 business days" },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedDelivery, setSelectedDelivery] = useState("free");
  const router = useRouter();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryPrice =
      deliveryOptions.find((d) => d.id === selectedDelivery)?.price || 0;
    return subtotal + deliveryPrice;
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="justify-start flex rounded-lg hover:bg-accent transition-colors p-3 w-full">
          <ShoppingCart className="mr-3 h-5 w-5" />
          Cart
          <Badge className="ml-auto">3</Badge>
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
          <SheetDescription>
            {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
          </SheetDescription>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center h-[50vh]">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add some delicious items to get started!
            </p>
            <SheetClose asChild>
              <Button onClick={() => router.push("/shop")}>
                Start Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          <div className="mt-6 space-y-6 px-4">
            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="shrink-0">
                        <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center text-2xl">
                          {item.image}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold truncate pr-2">
                              {item.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.category}
                            </p>
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

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Delivery Options */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Delivery Method</h3>
              <RadioGroup
                value={selectedDelivery}
                onValueChange={setSelectedDelivery}
              >
                {deliveryOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedDelivery === option.id
                        ? "border-primary bg-primary/5"
                        : "hover:bg-accent"
                    }`}
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-medium">{option.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {option.time}
                          </div>
                        </div>
                        <div className="font-bold text-sm">
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

            {/* Order Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="font-medium">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
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

                <Separator className="my-2" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Security & Payment Info */}
            <Alert className="bg-muted/50 border-none">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <AlertDescription className="text-xs text-muted-foreground ml-2">
                Secure checkout &bull; SSL Encrypted &bull; All major cards
                accepted
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="space-y-3 pb-6">
              <Button
                className="w-full h-12 text-lg font-semibold"
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout
              </Button>

              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/")}
                >
                  Continue Shopping
                </Button>
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
