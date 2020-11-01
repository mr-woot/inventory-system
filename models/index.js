const mongo = require("mongoose");

// User schema
const userSchema = require("./user");
const addressSchema = require("./address");
const billingSchema = require("./billing");
const cartSchema = require("./cart");
const categorySchema = require("./category");
const itemSchema = require("./item");
const orderSchema = require("./order");
const paymentSchema = require("./payment");
const shipperSchema = require("./shipper");

const User = mongo.model("User", userSchema);
const Address = mongo.model("Address", addressSchema);
const Billing = mongo.model("Billing", billingSchema);
const Cart = mongo.model("Cart", cartSchema);
const Category = mongo.model("Category", categorySchema);
const Item = mongo.model("Item", itemSchema);
const Order = mongo.model("Order", orderSchema);
const Payment = mongo.model("Payment", paymentSchema);
const Shipping = mongo.model("Shipping", shipperSchema);

module.exports = {
  User,
  Address,
  Billing,
  Cart,
  Category,
  Item,
  Order,
  Payment,
  Shipping,
};
