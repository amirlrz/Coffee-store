import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBasket = create(
  persist(
    (set, get) => {
      return {
        items: [],
        wishlist: [],
        selectedSizes: {},
        invoice: {
          totalPrice: 0,
          deliveryCost: 0,
          totalDiscount: 0,
          finalPrice: 0,
        },

        actions: {
          addToWishList: (payload) => {
            set((oldState) => {
              const showWish = get().wishlist.some(
                (_item) => _item.id === payload.id
              );
              if (!showWish) {
                return { wishlist: [...oldState.wishlist, payload] };
              }
              return oldState;
            });
          },

          removeFromWhishList: (payload) => {
            set((oldState) => ({
              wishlist: oldState.wishlist.filter(
                (_item) => _item.id !== payload.id
              ),
            }));
          },

          showProduct: (payload) => {
            const showP = get().items.some((_item) => _item.id === payload.id);
            if (showP) {
              set((oldState) => ({
                invoice: {
                  ...oldState.invoice,
                  totalPrice:
                    parseInt(oldState.invoice.totalPrice) +
                    parseInt(payload.price),
                },
                items: oldState.items.map((_item) =>
                  _item.id === payload.id
                    ? { ..._item, quantity: _item.quantity + 1 }
                    : _item
                ),
              }));
            } else {
              set((oldState) => ({
                invoice: {
                  ...oldState.invoice,
                  totalPrice:
                    parseInt(oldState.invoice.totalPrice) +
                    parseInt(payload.price),
                },
                items: [...oldState.items, { ...payload, quantity: 1 }],
              }));
            }
          },

          removeAll: () => {
            set((oldState) => ({
              invoice: { ...oldState.invoice, totalPrice: 0 },
              items: [],
            }));
          },

          removeItem: (payload) => {
            set((oldState) => ({
              invoice: {
                ...oldState.invoice,
                totalPrice:
                  oldState.invoice.totalPrice -
                  payload.price * payload.quantity,
              },
              items: oldState.items.filter((_item) => _item.id !== payload.id),
            }));
          },

          addToBasket: (payload) => {
            set((oldState) => ({
              invoice: {
                ...oldState.invoice,
                totalPrice:
                  parseInt(oldState.invoice.totalPrice) +
                  parseInt(payload.price),
              },
              items: oldState.items.map((_item) =>
                _item.id === payload.id
                  ? { ..._item, quantity: _item.quantity + 1 }
                  : _item
              ),
            }));
          },

          removeFromBasket: (payload) => {
            const shouldRemove = payload.quantity === 1;
            if (shouldRemove) {
              set((oldState) => ({
                invoice: {
                  ...oldState.invoice,
                  totalPrice: oldState.invoice.totalPrice - payload.price,
                },
                items: oldState.items.filter(
                  (_item) => _item.id !== payload.id
                ),
              }));
            } else {
              set((oldState) => ({
                invoice: {
                  ...oldState.invoice,
                  totalPrice: oldState.invoice.totalPrice - payload.price,
                },
                items: oldState.items.map((_item) =>
                  _item.id === payload.id
                    ? { ..._item, quantity: _item.quantity - 1 }
                    : _item
                ),
              }));
            }
          },
        },
      };
    },
    {
      name: "basket-storage",
      partialize: (state) => ({
        items: state.items,
        wishlist: state.wishlist,
        invoice: state.invoice,
      }),
    }
  )
);

export default useBasket;
