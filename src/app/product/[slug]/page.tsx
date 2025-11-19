"use client";

import ImageWithFallback from "@/app/components/ui/fields/ImageWithFallback";
import PincodeDropdown from "@/app/components/ui/fields/PincodeDropdown";
import ProductTabs from "@/app/components/ui/ProductTabs";
import ZoomImage from "@/app/components/ui/ZoomImage";
import ProductDetailSkeleton from "@/app/components/ui/loader/ProductDetailSkeleton";
import { DeliveryMethod, DeliveryTimeSlot, Product } from "@/app/types/Product";
import { apiRequest } from "@/app/utils/apiRequest";
import { use, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SvgIcon from "@/app/components/ui/SvgIcon";
import ProductCustomerReview from "@/app/components/section/ProductCustomerReview";
import ProductDetailMultiCarousel from "@/app/components/section/ProductDetailMultiCarousel";
import { useCart } from "@/app/context/CartContext";
import Modal from "@/app/components/ui/modal/modal";
import Image from "next/image";
import CitiesDropdown from "@/app/components/ui/fields/CitiesDropdown";
import { useLocation } from "@/app/context/LocationContext";
import { Cities } from "@/app/types/Types";
import { getDate } from "@/app/lib/getDate";
import DatePickerPopup from "@/app/components/common/fields/DatePickerPopup";
import { ApiResponse } from "@/app/types/ApiRequest";
import SelectField from "@/app/components/common/fields/SelectField";

interface ProductProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ProductDetail({ params }: ProductProps) {
  const { slug } = use(params);
  const pathname = `${slug}`;

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [productGalleryOpen, setProductGalleryOpen] = useState(false);
  const [cities, setCities] = useState<Cities[]>([]);
  const [selecteDate, setSelectDate] = useState<string | undefined>("");
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([]);
  const [deliveryTimeSlots, setDeliveryTimeSlots] = useState<
    DeliveryTimeSlot[]
  >([]);
  const [deliveryId, setDeliveryId] = useState<number | null>(null);
  const [deliveryTimeSlotId, setDeliveryTimeSlotId] = useState<number | null>(
    null
  );
  const { addToCart } = useCart();
  const { selectCities, selectPincode, selectCitieName } = useLocation();

  useEffect(() => {
    setDeliveryId(null);
    setDeliveryMethods([]);
    setDeliveryTimeSlotId(null);
    setDeliveryTimeSlots([]);
    setSelectDate("");
  }, [selectPincode]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiRequest("GET", `/product/${pathname}`);
        const getCities = await apiRequest("GET", "/cities");
        if (response?.status === 200) {
          const data = response.data as Product;
          setProduct(data);
          setMainImage(data.imageUrl);
        }

        if (getCities?.status == 200) {
          setCities((getCities?.data as { data: Cities[] })?.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    };

    if (pathname) fetchProduct();
  }, [pathname]);

  const fetchDeliveryMethods = async (data: string | undefined) => {
    try {
      const response = await apiRequest<ApiResponse>(
        "GET",
        `/products/${pathname}/delivery-methods?city_id=${selectCities}&pin_code=${selectPincode}&date=${data}`
      );
      if (response?.status === 200 && response.data) {
        setDeliveryMethods((response.data as unknown as { data: DeliveryMethod[] }).data);
      } else {
        toast.warn(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const fetchDeliveryTimeSlots = async (id: number) => {
    try {
      const response = await apiRequest<ApiResponse>(
        "GET",
        `/products/${pathname}/delivery-time-slots?delivery_id=${id}&date=${selecteDate}`
      );
      if (response?.status === 200 && response.data) {
        setDeliveryTimeSlots(
          (response.data as unknown as { data: DeliveryTimeSlot[] }).data
        );
      } else {
        toast.warn(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleAddToCart = (product: Product) => {
    if (!deliveryTimeSlotId) {
      toast.warning("Please Select Delivery Time Slot");
      return;
    }
    const productPayload = {
      ...product,
      city_id: selectCities,
      city: selectCitieName,
      pincode: selectPincode,
      deliveryDate: String(selecteDate),
      deliveryTypeId: deliveryId,
      deliveryTimeSlotId: deliveryTimeSlotId,
    };
    addToCart(productPayload);
  };

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div>
      <Modal
        isOpen={productGalleryOpen}
        onClose={() => setProductGalleryOpen(false)}
        className={"md:max-w-[70%]"}
      >
        <div className="flex flex-col lg:flex-row gap-4 flex-1">
          <div className="flex justify-start items-start flex-col gap-6 flex-1">
            <div
              onClick={() => setProductGalleryOpen(true)}
              className={"w-full "}
            >
              <ZoomImage src={`${mainImage}`} alt={product.name} />
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-3 h-fit overflow-y-auto ">
            {product.photos.map((photo, index) => (
              <ImageWithFallback
                key={index}
                src={`${photo.imageUrl}`}
                alt={photo.altTag}
                onClick={() => setMainImage(photo.imageUrl)}
                className={`w-full h-30 object-cover cursor-pointer ${
                  mainImage === photo.imageUrl ? "border-primary border" : ""
                }`}
                height={100}
                width={100}
              />
            ))}
          </div>
        </div>
      </Modal>

      <div className="w-full flex flex-col lg:flex-row gap-8 bg-white">
        <div className="flex flex-col lg:flex-row gap-4 flex-1">
          <div className="lg:order-1 order-2 flex lg:flex-col justify-center lg:justify-normal gap-3">
            {product.photos.map((photo, index) => (
              <ImageWithFallback
                key={index}
                src={`${photo.imageUrl}`}
                alt={photo.altTag}
                onClick={() => setMainImage(photo.imageUrl)}
                className={`w-20 h-20 object-cover cursor-pointer ${
                  mainImage === photo.imageUrl ? "border-primary border" : ""
                }`}
                height={100}
                width={100}
              />
            ))}
          </div>

          <div className="lg:order-2 order-1 flex justify-start items-start flex-col gap-6 flex-1">
            <div
              onClick={() => setProductGalleryOpen(true)}
              className={"w-full cursor-zoom-in"}
            >
              <div className="relative w-full h-[300px] lg:h-[450px] overflow-hidden">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover transition-transform duration-200 ease-out"
                />
              </div>
            </div>
            <div className={"w-full lg:flex hidden"}>
              <ProductTabs product={product} />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <div>
                <h4 className="text-lg font-semibold leading-snug text-dark">
                  {product.name}
                </h4>
                <p className="text-gray font-normal">
                  ({product.stockQty} available)
                </p>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <SvgIcon
                    key={i}
                    name={"star.svg"}
                    width={16}
                    height={16}
                    localImage={"star.svg"}
                    fill={i < product.rating ? "#ffa707" : "#c3c3c5"}
                  />
                ))}
                <span className="ml-2 text-gray">
                  ({product.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <p className="text-2xl font-bold text-primary mt-4">
            ₹ {product.finalPrice}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <p className="bg-gray-light rounded-md px-2 w-fit text-primary text-xs font-normal">
              Same day delivery
            </p>
            <p className="bg-gray-light rounded-md px-2 w-fit text-primary text-xs font-normal">
              90 minute delivery
            </p>
          </div>

          {/*--------------start buy on whatsapp-----------*/}
          <div
            className={
              "flex bg-soft-secondary-base hover:bg-secondary-base cursor-pointer duration-500 p-3 items-center justify-center gap-2 text-secondary-base hover:text-white my-6 rounded-full "
            }
          >
            <div>
              <SvgIcon
                name={"whatsapp.svg"}
                width={25}
                height={25}
                fill={"currentColor"}
                localImage={"whatsapp.svg"}
              />
            </div>
            <div>
              <p>Buy On WhatsApp!</p>
            </div>
          </div>
          {/*--------------end buy on whatsapp-----------*/}

          {/*------------start available option --------------*/}
          {!!product.isPanIndia && (
            <div>
              <div>
                <h3 className={"heading-2 !text-lg !font-light"}>
                  Available option
                </h3>
              </div>
              <div className={"grid grid-cols-2 gap-4"}>
                <div
                  className={
                    "flex flex-col items-center justify-center w-full border border-gray-light p-3 py-6 font-semibold text-[14px] text-[#615227]"
                  }
                >
                  <span>Hand Delivery</span>
                  <span>(Earliest by today)</span>
                </div>

                <div
                  className={
                    "flex flex-col items-center justify-center w-full border border-gray-light p-3 py-6 font-semibold text-[14px] text-[#615227]"
                  }
                >
                  <span>Courier</span>
                  {/* <span>(Earliest by today)</span> */}
                </div>
              </div>
            </div>
          )}
          {/*------------end available option --------------*/}

          {!!product.isPanIndia && (
            <div className={""}>
              <p>
                *Hand delivery available only in Bangalore, Delhi, Mumbai & Pune
              </p>
            </div>
          )}
          {/*<p className="text-sm text-gray-500 mt-1">*/}
          {/*    {product.isWholesaleProduct*/}
          {/*        ? "Wholesale available"*/}
          {/*        : "Available for retail purchase"}*/}
          {/*</p>*/}
          <div className="space-y-10">
            <div className={""}>
              <CitiesDropdown
                options={cities}
                isBlink={!selectCities}
                dropdownClassName="!absolute"
                optionLable="name"
                optionValue="id"
              />
            </div>

            {selectCities && (
              <div className={""}>
                <PincodeDropdown
                  isBlink={!selectPincode}
                  dropdownClassName="!absolute"
                />
              </div>
            )}

            {/*--------------- start Schedule your delivery----------------- */}
            {selectPincode && selectCities && (
              <div className={``}>
                <div>
                  <h3
                    className={`heading-2 !text-[18px] mb-2 !font-light w-fit ${
                      !selecteDate ? "animate-shadow-blink" : ""
                    }`}
                  >
                    Schedule Your Delivery With Ease
                  </h3>
                </div>
                <div className={"grid grid-cols-3 gap-2"}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectDate(getDate("today", "full"));
                      fetchDeliveryMethods(getDate("today", "full"));
                    }}
                    className={`deliveryCard ${
                      selecteDate == getDate("today", "full")
                        ? "!border-primary"
                        : ""
                    }`}
                  >
                    <span>Today</span>
                    <span>{getDate("today")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectDate(getDate("tomorrow", "full"));
                      fetchDeliveryMethods(getDate("tomorrow", "full"));
                    }}
                    className={`deliveryCard ${
                      selecteDate == getDate("tomorrow", "full")
                        ? "!border-primary"
                        : ""
                    } `}
                  >
                    <span>Tomorrow</span>
                    <span>{getDate("tomorrow")}</span>
                  </button>

                  <div
                    className={`h-full deliveryCard !p-0 w-full text-center ${
                      ![
                        getDate("tomorrow", "full"),
                        getDate("today", "full"),
                        "",
                      ].includes(selecteDate)
                        ? "!border-primary"
                        : ""
                    }`}
                  >
                    <DatePickerPopup
                      onChange={(date) => {
                        setSelectDate(date);
                        fetchDeliveryMethods(date);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {/*--------------- End Schedule your delivery----------------- */}

            {/*------------- start deliveryMethods------------------ */}
            {!!deliveryMethods.length && selecteDate && (
              <div className={``}>
                <div>
                  <h3
                    className={`heading-2 !text-[18px] mb-2 !font-light w-fit ${
                      !deliveryId ? "animate-shadow-blink" : ""
                    }`}
                  >
                    Preffred time slot
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {deliveryMethods.map((method, index) => (
                    <div key={index} className={"h-full"}>
                      <button
                        type="button"
                        onClick={() => {
                          setDeliveryId(method.id);
                          fetchDeliveryTimeSlots(method.id);
                        }}
                        className={`deliveryCard ${
                          deliveryId == method.id ? "!border-primary" : ""
                        } `}
                      >
                        <span>{method.name}</span>
                        <span>₹{method.price}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!!deliveryTimeSlots.length && deliveryId && (
              <div className={``}>
                <div>
                  <h3
                    className={`heading-2 !text-[18px] mb-2 !font-light w-fit`}
                  >
                    Time slot
                  </h3>
                </div>
                <div
                  className={`${
                    !deliveryTimeSlotId ? "animate-shadow-blink" : ""
                  }`}
                >
                  <SelectField
                    label="time slot"
                    name="time_slot"
                    value={deliveryTimeSlotId as unknown as string}
                    onChange={(e) =>
                      setDeliveryTimeSlotId(e.target.value as unknown as number)
                    }
                    options={deliveryTimeSlots}
                    getOptionLabel={(option) => option.time_slots}
                    getOptionValue={(option) => option.id}
                  />
                  {/* {deliveryTimeSlots.map((time, index) => (
                    <div key={index} className={"h-full"}>
                      <button
                        type="button"
                        onClick={() => {
                          setDeliveryTimeSlotId(time.id);
                        }}
                        className={`deliveryCard ${
                          deliveryTimeSlotId == time.id ? "!border-primary" : ""
                        } `}
                      >
                        <span>{time.time_slots}</span>
                      </button>
                    </div>
                  ))} */}
                </div>
              </div>
            )}
          </div>
          {/*------------- end deliveryMethods------------------ */}

          {/*------------start Delivery Method --------------*/}
          {/* <div className={"mt-6"}>
              <div>
                <h3 className={"heading-2 !text-lg !font-light"}>
                  Select Your Delivery Method
                </h3>
              </div>
              <div className={"grid grid-cols-2 gap-4"}>
                <div
                  className={
                    "flex flex-col items-center justify-center w-full border border-gray-light p-3 py-6 font-semibold text-[14px] bg-[#615227]/[0.1] text-[#615227]"
                  }
                >
                  <span>Hand Delivery</span>
                  <span>(Earliest by today)</span>
                </div>

                <div
                  className={
                    "flex flex-col items-center justify-center w-full border border-gray-light p-3 py-6 font-semibold text-[14px] text-[#615227] bg-[#615227]/[0.1]"
                  }
                >
                  <span>Hand Delivery</span>
                  <span>(Earliest by today)</span>
                </div>
              </div>
            </div> */}
          {/*------------end Delivery Method --------------*/}

          {/*------------ Add to cart -------------- */}
          <div className="flex gap-4 mt-6 w-full sticky bottom-6">
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-secondary-base rounded-full w-full text-white px-6 py-3 transition"
            >
              Add to cart
            </button>
            <button className="bg-primary w-full rounded-full text-white px-6 py-3 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/*    -------- start Review section ---------------------*/}
      <ProductCustomerReview product={product} />
      {/*------------ end Review section ---------------------*/}

      {/*    -------- start Review section ---------------------*/}
      <ProductDetailMultiCarousel
        categoryMenu={[
          {
            id: 147,
            name: "Plants",
            slug: "plants",
          },
          {
            id: 211,
            name: "Cakes",
            slug: "cakes",
          },
          {
            id: 413,
            name: "Wreath",
            slug: "wreath-delivery-in-bangalore",
          },
        ]}
      />
      {/*------------ end Review section ---------------------*/}
    </div>
  );
}
