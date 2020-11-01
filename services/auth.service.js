module.exports = () => {
  const { User } = require("../models");
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const config = require("../config");
  const authUtils = require("../utils/authUtils");
  /**
   * Update user service
   * @param {String} id
   * @param {Object} payload
   */
  const login = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await User.findOne({ email: payload.email });
        if (response) {
          const isMatch = await bcrypt.compare(
            payload.password,
            response.password
          );
          if (isMatch) {
            const token = jwt.sign(
              {
                id: response._id,
                email: response.email,
                fullName: response.fullName
              },
              config["jwt_secret_key"],
              { expiresIn: "24h" }
            );
            resolve({ token, ...response.toJSON() });
          } else {
            reject({
              message: "Passwords do not match",
              status: 409
            });
          }
        } else {
          reject({
            message: "User doesn't exist",
            status: 409
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  const forgotPassword = email => {
    return new Promise(async (resolve, reject) => {
      try {
        // create random hex digest hash
        const token = await authUtils.createHash(email);
        // set resetPasswordToken with the created hash and its expiry as resetPasswordExpires
        const user = await User.findOneAndUpdate(
          { email },
          {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000 // 1 hour
          }
        );
        await authUtils.sendPasswordResetEmail({
          host: config["base_uri"],
          email,
          token,
          username: user.fullName
        });
        resolve("Password reset link has been sent to your registered email");
      } catch (err) {
        reject(err);
      }
    });
  };

  const resetPassword = ({ email, token, newPassword }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let [user] = await User.find({
          email,
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }
        });
        if (user) {
          user = await user.updateOne({
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined,
            password: await authUtils.createPasswordHash(newPassword)
          });
          user.ok === 1
            ? resolve("Password updated successfully.")
            : resolve("Password updation failed.");
          // resolve(user);
        } else {
          reject({ message: "Token doesn't exists", status: 409 });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  return {
    login,
    forgotPassword,
    resetPassword
  };
};
