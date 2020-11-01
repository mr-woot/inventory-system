module.exports = () => {
  const userService = require("../services/user.service")();
  /**
   * Create user controller
   */
  const createUser = async (req, res, next, { logger }) => {
    try {
      const userBody = req.body;
      const result = await userService.createUser(userBody);
      const { password, ...rest } = result.toJSON();
      logger.info(`User created successfully with user id: ${result.id}`);
      res.send({
        status: 201,
        message: { ...rest },
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Update user controller
   */
  const updateUser = async (req, res, next, { logger, db, client }) => {
    try {
      const userBody = req.body;
      const userId = req.query.id;
      const result = await userService.updateUser(userId, userBody);
      logger.info(`User updated successfully with user id: ${result.id}`);
      res.send({
        status: 201,
        message: "User sahi se update ho gyi hai.",
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Delete user controller
   */
  const deleteUser = async (req, res, next, { logger, db, client }) => {
    const userId = req.query.id;
    await userService.deleteUser(userId);
    logger.info(`User deleted successfully with user id: ${userId}`);
    res.send({
      code: 200,
      message: "User delete success ho gyi hai.",
    });
  };

  /**
   * Get users controller
   */
  const getUsers = async (req, res, next, { logger }) => {
    try {
      const { page } = req.query;
      const result = await userService.getUsers(page);
      logger.info(`${result.data.length} Users retrieved`);
      res.send({
        status: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get user controller
   */
  const getUser = async (req, res, next, { logger }) => {
    try {
      const { id } = req.user;
      const result = await userService.getUser(id);
      logger.info(`User id ${id} info retrieved`);
      res.send({
        status: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  };

  return {
    createUser,
    deleteUser,
    updateUser,
    getUsers,
    getUser,
  };
};
