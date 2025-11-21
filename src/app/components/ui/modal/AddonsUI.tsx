import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types/Product";
import { AddonCategory } from "@/app/types/Types";
import { apiRequest } from "@/app/utils/apiRequest";
import { getGuestToken } from "@/app/utils/cartToken";
import { Dispatch, SetStateAction, useState } from "react";

interface AddonsProps {
  data: AddonCategory[];
  setOpenAddOnModal: Dispatch<SetStateAction<boolean>>;
  cartId: number | null;
}

export default function AddonsUI({
  data,
  setOpenAddOnModal,
  cartId,
}: AddonsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<
    { id: number; price: number; quantity: number }[]
  >([]);

  const { setCartData, setMenuOpen, getCartData } = useCart();
  const { userAuthenticated } = useAuth();

  const addAddon = (id: number, price: number) => {
    setSelectedAddons((prev) => {
      const exist = prev.find((x) => x.id === id);

      if (exist) {
        return prev.map((x) =>
          x.id === id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }

      return [...prev, { id, price, quantity: 1 }];
    });
  };

  const decreaseAddon = (id: number) => {
    setSelectedAddons((prev) => {
      const exist = prev.find((x) => x.id === id);

      if (!exist) return prev;

      if (exist.quantity === 1) {
        return prev.filter((x) => x.id !== id);
      }

      return prev.map((x) =>
        x.id === id ? { ...x, quantity: x.quantity - 1 } : x
      );
    });
  };

  const handleSaveAddOnProduct = async () => {
    try {
      const payload = {
        cart_id: cartId,
        products: selectedAddons.map((item) => ({
          product_id: item.id,
          price: item.price,
          quantity: item.quantity,
        })),
      };
      const response = await apiRequest("POST", "/cart/add-addons", payload,{
              headers: userAuthenticated ? {} : { "X-Guest-Token": getGuestToken() },
            });
      // const addOnProductResponse = (response?.data as {data: Product})?.data;
      if(response?.status == 201) {
        setOpenAddOnModal(false);
        getCartData(); 
        setMenuOpen(true);
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="p-5 flex gap-2">
        {data.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm duration-300 ${
              activeTab === i
                ? "bg-primary text-white"
                : "hover:bg-soft-primary"
            }`}
          >
            {cat.addon_type}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="px-5 grid grid-cols-3 md:grid-cols-5 gap-4">
        {data[activeTab]?.products[0].map((item) => {
          const exist = selectedAddons.find((x) => x.id === item.id);

          return (
            <div
              key={item.id}
              className="border border-gray-light rounded-sm overflow-hidden shadow-sm p-3 text-center"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover rounded-sm"
              />

              <div className="mt-3 line-clamp-2 h-10">{item.name}</div>

              <div className="mt-2">₹ {item.finalPrice}</div>

              {/* ADD / + / - UI */}
              {!exist ? (
                <button
                  onClick={() => addAddon(item.id, item.finalPrice)}
                  className="mt-3 w-full py-2 rounded-sm text-sm font-semibold border border-primary text-primary"
                >
                  ADD
                </button>
              ) : (
                <div className="mt-3 flex items-center justify-center gap-2">
                  <button
                    onClick={() => decreaseAddon(item.id)}
                    className="w-8 h-8 flex items-center justify-center border border-primary text-primary"
                  >
                    -
                  </button>

                  <div className="w-8 text-center font-semibold">
                    {exist.quantity}
                  </div>

                  <button
                    onClick={() => addAddon(item.id, item.finalPrice)}
                    className="w-8 h-8 flex items-center justify-center border border-primary text-primary"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 flex justify-between p-2 px-10 gap-4 w-full bg-white rounded-lg">
        <button
          onClick={() => setOpenAddOnModal(false)}
          className="w-full py-4 bg-gray text-white rounded-sm font-semibold hover:opacity-100 opacity-75 duration-500"
        >
          Back to shopping
        </button>

        <button
          onClick={handleSaveAddOnProduct}
          disabled={selectedAddons.reduce(
            (total, item) => total + item.quantity,
            0
          ) == 0 ? true : false}
          className="w-full disabled:opacity-85 disabled:cursor-not-allowed py-4 bg-primary text-white rounded-sm font-semibold hover:bg-hov-primary duration-500"
        >
          Continue with (
          {selectedAddons.reduce((total, item) => total + item.quantity, 0)})
          addons
          {/* Continue with ({selectedAddons.length}) addons */}
        </button>
      </div>
    </div>
  );
}
