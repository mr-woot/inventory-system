/**
 * Address routes.
 */
module.exports = ({ logger }) => {
  const express = require("express");
  const router = express.Router();
  const itemController = require("../controllers/item.controller")();
  const { authenticate } = require("../middlewares")();
  // ## TODO: validator
  const validate = require("express-validation");

  /**
   * Item route
   */
  router
    .route("/item")
    // ## TODO: validate
    // All can get
    .get((req, res, next) => itemController.getItem(req, res, next, { logger }))
    // ## TODO: validate
    // Only Seller can create
    .post(authenticate, (req, res, next) =>
      itemController.createItem(req, res, next, { logger })
    )
    // ## TODO: validate
    // Only Seller can updated
    .put(authenticate, (req, res, next) =>
      itemController.updateItem(req, res, next, { logger })
    )
    // ## TODO: validate
    // Only Seller can delete
    .delete(authenticate, (req, res, next) =>
      itemController.deleteItem(req, res, next, { logger })
    );

  router.get("/items/user", authenticate, (req, res, next) =>
    itemController.getUserItems(req, res, next, { logger })
  );

  router.get("/items", (req, res, next) =>
    itemController.getAllItems(req, res, next, { logger })
  );

  return router;
};
