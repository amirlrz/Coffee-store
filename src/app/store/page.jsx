
'use client'
import React, {  useContext} from 'react'
import ProductCard from './ProductCard';
import {  useFetchProduct } from '../api/FetchProduct';
import useBasket from '../hooks/useBasket';
import { createPortal } from 'react-dom';
import ProductDetail from './ProductDetail';
import StoreContext from '../constance';

 function StorePage() {
  const {showSingleProduct} = useContext(StoreContext)
   const {data} = useFetchProduct()
   const {items}= useBasket()
 
   


  return (
    <>
    
   <div  className='grid grid-rows-1  grid-cols-4 '>

{
  data && 
  data.map((data)=>(
   <ProductCard alldata={data} key={data.id}
    />   
    
    ))
}


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

export default StorePage
