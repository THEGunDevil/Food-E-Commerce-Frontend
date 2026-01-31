
export type Product = {
  id: string;
  category_name: string;
  category_id: string;
  name: string;
  description: string;
  discount_price: number;
  tags: string[];
  stock_quantity: number;
  price: number;
  average_rating: number;
  images: [
    {
      display_order: number;
      id: string;
      image_public_id: string;
      image_url: string;
    },
  ];
  favorite: boolean;
};
export type CartItem = {
  cart_id: string;
  menu_item_id: string;
  category_name: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  line_subtotal: number;
  quantity: number;
  inStock: boolean;
  stock_quantity?: number;
  image: [
    {
      display_order: number;
      id: string;
      image_url: string;
      is_primary: boolean;
    },
  ];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  cat_image_url: string;
  cat_image_public_id: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FilterModel = {
  value: string;
  label: string;
};
export interface DeliveryOption {
  id: string; // unique identifier
  name: string; // display name
  price: number; // delivery price
  time: string; // estimated delivery time
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  userLiked: boolean;
  userImage?: string;
  verified: boolean;
}
export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  category: string;
  images: string[];
  inStock: boolean;
  weightOptions: string[];
  nutrition: {
    calories: string;
    fat: string;
    carbs: string;
    protein: string;
    fiber: string;
  };
  tags: string[];
  deliveryInfo: string;
  storageTips: string;
  origin: string;
  shelfLife: string;
  allergens: string[];
}
export interface RatingDistribution {
  stars: 1 | 2 | 3 | 4 | 5; // only valid star ratings
  count: number; // number of reviews
  percentage: number; // percentage of total reviews
}

export interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number; // e.g., 4.5
}
