let mongo = require("mongoose");

let Schema = mongo.Schema;

let prodSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: false },
  amount: { type: Number, required: false, default: null },
});
module.exports = mongo.model("PRODUCTS", prodSchema);
