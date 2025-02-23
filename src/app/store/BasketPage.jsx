"use client";

import useBasket from "../hooks/useBasket";
import { useContext } from "react";
import StoreContext from "../constance";
import Image from "next/image";
function BasketPage({ basketdata }) {
	console.log("TCL: BasketPage -> basketdata", basketdata)
  const { image_url, name, description, price, quantity } = basketdata;
  const { actions } = useBasket();
  const { selectsize } = useContext(StoreContext);
  const apiResponse = description;
  const strippedText = apiResponse.replace(/<[^>]*>/g, "");

  return (
    <>
      <div>
        <div className=" border border-white mb-4  text-black items-center relative  ">
          <div className=" products flex gap-5 ">
            <Image width={96} height={96} src={image_url} alt={name} />
            <div>
              <div className="bg-slate-200 text-lightorange rounded-full w-6 absolute left-[70px] mt-20 z-10">
                {quantity}
              </div>
              <div
                onClick={() => actions.addToBasket(basketdata)}
                className="bi bi-plus-circle-fill text-sm cursor-pointer text-rose-400 rounded-full absolute left-[91px] mt-[88px] z-10"
              ></div>
              <div
                onClick={() => actions.removeFromBasket(basketdata)}
                className="bi bi-dash-circle-fill cursor-pointer text-sm text-rose-400 rounded-full absolute left-[58px] mt-[88px] z-10"
              ></div>
              <h3 className="text-sm  ">{name}</h3>
              <p className="text-[10px]  text-gray-700 ">{strippedText}</p>
              <div className="stars  flex   gap-2 ">
                <i className="bi bi-star-fill text-lightorange"></i>
                <i className="bi bi-star-fill text-lightorange"></i>
                <i className="bi bi-star-fill text-lightorange"></i>
                <i className="bi bi-star text-lightorange"></i>
              </div>
              <div className="flex text-sm mt-2 text-lightorange">
                <p className="mr-3">Size :</p>
                <p className="text-black">
                  {""} {selectsize}
                </p>
              </div>
            </div>
            <p className="ml-auto mr-5">{price} $</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasketPage;
