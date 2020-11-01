const mongoose = require("mongoose");
const bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = require("../config")["salt_work_factor"];
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = new Schema(
  {
    gender: {
      type: String,
      enum: ["M", "F"],
      trim: true,
      uppercase: true,
      required: "Gender is required",
    },
    nationality: {
      type: String,
      enum: ["INDIAN", "OTHER"],
      trim: true,
      uppercase: true,
      required: "Nationality is required",
    },
    dob: {
      type: String,
      trim: true,
      required: "Date of birth is required and should be in DD/MM/YYYY format",
      match: [
        /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/,
        "Date of birth should be in DD/MM/YYYY format",
      ],
    },
    fullName: {
      type: String,
      trim: true,
      required: "Full Name is required",
      match: [/^[a-zA-Z ]*$/, "Invalid full name"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
      index: true,
    },
    password: {
      type: String,
      required: "Password is required",
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/,
        "Invalid password",
      ],
    },
    isAdmin: { type: Boolean },
    isSeller: { type: Boolean },
    isCustomer: { type: Boolean },
    isShipper: { type: Boolean },
    isRestricted: { type: Boolean },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

/**
 * toJSON implementation
 */
UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    // ret.id = ret._id;
    // delete ret._id;
    delete ret.__v;
    return ret;
  },
};

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(parseInt(SALT_WORK_FACTOR), function (err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.createHash = function (value) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(parseInt(SALT_WORK_FACTOR), function (err, salt) {
      if (err) return reject(err);

      // hash the password along with our new salt
      bcrypt.hash(value, salt, function (err, hash) {
        if (err) return reject(err);

        // override the cleartext password with the hashed one
        return resolve(hash);
      });
    });
  });
};

UserSchema.plugin(mongoosePaginate);

module.exports = UserSchema;
