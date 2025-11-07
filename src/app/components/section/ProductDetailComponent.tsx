"use client";

import ImageWithFallback from "@/app/components/ui/fields/ImageWithFallback";
import PincodeDropdown from "@/app/components/ui/fields/PincodeDropdown";
import ZoomImage from "@/app/components/ui/ZoomImage";
import ProductDetailSkeleton from "@/app/components/ui/loader/ProductDetailSkeleton";
import {Product} from "@/app/types/Product";
import {apiRequest} from "@/app/utils/apiRequest";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import SvgIcon from "@/app/components/ui/SvgIcon";
import SmoothAccordion from "@/app/components/section/accordion/SmoothAccordion";
import {useCart} from "@/app/context/CartContext";
import Modal from "@/app/components/ui/modal/modal";
import Image from "next/image";

interface ProductProps {
    slug: string;
}

export default function ProductDetail({slug}: ProductProps) {

    const [product, setProduct] = useState<Product | null>(null);
    const [mainImage, setMainImage] = useState<string>("");
    const [productGalleryOpen, setProductGalleryOpen] = useState(false)
    const {addToCart} = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiRequest("GET", `/product/${slug}`);
                if (response?.status === 200) {
                    const data = response.data as Product;
                    setProduct(data);
                    setMainImage(data.photos?.[0]?.imageUrl || data.imageUrl);
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong. Please try again.");
            }
        };

        if (slug) fetchProduct();
    }, [slug]);

    if (!product) {
        return <ProductDetailSkeleton/>;
    }

    return (
        <div>
            <Modal isOpen={productGalleryOpen} onClose={()=>setProductGalleryOpen(false)} className={"md:max-w-[70%]"}>
                <div className="flex flex-col lg:flex-row gap-4 flex-1">

                    <div className="flex justify-start items-start flex-col gap-6 flex-1">
                        <div onClick={()=>setProductGalleryOpen(true)} className={"w-full "} >
                            <ZoomImage src={`${mainImage}`} alt={product.name}/>
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
                        <div onClick={()=>setProductGalleryOpen(true)} className={"w-full cursor-zoom-in"} >
                            <div
                                className="relative w-full h-[300px] lg:h-[450px] overflow-hidden"
                            >
                                <Image
                                    src={mainImage}
                                    alt={product.name}
                                    fill
                                    className="w-full h-full object-cover transition-transform duration-200 ease-out"
                                />
                            </div>
                        </div>
                        <div className={"w-full lg:flex hidden"}>
                            <SmoothAccordion items={[{
                                title: "Description",
                                content: product.description
                            },{
                                title: "Product Info",
                                content: product.productInfo
                            },{
                                title: "More Info",
                                content: product.moreInfo
                            },
                            ]}/>
                            {/*<ProductTabs product={product}/>*/}
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
                        className={"flex bg-soft-secondary-base hover:bg-secondary-base cursor-pointer duration-500 p-3 items-center justify-center gap-2 text-secondary-base hover:text-white my-6 rounded-full "}>
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
                    <div>
                        <div>
                            <h3 className={"heading-2 !text-lg !font-light"}>Available option</h3>
                        </div>
                        <div className={"grid grid-cols-2 gap-4"}>
                            <div
                                className={"flex flex-col items-center justify-center w-full border border-gray-light p-3 py-6 font-semibold text-[14px] text-[#615227]"}>
                            <span>
                                Hand Delivery
                            </span>
                                <span>
                                (Earliest by today)
                            </span>
                            </div>

                            <div
                                className={"flex flex-col items-center justify-center w-full border border-gray-light p-3 py-6 font-semibold text-[14px] text-[#615227]"}>
                            <span>
                                Hand Delivery
                            </span>
                                <span>
                                (Earliest by today)
                            </span>
                            </div>
                        </div>
                    </div>
                    {/*------------end available option --------------*/}

                    <div className={"mt-6"}>
                        <p>*Hand delivery available only in Bangalore, Delhi, Mumbai & Pune</p>
                    </div>
                    {/*<p className="text-sm text-gray-500 mt-1">*/}
                    {/*    {product.isWholesaleProduct*/}
                    {/*        ? "Wholesale available"*/}
                    {/*        : "Available for retail purchase"}*/}
                    {/*</p>*/}

                    <div className={"pt-1 pb-6"}>
                        <PincodeDropdown/>
                    </div>

                    {/*------------start Delivery Method --------------*/}
                    <div className={"py-6"}>
                        <div>
                            <h3 className={"heading-2 !text-lg !font-light"}>Select Your Delivery Method</h3>
                        </div>
                        <div className={"grid grid-cols-2 gap-4"}>
                            <div
                                className={"flex flex-col items-center justify-center w-full border border-gray-light p-3 py-6 font-semibold text-[14px] bg-[#615227]/[0.1] text-[#615227]"}>
                            <span>
                                Hand Delivery
                            </span>
                                <span>
                                (Earliest by today)
                            </span>
                            </div>

                            <div
                                className={"flex flex-col items-center justify-center w-full border border-gray-light p-3 py-6 font-semibold text-[14px] text-[#615227] bg-[#615227]/[0.1]"}>
                            <span>
                                Hand Delivery
                            </span>
                                <span>
                                (Earliest by today)
                            </span>
                            </div>
                        </div>
                    </div>
                    {/*------------end Delivery Method --------------*/}

                    {/*------------ Add to cart -------------- */}
                    <div className="flex gap-4 mt-6 w-full sticky bottom-6">
                        <button onClick={()=>addToCart(product)} className="bg-secondary-base rounded-full w-full text-white px-6 py-3 transition">
                            Add to cart
                        </button>
                        <button className="bg-primary w-full rounded-full text-white px-6 py-3 transition">
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
