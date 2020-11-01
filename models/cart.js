const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    totalPrice: { type: Number },
    address: { type: Schema.Types.ObjectId, ref: "Address" },
    items: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Item" },
        quantity: { type: Number },
        shipper: { type: Schema.Types.ObjectId, ref: "Shipper" },
        orderState: {
          pending: { type: Boolean },
          shipped: { type: Boolean },
          delivered: { type: Boolean },
          returned: { type: Boolean },
          refunded: { type: Boolean },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

CartSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    // ret.id = ret._id;
    // delete ret._id;
    delete ret.__v;
    return ret;
  },
};

module.exports = CartSchema;
