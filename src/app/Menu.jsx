"use client";
import React, { useEffect } from "react";
import { useContext } from "react";
import StoreContext from "./constance";
import Link from "next/link";
import Image from "next/image";

function Menu() {
  const { showMenu, setShowMenu } = useContext(StoreContext);
  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  });
  return (
    <>
      <div
        className={`bg-white opacity-1 brightness-90 h-full fixed top-0 right-0 rounded-l-md z-30 w-64 shadow-lg 
          ${showMenu ? "animate-slide-in-right " : "animate-slide-out-right"}`}
      >
        <div className="flex flex-col items-end gap-3 mt-5 mr-5 text-black">
          <i
            onClick={() => setShowMenu(false)}
            className="bi bi-x text-lg mb-2 cursor-pointer"
          ></i>
          <div className="w-full flex justify-center">
            <Image
              className=" opacity-1 z-20 opacity-1 justify-center "
              id="logo"
              src="/images/menuLogo.webp"
              width={130}
              height={100}
              alt="logo-picture"
            />
          </div>

          <Link href="/store">Store</Link>
          <Link href="/">Home</Link>
          <Link href="/AboutUs">About us</Link>
        </div>
      </div>
    </>
  );
}

export default Menu;
