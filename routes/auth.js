/**
 * Auth routes.
 */
module.exports = ({ client, logger, db }) => {
  const express = require("express");
  const router = express.Router();
  const authController = require("../controllers/auth.controller")();

  /**
   * Auth Route
   */
  router
    .route("/login")
    .post((req, res, next) =>
      authController.login(req, res, next, { logger, client, db })
    );

  // ## Forgot password route
  router.route("/forgot-password").post((req, res, next) => {
    authController.forgotPassword(req, res, next, { logger, client, db });
  });

  // ## Reset password route
  router.route("/reset-password").post((req, res, next) => {
    authController.resetPassword(req, res, next, { logger, client, db });
  });

  return router;
};
