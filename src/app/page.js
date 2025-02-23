import Link from "next/link";
import React from "react";
import MainPageProduct from "./components/MainPageProduct";
import Image from "next/image";
import ShowProductDt from "./store/ShowProductDt";
import getProducts from "./api/getProducts";
async function LandingPage() {
  const productsData = await getProducts();

  return (
    <>
      <div>
        <div className="slider flex flex-col text-center justify-center bg-lightorange  h-[360px] top-[167px] ">
          <div className="">
            <div className="text-white text-3xl">
              <p>Get 50% Off on</p>
              <p> Selected categories</p>
            </div>
            <div>
              <Link
                href="/store"
                className="bg-white shadow-xl rounded-xl flex justify-center justify-self-center mt-10  hover:bg-rose-500 hover:text-white hover:scale-125 text-rose-600 w-[160px] left-[87px]"
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
        </div>
        <MainPageProduct LandPgData={productsData} />
        <ShowProductDt />
      </div>
    </>
  );
}

export default LandingPage;
