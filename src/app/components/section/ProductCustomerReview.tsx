import React from 'react';
import {Product} from "@/app/types/Product";
import ProductDetailCustomerReviewCarousel from "@/app/components/ui/slider/ProcuctDetailCustomerReviewCarousel";

interface ProductCustomerReviewProps {
    product: Product;
}

const ProductCustomerReview: React.FC<ProductCustomerReviewProps> = ({product}) => {
    return (
        <div className="my-10">
            <h3 className="heading-2 !text-xl !font-light mb-1">Loved by Our Customers</h3>
            <p className={"text-gray-dark mb-4 font-light"}>Real reviews. Honest opinions. Happy hearts</p>
            {product.totalReviews > 0 ? (
                <div>
                    <ProductDetailCustomerReviewCarousel review={product.reviews}/>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-dark">
                    <p className="text-lg font-medium">No reviews yet.</p>
                    <p className="text-sm">Be the first to review this product!</p>
                </div>
            )}
        </div>
    );
};

export default ProductCustomerReview;
