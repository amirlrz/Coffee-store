"use client";

import React from "react";
import ProductCard from "../store/ProductCard";
import HorizontallyScroll from "../components/HorizontallyScroll";
function MainPageProduct({ LandPgData }) {
  return (
    <>
      <div className=" m-2 gap-3 mt-3 flex-shrink-0  text-center  p-3 rounded-lg  ">
        <HorizontallyScroll className="lastItems flex  overflow-hidden   ">
          {LandPgData &&
            LandPgData.map((data) => (
              <ProductCard alldata={data} key={data.id} />
            ))}
        </HorizontallyScroll>
      </div>
    </>
  );
}

export default MainPageProduct;
