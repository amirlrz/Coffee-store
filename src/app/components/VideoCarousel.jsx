import React, { useEffect, useRef, useState } from "react";
import { hightLightsSlides } from "../assets/VideoObj";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

function VideoCarousel() {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, startPlay, videoId, isPlaying, isLastVideo } = video;

  useGSAP(() => {
    gsap.to("#coverText", { opacity: 1, y: -10, delay: 4.5 });
  }, []);

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in

    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
  }, [videoId]);

  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length >= 0) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  //   const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);
  const handleLoadedMetaData = (i, e) => {
    setLoadedData((pre) => [...pre, e]);
  };
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId]?.currentTime /
            hightLightsSlides[videoId]?.videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
      return () => {
        gsap.ticker.remove(animUpdate); // حذف تایمر
        if (anim) {
          anim.kill(); // توقف انیمیشن
        }
      };
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 2) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };
  useEffect(() => {
    return () => {
      // توقف تمام انیمیشن‌های GSAP
      gsap.killTweensOf("#coverText, #slider, #video");
      // توقف تمام ویدیوها
      videoRef.current.forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    };
  }, []);

  return (
    <>
      <div className="flex items-center">
        {hightLightsSlides.map((list, i) => (
          <div
            key={list.id}
            id="slider"
            className="max-sm:pr-24 pr-32 max-sm:ml-0 ml-20 "
          >
            <div className="video-carousel_container">
              <div
                className="w-[800px] max-sm:w-[350px] h-full ml-4 flex-center justify-center  rounded-3xl overflow-hidden 
                bg-stone-300 "
              >
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== 2
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
                <div
                  id="coverText"
                  className="absolute top-4 left-[10%] opacity-0"
                >
                  {list.textList.map((text) => (
                    <p
                      key={text}
                      className="text-3xl max-sm:text-xl font-medium"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex justify-center mb-3 mt-10">
        <div className="flex  py-5 px-7 bg-stone-900 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <div
              className=" mx-2 w-3 h-3  bg-slate-300  rounded-full relative cursor-pointer"
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <div
                className="absolute  h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              ></div>
            </div>
          ))}
        </div>
        <button className="control-btn ml-3 text-2xl bg-stone-900 rounded-full px-4">
          <span
            className={
              isLastVideo
                ? "bi bi-arrow-clockwise"
                : !isPlaying
                ? "bi bi-play"
                : "bi bi-pause"
            }
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          ></span>
        </button>
      </div>
    </>
  );
}

export default VideoCarousel;
