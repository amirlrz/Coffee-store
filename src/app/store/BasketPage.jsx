"use client";

import useBasket from "../hooks/useBasket";
import { useContext } from "react";
import StoreContext from "../constance";
import Image from "next/image";
function BasketPage({ basketdata }) {
  const { image_url, name, description, price, quantity } = basketdata;
  const { actions } = useBasket();
  const { selectsize } = useContext(StoreContext);
  const apiResponse = description;
  const strippedText = apiResponse.replace(/<[^>]*>/g, "");

  return (
    <>
      <div>
        <div className="  mb-4  text-black items-center relative  ">
          <div className=" products flex gap-5 max-sm:gap-3 ">
            <Image
              className="max-sm:h-[90px] "
              width={96}
              height={96}
              src={image_url}
              alt={name}
            />

            <div>
              <div className="bg-zinc-300 rounded-full w-6 absolute left-[70px] mt-20 z-10">
                {quantity}
              </div>
              <div
                onClick={() => actions.addToBasket(basketdata)}
                className="bi bi-plus-circle-fill text-sm cursor-pointer text-specialRed rounded-full absolute left-[91px] mt-[88px] z-10"
              ></div>
              <div
                onClick={() => actions.removeFromBasket(basketdata)}
                className="bi bi-dash-circle-fill cursor-pointer text-sm text-specialRed rounded-full absolute left-[58px] mt-[88px] z-10"
              ></div>
              <div>
                <p className="text-sm max-sm:text-[10px] -mx-5 mt-2  text-zinc-200 ">
                  {name}
                </p>
                <p className="text-[10px] max-sm:hidden mr-9 text-gray-400 ">
                  {strippedText}
                </p>
              </div>
              <div className="stars  flex   gap-2 max-sm:ml-2 mt-3 text-[9px] text-specialRed  ">
                <i className="bi bi-star-fill text-lightorange"></i>
                <i className="bi bi-star-fill text-lightorange"></i>
                <i className="bi bi-star-fill text-lightorange"></i>
                <i className="bi bi-star text-lightorange"></i>
              </div>
              <div className="flex text-sm mt-2 max-sm:ml-4  text-lightorange">
                <p className="mr-3 text-stone-400 max-sm:text-xs ">Weight:</p>
                <p className="text-zinc-300 max-sm:text-xs">
                  {""} {selectsize}
                </p>
              </div>
            </div>
            <p className="ml-auto mr-5 max-sm:mt-[34px]  text-zinc-500 max-sm:text-sm  ">
              {" "}
              {price}$
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasketPage;
