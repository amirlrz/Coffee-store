
import React from "react";
import MainPageProduct from "./components/MainPageProduct";
import ShowProductDt from "./store/ShowProductDt";
import getProducts from "./api/getProducts";
import Intro from "./components/Intro";
import Highlights from "./components/HighLights";
import Features from "./components/Features";

async function LandingPage() {
  const productsData = await getProducts();

  return (
    <>
      <div>
        <Intro />
        <MainPageProduct LandPgData={productsData} />
        <Highlights />
        <ShowProductDt />
        <Features />
      </div>
    </>
  );
}

export default LandingPage;
