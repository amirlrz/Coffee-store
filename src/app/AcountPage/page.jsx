"use client";
import React, { useContext } from "react";
import { useSignIn } from "../api/signIn";
import StoreContext from "../constance";
import Image from "next/image";

function UserPage() {
  const { userInfo, setIsLogIn } = useContext(StoreContext);
  const removeToken = () => {
    localStorage.clear();
    setIsLogIn(false);
  };
  return (
    <>
      <div className="bg-[rgba(111,63,48,0.5)] z-10 shadow-black shadow-lg backdrop-blur-xl fixed top-[92px] w-64 rounded-tl-xl rounded-bl-xl right-[73px] h-64">
        <div className="flex flex-col items-center mt-3 ">
          <Image
            width={100}
            height={100}
            src="/images/user-folder.png"
            alt="userInfo-picture"
          />
          <p className="text-xs text-stone-400 mb-5">" User Information "</p>
          <div className="text-stone-200 ">
            <p>your name: {userInfo.user_nicename}</p>
            <p>your email: {userInfo.user_email}</p>
          </div>
          <button
            onClick={removeToken}
            className="bg-lightorange mt-7 rounded-xl text-xs w-[80px] h-[22px] "
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default UserPage;
