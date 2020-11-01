const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  paymentType: { type: String, required: true },
  isAllowed: { type: Boolean },
});

module.exports = PaymentSchema;
