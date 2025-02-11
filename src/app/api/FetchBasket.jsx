import { useQuery } from "@tanstack/react-query";

// Define the type for the product
interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  // Add other product fields based on your API response
}

// Type for the fetch function parameters
interface FetchProductParams {
  id: number | string;
}

// The fetchProduct function
const fetchProduct = async ({ id }: FetchProductParams): Promise<Product> => {
  const jwtToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiaWF0IjoxNzM4ODgxOTE3LCJuYmYiOjE3Mzg4ODE5MTcsImV4cCI6MTczOTQ4NjcxNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.mswCJs2dIizKYKNqIrlrlTcWaCh9g_BYzpNTOhNc3iI";
  
  const response = await fetch(`http://localhost/wp-json/wc/v3/products/${id}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return await response.json();
};

// The useSingleProduct hook
export const useSingleProduct = (id: number | string) => {
  return useQuery<Product, Error>({
    queryKey: [`/product-${id}`],  // Unique query key (using dynamic product id)
    queryFn: () => fetchProduct({ id }),  // Pass the id to fetchProduct
  });
};
