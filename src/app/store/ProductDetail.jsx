"use client";
import React, { useContext, useEffect } from "react";
import useBasket from "../hooks/useBasket";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import StoreContext from "../constance";
import styles from "../styles/basketPage.module.css";
import Image from "next/image";

function ProductDetail({ productData }) {
  const { image_url, name, price, description, quantity, size } = productData;
  const cleanedString = size.replace(/[{}]/g, "");
  const sizeArray = cleanedString.split(",");

  const { actions } = useBasket();
  const { selectsize, setselectsize, setShowWishList } =
    useContext(StoreContext);
  const { setshowSingleProduct, showSingleProduct } = useContext(StoreContext);
  const importToBasket = () => {
    setshowSingleProduct(false);
    setShowWishList(true);
  };
  const closingPDetail = () => {
    actions.removeFromBasket(productData);
    setshowSingleProduct(false);
  };

  const minusBtn = () => {
    if (quantity === 1) {
      setshowSingleProduct(false);
      actions.removeFromBasket(productData);
    } else {
      actions.removeFromBasket(productData);
    }
  };
  const customerSize = (item) => {
    setselectsize(item);
  };

  useEffect(() => {
    if (showSingleProduct) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  });
  return (
    <>
      <div
        className={`bg-transparent backdrop-blur-3xl  max-sm:w-full max-sm:left-1  max-sm:top-[30px] animate-productOpen right-6 overflow-y-auto text-center z-30 top-[20px] bottom-2 p-3 fixed rounded-lg ${styles.custom}`}
      >
        <div className="text-black relative max-sm:mt-[20px] ">
          <div className="flex gap-7 justify-center">
            <div className={`${styles.swiper} `}>
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                speed={600}
                modules={[EffectCoverflow, Pagination, Navigation]}
              >
                <SwiperSlide>
                  <Image
                    width={500}
                    height={300}
                    className=" rounded-lg "
                    src={image_url}
                    alt={name}
                  />
                </SwiperSlide>

                <div
                  className="
               color rounded-full 
               transition-all"
                ></div>
                <div
                  className="
         rounded-full
         transition-all"
                ></div>
                <div className="mt-9"></div>
              </Swiper>
            </div>
            <div>
              <button
                onClick={closingPDetail}
                className="bi bi-x max-sm:ml-4 bg-stone-200 rounded-full w-[30px] h-[30px] text-lg -top-3 justify-center absolute cursor-pointer -right-1"
              ></button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 mt-8">
          <h3 className="text-sm col-end-3 col-start-1 text-white">{name}</h3>
          <p className="col-start-3">{price} $</p>
          <p className="text-[10px] text-gray-300 col-start-1 col-end-3">
            {description}
          </p>
        </div>

        <div className="stars  flex gap-2 mt-2 text-gray-300 ">
          <i className="bi bi-star-fill text-lightorange"></i>
          <i className="bi bi-star-fill text-lightorange"></i>
          <i className="bi bi-star-fill text-lightorange"></i>
          <i className="bi bi-star text-lightorange"></i>
        </div>
        <div className="counter flex border shadow-sm  shadow-orange-200 border-stone-300 items-center p-1 w-28 rounded-lg gap-7 mt-4 ">
          <button
            onClick={minusBtn}
            className={
              quantity === 1
                ? "bi bi-trash-fill ml-1 text-sm text-specialRed"
                : "minus rounded-full ml-1 text-rose-600  text-sm bi bi-dash-circle"
            }
          ></button>
          <p> {quantity} </p>

          <button
            onClick={() => actions.addToBasket(productData)}
            className=" plus text-sm text-rose-600 bi bi-plus-circle"
          ></button>
        </div>
        <div className=" flex mt-5  ">
          <p className="text-sm ">Weight :</p>
          {sizeArray.map((item, index) => {
            return (
              <div
                onClick={() => customerSize(item)}
                key={index}
                className={
                  selectsize === item
                    ? " text-specialRed flex justify-center items-center p-4 cursor-pointer border border-specialRed  text-xs ml-2 w-12 h-8 rounded-md  hover:bg-lightorange hover:text-specialRed"
                    : " flex justify-center items-center cursor-pointer border p-4   text-xs ml-2 w-12 h-8 rounded-md  hover:bg-lightorange hover:text-specialRed"
                }
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className="delivery flex  mt-[50px] items-center gap-3 ">
          <i className="bi bi-truck text-md text-stone-400   "></i>
          <div>
            <p className="text-[12px] mr-[69px]">Delivery limit </p>
            <p className="text-[11px] text-stone-400">
              Free delivery within 50 km’s.
            </p>
          </div>
        </div>
        <div className="policy flex  mt-5 items-center gap-3 ">
          <i className="bi bi-shield-slash text-md text-stone-400   "></i>
          <div>
            <p className="text-[12px] mr-[69px]">Delivery limit </p>
            <p className="text-[11px] text-stone-400">
              Free delivery within 50 km’s.
            </p>
          </div>
        </div>
        <div className="confirmation mt-10 flex gap-4 max-sm:mt-[70px]   z-50">
          <button
            onClick={importToBasket}
            className="text-xs text-lightorange hover:bg-specialRed hover:text-white  w-[100px] h-1 border flex items-center justify-center border-specialRed rounded-xl p-3"
          >
            Add to cart
          </button>
          <button onClick={closingPDetail} className="text-xs text-stone-400 ">
            Cancle
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
