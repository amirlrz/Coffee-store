import React from "react";
import Image from "next/image";
import useBasket from "../hooks/useBasket";

function WhishItems({ whishData }) {
  const { name, image_url } = whishData;
  const { actions } = useBasket();
  return (
    <div className="flex items-center border-b ani  max-sm:w-[300px]  w-full  flex-shrink-0 relative  text-center  p-3  ">
      <div className=" text-black relative  cursor-pointer  ">
        <i
          onClick={() => {
            actions.removeFromWhishList(whishData);
          }}
          className="text-xs absolute  h-5 p-1 rounded-full 
          text-white  right-[0px] top-[0px] z-10
          transition-all 
        bi bi-trash-fill bg-specialRed    
             
        "
        ></i>
        <div className=" hover:brightness-50 ">
          <Image width={200} height={100} src={image_url} alt={name} />
        </div>
      </div>
      <div className=" flex">
        <h3 className="text-[13px]  ">{name}</h3>
      </div>
    </div>
  );
}

export default WhishItems;
