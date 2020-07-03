let Products = require('../db/models/products.js');

module.exports = {
    async load(req, res) {
        res.json(await Products.find())
    },
    async loadWithParams(req, res) {
        res.json(await Products.find({ type: req.params.type }))
    }
}
