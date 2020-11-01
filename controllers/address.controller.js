module.exports = () => {
  const addressService = require("../services/address.service")();
  /**
   * Create address controller
   */
  const createAddress = async (req, res, next, { logger }) => {
    try {
      const userId = req.user.id;
      const payload = { userId, ...req.body };
      const result = await addressService.createAddress(payload);
      logger.info(`Address added successfully for user id: ${result.id}`);
      res.send({
        status: 201,
        message: `Address added successfully`,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Update address controller
   */
  const updateAddress = async (req, res, next, { logger }) => {
    try {
      const addressId = req.query.addressId;
      const payload = req.body;
      const result = await addressService.updateAddress(addressId, payload);
      logger.info(
        `Address of id: ${addressId} updated successfully for user of id: ${req.user.id}`
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
   * Delete user controller
   */
  const deleteAddress = async (req, res, next, { logger }) => {
    try {
      const addressId = req.query.addressId;
      await addressService.deleteAddress(addressId);
      logger.info(
        `Address of id: ${addressId} deleted successfully for user of id: ${req.user.id}`
      );
      res.send({
        code: 201,
        message: `Address of id: ${addressId} deleted successfully for user of id: ${req.user.id}`,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get user controller
   */
  const getAddress = async (req, res, next, { logger }) => {
    try {
      const { id } = req.user;
      const result = await addressService.getAddress(id);
      logger.info(`${result.length} Addresses for user id: ${id} retrieved`);
      res.send({
        status: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  };

  return {
    createAddress,
    deleteAddress,
    updateAddress,
    getAddress,
  };
};
