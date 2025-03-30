import React from "react";
import useBasket from "../hooks/useBasket";
import WhishItem from "./WhishItems";
function ShowWlistPage() {
  const { wishlist } = useBasket();
  return (
    <div className="bg-specialRed h-[360px]   max-sm:left-[50px]  ease-in-out animate-slide-in-up w-[360px] overflow-y-auto z-10 p-1 rounded-md fixed bottom-0 left-[310px]">
      {wishlist.map((whish) => (
        <WhishItem whishData={whish} key={whish.id} />
      ))}
    </div>
  );
}

export default ShowWlistPage;
