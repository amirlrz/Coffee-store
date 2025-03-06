"use client";

import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Widevideo, Smallvideo } from "../assets/VideoObj";

function Intro() {
  const [videoSrc, setVideoSrc] = useState(null); // ابتدا null قرار دهید

  const handleVideoSrcSet = () => {
    if (typeof window !== "undefined") {
      setVideoSrc(window.innerWidth < 760 ? Smallvideo : Widevideo);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // تنظیم اولیه ویدیو
      handleVideoSrcSet();

      // اضافه کردن event listener برای تغییر سایز
      window.addEventListener("resize", handleVideoSrcSet);

      // حذف event listener هنگام unmount
      return () => {
        window.removeEventListener("resize", handleVideoSrcSet);
      };
    }
  }, []);

  useGSAP(() => {
    const ctaElement = document.getElementById("cta");
    if (ctaElement) {
      gsap.to(ctaElement, { opacity: 1, y: -50, delay: 6 });
    }
  }, [videoSrc]);

  // اگر videoSrc تنظیم نشده باشد، چیزی رندر نکنید
  if (!videoSrc) {
    return (
      <div className="w-full h-[calc(90vh-60px)] max-sm:h-[calc(100vh-60px)] bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <>
      <section className="w-full h-[calc(90vh-60px)] max-sm:h-[calc(100vh-60px)] bg-black relative ">
        <div className="h-5/6 w-full flex-center flex-col">
          <div className="flex w-full justify-center  ">
            <video
              className=" pointer-events-none relative  max-sm:w-[220px]  "
              id="afterEffectVid"
              autoPlay
              muted
              width={820}
              height={100}
              playsInline={true}
              key="afterEffectVid"
              loading="lazy"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>

        <div
          id="cta"
          className="flex flex-col items-center opacity-0 translate-y-20"
        >
          <Link
            className="max-sm:-mt-[85px]  mb-8 bg-specialRed rounded-lg w-28  text-black hover:bg-white hover:text-black text-lg flex justify-center"
            href="/store"
          >
            Buy
          </Link>
          <p className="font-normal text-xl  mb-8">
            Every kind Of Coffee Been that U need{" "}
          </p>
        </div>
      </section>
    </>
  );
}

export default Intro;
