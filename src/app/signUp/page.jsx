"use client";
import { useAddNewUser } from "../api/userApi";
import StoreContext from "../constance";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import animationData from "../assets/successfully-done.json";
import styles from "../styles/basketPage.module.css";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function SignUpPage() {
  const [exAnimation, setExAnimation] = useState(false);
  const { setShowSignUp, setUserInfo, setIsLogIn, setShowLgPop } =
    useContext(StoreContext);
  const [showAnimation, setShowAnimation] = useState(true);
  const { handleSubmit, register, formState } = useForm({ mode: "onChange" });
  const { isValid } = formState;
  const {
    mutate,
    isPending,
    isSuccess,
    data: newUserData,
    error,
    isError,
  } = useAddNewUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAnimation = () => {
    setShowAnimation(false);
    setShowLgPop(false);
    setUserInfo(newUserData);
    setIsLogIn(true);
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

  const SignInFn = () => {
    setExAnimation(true);
    setTimeout(() => {
      setShowSignUp(false);
      setExAnimation(false);
    }, 500);
  };

  return (
    <>
      {isSuccess && showAnimation ? (
        <div className="w-[300px] h-[200px] bg-white fixed top-[100px] right-[500px] z-20 rounded-3xl">
          <p className="flex justify-center top-0 text-lg">Welcome!</p>
          <Lottie
            style={{ width: "300px", height: "200px", position: "relative" }}
            animationData={animationData}
            loop={false}
            onComplete={handleAnimation}
          />
        </div>
      ) : (
        <form
          className="bg-white  max-sm:w-[360px]   max-sm:left-4 max-sm:top-[250px]   backdrop-blur-lg w-2/4 z-20 top-40 right-1/4 shadow-2xl items-start ease-in-out p-1 fixed flex flex-col rounded-lg text-center text-black gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={`absolute bg-specialRed max-sm:h-full opacity-80 right-0 top-0 rounded-r-lg rounded-l-[80px] h-full w-60 ${
              exAnimation ? styles.expandAnimation : styles.enterAnimation
            }`}
          >
            <div>
              <p className="text-white max-sm:ml-[90px] mt-24 text-3xl">Welcome</p>
              <p className="text-xs mt-2 max-sm:ml-[90px] text-white">You have an account?</p>
              <button
                onClick={SignInFn}
                className="border p-1 max-sm:ml-[90px] w-28 mt-6 rounded-lg text-white border-white text-sm hover:bg-white hover:text-specialRed"
              >
                Login
              </button>
            </div>
          </div>
          <p className="mb-10 max-sm:ml-[30px]  mt-6 ml-[160px] text-2xl text-specialRed">
            Sign Up
          </p>
          <div className="inputs  flex flex-col gap-3 max-sm:-ml-[72px]">
            <div className="input-group max-sm:w-[140px] max-sm:mr-3 relative ml-28">
              <input
                id="email"
                className="input peer  max-sm:w-[140px] w-48 text-xs p-2 focus:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-specialRed transition-all duration-150"
                type="text"
                {...register("email", { required: true })}
                placeholder="email"
              />
              <i className="bi bi-envelope-at-fill absolute right-2 text-specialRed opacity-90 peer-focus:top-2 top-1"></i>
              <label
                htmlFor="email"
                className="label  absolute left-3 top-6 opacity-0 peer-focus:opacity-100 peer-focus:top-3 text-gray-500 pointer-events-none transition-all duration-150 peer-focus:scale-75 peer-focus:px-2 peer-valid:-translate-y-6 peer-valid:scale-75 peer-focus:text-white peer-valid:white peer-focus:bg-specialRed peer-focus:rounded-lg"
              >
                Email
              </label>
            </div>
            <div className="input-group max-sm:w-[140px]  max-sm:mr-3 relative ml-28">
              <input
                id="password"
                className="input peer max-sm:w-[140px] text-xs p-2 w-48 focus:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-specialRed transition-all duration-150"
                type="password"
                {...register("password", { required: true })}
                placeholder="password"
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
                  ? "bi bi-arrow-clockwise transition-all animate-spin duration-200 ml-48 text-specialRed text-lg"
                  : isValid
                  ? "bi bi-check-circle-fill  max-sm:w-[140px] transition-all duration-200 text-green-800 border ml-28 border-specialRed text-sm w-48 rounded-xl opacity-90 mb-5 p-2 bg-specialRed"
                  : "bi bi-x-circle-fill   max-sm:w-[140px] text-white bg-specialRed mt-4 ml-28 text-sm w-48 rounded-xl opacity-40 mb-5 p-2"
              }
            >
              {isPending ? "" : isValid ? " Sign Up" : " Submit"}
            </button>
          </div>
          {isError && error && (
            <p className="text-xs text-red-800">{error.message}</p>
          )}
        </form>
      )}
    </>
  );
}

export default SignUpPage;
