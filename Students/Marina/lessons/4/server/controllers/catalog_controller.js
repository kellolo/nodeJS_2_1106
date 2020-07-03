let Products = require("../db/models/products");

module.exports = {
  async load(req, res) {
    res.json(await Products.find());
  },
};
