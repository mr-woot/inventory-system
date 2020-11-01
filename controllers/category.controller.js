module.exports = () => {
  const categoryService = require("../services/category.service")();
  /**
   * Create category controller
   */
  const createCategory = async (req, res, next, { logger }) => {
    try {
      const payload = req.body;
      const result = await categoryService.createCategory(payload);
      logger.info(`Category added successfully`);
      res.send({
        status: 201,
        message: result.toJSON(),
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Update category controller
   */
  const updateCategory = async (req, res, next, { logger }) => {
    try {
      const { categoryId } = req.query;
      const payload = req.body;
      const result = await categoryService.updateCategory(categoryId, payload);
      logger.info(
        `Category of id: ${categoryId} updated successfully for user of id: ${req.user.id}`
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
   * Delete category controller
   */
  const deleteCategory = async (req, res, next, { logger }) => {
    try {
      const { categoryId } = req.query;
      await categoryService.deleteCategory(categoryId);
      logger.info(
        `Category of id: ${categoryId} deleted successfully for user of id: ${req.user.id}`
      );
      res.send({
        code: 201,
        message: `Category of id: ${categoryId} deleted successfully for user of id: ${req.user.id}`,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get category controller
   */
  const getCategory = async (req, res, next, { logger }) => {
    try {
      const { categoryId } = req.query;
      const result = await categoryService.getCategory(categoryId);
      logger.info(`Category info of id: ${categoryId} retrieved`);
      res.send({
        status: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get category controller
   */
  const getUserCategories = async (req, res, next, { logger }) => {
    try {
      const { id } = req.user;
      const result = await categoryService.getUserCategories(id);
      logger.info(`${result.length} Categorys for user id: ${id} retrieved`);
      res.send({
        status: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get category controller
   */
  const getAllCategories = async (req, res, next, { logger }) => {
    try {
      const result = await categoryService.getAllCategories();
      logger.info(`${result.length} Categorys retrieved`);
      res.send({
        status: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  };

  return {
    createCategory,
    deleteCategory,
    updateCategory,
    getCategory,
    getUserCategories,
    getAllCategories,
  };
};
