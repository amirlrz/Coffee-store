import { useMutation } from "@tanstack/react-query";  
  export const useAddNewUser =()=>{
    const postUsers = async(data) =>{
      const jwtToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiaWF0IjoxNzM4ODgxOTE3LCJuYmYiOjE3Mzg4ODE5MTcsImV4cCI6MTczOTQ4NjcxNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.mswCJs2dIizKYKNqIrlrlTcWaCh9g_BYzpNTOhNc3iI"; 
        const response = await fetch ("http://localhost/wp-json/wp/v2/users",
        {
    method : 'POST',
      body : JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      }
    })
    return response;
        }
        const {mutate , data , isPending ,isSuccess}= useMutation({
          mutationFn :postUsers,
          mutationKey: ["/add-new-user"]
        })
    return {mutate , data , isPending , isSuccess} 
}
  
  