import { useAddNewUser } from "../api/userApi";
import StoreContext from "../constance";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import animationData from "../assets/successfully-done.json";
import styles from "../styles/basketPage.module.css";
import Lottie from "lottie-react";
function SignUpPage() {
  const [exAnimation, setExAnimation] = useState(false);
  const {setShowSignUp, setUserInfo } =
    useContext(StoreContext);
  const [showAnimation, setShowAnimation] = useState(true);
  const { setShowLgPop } = useContext(StoreContext);
  const { handleSubmit, register, formState } = useForm();
  const { isValid } = formState;
  const { mutate, isPending, isSuccess } = useAddNewUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // وقتی کامپوننت مونت شد، انیمیشن ورود شروع شود
  }, []);
  const handleAnimation = () => {
    setShowAnimation(false);
    setShowLgPop(false);
  };
  const onSubmit = async (data) => {
    mutate(data);
    setUserInfo(data);
  };

  const SignInFn = () => {
    setExAnimation(true);
    setTimeout(() => {
      setShowSignUp(false);
      setExAnimation(false);
    }, 500); // مدت زمان انیمیشن
  };
  return (
    <>
      {isSuccess && showAnimation ? (
        <div className=" w-[300px] h-[200px] bg-white fixed top-[100px] right-[500px] z-20 rounded-3xl">
          <p className="flex justify-center top-0 text-lg">Welcome ! </p>
          <Lottie
            style={{ width: "300px", height: "200px", position: "relative" }}
            animationData={animationData}
            loop={false}
            onComplete={handleAnimation}
          />
        </div>
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
              isMounted
                ? exAnimation
                  ? `fixed bg-lightorange opacity-80 right-0 top-0 rounded-r-lg rounded-l-[80px] h-full w-full ${styles.expandAnimation}`
                  : `fixed bg-lightorange opacity-80 right-0 top-0 rounded-r-lg rounded-l-[80px] h-full w-60 ${styles.enterAnimation}`
                : `fixed bg-lightorange opacity-80 right-0 top-0 rounded-r-lg rounded-l-[80px] h-full w-60 ${styles.initialState}`
            }
          >
            <div>
              <p className="text-white mt-24 text-3xl  ">welcome back!</p>
              <p className="text-xs mt-2 text-white">
                {" "}
                You dont have an acount?
              </p>
              <button
                onClick={SignInFn}
                className=" border p-1 w-28 mt-6 rounded-lg text-white border-white text-sm "
              >
                Login
              </button>
            </div>
          </div>

          <p className="mb-10  mt-6 ml-[160px] text-2xl text-lightorange">Sign Up</p>

          {/* Username Input */}

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

          {/* Email Input */}
          <div className="input-group relative ml-28 ">
            <input
              id="email"
              className="input peer w-48 text-xs p-2  focus:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lightorange transition-all duration-150"
              type="text"
              {...register("email", { required: true })}
              placeholder="email "
            />
            <i className="bi bi-envelope-at-fill absolute right-2 text-lightorange opacity-90 peer-focus:top-2 top-1"></i>
            <label
              htmlFor="email"
              className="label absolute  left-3  top-6 opacity-0 peer-focus:opacity-100  peer-focus:top-3 text-gray-500 pointer-events-none transition-all duration-150  pee-focus:scale-75  peer-focus:px-2 peer-valid:-translate-y-6 peer-valid:scale-75 peer-focus:text-white peer-valid:white peer-focus:bg-lightorange peer-focus:rounded-lg"
            >
              Email
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
        </form>
      )}
    </>
  );
}

export default SignUpPage;
