"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StoreContext from "../constance";
import { useSignIn } from "../hooks/signIn";
import { useAddNewUser } from "../hooks/signup";
import animationData from ".././assets/successfully-done.json";
import styles from ".././styles/basketPage.module.css";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const Image = dynamic(() => import("next/image"), { ssr: false });

// ─── which panel is visible ───────────────────────────────────────────────────
// "login" | "signup" | "loginSuccess" | "signupSuccess"

function AuthModal() {
  const [panel, setPanel] = useState("login");
  const [expandAnimation, setExpandAnimation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setShowLgPop, setIsLogIn, setUserInfo } = useContext(StoreContext);

  // ── Login form ──
  const {
    handleSubmit: handleLoginSubmit,
    register: loginRegister,
    formState: loginFormState,
  } = useForm({ mode: "onChange" });
  const { isValid: loginValid } = loginFormState;
  const {
    mutate: loginMutate,
    isPending: loginPending,
    data: loginData,
    isSuccess: loginSuccess,
    isError: loginError,
    error: loginErr,
  } = useSignIn();

  // ── Signup form ──
  const {
    handleSubmit: handleSignupSubmit,
    register: signupRegister,
    formState: signupFormState,
  } = useForm({ mode: "onChange" });
  const { isValid: signupValid } = signupFormState;
  const {
    mutate: signupMutate,
    isPending: signupPending,
    data: signupData,
    isSuccess: signupSuccess,
    isError: signupError,
    error: signupErr,
  } = useAddNewUser();

  // ── auto-close after success ──
  useEffect(() => {
    if (loginSuccess && panel === "loginSuccess") {
      const t = setTimeout(() => {
        setShowLgPop(false);
        setIsLogIn(true);
        setUserInfo(loginData?.user);
      }, 1300);
      return () => clearTimeout(t);
    }
  }, [loginSuccess, panel]);

  useEffect(() => {
    if (signupSuccess && panel === "signupSuccess") {
      const t = setTimeout(() => {
        setShowLgPop(false);
        setIsLogIn(true);
        setUserInfo(signupData);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [signupSuccess, panel]);

  const closeModal = () => setShowLgPop(false);

  const goToSignup = () => {
    setExpandAnimation(true);
    setTimeout(() => {
      setPanel("signup");
      setExpandAnimation(false);
    }, 350);
  };

  const goToLogin = () => {
    setExpandAnimation(true);
    setTimeout(() => {
      setPanel("login");
      setExpandAnimation(false);
    }, 350);
  };

  const onLoginSubmit = ({ email, password }) => {
    loginMutate(
      { email, password },
      { onSuccess: () => setPanel("loginSuccess") }
    );
  };

  const onSignupSubmit = ({ email, password }) => {
    signupMutate(
      { email, password },
      { onSuccess: () => setPanel("signupSuccess") }
    );
  };

  const isLogin = panel === "login" || panel === "loginSuccess";
  const isSignup = panel === "signup" || panel === "signupSuccess";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10"
      />

      {/* ══════════════════════════════════════════════════════════════════
          OUTER SHELL — fixed size on every panel so nothing jumps
          mobile : centred card, single column
          desktop: two-panel side-by-side
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="
          fixed z-20 overflow-hidden
          bg-white rounded-xl shadow-2xl text-black

          /* mobile */
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[90vw] max-w-[380px]

          /* desktop */
          sm:top-40 sm:left-auto sm:right-1/4
          sm:translate-x-0 sm:-translate-y-0
          sm:w-2/4 sm:max-w-none sm:min-h-[340px]
          sm:flex sm:flex-row sm:items-stretch
        "
      >
        {/* close */}
        <button
          onClick={closeModal}
          className="
            absolute top-3 z-30 w-7 h-7
            flex items-center justify-center rounded-full
            bg-gray-100 hover:bg-red-100 hover:text-specialRed
            text-gray-400 transition-all duration-200
            right-3
          "
        >
          <i className="bi bi-x text-lg" />
        </button>

        {/* ════════════════════════════════════════════════════
            RED PANEL
            desktop login  → left side  (rounded-r-[80px])
            desktop signup → right side (rounded-l-[80px])
            mobile         → top banner, slides down
        ════════════════════════════════════════════════════ */}
        <div
          className={`
            bg-specialRed text-white flex flex-col items-center justify-center gap-3
            transition-all duration-350
            ${expandAnimation ? styles.expandAnimation : styles.enterAnimation}

            /* mobile: top banner */
            w-full px-6 py-5 animate-slideDown

            /* desktop */
            sm:animate-none sm:w-60 sm:min-h-full sm:py-0 sm:px-6
            ${
              isLogin
                ? "sm:order-first sm:rounded-l-xl sm:rounded-r-[80px]"
                : "sm:order-last  sm:rounded-r-xl sm:rounded-l-[80px]"
            }
          `}
        >
          <div
            className={`flex flex-col items-center gap-2 ${
              expandAnimation ? styles.textMoveLeft : ""
            }`}
          >
            {isLogin ? (
              <>
                <p className="text-2xl sm:text-3xl">Welcome back!</p>
                <p className="text-xs">Don't have an account?</p>
                <button
                  onClick={goToSignup}
                  className="border px-4 py-1 rounded-lg text-white border-white text-sm hover:bg-white hover:text-specialRed transition-colors"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <p className="text-2xl sm:text-3xl">Welcome!</p>
                <p className="text-xs">Already have an account?</p>
                <button
                  onClick={goToLogin}
                  className="border px-4 py-1 rounded-lg text-white border-white text-sm hover:bg-white hover:text-specialRed transition-colors"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            FORM AREA — same size always, content fades between panels
        ════════════════════════════════════════════════════ */}
        <div
          className="
            flex flex-col items-center justify-center
            w-full sm:flex-1 py-6 px-4 gap-4
            sm:order-none
          "
          style={{ order: isLogin ? 1 : 0 }}
        >
          {/* ── Login success ── */}
          {panel === "loginSuccess" && (
            <div className="flex flex-col items-center gap-3 animate-fadeIn">
              <p className="text-lg">Welcome back!</p>
              <Image
                width={80}
                height={50}
                src="/images/check-profile.png"
                alt="success"
              />
              <b className="text-blue-600 break-all text-center">
                {loginData?.user?.email}
              </b>
            </div>
          )}

          {/* ── Signup success ── */}
          {panel === "signupSuccess" && (
            <div className="flex flex-col items-center gap-2 animate-fadeIn">
              <p className="text-lg">Account created!</p>
              <Lottie
                style={{ width: 160, height: 120 }}
                animationData={animationData}
                loop={false}
              />
            </div>
          )}

          {/* ── Login form ── */}
          {panel === "login" && (
            <form
              onSubmit={handleLoginSubmit(onLoginSubmit)}
              className="flex flex-col items-center gap-4 w-full animate-fadeIn"
            >
              <p className="text-2xl text-specialRed">Login</p>

              {/* email */}
              <div className="relative w-full max-w-[220px]">
                <input
                  id="login-email"
                  className="peer w-full text-xs p-2 focus:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-specialRed transition-all duration-150"
                  type="text"
                  {...loginRegister("email", { required: true })}
                  placeholder="Email"
                  autoComplete="email"
                />
                <i className="bi bi-envelope-at-fill absolute right-2 top-2 text-specialRed opacity-90" />
              </div>

              {/* password */}
              <div className="relative w-full max-w-[220px]">
                <input
                  id="login-password"
                  className="peer w-full text-xs p-2 focus:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-specialRed transition-all duration-150"
                  type={showPassword ? "text" : "password"}
                  {...loginRegister("password", { required: true })}
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <i className="bi bi-lock-fill absolute right-7 top-2 text-specialRed opacity-90" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-500"
                >
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    } text-sm text-red-800`}
                  />
                </button>
              </div>

              <button
                type="submit"
                className={`w-full max-w-[220px] rounded-xl p-2 text-sm transition-all duration-200
                  ${
                    loginPending
                      ? "bi bi-arrow-clockwise animate-spin text-specialRed text-lg bg-transparent"
                      : loginValid
                      ? "bi bi-check-circle-fill text-white bg-specialRed opacity-90"
                      : "bi bi-x-circle-fill text-white bg-specialRed opacity-40"
                  }`}
              >
                {loginPending ? "" : loginValid ? " Login" : " Submit"}
              </button>

              {loginError && loginErr && (
                <p className="text-xs text-red-800 bg-red-50 rounded-full px-3 py-1 text-center">
                  {loginErr.message}
                </p>
              )}

              {/* mobile signup link */}
              <p className="sm:hidden text-xs text-gray-500">
                No account?{" "}
                <button
                  type="button"
                  onClick={goToSignup}
                  className="text-specialRed underline"
                >
                  Sign up
                </button>
              </p>
            </form>
          )}

          {/* ── Signup form ── */}
          {panel === "signup" && (
            <form
              onSubmit={handleSignupSubmit(onSignupSubmit)}
              className="flex flex-col items-center gap-4 w-full animate-fadeIn"
            >
              <p className="text-2xl text-specialRed">Sign Up</p>

              {/* email */}
              <div className="relative w-full max-w-[220px]">
                <input
                  id="signup-email"
                  className="peer w-full text-xs p-2 focus:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-specialRed transition-all duration-150"
                  type="text"
                  {...signupRegister("email", { required: true })}
                  placeholder="Email"
                />
                <i className="bi bi-envelope-at-fill absolute right-2 top-2 text-specialRed opacity-90" />
              </div>

              {/* password */}
              <div className="relative w-full max-w-[220px]">
                <input
                  id="signup-password"
                  className="peer w-full text-xs p-2 focus:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-specialRed transition-all duration-150"
                  type={showPassword ? "text" : "password"}
                  {...signupRegister("password", { required: true })}
                  placeholder="Password"
                />
                <i className="bi bi-lock-fill absolute right-7 top-2 text-specialRed opacity-90" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-red-400 hover:text-gray-500"
                >
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    } text-sm`}
                  />
                </button>
              </div>

              <button
                type="submit"
                className={`w-full max-w-[220px] rounded-xl p-2 text-sm transition-all duration-200
                  ${
                    signupPending
                      ? "bi bi-arrow-clockwise animate-spin text-specialRed text-lg bg-transparent"
                      : signupValid
                      ? "bi bi-check-circle-fill text-green-800 border border-specialRed bg-specialRed opacity-90"
                      : "bi bi-x-circle-fill text-white bg-specialRed opacity-40"
                  }`}
              >
                {signupPending ? "" : signupValid ? " Sign Up" : " Submit"}
              </button>

              {signupError && signupErr && (
                <p className="text-xs text-red-800 bg-red-50 rounded-full px-3 py-1 text-center">
                  {signupErr.message}
                </p>
              )}

              {/* mobile login link */}
              <p className="sm:hidden text-xs text-gray-500">
                Have an account?{" "}
                <button
                  type="button"
                  onClick={goToLogin}
                  className="text-specialRed underline"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default AuthModal;
