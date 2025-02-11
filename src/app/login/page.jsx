"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StoreContext from "../constance";
import { useSignIn } from "../api/signIn";
import Lottie from "lottie-react";
import animationData from ".././assets/successfully-done.json";
import SignUpPage from ".././signUp/page";
import styles from "../styles/basketPage.module.css";

function LoginPage() {
  const [expandAnimation, setExpandAnimation] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const { setShowLgPop, setIsLogIn, showSignUp, setShowSignUp, setUserInfo } =
    useContext(StoreContext);
  const { handleSubmit, register, formState } = useForm();
  const { isValid } = formState;
  const { mutate, isPending, isSuccess, data: userData } = useSignIn();
  const [loginMounted, setloginMounted] = useState(false);

  // const {} = data

  useEffect(() => {
    setloginMounted(true); // وقتی کامپوننت مونت شد، انیمیشن ورود شروع شود
  }, []);
  const handleAnimation = () => {
    setShowAnimation(false);
    setShowLgPop(false);
    setIsLogIn(true);
    setUserInfo(userData);
  };
  const SignUpFn = () => {
    setExpandAnimation(true);
    setTimeout(() => {
      setShowSignUp(true);
      setExpandAnimation(false);
    }, 500); // مدت زمان انیمیشن
  };
  const onSubmit = async (data) => {
    const { username, password } = data;
    mutate({
      username,
      password,
    });
  };

  return (
    <>
      {isSuccess && showAnimation ? (
        <div className=" w-[300px] h-[200px] bg-white fixed top-[100px] right-[500px] z-20 rounded-3xl">
          <p className="flex justify-center top-0 text-lg">
            Welcome back, {userData.user_nicename} !{" "}
          </p>
          <Lottie
            style={{ width: "300px", height: "200px", position: "relative" }}
            animationData={animationData}
            loop={false}
            onComplete={handleAnimation}
          />
        </div>
      ) : showSignUp ? (
        <SignUpPage />
      ) : (
        <form
          className="
        bg-white backdrop-blur-lg w-2/4 z-20 top-40 right-1/4 shadow-2xl
        items-start ease-in-out p-1 fixed  flex flex-col rounded-lg text-center
        text-black gap-4
        "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={
              loginMounted
                ? expandAnimation
                  ? `fixed bg-lightorange opacity-80 left-0 top-0 rounded-l-lg rounded-r-[80px] h-full w-full ${styles.expandAnimation}`
                  : `fixed bg-lightorange opacity-80 left-0 top-0 rounded-l-lg rounded-r-[80px] h-full w-60 ${styles.enterAnimation}`
                : `fixed bg-lightorange opacity-80 left-0 top-0 rounded-r-lg rounded-l-[80px] h-full w-60 ${styles.initialState}`
            }
          >
            <div className={expandAnimation ? `${styles.textMoveLeft} ` : ""}>
              <p className="text-white mt-24 text-3xl  ">welcome back!</p>
              <p className="text-xs mt-2 text-white">
                {" "}
                You dont have an acount?
              </p>
              <button
                onClick={SignUpFn}
                className=" border p-1 w-28 mt-6 rounded-lg text-white border-white text-sm "
              >
                SignUp
              </button>
            </div>
          </div>
          <p className="mb-10 mt-6 ml-[420px] text-2xl text-lightorange">
            Login
          </p>

          {/* Username Input */}
          <div className="inputs  flex flex-col ml-60 gap-3">
            <div className="input-group relative ml-28  ">
              <input
                id="username"
                className="input peer w-48 p-2 text-xs  focus:p-3  border border-gray-300 rounded-lg focus:outline-none focus:border-lightorange transition-all duration-150"
                type="text"
                {...register("username", { required: true })}
                placeholder="username "
              />
              <i className="bi bi-person-fill absolute right-2 text-lightorange opacity-90 peer-focus:top-2 top-1"></i>
              <label
                htmlFor="username"
                className="label absolute left-3 top-6 opacity-0 peer-focus:opacity-100 peer-focus:top-3 text-gray-500  pointer-events-none transition-all duration-150  pee-focus:scale-75  peer-focus:px-2 peer-valid:-translate-y-6 peer-valid:scale-75 peer-focus:text-stone-700 peer-valid:white peer-focus:bg-lightorange peer-focus:rounded-2xl "
              >
                Username
              </label>
            </div>

            {/* Password Input */}
            <div className="input-group relative ml-28  ">
              <input
                id="password"
                className="input peer  text-xs p-2 w-48 focus:p-3  border border-gray-300 rounded-lg focus:outline-none focus:border-lightorange transition-all duration-150"
                type="password"
                {...register("password", { required: true })}
                placeholder=" password"
              />
              <label
                htmlFor="password"
                className="label absolute left-3 top-6 peer-focus:top-3 text-gray-500 pointer-events-none transition-all duration-150  pee-focus:scale-75 opacity-0 peer-focus:opacity-100 focus:text-lightorange  peer-focus:px-2 peer-valid:-translate-y-6 peer-valid:scale-75 peer-focus:text-white peer-valid:white peer-focus:bg-lightorange peer-focus:rounded-2xl"
              >
                Password
              </label>
              <i className="bi bi-lock-fill absolute right-2 text-lightorange opacity-90 peer-focus:top-2 top-1"></i>
            </div>

            <button
              type="submit"
              className={
                isPending
                  ? "bi bi-arrow-clockwise transition-all  animate-spin duration-200 ml-48 text-lightorange text-lg    " // استایل برای حالت pending
                  : isValid
                  ? "bi bi-check-circle-fill transition-all duration-200 text-green-700 ml-28  text-sm w-48 rounded-xl opacity-90 mb-5 p-2 bg-lightorange   " // استایل برای حالت valid
                  : "bi bi-x-circle-fill text-white bg-lightorange  mt-4 ml-28 text-sm w-48 rounded-xl opacity-40 mb-5 p-2 " // استایل برای حالت invalid
              }
            >
              {isPending ? "" : isValid ? " Submit" : " Submit"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default LoginPage;
