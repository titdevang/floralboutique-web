export type accordionItem = {
    title: string;
    content: string;
};

export interface Cities {
  id: number;
  name: string;
}

export interface AddonItem {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  unitPrice: number;
  finalPrice: number;
}

export interface AddonCategory {
  addon_type: string;
  products: AddonItem[][];
}

export interface SenderDetail {
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
}