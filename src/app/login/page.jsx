"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StoreContext from "../constance";
import { useSignIn } from "../api/signIn";
import animationData from "../assets/successfully-done.json";
import SignUpPage from "../signUp/page";
import styles from "../styles/basketPage.module.css";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const Image = dynamic(() => import("next/image"), { ssr: false });

function LoginPage() {
  const [expandAnimation, setExpandAnimation] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const { setShowLgPop, setIsLogIn, showSignUp, setShowSignUp, setUserInfo } =
    useContext(StoreContext);
  const { handleSubmit, register, formState } = useForm({ mode: "onChange" });
  const { isValid } = formState;
  const {
    mutate,
    isPending,
    data: userData,
    isSuccess,
    isError,
    error,
  } = useSignIn();
  const [loginMounted, setLoginMounted] = useState(false);

  useEffect(() => {
    setLoginMounted(true);
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
    }, 500);
  };

  const onSubmit = (formData) => {
    const { email, password } = formData;
    mutate(
      { email, password },
      {
        onSuccess: () => setShowAnimation(true),
      }
    );
  };

  return (
    <>
      {isSuccess && showAnimation ? (
        <div className="w-[300px] h-[200px] p-3 bg-[rgba(98,61,50,0.55)] shadow-black shadow-lg backdrop-blur-xl fixed top-[200px] right-[450px] z-20 rounded-xl">
          <p className="flex justify-center top-0 text-lg">Welcome back!</p>
          <div className="flex justify-center">
            <Image
              width={80}
              height={50}
              src="/images/check-profile.png"
              alt="check-profile"
            />
          </div>
          <b className="flex justify-center text-lg text-blue-600">
            {userData?.user?.email}!
          </b>
          <Lottie
            className="-top-12 ml-8 "
            style={{
              width: "80%",
              height: "auto",
              position: "relative",
            }}
            animationData={animationData}
            onComplete={handleAnimation}
          />
        </div>
      ) : showSignUp ? (
        <SignUpPage />
      ) : (
        <form
          className="bg-white max-sm:w-[360px]  max-sm:right-4 max-sm:top-[250px] max-sm:items-end backdrop-blur-lg w-2/4 z-20 top-40 right-1/4  items-start ease-in-out p-1 fixed flex flex-col rounded-lg text-center text-black gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={`absolute bg-specialRed max-sm:h-full opacity-80 left-0 top-0 rounded-l-lg rounded-r-[80px] h-full w-60 ${
              expandAnimation ? styles.expandAnimation : styles.enterAnimation
            }`}
          >
            <div className={expandAnimation ? styles.textMoveLeft : ""}>
              <p className="text-white max-sm:text-xl max-sm:mr-20 mt-24 text-3xl">
                Welcome back!
              </p>
              <p className="text-xs mt-2 text-white max-sm:mr-20">
                You don't have an account?
              </p>
              <button
                onClick={SignUpFn}
                className="border p-1 w-28 mt-6 max-sm:mr-20 rounded-lg text-white border-white text-sm hover:bg-white hover:text-specialRed"
              >
                SignUp
              </button>
            </div>
          </div>
          <p className="mb-10 max-sm:mr-[60px]  mt-6 ml-[420px] text-2xl text-specialRed">
            Login
          </p>
          <div className="inputs max-sm:w-[250px] max-sm:mr-5 flex flex-col ml-60 gap-3">
            <div className="input-group relative ml-28">
              <input
                id="email"
                className="input peer max-sm:w-[150px] w-48 text-xs p-2 focus:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-specialRed transition-all duration-150"
                type="text"
                {...register("email", { required: true })}
                placeholder="email"
                autoComplete="email"
              />
              <i className="bi bi-envelope-at-fill absolute right-2 text-specialRed opacity-90 peer-focus:top-2 top-1"></i>
              <label
                htmlFor="email"
                className="label absolute left-3 top-6 opacity-0 peer-focus:opacity-100 peer-focus:top-3 text-gray-500 pointer-events-none transition-all duration-150 peer-focus:scale-75 peer-focus:px-2 peer-valid:-translate-y-6 peer-valid:scale-75 peer-focus:text-white peer-valid:white peer-focus:bg-specialRed peer-focus:rounded-lg"
              >
                Email
              </label>
            </div>
            <div className="input-group relative ml-28">
              <input
                id="password"
                className="input max-sm:w-[150px] peer text-xs p-2 w-48 focus:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-specialRed transition-all duration-150"
                type="password"
                {...register("password", { required: true })}
                placeholder="password"
                autoComplete="current-password"
              />
              <label
                htmlFor="password"
                className="label absolute left-3 top-6 peer-focus:top-3 text-gray-500 pointer-events-none transition-all duration-150 peer-focus:scale-75 opacity-0 peer-focus:opacity-100 focus:text-specialRed peer-focus:px-2 peer-valid:-translate-y-6 peer-valid:scale-75 peer-focus:text-white peer-valid:white peer-focus:bg-specialRed peer-focus:rounded-2xl"
              >
                Password
              </label>
              <i className="bi bi-lock-fill absolute right-2 text-specialRed opacity-90 peer-focus:top-2 top-1"></i>
            </div>
            <button
              type="submit"
              className={
                isPending
                  ? "bi bi-arrow-clockwise transition-all  animate-spin duration-200 ml-48 text-specialRed text-lg"
                  : isValid
                  ? "bi bi-check-circle-fill transition-all max-sm:w-[150px] duration-200 text-green-700 ml-28 text-sm w-48 rounded-xl opacity-90 mb-5 p-2 bg-specialRed"
                  : "bi bi-x-circle-fill text-white max-sm:w-[150px] bg-specialRed mt-4 ml-28 text-sm w-48 rounded-xl opacity-40 mb-5 p-2"
              }
            >
              {isPending ? "" : isValid ? " Login" : " Submit"}
            </button>
            {isError && error && (
              <p className="text-xs  text-red-800 mb-5 ml-[100px] z-20 max-sm:bg-white rounded-full">
                {error.message}
              </p>
            )}
          </div>
        </form>
      )}
    </>
  );
}

export default LoginPage;
