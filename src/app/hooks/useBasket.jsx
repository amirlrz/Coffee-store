import { create } from "zustand";

const useBasket = create((set, get) => {
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
            return {
              wishlist: [...oldState.wishlist, payload],
            };
          }
          return oldState;
        });
      },
      removeFromWhishList: (payload) => {
        set((oldState) => ({
          wishlist: oldState.wishlist.filter((item) => {
            item.id !== payload.id;
          }),
        }));
      },

      showProduct: (payload) => {
        const showP = get().items.some((_item) => _item.id === payload.id);
        if (showP) {
          set((oldState) => {
            return {
              invoice: {
                ...oldState.invoice,
                totalPrice:
                  parseInt(oldState.invoice.totalPrice) +
                  parseInt(payload.price),
              },
              items: oldState.items.map((_item) => {
                if (_item.id === payload.id) {
                  return {
                    ..._item,
                    quantity: _item.quantity + 1,
                  };
                } else return _item;
              }),
            };
          });
        } else {
          set((oldState) => {
            return {
              invoice: {
                ...oldState.invoice,
                totalPrice:
                  parseInt(oldState.invoice.totalPrice) +
                  parseInt(payload.price),
              },
              items: [...oldState.items, { ...payload, quantity: 1 }],
            };
          });
        }
      },

      removeAll: () => {
        set((oldState) => {
          return {
            invoice: {
              ...oldState.invoice,
              totalPrice: (oldState.invoice.totalPrice = 0),
            },
            items: [],
          };
        });
      },

      removeItem: (payload) => {
        set((oldState) => {
          return {
            invoice: {
              ...oldState.invoice,
              totalPrice:
                oldState.invoice.totalPrice - payload.price * payload.quantity,
            },
            items: oldState.items.filter((_item) => _item.id !== payload.id),
          };
        });
      },
      addToBasket: (payload) => {
        set((oldState) => {
          return {
            invoice: {
              ...oldState.invoice,
              totalPrice:
                parseInt(oldState.invoice.totalPrice) + parseInt(payload.price),
            },
            items: oldState.items.map((_item) => {
              if (_item.id === payload.id) {
                return {
                  ..._item,
                  quantity: _item.quantity + 1,
                };
              }
              return _item;
            }),
          };
        });
      },

      //   updateSize: (productId, size) =>

      //   set((state) => ({
      //       selectedSizes: {
      //         ...state.selectedSizes,
      //         [productId]: size,
      //       },
      //       items: state.items.map((product) =>
      //       product.id === productId
      //           ? {
      //               ...product,
      //               attributes: {
      //                 ...product.attributes,
      //                 size: {
      //                   ...product.attributes.size,
      //                   options: [size], // فقط سایز انتخاب شده باقی می‌ماند
      //                 },
      //               },
      //             }
      //           : product
      //       ),
      //     })),
      removeFromBasket: (payload) => {
        const shouldRemove = payload.quantity === 1;
        if (shouldRemove) {
          set((oldState) => {
            return {
              invoice: {
                ...oldState.invoice,
                totalPrice: oldState.invoice.totalPrice - payload.price,
              },
              items: oldState.items.filter((_item) => _item.id !== payload.id),
            };
          });
        } else {
          set((oldState) => {
            return {
              invoice: {
                ...oldState.invoice,
                totalPrice: oldState.invoice.totalPrice - payload.price,
              },
              items: oldState.items.map((_item) => {
                if (_item.id === payload.id) {
                  return {
                    ..._item,
                    quantity: _item.quantity - 1,
                  };
                } else return _item;
              }),
            };
          });
        }
      },
    },
  };
});
export default useBasket;
