import { useMutation } from "@tanstack/react-query";
import { supabase } from "./config";
import { useRouter } from "next/navigation";
export const useAddNewUser = () => {
  const router = useRouter();
  //WordPress Api///
  // const postUsers = async(data) =>{
  //   const jwtToken =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xyei1zdG9yZS1hZG1pbi5saWFyYS5ydW4iLCJpYXQiOjE3Mzk2NTYwNDQsIm5iZiI6MTczOTY1NjA0NCwiZXhwIjoxNzQwMjYwODQ0LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.B52sz-G2Wctqr5IZGXfVri43sacZqMivB6k6X5sNRd0";
  //     const response = await fetch ("http://localhost/wp-json/wp/v2/users",
  //     {
  // method : 'POST',
  //   body : JSON.stringify(data),
  //   headers: {
  //     Authorization: `Bearer ${jwtToken}`,
  //     "Content-Type": "application/json",
  //   }
  // })
  // return response;
  //     }
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
      // پس از موفقیت‌آمیز بودن لاگین، انیمیشن را نمایش دهید
      setTimeout(() => {
        router.push("/store");
      }, 1500);
    },
  });
  return { mutate, data, isPending, isSuccess, error, isError };
};
