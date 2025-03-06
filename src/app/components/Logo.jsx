"use client";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import gsap from "gsap";
function Logo() {
  useGSAP(() => {
    gsap.to("#logo", { opacity: 1, delay: 6 });
  }, []);
  return (
    <>
      <div className="">
        <Link href="/">
          <Image
            className=" opacity-1 z-20 opacity-0 "
            id="logo"
            src="/images/logoimg.webp"
            width={130}
            height={100}
            alt="logo-picture"
          />
        </Link>
      </div>
    </>
  );
}

export default Logo;
