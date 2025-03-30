import React from "react";
import Image from "next/image";

function WhishItems({ whishData }) {
  const { name, image_url } = whishData;

  return (
    <div className="flex items-center border-b ani  max-sm:w-[300px]  w-full  flex-shrink-0 relative  text-center  p-3  ">
      <div className=" text-black relative  cursor-pointer  ">
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
