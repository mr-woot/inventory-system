module.exports = () => {
  const { Item, Cart } = require("../models");

  /**
   * Create cart service
   * @param {Object} payload
   */
  const addToCart = ({ itemId, orderQuantity, userId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const cartItem = {
          item: itemId,
          quantity: orderQuantity == null || 0 ? 1 : orderQuantity,
          orderState: {
            pending: true,
            shipped: false,
            delivered: false,
            returned: false,
            refunded: false,
          },
        };
        const response = await Item.findById(itemId);
        if (response && response.totalItems === 0) {
          reject({
            message: "Out of stock",
            status: 409,
          });
        } else {
          try {
            const userCart = await Cart.findOne({ user: userId });
            if (userCart) {
              let totalItemsInCart = userCart.items.map((el) =>
                el.item.toString()
              );
              if (totalItemsInCart.includes(itemId)) {
                if (response.totalItems - orderQuantity >= 0) {
                  const result = await Cart.findOneAndUpdate(
                    {
                      user: userId,
                      items: {
                        $elemMatch: { item: itemId },
                      },
                    },
                    { $set: { "items.$.quantity": orderQuantity } },
                    { new: true, useFindAndModify: false }
                  );
                  if (result) {
                    resolve(result);
                  } else {
                    reject({
                      message: "Updation to cart failed",
                      status: 400,
                    });
                  }
                } else {
                  reject({
                    message: "orderQuantity exceeds totalItems in stock ",
                    status: 400,
                  });
                }
              } else {
                if (response.totalItems - orderQuantity >= 0) {
                  userCart.items.push(cartItem);
                  const savedCart = await userCart.save();
                  if (savedCart) {
                    resolve(savedCart);
                  }
                } else {
                  reject({
                    message: "Ordered quantity exceeds total items in stock ",
                    status: 400,
                  });
                }
              }
            } else {
              // create
              if (response.totalItems - orderQuantity >= 0) {
                const response = await Cart.create({
                  user: userId,
                  items: [cartItem],
                });
                if (response) {
                  resolve(response);
                } else {
                  reject({
                    message: "Couldn't add to cart",
                    status: 400,
                  });
                }
              } else {
                reject({
                  message: "Ordered quantity exceeds total items in stock ",
                  status: 400,
                });
              }
            }
          } catch (err) {
            console.log(err);
            reject({
              message: "User cart not found",
              status: 404,
            });
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Update cart service
   * @param {String} id
   * @param {Object} payload
   */
  const updateQuantityInCart = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { userId, itemId, orderQuantity } = payload;
        // ## TODO: check if orderQuantity exceeds totalItems
        Cart.findOneAndUpdate(
          {
            user: userId,
            "items.item": itemId,
          },
          { $set: { "items.$.quantity": orderQuantity } },
          { new: true, useFindAndModify: false }
        )
          .populate({ path: "items.item", model: "Item" })
          .exec((err, cart) => {
            if (err) {
              reject({
                message: "Couldn't add to cart",
                err,
              });
            } else {
              let cartItems = cart.items;
              let total = cartItems.reduce(function (a, b) {
                return a + b.item.price * b.quantity;
              }, 0);
              Cart.findOneAndUpdate(
                { user: userId },
                { totalPrice: total },
                { new: true, useFindAndModify: false }
              )
                .populate("items.item")
                .then((cart) => {
                  resolve(cart);
                });
            }
          });
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Delete item service
   * @param {String} id
   */
  const deleteFromCart = ({ userId, itemId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        Cart.findOneAndUpdate(
          { user: userId },
          { $pull: { items: { item: itemId } } },
          { new: true, useFindAndModify: false },
          (err) => {
            if (err) {
              reject({ message: "Couldn't find cart", err });
            } else {
              Cart.findOne({ user: userId })
                .populate("items.item")
                .exec((err, cart) => {
                  if (err) {
                    reject({ message: "Couldn't find cart", err });
                  } else {
                    let cartItems = cart.items;
                    let total = cartItems.reduce(function (a, b) {
                      return a + b.item.price * b.quantity;
                    }, 0);
                    Cart.findOneAndUpdate(
                      { user: userId },
                      { totalPrice: total },
                      { new: true, useFindAndModify: false }
                    )
                      .populate("items.item")
                      .then((cart) => {
                        resolve("Deleted Succefully");
                      });
                  }
                });
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Get item service
   * @param {String} id Optional
   */
  const getCartForUser = (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        Cart.findOne({ user: userId })
          .populate("items.item")
          .exec((err, cart) => {
            if (err) {
              reject({ message: "Couldn't find cart", err });
            } else {
              if (!cart) {
                reject({ message: "no cart" });
              } else {
                let cartItems = cart.items;
                let total = cartItems.reduce(function (a, b) {
                  return a + b.item.price * b.quantity;
                }, 0);

                Cart.findOneAndUpdate(
                  { user: userId },
                  { totalPrice: total },
                  { new: true, useFindAndModify: false }
                )
                  .populate("items.item")
                  .populate({ path: "address", select: "-isPrimary" })
                  .then((cart) => {
                    resolve(cart);
                  });
              }
            }
          });
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Get user items service
   * @param {String} id Optional
   */
  const selectAddress = (userId, address) => {
    return new Promise(async (resolve, reject) => {
      try {
        Cart.findOneAndUpdate(
          { user: userId },
          { $set: { address } },
          { new: true, useFindAndModify: false }
        ).exec((err, cart) => {
          if (err) {
            reject({
              message: "Couldn't update address",
              err,
            });
          } else {
            resolve(cart);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  return {
    addToCart,
    deleteFromCart,
    updateQuantityInCart,
    getCartForUser,
    selectAddress,
  };
};
