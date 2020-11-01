module.exports = () => {
  const { Category } = require("../models");

  /**
   * Create category service
   * @param {Object} payload
   */
  const createCategory = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [category] = await Category.find({ name: payload.name });
        if (category) {
          reject({
            message: `Category already exists with id: ${category._id}`,
            status: 409,
          });
        } else {
          const response = await Category.create(payload);
          resolve(response);
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Update category service
   * @param {String} id
   * @param {Object} payload
   */
  const updateCategory = (id, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let category = await Category.findById(id);
        if (category) {
          category = await Category.findByIdAndUpdate(
            id,
            { $set: payload },
            { new: true, useFindAndModify: false }
          );
          resolve(category);
        } else {
          reject({
            message: `Category id: ${id} doesn't exists`,
            status: 404,
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Delete category service
   * @param {String} id
   */
  const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Category.findByIdAndDelete(id);
        if (response) {
          resolve(response);
        } else {
          reject({
            message: `Category id: ${id} doesn't exists`,
            status: 404,
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Get category service
   * @param {String} id Optional
   */
  const getCategory = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await Category.findById(id);
        if (response) {
          resolve(response);
        } else {
          reject({
            message: `Category id: ${id} doesn't exists`,
            status: 404,
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Get user categorys service
   * @param {String} id Optional
   */
  // ## TODO
  const getUserCategories = (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await Category.find({ userId });
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Get all categorys service
   * @param {String} id Optional
   */
  // ## TODO
  const getAllCategories = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await Category.find().sort({ $name: 1 });
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
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
