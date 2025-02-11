import { useQuery } from "@tanstack/react-query";

    const fetchAllProduct = async()=> {
        const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiaWF0IjoxNzM4ODgxOTE3LCJuYmYiOjE3Mzg4ODE5MTcsImV4cCI6MTczOTQ4NjcxNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.mswCJs2dIizKYKNqIrlrlTcWaCh9g_BYzpNTOhNc3iI";
    
        const response = await fetch("http://localhost/wp-json/wc/v3/products ", {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    
        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }
    
       return  await response.json();
       
    }

    export const useFetchProduct = () => {
        return useQuery({
            queryKey: ['/product'],  // Unique query key
            queryFn : () => fetchAllProduct(),  // Query function
              
        }
               // Only run query if `id` is available
        );
    };

