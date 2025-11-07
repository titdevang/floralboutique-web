export interface headerCategoryMenu {
  id: number;
  label: string;
  logo: string;
  link: string;
}

export type sliderImages = {
  id: number;
  image: string;
  alt: string;
  link: string;
};

export interface categoryMenu {
  id: number;
  name: string;
  slug?: string;
}

export interface customerReview {
  userName: string;
  comment: string;
  date: string;
  rating: number;
  timeAgo: string;
}