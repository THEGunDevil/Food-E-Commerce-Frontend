"use client"
import { addToCart, removeItem, updateQuantity } from "@/handlerFunctions/cart";
import { Product } from "@/models/models";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export const useCart = () => {
  const router = useRouter()
  const addToCartMutate = useMutation({
    mutationFn: ({product,quantity}:{product: Product, quantity: number}) =>
      addToCart(product, quantity), // Use the regular function above
    onError: () => {
      console.error("failed to add cart item");
    },
    onSuccess:()=> router.push("/cart")
  });
  const removeFromCart = useMutation({
    mutationFn: (id: string) => removeItem(id),
    onError: () => {
      console.error("failed to remove item from cart");
    },
  });
  const updateItemQuantity = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateQuantity(id, quantity),
    onError: () => {
      console.error("there was an error updating items quantity");
    },
  });
  return {
    addToCartMutate,
    removeFromCart,
    updateItemQuantity,
  };
};
