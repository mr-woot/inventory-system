module.exports = () => {
  const { Address } = require("../models");

  /**
   * Create address service
   * @param {Object} payload
   */
  const createAddress = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Address.create(payload);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Update address service
   * @param {String} id
   * @param {Object} payload
   */
  const updateAddress = (id, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let address = await Address.findById(id);
        if (address) {
          address = await Address.findByIdAndUpdate(
            id,
            { $set: payload },
            { new: true, useFindAndModify: false }
          );
          resolve(address);
        } else {
          reject({
            message: `Address id: ${id} doesn't exists`,
            status: 404,
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Delete address service
   * @param {String} id
   */
  const deleteAddress = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Address.findByIdAndDelete(id);
        if (response) {
          resolve(response);
        } else {
          reject({
            message: `Address id: ${id} doesn't exists`,
            status: 404,
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Get users service
   * @param {String} id Optional
   */
  const getAddress = (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await Address.find({ userId });
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  };

  return {
    createAddress,
    deleteAddress,
    updateAddress,
    getAddress,
  };
};
