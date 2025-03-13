"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

function Features() {
  
  useGSAP(() => {
    gsap.to("#features_title", {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: "#features_title",
        toggleActions: "restart reverse restart reverse",
        start: "top 85%",
      },
    });
  }, []);

  useGSAP(() => {
    gsap.to(".g_grow", {
      opacity: 1,
      scale: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".g_grow",
        scrub: 5.5,
      },
    });
  }, []);

  useGSAP(() => {
    gsap.to(".g_text", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, []);
  return (
    <section
      className="h-full bg-zinc-950 
      max-sm:py-32 py-20 max-sm:px-10 px-5 mt-10
    relative overflow-hidden"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1
            id="features_title"
            className="text-gray  text-3xl  mb-5 font-medium opacity-0 translate-y-20"
          >
            Explore the full story .
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-4xl font-semibold text-zinc-400 ">About</h2>
            <h2 className="text-4xl font-semibold ">Giyumeh Roastery</h2>
          </div>
          <div className="flex flex-col justify-center max-sm:px-10">
            <div className="flex flex-col w-full relative">
              <div className=" w-full max-sm:flex-col flex gap-5 items-center">
                <div className="overflow-hidden max-sm:w-[40vh]   h-[60vh] w-[80vh] rounded-xl">
                  <Image
                    width={300}
                    height={200}
                    src="/images/explore1.JPG"
                    alt="Roaster"
                    loading="lazy"
                    className=" g_grow  w-full h-full object-cover object-center scale-150 opacity-0"
                  />
                </div>
                <div className="overflow-hidden max-sm:w-[40vh]  h-[60vh] w-[80vh] rounded-xl">
                  <Image
                    width={300}
                    height={200}
                    src="/images/explore2.JPG"
                    alt="Roaster"
                    loading="lazy"
                    className=" g_grow w-full h-full object-cover object-center scale-150 opacity-0 "
                  />
                </div>
                <div className=" flex flex-col gap-5 max-sm:px-4">
                  <div className="flex justify-center">
                    <p className="g_text text-zinc-500 max-sm:max-w-full max-w-xl text-lg max-sm:text-sm font-semibold opacity-0 translate-y-[100px] ">
                      Giyumeh Roastery is {""}
                      <span className="text-white">
                        the first biggest roastery that has been stablished in
                        isfahan city and ,
                      </span>
                      <span>
                        it distributes Coffee beens allaround the iran country
                        and it is equipped with modern Equipment
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <p className="g_text text-zinc-500 max-w-xl max-sm:max-w-xs text-lg max-sm:text-sm  font-semibold opacity-0 translate-y-[100px] ">
                      Giyumeh Roastery is {""}
                      <span className="text-white">
                        the first biggest roastery that has been stablished in
                        isfahan city and ,
                      </span>
                      <span>
                        it distributes Coffee beens allaround the iran country
                        and it is equipped with modern Equipment
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
