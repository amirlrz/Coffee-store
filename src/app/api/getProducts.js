import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://urtlylafjtzglcagreej.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVydGx5bGFmanR6Z2xjYWdyZWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NjAyODksImV4cCI6MjA1NTIzNjI4OX0.XkW-stQA-WKLBp_fipyqBvByNR3UB90Tyh39ntKqr5M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function getProducts() {
  const { data: product } = await supabase.from("products").select("*");

  return product;
}
