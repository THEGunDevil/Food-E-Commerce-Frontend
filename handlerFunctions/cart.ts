import { CartItem, Product } from "@/models/models";
import axios from "axios";
import { UUID } from "crypto";
export const addToCart = async (product: Product,quantity:number) => {
  if (!product || Object.keys(product).length === 0) {
    return;
  } else {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add-items`,
        {
          menu_item_id: product.id,
          quantity: 1,
        },
      );
      const savedCartItems = localStorage.getItem("cart-items");
      const cartItems: CartItem[] = savedCartItems
        ? JSON.parse(savedCartItems)
        : [];
      let cartItem: CartItem = {
        id: product.id,
        quantity:quantity,
        category_name: product.category_name,
        name: product.name,
        image_url:
          product.images.find((img) => img.display_order === 1)?.image_url ||
          product.images[0]?.image_url,
        description: product.description,
        inStock: product.stock_quantity >= 1,
        stock_quantity: product.stock_quantity,
        originalPrice: product.price,
        price: product.discount_price,
      };
      cartItems.push(cartItem);
      localStorage.setItem("cart-items", JSON.stringify(cartItems));
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
};
export const removeItem = async (id: UUID) => {
  if (!id) {
    return;
  } else {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/remove-item/${id}`,
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
};
export const updateQuantity = async (id: UUID, quantity: number) => {
  if (!id || !quantity || quantity <= 0 || quantity >= 10) {
    return;
  } else {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/remove-item/${id}`,
        {
          quantity: quantity,
        },
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
};
