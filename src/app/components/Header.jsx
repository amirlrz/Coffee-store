
import Link from 'next/link'
import React from 'react'
import CardPage from './card-acount/page'
import Image from 'next/image'

function Header() {

  
  return (
    <div className='flex gap-3 m-5 items-center'>
      <div className="image  flex text-lightorange text-[24px] items-center ">
<Image width={48} height={46}  src="/images/log.png" alt="logo" />
<p>Minimal</p>
<p className='text-rose-600'>shopp</p>
<p>ing</p>
</div>
      <div className='menu flex gap-4 text-sm ml-4'>
     <Link href="/store">Store</Link>
     <Link href="/">Home</Link>
     <Link href="/AboutUs">About us</Link>
     </div>
     <CardPage/>
    
    </div>
  )
}

export default Header
