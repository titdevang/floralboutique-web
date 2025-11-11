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
}
