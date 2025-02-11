'use client'
import React, { useContext} from 'react'
import useBasket from '../hooks/useBasket';
import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectCoverflow, Pagination, Navigation} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import StoreContext from '../constance';
import styles from '../styles/basketPage.module.css'
import Image from 'next/image';

function ProductDetail({productData}) {
  const {images,name,price,description,quantity,attributes} = productData
  const {actions , invoice} = useBasket()
const {size,setSize}=useContext(StoreContext)
const options = attributes[0].options
const apiResponse= description;
const strippedText = apiResponse.replace(/<[^>]*>/g, '');
const {setshowSingleProduct} = useContext(StoreContext)
const importToBasket =()=>{
  setshowSingleProduct(false)
  
	console.log("TCL: importToBasket -> ", invoice.totalPrice)
}
const closingPDetail= ()=>{
  actions.removeFromBasket(productData)
  setshowSingleProduct(false)
}
const minusBtn=()=>{

if(quantity===1){
  setshowSingleProduct(false)
  actions.removeFromBasket(productData)
}else{
  actions.removeFromBasket(productData)
}
}
const selectSize=(item )=>{

  setSize(item)
}
  return (
    <>
      <div className={`bg-white animate-productOpen right-6 overflow-y-auto text-center z-10 top-[20px] bottom-6 p-3 fixed rounded-lg ${styles.custom}`}>
        <div className="text-black relative">
          <div className="flex gap-7">
            <div className={`${styles.swiper} `}>
        
              <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              speed={600}
              modules={[EffectCoverflow, Pagination, Navigation]}
            >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image width={500} height={300} className=" rounded-lg"  src={image.src} alt={name} />
                </SwiperSlide>
                ))}
              <div className="
               color rounded-full 
               transition-all"></div>
      <div className="
         rounded-full
         transition-all"></div>
      <div className="mt-9" ></div>

              </Swiper>

            </div>

            <button onClick={closingPDetail} className="bi bi-x bg-stone-200 rounded-full w-[30px] h-[30px] text-lg items-center justify-center absolute   right-0"></button>
          </div>
        </div>

        <div className="grid grid-cols-3 mt-8">
          <h3 className="text-sm col-end-3 col-start-1">{name}</h3>
          <p className="col-start-3">{price} $</p>
          <p className="text-[10px] text-gray-700 col-start-1 col-end-3">{strippedText}</p>
        </div>


<div className='stars  flex gap-2 mt-2'>
  <i className='bi bi-star-fill text-lightorange'></i>
  <i className='bi bi-star-fill text-lightorange'></i>
  <i className='bi bi-star-fill text-lightorange'></i>
  <i className='bi bi-star text-lightorange'></i>

</div>
<div className='counter flex border shadow-sm  shadow-orange-200 border-stone-300 items-center p-1 w-28 rounded-lg gap-7 mt-4 '>
<button onClick={minusBtn}  className={quantity===1?"bi bi-trash-fill ml-1 text-sm text-lightorange":"minus rounded-full ml-1 text-rose-600  text-sm bi bi-dash-circle"}></button>
<p>  {quantity} </p>

<button  onClick={()=>actions.addToBasket(productData)} className=' plus text-sm text-rose-600 bi bi-plus-circle'></button>
</div>
<div  className=" flex mt-5  ">
  {
    options.map((item)=>{
      return(
        
        <div onClick={()=>selectSize(item)} key={item} className={size===item? "bg-lightorange text-white flex justify-center items-center cursor-pointer border border-lightorange  text-sm ml-2 w-8 h-8 rounded-md  hover:bg-lightorange hover:text-white":' flex justify-center items-center cursor-pointer border border-lightorange text-lightorange text-sm ml-2 w-8 h-8 rounded-md  hover:bg-lightorange hover:text-white'}>{item}</div>
        
        ) 
      })
  }
      </div>
 
<div className="delivery flex  mt-[50px] items-center gap-3 ">
<i className='bi bi-truck text-md text-stone-500   '>
  </i>
  <div >
  <p className='text-[12px] mr-[69px]'>Delivery limit </p>
  <p className='text-[11px] text-stone-500'>Free delivery within 50 km’s.</p>
  </div>
</div>
<div className="policy flex  mt-5 items-center gap-3 ">
<i className='bi bi-shield-slash text-md text-stone-500   '>
  </i>
  <div >
  <p className='text-[12px] mr-[69px]'>Delivery limit </p>
  <p className='text-[11px] text-stone-500'>Free delivery within 50 km’s.</p>
  </div>
</div>
<div className="confirmation mt-14 flex gap-4 ">
  <button onClick={importToBasket} className='text-xs text-lightorange hover:bg-lightorange hover:text-white  w-[100px] h-1 border flex items-center justify-center border-lightorange rounded-xl p-3'>Add to cart</button>
  <button onClick={closingPDetail} className='text-xs text-stone-600 ' >Cancle</button>
</div>
    </div>
    </>
  );
}

export default ProductDetail;
