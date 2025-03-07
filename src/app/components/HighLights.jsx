
'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);

  return (
    <div
      id="highlights"
      className="w-full overflow-hidden h-full mt-8  bg-black"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full  items-end justify-between">
          <h1 id="title" className="text-gray ml-6  text-3xl mb-5 font-medium opacity-0 translate-y-20">
            Get the highlights.
          </h1>

          <div className="flex text-specialRed justify-end gap-5 mr-3 max-sm:justify-start max-sm:ml-4">
            <p className="link">
              Watch the film
              <i className="bi bi-play-circle ml-2"></i>
            </p>
            <p className="link">
              Watch the event
             <i className="bi bi-arrow-right-circle ml-2"></i>
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </div>
  );
};

export default Highlights;
