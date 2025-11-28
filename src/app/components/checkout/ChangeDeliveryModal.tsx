import React, { useState } from 'react'
import Modal from '../ui/modal/modal';
import ProductDetail from '../section/ProductDetailComponent';
import { Product } from '@/app/types/Product';

interface ChangeDeliveryModalProps {
    product: Product;
}

const ChangeDeliveryModal: React.FC<ChangeDeliveryModalProps> = ({
  product,
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className=" px-5 py-2 text-primary border border-gray text-sm font-medium rounded-full transition"
      >
        CHANGE
      </button>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        className="max-w-lg"
        title="Change delivery details"
      >
        <div>
          <ProductDetail productData={product} setOpenModal={setOpenModal} />
        </div>
      </Modal>
    </div>
  );
};

export default ChangeDeliveryModal