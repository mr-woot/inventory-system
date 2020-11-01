const crypto = require("crypto");
const config = require("../config");
const { AWS } = require("../aws");
const bcrypt = require("bcrypt");

/**
 * Creates hash of length 64
 * @param {String} email Creates hash of length 256 required for password reset
 */
const createHash = email => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) return reject(err);
      return resolve(buf.toString("hex"));
    });
  });
};

const createPasswordHash = value => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return reject(err);

      // hash the password along with our new salt
      bcrypt.hash(value, salt, (err, hash) => {
        if (err) return reject(err);

        // override the cleartext password with the hashed one
        return resolve(hash);
      });
    });
  });
};

const sendPasswordResetEmail = ({ host, email, token, username }) => {
  const templateData = {
    name: username,
    host: config["host"],
    token
  };
  return new Promise((resolve, reject) => {
    const params = {
      Destination: {
        CcAddresses: [config["aws_email_user"]],
        ToAddresses: [email]
      },
      Source: config["aws_email_user"],
      Template: "helpshackPasswordReset",
      TemplateData: JSON.stringify(templateData),
      ReplyToAddresses: [config["aws_email_user"]]
    };
    const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendTemplatedEmail(params)
      .promise();
    sendPromise
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  createHash,
  sendPasswordResetEmail,
  createPasswordHash
};
