module.exports = () => {
  const authService = require("../services/auth.service")();
  /**
   * Create user controller
   */

  const login = async (req, res, next, { logger }) => {
    try {
      const payload = req.body;
      const { email, fullName, token, _id } = await authService.login(payload);
      logger.info(`[login] | User fetched successfully with user id: ${_id}`);
      res.send({
        status: 200,
        message: { email, fullName, token, id: _id }
      });
    } catch (err) {
      next(err);
    }
  };

  const forgotPassword = async (req, res, next, { logger }) => {
    try {
      const { email } = req.body;
      const result = await authService.forgotPassword(email);
      logger.info(
        `[forgotPassword] | Link to reset password sent to registered email`
      );
      res.send({
        status: 200,
        message: result
      });
    } catch (err) {
      next(err);
    }
  };

  const resetPassword = async (req, res, next, { logger }) => {
    try {
      const payload = req.body;
      const result = await authService.resetPassword(payload);
      logger.info(`[resetPassword] | Password has been reset`);
      res.send({
        status: 201,
        message: result
      });
    } catch (err) {
      next(err);
    }
  };

  return {
    login,
    forgotPassword,
    resetPassword
  };
};
