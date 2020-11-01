/**
 * Auth routes.
 */
module.exports = ({ logger }) => {
  const express = require("express");
  const router = express.Router();
  const userController = require("../controllers/user.controller")();
  const { authenticate } = require("../middlewares")();
  const { userGet, userCreate } = require("../validators/user.validator");
  const validate = require("express-validation");

  /**
   * User route
   */
  router
    .route("/user")
    .get(validate(userGet), authenticate, (req, res, next) =>
      userController.getUser(req, res, next, { logger })
    )
    .post(validate(userCreate), (req, res, next) =>
      userController.createUser(req, res, next, { logger })
    )
    .put(authenticate, (req, res, next) =>
      userController.updateUser(req, res, next, { logger })
    )
    .delete(authenticate, (req, res, next) =>
      userController.deleteUser(req, res, next, { logger })
    );

  return router;
};
