import { customerReview, headerCategoryMenu, SayItWithFlower, sliderImages, TrendingCollections } from "./HomeItem";
import { HeaderMenuItem } from "./Navbar";
import { Product } from "./Product";
import { User } from "./user";
import {subCategory} from "@/app/types/Category";
import {accordionItem} from "@/app/types/Types";

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiResponse {
  status: string;
  message: string;
  categories: HeaderMenuItem[];
  menu: headerCategoryMenu[];
  sliderImages: sliderImages[];
  trendingProducts: Product[];
  review: customerReview[];
  stickyHeader: boolean;
  headerLogo: string;
  token: string;
  user: User;
  code: number;
  name: string;
  subCategory: subCategory[];
  minPrice: number;
  maxPrice: number;
  data: Product[];
  metaDescription: string;
  catDescription: string;
  faqs: accordionItem[];
  trendingCollections: TrendingCollections[];
  sayItWithFlower: SayItWithFlower[];
}