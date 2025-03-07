import Link from "next/link";
import React from "react";
import MainPageProduct from "./components/MainPageProduct";
import Image from "next/image";
import ShowProductDt from "./store/ShowProductDt";
import getProducts from "./api/getProducts";
import Intro from "./components/Intro";
import Highlights from "./components/HighLights";
import Features from "./components/Features";
import Footer from "./components/Footer";

async function LandingPage() {
  const productsData = await getProducts();

  return (
    <>
      <div>
        <Intro/>
        {/* <div className="slider flex flex-col text-center justify-center bg-lightorange  h-[360px] top-[167px] ">
          <div className="">
            <div className="text-white text-3xl max-sm:text-xl max-sm:mr-24">
              <p>Get 50% Off on</p>
              <p> Selected categories</p>
            </div>
            <div>
              <Link
                href="/store"
                className="bg-white shadow-xl max-sm:w-[130px] max-sm:bg-white rounded-xl flex justify-center justify-self-center mt-10  hover:bg-rose-500 hover:text-white hover:scale-125 text-rose-600 w-[160px] left-[87px]"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <Image
            width={240}
            height={360}
            className=" right-0 absolute"
            src="/images/image 1.png"
            alt="bannerPicture"
          />
        </div> */}
        <MainPageProduct LandPgData={productsData} />
        <Highlights/>
        <ShowProductDt />
        <Features/>
        <Footer/>
      </div>
    </>
  );
}

export default LandingPage;
