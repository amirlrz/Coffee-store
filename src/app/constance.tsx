'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, {  createContext, useState } from 'react'
const queryClient = new QueryClient()
const StoreContext = createContext(null);

 function StoreProvider({ children }) {
  const [userInfo,setUserInfo] = useState()
  const [isLogIn,setIsLogIn] = useState(false)
  const [showSignUp,setShowSignUp] =useState(false)
  const [selectsize,setselectsize]=useState()
  const[showSingleProduct,setshowSingleProduct]=useState(false)
  const[showBasket,setShowBasket]=useState(false)
  const [showLgPop,setShowLgPop] = useState(false)
  const [showWishList,setShowWishList] =useState(false)
  const [showMenu,setShowMenu] =useState(false)
 

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <StoreContext.Provider 
        value={{
          showLgPop,
        setShowLgPop,
        showSingleProduct,
        setshowSingleProduct,
        showBasket,
        setShowBasket,
        selectsize,
        setselectsize,
        showSignUp,
        setShowSignUp,
        isLogIn,
        setIsLogIn,
        userInfo,
        setUserInfo,
        showWishList,
        setShowWishList,
        showMenu,
        setShowMenu
      }
 }
        >
            {children}
            
        </StoreContext.Provider>
        <ReactQueryDevtools  />
        </QueryClientProvider>
    </div>
  )
}
export default StoreContext
export  {StoreProvider}