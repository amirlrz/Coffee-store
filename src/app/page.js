'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import useBasket from './hooks/useBasket'
import ProductDetail from './store/ProductDetail'
import { useFetchProduct } from './api/FetchProduct'
import ProductCard from './store/ProductCard'
import StoreContext from './constance'
import { createPortal } from 'react-dom'
import HorizontallyScroll from './components/HorizontallyScroll'
import Image from 'next/image'
 function LandingPage() {

 const {data} = useFetchProduct()
 const {items}= useBasket()
 const {showSingleProduct} = useContext(StoreContext)


 return (
    <>
  <div>
    <div className="slider flex flex-col text-center justify-center bg-lightorange  h-[360px] top-[167px] ">  
  <div className=''>
 <div className='text-white text-3xl'>
  <p>Get 50%  Off on</p>
  <p> Selected categories</p>
  </div>
  <div>
  <Link href='/store' className='bg-white shadow-xl rounded-xl flex justify-center justify-self-center mt-10  hover:bg-rose-500 hover:text-white hover:scale-125 text-rose-600 w-[160px] left-[87px]'>Shop Now</Link>
  </div>
  </div>
  <Image width={240} height={360} className=' right-0 absolute' src="/images/image 1.png" alt="bannerPicture" />
    </div>
    <div className=" m-2 gap-3 mt-3 flex-shrink-0  text-center  p-3 rounded-lg">
  <HorizontallyScroll className='lastItems flex  overflow-hidden   '>
   {
  data && 
  data.map((data)=>(
   <ProductCard alldata={data} key={data.id}
    />   
    
    ))
}
</HorizontallyScroll>
</div>
{ 
  items && showSingleProduct  && createPortal(
    
    items.map((item)=>{
      if (!item) return null;
      return (
       <ProductDetail key={item.id}   productData={item}/>
       )
    })
  ,
    document.body
  )}
  </div>
   </>
  )
}

export default LandingPage

