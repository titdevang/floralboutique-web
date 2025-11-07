export interface subCategory {

  id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
  productCount: number;
  subCategory: subCategory[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
  subCategory: subCategory[];

}

export interface FilterConfigItem {
    key: string;
    label: string;
    type: "checkbox" | "range" | "boolean" | "rating" | "date" | "switch";
    options?: { id: string; name: string, productCount: number }[];
    range?: { min: number; max: number };
    maxRating?: number;
}