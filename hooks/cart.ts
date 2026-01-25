import { addToCart } from "@/handlerFunctions/cart";
import { useMutation } from "@tanstack/react-query";

export const useCart = () => {
  const addToCartMutate = useMutation({
    mutationFn: addToCart, // Use the regular function above
    onError: () => {
      console.error("failed to add cart item");
    },
  });
  return {
    addToCartMutate,
  };
};
