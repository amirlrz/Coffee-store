"use client";

import React, { useContext } from "react";
import StoreContext from "../constance";
import { createPortal } from "react-dom";
import useBasket from "../hooks/useBasket";
import Image from "next/image";
function WishPage() {
  const { items, wishlist } = useBasket();
 
  const calcItem = () => {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const { showWishList } = useContext(StoreContext);

  return (
    <>
       
       {(calcItem() >= 1 || (wishlist.length >= 1 && showWishList)) ? (
        
        createPortal(
          <div className="bg-lightorange w-screen fixed bottom-0 h-10 ">
            <div className="flex ml-10 gap-4 mt-2">
              <Image
                width={20}
                height={10}
                src="/images/Union.png"
                alt="BasketQuantity"
              />
              <p className="text-white">{calcItem()} Items added to Cart </p>
              <div className="flex gap-5 ml-6">
                <i className="bi bi-suit-heart text-white"></i>
                <p className="text-white">{wishlist.length} Wish list</p>
              </div>
            </div>
          </div>,
          document.body
        )
        ):""
    }
  
    </>
  );
}

export default WishPage;
