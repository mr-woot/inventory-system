const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  fullName: { type: String, trim: true, uppercase: true, required: true },
  address: {
    type: String,
    trim: true,
    uppercase: true,
    unique: true,
    required: true,
  },
  country: { type: String, trim: true, uppercase: true, required: true },
  state: { type: String, trim: true, uppercase: true, required: true },
  city: { type: String, trim: true, uppercase: true, required: true },
  landmark: { type: String, trim: true, uppercase: true },
  mobileNumber: { type: String, required: true },
  pinCode: { type: Number, required: true },
  isPrimary: { type: Boolean, default: false },
});

/**
 * toJSON implementation
 */
AddressSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    // ret.id = ret._id;
    // delete ret._id;
    delete ret.__v;
    return ret;
  },
};

module.exports = AddressSchema;
