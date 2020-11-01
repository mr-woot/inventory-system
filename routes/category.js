/**
 * Address routes.
 */
module.exports = ({ logger }) => {
  const express = require("express");
  const router = express.Router();
  const categoryController = require("../controllers/category.controller")();
  const { authenticate } = require("../middlewares")();
  // ## TODO: validator
  const validate = require("express-validation");

  /**
   * Category route
   */
  router
    .route("/category")
    // ## TODO: validate
    // All can get
    .get((req, res, next) =>
      categoryController.getCategory(req, res, next, { logger })
    )
    // ## TODO: validate
    // Only user can get
    // .get("/user", (req, res, next) =>
    //   categoryController.getUserCategories(req, res, next, { logger })
    // )
    // .get("/:id", (req, res, next) =>
    //   categoryController.getCategory(req, res, next, { logger })
    // )
    // ## TODO: validate
    // Only Seller can create
    .post(authenticate, (req, res, next) =>
      categoryController.createCategory(req, res, next, { logger })
    )
    // ## TODO: validate
    // Only Seller can updated
    .put(authenticate, (req, res, next) =>
      categoryController.updateCategory(req, res, next, { logger })
    )
    // ## TODO: validate
    // Only Seller can delete
    .delete(authenticate, (req, res, next) =>
      categoryController.deleteCategory(req, res, next, { logger })
    );

  router.get("/category/user", (req, res, next) =>
    categoryController.getUserCategories(req, res, next, { logger })
  );

  router.get("/categories", (req, res, next) =>
    categoryController.getAllCategories(req, res, next, { logger })
  );

  return router;
};
