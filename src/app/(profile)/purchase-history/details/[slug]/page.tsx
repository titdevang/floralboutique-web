"use client";

import ProductDetailSkeleton from "@/app/components/ui/loader/ProductDetailSkeleton";
import { Product } from "@/app/types/Product";
import { apiRequest } from "@/app/utils/apiRequest";
import { use, useEffect, useState } from "react";

interface ProductProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function OrderDetail({ params }: ProductProps) {
  const { slug } = use(params);
  const pathname = `${slug}`;

  const [orderDetail, setOrderDetail] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiRequest(
          "GET",
          `/purchase-history/${pathname}`
        );
        if (response?.status === 200) {
          const data = response.data as Product;
          setOrderDetail(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (pathname) fetchProduct();
  }, [pathname]);

  if (!orderDetail) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div>
        Order detail page
    </div>
  );
}
