let Products = require('../db/models/products.js');

module.exports = {
    async load(req, res) {
        res.json(await Products.find())
    }
}