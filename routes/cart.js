/**
 * Address routes.
 */
module.exports = ({ logger }) => {
  const express = require("express");
  const router = express.Router();
  const cartController = require("../controllers/cart.controller")();
  const { authenticate } = require("../middlewares")();
  // ## TODO: validator
  const validate = require("express-validation");

  /**
   * Cart route
   */
  router
    .route("/cart")
    // ## TODO: validate
    // All can get
    .get(authenticate, (req, res, next) =>
      cartController.getCartForUser(req, res, next, { logger })
    )
    // ## TODO: validate
    // Only Seller can create
    .post(authenticate, (req, res, next) =>
      cartController.addToCart(req, res, next, { logger })
    )
    // ## TODO: validate
    // Only Seller can updated
    .put(authenticate, (req, res, next) =>
      cartController.updateQuantityInCart(req, res, next, { logger })
    )
    // ## TODO: validate
    // Only Seller can delete
    .delete(authenticate, (req, res, next) =>
      cartController.deleteFromCart(req, res, next, { logger })
    );

  router.put("/cart/select-address", authenticate, (req, res, next) =>
    cartController.selectAddress(req, res, next, { logger })
  );

  return router;
};
