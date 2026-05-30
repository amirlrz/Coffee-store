"use client"
import React, { useContext } from "react";
import ProductCard from "../store/ProductCard";
import useBasket from "../hooks/useBasket";

function StorePage() {
 const {  wishlist } = useBasket();

  return (
    <>
       <h2 className="text-xl ml-5">
           Your  <span className="text-red-800 animate-pulse">Wish</span> List Product 
           <span className="animate-pulse">
           ❤️
           </span>
        </h2>
      <div className="max-sm:flex-col max-sm:items-center max-sm:flex grid grid-rows-1  grid-cols-4 ">
     
        {wishlist &&
          wishlist.map((data) => (
            <ProductCard alldata={data} key={data.id} />
          ))}
      </div>
    </>
  );
}

export default StorePage;
