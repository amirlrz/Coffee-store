import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import getProducts from "../api/getProducts";
import ShowProductDt from "./ShowProductDt";
import WishPage from "./WishPage";

async function StorePage() {
  const productsData = await getProducts();

  return (
    <>
      <div className="grid grid-rows-1  grid-cols-4 ">
        {productsData &&
          productsData.map((data) => (
            <ProductCard alldata={data} key={data.id} />
          ))}
        <ShowProductDt />

        
     
      </div>
    </>
  );
}

export default StorePage;
