import { createClient } from "@supabase/supabase-js";
import { supabase } from "./config";

export default async function getProducts() {
  const { data: product } = await supabase.from("data").select("*");

  return product;
}
