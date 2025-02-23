"use client"

import React, { useContext } from "react";
import useBasket from "../hooks/useBasket";
import StoreContext from "../constance";
import ProductDetail from "./ProductDetail";
import { createPortal } from "react-dom";
function ShowProductDt() {
  const { items } = useBasket();
  const { showSingleProduct } = useContext(StoreContext);
  return (
    <>
      {items &&
        showSingleProduct &&
        createPortal(
          items.map((item) => {
            if (!item) return null;
            return <ProductDetail key={item.id} productData={item} />;
          }),

          document.body
        )}
    </>
  );
}

export default ShowProductDt;
