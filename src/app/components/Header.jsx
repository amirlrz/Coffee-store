import Link from "next/link";
import React from "react";
import CardPage from "./card-acount/page";
import Logo from "./Logo";

function Header() {
  return (
    <div className="flex gap-3 items-center  max-sm:w-full max-sm:-ml-0">
      <Logo />
      <div className="menu flex gap-4 text-sm ml-4  max-sm:hidden">
        <Link href="/store">Store</Link>
        <Link href="/">Home</Link>
        <Link href="/AboutUs">About us</Link>
      </div>
      <CardPage />
    </div>
  );
}

export default Header;
