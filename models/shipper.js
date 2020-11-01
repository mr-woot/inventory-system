const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShipperSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  company: { type: String },
  location: { type: String },
  phone: { type: String },
  isActiveShipper: { type: Boolean },
});

module.exports = ShipperSchema;
