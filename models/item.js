const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

// Creating our Item Schema with it's elements
const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    imageUrl: { type: Array, required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

/**
 * toJSON implementation
 */
ItemSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    // ret.id = ret._id;
    // delete ret._id;
    delete ret.__v;
    return ret;
  },
};

ItemSchema.virtual("url").get(function () {
  return "/item/" + this._id;
});

// will use mongoose-paginate plugin to retrieve data when make pagination
ItemSchema.plugin(mongoosePaginate);

module.exports = ItemSchema;
