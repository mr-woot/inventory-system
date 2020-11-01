module.exports = () => {
  const { Item } = require("../models");

  /**
   * Create item service
   * @param {Object} payload
   */
  const createItem = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Item.create(payload);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Update item service
   * @param {String} id
   * @param {Object} payload
   */
  const updateItem = (id, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let item = await Item.findById(id);
        if (item) {
          item = await Item.findByIdAndUpdate(
            id,
            { $set: payload },
            { new: true, useFindAndModify: false }
          );
          resolve(item);
        } else {
          reject({
            message: `Item id: ${id} doesn't exists`,
            status: 404,
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Delete item service
   * @param {String} id
   */
  const deleteItem = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Item.findByIdAndDelete(id);
        if (response) {
          resolve(response);
        } else {
          reject({
            message: `Item id: ${id} doesn't exists`,
            status: 404,
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Get item service
   * @param {String} id Optional
   */
  const getItem = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await Item.findById(id)
          .populate({
            path: "category",
            select: "-_id",
          })
          .populate({
            path: "seller",
            select: "fullName email -_id address",
          });
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Get user items service
   * @param {String} id Optional
   */
  const getUserItems = (seller, { page, size }) => {
    return new Promise(async (resolve, reject) => {
      try {
        page = page || 1;
        let limit = parseInt(size) || 10;

        const result = await Item.paginate(
          { seller },
          {
            sort: { creationDate: -1 },
            populate: {
              path: "seller",
              select: "-_id -__v -password",
            },
            page,
            limit,
          }
        );
        if (result) {
          resolve({
            items: result.docs,
            current: parseInt(result.page),
            count: result.pages,
          });
        } else {
          reject({ message: "Couldn't find items", status: 404 });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Get all items service
   * @param {String} id Optional
   */
  const getAllItems = (page, size) => {
    return new Promise(async (resolve, reject) => {
      try {
        page = page || 1;
        let limit = parseInt(size) || 10;

        const result = await Item.paginate(
          { totalItems: { $ne: 0 } },
          {
            sort: { creationDate: -1 },
            populate: {
              path: "seller",
              select: "fullName email -_id address",
            },
            page,
            limit,
          }
        );
        if (result) {
          resolve({ items: result.docs, count: result.pages });
        } else {
          reject({ message: "Couldn't find items", status: 404 });
        }
      } catch (err) {
        reject(err);
      }
    });
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
