module.exports = () => {
  const cartService = require("../services/cart.service")();
  /**
   * Create cart controller
   */
  const addToCart = async (req, res, next, { logger }) => {
    try {
      const userId = req.user.id;
      const { itemId, orderQuantity } = req.body;
      const payload = { itemId, orderQuantity, userId };
      const result = await cartService.addToCart(payload);
      logger.info(`Cart added successfully for user id: ${userId}`);
      res.send({
        status: 201,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Update cart controller
   */
  const updateQuantityInCart = async (req, res, next, { logger }) => {
    try {
      const userId = req.user.id;
      const { itemId, orderQuantity } = req.body;
      const payload = { userId, itemId, orderQuantity };
      const result = await cartService.updateQuantityInCart(payload);
      logger.info(
        `Quantity of item id: ${itemId} updated successfully for user of id: ${userId}`
      );
      res.send({
        status: 201,
        message: result.toJSON(),
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Delete cart controller
   */
  const deleteFromCart = async (req, res, next, { logger }) => {
    try {
      const userId = req.user.id;
      const { itemId } = req.query;
      await cartService.deleteFromCart({ userId, itemId });
      logger.info(`Cart of user id: ${userId} deleted successfully`);
      res.send({
        code: 201,
        message: `Cart of user id: ${userId} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get cart controller
   */
  const getCartForUser = async (req, res, next, { logger }) => {
    try {
      const userId = req.user.id;
      const result = await cartService.getCartForUser(userId);
      logger.info(`Cart info for id: ${userId} retrieved`);
      res.send({
        status: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get cart controller
   */
  const selectAddress = async (req, res, next, { logger }) => {
    try {
      const userId = req.user.id;
      const { address } = req.body;
      const result = await cartService.selectAddress(userId, address);
      logger.info(`Selected address for user id: ${userId}`);
      res.send({
        status: 200,
        message: `Selected address for user id: ${userId}`,
      });
    } catch (err) {
      next(err);
    }
  };

  return {
    addToCart,
    deleteFromCart,
    updateQuantityInCart,
    getCartForUser,
    selectAddress,
  };
};
