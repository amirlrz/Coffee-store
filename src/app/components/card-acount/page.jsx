"use client";

import React, { useContext, useEffect } from "react";
import StoreContext from "../../constance";
import { createPortal } from "react-dom";
import LoginPage from "../../login/page";
import UserPage from "../../AcountPage/page";
import useBasket from "../../hooks/useBasket";
import ShowBasket from "../../store/ShowBasket";
import { supabase } from "../../api/config";

function CardPage() {
  const {
    showLgPop,
    setShowLgPop,
    showBasket,
    setShowBasket,
    isLogIn,
    setIsLogIn,
    setUserInfo
  } = useContext(StoreContext);
  
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
			
        setUserInfo(session)
       
        setIsLogIn(true);
      } else {
       
        setIsLogIn(false);
      }
    };

    checkSession();
  }, []);

  const { items } = useBasket();
  const calcItem = () => {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  };
  return (
    <>
      <div className="cart/acount flex gap-3 ml-auto">
        <i
          onClick={() => setShowLgPop(!showLgPop)}
          className={
            isLogIn
              ? "bi bi-person-check-fill cursor-pointer ease-in-out duration-200 text-2xl text-lightorange"
              : "bi bi-person cursor-pointer text-2xl text-lightorange "
          }
        ></i>

        <i
          onClick={() => setShowBasket(!showBasket)}
          className={
            calcItem() > 0
              ? "bi bi-basket-fill text-xl cursor-pointer text-lightorange"
              : "bi bi-basket cursor-pointer text-xl text-lightorange"
          }
        >
          {" "}
        </i>
      </div>
      {showLgPop &&
        (isLogIn
          ? createPortal(<UserPage />, document.body)
          : createPortal(<LoginPage />, document.body))}

      <ShowBasket />
    </>
  );
}

export default CardPage;
