const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating our Category Schema with its elements
const CategorySchema = new Schema({
  name: { type: String, trim: true, uppercase: true, required: true },
  description: { type: String, required: true },
});

/**
 * toJSON implementation
 */
CategorySchema.options.toJSON = {
  transform: function (doc, ret, options) {
    // ret.id = ret._id;
    // delete ret._id;
    delete ret.__v;
    return ret;
  },
};

CategorySchema.virtual("url").get(function () {
  return "/category/" + this._id;
});

module.exports = CategorySchema;
