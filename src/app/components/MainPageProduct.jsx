"use client";

import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../store/ProductCard";
import HorizontallyScroll from "../components/HorizontallyScroll";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { supabase } from "../api/config";

const CATEGORY_COL = "category";
const PRICE_COL = "price";
const NAME_COL = "name";

function MainPageProduct({ LandPgData = [] }) {
  const [products, setProducts] = useState(LandPgData);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  //onst [sort, setSort] = useState("default");
  //const [maxPrice, setMaxPrice] = useState(1000);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("data")
          .select(CATEGORY_COL);

        if (error) throw error;

        const uniqueCategories = [
          "All",
          ...new Set(
            (data || []).map((item) => item[CATEGORY_COL]).filter(Boolean)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Category Error:", err);
      }
    };

    getCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      let query = supabase.from("data").select("*");

      // Category Filter
      if (category !== "All") {
        query = query.eq(CATEGORY_COL, category);
      }

      // Search Filter
      if (debouncedSearch) {
        query = query.ilike(NAME_COL, `%${debouncedSearch}%`);
      }
      // // Sort
      // if (sort === "asc") {
      //   query = query.order(PRICE_COL, {
      //     ascending: true,
      //   });
      // }

      // if (sort === "desc") {
      //   query = query.order(PRICE_COL, {
      //     ascending: false,
      //   });
      // }

      const { data, error } = await query;

      if (error) throw error;

      setProducts(data || []);
    } catch (err) {
      console.error("Products Error:", err);
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
    // setSort("default");
    // setMaxPrice(1000);
  };

  return (
    <div className="m-2 mt-3 p-3 rounded-lg text-center">
      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-2 mb-4 justify-start">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="
            border border-stone-300
            rounded-full
            px-3 py-2
            text-sm
            bg-transparent
            w-full sm:w-56
            focus:outline-none
            focus:border-lightorange
          "
        />

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`
                px-3 py-1.5
                rounded-full
                border
                text-xs
                transition
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

        {/* Sort */}
        {/* <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            border border-stone-300
            rounded-full
            px-3 py-2
            text-sm
            bg-transparent
          "
        >
          <option value="default">Default order</option>

          <option value="asc">Price: Low → High</option>

          <option value="desc">Price: High → Low</option>
        </select> */}

        {/* Price */}
        {/* <div className="flex items-center gap-2">
          <span className="text-xs whitespace-nowrap">Max: ${maxPrice}</span>

          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-32 accent-lightorange"
          />
        </div> */}

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="
            text-xs
            underline
            text-stone-500
            hover:text-specialRed
          "
        >
          Reset
        </button>
      </div>

      {/* ── Skeleton shimmer while loading ── */}
      {loading && (
        <HorizontallyScroll className="lastItems flex overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </HorizontallyScroll>
      )}

      {/* ── Real cards ── */}
      {!loading && !error && products.length > 0 && (
        <HorizontallyScroll className="lastItems flex overflow-hidden">
          {products.map((data) => (
            <ProductCard alldata={data} key={data.id} />
          ))}
        </HorizontallyScroll>
      )}
    </div>
  );
}

export default MainPageProduct;
