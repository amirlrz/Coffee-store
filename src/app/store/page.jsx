import React from "react";
import getProducts from "../api/getProducts";
import ShowProductDt from "./ShowProductDt";
import StorePageClient from "./StorePageClient";

async function StorePage() {
  // fetch on the server for instant first paint, pass as initialData
  const productsData = await getProducts();

  return (
    <>
      <StorePageClient initialData={productsData ?? []} />
      <ShowProductDt />
    </>
  );
}

export default StorePage;
