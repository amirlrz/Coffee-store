"use client";

import React, { useContext } from "react";
import StoreContext from "../constance";
import { createPortal } from "react-dom";
import useBasket from "../hooks/useBasket";
import Image from "next/image";
import ShowBasket from "./ShowBasket";
import ShowWlistPage from "../components/ShowWlistPage";
function WishPage() {
  const { items, wishlist } = useBasket();
  const calcItem = () => {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const { showWishList, setShowBasket, setShowWlist, showWlist } =
    useContext(StoreContext);

  return (
    <>
      {calcItem() >= 1 || (wishlist.length >= 1 && showWishList)
        ? createPortal(
            <div className="bg-specialRed w-screen fixed bottom-0 h-10 z-20">
              <div className="flex ml-10 gap-4 mt-2 cursor-pointer">
                <div
                  className="flex ml-10 max-sm:ml-2 gap-3  cursor-pointer"
                  onClick={() => setShowBasket(true)}
                >
                  <Image
                    className="max-sm:h-5"
                    width={20}
                    height={10}
                    src="/images/Union.png"
                    alt="BasketQuantity"
                  />
                  <p className="text-white">
                    {calcItem()} Items added to Cart{" "}
                  </p>
                </div>
                <div
                  onClick={() => setShowWlist(!showWlist)}
                  className="flex gap-5 ml-5 max-sm:ml-2 max-sm:gap-3 "
                >
                  <i
                    className={` bi bi-suit-heart-fill text-white ${
                      showWlist &&
                      "bi bi-chat-heart-fill ease-in-out animate-productOpen"
                    }`}
                  ></i>
                  <p className="text-white">{wishlist.length} Wish list</p>
                </div>

                {showWlist && createPortal(<ShowWlistPage />, document.body)}
              </div>
            </div>,
            document.body
          )
        : ""}
    </>
  );
}

export default WishPage;
