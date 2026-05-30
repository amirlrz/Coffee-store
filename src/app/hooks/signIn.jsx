import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "../api/config";

export const useSignIn = () => {
  const router = useRouter();

  const login = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw new Error(error.message);
    return data;
  };

  const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: login,
    mutationKey: ["sign-in"],
    onSuccess: () => {
      setTimeout(() => {
        router.push("/store");
      }, 1300);
    },
  });

  return { mutate, data, isPending, isSuccess, isError, error };
};