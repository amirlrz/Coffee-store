"use client";

import React, { useContext, useEffect } from "react";
import StoreContext from "../../constance";
import { createPortal } from "react-dom";
import useBasket from "../../hooks/useBasket";
import ShowBasket from "../../store/ShowBasket";
import { supabase } from "../../api/config";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("../../Menu"), { ssr: false });
const UserPage = dynamic(() => import("../../AcountPage/page"), { ssr: false });
const LoginPage = dynamic(() => import("../../login/page"), { ssr: false });

function CardPage() {
  const {
    showLgPop,
    setShowLgPop,
    showBasket,
    setShowBasket,
    isLogIn,
    setIsLogIn,
    setUserInfo,
    setShowMenu,
    showMenu,
  } = useContext(StoreContext);

  const openMenu = () => {
    setShowMenu(true);
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUserInfo(session);
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
  useEffect(() => {
    if (showLgPop) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  });
  return (
    <>
      <div className="cart/acount flex gap-3 ml-auto ">
        <i
          onClick={() => setShowLgPop(!showLgPop)}
          className={
            isLogIn
              ? "bi bi-person-check-fill cursor-pointer ease-in-out duration-200 text-xl text-specialRed"
              : "bi bi-person cursor-pointer text-xl text-white "
          }
        ></i>

        <i
          onClick={() => setShowBasket(!showBasket)}
          className={
            calcItem() > 0
              ? "bi bi-basket-fill text-lg cursor-pointer text-specialRed mr-3 max-sm:mr-0 "
              : "bi bi-basket cursor-pointer text-lg text-white mr-3 max-sm:mr-0"
          }
        >
          {" "}
        </i>
        <i
          onClick={openMenu}
          className="hidden cursor-pointer max-sm:flex max-sm:mt-1 max-sm:mr-2 max-sm:bi bi-list max-sm:text-2xl max-sm:text-white "
        ></i>
        {showMenu && createPortal(<Menu />, document.body)}
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
