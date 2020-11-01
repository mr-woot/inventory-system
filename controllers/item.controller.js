module.exports = () => {
  const itemService = require("../services/item.service")();
  /**
   * Create item controller
   */
  const createItem = async (req, res, next, { logger }) => {
    try {
      const userId = req.user.id;
      const payload = { userId, ...req.body };
      const result = await itemService.createItem(payload);
      logger.info(`Item added successfully for user id: ${result.id}`);
      res.send({
        status: 201,
        message: result.toJSON(),
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Update item controller
   */
  const updateItem = async (req, res, next, { logger }) => {
    try {
      const payload = req.body;
      const result = await itemService.updateItem(payload);
      logger.info(
        `Item of id: ${s} updated successfully for user of id: ${req.user.id}`
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
   * Delete item controller
   */
  const deleteItem = async (req, res, next, { logger }) => {
    try {
      const itemId = req.query.itemId;
      await itemService.deleteItem(itemId);
      logger.info(
        `Item of id: ${itemId} deleted successfully for user of id: ${req.user.id}`
      );
      res.send({
        code: 201,
        message: `Item of id: ${itemId} deleted successfully for user of id: ${req.user.id}`,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get item controller
   */
  const getItem = async (req, res, next, { logger }) => {
    try {
      const { itemId } = req.query;
      const result = await itemService.getItem(itemId);
      logger.info(`Item info for id: ${itemId} retrieved`);
      res.send({
        status: 200,
        message: result.toJSON(),
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get item controller
   */
  const getUserItems = async (req, res, next, { logger }) => {
    try {
      const { id } = req.user;
      const { page, size } = req.query;
      const result = await itemService.getUserItems(id, { page, size });
      logger.info(`${result.items.length} Items for user id: ${id} retrieved`);
      res.send({
        status: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get item controller
   */
  const getAllItems = async (req, res, next, { logger }) => {
    try {
      const { page, size } = req.query;
      const result = await itemService.getAllItems(page, size);
      logger.info(`${result.items.length} Items retrieved`);
      res.send({
        status: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  };

  return {
    createItem,
    deleteItem,
    updateItem,
    getItem,
    getUserItems,
    getAllItems,
  };
};
