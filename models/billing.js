const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillingSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = BillingSchema;
