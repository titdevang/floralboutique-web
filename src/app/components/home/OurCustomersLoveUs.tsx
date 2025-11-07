import React from 'react'
import CustomerReviewCarousel from '../ui/slider/CustomerReviewCarousel';
import { useHomeItem } from '@/app/context/HomeItemContext';

const OurCustomersLoveUs = () => {
  const { customerReview } = useHomeItem()
  return (
    <div>
      <h1 className="heading-2 mb-4">Customer Reviews</h1>
      <CustomerReviewCarousel review={customerReview} />
    </div>
  );
}

export default OurCustomersLoveUs