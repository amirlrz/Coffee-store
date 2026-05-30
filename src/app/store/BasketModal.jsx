import React, { useContext, useEffect, useState } from "react";
import useBasket from "../hooks/useBasket";
import StoreContext from "../constance";
import { createPortal } from "react-dom";
import BasketPage from "./BasketPage";
import styles from ".././styles/basketPage.module.css";
import Image from "next/image";

function ShowBasket() {
  const { items, invoice, actions } = useBasket();
  const { showBasket, setShowBasket } = useContext(StoreContext);

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [address, setAddress] = useState({
    name: "Wade john smith",
    line1: "New zealand-2nd cross",
    line2: "cros road num-22023",
    country: "United States",
  });
  const [draftAddress, setDraftAddress] = useState({ ...address });

  const calcItem = () => items.reduce((acc, curr) => acc + curr.quantity, 0);

  useEffect(() => {
    if (showBasket) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showBasket]);

  useEffect(() => {
    if (showBasket) setSubmitStatus(null);
  }, [showBasket]);

  const handleEditClick = () => {
    setDraftAddress({ ...address });
    setIsEditingAddress(true);
  };

  const handleSaveAddress = () => {
    setAddress({ ...draftAddress });
    setIsEditingAddress(false);
  };

  const handleCancelAddress = () => setIsEditingAddress(false);

  const handleAddressChange = (field, value) =>
    setDraftAddress((prev) => ({ ...prev, [field]: value }));

  const handleSubmitOrder = async () => {
    if (calcItem() === 0) return;
    const orderPayload = {
      address,
      items,
      invoice,
      submittedAt: new Date().toISOString(),
    };
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) throw new Error("Order failed");
      setSubmitStatus("success");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    }
  };

  const inputCls =
    "border border-stone-300 focus:border-lightorange focus:outline-none rounded-md px-2 py-1 text-xs w-full bg-transparent transition-colors duration-150";

  return (
    <>
      {showBasket &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              onClick={() => setShowBasket(false)}
              aria-hidden="true"
              className="fixed inset-0 z-10 bg-black/20"
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-label="Shopping basket"
              onClick={(e) => e.stopPropagation()}
              className={`
                z-20 bg-transparent backdrop-blur-3xl
                animate-macbookOpen ease-in-out rounded-lg
                text-center fixed

                /* desktop/tablet: 3-col, 6-row grid
                   row breakdown:
                     rows 1-5 → cart detail  (was 1-4, now bigger)
                     rows 5-6 → delivery     (was 4-6, now smaller)
                */
                w-3/5 right-1/4 bottom-12 h-4/5 p-3
                 grid-cols-3 grid-rows-6

                /* mobile: bottom sheet */
                max-sm:w-full max-sm:left-0 max-sm:right-0 max-sm:bottom-0
                max-sm:top-0 max-sm:h-full
                max-sm:flex max-sm:flex-col max-sm:overflow-y-auto
                max-sm:rounded-t-2xl max-sm:rounded-b-none
                max-sm:p-4 max-sm:gap-3
              `}
            >
              {/* action buttons */}
              <button
                onClick={() => actions.removeAll(items)}
                aria-label="Clear basket"
                className="bi bi-trash3-fill text-specialRed rounded-full w-6 absolute top-4 right-[265px] max-sm:right-14 max-sm:top-3"
              />
              <button
                onClick={() => setShowBasket(false)}
                aria-label="Close basket"
                className="bi bi-x-circle-fill text-xl text-specialRed absolute right-5 top-2 z-10 max-sm:right-3 max-sm:top-3"
              />

              {/* ════════════════════════════════════════
                  SECTION 1 — Cart Detail
                  desktop: rows 1→5 (4 rows, was 3) — MORE SPACE
                  mobile:  capped scrollable area
              ════════════════════════════════════════ */}
              <div
                className={`
                  border border-stone-400 p-2 rounded-xl overflow-y-auto
                  row-start-1 row-end-5 col-start-1 col-end-3
                  max-sm:row-auto max-sm:col-auto
                  max-sm:max-h-[260px] max-sm:mt-6
                  ${styles.custom}
                `}
              >
                <h2 className="flex mb-3 ml-4 text-lg">Cart Detail</h2>

                {calcItem() >= 1 ? (
                  items.map((item) => (
                    <BasketPage key={item?.id} basketdata={item} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-stone-500 gap-2 py-4">
                    <p>Your Basket is Empty</p>
                    <Image
                      width={120}
                      height={110}
                      src="/images/logoimg.webp"
                      alt="empty basket"
                    />
                  </div>
                )}
              </div>

              {/* ════════════════════════════════════════
                  SECTION 2 — Delivery Information
                  desktop: rows 5→7 (2 rows, compact) — LESS SPACE
                  Condensed to a single horizontal row on desktop
              ════════════════════════════════════════ */}
              <div
                className="
                  border p-2 mt-1 border-stone-400 rounded-lg
                  row-start-5 row-end-7 col-start-1 col-end-3
                  max-sm:row-auto max-sm:col-auto max-sm:mt-0
                "
              >
                {/* header */}
                <div className="flex justify-between items-center mb-1.5">
                  <h2 className="text-xs font-medium text-stone-600">
                    Delivery Information
                  </h2>
                  {!isEditingAddress && (
                    <button
                      onClick={handleEditClick}
                      className="border border-lightorange rounded-full text-[10px] px-2.5 py-0.5 text-lightorange hover:bg-lightorange hover:text-white transition-colors duration-150"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* edit form — compact 2-col grid */}
                {isEditingAddress ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      value={draftAddress.name}
                      onChange={(e) =>
                        handleAddressChange("name", e.target.value)
                      }
                      placeholder="Full name"
                      className={inputCls}
                    />
                    <input
                      value={draftAddress.country}
                      onChange={(e) =>
                        handleAddressChange("country", e.target.value)
                      }
                      placeholder="Country"
                      className={inputCls}
                    />
                    <input
                      value={draftAddress.line1}
                      onChange={(e) =>
                        handleAddressChange("line1", e.target.value)
                      }
                      placeholder="Address line 1"
                      className={inputCls}
                    />
                    <input
                      value={draftAddress.line2}
                      onChange={(e) =>
                        handleAddressChange("line2", e.target.value)
                      }
                      placeholder="Address line 2"
                      className={inputCls}
                    />
                    <div className="col-span-2 flex gap-2 mt-0.5">
                      <button
                        onClick={handleSaveAddress}
                        className="bg-lightorange text-white rounded-full px-3 py-1 text-[10px] hover:opacity-90 active:scale-95 transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelAddress}
                        className="border border-stone-300 text-stone-500 rounded-full px-3 py-1 text-[10px] hover:bg-stone-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* display — single horizontal line on desktop, stacked on mobile */
                  <div
                    className="
                    flex flex-col gap-0 text-stone-500 text-[11px] text-left
                    sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-0 sm:items-center
                  "
                  >
                    <span>{address.name}</span>
                    <span className="hidden sm:inline text-stone-300">·</span>
                    <span>{address.line1}</span>
                    <span className="hidden sm:inline text-stone-300">·</span>
                    <span>{address.line2}</span>
                    <span className="hidden sm:inline text-stone-300">·</span>
                    <span>{address.country}</span>
                  </div>
                )}
              </div>

              {/* ════════════════════════════════════════
                  SECTION 3 — Order Summary + Place Order
                  desktop: right column, all 6 rows
              ════════════════════════════════════════ */}
              <div
                className="
                  border border-stone-400 rounded-lg p-3 ml-2
                  col-start-3 row-start-1 row-end-7
                  flex flex-col
                  max-sm:row-auto max-sm:col-auto max-sm:ml-0
                "
              >
                <h3 className="text-lg ml-2 mb-4 text-left">Order Summary</h3>

                <div className="flex flex-col gap-1 text-left text-sm max-sm:text-xs">
                  <p className="text-specialRed font-medium">Items:</p>
                  <p className="mb-2">{calcItem()}</p>
                  <p className="text-specialRed font-medium">Total price:</p>
                  <p className="mb-2">{invoice.totalPrice}</p>
                  <p className="text-specialRed font-medium">Discount:</p>
                  <p className="mb-2">{invoice.discount} %</p>
                </div>

                <div className="border-t border-stone-300 my-3" />

                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <i
                      className="bi bi-truck text-stone-500 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[12px] font-medium">Delivery</p>
                      <p className="text-[11px] text-stone-500">
                        Free within 50 km's.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i
                      className="bi bi-shield-check text-stone-500 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[12px] font-medium">Returns</p>
                      <p className="text-[11px] text-stone-500">
                        Free within 30 days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1" />

                <div className="flex flex-col gap-1 mt-4">
                  <button
                    onClick={handleSubmitOrder}
                    disabled={
                      calcItem() === 0 ||
                      submitStatus === "loading" ||
                      submitStatus === "success"
                    }
                    className={`
                      w-full py-2.5 rounded-full text-sm font-medium
                      transition-all duration-200 active:scale-95
                      ${
                        submitStatus === "success"
                          ? "bg-green-500 text-white cursor-default"
                          : submitStatus === "error"
                          ? "bg-red-500 text-white hover:opacity-90"
                          : calcItem() === 0
                          ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                          : "bg-lightorange text-white hover:opacity-90"
                      }
                    `}
                  >
                    {submitStatus === "loading" && "Placing order…"}
                    {submitStatus === "success" && "✓ Order placed!"}
                    {submitStatus === "error" && "Try again"}
                    {!submitStatus && "Place Order"}
                  </button>

                  {submitStatus === "error" && (
                    <p className="text-[11px] text-red-500 text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  {submitStatus === "success" && (
                    <p className="text-[11px] text-green-600 text-center">
                      Confirmation email on its way!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}

export default ShowBasket;
