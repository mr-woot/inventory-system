/**
 * Address routes.
 */
module.exports = ({ logger }) => {
  const express = require("express");
  const router = express.Router();
  const addressController = require("../controllers/address.controller")();
  const { authenticate } = require("../middlewares")();
  // ## TODO: validator
  const validate = require("express-validation");

  /**
   * Address route
   */
  router
    .route("/address")
    // ## TODO: validate
    .get(authenticate, (req, res, next) =>
      addressController.getAddress(req, res, next, { logger })
    )
    // ## TODO: validate
    .post(authenticate, (req, res, next) =>
      addressController.createAddress(req, res, next, { logger })
    )
    // ## TODO: validate
    .put(authenticate, (req, res, next) =>
      addressController.updateAddress(req, res, next, { logger })
    )
    // ## TODO: validate
    .delete(authenticate, (req, res, next) =>
      addressController.deleteAddress(req, res, next, { logger })
    );

  return router;
};
