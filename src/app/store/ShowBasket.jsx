import React, { useContext, useEffect } from "react";
import useBasket from ".././hooks/useBasket";
import StoreContext from ".././constance";
import { createPortal } from "react-dom";
import BasketPage from ".././store/BasketPage";
import styles from ".././styles/basketPage.module.css";
import Image from "next/image";
function ShowBasket() {
  const { items, invoice, actions } = useBasket();
  const { showBasket, setShowBasket } = useContext(StoreContext);

  const calcItem = () => {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  };
  useEffect(() => {
    if (showBasket) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  });
  return (
    <>
      {showBasket &&
        createPortal(
          <div
            className={` w-3/5 max-sm:w-full max-sm:p-1 max-sm:h-[450px] max-sm:top-[140px] max-sm:right-0  right-1/4 grid  grid-cols-3 grid-rows-5 h-3/4  text-center z-10 bg-transparent backdrop-blur-3xl  bottom-12  p-3 fixed animate-macbookOpen ease-in-out   rounded-lg `}
          >
            <button
              onClick={() => actions.removeAll(items)}
              className="bi bi-trash3-fill max-sm:right-[145px]   text-specialRed rounded-full w-6 absolute top-4 right-[265px]"
            ></button>
            <button
              onClick={() => setShowBasket(false)}
              className="bi bi-x-circle-fill max-sm:text-lg max-sm:right-0 z-10  text-xl text-specialRed absolute max-sm:-top-2  right-5 "
            ></button>
            <div
              className={`border border-stone-400 p-2 rounded-xl overflow-y-auto row-start-1 row-end-4 col-end-3 col-start-1 ${styles.custom} `}
            >
              <h2 className="flex mb-4 ml-4 text-lg ">Cart Detail</h2>
              {calcItem() >= 1 ? (
                items.map((item) => {
                  return <BasketPage key={item?.id} basketdata={item} />;
                })
              ) : (
                <div className="flex  items-center justify-center text-stone-500">
                  <p> Your Basket is Empty </p>
                  <Image
                    className="justify-center"
                    width={160}
                    height={150}
                    src="/images/logoimg.webp"
                    alt="empty basket"
                  />
                </div>
              )}
            </div>
            <div className="border   p-4 mt-2 border-stone-400 row-start-4 row-end-6  col-start-1 col-end-3 rounded-lg">
              <div className="flex justify-between  mb-4">
                <h2 className=" max-sm:ml-0 max-sm:text-sm   ml-8">
                  Delivery Information
                </h2>
                <button className=" border  border-lightorange justify-center rounded-full text-xs p-1 text-lightorange max-sm:w-14  w-20 justify-self-end">
                  Edit
                </button>
              </div>
              <div className="flex flex-col gap-1 text-stone-600 text-sm   text-left">
                <p>Wade john smith</p>
                <p> New zealand-2nd cross</p>
                <p>cros road num-22023</p>
                <p>United state</p>
              </div>
            </div>
            <div className="col-start-3 p-3  row-start-1 row-end-6 rounded-lg ml-2 border border-stone-400">
              <h3 className="text-lg flex ml-2">Order Summary</h3>
              <div className="flex-col mt-7 text-left max-sm:text-xs text-sm ">
                <p className="text-specialRed ">Product added :</p>
                <p>{calcItem()}</p>
                <p className="text-specialRed">totalprice : </p>
                <p>{invoice.totalPrice}</p>
                <p className="text-specialRed">discount :</p>
                <p>{invoice.discount} %</p>
              </div>
              <div className=" absolute bottom-6 ">
                <div className="delivery items-center mb-6  flex gap-3  max-sm:gap-0 ">
                  <i className="bi bi-truck text-md max-sm:mb-8 text-stone-500   "></i>
                  <div className="max-sm:mr-4">
                    <p className="text-[12px] ">Delivery limit </p>
                    <p className="text-[11px] text-stone-500">
                      Free delivery within 50 km’s.
                    </p>
                  </div>
                </div>
                <div className="policy flex    items-center gap-3 max-sm:gap-0  ">
                  <i className="bi bi-shield-slash text-md max-sm:mb-8 text-stone-500    "></i>
                  <div className="max-sm:mr-4">
                    <p className="text-[12px] ">Delivery limit </p>
                    <p className="text-[11px] text-stone-500">
                      Free delivery within 50 km’s.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>,

          document.body
        )}
    </>
  );
}

export default ShowBasket;
