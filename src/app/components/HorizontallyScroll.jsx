import React, { useRef } from "react";

const HorizontallyScroll = ({ children, className }) => {
  const scrollRef = useRef();

  const handleTouch = (e) => {
    const touch = e.touches[0];
    if (scrollRef.current) {
      scrollRef.current.startX = touch.clientX;
      scrollRef.current.scrollLeftStart = scrollRef.current.scrollLeft;
    }
  };

  const handleMTouchMove = (e) => {
    const touch = e.touches[0];
    if (scrollRef.current) {
      const deltaX = touch.clientX - scrollRef.current.startX;
      scrollRef.current.scrollLeft = scrollRef.current.scrollLeftStart - deltaX;
    }
  };

  const handleMouse = (e) => {
    const oldX = e.pageX;
    const scrollLeft = scrollRef.current ? scrollRef.current.scrollLeft : 0;

    const handleMouseMove = (e) => {
      const newX = e.pageX;
      const offset = newX - oldX;
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - offset;
      }
    };

    const handleMouseUP = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUP);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUP);
  };

  return (
    <div
      className={className}
      onMouseDown={handleMouse}
      onTouchStart={handleTouch}
      onTouchMove={handleMTouchMove}
      ref={scrollRef}
    >
      {children}
    </div>
  );
};

export default HorizontallyScroll;
