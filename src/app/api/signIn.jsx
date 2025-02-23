import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { saveSession } from "./userApi/saveSession";
import { supabase } from "./config";

export const useSignIn = () => {
  const router = useRouter();
  // WordPress///
  // const signInUser = async (credentials) => {
  //   const res = await fetch("http://localhost/wp-json/jwt-auth/v1/token", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(credentials),
  //   });

  //   if (!res.ok) {
  //     throw new Error("Login failed");
  //   }

  //   const data = await res.json();
  //   saveSession(data.token);

  //   router.push("/store");

  //   return data;
  // };
  const login = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      throw new Error(error.message);
    }
    // else{
    // router.push('/store');
    // }
    return data;
  };

  const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: login,
    mutationKey: ["sign-in"],
    onSuccess: (data) => {
      setTimeout(() => {
        router.push("/store");
      }, 1500);
    },
  });

  return { mutate, data, isPending, isSuccess, isError, error };
};
