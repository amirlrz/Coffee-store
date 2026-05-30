import { useMutation } from "@tanstack/react-query";
import { supabase } from "../api/config";
import { useRouter } from "next/navigation";
export const useAddNewUser = () => {
  const router = useRouter();
  const signUp = async (credentials) => {
    const { data, error } = await supabase.auth.signUp(credentials);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const { mutate, data, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: signUp,
    mutationKey: ["/add-new-user"],
    onSuccess: (data) => {
      setTimeout(() => {
        router.push("/store");
      }, 1500);
    },
  });
  return { mutate, data, isPending, isSuccess, error, isError };
};
