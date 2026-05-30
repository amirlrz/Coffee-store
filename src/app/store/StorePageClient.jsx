"use client";

import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import { supabase } from "../api/config";

const CATEGORY_COL = "category";
const NAME_COL = "name";

function StorePageClient({ initialData = [] }) {
  const [products, setProducts] = useState(initialData);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch categories once
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("data")
          .select(CATEGORY_COL);
        if (error) throw error;
        const unique = [
          "All",
          ...new Set((data || []).map((i) => i[CATEGORY_COL]).filter(Boolean)),
        ];
        setCategories(unique);
      } catch (err) {
        console.error("Category error:", err);
      }
    };
    getCategories();
  }, []);

  // Fetch products on filter change
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let query = supabase.from("data").select("*");
      if (category !== "All") query = query.eq(CATEGORY_COL, category);
      if (debouncedSearch)
        query = query.ilike(NAME_COL, `%${debouncedSearch}%`);
      const { data, error } = await query;
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Products error:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [category, debouncedSearch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("All");
  };

  return (
    <>
      {/* ── Filter bar — same as MainPageProduct ── */}
      <div className="flex flex-wrap items-center gap-2 mb-4 px-3 justify-start">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="
            border border-stone-300 rounded-full
            px-3 py-2 text-sm bg-transparent
            w-full sm:w-56
            focus:outline-none focus:border-lightorange
          "
        />

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`
                px-3 py-1.5 rounded-full border text-xs transition
                ${
                  category === cat
                    ? "bg-lightorange text-white border-lightorange"
                    : "border-stone-300 text-stone-600 hover:border-lightorange hover:text-lightorange"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="text-xs underline text-stone-500 hover:text-specialRed"
        >
          Reset
        </button>
      </div>

      {/* ── Skeleton ── */}
      {loading && (
        <div className="max-sm:flex-col max-sm:items-center max-sm:flex grid grid-rows-1 grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="m-2 mt-3 w-full h-[320px] bg-zinc-900 rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <p className="text-sm text-red-500 py-6 text-center">{error}</p>
      )}

      {/* ── Empty ── */}
      {!loading && !error && products.length === 0 && (
        <p className="text-sm text-stone-400 py-6 text-center">
          No products match your filters.
        </p>
      )}

      {/* ── Products grid — same layout as original StorePage ── */}
      {!loading && !error && products.length > 0 && (
        <div className="max-sm:flex-col max-sm:items-center max-sm:flex grid grid-rows-1 grid-cols-4">
          {products.map((data) => (
            <ProductCard alldata={data} key={data.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default StorePageClient;
