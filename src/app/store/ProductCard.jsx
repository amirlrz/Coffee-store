'use client'

import React, { useContext} from 'react'
import StoreContext from '../constance';
import useBasket from '../hooks/useBasket';
import Image from 'next/image';

function ProductCard({alldata}) {
  const {name,images,price,description} =alldata
  const {setshowSingleProduct} = useContext(StoreContext)
  const { actions} = useBasket()
  const apiResponse= description;
  const strippedText = apiResponse.replace(/<[^>]*>/g, '');
const showProduct =()=>{
  actions.showProduct(alldata)
  setshowSingleProduct(true)
}
  return (
    <div  className='m-2 gap-3 mt-3 w-[300px] flex-shrink-0 relative  text-center  p-3 rounded-lg'>


  <div  className=' text-black relative  cursor-pointer  '>
<i className='bi bi-suit-heart text-xs absolute bg-white h-7 p-2  rounded-full 
 text-gray-400 hover:text-rose-600 right-1 top-1 z-10
transition-all 
 '></i>
 <div  onClick={showProduct}  className=' hover:brightness-50 '>
 <Image width={400} height={300}  src={images[0].src} alt={name} />
 <i className='bi bi-cart opacity-0  absolute hover:opacity-100 z-10 transition-all text-3xl  top-[50%]  -translate-x-1/2  duration-300 w-full h-32  rounded-full 
 text-white '></i>
 </div>

</div>
<div   className='grid grid-cols-3 mt-3 '>
<h3 className='text-sm col-end-3 col-start-1 '>{name}</h3>
<p className='col-start-3'>{price} $</p>
<p className='text-xs text-gray-700 col-start-1 col-end-3'>{strippedText}</p>
</div>
{/* </Link> */}
<div className='stars flex gap-2 mt-2'>
<i className='bi bi-star-fill text-lightorange'></i>
  <i className='bi bi-star-fill text-lightorange'></i>
  <i className='bi bi-star-fill text-lightorange'></i>
  <i className='bi bi-star text-lightorange'></i>
</div>

    </div>
   
  )
}

export default ProductCard
