function ProductCardSkeleton() {
  return (
    <div className="m-2 gap-3 mt-3 max-sm:w-[300px] w-[300px] bg-zinc-950 flex-shrink-0 relative text-center p-3 rounded-lg animate-pulse">
      {/* ── Image area ── */}
      <div className="relative w-full h-[225px] rounded-md bg-zinc-800" />

      {/* ── Name / price / category grid ── */}
      <div className="grid grid-cols-3 mt-3 gap-y-2">
        {/* name — col 1-2 */}
        <div className="col-start-1 col-end-3 h-3 bg-zinc-700 rounded-full w-3/4" />
        {/* price — col 3 */}
        <div className="col-start-3 h-3 bg-zinc-700 rounded-full w-full" />
        {/* category — col 1-2 */}
        <div className="col-start-1 col-end-3 h-2.5 bg-zinc-800 rounded-full w-1/2 mt-1" />
      </div>

      {/* ── Stars row ── */}
      <div className="flex gap-2 mt-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-3.5 h-3.5 rounded-sm bg-zinc-700" />
        ))}
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
