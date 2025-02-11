import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { saveSession } from "./userApi/saveSession";

export const useSignIn = () => {
  const router = useRouter();

  const signInUser = async (credentials) => {
    const res = await fetch("http://localhost/wp-json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();
    saveSession(data.token);

    // redirect کاربر به صفحه store
    router.push("/store");

    return data;
  };

  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: signInUser,
    mutationKey: ["sign-in"],
  });

  return { mutate, data, isPending, isSuccess };
};
