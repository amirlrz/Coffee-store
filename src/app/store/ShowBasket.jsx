import React, { useContext } from "react";
import useBasket from ".././hooks/useBasket";
import StoreContext from ".././constance";
import { createPortal } from "react-dom";
import BasketPage from ".././store/BasketPage";
import styles from '.././styles/basketPage.module.css'
import Image from "next/image";
function ShowBasket() {
  const { items, invoice, actions } = useBasket();
  const { showBasket, setShowBasket } = useContext(StoreContext);
  
	
  const calcItem = () => {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  return (
    <>
      {showBasket &&
        createPortal(
          <div
            className={` w-3/5  right-1/4 grid grid-cols-3 grid-rows-5   h-3/4  text-center z-10 bg-white  bottom-12  p-3 fixed animate-macbookOpen ease-in-out   rounded-lg `}
          >
            <button
              onClick={() => actions.removeAll(items)}
              className="bi bi-trash3-fill bg-stone-300 text-lightorange rounded-full w-6 absolute top-4 right-[265px]"
            ></button>
            <button
              onClick={() => setShowBasket(false)}
              className="bi bi-x-circle-fill  text-2xl text-pink-600 absolute top-0 right-5 "
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
                <div className="flex-col items-center text-pink-600">
                  <p> Your Basket is Empty </p>
                  <Image
                    width={202}
                    height={202}
                    src="/images/8882821.webp"
                    alt="empty basket"
                  />
                </div>
              )}
            </div>
            <div className="border  p-4 mt-2 border-stone-400 row-start-4 row-end-6  col-start-1 col-end-3 rounded-lg">
              <div className="flex justify-between mb-4">
                <h2 className="  ml-8">Delivery Information</h2>
                <button className=" border  border-lightorange justify-center rounded-full text-xs p-1 text-lightorange  w-20 justify-self-end">
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
              <h2 className="text-lg flex ml-2">Order Summary</h2>
              <div className="flex-col mt-7 text-left text-sm">
                <p>Product added</p>
                <p>{calcItem()}</p>
                <p>totalprice</p>
                <p>{invoice.totalPrice}</p>
                <p>discount</p>
                <p>{invoice.discount} %</p>
              </div>
              <div className=" absolute bottom-6 ">
                <div className="delivery items-center mb-6  flex gap-3 ">
                  <i className="bi bi-truck text-md text-stone-500   "></i>
                  <div>
                    <p className="text-[12px] ">Delivery limit </p>
                    <p className="text-[11px] text-stone-500">
                      Free delivery within 50 km’s.
                    </p>
                  </div>
                </div>
                <div className="policy flex    items-center gap-3 ">
                  <i className="bi bi-shield-slash text-md text-stone-500   "></i>
                  <div>
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
