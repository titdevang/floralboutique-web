export interface ProductCardProps {
  product: Product;
  categoryName: string;
  onClick?: () => void;
}

export interface ProductsProps {
  products: Product[];
  categoryName: string;
}

export interface ProductProps {
  product: Product;
}

export type CategorizedProducts = {
  [categoryName: string]: Product[];
};

export interface MultiCategoryCarouselProps {
  productsByCategory: CategorizedProducts;
}


export interface ProductPhoto {
  imageUrl: string;
  altTag: string;
}

export interface ProductTax {
  tax_type: string;
  tax: number;
}

export interface ProductDiscount {
  discount_type: string;
  discount: number;
  discount_start_date: string | null;
  discount_end_date: string | null;
}

export interface ProductReview {
  userName: string;
  rating: number;
  comment: string;
  date: string;
  timeAgo: string;
}

export interface DeliverySlot {
  date: string;
  time: string;
  type: string;
  cost: number;
}


export interface Product {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  photos: ProductPhoto[];
  description: string;
  unitPrice: number;
  finalPrice: number;
  stockQty: number;
  taxes: ProductTax[];
  discount: ProductDiscount;
  rating: number;
  totalReviews: number;
  reviews: ProductReview[];
  isWholesaleProduct: boolean;
  productInfo: string;
  moreInfo: string;
  quantity: number;
  thumbnail_img?: string;
  cart_id: number;
  deliverySlot?: DeliverySlot;
  city_id: string;
  pin_code: string;
  date?: string;
  delivery_id: number | null;
  time_slot_id: number | null;
  tax: number;
  pincode: string;
  deliveryDate: string;
  deliveryTypeId: number | null;
  deliveryTimeSlot: string;
  cutoff_time: string;
  delivery_type: string;
  delivery_price: number;
  city: string;
  deliveryTimeSlotId: number;
  isPanIndia: number;
}

export interface DeliveryMethod {
  id: number;
  custom_shipping: number;
  name: string;
  price: number;
}

export interface DeliveryTimeSlot {
  id: number;
  start_time: string;
  time_slots: string;
}

