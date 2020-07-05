let mongo = require("mongoose");

let Schema = mongo.Schema;

let userSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: false, default: false },
  basket: { type: String, required: false, default: "" },
});
module.exports = mongo.model("USERS", userSchema);
