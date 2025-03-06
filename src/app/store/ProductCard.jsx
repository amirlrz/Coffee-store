"use client";

import React, { useContext, useState } from "react";
import StoreContext from "../constance";
import useBasket from "../hooks/useBasket";
import Image from "next/image";

function ProductCard({ alldata }) {
  const { name, image_url, price, description } = alldata;
  const { setshowSingleProduct, setShowWishList } = useContext(StoreContext);
  const { actions } = useBasket();
  const [removeFromWishList, setRemoveFromWishList] = useState(false);
  const apiResponse = description;
  const strippedText = apiResponse.replace(/<[^>]*>/g, "");
  const showProduct = () => {
    actions.showProduct(alldata);
    setshowSingleProduct(true);
  };

  const wishList = () => {
    actions.addToWishList(alldata);
    setShowWishList(true);
    setRemoveFromWishList(!removeFromWishList);
    if (removeFromWishList) {
      actions.removeFromWhishList(alldata);
    }
  };
  return (
    <div className="m-2 gap-3 mt-3 max-sm:w-[300px]  w-[300px] bg-zinc-950 flex-shrink-0 relative  text-center  p-3 rounded-lg  ">
      <div className=" text-black relative  cursor-pointer  ">
        <i
          onClick={() => wishList(alldata)}
          className={`text-xs absolute  h-5 p-1 rounded-full 
          text-specialRed  right-[0px] top-[0px] z-10
          transition-all ${
            removeFromWishList
              ? "bi bi-trash-fill bg-specialRed text-white    "
              : "bi bi-suit-heart bg-white  hover:text-sm "
          }`}
        ></i>
        <div onClick={showProduct} className=" hover:brightness-50 ">
          <Image width={400} height={300} src={image_url} alt={name} />
          <i
            className="bi bi-cart opacity-0  absolute hover:opacity-100 z-10 transition-all text-3xl  top-[50%]  -translate-x-1/2  duration-300 w-full h-32  rounded-full 
 text-white "
          ></i>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-3 ">
        <h3 className="text-[13px] col-end-3 col-start-1 ">{name}</h3>
        <p className="col-start-3">{price} $</p>
        <p className="text-xs text-gray-400 col-start-1 col-end-3">
          {strippedText}
        </p>
      </div>
      {/* </Link> */}
      <div className="stars flex gap-2 mt-2">
        <i className="bi bi-star-fill "></i>
        <i className="bi bi-star-fill "></i>
        <i className="bi bi-star-fill "></i>
        <i className="bi bi-star "></i>
      </div>
    </div>
  );
}

export default ProductCard;
